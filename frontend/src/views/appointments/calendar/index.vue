<template>
  <div class="my-appointments-page">
    <br /><br /><br /><br /><br /><br />
    <!-- Header con bienvenida -->
    <div class="page-header">
      <div class="header-container">
        <div>
          <h1 class="page-title">Mis Citas</h1>
          <p class="page-subtitle">
            {{ subtitleText }}
          </p>
          <div v-if="vehicleFilter" class="active-filter-chip">
            <span>Vehículo: {{ vehicleFilter }}</span>
            <button type="button" @click="clearVehicleFilter">Limpiar</button>
          </div>
        </div>
        <div class="header-date">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
              stroke="currentColor"
              stroke-width="2"
            />
            <line
              x1="8"
              y1="2"
              x2="8"
              y2="6"
              stroke="currentColor"
              stroke-width="2"
            />
            <line
              x1="16"
              y1="2"
              x2="16"
              y2="6"
              stroke="currentColor"
              stroke-width="2"
            />
            <line
              x1="3"
              y1="10"
              x2="21"
              y2="10"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
          <span>{{ currentDate }}</span>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs-container">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="setActiveTab(tab.id)"
      >
        {{ tab.label }}
        <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card" @click="filterByStatus('all')">
        <div class="stat-icon blue">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
              stroke="currentColor"
              stroke-width="2"
            />
            <line
              x1="16"
              y1="2"
              x2="16"
              y2="6"
              stroke="currentColor"
              stroke-width="2"
            />
            <line
              x1="8"
              y1="2"
              x2="8"
              y2="6"
              stroke="currentColor"
              stroke-width="2"
            />
            <line
              x1="3"
              y1="10"
              x2="21"
              y2="10"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ totalCitas }}</span>
          <span class="stat-label">Total Citas</span>
        </div>
      </div>
      <div class="stat-card" @click="filterByStatus('Pendiente')">
        <div class="stat-icon yellow">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="2"
            />
            <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ citasPendientes }}</span>
          <span class="stat-label">Pendientes</span>
        </div>
      </div>
      <div class="stat-card" @click="filterByStatus('Confirmada')">
        <div class="stat-icon green">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ citasConfirmadas }}</span>
          <span class="stat-label">Confirmadas</span>
        </div>
      </div>
      <div class="stat-card" @click="filterByStatus('Completada')">
        <div class="stat-icon purple">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 11.1C22 16.5 17.5 20.9 12 20.9C6.5 20.9 2 16.5 2 11.1C2 6.5 5.8 2.8 10.7 2.2"
              stroke="currentColor"
              stroke-width="2"
            />
            <path d="M22 4L12 14L9 11" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ citasCompletadas }}</span>
          <span class="stat-label">Completadas</span>
        </div>
      </div>
    </div>

    <!-- Filters Bar -->
    <div class="filters-bar">
      <div class="filters-group">
        <span class="filter-label">Ver por:</span>
        <div class="filter-buttons">
          <button
            :class="['filter-btn', { active: viewBy === 'fecha' }]"
            @click="setViewBy('fecha')"
          >
            Fecha
          </button>
          <button
            :class="['filter-btn', { active: viewBy === 'vehiculo' }]"
            @click="setViewBy('vehiculo')"
          >
            Vehículo
          </button>
        </div>
      </div>
      <div class="filters-group">
        <span class="filter-label">Orden:</span>
        <button
          class="order-toggle-btn"
          type="button"
          @click="toggleSortDirection"
        >
          {{ sortDirectionLabel }}
        </button>
      </div>
      <div class="filters-group">
        <span class="filter-label">Filtrar estado:</span>
        <div class="custom-select">
          <button class="select-btn" @click="toggleStatusDropdown">
            {{ statusFilterLabel || 'Todos' }}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
          </button>
          <div v-if="showStatusDropdown" class="dropdown-menu">
            <div class="dropdown-item" @click="setStatusFilter('')">Todos</div>
            <div class="dropdown-item" @click="setStatusFilter('Pendiente')">
              Pendiente
            </div>
            <div class="dropdown-item" @click="setStatusFilter('Confirmada')">
              Confirmada
            </div>
            <div class="dropdown-item" @click="setStatusFilter('Completada')">
              Completada
            </div>
            <div class="dropdown-item" @click="setStatusFilter('Cancelada')">
              Cancelada
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Appointments by Day -->
    <div
      v-for="group in filteredGroupedAppointments"
      :key="group.title"
      class="day-section"
    >
      <h2 class="day-title">{{ group.title }}</h2>
      <p v-if="group.subtitle" class="group-subtitle">{{ group.subtitle }}</p>
      <div class="table-wrapper">
        <table class="appointments-table">
          <colgroup>
            <col class="col-time" />
            <col class="col-contact" />
            <col class="col-vehicle" />
            <col class="col-type" />
            <col class="col-status" />
            <col class="col-action" />
            <col class="col-action" />
            <col class="col-action" />
          </colgroup>
          <thead>
            <tr>
              <th>Hora</th>
              <th>{{ columnLabel }}</th>
              <th>Vehículo</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Ver detalle</th>
              <th>Reprogramar</th>
              <th>Cancelar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in group.appointments" :key="appointment.id">
              <td class="time-cell">{{ appointment.time }}</td>
              <td class="contact-cell">
                <div class="contact-info">
                  <span class="contact-name">{{
                    getContactName(appointment)
                  }}</span>
                  <span class="contact-phone">{{
                    getContactPhone(appointment)
                  }}</span>
                </div>
              </td>
              <td class="vehicle-cell">
                <div class="vehicle-info">
                  <span class="vehicle-title">{{ appointment.vehicle }}</span>
                  <span class="vehicle-year">{{ appointment.year || '' }}</span>
                </div>
              </td>
              <td class="type-cell">
                <span :class="['type-badge', getTipoClass(appointment.tipo)]">
                  {{ getTipoLabel(appointment.tipo) }}
                </span>
              </td>
              <td class="status-cell">
                <span
                  :class="['status-badge', getStatusClass(appointment.status)]"
                >
                  {{ appointment.status }}
                </span>
              </td>
              <td class="actions-cell">
                <button
                  class="action-btn view"
                  @click="viewAppointmentDetail(appointment)"
                >
                  Ver detalle
                </button>
              </td>
              <td class="actions-cell">
                <button
                  class="action-btn reschedule"
                  :disabled="appointment.status === 'Cancelada'"
                  @click="openRescheduleModal(appointment)"
                >
                  Reprogramar
                </button>
              </td>
              <td class="actions-cell">
                <button
                  class="action-btn cancel"
                  :disabled="
                    appointment.status === 'Cancelada' ||
                    appointment.status === 'Completada'
                  "
                  @click="cancelAppointment(appointment)"
                >
                  Cancelar
                </button>
              </td>
            </tr>
            <tr v-if="group.appointments.length === 0">
              <td colspan="8" class="empty-row">No hay citas para este día</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="filteredGroupedAppointments.length === 0"
      class="empty-state-card"
    >
      <h2>No hay citas para mostrar</h2>
      <p>
        Ajusta el filtro de estado o cambia la vista para revisar otras citas.
      </p>
    </div>

    <!-- Reprogramar Modal -->
    <div
      v-if="isRescheduleModalOpen"
      class="modal-overlay"
      @click.self="closeRescheduleModal"
    >
      <div class="modal-container">
        <div class="modal-header">
          <h3>Reprogramar cita</h3>
          <button class="modal-close" @click="closeRescheduleModal">
            &times;
          </button>
        </div>
        <form class="modal-form" @submit.prevent="rescheduleAppointment">
          <div class="form-group">
            <label>Cliente / Vendedor</label>
            <input
              :value="getContactName(rescheduleTarget)"
              type="text"
              disabled
            />
          </div>
          <div class="form-group">
            <label>Vehículo</label>
            <input :value="rescheduleTarget?.vehicle" type="text" disabled />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Nueva Fecha *</label>
              <input
                v-model="rescheduleData.date"
                :min="minDate"
                type="date"
                required
              />
            </div>
            <div class="form-group">
              <label>Nueva Hora *</label>
              <select v-model="rescheduleData.time" required>
                <option value="">Seleccione una hora</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="17:00">05:00 PM</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Motivo de reprogramación</label>
            <textarea
              v-model="rescheduleData.reason"
              rows="2"
              placeholder="Ej: Conflicto de horario..."
            ></textarea>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn-cancel"
              @click="closeRescheduleModal"
            >
              Cancelar
            </button>
            <button type="submit" class="btn-save">Reprogramar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Cancelar Modal -->
    <div
      v-if="showCancelModal"
      class="modal-overlay"
      @click.self="closeCancelModal"
    >
      <div class="modal-container modal-small">
        <div class="modal-header">
          <h3>Cancelar cita</h3>
          <button class="modal-close" @click="closeCancelModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="cancel-icon">⚠️</div>
          <p>¿Estás seguro de que deseas cancelar esta cita?</p>
          <p class="cancel-warning">Esta acción no se puede deshacer.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-cancel" @click="closeCancelModal">
            No, volver
          </button>
          <button
            type="button"
            class="btn-danger"
            @click="confirmCancelAppointment"
          >
            Sí, cancelar cita
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast-notification" :class="toastType">
      <span>{{ toastMessage }}</span>
      <button class="toast-close" @click="showToast = false">×</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  cancelAppointment as cancelAppointmentService,
  getAppointmentCalendar,
  rescheduleAppointment as rescheduleAppointmentService,
} from '../../../services/appointments.js';

const router = useRouter();
const route = useRoute();

const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('success');

const showNotification = (message, type = 'success') => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const normalizeTab = (value) =>
  ['comprador', 'vendedor', 'rentador'].includes(value) ? value : 'comprador';
const normalizeViewBy = (value) =>
  ['fecha', 'vehiculo'].includes(value) ? value : 'fecha';
const normalizeSortDirection = (value) =>
  ['asc', 'desc'].includes(value) ? value : 'desc';
const activeTab = ref(normalizeTab(route.query.tab));
const viewBy = ref(normalizeViewBy(route.query.view));
const sortDirection = ref(normalizeSortDirection(route.query.order));
const statusFilter = ref('');
const showStatusDropdown = ref(false);
const isRescheduleModalOpen = ref(false);
const showCancelModal = ref(false);
const rescheduleTarget = ref(null);
const cancelTarget = ref(null);
const currentDate = ref('');
const appointmentsData = ref({
  comprador: { appointments: [], stats: {} },
  vendedor: { appointments: [], stats: {} },
  rentador: { appointments: [], stats: {} },
});

const rescheduleData = ref({
  date: '',
  time: '',
  reason: '',
});

const loadCalendar = async () => {
  appointmentsData.value =
    (await getAppointmentCalendar()) || appointmentsData.value;
};

const vehicleFilter = computed(() => String(route.query.vehicle || '').trim());
const currentAppointments = computed(() => {
  const items = appointmentsData.value[activeTab.value]?.appointments || [];
  if (!vehicleFilter.value) return items;
  const needle = vehicleFilter.value.toLowerCase();
  return items.filter((appointment) =>
    [appointment.vehicle, appointment.listingTitle].some((value) =>
      String(value || '')
        .toLowerCase()
        .includes(needle)
    )
  );
});
const stats = computed(
  () =>
    appointmentsData.value[activeTab.value]?.stats || {
      total: 0,
      pending: 0,
      confirmed: 0,
      completed: 0,
    }
);

const totalCitas = computed(() => stats.value.total || 0);
const citasPendientes = computed(() => stats.value.pending || 0);
const citasConfirmadas = computed(() => stats.value.confirmed || 0);
const citasCompletadas = computed(() => stats.value.completed || 0);

const tabs = computed(() => {
  const data = appointmentsData.value;
  return [
    {
      id: 'comprador',
      label: 'Comprador',
      badge: data.comprador?.stats?.pending || null,
    },
    {
      id: 'vendedor',
      label: 'Vendedor',
      badge: data.vendedor?.stats?.pending || null,
    },
    {
      id: 'rentador',
      label: 'Arrendador',
      badge: data.rentador?.stats?.pending || null,
    },
  ];
});

const statusFilterLabel = computed(() => statusFilter.value || 'Todos');
const sortDirectionLabel = computed(() =>
  sortDirection.value === 'desc'
    ? 'Más recientes primero'
    : 'Más antiguas primero'
);
const columnLabel = computed(() =>
  activeTab.value === 'comprador' ? 'Vendedor' : 'Cliente'
);
const subtitleText = computed(() => {
  const baseByTab = {
    comprador: 'Listado completo de tus citas como comprador.',
    vendedor: 'Agenda de citas relacionadas con tus publicaciones activas.',
    rentador: 'Agenda de citas relacionadas con tus rentas activas.',
  };

  return vehicleFilter.value
    ? `${baseByTab[activeTab.value]} Filtrando por vehículo.`
    : baseByTab[activeTab.value];
});

const getContactName = (appointment) => {
  if (activeTab.value === 'comprador')
    return (
      appointment.seller?.name ||
      appointment.client ||
      appointment.seller?.displayName
    );
  return (
    appointment.buyer?.name ||
    appointment.client ||
    appointment.renter?.name ||
    appointment.seller?.name
  );
};

const getContactPhone = (appointment) => {
  if (activeTab.value === 'comprador') return appointment.seller?.phone || '—';
  return appointment.buyer?.phone || appointment.renter?.phone || '—';
};

const getTipoLabel = (tipo) =>
  ({ compra: 'Compra', venta: 'Venta', renta: 'Renta' })[tipo] || tipo;
const getTipoClass = (tipo) =>
  ({ compra: 'compra', venta: 'venta', renta: 'renta' })[tipo] || '';
const getStatusClass = (status) =>
  ({
    Pendiente: 'pending',
    Confirmada: 'confirmed',
    Completada: 'completed',
    Cancelada: 'cancelled',
    Reagendada: 'pending',
  })[status] || 'pending';

const toAppointmentTimestamp = (appointment) => {
  if (!appointment?.date) return 0;
  return new Date(
    `${appointment.date}T${appointment.time || '00:00'}:00`
  ).getTime();
};

const compareAppointmentsByDateTime = (left, right) => {
  const leftTs = toAppointmentTimestamp(left);
  const rightTs = toAppointmentTimestamp(right);
  return sortDirection.value === 'desc' ? rightTs - leftTs : leftTs - rightTs;
};

const filteredAppointments = computed(() => {
  let filtered = [...currentAppointments.value];
  if (statusFilter.value) {
    filtered = filtered.filter(
      (appointment) => appointment.status === statusFilter.value
    );
  }
  return filtered;
});

const groupedAppointmentsByDate = computed(() => {
  const groups = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const formatDateLabel = (date) =>
    `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

  filteredAppointments.value.forEach((appointment) => {
    const appointmentDate = new Date(`${appointment.date}T12:00:00`);
    appointmentDate.setHours(0, 0, 0, 0);
    let key = formatDateLabel(appointmentDate);
    if (appointmentDate.getTime() === today.getTime())
      key = `Hoy - ${formatDateLabel(today)}`;
    else if (appointmentDate.getTime() === tomorrow.getTime())
      key = `Mañana - ${formatDateLabel(tomorrow)}`;
    else if (appointmentDate.getTime() === dayAfter.getTime())
      key = `Pasado mañana - ${formatDateLabel(dayAfter)}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(appointment);
  });

  return Object.keys(groups)
    .sort((a, b) => {
      const parse = (value) => {
        const raw = value.split(' - ')[1] || value;
        const [day, month, year] = raw.split('/');
        return new Date(year, month - 1, day).getTime();
      };
      const diff = parse(a) - parse(b);
      return sortDirection.value === 'desc' ? -diff : diff;
    })
    .map((key) => ({
      title: key,
      subtitle: null,
      appointments: [...groups[key]].sort(compareAppointmentsByDateTime),
    }));
});

const groupedAppointmentsByVehicle = computed(() => {
  const groups = {};

  filteredAppointments.value.forEach((appointment) => {
    const key =
      appointment.vehicle ||
      appointment.listingTitle ||
      'Vehículo sin identificar';
    if (!groups[key]) groups[key] = [];
    groups[key].push(appointment);
  });

  return Object.keys(groups)
    .map((key) => {
      const appointments = [...groups[key]].sort(compareAppointmentsByDateTime);
      const anchor = appointments[0]
        ? toAppointmentTimestamp(appointments[0])
        : 0;
      return {
        title: key,
        subtitle: `${appointments.length} cita${appointments.length === 1 ? '' : 's'}`,
        anchor,
        appointments,
      };
    })
    .sort((left, right) => {
      if (left.anchor !== right.anchor) {
        return sortDirection.value === 'desc'
          ? right.anchor - left.anchor
          : left.anchor - right.anchor;
      }
      return left.title.localeCompare(right.title, 'es');
    })
    .map(({ title, subtitle, appointments }) => ({
      title,
      subtitle,
      appointments,
    }));
});

const filteredGroupedAppointments = computed(() =>
  viewBy.value === 'vehiculo'
    ? groupedAppointmentsByVehicle.value
    : groupedAppointmentsByDate.value
);

const minDate = computed(() => new Date().toISOString().split('T')[0]);

const setActiveTab = (tab) => {
  const nextTab = normalizeTab(tab);
  if (nextTab === activeTab.value) return;
  router.replace({ query: { ...route.query, tab: nextTab } });
};

const setViewBy = (nextView) => {
  const normalized = normalizeViewBy(nextView);
  if (normalized === viewBy.value) return;
  router.replace({ query: { ...route.query, view: normalized } });
};

const toggleSortDirection = () => {
  const nextDirection = sortDirection.value === 'desc' ? 'asc' : 'desc';
  router.replace({ query: { ...route.query, order: nextDirection } });
};

const clearVehicleFilter = () => {
  const nextQuery = { ...route.query };
  delete nextQuery.vehicle;
  router.replace({ query: nextQuery });
};

const filterByStatus = (status) => {
  statusFilter.value = status === 'all' ? '' : status;
};
const toggleStatusDropdown = () => {
  showStatusDropdown.value = !showStatusDropdown.value;
};
const setStatusFilter = (status) => {
  statusFilter.value = status;
  showStatusDropdown.value = false;
};

const viewAppointmentDetail = (appointment) => {
  if (activeTab.value === 'comprador') {
    router.push({
      name: 'buyer-appointment-detail',
      params: { id: appointment.id },
    });
    return;
  }
  router.push({
    name: 'seller-appointment-detail',
    params: { id: appointment.id },
  });
};

const openRescheduleModal = (appointment) => {
  rescheduleTarget.value = appointment;
  rescheduleData.value = {
    date: appointment.date,
    time: appointment.time,
    reason: '',
  };
  isRescheduleModalOpen.value = true;
};

const closeRescheduleModal = () => {
  isRescheduleModalOpen.value = false;
  rescheduleTarget.value = null;
  rescheduleData.value = { date: '', time: '', reason: '' };
};

const rescheduleAppointment = async () => {
  if (!rescheduleTarget.value) return;
  await rescheduleAppointmentService(rescheduleTarget.value.id, {
    date: rescheduleData.value.date,
    time: rescheduleData.value.time,
    notes: rescheduleData.value.reason,
  });
  await loadCalendar();
  closeRescheduleModal();
  showNotification('Cita reprogramada exitosamente', 'success');
};

const cancelAppointment = (appointment) => {
  cancelTarget.value = appointment;
  showCancelModal.value = true;
};

const closeCancelModal = () => {
  showCancelModal.value = false;
  cancelTarget.value = null;
};

const confirmCancelAppointment = async () => {
  if (!cancelTarget.value) return;
  await cancelAppointmentService(cancelTarget.value.id, {
    reason: 'Cancelada desde calendario',
  });
  await loadCalendar();
  closeCancelModal();
  showNotification('Cita cancelada exitosamente', 'success');
};

watch(
  () => route.query.tab,
  (value) => {
    activeTab.value = normalizeTab(value);
  },
  { immediate: true }
);

watch(
  () => route.query.view,
  (value) => {
    viewBy.value = normalizeViewBy(value);
  },
  { immediate: true }
);

watch(
  () => route.query.order,
  (value) => {
    sortDirection.value = normalizeSortDirection(value);
  },
  { immediate: true }
);

watch(activeTab, () => {
  statusFilter.value = '';
});

onMounted(async () => {
  const now = new Date();
  currentDate.value = now.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  await loadCalendar();
});
</script>

<style scoped src="./styles.css"></style>
