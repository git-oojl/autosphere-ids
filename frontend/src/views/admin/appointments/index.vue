<template>
  <div class="appointments-page">
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
            <h1 class="page-title">Gestión de Citas</h1>
            <p class="page-subtitle">
              Administra todas las citas agendadas en la plataforma
            </p>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn-secondary" @click="exportAppointments">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3V12M12 12L9 9M12 12L15 9"
                stroke="currentColor"
                stroke-width="2"
              />
              <path d="M5 15V19H19V15" stroke="currentColor" stroke-width="2" />
            </svg>
            Exportar
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card" @click="setStatusFilter('all')">
        <div class="stat-icon blue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
              ry="2"
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
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ stats.total }}</span>
          <span class="stat-title">Total Citas</span>
        </div>
      </div>
      <div class="stat-card" @click="setStatusFilter('pending')">
        <div class="stat-icon yellow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
        <div class="stat-content">
          <span class="stat-number">{{ stats.pending }}</span>
          <span class="stat-title">Pendientes</span>
        </div>
      </div>
      <div class="stat-card" @click="setStatusFilter('confirmed')">
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
          <span class="stat-number">{{ stats.confirmed }}</span>
          <span class="stat-title">Confirmadas</span>
        </div>
      </div>
      <div class="stat-card" @click="setStatusFilter('completed')">
        <div class="stat-icon purple">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 11.1C22 16.5 17.5 20.9 12 20.9C6.5 20.9 2 16.5 2 11.1C2 6.5 5.8 2.8 10.7 2.2"
              stroke="currentColor"
              stroke-width="2"
            />
            <path d="M22 4L12 14L9 11" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ stats.completed }}</span>
          <span class="stat-title">Completadas</span>
        </div>
      </div>
    </div>

    <!-- Date Filter Bar -->
    <div class="date-filter-bar">
      <div class="date-filter-container">
        <div class="date-range">
          <label>Fecha desde:</label>
          <input v-model="dateFrom" type="date" class="date-input" />
          <label>hasta:</label>
          <input v-model="dateTo" type="date" class="date-input" />
        </div>
        <button class="btn-secondary" @click="clearDateFilter">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6H21M6 12H18M10 18H14"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
          Limpiar fechas
        </button>
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
            placeholder="Buscar por cliente, vehículo o ID..."
          />
        </div>
        <select v-model="statusFilter" class="filter-select">
          <option value="all">Todos los estados</option>
          <option value="pending">Pendientes</option>
          <option value="confirmed">Confirmadas</option>
          <option value="completed">Completadas</option>
          <option value="cancelled">Canceladas</option>
        </select>
        <select v-model="typeFilter" class="filter-select">
          <option value="all">Todos los tipos</option>
          <option value="test-drive">Test Drive</option>
          <option value="inspection">Inspección</option>
          <option value="negotiation">Negociación</option>
        </select>
        <select v-model="locationFilter" class="filter-select">
          <option value="all">Todas las ubicaciones</option>
          <option value="Concesionaria">Concesionaria</option>
          <option value="Domicilio">Domicilio</option>
          <option value="Público">Lugar público</option>
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

    <!-- Appointments Table -->
    <div class="table-container">
      <div class="table-header">
        <h3>Lista de Citas</h3>
        <div class="table-info">
          Mostrando {{ paginatedAppointments.length }} de
          {{ filteredAppointments.length }} citas
        </div>
      </div>

      <div class="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Vehículo</th>
              <th>Vendedor</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Tipo</th>
              <th>Ubicación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="appointment in paginatedAppointments"
              :key="appointment.id"
            >
              <td class="id-cell">#{{ appointment.id }}</td>
              <td class="user-cell">
                <div
                  class="user-avatar"
                  :style="{
                    background: getAvatarColor(appointment.clientName),
                  }"
                >
                  {{ appointment.clientName.charAt(0) }}
                </div>
                <div>
                  <div class="user-name">{{ appointment.clientName }}</div>
                  <div class="user-phone">{{ appointment.clientPhone }}</div>
                </div>
              </td>
              <td>
                <div class="vehicle-name">{{ appointment.vehicle }}</div>
                <div class="vehicle-price">
                  ${{ formatPrice(appointment.vehiclePrice) }}
                </div>
              </td>
              <td>
                <div class="seller-name">{{ appointment.sellerName }}</div>
                <div class="seller-phone">{{ appointment.sellerPhone }}</div>
              </td>
              <td>{{ formatDate(appointment.date) }}</td>
              <td class="time-cell">{{ appointment.time }}</td>
              <td>
                <span :class="['type-badge', getTypeClass(appointment.type)]">
                  {{ getTypeText(appointment.type) }}
                </span>
              </td>
              <td>
                <span class="location-text">{{ appointment.location }}</span>
              </td>
              <td>
                <span :class="['status-badge', appointment.status]">
                  {{ getStatusText(appointment.status) }}
                </span>
              </td>
              <td class="actions-cell">
                <button
                  class="action-btn view"
                  title="Ver detalles"
                  @click="viewAppointment(appointment)"
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
                  v-if="appointment.status === 'pending'"
                  class="action-btn confirm"
                  title="Confirmar cita"
                  @click="confirmAppointment(appointment)"
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
                  v-if="appointment.status === 'confirmed'"
                  class="action-btn complete"
                  title="Marcar como completada"
                  @click="completeAppointment(appointment)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 11.1C22 16.5 17.5 20.9 12 20.9C6.5 20.9 2 16.5 2 11.1C2 6.5 5.8 2.8 10.7 2.2"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M22 4L12 14L9 11"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                </button>
                <button
                  v-if="
                    appointment.status !== 'cancelled' &&
                    appointment.status !== 'completed'
                  "
                  class="action-btn cancel"
                  title="Cancelar cita"
                  @click="cancelAppointment(appointment)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                </button>
                <button
                  class="action-btn delete"
                  title="Eliminar"
                  @click="deleteAppointment(appointment)"
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
            <tr v-if="filteredAppointments.length === 0">
              <td colspan="10" class="empty-state">
                <div class="empty-icon">📅</div>
                <p>No hay citas que coincidan con los filtros</p>
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

    <!-- Appointment Details Modal -->
    <div
      v-if="showDetailsModal"
      class="modal-overlay"
      @click.self="closeDetailsModal"
    >
      <div class="modal-content large">
        <div class="modal-header">
          <h2>Detalles de la Cita #{{ selectedAppointment?.id }}</h2>
          <button class="modal-close" @click="closeDetailsModal">×</button>
        </div>
        <div v-if="selectedAppointment" class="modal-body">
          <div class="details-summary">
            <div class="summary-card">
              <div class="summary-label">Estado actual</div>
              <div class="summary-value">
                <span :class="['status-badge', selectedAppointment.status]">
                  {{ getStatusText(selectedAppointment.status) }}
                </span>
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-label">Fecha y hora</div>
              <div class="summary-value">
                {{ formatDate(selectedAppointment.date) }} -
                {{ selectedAppointment.time }}
              </div>
            </div>
          </div>

          <div class="details-grid">
            <div class="details-section">
              <h4>Información del Cliente</h4>
              <div class="detail-card">
                <div class="detail-label">Nombre completo</div>
                <div class="detail-value">
                  {{ selectedAppointment.clientName }}
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Teléfono</div>
                <div class="detail-value">
                  {{ selectedAppointment.clientPhone }}
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Email</div>
                <div class="detail-value">
                  {{ selectedAppointment.clientEmail }}
                </div>
              </div>
            </div>

            <div class="details-section">
              <h4>Información del Vendedor</h4>
              <div class="detail-card">
                <div class="detail-label">Nombre completo</div>
                <div class="detail-value">
                  {{ selectedAppointment.sellerName }}
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Teléfono</div>
                <div class="detail-value">
                  {{ selectedAppointment.sellerPhone }}
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Email</div>
                <div class="detail-value">
                  {{ selectedAppointment.sellerEmail }}
                </div>
              </div>
            </div>

            <div class="details-section">
              <h4>Información del Vehículo</h4>
              <div class="detail-card">
                <div class="detail-label">Vehículo</div>
                <div class="detail-value">
                  {{ selectedAppointment.vehicle }}
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Precio</div>
                <div class="detail-value price">
                  ${{ formatPrice(selectedAppointment.vehiclePrice) }}
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Año</div>
                <div class="detail-value">
                  {{ selectedAppointment.vehicleYear || 'N/A' }}
                </div>
              </div>
            </div>

            <div class="details-section">
              <h4>Detalles de la Cita</h4>
              <div class="detail-card">
                <div class="detail-label">Tipo de cita</div>
                <div class="detail-value">
                  <span
                    :class="[
                      'type-badge',
                      getTypeClass(selectedAppointment.type),
                    ]"
                  >
                    {{ getTypeText(selectedAppointment.type) }}
                  </span>
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Ubicación</div>
                <div class="detail-value">
                  {{ selectedAppointment.location }}
                </div>
              </div>
              <div v-if="selectedAppointment.address" class="detail-card">
                <div class="detail-label">Dirección</div>
                <div class="detail-value">
                  {{ selectedAppointment.address }}
                </div>
              </div>
              <div v-if="selectedAppointment.notes" class="detail-card">
                <div class="detail-label">Notas adicionales</div>
                <div class="detail-value notes">
                  {{ selectedAppointment.notes }}
                </div>
              </div>
            </div>
          </div>

          <div class="modal-actions">
            <button class="btn-secondary" @click="closeDetailsModal">
              Cerrar
            </button>
            <button
              v-if="selectedAppointment.status === 'pending'"
              class="btn-primary"
              @click="
                confirmAppointment(selectedAppointment);
                closeDetailsModal();
              "
            >
              Confirmar cita
            </button>
            <button
              v-if="selectedAppointment.status === 'confirmed'"
              class="btn-primary"
              @click="
                completeAppointment(selectedAppointment);
                closeDetailsModal();
              "
            >
              Marcar como completada
            </button>
            <button
              v-if="
                selectedAppointment.status !== 'cancelled' &&
                selectedAppointment.status !== 'completed'
              "
              class="btn-danger"
              @click="
                cancelAppointment(selectedAppointment);
                closeDetailsModal();
              "
            >
              Cancelar cita
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cancel Confirmation Modal -->
    <div
      v-if="showCancelModal"
      class="modal-overlay"
      @click.self="showCancelModal = false"
    >
      <div class="modal-content small">
        <div class="modal-header">
          <h2>Cancelar Cita</h2>
          <button class="modal-close" @click="showCancelModal = false">
            ×
          </button>
        </div>
        <div class="modal-body">
          <div class="confirmation-icon warning">⚠️</div>
          <p class="confirmation-text">
            ¿Cancelar la cita <strong>#{{ selectedAppointment?.id }}</strong
            >?
          </p>
          <p class="confirmation-subtext">
            El cliente y el vendedor serán notificados de la cancelación.
          </p>
          <div class="form-group">
            <label>Motivo de cancelación</label>
            <textarea
              v-model="cancelReason"
              class="form-input"
              rows="3"
              placeholder="Describe el motivo de la cancelación..."
            ></textarea>
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" @click="showCancelModal = false">
              Volver
            </button>
            <button class="btn-danger" @click="confirmCancel">
              Cancelar cita
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
          <h2>Eliminar Cita</h2>
          <button class="modal-close" @click="showDeleteModal = false">
            ×
          </button>
        </div>
        <div class="modal-body">
          <div class="confirmation-icon warning">⚠️</div>
          <p class="confirmation-text">
            ¿Eliminar la cita <strong>#{{ selectedAppointment?.id }}</strong
            >?
          </p>
          <p class="confirmation-subtext">
            Esta acción eliminará permanentemente la cita del sistema.
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
  total: 0,
  pending: 0,
  confirmed: 0,
  completed: 0,
});

// Appointments data
const appointments = ref([
  {
    id: 1,
    clientName: 'Ana García',
    clientPhone: '55 1234 5678',
    clientEmail: 'ana.garcia@email.com',
    sellerName: 'Carlos Méndez',
    sellerPhone: '55 8765 4321',
    sellerEmail: 'carlos.mendez@email.com',
    vehicle: 'Porsche 911 Carrera 2022',
    vehiclePrice: 2850000,
    vehicleYear: 2022,
    date: '2024-03-25',
    time: '10:30',
    type: 'test-drive',
    location: 'Concesionaria',
    address: 'Av. Reforma 123, CDMX',
    notes: 'Cliente interesado en probar el vehículo en carretera',
    status: 'confirmed',
  },
  {
    id: 2,
    clientName: 'Carlos Rodríguez',
    clientPhone: '55 9876 5432',
    clientEmail: 'carlos.rodriguez@email.com',
    sellerName: 'Ana Ramírez',
    sellerPhone: '55 1122 3344',
    sellerEmail: 'ana.ramirez@email.com',
    vehicle: 'BMW X5 M Competition 2023',
    vehiclePrice: 1980000,
    vehicleYear: 2023,
    date: '2024-03-25',
    time: '13:00',
    type: 'negotiation',
    location: 'Concesionaria',
    address: 'Av. Insurgentes 456, CDMX',
    notes: 'Negociación de precio y financiamiento',
    status: 'pending',
  },
  {
    id: 3,
    clientName: 'María López',
    clientPhone: '33 1234 5678',
    clientEmail: 'maria.lopez@email.com',
    sellerName: 'Luis Fernández',
    sellerPhone: '33 8765 4321',
    sellerEmail: 'luis.fernandez@email.com',
    vehicle: 'Mercedes-Benz Clase S 2024',
    vehiclePrice: 3250000,
    vehicleYear: 2024,
    date: '2024-03-26',
    time: '09:00',
    type: 'inspection',
    location: 'Domicilio',
    address: 'Av. Vallarta 789, Guadalajara',
    notes: 'Inspección detallada del vehículo en domicilio',
    status: 'pending',
  },
  {
    id: 4,
    clientName: 'Laura Martínez',
    clientPhone: '81 2345 6789',
    clientEmail: 'laura.martinez@email.com',
    sellerName: 'Roberto Gómez',
    sellerPhone: '81 9876 5432',
    sellerEmail: 'roberto.gomez@email.com',
    vehicle: 'Audi RS7 Sportback 2022',
    vehiclePrice: 2150000,
    vehicleYear: 2022,
    date: '2024-03-24',
    time: '15:30',
    type: 'test-drive',
    location: 'Público',
    address: 'Plaza comercial, Monterrey',
    notes: '',
    status: 'completed',
  },
  {
    id: 5,
    clientName: 'Javier Fernández',
    clientPhone: '55 4455 6677',
    clientEmail: 'javier.fernandez@email.com',
    sellerName: 'Sofía Ramírez',
    sellerPhone: '55 8899 0011',
    sellerEmail: 'sofia.ramirez@email.com',
    vehicle: 'Tesla Model S Plaid',
    vehiclePrice: 2350000,
    vehicleYear: 2023,
    date: '2024-03-27',
    time: '11:00',
    type: 'test-drive',
    location: 'Concesionaria',
    address: 'Av. Santa Fe 234, CDMX',
    notes: 'Prueba de manejo de vehículo eléctrico',
    status: 'confirmed',
  },
  {
    id: 6,
    clientName: 'Fernando Díaz',
    clientPhone: '55 3322 1144',
    clientEmail: 'fernando.diaz@email.com',
    sellerName: 'Mario González',
    sellerPhone: '55 7766 5544',
    sellerEmail: 'mario.gonzalez@email.com',
    vehicle: 'Chevrolet Silverado 2023',
    vehiclePrice: 35000,
    vehicleYear: 2023,
    date: '2024-03-23',
    time: '14:00',
    type: 'negotiation',
    location: 'Domicilio',
    address: 'Av. Universidad 567, CDMX',
    notes: 'Negociación de contrato de renta',
    status: 'cancelled',
  },
  {
    id: 7,
    clientName: 'Gabriela Torres',
    clientPhone: '55 9988 7766',
    clientEmail: 'gabriela.torres@email.com',
    sellerName: 'Ricardo Castro',
    sellerPhone: '55 4433 2211',
    sellerEmail: 'ricardo.castro@email.com',
    vehicle: 'Porsche 911 Carrera 2022',
    vehiclePrice: 2850000,
    vehicleYear: 2022,
    date: '2024-03-28',
    time: '12:00',
    type: 'inspection',
    location: 'Concesionaria',
    address: 'Av. Reforma 123, CDMX',
    notes: 'Inspección mecánica y documentación',
    status: 'pending',
  },
]);

// Filters
const searchTerm = ref('');
const statusFilter = ref('all');
const typeFilter = ref('all');
const locationFilter = ref('all');
const dateFrom = ref('');
const dateTo = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

// Modal states
const showDetailsModal = ref(false);
const showCancelModal = ref(false);
const showDeleteModal = ref(false);
const selectedAppointment = ref(null);
const cancelReason = ref('');

// Computed
const filteredAppointments = computed(() => {
  let filtered = [...appointments.value];

  // Filter by search term
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.clientName.toLowerCase().includes(term) ||
        a.vehicle.toLowerCase().includes(term) ||
        a.id.toString().includes(term) ||
        a.sellerName.toLowerCase().includes(term)
    );
  }

  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter((a) => a.status === statusFilter.value);
  }

  // Filter by type
  if (typeFilter.value !== 'all') {
    filtered = filtered.filter((a) => a.type === typeFilter.value);
  }

  // Filter by location
  if (locationFilter.value !== 'all') {
    filtered = filtered.filter((a) => a.location === locationFilter.value);
  }

  // Filter by date range
  if (dateFrom.value) {
    filtered = filtered.filter((a) => a.date >= dateFrom.value);
  }
  if (dateTo.value) {
    filtered = filtered.filter((a) => a.date <= dateTo.value);
  }

  // Sort by date (newest first)
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  return filtered;
});

const paginatedAppointments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredAppointments.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredAppointments.value.length / itemsPerPage)
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

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-MX').format(price);
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
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    completed: 'Completada',
    cancelled: 'Cancelada',
  };
  return statuses[status] || status;
};

const getTypeText = (type) => {
  const types = {
    'test-drive': 'Test Drive',
    inspection: 'Inspección',
    negotiation: 'Negociación',
  };
  return types[type] || type;
};

const getTypeClass = (type) => {
  const classes = {
    'test-drive': 'test-drive',
    inspection: 'inspection',
    negotiation: 'negotiation',
  };
  return classes[type] || 'test-drive';
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
  stats.value.total = appointments.value.length;
  stats.value.pending = appointments.value.filter(
    (a) => a.status === 'pending'
  ).length;
  stats.value.confirmed = appointments.value.filter(
    (a) => a.status === 'confirmed'
  ).length;
  stats.value.completed = appointments.value.filter(
    (a) => a.status === 'completed'
  ).length;
};

const setStatusFilter = (status) => {
  statusFilter.value = status;
  currentPage.value = 1;
};

const clearFilters = () => {
  searchTerm.value = '';
  statusFilter.value = 'all';
  typeFilter.value = 'all';
  locationFilter.value = 'all';
  currentPage.value = 1;
};

const clearDateFilter = () => {
  dateFrom.value = '';
  dateTo.value = '';
  currentPage.value = 1;
};

const viewAppointment = (appointment) => {
  selectedAppointment.value = appointment;
  showDetailsModal.value = true;
};

const closeDetailsModal = () => {
  showDetailsModal.value = false;
  selectedAppointment.value = null;
};

const confirmAppointment = (appointment) => {
  const index = appointments.value.findIndex((a) => a.id === appointment.id);
  if (index !== -1) {
    appointments.value[index].status = 'confirmed';
    alert(`Cita #${appointment.id} confirmada correctamente`);
    updateStats();
  }
};

const completeAppointment = (appointment) => {
  const index = appointments.value.findIndex((a) => a.id === appointment.id);
  if (index !== -1) {
    appointments.value[index].status = 'completed';
    alert(`Cita #${appointment.id} marcada como completada`);
    updateStats();
  }
};

const cancelAppointment = (appointment) => {
  selectedAppointment.value = appointment;
  cancelReason.value = '';
  showCancelModal.value = true;
};

const confirmCancel = () => {
  if (selectedAppointment.value) {
    const index = appointments.value.findIndex(
      (a) => a.id === selectedAppointment.value.id
    );
    if (index !== -1) {
      appointments.value[index].status = 'cancelled';
      alert(
        `Cita #${selectedAppointment.value.id} cancelada${cancelReason.value ? `: ${cancelReason.value}` : ''}`
      );
    }
  }
  showCancelModal.value = false;
  selectedAppointment.value = null;
  updateStats();
};

const deleteAppointment = (appointment) => {
  selectedAppointment.value = appointment;
  showDeleteModal.value = true;
};

const confirmDelete = () => {
  if (selectedAppointment.value) {
    const index = appointments.value.findIndex(
      (a) => a.id === selectedAppointment.value.id
    );
    if (index !== -1) {
      appointments.value.splice(index, 1);
      alert(`Cita #${selectedAppointment.value.id} eliminada`);
    }
  }
  showDeleteModal.value = false;
  selectedAppointment.value = null;
  updateStats();
};

const exportAppointments = () => {
  const data = JSON.stringify(filteredAppointments.value, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `citas_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// Initialize
onMounted(() => {
  updateStats();
});
</script>

<style scoped src="./styles.css"></style>
