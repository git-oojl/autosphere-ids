<template>
  <div class="my-listings-page">
    <br /><br /><br /><br /><br />

    <!-- MAIN CONTENT -->
    <div class="content-wrapper">
      <div class="content-container">
        <!-- HEADER -->
        <div class="page-header">
          <div class="header-info">
            <h1 class="page-title">Mis Anuncios</h1>
            <p class="page-subtitle">{{ totalListings }} publicados</p>
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
            Nuevo Anuncio
          </button>
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
                Filtrar por estado: {{ getFilterLabel(selectedFilter) }}
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
                <button @click="filterBy('all')">Todos</button>
                <button @click="filterBy('published')">Activos</button>
                <button @click="filterBy('draft')">Borradores</button>
                <button @click="filterBy('archived')">Archivados</button>
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
                placeholder="Buscar por marca, modelo o título..."
                class="search-input"
              />
            </div>
          </div>
        </div>

        <!-- LISTINGS GRID -->
        <div class="listings-grid">
          <div
            v-for="listing in paginatedListings"
            :key="listing.id"
            class="listing-card"
          >
            <!-- LEFT SECTION - Vehicle Info -->
            <div class="listing-left">
              <div class="vehicle-icon">
                <img
                  v-if="listing.coverImage"
                  :src="listing.coverImage"
                  :alt="listing.title"
                  class="vehicle-image"
                />
                <div v-else class="vehicle-icon-placeholder">
                  {{ getVehicleIcon(listing.type) }}
                </div>
              </div>
              <div class="vehicle-info">
                <h3 class="vehicle-name">{{ listing.title }}</h3>
                <div class="vehicle-meta">
                  <span class="brand-model"
                    >{{ listing.brand }} {{ listing.model }}</span
                  >
                  <span class="separator">•</span>
                  <span class="year">{{ listing.year }}</span>
                </div>
                <div class="vehicle-price">
                  ${{ formatPrice(listing.price) }}
                </div>
              </div>
            </div>

            <!-- CENTER SECTION - Status & Metrics -->
            <div class="listing-center">
              <div class="status-badge" :class="getStatusClass(listing.status)">
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
                {{ getStatusText(listing.status) }}
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
                  {{ listing.views || 0 }} vistas
                </div>
                <div class="metric-item">
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
                  {{ listing.messages || 0 }} mensajes
                </div>
              </div>
              <div class="listing-details">
                <span class="detail-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
                    />
                  </svg>
                  {{ listing.mileageKm?.toLocaleString() || 'Nuevo' }} km
                </span>
                <span class="detail-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path d="M8 4V8" stroke="currentColor" stroke-width="2" />
                    <path d="M16 4V8" stroke="currentColor" stroke-width="2" />
                  </svg>
                  {{ listing.transmission || 'Automática' }}
                </span>
                <span class="detail-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <circle cx="9" cy="9" r="1" fill="currentColor" />
                    <circle cx="15" cy="9" r="1" fill="currentColor" />
                    <circle cx="9" cy="15" r="1" fill="currentColor" />
                    <circle cx="15" cy="15" r="1" fill="currentColor" />
                  </svg>
                  {{ listing.color || 'No especificado' }}
                </span>
              </div>
            </div>

            <!-- RIGHT SECTION - Location -->
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
                {{ getCityName(listing.cityId) }}
              </div>
              <div class="date-info">
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
                Publicado: {{ formatDate(listing.createdAt) }}
              </div>
            </div>

            <!-- ACTIONS -->
            <div class="listing-actions">
              <button
                class="action-btn btn-edit"
                @click="editListing(listing.id)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 3L21 7L7 21H3V17L17 3Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                Editar
              </button>
              <button
                class="action-btn btn-view"
                @click="viewAsPublic(listing.id)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
                Ver
              </button>
              <button
                class="action-btn btn-delete"
                @click="deleteListing(listing.id)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                Eliminar
              </button>
            </div>
          </div>
        </div>

        <!-- PAGINATION -->
        <div v-if="totalPages > 1" class="pagination">
          <button
            class="page-btn"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
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
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
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
          <button class="btn-create-empty" @click="createNewListing">
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
import { ref, computed, onMounted } from 'vue';
// import { useRouter } from 'vue-router';

// IMPORTAR EL MOCK DESDE JSON
import listingsMock from '../../../mocks/admin/listings.json';

// const router = useRouter();

// Estados
const searchQuery = ref('');
const selectedFilter = ref('all');
const showFilterDropdown = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(6);

// Listings desde JSON
const listings = ref([]);

// Cargar datos desde JSON
const loadListings = () => {
  // Filtrar solo los anuncios del vendedor actual (u-seller-001)
  const sellerListings = listingsMock.items.filter(
    (item) => item.sellerId === 'u-seller-001'
  );

  // Mapear los datos al formato que usa el componente
  listings.value = sellerListings.map((item) => ({
    id: item.id,
    title: item.title,
    brand: item.brand,
    model: item.model,
    year: item.year,
    price: item.price,
    type: item.type,
    transmission: item.transmission,
    fuel: item.fuel,
    mileageKm: item.mileageKm,
    cityId: item.cityId,
    coverImage: item.coverImage,
    status: item.status,
    color: item.color,
    views: Math.floor(Math.random() * 500) + 50, // Simular vistas
    messages: Math.floor(Math.random() * 20), // Simular mensajes
    createdAt: new Date().toISOString().split('T')[0],
  }));
};

// Ciudades para mostrar el nombre
const cities = {
  'mx-cdmx': 'Ciudad de México',
  'mx-gdl': 'Guadalajara, Jalisco',
  'mx-mty': 'Monterrey, Nuevo León',
  'mx-pue': 'Puebla, Puebla',
  'mx-mer': 'Mérida, Yucatán',
};

const getCityName = (cityId) => {
  return cities[cityId] || 'Ubicación no especificada';
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-MX').format(price);
};

const formatDate = (date) => {
  if (!date) return 'Reciente';
  const d = new Date(date);
  return d.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const getStatusText = (status) => {
  const statuses = {
    published: 'Activo',
    draft: 'Borrador',
    archived: 'Archivado',
  };
  return statuses[status] || status;
};

const getStatusClass = (status) => {
  const classes = {
    published: 'active',
    draft: 'draft',
    archived: 'archived',
  };
  return classes[status] || status;
};

const getFilterLabel = (filter) => {
  const labels = {
    all: 'Todos',
    published: 'Activos',
    draft: 'Borradores',
    archived: 'Archivados',
  };
  return labels[filter] || filter;
};

const getVehicleIcon = (type) => {
  const icons = {
    SUV: '🚙',
    Sedán: '🚗',
    Pickup: '🛻',
    Hatchback: '🚘',
    Deportivo: '🏎️',
  };
  return icons[type] || '🚗';
};

const totalListings = computed(() => listings.value.length);

const filteredListings = computed(() => {
  let result = [...listings.value];

  // Filter by status
  if (selectedFilter.value !== 'all') {
    result = result.filter((l) => l.status === selectedFilter.value);
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (l) =>
        l.title.toLowerCase().includes(query) ||
        l.brand.toLowerCase().includes(query) ||
        l.model.toLowerCase().includes(query)
    );
  }

  return result;
});

const paginatedListings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredListings.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredListings.value.length / itemsPerPage.value)
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
const toggleFilterDropdown = () => {
  showFilterDropdown.value = !showFilterDropdown.value;
};

const filterBy = (filter) => {
  selectedFilter.value = filter;
  showFilterDropdown.value = false;
  currentPage.value = 1;
};

const createNewListing = () => {
  console.log('Crear nuevo anuncio');
  // router.push('create-listing');
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

// Initialize
onMounted(() => {
  loadListings();
});
</script>

<style scoped src="./styles.css"></style>
