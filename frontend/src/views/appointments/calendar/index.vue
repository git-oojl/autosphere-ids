<template>
  <div class="my-appointments-page">
    <br /><br /><br /><br /><br /><br />
    <!-- Header con bienvenida -->
    <div class="page-header">
      <div class="header-container">
        <div>
          <h1 class="page-title">Mis Citas</h1>
          <p class="page-subtitle">
            Listado completo de tus citas con todas las acciones disponibles
          </p>
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
        @click="activeTab = tab.id"
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
            @click="viewBy = 'fecha'"
          >
            Fecha
          </button>
          <button
            :class="['filter-btn', { active: viewBy === 'vehiculo' }]"
            @click="viewBy = 'vehiculo'"
          >
            Vehículo
          </button>
        </div>
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
      <div class="table-wrapper">
        <table class="appointments-table">
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
import { ref, computed, onMounted } from 'vue';

// IMPORTAR EL MOCK
import appointmentsMock from '../../../mocks/appointments/calendar.json';

// Toast
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

// Estado
const activeTab = ref('comprador');
const viewBy = ref('fecha');
const statusFilter = ref('');
const showStatusDropdown = ref(false);
const isRescheduleModalOpen = ref(false);
const showCancelModal = ref(false);
const rescheduleTarget = ref(null);
const cancelTarget = ref(null);
const currentDate = ref('');

const rescheduleData = ref({
  date: '',
  time: '',
  reason: '',
});

// DATOS DESDE EL MOCK
const appointmentsData = ref(appointmentsMock);

// Obtener citas según la pestaña activa
const currentAppointments = computed(() => {
  const data = appointmentsData.value[activeTab.value];
  return data?.appointments || [];
});

// Obtener estadísticas según la pestaña activa
const stats = computed(() => {
  const data = appointmentsData.value[activeTab.value];
  return data?.stats || { total: 0, pending: 0, confirmed: 0, completed: 0 };
});

const totalCitas = computed(() => stats.value.total);
const citasPendientes = computed(() => stats.value.pending);
const citasConfirmadas = computed(() => stats.value.confirmed);
const citasCompletadas = computed(() => stats.value.completed);

// Tabs
const tabs = computed(() => [
  { id: 'comprador', label: 'Comprador', badge: stats.value.pending || null },
  { id: 'vendedor', label: 'Vendedor', badge: null },
  { id: 'rentador', label: 'Rentador', badge: null },
]);

const statusFilterLabel = computed(() => {
  if (!statusFilter.value) return 'Todos';
  return statusFilter.value;
});

const columnLabel = computed(() => {
  if (activeTab.value === 'vendedor') return 'Cliente';
  if (activeTab.value === 'rentador') return 'Cliente';
  return 'Vendedor';
});

// Obtener nombre de contacto según el rol
const getContactName = (appointment) => {
  if (activeTab.value === 'vendedor')
    return appointment.buyer?.name || appointment.client;
  if (activeTab.value === 'rentador')
    return appointment.renter?.name || appointment.client;
  return appointment.seller?.name || appointment.client;
};

const getContactPhone = (appointment) => {
  if (activeTab.value === 'vendedor') return appointment.buyer?.phone;
  if (activeTab.value === 'rentador') return appointment.renter?.phone;
  return appointment.seller?.phone;
};

const getTipoLabel = (tipo) => {
  const labels = { compra: 'Compra', venta: 'Venta', renta: 'Renta' };
  return labels[tipo] || tipo;
};

const getTipoClass = (tipo) => {
  const classes = { compra: 'compra', venta: 'venta', renta: 'renta' };
  return classes[tipo] || '';
};

const getStatusClass = (status) => {
  const classes = {
    Pendiente: 'pending',
    Confirmada: 'confirmed',
    Completada: 'completed',
    Cancelada: 'cancelled',
  };
  return classes[status] || 'pending';
};

// Filtrar por estado
const filteredAppointments = computed(() => {
  let filtered = [...currentAppointments.value];
  if (statusFilter.value) {
    filtered = filtered.filter((a) => a.status === statusFilter.value);
  }
  return filtered;
});

// Agrupar citas por fecha
const groupedAppointments = computed(() => {
  const groups = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  filteredAppointments.value.forEach((app) => {
    const appDate = new Date(app.date);
    appDate.setHours(0, 0, 0, 0);
    let key;
    if (appDate.getTime() === today.getTime()) {
      key = `Hoy - ${formatDate(today)}`;
    } else if (appDate.getTime() === tomorrow.getTime()) {
      key = `Mañana - ${formatDate(tomorrow)}`;
    } else if (appDate.getTime() === dayAfter.getTime()) {
      key = `Pasado mañana - ${formatDate(dayAfter)}`;
    } else {
      key = formatDate(appDate);
    }
    if (!groups[key]) groups[key] = [];
    groups[key].push(app);
  });

  const sortedGroups = {};
  Object.keys(groups)
    .sort((a, b) => {
      const dateA = a.split(' - ')[1] || a;
      const dateB = b.split(' - ')[1] || b;
      const [dayA, monthA, yearA] = dateA.split('/');
      const [dayB, monthB, yearB] = dateB.split('/');
      return (
        new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB)
      );
    })
    .forEach((key) => {
      sortedGroups[key] = groups[key].sort((a, b) =>
        a.time.localeCompare(b.time)
      );
    });

  return sortedGroups;
});

const filteredGroupedAppointments = computed(() => {
  const groups = groupedAppointments.value;
  return Object.keys(groups).map((key) => ({
    title: key,
    appointments: groups[key],
  }));
});

const minDate = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
});

// Acciones
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
  showNotification(`Ver detalles de cita #${appointment.id}`, 'info');
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

const rescheduleAppointment = () => {
  const list = appointmentsData.value[activeTab.value].appointments;
  const index = list.findIndex((a) => a.id === rescheduleTarget.value.id);
  if (index !== -1) {
    list[index] = {
      ...list[index],
      date: rescheduleData.value.date,
      time: rescheduleData.value.time,
      status: 'Pendiente',
    };
    appointmentsData.value[activeTab.value].appointments = [...list];
    // Actualizar estadísticas
    appointmentsData.value[activeTab.value].stats.pending++;
    if (rescheduleTarget.value.status === 'Confirmada') {
      appointmentsData.value[activeTab.value].stats.confirmed--;
    }
    showNotification('Cita reprogramada exitosamente', 'success');
  }
  closeRescheduleModal();
};

const cancelAppointment = (appointment) => {
  cancelTarget.value = appointment;
  showCancelModal.value = true;
};

const closeCancelModal = () => {
  showCancelModal.value = false;
  cancelTarget.value = null;
};

const confirmCancelAppointment = () => {
  const list = appointmentsData.value[activeTab.value].appointments;
  const index = list.findIndex((a) => a.id === cancelTarget.value.id);
  if (index !== -1) {
    const oldStatus = list[index].status;
    list[index] = { ...list[index], status: 'Cancelada' };
    appointmentsData.value[activeTab.value].appointments = [...list];
    // Actualizar estadísticas
    if (oldStatus === 'Pendiente') {
      appointmentsData.value[activeTab.value].stats.pending--;
    } else if (oldStatus === 'Confirmada') {
      appointmentsData.value[activeTab.value].stats.confirmed--;
    }
    showNotification('Cita cancelada exitosamente', 'success');
  }
  closeCancelModal();
};

// Inicializar
onMounted(() => {
  const now = new Date();
  currentDate.value = now.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});
</script>

<style scoped src="./styles.css"></style>
