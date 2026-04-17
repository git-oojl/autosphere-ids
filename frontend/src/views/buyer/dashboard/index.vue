<template>
  <div class="buyer-page">
    <div class="dashboard">
      <!-- STATS -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" aria-hidden="true" />
          <div class="stat-label">Citas Próximas</div>
          <div class="stat-value">
            {{ dashboardData.summary.upcomingAppointments }}
          </div>
          <div class="stat-sub">Próxima: {{ nextAppointmentLabel }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" aria-hidden="true" />
          <div class="stat-label">Autos Guardados</div>
          <div class="stat-value">
            {{ dashboardData.summary.savedVehicles }}
          </div>
          <div class="stat-sub">
            {{ savedVehicles.length }} vehículos en tu lista
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" aria-hidden="true" />
          <div class="stat-label">Búsquedas</div>
          <div class="stat-value">
            {{ dashboardData.summary.searchesThisMonth }}
          </div>
          <div class="stat-sub">Este mes</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" aria-hidden="true" />
          <div class="stat-label">Ofertas</div>
          <div class="stat-value">{{ offersCount }}</div>
          <div class="stat-sub">Nuevas esta semana</div>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="left-column">
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
              <div class="appt-car">{{ getVehicleTitle(appt) }}</div>
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
                <button
                  type="button"
                  class="btn-sm btn-ghost"
                  @click="openModal(appt)"
                >
                  Ver detalles
                </button>
                <button
                  type="button"
                  class="btn-sm btn-primary"
                  :disabled="appt.status === 'cancelled'"
                  @click="openReschedule(appt)"
                >
                  Reagendar
                </button>
                <button
                  type="button"
                  class="btn-sm btn-danger"
                  :disabled="appt.status === 'cancelled'"
                  @click="openCancel(appt)"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>

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
            <a @click="goToSavedVehicles"
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
                  <button
                    type="button"
                    class="btn-see"
                    @click.stop="goToDetail(vehicle.id)"
                  >
                    Ver auto
                  </button>
                  <div class="btn-icon" title="Comparar" @click.stop>
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
            <div
              v-for="(s, i) in searchHistory"
              :key="s.id || i"
              class="search-row"
            >
              <div>
                <div class="search-text">{{ s.query }}</div>
                <div class="search-meta">
                  <span>{{ s.date }}</span>
                  <span class="dot"></span>
                  <span>{{ s.resultsCount }} resultados</span>
                </div>
              </div>
              <div class="search-actions">
                <button
                  type="button"
                  class="btn-link btn-link-blue"
                  @click.stop="repeatSearch(s.query)"
                >
                  Buscar de nuevo
                </button>
                <button
                  type="button"
                  class="btn-link btn-link-muted"
                  @click.stop="stubSaveSearch(s)"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  class="btn-close-sm"
                  @click.stop="removeSearch(i)"
                >
                  ×
                </button>
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
              <button
                type="button"
                class="quick-action-card primary"
                @click="goToCatalog"
              >
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
              <button
                type="button"
                class="quick-action-card"
                @click="goToAppointments"
              >
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
              <button
                type="button"
                class="quick-action-card"
                @click="goToSavedVehicles"
              >
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
              <button
                type="button"
                class="quick-action-card"
                @click="goToSearchHistory"
              >
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

      <Teleport to="body">
        <div
          class="modal-overlay"
          :class="{ open: modals.detail }"
          @click.self="modals.detail = false"
        >
          <div v-if="selectedAppt" class="modal">
            <div class="modal-header">
              <div class="modal-title-label">Detalle de la cita</div>
              <button
                type="button"
                class="modal-close"
                @click="modals.detail = false"
              >
                ✕
              </button>
            </div>
            <div class="modal-car-name">
              {{ getVehicleTitle(selectedAppt) }}
            </div>
            <div class="modal-code">
              Código: {{ String(selectedAppt.id).toUpperCase() }}
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
                    {{ formatDate(selectedAppt.date) }} ·
                    {{ selectedAppt.time }}
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
                    ${{ formatPrice(getVehicle(selectedAppt.listingId).price) }}
                    ·
                    {{
                      formatMileage(
                        getVehicle(selectedAppt.listingId).mileageKm
                      )
                    }}
                    km ·
                    {{ getVehicle(selectedAppt.listingId).transmission }}
                  </div>
                  <div v-else class="detail-val">—</div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="mfooter-btn mfooter-ghost"
                @click="openReschedule(selectedAppt)"
              >
                Reagendar
              </button>
              <button
                type="button"
                class="mfooter-btn mfooter-danger"
                @click="openCancel(selectedAppt)"
              >
                Cancelar Cita
              </button>
              <button
                type="button"
                class="mfooter-btn mfooter-close"
                @click="modals.detail = false"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>

        <div
          class="modal-overlay"
          :class="{ open: modals.reschedule }"
          @click.self="modals.reschedule = false"
        >
          <div v-if="selectedAppt" class="modal">
            <div class="modal-header">
              <div class="modal-title-label">Reagendar Cita</div>
              <button
                type="button"
                class="modal-close"
                @click="modals.reschedule = false"
              >
                ✕
              </button>
            </div>
            <div class="modal-car-name modal-car-name-sm">
              {{ getVehicleTitle(selectedAppt) }}
            </div>
            <div class="modal-code">
              Código: {{ String(selectedAppt.id).toUpperCase() }}
            </div>
            <div class="modal-form-body">
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
                type="button"
                class="mfooter-btn mfooter-close"
                @click="modals.reschedule = false"
              >
                Cancelar
              </button>
              <button
                type="button"
                class="mfooter-btn mfooter-primary"
                @click="confirmReschedule"
              >
                Confirmar Reagendado
              </button>
            </div>
          </div>
        </div>

        <div
          class="modal-overlay"
          :class="{ open: modals.cancel }"
          @click.self="modals.cancel = false"
        >
          <div v-if="selectedAppt" class="modal">
            <div class="modal-header">
              <div class="modal-title-label">Cancelar Cita</div>
              <button
                type="button"
                class="modal-close"
                @click="modals.cancel = false"
              >
                ✕
              </button>
            </div>
            <div class="modal-car-name modal-car-name-sm">
              {{ getVehicleTitle(selectedAppt) }}
            </div>
            <div class="modal-code">
              Código: {{ String(selectedAppt.id).toUpperCase() }}
            </div>
            <div class="modal-form-body">
              <div class="cancel-warning">
                <div class="cancel-warning-icon">⚠️</div>
                <div>
                  <div class="cancel-warning-title">
                    ¿Estás seguro de cancelar?
                  </div>
                  <div class="cancel-warning-text">
                    Esta acción no se puede deshacer. El vendedor será
                    notificado automáticamente.
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
                type="button"
                class="mfooter-btn mfooter-ghost"
                @click="modals.cancel = false"
              >
                Volver
              </button>
              <button
                type="button"
                class="mfooter-btn mfooter-danger"
                @click="confirmCancel"
              >
                Sí, cancelar cita
              </button>
            </div>
          </div>
        </div>

        <div
          class="toast"
          :class="{ 'toast-show': toast.show, ['toast-' + toast.type]: true }"
        >
          {{ toast.message }}
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  getBuyerDashboard,
  getSavedVehicles,
  getSearchHistory,
} from '../../../services/buyer.js';
import { cancelAppointment, getBuyerAppointments, rescheduleAppointment } from '../../../services/appointments.js';
import { getListingById } from '../../../services/catalog.js';

const router = useRouter();
const BUYER_ID = 'u-buyer-001';

const dashboardData = ref({
  summary: {
    upcomingAppointments: 0,
    savedVehicles: 0,
    searchesThisMonth: 0,
  },
});

const appointments = ref([]);
const savedVehicles = ref([]);
const searchHistory = ref([]);
const offersCount = ref(0);
const listingsMap = ref({});

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

const visibleAppointments = computed(() =>
  appointments.value.filter((a) => a.status !== 'cancelled').slice(0, 3)
);

const nextAppointmentLabel = computed(() => {
  const next = appointments.value
    .filter((a) => a.status === 'confirmed' || a.status === 'pending')
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  return next ? `${formatDate(next.date)} ${next.time}` : 'Sin citas próximas';
});

function formatSearchDate(ts) {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return '';
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) {
    return `Hoy ${d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`;
  }
  const y = new Date(now);
  y.setDate(y.getDate() - 1);
  if (d.toDateString() === y.toDateString()) {
    return `Ayer ${d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`;
  }
  return d.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

async function loadPanel() {
  try {
    const [dash, savedRes, histRes, appts] = await Promise.all([
      getBuyerDashboard(),
      getSavedVehicles(),
      getSearchHistory(),
      getBuyerAppointments(BUYER_ID),
    ]);

    dashboardData.value = dash;
    savedVehicles.value = savedRes?.items || [];
    searchHistory.value = (histRes?.items || []).map((item) => ({
      id: item.id,
      query: item.query,
      date: formatSearchDate(item.timestamp),
      resultsCount: item.resultCount ?? '—',
    }));
    appointments.value = Array.isArray(appts) ? appts : [];

    const listingIds = [...new Set(appointments.value.map((item) => item.listingId).filter(Boolean))];
    const entries = await Promise.all(listingIds.map(async (id) => [id, await getListingById(id)]));
    listingsMap.value = Object.fromEntries(entries);

    dashboardData.value.summary = {
      ...dashboardData.value.summary,
      savedVehicles: savedVehicles.value.length,
      upcomingAppointments: appointments.value.filter((item) => ['pending', 'confirmed', 'rescheduled'].includes(item.status)).length,
    };
    offersCount.value = appointments.value.filter((item) => item.status === 'pending').length;
  } catch (e) {
    console.error('loadPanel', e);
  }
}

onMounted(loadPanel);

const formatPrice = (p) => new Intl.NumberFormat('es-MX').format(p);
const formatMileage = (km) => new Intl.NumberFormat('es-MX').format(km ?? 0);

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

const getVehicle = (listingId) => listingsMap.value[listingId] || null;

const getVehicleTitle = (appt) =>
  appt?.listingTitle ||
  appt?.listing?.title ||
  getVehicle(appt?.listingId)?.title ||
  appt?.listingId ||
  '—';

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

const goToDetail = (id) => {
  router.push({ name: 'public-listing-detail', params: { id } });
};
const goToCatalog = () => router.push({ name: 'public-catalog' });
const goToAppointments = () => router.push({ name: 'my-appointments' });
const goToSavedVehicles = () => router.push({ name: 'buyer-saved-vehicles' });
const goToSearchHistory = () => router.push({ name: 'buyer-search-history' });

const repeatSearch = (query) => {
  router.push({ name: 'public-catalog', query: { q: query } });
};

const removeSearch = (index) => {
  searchHistory.value = searchHistory.value.filter((_, i) => i !== index);
};

const stubSaveSearch = () => {
  showToast('La búsqueda queda visible en tu historial; el guardado persistente se conectará desde backend.', 'info');
};

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

const confirmReschedule = async () => {
  if (!rescheduleForm.value.date || !rescheduleForm.value.time) {
    showToast('Por favor selecciona fecha y hora.', 'warn');
    return;
  }
  await rescheduleAppointment(selectedAppt.value.id, {
    date: rescheduleForm.value.date,
    time: rescheduleForm.value.time,
    notes: rescheduleForm.value.notes,
  });
  await loadPanel();
  modals.value.reschedule = false;
  rescheduleForm.value = { date: '', time: '', notes: '' };
  showToast('Cita reagendada correctamente. El vendedor fue notificado.', 'success');
};

const confirmCancel = async () => {
  if (!cancelForm.value.reason) {
    showToast('Por favor selecciona un motivo.', 'warn');
    return;
  }
  await cancelAppointment(selectedAppt.value.id, {
    reason: cancelForm.value.reason,
    notes: cancelForm.value.notes,
  });
  await loadPanel();
  modals.value.cancel = false;
  cancelForm.value = { reason: '', notes: '' };
  showToast('Cita cancelada. El vendedor fue notificado.', 'danger');
};

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type };
  setTimeout(() => {
    toast.value.show = false;
  }, 3200);
};
</script>

<style scoped src="./styles.css"></style>
