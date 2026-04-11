<template>
  <div class="users-page">
    <br /><br /><br /><br /><br />

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
            <h1 class="page-title">Gestión de Usuarios</h1>
            <p class="page-subtitle">
              Administra compradores, vendedores y arrendadores de la plataforma
            </p>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn-primary" @click="openUserModal('create')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            Nuevo Usuario
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card" @click="setRoleFilter('all')">
        <div class="stat-icon blue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ stats.total }}</span>
          <span class="stat-title">Total Usuarios</span>
        </div>
      </div>
      <div class="stat-card" @click="setRoleFilter('buyer')">
        <div class="stat-icon green">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M16 21V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V21"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ stats.buyers }}</span>
          <span class="stat-title">Compradores</span>
        </div>
      </div>
      <div class="stat-card" @click="setRoleFilter('seller')">
        <div class="stat-icon purple">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M16 21V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V21"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ stats.sellers }}</span>
          <span class="stat-title">Vendedores</span>
        </div>
      </div>
      <div class="stat-card" @click="setRoleFilter('landlord')">
        <div class="stat-icon orange">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 9L12 3L21 9L12 15L3 9Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path d="M5 12V19H19V12" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ stats.landlords }}</span>
          <span class="stat-title">Arrendadores</span>
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
            placeholder="Buscar por nombre, email o teléfono..."
          />
        </div>
        <select v-model="roleFilter" class="filter-select">
          <option value="all">Todos los roles</option>
          <option value="buyer">Compradores</option>
          <option value="seller">Vendedores</option>
          <option value="landlord">Arrendadores</option>
        </select>
        <select v-model="statusFilter" class="filter-select">
          <option value="all">Todos los estados</option>
          <option value="active">Activos</option>
          <option value="suspended">Suspendidos</option>
          <option value="inactive">Inactivos</option>
        </select>
        <select v-model="verificationFilter" class="filter-select">
          <option value="all">Todos</option>
          <option value="verified">Verificados</option>
          <option value="unverified">No verificados</option>
        </select>
        <select v-model="sortBy" class="filter-select">
          <option value="date_desc">Más recientes primero</option>
          <option value="date_asc">Más antiguos primero</option>
          <option value="name_asc">Nombre A-Z</option>
          <option value="name_desc">Nombre Z-A</option>
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

    <!-- Users Table -->
    <div class="table-container">
      <div class="table-header">
        <h3>Lista de Usuarios Registrados</h3>
        <div class="table-info">
          Mostrando {{ paginatedUsers.length }} de
          {{ filteredUsers.length }} usuarios
        </div>
      </div>

      <div class="data-table">
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Registro</th>
              <th>Último acceso</th>
              <th>Verificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in paginatedUsers" :key="user.id">
              <td class="user-cell">
                <div
                  class="user-avatar"
                  :style="{ background: getAvatarColor(user.name) }"
                >
                  {{ user.name.charAt(0) }}
                </div>
                <div>
                  <div class="user-name">{{ user.name }}</div>
                  <div class="user-location">
                    {{ user.location || 'No especificado' }}
                  </div>
                </div>
              </td>
              <td class="email-cell">{{ user.email }}</td>
              <td>{{ user.phone || '—' }}</td>
              <td>
                <span :class="['role-badge', user.role]">
                  {{ getRoleText(user.role) }}
                </span>
              </td>
              <td>
                <span :class="['status-badge', user.status]">
                  {{ getStatusText(user.status) }}
                </span>
              </td>
              <td>{{ formatDate(user.registeredAt) }}</td>
              <td class="last-login">{{ formatLastLogin(user.lastLogin) }}</td>
              <td>
                <span
                  :class="[
                    'verification-badge',
                    user.verified ? 'verified' : 'unverified',
                  ]"
                >
                  {{ user.verified ? 'Verificado' : 'Pendiente' }}
                </span>
              </td>
              <td class="actions-cell">
                <button
                  class="action-btn view"
                  title="Ver detalles"
                  @click="viewUser(user)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                </button>
                <button
                  class="action-btn edit"
                  title="Editar usuario"
                  @click="openUserModal('edit', user)"
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
                  v-if="user.status === 'active'"
                  class="action-btn suspend"
                  title="Suspender usuario"
                  @click="suspendUser(user)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
                </button>
                <button
                  v-if="user.status === 'suspended'"
                  class="action-btn restore"
                  title="Restaurar usuario"
                  @click="restoreUser(user)"
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
                  class="action-btn delete"
                  title="Eliminar usuario"
                  @click="deleteUser(user)"
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
            <tr v-if="filteredUsers.length === 0">
              <td colspan="9" class="empty-state">
                <div class="empty-icon">👥</div>
                <p>No hay usuarios que coincidan con los filtros</p>
                <button class="btn-primary-small" @click="clearFilters">
                  Limpiar filtros
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button
        class="page-btn"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" />
        </svg>
      </button>
      <div class="page-numbers">
        <button
          v-for="page in visiblePages"
          :key="page"
          :class="['page-number', { active: currentPage === page }]"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
      </div>
      <button
        class="page-btn"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" />
        </svg>
      </button>
    </div>

    <!-- User Modal (Create/Edit) -->
    <div
      v-if="showUserModal"
      class="modal-overlay"
      @click.self="closeUserModal"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}</h2>
          <button class="modal-close" @click="closeUserModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>Nombre completo *</label>
              <input
                v-model="userForm.name"
                type="text"
                class="form-input"
                placeholder="Ej: Juan Pérez"
              />
            </div>
            <div class="form-group">
              <label>Email *</label>
              <input
                v-model="userForm.email"
                type="email"
                class="form-input"
                placeholder="ejemplo@email.com"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Teléfono</label>
              <input
                v-model="userForm.phone"
                type="tel"
                class="form-input"
                placeholder="55 1234 5678"
              />
            </div>
            <div class="form-group">
              <label>Ubicación</label>
              <input
                v-model="userForm.location"
                type="text"
                class="form-input"
                placeholder="Ciudad, Estado"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Rol *</label>
              <select v-model="userForm.role" class="form-input">
                <option value="buyer">Comprador</option>
                <option value="seller">Vendedor</option>
                <option value="landlord">Arrendador</option>
              </select>
            </div>
            <div class="form-group">
              <label>Estado</label>
              <select v-model="userForm.status" class="form-input">
                <option value="active">Activo</option>
                <option value="suspended">Suspendido</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Verificación de identidad</label>
            <div class="radio-group">
              <label class="radio-option">
                <input v-model="userForm.verified" type="radio" value="true" />
                <span>Verificado</span>
              </label>
              <label class="radio-option">
                <input v-model="userForm.verified" type="radio" value="false" />
                <span>No verificado</span>
              </label>
            </div>
          </div>
          <div v-if="!isEditing" class="form-group">
            <label>Contraseña temporal</label>
            <input
              v-model="userForm.password"
              type="text"
              class="form-input"
              placeholder="Dejar en blanco para generar automática"
            />
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" @click="closeUserModal">
              Cancelar
            </button>
            <button class="btn-primary" @click="saveUser">
              {{ isEditing ? 'Guardar cambios' : 'Crear usuario' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- User Details Modal -->
    <div
      v-if="showDetailsModal"
      class="modal-overlay"
      @click.self="closeDetailsModal"
    >
      <div class="modal-content large">
        <div class="modal-header">
          <h2>Detalles del Usuario</h2>
          <button class="modal-close" @click="closeDetailsModal">×</button>
        </div>
        <div v-if="selectedUser" class="modal-body">
          <div class="user-profile-header">
            <div
              class="user-profile-avatar"
              :style="{ background: getAvatarColor(selectedUser.name) }"
            >
              {{ selectedUser.name.charAt(0) }}
            </div>
            <div class="user-profile-info">
              <h3>{{ selectedUser.name }}</h3>
              <p>{{ getRoleText(selectedUser.role) }}</p>
              <div class="user-profile-status">
                <span :class="['status-badge', selectedUser.status]">
                  {{ getStatusText(selectedUser.status) }}
                </span>
                <span
                  :class="[
                    'verification-badge',
                    selectedUser.verified ? 'verified' : 'unverified',
                  ]"
                >
                  {{ selectedUser.verified ? 'Verificado' : 'Pendiente' }}
                </span>
              </div>
            </div>
          </div>
          <div class="details-grid">
            <div class="detail-card">
              <div class="detail-label">Email</div>
              <div class="detail-value">{{ selectedUser.email }}</div>
            </div>
            <div class="detail-card">
              <div class="detail-label">Teléfono</div>
              <div class="detail-value">
                {{ selectedUser.phone || 'No especificado' }}
              </div>
            </div>
            <div class="detail-card">
              <div class="detail-label">Ubicación</div>
              <div class="detail-value">
                {{ selectedUser.location || 'No especificado' }}
              </div>
            </div>
            <div class="detail-card">
              <div class="detail-label">Fecha de registro</div>
              <div class="detail-value">
                {{ formatDate(selectedUser.registeredAt) }}
              </div>
            </div>
            <div class="detail-card">
              <div class="detail-label">Último acceso</div>
              <div class="detail-value">
                {{ formatLastLogin(selectedUser.lastLogin) }}
              </div>
            </div>
            <div class="detail-card">
              <div class="detail-label">Anuncios publicados</div>
              <div class="detail-value">
                {{ selectedUser.listingsCount || 0 }}
              </div>
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" @click="closeDetailsModal">
              Cerrar
            </button>
            <button
              class="btn-primary"
              @click="
                openUserModal('edit', selectedUser);
                closeDetailsModal();
              "
            >
              Editar usuario
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Suspend/Restore Confirmation Modal -->
    <div
      v-if="showSuspendModal"
      class="modal-overlay"
      @click.self="showSuspendModal = false"
    >
      <div class="modal-content small">
        <div class="modal-header">
          <h2>
            {{
              suspendAction === 'suspend'
                ? 'Suspender Usuario'
                : 'Restaurar Usuario'
            }}
          </h2>
          <button class="modal-close" @click="showSuspendModal = false">
            ×
          </button>
        </div>
        <div class="modal-body">
          <div class="confirmation-icon" :class="suspendAction">
            {{ suspendAction === 'suspend' ? '⛔' : '🔓' }}
          </div>
          <p class="confirmation-text">
            {{
              suspendAction === 'suspend'
                ? `¿Estás seguro de que deseas suspender a ${selectedUser?.name}?`
                : `¿Estás seguro de que deseas restaurar a ${selectedUser?.name}?`
            }}
          </p>
          <p v-if="suspendAction === 'suspend'" class="confirmation-subtext">
            El usuario no podrá acceder a la plataforma ni publicar anuncios
            durante la suspensión.
          </p>
          <p v-else class="confirmation-subtext">
            El usuario recuperará acceso completo a la plataforma.
          </p>
          <div v-if="suspendAction === 'suspend'" class="form-group">
            <label>Motivo de suspensión</label>
            <textarea
              v-model="suspendReason"
              class="form-input"
              rows="3"
              placeholder="Describe el motivo de la suspensión..."
            ></textarea>
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" @click="showSuspendModal = false">
              Cancelar
            </button>
            <button class="btn-primary" @click="confirmSuspendRestore">
              {{ suspendAction === 'suspend' ? 'Suspender' : 'Restaurar' }}
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
          <h2>Eliminar Usuario</h2>
          <button class="modal-close" @click="showDeleteModal = false">
            ×
          </button>
        </div>
        <div class="modal-body">
          <div class="confirmation-icon warning">⚠️</div>
          <p class="confirmation-text">
            ¿Eliminar al usuario <strong>{{ selectedUser?.name }}</strong
            >?
          </p>
          <p class="confirmation-subtext">
            Esta acción eliminará permanentemente al usuario y todos sus datos
            del sistema.
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

// IMPORTAR EL MOCK DESDE JSON
import usersMock from '../../../mocks/admin/users.json';

const router = useRouter();

// Stats
const stats = ref({
  total: 0,
  buyers: 0,
  sellers: 0,
  landlords: 0,
});

// USERS: Usar los datos importados del JSON
const users = ref(
  usersMock.items.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    location: item.location,
    role: item.role,
    status: item.status,
    verified: item.verified,
    registeredAt: item.registeredAt,
    lastLogin: item.lastLogin,
    listingsCount: item.listingsCount,
    avatar: item.avatar,
  }))
);

// Filters
const searchTerm = ref('');
const roleFilter = ref('all');
const statusFilter = ref('all');
const verificationFilter = ref('all');
const sortBy = ref('date_desc');
const currentPage = ref(1);
const itemsPerPage = 10;

// Modal states
const showUserModal = ref(false);
const showDetailsModal = ref(false);
const showSuspendModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const suspendAction = ref('suspend');
const suspendReason = ref('');
const selectedUser = ref(null);
const userForm = ref({
  name: '',
  email: '',
  phone: '',
  location: '',
  role: 'buyer',
  status: 'active',
  verified: 'false',
  password: '',
});

// Computed
const filteredUsers = computed(() => {
  let filtered = [...users.value];

  // Filter by search term
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        (u.phone && u.phone.includes(term))
    );
  }

  // Filter by role
  if (roleFilter.value !== 'all') {
    filtered = filtered.filter((u) => u.role === roleFilter.value);
  }

  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter((u) => u.status === statusFilter.value);
  }

  // Filter by verification
  if (verificationFilter.value === 'verified') {
    filtered = filtered.filter((u) => u.verified === true);
  } else if (verificationFilter.value === 'unverified') {
    filtered = filtered.filter((u) => u.verified === false);
  }

  // Sort
  switch (sortBy.value) {
    case 'date_desc':
      filtered.sort(
        (a, b) => new Date(b.registeredAt) - new Date(a.registeredAt)
      );
      break;
    case 'date_asc':
      filtered.sort(
        (a, b) => new Date(a.registeredAt) - new Date(b.registeredAt)
      );
      break;
    case 'name_asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name_desc':
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  return filtered;
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredUsers.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage)
);

const visiblePages = computed(() => {
  const maxVisible = 5;
  const pages = [];
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

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

const formatLastLogin = (lastLogin) => {
  if (!lastLogin) return 'Nunca';
  const d = new Date(lastLogin);
  const now = new Date();
  const diff = now - d;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Hoy';
  if (days === 1) return 'Ayer';
  if (days < 7) return `Hace ${days} días`;
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
};

const getRoleText = (role) => {
  const roles = {
    buyer: 'Comprador',
    seller: 'Vendedor',
    landlord: 'Arrendador',
  };
  return roles[role] || role;
};

const getStatusText = (status) => {
  const statuses = {
    active: 'Activo',
    suspended: 'Suspendido',
    inactive: 'Inactivo',
  };
  return statuses[status] || status;
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

const updateStats = () => {
  stats.value.total = users.value.length;
  stats.value.buyers = users.value.filter((u) => u.role === 'buyer').length;
  stats.value.sellers = users.value.filter((u) => u.role === 'seller').length;
  stats.value.landlords = users.value.filter(
    (u) => u.role === 'landlord'
  ).length;
};

const setRoleFilter = (role) => {
  roleFilter.value = role;
  currentPage.value = 1;
};

const clearFilters = () => {
  searchTerm.value = '';
  roleFilter.value = 'all';
  statusFilter.value = 'all';
  verificationFilter.value = 'all';
  sortBy.value = 'date_desc';
  currentPage.value = 1;
};

const openUserModal = (action, user = null) => {
  isEditing.value = action === 'edit';
  if (user) {
    userForm.value = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      location: user.location || '',
      role: user.role,
      status: user.status,
      verified: user.verified ? 'true' : 'false',
      password: '',
    };
  } else {
    userForm.value = {
      name: '',
      email: '',
      phone: '',
      location: '',
      role: 'buyer',
      status: 'active',
      verified: 'false',
      password: '',
    };
  }
  showUserModal.value = true;
};

const closeUserModal = () => {
  showUserModal.value = false;
  selectedUser.value = null;
};

const saveUser = () => {
  if (!userForm.value.name || !userForm.value.email) {
    alert('Por favor completa los campos requeridos');
    return;
  }

  const newId = `u-${userForm.value.role}-${Date.now()}`;

  if (isEditing.value) {
    // Edit existing user
    const index = users.value.findIndex((u) => u.id === userForm.value.id);
    if (index !== -1) {
      users.value[index] = {
        ...users.value[index],
        name: userForm.value.name,
        email: userForm.value.email,
        phone: userForm.value.phone,
        location: userForm.value.location,
        role: userForm.value.role,
        status: userForm.value.status,
        verified: userForm.value.verified === 'true',
      };
      alert(`Usuario ${userForm.value.name} actualizado correctamente`);
    }
  } else {
    // Create new user
    const newUser = {
      id: newId,
      name: userForm.value.name,
      email: userForm.value.email,
      phone: userForm.value.phone,
      location: userForm.value.location,
      role: userForm.value.role,
      status: 'active',
      verified: userForm.value.verified === 'true',
      registeredAt: new Date().toISOString().split('T')[0],
      lastLogin: null,
      listingsCount: 0,
      avatar: null,
    };
    users.value.unshift(newUser);
    alert(`Usuario ${userForm.value.name} creado correctamente`);
    if (userForm.value.password) {
      alert(`Contraseña temporal: ${userForm.value.password}`);
    }
  }
  closeUserModal();
  updateStats();
};

const viewUser = (user) => {
  selectedUser.value = user;
  showDetailsModal.value = true;
};

const closeDetailsModal = () => {
  showDetailsModal.value = false;
  selectedUser.value = null;
};

const suspendUser = (user) => {
  selectedUser.value = user;
  suspendAction.value = 'suspend';
  suspendReason.value = '';
  showSuspendModal.value = true;
};

const restoreUser = (user) => {
  selectedUser.value = user;
  suspendAction.value = 'restore';
  showSuspendModal.value = true;
};

const confirmSuspendRestore = () => {
  if (selectedUser.value) {
    const index = users.value.findIndex((u) => u.id === selectedUser.value.id);
    if (index !== -1) {
      if (suspendAction.value === 'suspend') {
        users.value[index].status = 'suspended';
        alert(
          `Usuario ${selectedUser.value.name} suspendido${suspendReason.value ? `: ${suspendReason.value}` : ''}`
        );
      } else {
        users.value[index].status = 'active';
        alert(`Usuario ${selectedUser.value.name} restaurado correctamente`);
      }
    }
  }
  showSuspendModal.value = false;
  selectedUser.value = null;
  updateStats();
};

const deleteUser = (user) => {
  selectedUser.value = user;
  showDeleteModal.value = true;
};

const confirmDelete = () => {
  if (selectedUser.value) {
    const index = users.value.findIndex((u) => u.id === selectedUser.value.id);
    if (index !== -1) {
      users.value.splice(index, 1);
      alert(`Usuario ${selectedUser.value.name} eliminado`);
    }
  }
  showDeleteModal.value = false;
  selectedUser.value = null;
  updateStats();
};

// Initialize
onMounted(() => {
  updateStats();
});
</script>

<style scoped src="./styles.css"></style>
