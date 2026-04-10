<template>
  <div class="reports-page">
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
            <h1 class="page-title">Gestión de Reportes</h1>
            <p class="page-subtitle">
              Administra denuncias y quejas de usuarios en la plataforma
            </p>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn-secondary" @click="exportReports">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3V12M12 12L9 9M12 12L15 9"
                stroke="currentColor"
                stroke-width="2"
              />
              <path d="M5 15V19H19V15" stroke="currentColor" stroke-width="2" />
            </svg>
            Exportar reportes
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card" @click="setStatusFilter('all')">
        <div class="stat-icon blue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 8V12M12 16H12.01M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ stats.total }}</span>
          <span class="stat-title">Total Reportes</span>
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
      <div class="stat-card" @click="setStatusFilter('reviewing')">
        <div class="stat-icon purple">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 12V8H4V12M20 12L12 18L4 12M20 12H22M2 12H4M12 2V4M12 22V20"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ stats.reviewing }}</span>
          <span class="stat-title">En Revisión</span>
        </div>
      </div>
      <div class="stat-card" @click="setStatusFilter('resolved')">
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
          <span class="stat-number">{{ stats.resolved }}</span>
          <span class="stat-title">Resueltos</span>
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
            placeholder="Buscar por título, usuario o ID..."
          />
        </div>
        <select v-model="statusFilter" class="filter-select">
          <option value="all">Todos los estados</option>
          <option value="pending">Pendientes</option>
          <option value="reviewing">En revisión</option>
          <option value="resolved">Resueltos</option>
        </select>
        <select v-model="severityFilter" class="filter-select">
          <option value="all">Todas las severidades</option>
          <option value="high">Alta</option>
          <option value="medium">Media</option>
          <option value="low">Baja</option>
        </select>
        <select v-model="typeFilter" class="filter-select">
          <option value="all">Todos los tipos</option>
          <option value="vehiculo">Problema con vehículo</option>
          <option value="vendedor">Problema con vendedor</option>
          <option value="fraude">Fraude / Estafa</option>
          <option value="comportamiento">Comportamiento inapropiado</option>
          <option value="otro">Otros</option>
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

    <!-- Reports Table -->
    <div class="table-container">
      <div class="table-header">
        <h3>Lista de Reportes y Denuncias</h3>
        <div class="table-info">
          Mostrando {{ filteredReports.length }} de
          {{ reports.length }} reportes
        </div>
      </div>

      <div class="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Reportado por</th>
              <th>Título / Motivo</th>
              <th>Tipo</th>
              <th>Severidad</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="report in filteredReports" :key="report.id">
              <td class="id-cell">#{{ report.id }}</td>
              <td class="user-cell">
                <div
                  class="user-avatar"
                  :style="{ background: getAvatarColor(report.reporterName) }"
                >
                  {{ report.reporterName.charAt(0) }}
                </div>
                <div>
                  <div class="user-name">{{ report.reporterName }}</div>
                  <div class="user-email">{{ report.reporterEmail }}</div>
                </div>
              </td>
              <td class="title-cell">
                <div class="report-title">{{ report.title }}</div>
                <div class="report-preview">
                  {{ truncateText(report.description, 60) }}
                </div>
              </td>
              <td>
                <span :class="['type-badge', getTypeClass(report.type)]">
                  {{ getTypeText(report.type) }}
                </span>
              </td>
              <td>
                <span :class="['severity-badge', report.severity]">
                  {{ getSeverityText(report.severity) }}
                </span>
              </td>
              <td>{{ formatDate(report.createdAt) }}</td>
              <td>
                <span :class="['status-badge', report.status]">
                  {{ getStatusText(report.status) }}
                </span>
              </td>
              <td class="actions-cell">
                <button
                  class="action-btn view"
                  title="Ver detalles"
                  @click="viewReport(report)"
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
                  v-if="report.status === 'pending'"
                  class="action-btn review"
                  title="Marcar en revisión"
                  @click="startReview(report)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 12V8H4V12M20 12L12 18L4 12M20 12H22M2 12H4M12 2V4M12 22V20"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                </button>
                <button
                  v-if="report.status === 'reviewing'"
                  class="action-btn resolve"
                  title="Resolver reporte"
                  @click="resolveReport(report)"
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
                  title="Eliminar reporte"
                  @click="deleteReport(report)"
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
            <tr v-if="filteredReports.length === 0">
              <td colspan="8" class="empty-state">
                <div class="empty-icon">📭</div>
                <p>No hay reportes que coincidan con los filtros</p>
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

    <!-- Report Details Modal -->
    <div
      v-if="showDetailsModal"
      class="modal-overlay"
      @click.self="closeDetailsModal"
    >
      <div class="modal-content large">
        <div class="modal-header">
          <h2>Detalles del Reporte #{{ selectedReport?.id }}</h2>
          <button class="modal-close" @click="closeDetailsModal">×</button>
        </div>
        <div v-if="selectedReport" class="modal-body">
          <div class="details-grid">
            <div class="details-section">
              <div class="detail-card">
                <div class="detail-label">Reportado por</div>
                <div class="detail-value">
                  <strong>{{ selectedReport.reporterName }}</strong>
                  <span class="detail-email">{{
                    selectedReport.reporterEmail
                  }}</span>
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Reportado contra</div>
                <div class="detail-value">
                  <strong>{{ selectedReport.reportedName || 'N/A' }}</strong>
                  <span class="detail-email">{{
                    selectedReport.reportedEmail || ''
                  }}</span>
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Tipo de reporte</div>
                <div class="detail-value">
                  <span
                    :class="['type-badge', getTypeClass(selectedReport.type)]"
                  >
                    {{ getTypeText(selectedReport.type) }}
                  </span>
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Severidad</div>
                <div class="detail-value">
                  <span :class="['severity-badge', selectedReport.severity]">
                    {{ getSeverityText(selectedReport.severity) }}
                  </span>
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Estado actual</div>
                <div class="detail-value">
                  <span :class="['status-badge', selectedReport.status]">
                    {{ getStatusText(selectedReport.status) }}
                  </span>
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Fecha de reporte</div>
                <div class="detail-value">
                  {{ formatDate(selectedReport.createdAt) }}
                </div>
              </div>
            </div>
            <div class="details-section full-width">
              <div class="detail-card">
                <div class="detail-label">Título</div>
                <div class="detail-value">{{ selectedReport.title }}</div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Descripción completa</div>
                <div class="detail-value description">
                  {{ selectedReport.description }}
                </div>
              </div>
              <div v-if="selectedReport.evidence" class="detail-card">
                <div class="detail-label">Evidencia</div>
                <div class="detail-value">
                  <a
                    :href="selectedReport.evidence"
                    target="_blank"
                    class="evidence-link"
                  >
                    Ver evidencia adjunta →
                  </a>
                </div>
              </div>
              <div v-if="selectedReport.adminNotes" class="detail-card">
                <div class="detail-label">Notas del administrador</div>
                <div class="detail-value">{{ selectedReport.adminNotes }}</div>
              </div>
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" @click="closeDetailsModal">
              Cerrar
            </button>
            <button
              v-if="selectedReport.status === 'pending'"
              class="btn-primary"
              @click="
                startReview(selectedReport);
                closeDetailsModal();
              "
            >
              Marcar en revisión
            </button>
            <button
              v-if="selectedReport.status === 'reviewing'"
              class="btn-primary"
              @click="
                resolveReport(selectedReport);
                closeDetailsModal();
              "
            >
              Resolver reporte
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Resolve Report Modal -->
    <div
      v-if="showResolveModal"
      class="modal-overlay"
      @click.self="showResolveModal = false"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h2>Resolver Reporte</h2>
          <button class="modal-close" @click="showResolveModal = false">
            ×
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Acción tomada</label>
            <select v-model="resolveForm.action" class="form-input">
              <option value="">Seleccionar acción</option>
              <option value="warning">Advertencia al usuario reportado</option>
              <option value="suspension">Suspensión temporal</option>
              <option value="ban">Bloqueo permanente</option>
              <option value="dismissed">Reporte infundado</option>
            </select>
          </div>
          <div class="form-group">
            <label>Notas del administrador</label>
            <textarea
              v-model="resolveForm.notes"
              class="form-input"
              rows="4"
              placeholder="Agrega notas sobre cómo se resolvió este reporte..."
            ></textarea>
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" @click="showResolveModal = false">
              Cancelar
            </button>
            <button class="btn-primary" @click="confirmResolve">
              Resolver
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
          <h2>Eliminar Reporte</h2>
          <button class="modal-close" @click="showDeleteModal = false">
            ×
          </button>
        </div>
        <div class="modal-body">
          <div class="confirmation-icon warning">⚠️</div>
          <p class="confirmation-text">
            ¿Eliminar el reporte <strong>#{{ selectedReport?.id }}</strong
            >?
          </p>
          <p class="confirmation-subtext">
            Esta acción eliminará permanentemente el reporte del sistema.
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
  reviewing: 0,
  resolved: 0,
});

// Reports data
const reports = ref([
  {
    id: 1,
    reporterName: 'Ana García',
    reporterEmail: 'ana.garcia@email.com',
    reportedName: 'Carlos Méndez',
    reportedEmail: 'carlos.mendez@email.com',
    title: 'Vehículo no corresponde a las fotos',
    description:
      'El vehículo que me mostraron en la cita no coincidía con las fotos del anuncio. El kilometraje era mucho mayor y tenía golpes no visibles en las imágenes.',
    type: 'vehiculo',
    severity: 'high',
    createdAt: '2024-03-20T10:30:00',
    status: 'pending',
    evidence: null,
    adminNotes: null,
  },
  {
    id: 2,
    reporterName: 'Carlos Ruiz',
    reporterEmail: 'carlos.ruiz@email.com',
    reportedName: 'Laura Martínez',
    reportedEmail: 'laura.martinez@email.com',
    title: 'Vendedor no responde mensajes',
    description:
      'He enviado 5 mensajes en los últimos 3 días y el vendedor no ha respondido ninguno. El anuncio sigue activo pero no hay comunicación.',
    type: 'vendedor',
    severity: 'medium',
    createdAt: '2024-03-19T15:20:00',
    status: 'reviewing',
    evidence: null,
    adminNotes: 'Se contactó al vendedor vía email',
  },
  {
    id: 3,
    reporterName: 'María López',
    reporterEmail: 'maria.lopez@email.com',
    reportedName: 'Pedro Sánchez',
    reportedEmail: 'pedro.sanchez@email.com',
    title: 'Precio irreal - Posible estafa',
    description:
      'El vehículo está publicado a un precio muy por debajo del mercado (Porsche 911 en $500,000 MXN). Sospecho que es una estafa.',
    type: 'fraude',
    severity: 'high',
    createdAt: '2024-03-18T09:15:00',
    status: 'pending',
    evidence: null,
    adminNotes: null,
  },
  {
    id: 4,
    reporterName: 'Javier Fernández',
    reporterEmail: 'javier.fernandez@email.com',
    reportedName: 'Sofía Ramírez',
    reportedEmail: 'sofia.ramirez@email.com',
    title: 'Lenguaje inapropiado en conversación',
    description:
      'El vendedor utilizó lenguaje ofensivo cuando le pregunté sobre el estado del vehículo. Adjunto capturas de la conversación.',
    type: 'comportamiento',
    severity: 'medium',
    createdAt: '2024-03-17T14:45:00',
    status: 'resolved',
    evidence: '/uploads/evidence-4.pdf',
    adminNotes: 'Se envió advertencia al vendedor',
  },
  {
    id: 5,
    reporterName: 'Fernando Díaz',
    reporterEmail: 'fernando.diaz@email.com',
    reportedName: 'Mario González',
    reportedEmail: 'mario.gonzalez@email.com',
    title: 'Kilometraje manipulado',
    description:
      'El vehículo muestra 45,000 km en el anuncio pero en el historial de servicios aparece con 87,000 km.',
    type: 'vehiculo',
    severity: 'high',
    createdAt: '2024-03-16T11:00:00',
    status: 'reviewing',
    evidence: '/uploads/evidence-5.pdf',
    adminNotes: 'Se solicitó documentación adicional',
  },
  {
    id: 6,
    reporterName: 'Gabriela Torres',
    reporterEmail: 'gabriela.torres@email.com',
    reportedName: 'Ricardo Castro',
    reportedEmail: 'ricardo.castro@email.com',
    title: 'Publicación duplicada',
    description:
      'El mismo vehículo está publicado 3 veces con diferentes precios. Es confuso para los compradores.',
    type: 'otro',
    severity: 'low',
    createdAt: '2024-03-15T16:30:00',
    status: 'resolved',
    evidence: null,
    adminNotes: 'Se eliminaron publicaciones duplicadas',
  },
]);

// Filters
const searchTerm = ref('');
const statusFilter = ref('all');
const severityFilter = ref('all');
const typeFilter = ref('all');
const currentPage = ref(1);
const itemsPerPage = 10;

// Modals
const showDetailsModal = ref(false);
const showResolveModal = ref(false);
const showDeleteModal = ref(false);
const selectedReport = ref(null);
const resolveForm = ref({
  action: '',
  notes: '',
});

// Computed
const filteredReports = computed(() => {
  let filtered = reports.value;

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.title.toLowerCase().includes(term) ||
        r.reporterName.toLowerCase().includes(term) ||
        r.id.toString().includes(term)
    );
  }

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter((r) => r.status === statusFilter.value);
  }

  if (severityFilter.value !== 'all') {
    filtered = filtered.filter((r) => r.severity === severityFilter.value);
  }

  if (typeFilter.value !== 'all') {
    filtered = filtered.filter((r) => r.type === typeFilter.value);
  }

  return filtered;
});

const totalPages = computed(() =>
  Math.ceil(filteredReports.value.length / itemsPerPage)
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
    hour: '2-digit',
    minute: '2-digit',
  });
};

const truncateText = (text, length) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

const getStatusText = (status) => {
  const statuses = {
    pending: 'Pendiente',
    reviewing: 'En revisión',
    resolved: 'Resuelto',
  };
  return statuses[status] || status;
};

const getSeverityText = (severity) => {
  const severities = {
    high: 'Alta',
    medium: 'Media',
    low: 'Baja',
  };
  return severities[severity] || severity;
};

const getTypeText = (type) => {
  const types = {
    vehiculo: 'Problema con vehículo',
    vendedor: 'Problema con vendedor',
    fraude: 'Fraude / Estafa',
    comportamiento: 'Comportamiento inapropiado',
    otro: 'Otros',
  };
  return types[type] || type;
};

const getTypeClass = (type) => {
  const classes = {
    vehiculo: 'vehiculo',
    vendedor: 'vendedor',
    fraude: 'fraude',
    comportamiento: 'comportamiento',
    otro: 'otro',
  };
  return classes[type] || 'otro';
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

const setStatusFilter = (status) => {
  statusFilter.value = status;
  currentPage.value = 1;
};

const clearFilters = () => {
  searchTerm.value = '';
  statusFilter.value = 'all';
  severityFilter.value = 'all';
  typeFilter.value = 'all';
  currentPage.value = 1;
};

const updateStats = () => {
  stats.value.total = reports.value.length;
  stats.value.pending = reports.value.filter(
    (r) => r.status === 'pending'
  ).length;
  stats.value.reviewing = reports.value.filter(
    (r) => r.status === 'reviewing'
  ).length;
  stats.value.resolved = reports.value.filter(
    (r) => r.status === 'resolved'
  ).length;
};

const viewReport = (report) => {
  selectedReport.value = report;
  showDetailsModal.value = true;
};

const closeDetailsModal = () => {
  showDetailsModal.value = false;
  selectedReport.value = null;
};

const startReview = (report) => {
  const index = reports.value.findIndex((r) => r.id === report.id);
  if (index !== -1) {
    reports.value[index].status = 'reviewing';
    reports.value[index].adminNotes = 'En revisión por el equipo de moderación';
    alert(`Reporte #${report.id} marcado como "En revisión"`);
    updateStats();
  }
};

const resolveReport = (report) => {
  selectedReport.value = report;
  resolveForm.value = {
    action: '',
    notes: '',
  };
  showResolveModal.value = true;
};

const confirmResolve = () => {
  if (selectedReport.value) {
    const index = reports.value.findIndex(
      (r) => r.id === selectedReport.value.id
    );
    if (index !== -1) {
      reports.value[index].status = 'resolved';
      reports.value[index].adminNotes =
        resolveForm.value.notes ||
        `Resuelto - Acción: ${resolveForm.value.action || 'No especificada'}`;
      alert(`Reporte #${selectedReport.value.id} resuelto`);
    }
  }
  showResolveModal.value = false;
  selectedReport.value = null;
  updateStats();
};

const deleteReport = (report) => {
  selectedReport.value = report;
  showDeleteModal.value = true;
};

const confirmDelete = () => {
  if (selectedReport.value) {
    const index = reports.value.findIndex(
      (r) => r.id === selectedReport.value.id
    );
    if (index !== -1) {
      reports.value.splice(index, 1);
      alert(`Reporte #${selectedReport.value.id} eliminado`);
    }
  }
  showDeleteModal.value = false;
  selectedReport.value = null;
  updateStats();
};

const exportReports = () => {
  const data = JSON.stringify(reports.value, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `reportes_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// Initialize
onMounted(() => {
  updateStats();
});
</script>

<style scoped src="./styles.css"></style>
