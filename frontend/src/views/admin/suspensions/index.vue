<template>
  <div class="suspensions-page">
    <br /><br /><br /><br />
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-container">
        <div class="header-left">
          <button class="back-btn" @click="goBack">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            Volver
          </button>
          <div>
            <h1 class="page-title">Gestión de Suspensiones</h1>
            <p class="page-subtitle">
              Administra usuarios suspendidos y bloqueos en la plataforma
            </p>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn-primary" @click="openSuspendModal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            Suspender Usuario
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon red">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8V11H18V8Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M4 14C4 12.8954 4.89543 12 6 12H18C19.1046 12 20 12.8954 20 14V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V14Z"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ stats.totalSuspended }}</span>
          <span class="stat-title">Usuarios Suspendidos</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 8V12M12 16H12.01M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ stats.permanentBans }}</span>
          <span class="stat-title">Bloqueos Permanentes</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon yellow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 12V8H4V12M20 12L12 18L4 12M20 12H22M2 12H4M12 2V4M12 22V20"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ stats.activeSuspensions }}</span>
          <span class="stat-title">Suspensiones Activas</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ stats.reinstatedThisMonth }}</span>
          <span class="stat-title">Reintegrados este mes</span>
        </div>
      </div>
    </div>

    <!-- Filters Bar -->
    <div class="filters-bar">
      <div class="filters-container">
        <div class="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="currentColor"
              stroke-width="2"
            />
            <path d="M21 21L17 17" stroke="currentColor" stroke-width="2" />
          </svg>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Buscar por usuario, email o motivo..."
          />
        </div>
        <select v-model="statusFilter" class="filter-select">
          <option value="all">Todos los estados</option>
          <option value="active">Activas</option>
          <option value="expired">Expiradas</option>
          <option value="permanent">Permanentes</option>
        </select>
        <select v-model="durationFilter" class="filter-select">
          <option value="all">Cualquier duración</option>
          <option value="7">7 días</option>
          <option value="15">15 días</option>
          <option value="30">30 días</option>
          <option value="permanent">Permanente</option>
        </select>
        <button class="btn-secondary" @click="clearFilters">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6H21M6 12H18M10 18H14"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
          Limpiar filtros
        </button>
      </div>
    </div>

    <!-- Suspensions Table -->
    <div class="table-container">
      <div class="table-header">
        <h3>Lista de Suspensiones</h3>
        <div class="table-info">
          Mostrando {{ filteredSuspensions.length }} de
          {{ suspensions.length }} suspensiones
        </div>
      </div>

      <div class="data-table">
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Motivo</th>
              <th>Fecha de suspensión</th>
              <th>Duración</th>
              <th>Fecha de reintegro</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="suspension in filteredSuspensions" :key="suspension.id">
              <td class="user-cell">
                <div
                  class="user-avatar"
                  :style="{ background: getAvatarColor(suspension.userName) }"
                >
                  {{ suspension.userName.charAt(0) }}
                </div>
                <strong>{{ suspension.userName }}</strong>
              </td>
              <td>{{ suspension.email }}</td>
              <td class="reason-cell">
                <span class="reason-text">{{ suspension.reason }}</span>
              </td>
              <td>{{ formatDate(suspension.suspensionDate) }}</td>
              <td>
                <span
                  :class="[
                    'duration-badge',
                    getDurationClass(suspension.duration),
                  ]"
                >
                  {{ suspension.duration }}
                </span>
              </td>
              <td>
                {{
                  suspension.reinstatementDate
                    ? formatDate(suspension.reinstatementDate)
                    : '—'
                }}
              </td>
              <td>
                <span :class="['status-badge', suspension.status]">
                  {{ getStatusText(suspension.status) }}
                </span>
              </td>
              <td class="actions-cell">
                <button
                  v-if="suspension.status === 'active'"
                  class="action-btn success"
                  title="Reintegrar usuario"
                  @click="reinstateUser(suspension)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                </button>
                <button
                  class="action-btn edit"
                  title="Editar suspensión"
                  @click="editSuspension(suspension)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17 3L21 7L7 21H3V17L17 3Z"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                </button>
                <button
                  class="action-btn delete"
                  title="Eliminar registro"
                  @click="deleteSuspension(suspension)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr v-if="filteredSuspensions.length === 0">
              <td colspan="8" class="empty-state">
                <div class="empty-icon">🔓</div>
                <p>No hay suspensiones que coincidan con los filtros</p>
                <button class="btn-primary-small" @click="clearFilters">
                  Limpiar filtros
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Suspension History -->
    <div class="history-section">
      <div class="history-header">
        <h3>📊 Historial de Suspensiones</h3>
        <button class="view-all-btn" @click="toggleHistory">
          Ver historial completo →
        </button>
      </div>
      <div class="history-stats">
        <div class="history-stat">
          <span class="history-label">Total de suspensiones este año</span>
          <span class="history-value">{{ yearlyStats.total }}</span>
        </div>
        <div class="history-stat">
          <span class="history-label">Por spam</span>
          <span class="history-value">{{ yearlyStats.spam }}</span>
        </div>
        <div class="history-stat">
          <span class="history-label">Por comportamiento</span>
          <span class="history-value">{{ yearlyStats.behavior }}</span>
        </div>
        <div class="history-stat">
          <span class="history-label">Por fraude</span>
          <span class="history-value">{{ yearlyStats.fraud }}</span>
        </div>
      </div>
    </div>

    <!-- Suspend User Modal -->
    <div
      v-if="showSuspendModal"
      class="modal-overlay"
      @click.self="closeSuspendModal"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h2>
            {{ editingSuspension ? 'Editar Suspensión' : 'Suspender Usuario' }}
          </h2>
          <button class="modal-close" @click="closeSuspendModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Usuario</label>
            <select
              v-model="suspendForm.userId"
              class="form-input"
              :disabled="editingSuspension"
            >
              <option value="">Seleccionar usuario</option>
              <option
                v-for="user in activeUsers"
                :key="user.id"
                :value="user.id"
              >
                {{ user.name }} - {{ user.email }} ({{
                  getRoleText(user.role)
                }})
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Motivo de suspensión</label>
            <select v-model="suspendForm.reason" class="form-input">
              <option value="">Seleccionar motivo</option>
              <option value="Spam en anuncios o mensajes">
                Spam en anuncios o mensajes
              </option>
              <option value="Comportamiento inapropiado">
                Comportamiento inapropiado
              </option>
              <option value="Fraude o estafa">Fraude o estafa</option>
              <option value="Violación de términos">
                Violación de términos
              </option>
              <option value="Múltiples reportes">Múltiples reportes</option>
              <option value="Información falsa">Información falsa</option>
            </select>
          </div>
          <div class="form-group">
            <label>Descripción detallada</label>
            <textarea
              v-model="suspendForm.description"
              class="form-input"
              rows="4"
              placeholder="Describe detalladamente el motivo de la suspensión..."
            ></textarea>
          </div>
          <div class="form-group">
            <label>Duración de la suspensión</label>
            <div class="duration-options">
              <label class="radio-option">
                <input
                  v-model="suspendForm.duration"
                  type="radio"
                  value="7 días"
                />
                <span>7 días</span>
              </label>
              <label class="radio-option">
                <input
                  v-model="suspendForm.duration"
                  type="radio"
                  value="15 días"
                />
                <span>15 días</span>
              </label>
              <label class="radio-option">
                <input
                  v-model="suspendForm.duration"
                  type="radio"
                  value="30 días"
                />
                <span>30 días</span>
              </label>
              <label class="radio-option">
                <input
                  v-model="suspendForm.duration"
                  type="radio"
                  value="Permanente"
                />
                <span>Permanente ⚠️</span>
              </label>
            </div>
          </div>
          <div v-if="suspendForm.duration !== 'Permanente'" class="form-group">
            <label>Fecha de reintegro automático</label>
            <input
              v-model="suspendForm.reinstatementDate"
              type="date"
              class="form-input"
            />
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" @click="closeSuspendModal">
              Cancelar
            </button>
            <button class="btn-primary" @click="saveSuspension">
              {{ editingSuspension ? 'Guardar cambios' : 'Suspender usuario' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Reinstate Confirmation Modal -->
    <div
      v-if="showReinstateModal"
      class="modal-overlay"
      @click.self="showReinstateModal = false"
    >
      <div class="modal-content small">
        <div class="modal-header">
          <h2>Reintegrar Usuario</h2>
          <button class="modal-close" @click="showReinstateModal = false">
            ×
          </button>
        </div>
        <div class="modal-body">
          <div class="confirmation-icon">🔓</div>
          <p class="confirmation-text">
            ¿Estás seguro de que deseas reintegrar a
            <strong>{{ selectedSuspension?.userName }}</strong
            >?
          </p>
          <p class="confirmation-subtext">
            El usuario podrá volver a utilizar la plataforma normalmente.
          </p>
          <div class="modal-actions">
            <button class="btn-secondary" @click="showReinstateModal = false">
              Cancelar
            </button>
            <button class="btn-primary" @click="confirmReinstate">
              Reintegrar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="modal-overlay"
      @click.self="showDeleteModal = false"
    >
      <div class="modal-content small">
        <div class="modal-header">
          <h2>Eliminar Registro</h2>
          <button class="modal-close" @click="showDeleteModal = false">
            ×
          </button>
        </div>
        <div class="modal-body">
          <div class="confirmation-icon warning">⚠️</div>
          <p class="confirmation-text">
            ¿Eliminar el registro de suspensión de
            <strong>{{ selectedSuspension?.userName }}</strong
            >?
          </p>
          <p class="confirmation-subtext">
            Esta acción no reintegra al usuario, solo elimina el registro. El
            usuario permanecerá suspendido.
          </p>
          <div class="modal-actions">
            <button class="btn-secondary" @click="showDeleteModal = false">
              Cancelar
            </button>
            <button class="btn-danger" @click="confirmDelete">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Stats
const stats = ref({
  totalSuspended: 0,
  permanentBans: 0,
  activeSuspensions: 0,
  reinstatedThisMonth: 0,
});

// Suspensions data
const suspensions = ref([
  {
    id: 1,
    userId: 3,
    userName: 'Roberto Gómez',
    email: 'roberto.gomez@email.com',
    reason: 'Spam en anuncios',
    description:
      'El usuario publicó múltiples anuncios duplicados y envió spam a otros usuarios',
    suspensionDate: '2024-03-15',
    duration: '30 días',
    reinstatementDate: '2024-04-14',
    status: 'active',
  },
  {
    id: 2,
    userId: 7,
    userName: 'Lucía Fernández',
    email: 'lucia.fernandez@email.com',
    reason: 'Comportamiento inapropiado',
    description: 'Lenguaje ofensivo en mensajes y comentarios',
    suspensionDate: '2024-03-18',
    duration: '15 días',
    reinstatementDate: '2024-04-02',
    status: 'active',
  },
  {
    id: 3,
    userId: 12,
    userName: 'Miguel Ángel Ruiz',
    email: 'miguel.ruiz@email.com',
    reason: 'Fraude o estafa',
    description: 'Intento de estafa en transacción de vehículo',
    suspensionDate: '2024-02-10',
    duration: 'Permanente',
    reinstatementDate: null,
    status: 'permanent',
  },
  {
    id: 4,
    userId: 5,
    userName: 'Carmen Sánchez',
    email: 'carmen.sanchez@email.com',
    reason: 'Violación de términos',
    description: 'Publicación de vehículos sin documentación',
    suspensionDate: '2024-02-20',
    duration: '30 días',
    reinstatementDate: '2024-03-21',
    status: 'expired',
  },
  {
    id: 5,
    userId: 9,
    userName: 'Javier López',
    email: 'javier.lopez@email.com',
    reason: 'Múltiples reportes',
    description: 'Recibió más de 10 reportes de diferentes usuarios',
    suspensionDate: '2024-03-01',
    duration: '7 días',
    reinstatementDate: '2024-03-08',
    status: 'expired',
  },
]);

// Active users for suspension form
const activeUsers = ref([
  { id: 1, name: 'Ana García', email: 'ana.garcia@email.com', role: 'buyer' },
  {
    id: 2,
    name: 'Carlos Méndez',
    email: 'carlos.mendez@email.com',
    role: 'seller',
  },
  { id: 4, name: 'María López', email: 'maria.lopez@email.com', role: 'buyer' },
  {
    id: 6,
    name: 'Pedro Sánchez',
    email: 'pedro.sanchez@email.com',
    role: 'seller',
  },
  {
    id: 8,
    name: 'Laura Martínez',
    email: 'laura.martinez@email.com',
    role: 'landlord',
  },
]);

// Filters
const searchTerm = ref('');
const statusFilter = ref('all');
const durationFilter = ref('all');

// Modals
const showSuspendModal = ref(false);
const showReinstateModal = ref(false);
const showDeleteModal = ref(false);
const editingSuspension = ref(false);
const selectedSuspension = ref(null);

// Form data
const suspendForm = ref({
  userId: '',
  reason: '',
  description: '',
  duration: '7 días',
  reinstatementDate: '',
});

// Yearly stats
const yearlyStats = ref({
  total: 24,
  spam: 8,
  behavior: 6,
  fraud: 5,
});

// Computed
const filteredSuspensions = computed(() => {
  let filtered = suspensions.value;

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.userName.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        s.reason.toLowerCase().includes(term)
    );
  }

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter((s) => s.status === statusFilter.value);
  }

  if (durationFilter.value !== 'all') {
    if (durationFilter.value === 'permanent') {
      filtered = filtered.filter((s) => s.duration === 'Permanente');
    } else {
      filtered = filtered.filter(
        (s) => s.duration === `${durationFilter.value} días`
      );
    }
  }

  return filtered;
});

// Update stats
const updateStats = () => {
  stats.value.totalSuspended = suspensions.value.length;
  stats.value.permanentBans = suspensions.value.filter(
    (s) => s.duration === 'Permanente'
  ).length;
  stats.value.activeSuspensions = suspensions.value.filter(
    (s) => s.status === 'active'
  ).length;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  stats.value.reinstatedThisMonth = suspensions.value.filter((s) => {
    if (s.reinstatementDate && s.status === 'expired') {
      const date = new Date(s.reinstatementDate);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    }
    return false;
  }).length;
};

// Methods
const goBack = () => {
  router.push('/admin');
};

const formatDate = (date) => {
  if (!date) return '—';
  const d = new Date(date);
  return d.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getStatusText = (status) => {
  const statuses = {
    active: 'Activa',
    expired: 'Expirada',
    permanent: 'Permanente',
  };
  return statuses[status] || status;
};

const getDurationClass = (duration) => {
  if (duration === 'Permanente') return 'permanent';
  if (duration === '30 días') return 'long';
  if (duration === '15 días') return 'medium';
  return 'short';
};

const getAvatarColor = (name) => {
  const colors = [
    '#3b82f6',
    '#10b981',
    '#8b5cf6',
    '#f59e0b',
    '#ef4444',
    '#06b6d4',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const getRoleText = (role) => {
  const roles = {
    buyer: 'Comprador',
    seller: 'Vendedor',
    landlord: 'Arrendador',
  };
  return roles[role] || role;
};

const clearFilters = () => {
  searchTerm.value = '';
  statusFilter.value = 'all';
  durationFilter.value = 'all';
};

const openSuspendModal = () => {
  editingSuspension.value = false;
  suspendForm.value = {
    userId: '',
    reason: '',
    description: '',
    duration: '7 días',
    reinstatementDate: '',
  };
  showSuspendModal.value = true;
};

const editSuspension = (suspension) => {
  editingSuspension.value = true;
  selectedSuspension.value = suspension;
  suspendForm.value = {
    userId: suspension.userId,
    reason: suspension.reason,
    description: suspension.description,
    duration: suspension.duration,
    reinstatementDate: suspension.reinstatementDate || '',
  };
  showSuspendModal.value = true;
};

const saveSuspension = () => {
  if (!suspendForm.value.userId || !suspendForm.value.reason) {
    alert('Por favor completa todos los campos requeridos');
    return;
  }

  const user = activeUsers.value.find((u) => u.id === suspendForm.value.userId);
  if (!user) return;

  if (editingSuspension.value && selectedSuspension.value) {
    // Edit existing suspension
    const index = suspensions.value.findIndex(
      (s) => s.id === selectedSuspension.value.id
    );
    if (index !== -1) {
      suspensions.value[index] = {
        ...suspensions.value[index],
        reason: suspendForm.value.reason,
        description: suspendForm.value.description,
        duration: suspendForm.value.duration,
        reinstatementDate:
          suspendForm.value.duration !== 'Permanente'
            ? suspendForm.value.reinstatementDate
            : null,
        status:
          suspendForm.value.duration === 'Permanente' ? 'permanent' : 'active',
      };
    }
    alert('Suspensión actualizada correctamente');
  } else {
    // Create new suspension
    const newSuspension = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      email: user.email,
      reason: suspendForm.value.reason,
      description: suspendForm.value.description,
      suspensionDate: new Date().toISOString().split('T')[0],
      duration: suspendForm.value.duration,
      reinstatementDate:
        suspendForm.value.duration !== 'Permanente'
          ? suspendForm.value.reinstatementDate
          : null,
      status:
        suspendForm.value.duration === 'Permanente' ? 'permanent' : 'active',
    };
    suspensions.value.unshift(newSuspension);
    alert(`Usuario ${user.name} suspendido correctamente`);
  }

  updateStats();
  closeSuspendModal();
};

const reinstateUser = (suspension) => {
  selectedSuspension.value = suspension;
  showReinstateModal.value = true;
};

const confirmReinstate = () => {
  if (selectedSuspension.value) {
    const index = suspensions.value.findIndex(
      (s) => s.id === selectedSuspension.value.id
    );
    if (index !== -1) {
      suspensions.value[index].status = 'expired';
      suspensions.value[index].reinstatementDate = new Date()
        .toISOString()
        .split('T')[0];
      alert(`Usuario ${selectedSuspension.value.userName} ha sido reintegrado`);
    }
  }
  showReinstateModal.value = false;
  selectedSuspension.value = null;
  updateStats();
};

const deleteSuspension = (suspension) => {
  selectedSuspension.value = suspension;
  showDeleteModal.value = true;
};

const confirmDelete = () => {
  if (selectedSuspension.value) {
    const index = suspensions.value.findIndex(
      (s) => s.id === selectedSuspension.value.id
    );
    if (index !== -1) {
      suspensions.value.splice(index, 1);
      alert(`Registro de suspensión eliminado`);
    }
  }
  showDeleteModal.value = false;
  selectedSuspension.value = null;
  updateStats();
};

const closeSuspendModal = () => {
  showSuspendModal.value = false;
  editingSuspension.value = false;
  selectedSuspension.value = null;
};

const toggleHistory = () => {
  // Expandir historial - se puede implementar más adelante
  alert('Ver historial completo de suspensiones');
};

// Initialize
onMounted(() => {
  updateStats();
});
</script>

<style scoped src="./styles.css"></style>
