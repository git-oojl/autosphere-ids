<template>
  <div class="my-listings-page">
    <br /><br /><br /><br /><br />

    <div class="content-wrapper">
      <div class="content-container">
        <div class="page-header">
          <div class="header-info">
            <h1 class="page-title">Mis Anuncios</h1>
            <p class="page-subtitle">{{ totalListings }} publicados</p>
          </div>
          <button class="btn-create" type="button" @click="createNewListing">
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

        <div class="tabs-container">
          <div class="tabs" role="tablist" aria-label="Tipo de publicación">
            <button
              :class="['tab', { active: listingType === 'sale' }]"
              type="button"
              role="tab"
              :aria-selected="listingType === 'sale'"
              @click="switchListingType('sale')"
            >
              Venta
              <span class="tab-count">{{ saleCount }}</span>
            </button>
            <button
              :class="['tab', { active: listingType === 'rental' }]"
              type="button"
              role="tab"
              :aria-selected="listingType === 'rental'"
              @click="switchListingType('rental')"
            >
              Renta
              <span class="tab-count">{{ rentalCount }}</span>
            </button>
          </div>
        </div>

        <div class="toolbar">
          <div class="toolbar-left">
            <div ref="filterDropdownRef" class="filter-dropdown">
              <button
                class="filter-btn"
                type="button"
                :aria-expanded="showFilterDropdown"
                @click="toggleFilterDropdown"
              >
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
                <button type="button" @click="filterBy('all')">Todos</button>
                <button type="button" @click="filterBy('published')">Activos</button>
                <button type="button" @click="filterBy('draft')">Borradores</button>
                <button type="button" @click="filterBy('archived')">Archivados</button>
                <button
                  v-if="listingType === 'sale'"
                  type="button"
                  @click="filterBy('sold')"
                >
                  Vendidos
                </button>
                <button
                  v-if="listingType === 'rental'"
                  type="button"
                  @click="filterBy('unavailable')"
                >
                  No disponibles
                </button>
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
                @keyup.enter="applySearch"
              />
              <button
                v-if="searchQuery"
                class="clear-search"
                type="button"
                @click="clearSearch"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <div v-if="isLoading" class="loading-state">
          Cargando publicaciones...
        </div>

        <template v-else>
          <div class="listings-grid">
            <div
              v-for="listing in listings"
              :key="listing.id"
              class="listing-card"
            >
              <div class="listing-left">
                <div class="vehicle-icon" @click="viewAsPublic(listing.id)">
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
                    <span class="brand-model">{{ listing.brand }} {{ listing.model }}</span>
                    <span class="separator">•</span>
                    <span class="year">{{ listing.year }}</span>
                  </div>
                  <div v-if="listingType === 'sale'" class="vehicle-price">
                    ${{ formatPrice(listing.price) }}
                  </div>
                  <div v-else class="vehicle-price rental-price">
                    ${{ formatPrice(listing.pricePerDay) }}/día
                    <span class="price-period">
                      | ${{ formatPrice(listing.pricePerWeek) }}/sem | ${{ formatPrice(listing.pricePerMonth) }}/mes
                    </span>
                  </div>
                </div>
              </div>

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
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2" />
                      <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" />
                    </svg>
                    {{ listing.cityLabel || 'Ubicación por confirmar' }}
                  </div>
                  <div class="metric-item">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" />
                      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2" />
                    </svg>
                    {{ listing.modeLabel }}
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
                    {{
                      listing.mileageKm?.toLocaleString() ||
                      listing.kmIncludedPerDay ||
                      'Nuevo'
                    }}
                    {{
                      listing.mileageKm
                        ? 'km'
                        : listing.kmIncludedPerDay
                          ? 'km/día'
                          : ''
                    }}
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
                    {{ listing.fuel || 'Gasolina' }}
                  </span>
                </div>

                <div v-if="listingType === 'rental'" class="availability-info">
                  <span
                    :class="[
                      'availability-badge',
                      listing.available ? 'available' : 'unavailable',
                    ]"
                  >
                    {{ listing.available ? 'Disponible' : 'No disponible' }}
                  </span>
                  <span
                    v-if="listing.availableFrom && listing.availableTo"
                    class="availability-dates"
                  >
                    {{ formatDate(listing.availableFrom) }} -
                    {{ formatDate(listing.availableTo) }}
                  </span>
                </div>
              </div>

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
                  {{ listing.cityLabel || 'Ubicación por confirmar' }}
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

              <div class="listing-actions">
                <button class="action-btn btn-edit" type="button" @click="openEditModal(listing.id)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17 3L21 7L7 21H3V17L17 3Z"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                  Editar
                </button>
                <button class="action-btn btn-view" type="button" @click="openViewDetail(listing.id)">
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
                <button class="action-btn btn-delete" type="button" @click="deleteListing(listing.id)">
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

          <div v-if="totalPages > 1" class="pagination">
            <button
              class="page-btn"
              type="button"
              :disabled="currentPage === 1"
              @click="prevPage"
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
                type="button"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
            </div>
            <button
              class="page-btn"
              type="button"
              :disabled="currentPage === totalPages"
              @click="nextPage"
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

          <div v-if="listings.length === 0" class="empty-state">
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
            <p>
              {{
                listingType === 'sale'
                  ? 'Intenta con otros filtros o crea un anuncio de venta.'
                  : 'Intenta con otros filtros o crea un anuncio de renta.'
              }}
            </p>
            <button class="btn-create-empty" type="button" @click="createNewListing">
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
              Crear anuncio
            </button>
          </div>
        </template>
      </div>
    </div>

    <div v-if="isEditModalOpen" class="modal-overlay" @click.self="closeEditModal">
      <div class="edit-modal">
        <div class="modal-header">
          <div>
            <p class="modal-eyebrow">Editar publicación</p>
            <h3>{{ editDraft.title || selectedListing?.title }}</h3>
          </div>
          <button type="button" class="modal-close" @click="closeEditModal">×</button>
        </div>

        <form class="modal-form" @submit.prevent="submitEdit">
          <div class="modal-grid">
            <label class="field">
              <span>Título</span>
              <input v-model="editDraft.title" type="text" required />
            </label>
            <label class="field">
              <span>Estado</span>
              <select v-model="editDraft.status">
                <option v-for="option in availableStatuses" :key="option.value" :value="option.value">{{ option.label }}</option>
              </select>
            </label>
            <label class="field">
              <span>Ciudad</span>
              <input v-model="editDraft.cityLabel" type="text" />
            </label>
            <label v-if="selectedListing?.mode === 'sale'" class="field">
              <span>Precio</span>
              <input v-model.number="editDraft.price" type="number" min="0" step="1000" />
            </label>
            <template v-else>
              <label class="field">
                <span>Tarifa diaria</span>
                <input v-model.number="editDraft.pricePerDay" type="number" min="0" step="100" />
              </label>
              <label class="field">
                <span>Tarifa semanal</span>
                <input v-model.number="editDraft.pricePerWeek" type="number" min="0" step="100" />
              </label>
              <label class="field">
                <span>Tarifa mensual</span>
                <input v-model.number="editDraft.pricePerMonth" type="number" min="0" step="100" />
              </label>
            </template>
          </div>

          <label class="field field-full">
            <span>Descripción</span>
            <textarea v-model="editDraft.description" rows="4"></textarea>
          </label>

          <div class="modal-actions">
            <button type="button" class="action-btn btn-view modal-secondary" @click="closeEditModal">Cancelar</button>
            <button type="submit" class="action-btn btn-edit">Guardar cambios</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showToast" class="toast-notification" :class="toastType">
      <span>{{ toastMessage }}</span>
      <button class="toast-close" type="button" @click="showToast = false">×</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getListingById, getListings } from '../../../services/catalog.js';
import { updateListing as updateSellerListing } from '../../../services/seller.js';
import {
  DEMO_RENTAL_OWNER_ID,
  DEMO_SALE_OWNER_ID,
} from '../../../services/demoOwners.js';

const router = useRouter();
const route = useRoute();

const FILTER_OPTIONS = {
  sale: ['all', 'published', 'draft', 'archived', 'sold'],
  rental: ['all', 'published', 'draft', 'archived', 'unavailable'],
};

const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('success');
const filterDropdownRef = ref(null);
const showFilterDropdown = ref(false);
const listingType = ref('sale');
const searchQuery = ref('');
const selectedFilter = ref('all');
const currentPage = ref(1);
const itemsPerPage = ref(6);
const isLoading = ref(false);
const listings = ref([]);
const totalListings = ref(0);
const saleCount = ref(0);
const rentalCount = ref(0);
const selectedListing = ref(null);
const isEditModalOpen = ref(false);
const editDraft = ref(createEmptyDraft());
let searchTimer = null;

const normalizeListingType = (value) => (value === 'rental' ? 'rental' : 'sale');
const normalizeFilter = (mode, value) =>
  FILTER_OPTIONS[mode].includes(value) ? value : 'all';
const resolveOwnerId = (mode) =>
  mode === 'rental' ? DEMO_RENTAL_OWNER_ID : DEMO_SALE_OWNER_ID;

function createEmptyDraft() {
  return {
    id: '',
    title: '',
    status: 'published',
    cityLabel: '',
    description: '',
    price: 0,
    pricePerDay: 0,
    pricePerWeek: 0,
    pricePerMonth: 0,
  };
}

const buildEditDraft = (listing) => ({
  id: listing.id,
  title: listing.title || '',
  status: listing.status || 'published',
  cityLabel: listing.cityLabel || '',
  description: listing.description || '',
  price: listing.price || 0,
  pricePerDay: listing.pricePerDay || 0,
  pricePerWeek: listing.pricePerWeek || 0,
  pricePerMonth: listing.pricePerMonth || 0,
});

const availableStatuses = computed(() => {
  const optionsByMode = {
    sale: [
      { value: 'published', label: 'Activa' },
      { value: 'draft', label: 'Borrador' },
      { value: 'archived', label: 'Archivada' },
      { value: 'sold', label: 'Vendida' },
    ],
    rental: [
      { value: 'published', label: 'Activa' },
      { value: 'draft', label: 'Borrador' },
      { value: 'archived', label: 'Archivada' },
      { value: 'unavailable', label: 'No disponible' },
    ],
  };

  return optionsByMode[listingType.value] || optionsByMode.sale;
});

const getStatusText = (status) =>
  ({
    published: 'Activo',
    draft: 'Borrador',
    archived: 'Archivado',
    sold: 'Vendido',
    unavailable: 'No disponible',
  })[status] || status;

const getStatusClass = (status) =>
  ({
    published: 'active',
    draft: 'draft',
    archived: 'archived',
    sold: 'sold',
    unavailable: 'unavailable',
  })[status] || status;

const getFilterLabel = (filter) =>
  ({
    all: 'Todos',
    published: 'Activos',
    draft: 'Borradores',
    archived: 'Archivados',
    sold: 'Vendidos',
    unavailable: 'No disponibles',
  })[filter] || filter;

const getVehicleIcon = (type) =>
  ({
    SUV: '🚙',
    Sedán: '🚗',
    Pickup: '🛻',
    Hatchback: '🚘',
    Deportivo: '🏎️',
  })[type] || '🚗';

const formatPrice = (price) => new Intl.NumberFormat('es-MX').format(price || 0);
const formatDate = (date) => {
  if (!date) return '—';
  const parsed = new Date(date);
  return parsed.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const visiblePages = computed(() => {
  const maxVisible = 5;
  const pages = [];
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let page = start; page <= end; page += 1) pages.push(page);
  return pages;
});

const totalPages = computed(() => Math.max(1, Math.ceil(totalListings.value / itemsPerPage.value)));

const showNotification = (message, type = 'success') => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  window.clearTimeout(showNotification.timer);
  showNotification.timer = window.setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const enrichListing = (item, mode) => ({
  ...item,
  modeLabel: mode === 'sale' ? 'Venta' : 'Renta',
  cityLabel: item.cityLabel || item.location?.city || 'Ubicación por confirmar',
  listingType: mode,
});

const syncStateFromRoute = () => {
  const mode = normalizeListingType(route.query.mode);
  listingType.value = mode;
  selectedFilter.value = normalizeFilter(mode, route.query.status || 'all');
  searchQuery.value = String(route.query.q || '');
  currentPage.value = Math.max(1, Number.parseInt(route.query.page || '1', 10) || 1);
};

const updateRoute = (partial = {}) => {
  const nextQuery = {
    ...route.query,
    ...partial,
  };

  if (!nextQuery.mode || nextQuery.mode === 'sale') delete nextQuery.mode;
  if (!nextQuery.status || nextQuery.status === 'all') delete nextQuery.status;
  if (!nextQuery.q) delete nextQuery.q;
  if (!nextQuery.page || Number(nextQuery.page) <= 1) delete nextQuery.page;

  router.replace({ query: nextQuery });
};

const loadCounts = async () => {
  const [saleResponse, rentalResponse] = await Promise.all([
    getListings({
      mode: 'venta',
      sellerId: DEMO_SALE_OWNER_ID,
      pageSize: 100,
      includeUnpublished: true,
    }),
    getListings({
      mode: 'renta',
      sellerId: DEMO_RENTAL_OWNER_ID,
      pageSize: 100,
      includeUnpublished: true,
    }),
  ]);

  saleCount.value = saleResponse?.meta?.total ?? saleResponse?.items?.length ?? 0;
  rentalCount.value = rentalResponse?.meta?.total ?? rentalResponse?.items?.length ?? 0;
};

const loadListings = async () => {
  isLoading.value = true;

  try {
    const response = await getListings({
      mode: listingType.value === 'sale' ? 'venta' : 'renta',
      sellerId: resolveOwnerId(listingType.value),
      status: selectedFilter.value === 'all' ? undefined : selectedFilter.value,
      q: searchQuery.value.trim() || undefined,
      page: currentPage.value,
      pageSize: itemsPerPage.value,
      includeUnpublished: true,
      sort: 'newest',
    });

    listings.value = (response?.items || []).map((item) => enrichListing(item, listingType.value));
    totalListings.value = response?.meta?.total ?? listings.value.length;
  } finally {
    isLoading.value = false;
  }
};

const switchListingType = (type) => {
  showFilterDropdown.value = false;
  updateRoute({
    mode: type,
    status: 'all',
    q: '',
    page: 1,
  });
};

const toggleFilterDropdown = () => {
  showFilterDropdown.value = !showFilterDropdown.value;
};

const filterBy = (filter) => {
  showFilterDropdown.value = false;
  updateRoute({ status: filter, page: 1 });
};

const applySearch = () => {
  window.clearTimeout(searchTimer);
  updateRoute({ q: searchQuery.value.trim(), page: 1 });
};

const clearSearch = () => {
  searchQuery.value = '';
  applySearch();
};

const goToPage = (page) => {
  updateRoute({ page });
};

const prevPage = () => {
  if (currentPage.value > 1) {
    updateRoute({ page: currentPage.value - 1 });
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    updateRoute({ page: currentPage.value + 1 });
  }
};

const createNewListing = () => router.push({ name: 'create-listing' });

const openViewDetail = (id) => {
  router.push({ name: 'seller-listing-detail', params: { id } });
};

const hydrateSelectedListing = async (id) => {
  const fromList = listings.value.find((listing) => listing.id === id);
  if (fromList) return fromList;
  return getListingById(id);
};

const openEditModal = async (id) => {
  const listing = await hydrateSelectedListing(id);
  if (!listing) {
    showNotification('No se pudo abrir esta publicación para edición.', 'error');
    return;
  }

  selectedListing.value = listing;
  editDraft.value = buildEditDraft(listing);
  isEditModalOpen.value = true;
  const nextQuery = { ...route.query, edit: id, mode: listing.mode === 'rental' ? 'rental' : 'sale' };
  router.replace({ query: nextQuery });
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  selectedListing.value = null;
  editDraft.value = createEmptyDraft();
  if (route.query.edit) {
    const nextQuery = { ...route.query };
    delete nextQuery.edit;
    router.replace({ query: nextQuery });
  }
};

const submitEdit = async () => {
  if (!selectedListing.value) return;

  const payload = {
    title: editDraft.value.title,
    status: editDraft.value.status,
    description: editDraft.value.description,
    cityLabel: editDraft.value.cityLabel,
    location: {
      ...(selectedListing.value.location || {}),
      city: editDraft.value.cityLabel,
    },
  };

  if (selectedListing.value.mode === 'rental') {
    payload.pricePerDay = Number(editDraft.value.pricePerDay || 0);
    payload.pricePerWeek = Number(editDraft.value.pricePerWeek || 0);
    payload.pricePerMonth = Number(editDraft.value.pricePerMonth || 0);
  } else {
    payload.price = Number(editDraft.value.price || 0);
  }

  const updated = await updateSellerListing(selectedListing.value.id, payload);
  const normalized = enrichListing({ ...selectedListing.value, ...updated, ...payload }, listingType.value);
  listings.value = listings.value.map((listing) =>
    listing.id === normalized.id ? normalized : listing
  );
  selectedListing.value = normalized;
  showNotification('Cambios guardados en esta sesión de demostración.', 'success');
  closeEditModal();
};

const viewAsPublic = (id) =>
  window.open(
    router.resolve({ name: 'public-listing-detail', params: { id } }).href,
    '_blank'
  );

const deleteListing = (id) => {
  listings.value = listings.value.filter((listing) => listing.id !== id);
  totalListings.value = Math.max(0, totalListings.value - 1);
  if (!listings.value.length && currentPage.value > 1) {
    updateRoute({ page: currentPage.value - 1 });
  }
  showNotification(
    'Publicación removida de esta vista. El archivado real quedará para backend.',
    'info'
  );
  loadCounts();
};

const handleClickOutside = (event) => {
  if (filterDropdownRef.value && !filterDropdownRef.value.contains(event.target)) {
    showFilterDropdown.value = false;
  }
};

watch(
  () => route.query,
  async () => {
    const previousEdit = selectedListing.value?.id || null;
    syncStateFromRoute();
    await Promise.all([loadCounts(), loadListings()]);

    const requestedEditId = String(route.query.edit || '');
    if (requestedEditId && requestedEditId !== previousEdit) {
      await openEditModal(requestedEditId);
    } else if (!requestedEditId && isEditModalOpen.value) {
      closeEditModal();
    }
  },
  { immediate: true }
);

watch(searchQuery, (value) => {
  if (value === String(route.query.q || '')) return;
  window.clearTimeout(searchTimer);
  searchTimer = window.setTimeout(() => {
    updateRoute({ q: value.trim(), page: 1 });
  }, 250);
});

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  window.clearTimeout(searchTimer);
  window.clearTimeout(showNotification.timer);
});
</script>

<style scoped src="./styles.css"></style>
