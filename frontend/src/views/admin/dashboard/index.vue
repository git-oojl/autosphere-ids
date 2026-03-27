<template>
  <div class="admin-dashboard">
    <!-- DASHBOARD CONTENT -->
    <div class="dashboard-wrapper">
      <div class="dashboard-container">
        <!-- HEADER -->
        <div class="dashboard-header">
          <div>
            <h1 class="dashboard-title">Panel de Administración</h1>
            <p class="dashboard-subtitle">
              Gestiona usuarios, reportes y configuración del sistema
            </p>
          </div>
          <div class="header-actions">
            <button class="btn-secondary" @click="exportData">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                />
              </svg>
              Exportar
            </button>
            <button class="btn-primary" @click="openSettings">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="3" />
                <path
                  d="M12 1v6m0 6v6M5.6 5.6l4.2 4.2m4.2 4.2l4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m4.2-4.2l4.2-4.2"
                />
              </svg>
              Configuración
            </button>
          </div>
        </div>

        <!-- OVERVIEW TAB -->
        <div v-if="activeTab === 'overview'" class="tab-content">
          <!-- STATS CARDS -->
          <div class="stats-cards">
            <div class="stat-card">
              <div class="stat-header">
                <div class="stat-icon users">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                    />
                  </svg>
                </div>
                <h2 class="stat-title">Total Usuarios</h2>
              </div>
              <p class="stat-value">{{ stats.totalUsers }}</p>
              <div class="stat-footer">
                <div class="stat-change positive">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M12 19V5M5 12L12 5L19 12" />
                  </svg>
                  <span>+{{ stats.newUsers }} esta semana</span>
                </div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-header">
                <div class="stat-icon buyers">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                  </svg>
                </div>
                <h2 class="stat-title">Compradores</h2>
              </div>
              <p class="stat-value">{{ stats.buyers }}</p>
              <div class="stat-footer">
                <span class="stat-percent"
                  >{{ ((stats.buyers / stats.totalUsers) * 100).toFixed(0) }}%
                  del total</span
                >
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-header">
                <div class="stat-icon sellers">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M5 17H4a2 2 0 01-2-2V9.5M7 17a2 2 0 100-4M17 17a2 2 0 100-4"
                    />
                  </svg>
                </div>
                <h2 class="stat-title">Vendedores</h2>
              </div>
              <p class="stat-value">{{ stats.sellers }}</p>
              <div class="stat-footer">
                <span class="stat-percent"
                  >{{ ((stats.sellers / stats.totalUsers) * 100).toFixed(0) }}%
                  del total</span
                >
              </div>
            </div>

            <div class="stat-card highlight">
              <div class="stat-header">
                <div class="stat-icon reports">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>
                </div>
                <h2 class="stat-title">Reportes Pendientes</h2>
              </div>
              <p class="stat-value">{{ stats.pendingReports }}</p>
              <button class="btn-card" @click="activeTab = 'reports'">
                Ver Reportes
              </button>
            </div>
          </div>

          <!-- CHARTS ROW -->
          <div class="charts-row">
            <div class="chart-card">
              <div class="chart-header">
                <h3>Usuarios por Tipo</h3>
                <span class="period">Último mes</span>
              </div>
              <div class="chart-content">
                <div class="bar-chart">
                  <div class="bar-item">
                    <div class="bar-label">Compradores</div>
                    <div class="bar-container">
                      <div
                        class="bar-fill buyers"
                        :style="{
                          width: (stats.buyers / stats.totalUsers) * 100 + '%',
                        }"
                      ></div>
                      <span class="bar-value">{{ stats.buyers }}</span>
                    </div>
                  </div>
                  <div class="bar-item">
                    <div class="bar-label">Vendedores</div>
                    <div class="bar-container">
                      <div
                        class="bar-fill sellers"
                        :style="{
                          width: (stats.sellers / stats.totalUsers) * 100 + '%',
                        }"
                      ></div>
                      <span class="bar-value">{{ stats.sellers }}</span>
                    </div>
                  </div>
                  <div class="bar-item">
                    <div class="bar-label">Arrendadores</div>
                    <div class="bar-container">
                      <div
                        class="bar-fill landlords"
                        :style="{
                          width:
                            (stats.landlords / stats.totalUsers) * 100 + '%',
                        }"
                      ></div>
                      <span class="bar-value">{{ stats.landlords }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="chart-card">
              <div class="chart-header">
                <h3>Reportes por Severidad</h3>
                <span class="period">Hoy</span>
              </div>
              <div class="chart-content">
                <div class="severity-grid">
                  <div class="severity-item high">
                    <div class="severity-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4M12 16h.01" />
                      </svg>
                    </div>
                    <div class="severity-info">
                      <span class="severity-label">Alta</span>
                      <span class="severity-count">{{
                        reportsBySeverity.high
                      }}</span>
                    </div>
                  </div>
                  <div class="severity-item medium">
                    <div class="severity-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                        />
                        <path d="M12 9v4M12 17h.01" />
                      </svg>
                    </div>
                    <div class="severity-info">
                      <span class="severity-label">Media</span>
                      <span class="severity-count">{{
                        reportsBySeverity.medium
                      }}</span>
                    </div>
                  </div>
                  <div class="severity-item low">
                    <div class="severity-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                    </div>
                    <div class="severity-info">
                      <span class="severity-label">Baja</span>
                      <span class="severity-count">{{
                        reportsBySeverity.low
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- USERS TAB -->
        <div v-if="activeTab === 'users'" class="tab-content">
          <div class="section">
            <div class="section-header">
              <div class="section-title-row">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                  />
                </svg>
                <h3 class="section-title">Gestión de Usuarios</h3>
              </div>
              <div class="section-actions">
                <div class="search-box">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    v-model="userSearchQuery"
                    type="text"
                    placeholder="Buscar usuarios..."
                  />
                </div>
                <select v-model="userRoleFilter" class="filter-select">
                  <option value="all">Todos</option>
                  <option value="buyer">Compradores</option>
                  <option value="seller">Vendedores</option>
                  <option value="landlord">Arrendadores</option>
                </select>
              </div>
            </div>

            <div class="users-table-container">
              <table class="users-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Fecha Registro</th>
                    <th>Anuncios</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in filteredUsers" :key="user.id">
                    <td>
                      <div class="user-cell">
                        <div class="user-avatar-small">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div class="user-name-cell">{{ user.name }}</div>
                          <div class="user-id">ID: {{ user.id }}</div>
                        </div>
                      </div>
                    </td>
                    <td>{{ user.email }}</td>
                    <td>
                      <span class="role-badge" :class="user.role">
                        {{ roleLabels[user.role] }}
                      </span>
                    </td>
                    <td>
                      <span class="status-badge" :class="user.status">
                        {{ statusLabels[user.status] }}
                      </span>
                    </td>
                    <td>{{ formatDate(user.registeredAt) }}</td>
                    <td>
                      <span class="listings-count">{{
                        user.listingsCount || 0
                      }}</span>
                    </td>
                    <td>
                      <div class="table-actions">
                        <button
                          class="btn-icon"
                          title="Ver detalles"
                          @click="viewUser(user.id)"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                            />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        <button
                          class="btn-icon"
                          title="Editar"
                          @click="editUser(user.id)"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                            />
                            <path
                              d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                            />
                          </svg>
                        </button>
                        <button
                          class="btn-icon danger"
                          title="Suspender"
                          @click="suspendUser(user.id)"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M4.93 4.93l14.14 14.14" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- REPORTS TAB -->
        <div v-if="activeTab === 'reports'" class="tab-content">
          <div class="section">
            <div class="section-header">
              <div class="section-title-row">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                <h3 class="section-title">Reportes y Quejas</h3>
              </div>
              <div class="section-actions">
                <select v-model="reportStatusFilter" class="filter-select">
                  <option value="all">Todos</option>
                  <option value="pending">Pendientes</option>
                  <option value="reviewing">En Revisión</option>
                  <option value="resolved">Resueltos</option>
                </select>
                <select v-model="reportSeverityFilter" class="filter-select">
                  <option value="all">Todas las Severidades</option>
                  <option value="high">Alta</option>
                  <option value="medium">Media</option>
                  <option value="low">Baja</option>
                </select>
              </div>
            </div>

            <div class="reports-grid">
              <div
                v-for="report in filteredReports"
                :key="report.id"
                class="report-card"
                :class="report.severity"
              >
                <div class="report-header">
                  <div class="report-severity-badge" :class="report.severity">
                    {{ severityLabels[report.severity] }}
                  </div>
                  <div class="report-status-badge" :class="report.status">
                    {{ reportStatusLabels[report.status] }}
                  </div>
                </div>

                <div class="report-content">
                  <h4 class="report-title">{{ report.title }}</h4>
                  <p class="report-description">{{ report.description }}</p>

                  <div class="report-meta">
                    <div class="meta-item">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                        />
                      </svg>
                      <span>{{ report.reporterName }}</span>
                    </div>
                    <div class="meta-item">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      <span>{{ formatDate(report.createdAt) }}</span>
                    </div>
                  </div>

                  <div v-if="report.subjectType" class="report-subject">
                    <span class="subject-label">{{ report.subjectType }}:</span>
                    <span class="subject-value">{{ report.subjectName }}</span>
                  </div>
                </div>

                <div class="report-actions">
                  <button
                    class="btn-action view"
                    @click="viewReport(report.id)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Ver Detalles
                  </button>
                  <button
                    v-if="report.status !== 'resolved'"
                    class="btn-action resolve"
                    @click="resolveReport(report.id)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <path d="M22 4L12 14.01l-3-3" />
                    </svg>
                    Resolver
                  </button>
                  <button
                    class="btn-action delete"
                    @click="deleteReport(report.id)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                      />
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('overview');

const userSearchQuery = ref('');
const userRoleFilter = ref('all');
const reportStatusFilter = ref('all');
const reportSeverityFilter = ref('all');

const roleLabels = {
  buyer: 'Comprador',
  seller: 'Vendedor',
  landlord: 'Arrendador',
};
const statusLabels = {
  active: 'Activo',
  suspended: 'Suspendido',
  inactive: 'Inactivo',
};
const severityLabels = { high: 'Alta', medium: 'Media', low: 'Baja' };
const reportStatusLabels = {
  pending: 'Pendiente',
  reviewing: 'En Revisión',
  resolved: 'Resuelto',
};

const stats = ref({
  totalUsers: 1247,
  newUsers: 23,
  buyers: 856,
  sellers: 284,
  landlords: 107,
  pendingReports: 12,
});
const reportsBySeverity = ref({ high: 3, medium: 5, low: 4 });

const users = ref([
  {
    id: 'U001',
    name: 'Ana García Martínez',
    email: 'ana.garcia@email.com',
    role: 'buyer',
    status: 'active',
    registeredAt: '2024-01-15',
    listingsCount: 0,
  },
  {
    id: 'U002',
    name: 'Carlos Méndez López',
    email: 'carlos.mendez@email.com',
    role: 'seller',
    status: 'active',
    registeredAt: '2024-01-20',
    listingsCount: 12,
  },
  {
    id: 'U003',
    name: 'María Rodríguez Soto',
    email: 'maria.rodriguez@email.com',
    role: 'buyer',
    status: 'active',
    registeredAt: '2024-02-05',
    listingsCount: 0,
  },
  {
    id: 'U004',
    name: 'Juan Pérez Ruiz',
    email: 'juan.perez@email.com',
    role: 'seller',
    status: 'active',
    registeredAt: '2024-02-10',
    listingsCount: 8,
  },
  {
    id: 'U005',
    name: 'Laura González',
    email: 'laura.gonzalez@email.com',
    role: 'landlord',
    status: 'active',
    registeredAt: '2024-02-15',
    listingsCount: 5,
  },
  {
    id: 'U006',
    name: 'Roberto Sánchez',
    email: 'roberto.sanchez@email.com',
    role: 'buyer',
    status: 'suspended',
    registeredAt: '2024-03-01',
    listingsCount: 0,
  },
  {
    id: 'U007',
    name: 'Patricia Torres',
    email: 'patricia.torres@email.com',
    role: 'seller',
    status: 'active',
    registeredAt: '2024-03-05',
    listingsCount: 15,
  },
  {
    id: 'U008',
    name: 'Diego Ramírez',
    email: 'diego.ramirez@email.com',
    role: 'landlord',
    status: 'active',
    registeredAt: '2024-03-10',
    listingsCount: 3,
  },
]);

const reports = ref([
  {
    id: 'R001',
    title: 'Vehículo no corresponde a las fotos',
    description:
      'El vehículo mostrado en las fotografías no corresponde al vehículo real. Solicito revisión y posible sanción al vendedor.',
    severity: 'high',
    status: 'pending',
    reporterName: 'Ana García',
    createdAt: '2024-03-20',
    subjectType: 'Anuncio',
    subjectName: 'Mazda CX-5 2021',
  },
  {
    id: 'R002',
    title: 'Vendedor no responde mensajes',
    description:
      'He intentado contactar al vendedor múltiples veces sin obtener respuesta. Han pasado más de 5 días.',
    severity: 'medium',
    status: 'reviewing',
    reporterName: 'Carlos López',
    createdAt: '2024-03-19',
    subjectType: 'Usuario',
    subjectName: 'Juan Pérez Ruiz',
  },
  {
    id: 'R003',
    title: 'Precio excesivamente alto',
    description:
      'El precio publicado es significativamente superior al valor de mercado del vehículo.',
    severity: 'low',
    status: 'resolved',
    reporterName: 'María Rodríguez',
    createdAt: '2024-03-18',
    subjectType: 'Anuncio',
    subjectName: 'Toyota Corolla 2020',
  },
  {
    id: 'R004',
    title: 'Posible fraude - solicita anticipo',
    description:
      'El vendedor solicita un anticipo del 50% antes de permitir ver el vehículo. Comportamiento sospechoso.',
    severity: 'high',
    status: 'pending',
    reporterName: 'Roberto Sánchez',
    createdAt: '2024-03-21',
    subjectType: 'Usuario',
    subjectName: 'Vendedor Desconocido',
  },
  {
    id: 'R005',
    title: 'Información de kilometraje falsa',
    description:
      'El odómetro del vehículo muestra más kilómetros que los anunciados en la publicación.',
    severity: 'high',
    status: 'reviewing',
    reporterName: 'Laura González',
    createdAt: '2024-03-20',
    subjectType: 'Anuncio',
    subjectName: 'Ford Ranger 2022',
  },
  {
    id: 'R006',
    title: 'Lenguaje inapropiado en mensajes',
    description:
      'El usuario utiliza lenguaje ofensivo e inapropiado en las conversaciones.',
    severity: 'medium',
    status: 'pending',
    reporterName: 'Patricia Torres',
    createdAt: '2024-03-19',
    subjectType: 'Usuario',
    subjectName: 'Comprador Anónimo',
  },
]);

const filteredUsers = computed(() => {
  let filtered = users.value;
  if (userRoleFilter.value !== 'all')
    filtered = filtered.filter((u) => u.role === userRoleFilter.value);
  if (userSearchQuery.value) {
    const query = userSearchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.id.toLowerCase().includes(query)
    );
  }
  return filtered;
});

const filteredReports = computed(() => {
  let filtered = reports.value;
  if (reportStatusFilter.value !== 'all')
    filtered = filtered.filter((r) => r.status === reportStatusFilter.value);
  if (reportSeverityFilter.value !== 'all')
    filtered = filtered.filter(
      (r) => r.severity === reportSeverityFilter.value
    );
  return filtered;
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const exportData = () => alert('Exportando datos...');
const openSettings = () => alert('Abriendo configuración...');
const viewUser = (id) => alert(`Ver detalles del usuario: ${id}`);
const editUser = (id) => alert(`Editar usuario: ${id}`);
const suspendUser = (id) => {
  if (confirm('¿Está seguro de suspender este usuario?'))
    alert(`Usuario ${id} suspendido`);
};
const viewReport = (id) => alert(`Ver detalles del reporte: ${id}`);
const resolveReport = (id) => {
  if (confirm('¿Marcar este reporte como resuelto?')) {
    const report = reports.value.find((r) => r.id === id);
    if (report) report.status = 'resolved';
    alert(`Reporte ${id} resuelto`);
  }
};
const deleteReport = (id) => {
  if (confirm('¿Está seguro de eliminar este reporte?')) {
    const index = reports.value.findIndex((r) => r.id === id);
    if (index !== -1) reports.value.splice(index, 1);
    alert(`Reporte ${id} eliminado`);
  }
};
</script>

<style scoped src="./styles.css"></style>
