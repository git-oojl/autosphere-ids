<template>
  <div class="dashboard">
    <!-- WELCOME -->
    <div class="welcome-bar">
      <div class="welcome-left">
        <div class="avatar-circle">A</div>
        <div>
          <h2 class="welcome-title">
            ¡Hola, Anónimo! <span class="wave">👋</span>
          </h2>
          <p class="welcome-sub">Comprador Verificado · Bienvenido de nuevo</p>
        </div>
      </div>
    </div>

    <!-- STATS -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon"></div>
        <div class="stat-label">Citas Próximas</div>
        <div class="stat-value">
          {{ dashboardData.summary.upcomingAppointments }}
        </div>
        <div class="stat-sub">Próxima: {{ nextAppointmentLabel }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon"></div>
        <div class="stat-label">Autos Guardados</div>
        <div class="stat-value">{{ dashboardData.summary.savedVehicles }}</div>
        <div class="stat-sub">
          {{ savedVehicles.length }} vehículos en tu lista
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon"></div>
        <div class="stat-label">Búsquedas</div>
        <div class="stat-value">
          {{ dashboardData.summary.searchesThisMonth }}
        </div>
        <div class="stat-sub">Este mes</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon"></div>
        <div class="stat-label">Ofertas</div>
        <div class="stat-value">2</div>
        <div class="stat-sub">Nuevas esta semana</div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="left-column">
        <!-- APPOINTMENTS -->
        <div class="section-header">
          <div class="section-title section-title-with-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Próximas Citas
          </div>
          <a class="see-all" @click="goToAppointments">Ver todas →</a>
        </div>
        <div class="appt-grid">
          <div
            v-for="appt in visibleAppointments"
            :key="appt.id"
            class="appt-card"
            :class="{ 'appt-cancelled': appt.status === 'cancelled' }"
            @click="openModal(appt)"
          >
            <div class="appt-date-row">
              <div class="appt-date">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {{ formatDate(appt.date) }}
              </div>
              <div class="appt-time">{{ appt.time }}</div>
            </div>
            <div class="appt-car">{{ getVehicleTitle(appt.listingId) }}</div>
            <div class="appt-dealer">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {{ appt.locationLabel }}
            </div>
            <div class="appt-status" :class="statusClass(appt.status)">
              {{ statusLabel(appt.status) }}
            </div>
            <div class="appt-btns" @click.stop>
              <button class="btn-sm btn-ghost" @click="openModal(appt)">
                Ver detalles
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

        <!-- FAVORITES -->
        <div class="section-header favs-header">
          <div class="section-title section-title-with-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              />
            </svg>
            Tus autos favoritos
          </div>
        </div>
        <div class="favs-sub">
          <a @click="router.push({ name: 'buyer-saved-vehicles' })"
            >Ver todos ({{ savedVehicles.length }}) →</a
          >
        </div>
        <div class="cars-grid">
          <div
            v-for="vehicle in savedVehicles"
            :key="vehicle.id"
            class="car-card"
            @click="goToDetail(vehicle.id)"
          >
            <div class="car-img">
              <img
                :src="getImageUrl(vehicle.coverImage)"
                :alt="vehicle.title"
              />
            </div>
            <div class="car-info">
              <div class="car-name">{{ vehicle.title }}</div>
              <div class="car-price">${{ formatPrice(vehicle.price) }}</div>
              <div class="car-specs">
                {{ formatMileage(vehicle.mileageKm) }} km ·
                {{ vehicle.transmission }} · {{ vehicle.fuel }}
              </div>
              <div class="car-btns">
                <button class="btn-see" @click.stop="goToDetail(vehicle.id)">
                  Ver auto
                </button>
                <div class="btn-icon" title="Comparar">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M10 3H5a2 2 0 0 0-2 2v5M14 21h5a2 2 0 0 0 2-2v-5M21 10V5a2 2 0 0 0-2-2h-5M3 14v5a2 2 0 0 0 2 2h5"
                    />
                  </svg>
                </div>
                <div class="btn-icon" title="Quitar favorito" @click.stop>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SEARCH HISTORY -->
        <div class="section-header">
          <div class="section-title section-title-with-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="12 8 12 12 15 15" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            Búsquedas recientes
          </div>
          <a class="see-all" @click="goToSearchHistory"
            >Ver historial completo →</a
          >
        </div>
        <div class="searches-card">
          <div v-for="(s, i) in searchHistory" :key="i" class="search-row">
            <div>
              <div class="search-text">{{ s.query }}</div>
              <div class="search-meta">
                <span> {{ s.date }}</span>
                <span class="dot"></span>
                <span>{{ s.resultsCount }} resultados</span>
              </div>
            </div>
            <div class="search-actions">
              <button class="btn-link btn-link-blue">Buscar de nuevo</button>
              <button class="btn-link btn-link-muted">Guardar</button>
              <button class="btn-close-sm">×</button>
            </div>
          </div>
        </div>
      </div>

      <div class="right-column">
        <div class="quick-actions-panel">
          <div class="section-header">
            <div class="section-title">Acciones rápidas</div>
          </div>
          <div class="quick-actions-grid">
            <button class="quick-action-card primary" @click="goToCatalog">
              <div class="quick-action-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <span>Buscar autos</span>
            </button>
            <button class="quick-action-card" @click="goToAppointments">
              <div class="quick-action-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <span>Mis citas</span>
            </button>
            <button class="quick-action-card" @click="goToSavedVehicles">
              <div class="quick-action-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  />
                </svg>
              </div>
              <span>Favoritos</span>
            </button>
            <button class="quick-action-card" @click="goToSearchHistory">
              <div class="quick-action-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="12 8 12 12 15 15" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <span>Historial</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DETALLE -->
    <Teleport to="body">
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
          <div
            class="modal-status-bar"
            :class="'status-bar-' + selectedAppt.status"
          >
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
            <div class="detail-row">
              <div class="detail-icon"></div>
              <div>
                <div class="detail-key">Vehículo</div>
                <div
                  v-if="getVehicle(selectedAppt.listingId)"
                  class="detail-val"
                >
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
              <label class="rform-label"> Nueva Fecha</label>
              <input
                v-model="rescheduleForm.date"
                type="date"
                class="rform-input"
                :min="today"
              />
            </div>
            <div class="rform-group">
              <label class="rform-label"> Nueva Hora</label>
              <select v-model="rescheduleForm.time" class="rform-input">
                <option value="">Selecciona una hora</option>
                <option v-for="t in timeSlots" :key="t" :value="t">
                  {{ t }}
                </option>
              </select>
            </div>
            <div class="rform-group">
              <label class="rform-label"> Motivo del cambio (opcional)</label>
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
              <label class="rform-label"> Motivo de cancelación</label>
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
              <label class="rform-label">
                Comentarios adicionales (opcional)</label
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
import { useRouter } from 'vue-router';
import appointmentsData from '../../../mocks/appointments/appointments.json';
import dashboardJson from '../../../mocks/buyer/dashboard.json';
import savedVehiclesJson from '../../../mocks/buyer/saved-vehicles.json';
import listingsData from '../../../mocks/catalog/listings.json';

const router = useRouter();

// ─── DATA ──────────────────────────────────────────────────────────────────────
const dashboardData = ref(dashboardJson);
const appointments = ref(appointmentsData);
const savedVehicles = ref(savedVehiclesJson.items || savedVehiclesJson);
const allListings = listingsData.items;

const searchHistory = ref([
  {
    query: 'SUV · Automático · 4x4 · Menos de 50,000 km',
    date: 'Hoy 10:30',
    resultsCount: 5,
  },
  {
    query: 'Honda Civic · 2022-2024 · Gasolina · Manual',
    date: 'Ayer 14:20',
    resultsCount: 12,
  },
  {
    query: 'Diésel · Manual · Menos de 100,000 km · Menos de $20,000',
    date: 'Ayer 11:45',
    resultsCount: 23,
  },
]);

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

// ─── COMPUTED ──────────────────────────────────────────────────────────────────
const visibleAppointments = computed(() =>
  appointments.value.filter((a) => a.status !== 'cancelled').slice(0, 3)
);

const nextAppointmentLabel = computed(() => {
  const next = appointments.value
    .filter((a) => a.status === 'confirmed' || a.status === 'pending')
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  return next ? `${formatDate(next.date)} ${next.time}` : 'Sin citas próximas';
});

// ─── HELPERS ───────────────────────────────────────────────────────────────────
const formatPrice = (p) => new Intl.NumberFormat('es-MX').format(p);
const formatMileage = (km) => new Intl.NumberFormat('es-MX').format(km);
const formatDate = (d) => {
  const date = new Date(d + 'T00:00:00');
  return date.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
const getImageUrl = (url) => {
  if (!url) return 'https://placehold.co/400x200/1e2028/ffffff?text=Sin+imagen';
  if (url.includes('unsplash.com'))
    return `${url}?w=400&h=200&fit=crop&auto=format&q=80`;
  return url;
};
const getVehicle = (listingId) => allListings.find((v) => v.id === listingId);
const getVehicleTitle = (listingId) =>
  getVehicle(listingId)?.title || listingId;

const statusLabel = (status) =>
  ({
    confirmed: 'Confirmada',
    pending: 'Pendiente',
    rescheduled: 'Reagendada',
    cancelled: 'Cancelada',
  })[status] || status;

const statusClass = (status) =>
  ({
    confirmed: 'status-confirmed',
    pending: 'status-pending',
    rescheduled: 'status-rescheduled',
    cancelled: 'status-cancelled',
  })[status] || '';

// ─── NAVIGATION ────────────────────────────────────────────────────────────────
const goToDetail = (id) => {
  router.push({ name: 'public-listing-detail', params: { id } });
};
const goToCatalog = () => router.push({ name: 'public-catalog' });
const goToAppointments = () => router.push({ name: 'user-appointments' });
const goToSavedVehicles = () => router.push({ name: 'buyer-saved-vehicles' });
const goToSearchHistory = () => router.push({ name: 'buyer-search-history' });

// ─── MODAL ACTIONS ─────────────────────────────────────────────────────────────
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
    showToast('⚠️ Por favor selecciona fecha y hora.', 'warn');
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
  showToast(
    '✅ Cita reagendada correctamente. El vendedor fue notificado.',
    'success'
  );
};

const confirmCancel = () => {
  if (!cancelForm.value.reason) {
    showToast('⚠️ Por favor selecciona un motivo.', 'warn');
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
/* ── VARIABLES ── */
.dashboard {
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
  background: transparent;
  padding: 28px 24px 60px;
  max-width: 1400px;
  margin: 0 auto;
}
/* ── WELCOME ── */
.welcome-bar {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  padding: 18px;
  margin-bottom: 24px;
}

.welcome-left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.avatar-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
}
.welcome-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 2px;
}
.welcome-sub {
  font-size: 12px;
  color: var(--success);
}
.wave {
  font-size: 20px;
}

/* ── STATS ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 32px;
  animation: fadeUp 0.45s 0.05s ease both;
}
.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px;
  transition:
    border-color 0.2s,
    transform 0.2s;
  cursor: default;
}
.stat-card:hover {
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}
.stat-icon {
  font-size: 20px;
  margin-bottom: 10px;
}
.stat-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--muted);
  margin-bottom: 6px;
}
.stat-value {
  font-size: 28px;
  font-weight: 800;
  color: var(--text);
  line-height: 1;
  margin-bottom: 4px;
}
.stat-sub {
  font-size: 11px;
  color: var(--muted);
}

/* ── GRID ── */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 330px;
  gap: 20px;
}
.right-column {
  align-self: start;
}
.quick-actions-panel {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
}

/* ── QUICK ACTIONS ── */
.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.quick-action-card {
  border: 1px solid var(--border);
  background: #ffffff;
  border-radius: var(--radius);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  transition:
    transform 0.2s,
    border-color 0.2s;
}
.quick-action-card.primary {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-color: transparent;
  color: #fff;
}
.quick-action-card:hover {
  transform: translateY(-2px);
  border-color: rgba(59, 130, 246, 0.35);
}
.quick-action-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eef4ff;
}
.quick-action-icon svg {
  width: 18px;
  height: 18px;
  color: #3b82f6;
}
.quick-action-card.primary .quick-action-icon {
  background: rgba(255, 255, 255, 0.2);
}
.quick-action-card.primary .quick-action-icon svg {
  color: #fff;
}

/* ── SECTION HEADER ── */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.section-title {
  font-size: 16px;
  font-weight: 700;
}
.section-title-with-icon {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.section-title-with-icon svg {
  width: 16px;
  height: 16px;
  color: #3b82f6;
}
.see-all {
  font-size: 12px;
  color: var(--accent2);
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}
.see-all:hover {
  color: var(--accent);
}

/* ── APPOINTMENTS ── */
.appt-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 32px;
  animation: fadeUp 0.45s 0.1s ease both;
}
.appt-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  transition:
    border-color 0.2s,
    transform 0.2s;
  cursor: pointer;
}
.appt-card:hover {
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}
.appt-cancelled {
  opacity: 0.5;
  pointer-events: none;
}
.appt-date-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.appt-date {
  font-size: 11px;
  color: #475569;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
}
.appt-date svg {
  width: 14px;
  height: 14px;
  color: #3b82f6;
}
.appt-time {
  font-size: 12px;
  font-weight: 700;
  color: #1e3a5f;
  padding: 4px 9px;
  border-radius: 999px;
  background: #eaf2ff;
}
.appt-car {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
}
.appt-dealer {
  font-size: 11px;
  color: var(--muted);
  margin-bottom: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.appt-dealer svg {
  width: 13px;
  height: 13px;
  color: #64748b;
}
.appt-status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 12px;
  letter-spacing: 0.2px;
}
.status-confirmed {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
}
.status-pending {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
}
.status-rescheduled {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1d4ed8;
}
.status-cancelled {
  background: rgba(239, 68, 68, 0.12);
  color: var(--danger);
  text-decoration: line-through;
}
.appt-btns {
  display: flex;
  gap: 6px;
}
.btn-sm {
  flex: 1;
  padding: 6px 0;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-sm:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.btn-sm:hover:not(:disabled) {
  opacity: 0.85;
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
  color: var(--danger);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

/* ── FAVORITES ── */
.favs-header {
  margin-bottom: 6px;
}
.favs-sub {
  font-size: 11px;
  color: var(--muted);
  margin-bottom: 14px;
  cursor: pointer;
}
.favs-sub a {
  color: var(--accent2);
  text-decoration: none;
  cursor: pointer;
}
.cars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 32px;
  animation: fadeUp 0.45s 0.15s ease both;
}
.car-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition:
    border-color 0.2s,
    transform 0.2s;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(30, 58, 95, 0.06);
}
.car-card:hover {
  border-color: rgba(59, 130, 246, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(30, 58, 95, 0.1);
}
.car-img {
  width: 100%;
  height: 130px;
  background: var(--surface2);
}
.car-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.car-info {
  padding: 12px 14px 14px;
}
.car-name {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 4px;
}
.car-price {
  font-size: 15px;
  font-weight: 700;
  color: var(--accent2);
  margin-bottom: 6px;
}
.car-specs {
  font-size: 10px;
  color: var(--muted);
  margin-bottom: 12px;
}
.car-btns {
  display: flex;
  gap: 6px;
  align-items: center;
}
.btn-see {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
  transition: all 0.2s;
}
.btn-see:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.28);
}
.btn-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--surface2);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 13px;
  transition: border-color 0.2s;
}
.btn-icon:hover {
  border-color: var(--accent);
}
.btn-icon svg {
  width: 15px;
  height: 15px;
  color: #64748b;
}

/* ── SEARCHES ── */
.searches-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  margin-bottom: 32px;
  animation: fadeUp 0.45s 0.2s ease both;
  box-shadow: 0 2px 10px rgba(30, 58, 95, 0.06);
}
.search-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  transition: background 0.2s;
  cursor: pointer;
}
.search-row:last-child {
  border-bottom: none;
}
.search-row:hover {
  background: #f1f7ff;
}
.search-text {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 4px;
}
.search-meta {
  font-size: 11px;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 10px;
}
.search-meta .dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--muted);
}
.search-actions {
  display: flex;
  gap: 8px;
}
.btn-link {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 6px;
  transition:
    background 0.2s,
    color 0.2s;
}
.btn-link-blue {
  color: var(--accent2);
}
.btn-link-blue:hover {
  background: rgba(59, 130, 246, 0.12);
  color: #1d4ed8;
}
.btn-link-muted {
  color: var(--muted);
}
.btn-link-muted:hover {
  background: var(--surface2);
  color: var(--text);
}
.btn-close-sm {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--muted);
  font-size: 16px;
  padding: 2px 6px;
  border-radius: 4px;
  transition: color 0.2s;
}
.btn-close-sm:hover {
  color: var(--danger);
}

/* ── MODAL ── */
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
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.5);
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
  transition: color 0.2s;
}
.modal-close:hover {
  color: #0f172a;
}
.modal-car-name {
  font-size: 22px;
  font-weight: 800;
  text-align: center;
  padding: 16px 24px 4px;
  color: #0f172a;
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
  gap: 0;
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
  margin-top: 1px;
}
.detail-key {
  font-size: 11px;
  color: #64748b;
  margin-bottom: 2px;
  font-weight: 500;
}
.detail-val {
  font-size: 13px;
  color: #1e293b;
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
  transition:
    opacity 0.2s,
    transform 0.15s;
}
.mfooter-btn:hover {
  opacity: 0.88;
  transform: translateY(-1px);
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

/* ── RESCHEDULE FORM ── */
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
  transition: border-color 0.2s;
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

/* ── TOAST ── */
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

/* ── ANIMATIONS ── */
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

@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .quick-actions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
