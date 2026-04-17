<template>
  <div class="admin-dashboard">
    <br /><br /><br /><br />
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-container">
        <div>
          <h1 class="page-title">Panel de Administración</h1>
          <p class="page-subtitle">
            Gestiona todos los aspectos de la plataforma AutoSphere
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

    <!-- Stats Overview Cards -->
    <div class="stats-grid">
      <div class="stat-card">
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
          <span class="stat-number">{{ stats.totalUsers }}</span>
          <span class="stat-title">Usuarios Totales</span>
        </div>
        <div class="stat-change positive">+12%</div>
      </div>
      <div class="stat-card">
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
          <span class="stat-number">{{ stats.totalListings }}</span>
          <span class="stat-title">Anuncios Activos</span>
        </div>
        <div class="stat-change positive">+8%</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple">
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
            <circle cx="12" cy="14" r="1" fill="currentColor" />
            <circle cx="16" cy="14" r="1" fill="currentColor" />
            <circle cx="8" cy="14" r="1" fill="currentColor" />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ stats.totalAppointments }}</span>
          <span class="stat-title">Citas Programadas</span>
        </div>
        <div class="stat-change positive">+5%</div>
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
          <span class="stat-number">{{ stats.pendingModeration }}</span>
          <span class="stat-title">Moderación Pendiente</span>
        </div>
        <div class="stat-change negative">{{ stats.pendingModeration }}</div>
      </div>
    </div>

    <!-- Main Sections Grid -->
    <div class="sections-container">
      <h2 class="sections-title">Gestión de la Plataforma</h2>

      <!-- SECCIÓN 1: Gestión / CRUD -->
      <div class="section-group">
        <div class="group-header">
          <h3 class="group-title">Gestión / CRUD</h3>
          <span class="group-description">Administración de datos</span>
        </div>
        <div class="cards-grid">
          <!-- Usuarios -->
          <div class="module-card" @click="goToUsers">
            <div class="module-icon gradient-cyan">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 21V19C17 16.8 15.2 15 13 15H5C2.8 15 1 16.8 1 19V21"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M23 21V19C22.9 17 21.4 15.3 19 15"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M16 3.5C18.1 4 19.5 5.8 19.5 8C19.5 10.2 18.1 12 16 12.5"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </div>
            <h4 class="module-title">Usuarios</h4>
            <p class="module-desc">
              Gestiona compradores, vendedores y arrendadores
            </p>
            <div class="module-badge">{{ stats.totalUsers }} usuarios</div>
            <span class="module-action">Gestionar →</span>
          </div>

          <!-- Anuncios / Vehículos -->
          <div class="module-card" @click="goToListings">
            <div class="module-icon gradient-green">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
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
            <h4 class="module-title">Anuncios / Vehículos</h4>
            <p class="module-desc">CRUD completo de vehículos publicados</p>
            <div class="module-badge">{{ stats.totalListings }} activos</div>
            <span class="module-action">Gestionar →</span>
          </div>

          <!-- Citas -->
          <div class="module-card" @click="goToAppointments">
            <div class="module-icon gradient-purple">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
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
                <path d="M3 10H21" stroke="currentColor" stroke-width="2" />
                <circle cx="12" cy="15" r="1" fill="currentColor" />
                <circle cx="16" cy="15" r="1" fill="currentColor" />
                <circle cx="8" cy="15" r="1" fill="currentColor" />
              </svg>
            </div>
            <h4 class="module-title">Citas</h4>
            <p class="module-desc">Gestiona todas las citas agendadas</p>
            <div class="module-badge">
              {{ stats.totalAppointments }} programadas
            </div>
            <span class="module-action">Gestionar →</span>
          </div>

          <!-- Catálogos -->
          <div class="module-card" @click="goToCatalog">
            <div class="module-icon gradient-orange">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6H20V18H4V6Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path d="M8 10H16" stroke="currentColor" stroke-width="2" />
                <path d="M8 14H13" stroke="currentColor" stroke-width="2" />
                <circle cx="17" cy="14" r="1" fill="currentColor" />
                <circle cx="17" cy="10" r="1" fill="currentColor" />
              </svg>
            </div>
            <h4 class="module-title">Catálogos</h4>
            <p class="module-desc">Gestiona marcas, modelos y ubicaciones</p>
            <div class="module-badge">{{ catalogBadge }}</div>
            <span class="module-action">Gestionar →</span>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 3: Moderación -->
      <div class="section-group">
        <div class="group-header">
          <h3 class="group-title">Moderación</h3>
          <span class="group-description">Control de calidad y seguridad</span>
        </div>
        <div class="cards-grid">
          <!-- Aprobar / Rechazar Anuncios (Moderación) -->
          <div class="module-card" @click="goToModeration">
            <div class="module-icon gradient-yellow">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </div>
            <h4 class="module-title">Aprobar / Rechazar Anuncios</h4>
            <p class="module-desc">Revisa y modera anuncios pendientes</p>
            <div class="module-badge warning">
              {{ stats.pendingModeration }} pendientes
            </div>
            <span class="module-action">Moderar →</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAdminDashboard } from '../../../services/admin.js';

const router = useRouter();

const stats = ref({
  totalUsers: 0,
  totalListings: 0,
  totalAppointments: 0,
  pendingReports: 0,
  pendingModeration: 0,
  suspendedUsers: 0,
  catalogSummary: {
    brands: 0,
    models: 0,
    types: 0,
    locations: 0,
  },
});

const catalogBadge = computed(() => {
  const summary = stats.value.catalogSummary || {};
  return `${summary.brands || 0} marcas | ${summary.models || 0} modelos`;
});

const currentDate = ref('');

const loadDashboard = async () => {
  const response = await getAdminDashboard();
  stats.value = {
    ...stats.value,
    ...(response?.summary || {}),
  };
};

onMounted(async () => {
  const now = new Date();
  currentDate.value = now.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  await loadDashboard();
});

const goToUsers = () => {
  router.push('/admin/usuarios');
};
const goToListings = () => {
  router.push('/admin/vehiculos');
};
const goToAppointments = () => {
  router.push('/admin/citas');
};
const goToCatalog = () => {
  router.push('/admin/catalogo');
};
const goToModeration = () => {
  router.push('/admin/moderacion');
};
</script>

<style scoped src="./styles.css"></style>
