<template>
  <div class="listings-page">
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
            <h1 class="page-title">Gestión de Anuncios</h1>
            <p class="page-subtitle">
              Administra todos los vehículos publicados en la plataforma
            </p>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn-primary" @click="openListingModal('create')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            Nuevo Anuncio
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
          <span class="stat-number">{{ stats.total }}</span>
          <span class="stat-title">Total Anuncios</span>
        </div>
      </div>
      <div class="stat-card" @click="setStatusFilter('active')">
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
          <span class="stat-number">{{ stats.active }}</span>
          <span class="stat-title">Activos</span>
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
      <div class="stat-card" @click="setStatusFilter('sold')">
        <div class="stat-icon purple">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ stats.sold }}</span>
          <span class="stat-title">Vendidos</span>
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
            placeholder="Buscar por título, marca o vendedor..."
          />
        </div>
        <select v-model="statusFilter" class="filter-select">
          <option value="all">Todos los estados</option>
          <option value="active">Activos</option>
          <option value="pending">Pendientes</option>
          <option value="paused">Pausados</option>
          <option value="sold">Vendidos</option>
        </select>
        <select v-model="categoryFilter" class="filter-select">
          <option value="all">Todas las categorías</option>
          <option value="SUV">SUV</option>
          <option value="Sedán">Sedán</option>
          <option value="Pickup">Pickup</option>
          <option value="Hatchback">Hatchback</option>
        </select>
        <select v-model="sortBy" class="filter-select">
          <option value="date_desc">Más recientes primero</option>
          <option value="date_asc">Más antiguos primero</option>
          <option value="price_desc">Mayor precio</option>
          <option value="price_asc">Menor precio</option>
          <option value="views_desc">Más vistos</option>
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

    <!-- Listings Table -->
    <div class="table-container">
      <div class="table-header">
        <h3>Lista de Vehículos</h3>
        <div class="table-info">
          Mostrando {{ paginatedListings.length }} de
          {{ filteredListings.length }} anuncios
        </div>
      </div>

      <div class="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Vehículo</th>
              <th>Vendedor</th>
              <th>Precio</th>
              <th>Año</th>
              <th>Categoría</th>
              <th>Kilometraje</th>
              <th>Ubicación</th>
              <th>Vistas</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="listing in paginatedListings" :key="listing.id">
              <td class="id-cell">{{ listing.id }}</td>
              <td class="vehicle-cell">
                <div class="vehicle-avatar">
                  {{ getVehicleIcon(listing.category) }}
                </div>
                <div>
                  <div class="vehicle-title">{{ listing.title }}</div>
                  <div class="vehicle-brand">
                    {{ listing.brand }} {{ listing.model }} • {{ listing.year }}
                  </div>
                </div>
              </td>
              <td class="seller-cell">
                <div class="seller-name">{{ listing.sellerName }}</div>
                <div class="seller-email">{{ listing.sellerEmail }}</div>
              </td>
              <td class="price-cell">${{ formatPrice(listing.price) }}</td>
              <td>{{ listing.year }}</td>
              <td>
                <span
                  :class="[
                    'category-badge',
                    getCategoryClass(listing.category),
                  ]"
                >
                  {{ listing.category }}
                </span>
              </td>
              <td>{{ listing.mileageKm?.toLocaleString() || 'Nuevo' }} km</td>
              <td>{{ listing.cityName || 'No especificada' }}</td>
              <td class="views-cell">
                <span class="views-count">{{ listing.views }}</span>
              </td>
              <td>
                <span :class="['status-badge', listing.status]">
                  {{ getStatusText(listing.status) }}
                </span>
              </td>
              <td class="actions-cell">
                <button
                  class="action-btn view"
                  title="Ver detalles"
                  @click="viewListing(listing)"
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
                  title="Editar"
                  @click="openListingModal('edit', listing)"
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
                  title="Eliminar"
                  @click="deleteListing(listing)"
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
            <tr v-if="filteredListings.length === 0">
              <td colspan="11" class="empty-state">
                <div class="empty-icon">🚗</div>
                <p>No hay anuncios que coincidan con los filtros</p>
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

    <!-- Listing Modal (Create/Edit) -->
    <div
      v-if="showListingModal"
      class="modal-overlay"
      @click.self="closeListingModal"
    >
      <div class="modal-content large">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Editar Anuncio' : 'Nuevo Anuncio' }}</h2>
          <button class="modal-close" @click="closeListingModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>Título del anuncio *</label>
              <input
                v-model="listingForm.title"
                type="text"
                class="form-input"
                placeholder="Ej: Mazda CX-5 i Grand Touring 2021"
              />
            </div>
            <div class="form-group">
              <label>Categoría *</label>
              <select v-model="listingForm.category" class="form-input">
                <option value="SUV">SUV</option>
                <option value="Sedán">Sedán</option>
                <option value="Pickup">Pickup</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Deportivo">Deportivo</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Marca *</label>
              <input
                v-model="listingForm.brand"
                type="text"
                class="form-input"
                placeholder="Ej: Mazda"
              />
            </div>
            <div class="form-group">
              <label>Modelo *</label>
              <input
                v-model="listingForm.model"
                type="text"
                class="form-input"
                placeholder="Ej: CX-5"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Año *</label>
              <input
                v-model="listingForm.year"
                type="number"
                class="form-input"
                placeholder="Ej: 2021"
              />
            </div>
            <div class="form-group">
              <label>Precio *</label>
              <input
                v-model="listingForm.price"
                type="number"
                class="form-input"
                placeholder="Ej: 478000"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Kilometraje</label>
              <input
                v-model="listingForm.mileageKm"
                type="number"
                class="form-input"
                placeholder="Ej: 42500"
              />
            </div>
            <div class="form-group">
              <label>Color</label>
              <input
                v-model="listingForm.color"
                type="text"
                class="form-input"
                placeholder="Ej: Rojo"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Transmisión</label>
              <select v-model="listingForm.transmission" class="form-input">
                <option value="Automática">Automática</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div class="form-group">
              <label>Combustible</label>
              <select v-model="listingForm.fuel" class="form-input">
                <option value="Gasolina">Gasolina</option>
                <option value="Diésel">Diésel</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Eléctrico">Eléctrico</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Ubicación</label>
              <input
                v-model="listingForm.cityName"
                type="text"
                class="form-input"
                placeholder="Ej: Ciudad de México"
              />
            </div>
            <div class="form-group">
              <label>Estado *</label>
              <select v-model="listingForm.status" class="form-input">
                <option value="active">Activo</option>
                <option value="pending">Pendiente</option>
                <option value="paused">Pausado</option>
                <option value="sold">Vendido</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <textarea
              v-model="listingForm.description"
              class="form-input"
              rows="4"
              placeholder="Describe el vehículo..."
            ></textarea>
          </div>
          <div class="form-group">
            <label>Características (separadas por coma)</label>
            <input
              v-model="listingForm.featuresInput"
              type="text"
              class="form-input"
              placeholder="Ej: Aire acondicionado, Vidrios eléctricos, Cámara reversa"
            />
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" @click="closeListingModal">
              Cancelar
            </button>
            <button class="btn-primary" @click="saveListing">
              {{ isEditing ? 'Guardar cambios' : 'Crear anuncio' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Listing Details Modal -->
    <div
      v-if="showDetailsModal"
      class="modal-overlay"
      @click.self="closeDetailsModal"
    >
      <div class="modal-content large">
        <div class="modal-header">
          <h2>Detalles del Anuncio</h2>
          <button class="modal-close" @click="closeDetailsModal">×</button>
        </div>
        <div v-if="selectedListing" class="modal-body">
          <div class="details-header">
            <div class="details-icon">
              {{ getVehicleIcon(selectedListing.category) }}
            </div>
            <div class="details-title">
              <h3>{{ selectedListing.title }}</h3>
              <div class="details-badges">
                <span :class="['status-badge', selectedListing.status]">
                  {{ getStatusText(selectedListing.status) }}
                </span>
                <span
                  :class="[
                    'category-badge',
                    getCategoryClass(selectedListing.category),
                  ]"
                >
                  {{ selectedListing.category }}
                </span>
              </div>
            </div>
          </div>
          <div class="details-grid">
            <div class="details-section">
              <h4>Información del Vehículo</h4>
              <div class="detail-card">
                <div class="detail-label">Marca / Modelo</div>
                <div class="detail-value">
                  {{ selectedListing.brand }} {{ selectedListing.model }}
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Año</div>
                <div class="detail-value">{{ selectedListing.year }}</div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Precio</div>
                <div class="detail-value price">
                  ${{ formatPrice(selectedListing.price) }}
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Kilometraje</div>
                <div class="detail-value">
                  {{ selectedListing.mileageKm?.toLocaleString() || 'Nuevo' }}
                  km
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Color</div>
                <div class="detail-value">
                  {{ selectedListing.color || 'No especificado' }}
                </div>
              </div>
            </div>
            <div class="details-section">
              <h4>Especificaciones</h4>
              <div class="detail-card">
                <div class="detail-label">Transmisión</div>
                <div class="detail-value">
                  {{ selectedListing.transmission || 'Automática' }}
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Combustible</div>
                <div class="detail-value">
                  {{ selectedListing.fuel || 'Gasolina' }}
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Ubicación</div>
                <div class="detail-value">
                  {{ selectedListing.cityName || 'No especificada' }}
                </div>
              </div>
            </div>
            <div class="details-section">
              <h4>Información del Vendedor</h4>
              <div class="detail-card">
                <div class="detail-label">Nombre</div>
                <div class="detail-value">{{ selectedListing.sellerName }}</div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Email</div>
                <div class="detail-value">
                  {{ selectedListing.sellerEmail }}
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Teléfono</div>
                <div class="detail-value">
                  {{ selectedListing.sellerPhone || 'No especificado' }}
                </div>
              </div>
            </div>
            <div class="details-section full-width">
              <h4>Descripción</h4>
              <div class="detail-card">
                <div class="detail-value description">
                  {{ selectedListing.description }}
                </div>
              </div>
              <h4>Características</h4>
              <div class="detail-card">
                <div class="features">
                  <span
                    v-for="feature in selectedListing.features"
                    :key="feature"
                    class="feature-tag"
                  >
                    {{ feature }}
                  </span>
                </div>
              </div>
              <h4>Estadísticas</h4>
              <div class="stats-row">
                <div class="stat-mini">
                  <div class="stat-mini-label">Vistas totales</div>
                  <div class="stat-mini-value">{{ selectedListing.views }}</div>
                </div>
                <div class="stat-mini">
                  <div class="stat-mini-label">Mensajes</div>
                  <div class="stat-mini-value">
                    {{ selectedListing.messages || 0 }}
                  </div>
                </div>
                <div class="stat-mini">
                  <div class="stat-mini-label">Fecha publicación</div>
                  <div class="stat-mini-value">
                    {{ formatDate(selectedListing.createdAt) }}
                  </div>
                </div>
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
                openListingModal('edit', selectedListing);
                closeDetailsModal();
              "
            >
              Editar anuncio
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
          <h2>Eliminar Anuncio</h2>
          <button class="modal-close" @click="showDeleteModal = false">
            ×
          </button>
        </div>
        <div class="modal-body">
          <div class="confirmation-icon warning">⚠️</div>
          <p class="confirmation-text">
            ¿Eliminar el anuncio <strong>{{ selectedListing?.title }}</strong
            >?
          </p>
          <p class="confirmation-subtext">
            Esta acción eliminará permanentemente el anuncio del sistema.
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
import {
  getAdminListings,
  saveAdminListing,
  deleteAdminListing,
} from '../../../services/admin.js';

const router = useRouter();

// Stats
const stats = ref({
  total: 0,
  active: 0,
  pending: 0,
  sold: 0,
});

const listings = ref([]);

// Filters
const searchTerm = ref('');
const statusFilter = ref('all');
const categoryFilter = ref('all');
const sortBy = ref('date_desc');
const currentPage = ref(1);
const itemsPerPage = 10;

// Modal states
const showListingModal = ref(false);
const showDetailsModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const selectedListing = ref(null);
const listingForm = ref({
  title: '',
  brand: '',
  model: '',
  year: '',
  price: '',
  category: 'SUV',
  transmission: 'Automática',
  fuel: 'Gasolina',
  mileageKm: '',
  cityName: '',
  color: '',
  status: 'pending',
  description: '',
  featuresInput: '',
});

// Computed
const filteredListings = computed(() => {
  let filtered = [...listings.value];

  // Filter by search term
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    filtered = filtered.filter(
      (l) =>
        l.title.toLowerCase().includes(term) ||
        l.brand.toLowerCase().includes(term) ||
        l.sellerName.toLowerCase().includes(term)
    );
  }

  // Filter by status
  if (statusFilter.value !== 'all') {
    const statusBuckets = {
      active: ['active', 'published', 'approved'],
      pending: ['pending', 'draft'],
      sold: ['sold'],
      paused: ['paused', 'archived', 'unavailable'],
    };
    const accepted = statusBuckets[statusFilter.value] || [statusFilter.value];
    filtered = filtered.filter((l) => accepted.includes(l.status));
  }

  // Filter by category
  if (categoryFilter.value !== 'all') {
    filtered = filtered.filter((l) => l.category === categoryFilter.value);
  }

  // Sort
  switch (sortBy.value) {
    case 'date_desc':
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'date_asc':
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'price_desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'price_asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'views_desc':
      filtered.sort((a, b) => b.views - a.views);
      break;
  }

  return filtered;
});

const paginatedListings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredListings.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredListings.value.length / itemsPerPage)
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

const loadListings = async () => {
  const response = await getAdminListings();
  listings.value = response?.items || [];
  updateStats();
};

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
    active: 'Activo',
    published: 'Activo',
    approved: 'Activo',
    pending: 'Pendiente',
    draft: 'Borrador',
    paused: 'Pausado',
    archived: 'Archivado',
    unavailable: 'No disponible',
    sold: 'Vendido',
  };
  return statuses[status] || status;
};

const getCategoryClass = (category) => {
  const classes = {
    SUV: 'suv',
    Sedán: 'sedan',
    Pickup: 'pickup',
    Hatchback: 'hatchback',
    Deportivo: 'deportivo',
  };
  return classes[category] || 'suv';
};

const getVehicleIcon = (category) => {
  const icons = {
    SUV: '🚙',
    Sedán: '🚗',
    Pickup: '🛻',
    Hatchback: '🚘',
    Deportivo: '🏎️',
  };
  return icons[category] || '🚗';
};

const updateStats = () => {
  stats.value.total = listings.value.length;
  stats.value.active = listings.value.filter((l) => ['active', 'published', 'approved'].includes(l.status)).length;
  stats.value.pending = listings.value.filter((l) => ['pending', 'draft'].includes(l.status)).length;
  stats.value.sold = listings.value.filter((l) => l.status === 'sold').length;
};

const setStatusFilter = (status) => {
  statusFilter.value = status;
  currentPage.value = 1;
};

const clearFilters = () => {
  searchTerm.value = '';
  statusFilter.value = 'all';
  categoryFilter.value = 'all';
  sortBy.value = 'date_desc';
  currentPage.value = 1;
};

const openListingModal = (action, listing = null) => {
  isEditing.value = action === 'edit';
  if (listing) {
    listingForm.value = {
      id: listing.id,
      title: listing.title,
      brand: listing.brand,
      model: listing.model,
      year: listing.year,
      price: listing.price,
      category: listing.category,
      transmission: listing.transmission,
      fuel: listing.fuel,
      mileageKm: listing.mileageKm || '',
      cityName: listing.cityName || '',
      color: listing.color || '',
      status: listing.status,
      description: listing.description || '',
      featuresInput: (listing.features || []).join(', '),
    };
  } else {
    listingForm.value = {
      title: '',
      brand: '',
      model: '',
      year: '',
      price: '',
      category: 'SUV',
      transmission: 'Automática',
      fuel: 'Gasolina',
      mileageKm: '',
      cityName: '',
      color: '',
      status: 'pending',
      description: '',
      featuresInput: '',
    };
  }
  showListingModal.value = true;
};

const closeListingModal = () => {
  showListingModal.value = false;
  selectedListing.value = null;
};

const saveListing = async () => {
  if (
    !listingForm.value.title ||
    !listingForm.value.brand ||
    !listingForm.value.model ||
    !listingForm.value.year ||
    !listingForm.value.price
  ) {
    alert('Por favor completa los campos requeridos');
    return;
  }

  const features = listingForm.value.featuresInput
    .split(',')
    .map((f) => f.trim())
    .filter((f) => f);

  await saveAdminListing({
    id: listingForm.value.id,
    title: listingForm.value.title,
    brand: listingForm.value.brand,
    model: listingForm.value.model,
    year: parseInt(listingForm.value.year),
    price: parseInt(listingForm.value.price),
    type: 'venta',
    category: listingForm.value.category,
    transmission: listingForm.value.transmission,
    fuel: listingForm.value.fuel,
    mileageKm: listingForm.value.mileageKm
      ? parseInt(listingForm.value.mileageKm)
      : null,
    cityName: listingForm.value.cityName,
    color: listingForm.value.color,
    status: listingForm.value.status,
    description: listingForm.value.description,
    features,
  });

  closeListingModal();
  await loadListings();
};

const viewListing = (listing) => {
  selectedListing.value = listing;
  showDetailsModal.value = true;
};

const closeDetailsModal = () => {
  showDetailsModal.value = false;
  selectedListing.value = null;
};

const deleteListing = (listing) => {
  selectedListing.value = listing;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  if (selectedListing.value) {
    await deleteAdminListing(selectedListing.value.id);
  }
  showDeleteModal.value = false;
  selectedListing.value = null;
  await loadListings();
};

// Initialize
onMounted(async () => {
  await loadListings();
});
</script>

<style scoped src="./styles.css"></style>
