<template>
  <div class="my-listings-page">
    <!-- MAIN CONTENT -->
    <div class="content-wrapper">
      <div class="content-container">
        <!-- HEADER -->
        <div class="page-header">
          <div class="header-info">
            <h1 class="page-title">Mis Anuncios</h1>
            <p class="page-subtitle">{{ totalListings }} publicados</p>
          </div>
        </div>

        <!-- FILTERS AND SEARCH -->
        <div class="toolbar">
          <div class="toolbar-left">
            <div class="filter-dropdown">
              <button class="filter-btn" @click="toggleFilterDropdown">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="4"
                    y1="6"
                    x2="20"
                    y2="6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="4"
                    y1="12"
                    x2="20"
                    y2="12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="4"
                    y1="18"
                    x2="20"
                    y2="18"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                Filtrar por estado: {{ selectedFilter }}
                <svg
                  class="chevron"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div v-if="showFilterDropdown" class="dropdown-menu">
                <button @click="filterBy('Todos')">Todos</button>
                <button @click="filterBy('Activos')">Activos</button>
                <button @click="filterBy('Pausados')">Pausados</button>
                <button @click="filterBy('Vendidos')">Vendidos</button>
              </div>
            </div>

            <div class="search-box">
              <svg
                class="search-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M21 21L16.65 16.65"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar anuncio..."
                class="search-input"
              />
            </div>
          </div>

          <button class="btn-create" @click="createNewListing">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="12"
                y1="5"
                x2="12"
                y2="19"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            Crear nuevo
          </button>
        </div>

        <!-- LISTINGS GRID -->
        <div class="listings-grid">
          <div
            v-for="listing in filteredListings"
            :key="listing.id"
            class="listing-card"
          >
            <!-- LEFT SECTION - Vehicle Info -->
            <div class="listing-left">
              <div class="vehicle-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V9.5C2 8.96957 2.21071 8.46086 2.58579 8.08579C2.96086 7.71071 3.46957 7.5 4 7.5H6.5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <circle
                    cx="7"
                    cy="17"
                    r="2"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <circle
                    cx="17"
                    cy="17"
                    r="2"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M22 12V13C22 13.5304 21.7893 14.0391 21.4142 14.4142C21.0391 14.7893 20.5304 15 20 15H19M9 17H15"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.5 7.5V4H17.5L22 9.5V12H6.5V7.5Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="vehicle-info">
                <h3 class="vehicle-name">{{ listing.name }}</h3>
                <div class="vehicle-meta">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
                  Publicado: {{ listing.publishDate }}
                </div>
              </div>
            </div>

            <!-- CENTER SECTION - Status & Metrics -->
            <div class="listing-center">
              <div class="status-badge" :class="listing.statusClass">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                {{ listing.status }}
              </div>
              <div class="metrics">
                <div class="metric-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
                  {{ listing.views }} vistas
                </div>
              </div>
            </div>

            <!-- RIGHT SECTION - Location & Messages -->
            <div class="listing-right">
              <div class="location-info">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                {{ listing.location }}
              </div>
              <div class="messages-info">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                {{ listing.messages }} Mensajes
              </div>
            </div>

            <!-- ACTIONS -->
            <div class="listing-actions">
              <button
                class="action-btn btn-edit"
                @click="editListing(listing.id)"
              >
                Editar
              </button>
              <button
                class="action-btn btn-view"
                @click="viewAsPublic(listing.id)"
              >
                Ver como público
              </button>
              <button
                class="action-btn btn-delete"
                @click="deleteListing(listing.id)"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>

        <!-- EMPTY STATE -->
        <div v-if="filteredListings.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
                stroke="currentColor"
                stroke-width="2"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="7"
                stroke="currentColor"
                stroke-width="2"
              />
              <rect
                x="14"
                y="14"
                width="7"
                height="7"
                stroke="currentColor"
                stroke-width="2"
              />
              <rect
                x="3"
                y="14"
                width="7"
                height="7"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
          </div>
          <h3>No se encontraron anuncios</h3>
          <p>Intenta con otros filtros o crea tu primer anuncio</p>
          <button class="btn-create" @click="createNewListing">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="12"
                y1="5"
                x2="12"
                y2="19"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            Crear primer anuncio
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
// import { useRouter } from 'vue-router';

// const router = useRouter();

// const userName = ref('Carlos Méndez');
const searchQuery = ref('');
const selectedFilter = ref('Todos');
const showFilterDropdown = ref(false);

const listings = ref([
  {
    id: 1,
    name: '2016 Fiat 500',
    publishDate: '10/02/2026',
    status: 'New',
    statusClass: 'new',
    views: 1200,
    location: 'Charger USA',
    messages: 8,
  },
  {
    id: 2,
    name: '2021 Chevrolet Silverado 1500',
    publishDate: '05/02/2026',
    status: 'New',
    statusClass: 'new',
    views: 2100,
    location: 'Alberta Condor',
    messages: 15,
  },
  {
    id: 3,
    name: 'Porsche 2019',
    publishDate: '28/01/2026',
    status: 'New',
    statusClass: 'new',
    views: 3400,
    location: 'Barcelona Spain',
    messages: 12,
  },
  {
    id: 4,
    name: 'BMW X5 2022',
    publishDate: '15/02/2026',
    status: 'Active',
    statusClass: 'active',
    views: 1850,
    location: 'Munich Germany',
    messages: 6,
  },
  {
    id: 5,
    name: 'Audi A4 2020',
    publishDate: '20/01/2026',
    status: 'Paused',
    statusClass: 'paused',
    views: 980,
    location: 'Berlin Germany',
    messages: 3,
  },
]);

const totalListings = computed(() => listings.value.length);

const filteredListings = computed(() => {
  let result = listings.value;

  // Filter by status
  if (selectedFilter.value !== 'Todos') {
    result = result.filter((l) => l.status === selectedFilter.value);
  }

  // Filter by search query
  if (searchQuery.value) {
    result = result.filter((l) =>
      l.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return result;
});

const toggleFilterDropdown = () => {
  showFilterDropdown.value = !showFilterDropdown.value;
};

const filterBy = (filter) => {
  selectedFilter.value = filter;
  showFilterDropdown.value = false;
};

const createNewListing = () => {
  console.log('Crear nuevo anuncio');
  // router.push('/crear-anuncio')
};

const editListing = (id) => {
  console.log('Editar anuncio:', id);
  // router.push(`/editar-anuncio/${id}`)
};

const viewAsPublic = (id) => {
  console.log('Ver como público:', id);
  // router.push(`/vehiculo/${id}`)
};

const deleteListing = (id) => {
  if (confirm('¿Estás seguro de eliminar este anuncio?')) {
    listings.value = listings.value.filter((l) => l.id !== id);
    console.log('Anuncio eliminado:', id);
  }
};
</script>

<style scoped src="./styles.css"></style>
