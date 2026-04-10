<template>
  <div class="appointments-page">
    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Mis Citas</h1>
        <p class="page-sub">Gestiona todas tus citas agendadas</p>
      </div>
      <div class="header-filters">
        <button
          v-for="f in filters"
          :key="f.value"
          class="filter-btn"
          :class="{ active: activeFilter === f.value }"
          @click="activeFilter = f.value"
        >
          {{ f.label }}
          <span class="filter-count">{{ getCount(f.value) }}</span>
        </button>
      </div>
    </div>

    <!-- LIST -->
    <div class="appt-list">
      <div
        v-for="appt in filteredAppointments"
        :key="appt.id"
        class="appt-row"
        @click="openModal(appt)"
      >
        <!-- IMAGEN -->
        <div class="appt-img">
          <img
            v-if="getVehicle(appt.listingId)"
            :src="getImageUrl(getVehicle(appt.listingId).coverImage)"
            :alt="getVehicleTitle(appt.listingId)"
          />
          <div v-else class="appt-img-placeholder">Auto</div>
        </div>

        <!-- INFO -->
        <div class="appt-info">
          <div class="appt-car">{{ getVehicleTitle(appt.listingId) }}</div>
          <div class="appt-meta">
            <span>{{ appt.locationLabel }}</span>
            <span class="sep">·</span>
            <span>{{ formatDate(appt.date) }} · {{ appt.time }}</span>
          </div>
          <div v-if="appt.notes" class="appt-notes">{{ appt.notes }}</div>
        </div>

        <!-- STATUS + ACCIONES -->
        <div class="appt-right">
          <div class="appt-status" :class="statusClass(appt.status)">
            {{ statusLabel(appt.status) }}
          </div>
          <div class="appt-btns" @click.stop>
            <button class="btn-sm btn-ghost" @click="openModal(appt)">
              Ver
            </button>
            <button
              class="btn-sm btn-primary"
              :disabled="appt.status === 'cancelled'"
              @click="openReschedule(appt)"
            >
              Reagendar
            </button>
            <button
              class="btn-sm btn-danger"
              :disabled="appt.status === 'cancelled'"
              @click="openCancel(appt)"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

      <!-- EMPTY STATE -->
      <div v-if="filteredAppointments.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <p>No hay citas con este filtro</p>
      </div>
    </div>

    <!-- MODALES Y TOAST (igual que dashboard) -->
    <Teleport to="body">
      <!-- MODAL DETALLE -->
      <div
        class="modal-overlay"
        :class="{ open: modals.detail }"
        @click.self="modals.detail = false"
      >
        <div v-if="selectedAppt" class="modal">
          <div class="modal-header">
            <div class="modal-title-label">Detalle de la cita</div>
            <button class="modal-close" @click="modals.detail = false">
              ✕
            </button>
          </div>
          <div class="modal-car-name">
            {{ getVehicleTitle(selectedAppt.listingId) }}
          </div>
          <div class="modal-code">
            Código: {{ selectedAppt.id.toUpperCase() }}
          </div>
          <div class="modal-status-bar">
            <div class="dot"></div>
            <span>Estado: {{ statusLabel(selectedAppt.status) }}</span>
          </div>
          <div class="modal-details">
            <div class="detail-row">
              <div class="detail-icon"></div>
              <div>
                <div class="detail-key">Fecha</div>
                <div class="detail-val">
                  {{ formatDate(selectedAppt.date) }} · {{ selectedAppt.time }}
                </div>
              </div>
            </div>
            <div class="detail-row">
              <div class="detail-icon"></div>
              <div>
                <div class="detail-key">Lugar</div>
                <div class="detail-val">{{ selectedAppt.locationLabel }}</div>
              </div>
            </div>
            <div class="detail-row">
              <div class="detail-icon"></div>
              <div>
                <div class="detail-key">Notas</div>
                <div class="detail-val">{{ selectedAppt.notes || '—' }}</div>
              </div>
            </div>
            <div v-if="getVehicle(selectedAppt.listingId)" class="detail-row">
              <div class="detail-icon"></div>
              <div>
                <div class="detail-key">Vehículo</div>
                <div class="detail-val">
                  ${{ formatPrice(getVehicle(selectedAppt.listingId).price) }} ·
                  {{
                    formatMileage(getVehicle(selectedAppt.listingId).mileageKm)
                  }}
                  km ·
                  {{ getVehicle(selectedAppt.listingId).transmission }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="mfooter-btn mfooter-ghost"
              @click="openReschedule(selectedAppt)"
            >
              Reagendar
            </button>
            <button
              class="mfooter-btn mfooter-danger"
              @click="openCancel(selectedAppt)"
            >
              Cancelar Cita
            </button>
            <button
              class="mfooter-btn mfooter-close"
              @click="modals.detail = false"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      <!-- MODAL REAGENDAR -->
      <div
        class="modal-overlay"
        :class="{ open: modals.reschedule }"
        @click.self="modals.reschedule = false"
      >
        <div v-if="selectedAppt" class="modal">
          <div class="modal-header">
            <div class="modal-title-label">Reagendar Cita</div>
            <button class="modal-close" @click="modals.reschedule = false">
              ✕
            </button>
          </div>
          <div class="modal-car-name" style="font-size: 17px">
            {{ getVehicleTitle(selectedAppt.listingId) }}
          </div>
          <div class="modal-code">
            Código: {{ selectedAppt.id.toUpperCase() }}
          </div>
          <div
            style="
              padding: 0 24px 20px;
              display: flex;
              flex-direction: column;
              gap: 14px;
            "
          >
            <div class="rform-group">
              <label class="rform-label">Nueva Fecha</label>
              <input
                v-model="rescheduleForm.date"
                type="date"
                class="rform-input"
                :min="today"
              />
            </div>
            <div class="rform-group">
              <label class="rform-label">Nueva Hora</label>
              <select v-model="rescheduleForm.time" class="rform-input">
                <option value="">Selecciona una hora</option>
                <option v-for="t in timeSlots" :key="t" :value="t">
                  {{ t }}
                </option>
              </select>
            </div>
            <div class="rform-group">
              <label class="rform-label">Motivo del cambio (opcional)</label>
              <textarea
                v-model="rescheduleForm.notes"
                class="rform-input rform-textarea"
                placeholder="Ej: Cambio de horario por trabajo..."
              ></textarea>
            </div>
            <div class="reschedule-info">
              <span>⚠️</span>
              <span
                >El vendedor recibirá una notificación con la nueva fecha
                propuesta.</span
              >
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="mfooter-btn mfooter-close"
              @click="modals.reschedule = false"
            >
              Cancelar
            </button>
            <button
              class="mfooter-btn mfooter-primary"
              @click="confirmReschedule"
            >
              Confirmar Reagendado
            </button>
          </div>
        </div>
      </div>

      <!-- MODAL CANCELAR -->
      <div
        class="modal-overlay"
        :class="{ open: modals.cancel }"
        @click.self="modals.cancel = false"
      >
        <div v-if="selectedAppt" class="modal">
          <div class="modal-header">
            <div class="modal-title-label">Cancelar Cita</div>
            <button class="modal-close" @click="modals.cancel = false">
              ✕
            </button>
          </div>
          <div class="modal-car-name" style="font-size: 17px">
            {{ getVehicleTitle(selectedAppt.listingId) }}
          </div>
          <div class="modal-code">
            Código: {{ selectedAppt.id.toUpperCase() }}
          </div>
          <div
            style="
              padding: 0 24px 20px;
              display: flex;
              flex-direction: column;
              gap: 14px;
            "
          >
            <div class="cancel-warning">
              <div class="cancel-warning-icon">⚠️</div>
              <div>
                <div
                  style="font-weight: 600; font-size: 13px; margin-bottom: 4px"
                >
                  ¿Estás seguro de cancelar?
                </div>
                <div style="font-size: 12px; color: #7b8099; line-height: 1.5">
                  Esta acción no se puede deshacer. El vendedor será notificado
                  automáticamente.
                </div>
              </div>
            </div>
            <div class="rform-group">
              <label class="rform-label">Motivo de cancelación</label>
              <select v-model="cancelForm.reason" class="rform-input">
                <option value="">Selecciona un motivo</option>
                <option>Ya no me interesa el auto</option>
                <option>Encontré otra opción</option>
                <option>Problemas de agenda</option>
                <option>El precio no me conviene</option>
                <option>Otro motivo</option>
              </select>
            </div>
            <div class="rform-group">
              <label class="rform-label"
                >Comentarios adicionales (opcional)</label
              >
              <textarea
                v-model="cancelForm.notes"
                class="rform-input rform-textarea"
                placeholder="Cuéntanos más sobre tu decisión..."
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="mfooter-btn mfooter-ghost"
              @click="modals.cancel = false"
            >
              Volver
            </button>
            <button class="mfooter-btn mfooter-danger" @click="confirmCancel">
              Sí, cancelar cita
            </button>
          </div>
        </div>
      </div>

      <!-- TOAST -->
      <div
        class="toast"
        :class="{ 'toast-show': toast.show, ['toast-' + toast.type]: true }"
      >
        {{ toast.message }}
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import appointmentsData from '../../../mocks/appointments/appointments.json';
import listingsData from '../../../mocks/catalog/listings.json';

const appointments = ref(appointmentsData);
const allListings = listingsData.items;

// ─── FILTROS ───────────────────────────────────────────────────────────────────
const activeFilter = ref('all');
const filters = [
  { label: 'Todas', value: 'all' },
  { label: 'Confirmadas', value: 'confirmed' },
  { label: 'Pendientes', value: 'pending' },
  { label: 'Reagendadas', value: 'rescheduled' },
  { label: 'Canceladas', value: 'cancelled' },
];

const filteredAppointments = computed(() => {
  if (activeFilter.value === 'all') return appointments.value;
  return appointments.value.filter((a) => a.status === activeFilter.value);
});

const getCount = (filter) => {
  if (filter === 'all') return appointments.value.length;
  return appointments.value.filter((a) => a.status === filter).length;
};

// ─── MODAL STATE ───────────────────────────────────────────────────────────────
const modals = ref({ detail: false, reschedule: false, cancel: false });
const selectedAppt = ref(null);
const rescheduleForm = ref({ date: '', time: '', notes: '' });
const cancelForm = ref({ reason: '', notes: '' });
const toast = ref({ show: false, message: '', type: 'success' });
const today = new Date().toISOString().split('T')[0];
const timeSlots = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
];

// ─── HELPERS ───────────────────────────────────────────────────────────────────
const formatPrice = (p) => new Intl.NumberFormat('es-MX').format(p);
const formatMileage = (km) => new Intl.NumberFormat('es-MX').format(km);
const formatDate = (d) =>
  new Date(d + 'T00:00:00').toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
const getImageUrl = (url) =>
  url?.includes('unsplash.com')
    ? `${url}?w=120&h=80&fit=crop&auto=format&q=80`
    : url || '';
const getVehicle = (id) => allListings.find((v) => v.id === id);
const getVehicleTitle = (id) => getVehicle(id)?.title || id;

const statusLabel = (s) =>
  ({
    confirmed: 'Confirmada',
    pending: 'Pendiente',
    rescheduled: 'Reagendada',
    cancelled: 'Cancelada',
  })[s] || s;
const statusClass = (s) =>
  ({
    confirmed: 'status-confirmed',
    pending: 'status-pending',
    rescheduled: 'status-rescheduled',
    cancelled: 'status-cancelled',
  })[s] || '';

// ─── ACCIONES ──────────────────────────────────────────────────────────────────
const openModal = (appt) => {
  selectedAppt.value = appt;
  modals.value.detail = true;
};
const openReschedule = (appt) => {
  selectedAppt.value = appt;
  modals.value.detail = false;
  modals.value.reschedule = true;
};
const openCancel = (appt) => {
  selectedAppt.value = appt;
  modals.value.detail = false;
  modals.value.cancel = true;
};

const confirmReschedule = () => {
  if (!rescheduleForm.value.date || !rescheduleForm.value.time) {
    showToast('⚠️ Selecciona fecha y hora.', 'warn');
    return;
  }
  const idx = appointments.value.findIndex(
    (a) => a.id === selectedAppt.value.id
  );
  if (idx !== -1) {
    appointments.value[idx].date = rescheduleForm.value.date;
    appointments.value[idx].time = rescheduleForm.value.time;
    appointments.value[idx].status = 'rescheduled';
  }
  modals.value.reschedule = false;
  rescheduleForm.value = { date: '', time: '', notes: '' };
  showToast('✅ Cita reagendada. El vendedor fue notificado.', 'success');
};

const confirmCancel = () => {
  if (!cancelForm.value.reason) {
    showToast('⚠️ Selecciona un motivo.', 'warn');
    return;
  }
  const idx = appointments.value.findIndex(
    (a) => a.id === selectedAppt.value.id
  );
  if (idx !== -1) appointments.value[idx].status = 'cancelled';
  modals.value.cancel = false;
  cancelForm.value = { reason: '', notes: '' };
  showToast('🗑️ Cita cancelada. El vendedor fue notificado.', 'danger');
};

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type };
  setTimeout(() => {
    toast.value.show = false;
  }, 3200);
};
</script>

<style scoped>
.appointments-page {
  --bg: transparent;
  --surface: #ffffff;
  --surface2: #f8fafc;
  --border: #e2e8f0;
  --accent: #3b82f6;
  --accent2: #60a5fa;
  --text: #1e293b;
  --muted: #64748b;
  --danger: #ef4444;
  --success: #22c55e;
  --warning: #f59e0b;
  --radius: 16px;
  color: var(--text);
  font-family:
    'Inter',
    -apple-system,
    sans-serif;
  font-size: 14px;
  min-height: 100vh;
  padding: 28px 24px 60px;
  max-width: 1200px;
  margin: 0 auto;
}
/* HEADER */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
  animation: fadeUp 0.4s ease both;
}
.page-title {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 4px;
}
.page-sub {
  font-size: 13px;
  color: var(--muted);
}
.header-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.filter-btn {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--muted);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}
.filter-btn:hover {
  border-color: var(--accent);
  color: var(--text);
}
.filter-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.filter-count {
  background: #eaf2ff;
  color: #1d4ed8;
  border-radius: 10px;
  padding: 1px 6px;
  font-size: 11px;
}

/* LIST */
.appt-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: fadeUp 0.45s 0.05s ease both;
}
.appt-row {
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition:
    border-color 0.2s,
    transform 0.2s;
}
.appt-row:hover {
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateX(4px);
}

.appt-img {
  width: 90px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
  background: var(--surface2);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.appt-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.appt-img-placeholder {
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
}

.appt-info {
  flex: 1;
  min-width: 0;
}
.appt-car {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.appt-meta {
  font-size: 11px;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}
.sep {
  color: var(--border);
}
.appt-notes {
  font-size: 11px;
  color: var(--muted);
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.appt-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  flex-shrink: 0;
}
.appt-status {
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  white-space: nowrap;
}
.status-confirmed {
  background: rgba(34, 197, 94, 0.12);
  color: #22c55e;
}
.status-pending {
  background: rgba(245, 158, 11, 0.12);
  color: #f59e0b;
}
.status-rescheduled {
  background: rgba(59, 130, 246, 0.12);
  color: #60a5fa;
}
.status-cancelled {
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
}
.appt-btns {
  display: flex;
  gap: 6px;
}
.btn-sm {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  white-space: nowrap;
}
.btn-sm:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.btn-ghost {
  background: var(--surface2);
  color: var(--text);
  border: 1px solid var(--border);
}
.btn-primary {
  background: var(--accent);
  color: #fff;
}
.btn-danger {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

/* EMPTY */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--muted);
}
.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s;
}
.modal-overlay.open {
  opacity: 1;
  pointer-events: all;
}
.modal {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  width: 440px;
  max-width: 96vw;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.25);
  transform: translateY(20px) scale(0.97);
  transition: transform 0.28s cubic-bezier(0.22, 0.68, 0, 1.2);
  overflow: hidden;
  color: #1e293b;
}
.modal-overlay.open .modal {
  transform: none;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 0;
}
.modal-title-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #64748b;
  font-weight: 600;
}
.modal-close {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  font-size: 15px;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-close:hover {
  color: #1e293b;
}
.modal-car-name {
  font-size: 22px;
  font-weight: 800;
  text-align: center;
  padding: 16px 24px 4px;
}
.modal-code {
  text-align: center;
  font-size: 11px;
  color: #64748b;
  padding-bottom: 18px;
}
.modal-status-bar {
  margin: 0 24px 18px;
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 10px;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}
.modal-status-bar .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
}
.modal-status-bar span {
  color: #22c55e;
  font-weight: 600;
}
.modal-details {
  padding: 0 24px 20px;
  display: flex;
  flex-direction: column;
}
.detail-row {
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
  gap: 12px;
}
.detail-row:last-child {
  border-bottom: none;
}
.detail-icon {
  font-size: 15px;
  min-width: 20px;
}
.detail-key {
  font-size: 11px;
  color: #64748b;
  margin-bottom: 2px;
  font-weight: 500;
}
.detail-val {
  font-size: 13px;
  font-weight: 500;
}
.modal-footer {
  display: flex;
  gap: 10px;
  padding: 16px 24px 22px;
  border-top: 1px solid #e2e8f0;
}
.mfooter-btn {
  flex: 1;
  padding: 10px 0;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;
}
.mfooter-btn:hover {
  opacity: 0.88;
}
.mfooter-ghost {
  background: #f8fafc;
  color: #1e293b;
  border: 1px solid #e2e8f0;
}
.mfooter-danger {
  background: #ef4444;
  color: #fff;
}
.mfooter-close {
  background: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
}
.mfooter-primary {
  background: #3b82f6;
  color: #fff;
}
.rform-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.rform-label {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}
.rform-input {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 12px;
  color: #1e293b;
  font-size: 13px;
  outline: none;
  width: 100%;
}
.rform-input:focus {
  border-color: #3b82f6;
}
.rform-textarea {
  resize: vertical;
  min-height: 72px;
}
.reschedule-info {
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 11px;
  color: #f59e0b;
  display: flex;
  gap: 8px;
}
.cancel-warning {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 10px;
  padding: 14px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.cancel-warning-icon {
  font-size: 20px;
}
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  background: #ffffff;
  color: #1e293b;
  border: 1px solid #e2e8f0;
  opacity: 0;
  transform: translateY(12px);
  pointer-events: none;
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.toast-show {
  opacity: 1;
  transform: none;
  pointer-events: all;
}
.toast-success {
  background: rgba(34, 197, 94, 0.15);
  border-color: rgba(34, 197, 94, 0.3);
  color: #22c55e;
}
.toast-warn {
  background: rgba(245, 158, 11, 0.15);
  border-color: rgba(245, 158, 11, 0.3);
  color: #f59e0b;
}
.toast-danger {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
