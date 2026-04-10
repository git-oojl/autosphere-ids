<template>
  <div class="moderation-page">
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
            <h1 class="page-title">Moderación de Contenido</h1>
            <p class="page-subtitle">
              Revisa y modera anuncios, comentarios y contenido publicado
            </p>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn-secondary" @click="refreshListings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                stroke="currentColor"
                stroke-width="2"
              />
              <path d="M12 8V12L15 15" stroke="currentColor" stroke-width="2" />
            </svg>
            Actualizar
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card" @click="setTab('pending')">
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
      <div class="stat-card" @click="setTab('approved')">
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
          <span class="stat-number">{{ stats.approved }}</span>
          <span class="stat-title">Aprobados</span>
        </div>
      </div>
      <div class="stat-card" @click="setTab('rejected')">
        <div class="stat-icon red">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ stats.rejected }}</span>
          <span class="stat-title">Rechazados</span>
        </div>
      </div>
      <div class="stat-card" @click="setTab('all')">
        <div class="stat-icon blue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 6H20V18H4V6Z" stroke="currentColor" stroke-width="2" />
            <path d="M8 10H16" stroke="currentColor" stroke-width="2" />
            <path d="M8 14H13" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ stats.total }}</span>
          <span class="stat-title">Total Anuncios</span>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs-container">
      <div class="tabs">
        <button
          :class="['tab', { active: currentTab === 'pending' }]"
          @click="setTab('pending')"
        >
          <span class="tab-icon">⏳</span>
          Pendientes
          <span v-if="stats.pending > 0" class="tab-count">{{
            stats.pending
          }}</span>
        </button>
        <button
          :class="['tab', { active: currentTab === 'approved' }]"
          @click="setTab('approved')"
        >
          <span class="tab-icon">✅</span>
          Aprobados
        </button>
        <button
          :class="['tab', { active: currentTab === 'rejected' }]"
          @click="setTab('rejected')"
        >
          <span class="tab-icon">❌</span>
          Rechazados
        </button>
        <button
          :class="['tab', { active: currentTab === 'all' }]"
          @click="setTab('all')"
        >
          <span class="tab-icon">📋</span>
          Todos
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
            placeholder="Buscar por título, vendedor o ID..."
          />
        </div>
        <select v-model="typeFilter" class="filter-select">
          <option value="all">Todos los tipos</option>
          <option value="vehiculo">Vehículos</option>
          <option value="renta">Renta</option>
        </select>
        <select v-model="sortBy" class="filter-select">
          <option value="date_desc">Más recientes primero</option>
          <option value="date_asc">Más antiguos primero</option>
          <option value="price_desc">Mayor precio</option>
          <option value="price_asc">Menor precio</option>
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

    <!-- Listings Grid -->
    <div class="listings-container">
      <div class="listings-grid">
        <div
          v-for="listing in paginatedListings"
          :key="listing.id"
          class="moderation-card"
        >
          <div class="card-badge" :class="listing.status">
            {{ getStatusText(listing.status) }}
          </div>
          <div class="card-image">
            <div class="image-placeholder">{{ listing.imageIcon }}</div>
          </div>
          <div class="card-content">
            <h3 class="listing-title">{{ listing.title }}</h3>
            <div class="listing-price">${{ formatPrice(listing.price) }}</div>
            <div class="listing-details">
              <div class="detail-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M5 20V19C5 15.1 8.1 12 12 12C15.9 12 19 15.1 19 19V20"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                <span>{{ listing.seller }}</span>
              </div>
              <div class="detail-item">
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
                <span>{{ formatDate(listing.createdAt) }}</span>
              </div>
              <div class="detail-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
                <span>{{ listing.views }} vistas</span>
              </div>
            </div>
            <div class="listing-specs">
              <span class="spec">{{ listing.year }}</span>
              <span class="spec"
                >{{ listing.mileage?.toLocaleString() || 'Nuevo' }} km</span
              >
              <span class="spec">{{
                listing.transmission || 'Automático'
              }}</span>
            </div>
            <div v-if="listing.status === 'pending'" class="card-actions">
              <button class="btn-approve" @click="approveListing(listing)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                Aprobar
              </button>
              <button class="btn-reject" @click="openRejectModal(listing)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                Rechazar
              </button>
              <button class="btn-view" @click="viewDetails(listing)">
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
                Ver detalles
              </button>
            </div>
            <div v-else class="card-actions">
              <button class="btn-view" @click="viewDetails(listing)">
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
                Ver detalles
              </button>
              <button class="btn-delete" @click="deleteListing(listing)">
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
        <div v-if="filteredListings.length === 0" class="empty-state">
          <div class="empty-icon">📭</div>
          <p>No hay anuncios que coincidan con los filtros</p>
          <button class="btn-primary-small" @click="clearFilters">
            Limpiar filtros
          </button>
        </div>
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

    <!-- Reject Modal -->
    <div
      v-if="showRejectModal"
      class="modal-overlay"
      @click.self="closeRejectModal"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h2>Rechazar Anuncio</h2>
          <button class="modal-close" @click="closeRejectModal">×</button>
        </div>
        <div class="modal-body">
          <div class="reject-preview">
            <p>Rechazando anuncio:</p>
            <strong>{{ selectedListing?.title }}</strong>
          </div>
          <div class="form-group">
            <label>Motivo del rechazo</label>
            <select v-model="rejectForm.reason" class="form-input">
              <option value="">Seleccionar motivo</option>
              <option value="Fotos de baja calidad">
                Fotos de baja calidad
              </option>
              <option value="Información incompleta">
                Información incompleta
              </option>
              <option value="Precio no realista">Precio no realista</option>
              <option value="Contenido inapropiado">
                Contenido inapropiado
              </option>
              <option value="Anuncio duplicado">Anuncio duplicado</option>
              <option value="Vehículo no verificado">
                Vehículo no verificado
              </option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div class="form-group">
            <label>Comentarios adicionales (opcional)</label>
            <textarea
              v-model="rejectForm.comments"
              class="form-input"
              rows="4"
              placeholder="Explica al vendedor por qué su anuncio fue rechazado..."
            ></textarea>
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" @click="closeRejectModal">
              Cancelar
            </button>
            <button class="btn-danger" @click="confirmReject">
              Rechazar anuncio
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
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
          <div class="details-grid">
            <div class="details-section">
              <div class="detail-card">
                <div class="detail-label">Vehículo</div>
                <div class="detail-value">{{ selectedListing.title }}</div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Precio</div>
                <div class="detail-value price">
                  ${{ formatPrice(selectedListing.price) }}
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Vendedor</div>
                <div class="detail-value">{{ selectedListing.seller }}</div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Email contacto</div>
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
            <div class="details-section">
              <div class="detail-card">
                <div class="detail-label">Año</div>
                <div class="detail-value">{{ selectedListing.year }}</div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Kilometraje</div>
                <div class="detail-value">
                  {{ selectedListing.mileage?.toLocaleString() || 'Nuevo' }} km
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Transmisión</div>
                <div class="detail-value">
                  {{ selectedListing.transmission || 'Automático' }}
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Combustible</div>
                <div class="detail-value">
                  {{ selectedListing.fuel || 'Gasolina' }}
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Color</div>
                <div class="detail-value">
                  {{ selectedListing.color || 'No especificado' }}
                </div>
              </div>
            </div>
            <div class="details-section full-width">
              <div class="detail-card">
                <div class="detail-label">Descripción</div>
                <div class="detail-value description">
                  {{ selectedListing.description }}
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-label">Características</div>
                <div class="detail-value features">
                  <span
                    v-for="feature in selectedListing.features"
                    :key="feature"
                    class="feature-tag"
                  >
                    {{ feature }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="selectedListing.status === 'pending'"
            class="modal-actions"
          >
            <button
              class="btn-approve"
              @click="
                approveListing(selectedListing);
                closeDetailsModal();
              "
            >
              Aprobar anuncio
            </button>
            <button
              class="btn-danger"
              @click="
                openRejectModal(selectedListing);
                closeDetailsModal();
              "
            >
              Rechazar anuncio
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

const router = useRouter();

// Stats
const stats = ref({
  pending: 0,
  approved: 0,
  rejected: 0,
  total: 0,
});

// Current tab
const currentTab = ref('pending');

// Filters
const searchTerm = ref('');
const typeFilter = ref('all');
const sortBy = ref('date_desc');
const currentPage = ref(1);
const itemsPerPage = 9;

// Listings data
const listings = ref([
  {
    id: 1,
    title: 'Porsche 911 Carrera 2022',
    price: 2850000,
    seller: 'Carlos Méndez',
    sellerEmail: 'carlos.mendez@email.com',
    sellerPhone: '55 1234 5678',
    year: 2022,
    mileage: 8500,
    transmission: 'Automático',
    fuel: 'Gasolina',
    color: 'Rojo',
    description:
      'Porsche 911 Carrera en excelentes condiciones, único dueño, servicio completo en agencia. Incluye techo solar, asientos de piel, sistema de sonido Bose.',
    features: [
      'Aire acondicionado',
      'Vidrios eléctricos',
      'Cámara reversa',
      'Sensores de estacionamiento',
      'Asientos de piel',
      'Techo solar',
    ],
    views: 245,
    imageIcon: '🏎️',
    status: 'pending',
    type: 'vehiculo',
    createdAt: '2024-03-20T10:30:00',
  },
  {
    id: 2,
    title: 'BMW X5 M Competition 2023',
    price: 1980000,
    seller: 'Ana Ramírez',
    sellerEmail: 'ana.ramirez@email.com',
    sellerPhone: '55 8765 4321',
    year: 2023,
    mileage: 3200,
    transmission: 'Automático',
    fuel: 'Gasolina',
    color: 'Negro',
    description:
      'BMW X5 M Competition, equipamiento completo, garantía extendida, factura original.',
    features: [
      'Aire acondicionado',
      'Vidrios eléctricos',
      'Cámara 360°',
      'Asientos calefactables',
      'Apple CarPlay',
      'Techo panorámico',
    ],
    views: 189,
    imageIcon: '🚙',
    status: 'pending',
    type: 'vehiculo',
    createdAt: '2024-03-19T15:20:00',
  },
  {
    id: 3,
    title: 'Mercedes-Benz Clase S 2024',
    price: 3250000,
    seller: 'Luis Fernández',
    sellerEmail: 'luis.fernandez@email.com',
    sellerPhone: '55 1122 3344',
    year: 2024,
    mileage: 500,
    transmission: 'Automático',
    fuel: 'Híbrido',
    color: 'Blanco',
    description:
      'Mercedes-Benz Clase S 2024, el último modelo, tecnología de punta, asientos de masaje, sistema de iluminación ambiental.',
    features: [
      'Aire acondicionado',
      'Vidrios eléctricos',
      'Asientos de masaje',
      'Sistema de sonido Burmester',
      'Asistente de manejo',
      'Iluminación ambiental',
    ],
    views: 312,
    imageIcon: '🚗',
    status: 'pending',
    type: 'vehiculo',
    createdAt: '2024-03-18T09:15:00',
  },
  {
    id: 4,
    title: 'Audi RS7 Sportback 2022',
    price: 2150000,
    seller: 'Mario González',
    sellerEmail: 'mario.gonzalez@email.com',
    sellerPhone: '55 9988 7766',
    year: 2022,
    mileage: 15000,
    transmission: 'Automático',
    fuel: 'Gasolina',
    color: 'Gris',
    description:
      'Audi RS7 en perfecto estado, motor V8 biturbo, tracción quattro, interior en cuero.',
    features: [
      'Aire acondicionado',
      'Vidrios eléctricos',
      'Quattro',
      'Sistema de sonido premium',
      'Asientos deportivos',
      'Techo solar',
    ],
    views: 167,
    imageIcon: '🏎️',
    status: 'approved',
    type: 'vehiculo',
    createdAt: '2024-03-15T11:00:00',
  },
  {
    id: 5,
    title: 'Tesla Model S Plaid',
    price: 2350000,
    seller: 'Sofía Ramírez',
    sellerEmail: 'sofia.ramirez@email.com',
    sellerPhone: '55 4433 2211',
    year: 2023,
    mileage: 8000,
    transmission: 'Automático',
    fuel: 'Eléctrico',
    color: 'Azul',
    description:
      'Tesla Model S Plaid, autonomía de 600km, aceleración 0-100 en 2.1 segundos, autopilot incluido.',
    features: [
      'Aire acondicionado',
      'Vidrios eléctricos',
      'Autopilot',
      'Pantalla 17"',
      'Carga rápida',
      'Sonido premium',
    ],
    views: 423,
    imageIcon: '🔋',
    status: 'rejected',
    type: 'vehiculo',
    createdAt: '2024-03-14T14:30:00',
  },
  {
    id: 6,
    title: 'Chevrolet Silverado 2023 (Renta)',
    price: 35000,
    seller: 'Roberto Gómez',
    sellerEmail: 'roberto.gomez@email.com',
    sellerPhone: '55 6677 8899',
    year: 2023,
    mileage: 25000,
    transmission: 'Automático',
    fuel: 'Gasolina',
    color: 'Negro',
    description:
      'Camioneta Chevrolet Silverado disponible para renta mensual. Ideal para trabajo o familia.',
    features: [
      'Aire acondicionado',
      'Vidrios eléctricos',
      'Cámara reversa',
      'Caja de carga',
      'Remolque',
    ],
    views: 98,
    imageIcon: '🚛',
    status: 'pending',
    type: 'renta',
    createdAt: '2024-03-20T08:00:00',
  },
]);

// Computed
const filteredListings = computed(() => {
  let filtered = [...listings.value];

  // Filter by tab
  if (currentTab.value !== 'all') {
    filtered = filtered.filter((l) => l.status === currentTab.value);
  }

  // Filter by search term
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    filtered = filtered.filter(
      (l) =>
        l.title.toLowerCase().includes(term) ||
        l.seller.toLowerCase().includes(term) ||
        l.id.toString().includes(term)
    );
  }

  // Filter by type
  if (typeFilter.value !== 'all') {
    filtered = filtered.filter((l) => l.type === typeFilter.value);
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

// Modal states
const showRejectModal = ref(false);
const showDetailsModal = ref(false);
const showDeleteModal = ref(false);
const selectedListing = ref(null);
const rejectForm = ref({
  reason: '',
  comments: '',
});

// Methods
const goBack = () => {
  router.push('/admin');
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-MX').format(price);
};

const formatDate = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diff = now - d;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Hoy';
  if (days === 1) return 'Ayer';
  if (days < 7) return `Hace ${days} días`;
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
};

const getStatusText = (status) => {
  const statuses = {
    pending: 'Pendiente',
    approved: 'Aprobado',
    rejected: 'Rechazado',
  };
  return statuses[status] || status;
};

const updateStats = () => {
  stats.value.pending = listings.value.filter(
    (l) => l.status === 'pending'
  ).length;
  stats.value.approved = listings.value.filter(
    (l) => l.status === 'approved'
  ).length;
  stats.value.rejected = listings.value.filter(
    (l) => l.status === 'rejected'
  ).length;
  stats.value.total = listings.value.length;
};

const setTab = (tab) => {
  currentTab.value = tab;
  currentPage.value = 1;
};

const clearFilters = () => {
  searchTerm.value = '';
  typeFilter.value = 'all';
  sortBy.value = 'date_desc';
  currentPage.value = 1;
};

const refreshListings = () => {
  updateStats();
  alert('Lista de anuncios actualizada');
};

const approveListing = (listing) => {
  const index = listings.value.findIndex((l) => l.id === listing.id);
  if (index !== -1) {
    listings.value[index].status = 'approved';
    alert(`Anuncio "${listing.title}" aprobado correctamente`);
    updateStats();
  }
};

const openRejectModal = (listing) => {
  selectedListing.value = listing;
  rejectForm.value = { reason: '', comments: '' };
  showRejectModal.value = true;
};

const closeRejectModal = () => {
  showRejectModal.value = false;
  selectedListing.value = null;
};

const confirmReject = () => {
  if (selectedListing.value) {
    const index = listings.value.findIndex(
      (l) => l.id === selectedListing.value.id
    );
    if (index !== -1) {
      listings.value[index].status = 'rejected';
      const message = `Anuncio "${selectedListing.value.title}" rechazado.\nMotivo: ${rejectForm.value.reason || 'No especificado'}`;
      alert(message);
    }
  }
  closeRejectModal();
  updateStats();
};

const viewDetails = (listing) => {
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

const confirmDelete = () => {
  if (selectedListing.value) {
    const index = listings.value.findIndex(
      (l) => l.id === selectedListing.value.id
    );
    if (index !== -1) {
      listings.value.splice(index, 1);
      alert(`Anuncio "${selectedListing.value.title}" eliminado`);
    }
  }
  showDeleteModal.value = false;
  selectedListing.value = null;
  updateStats();
};

// Initialize
onMounted(() => {
  updateStats();
});
</script>

<style scoped src="./styles.css"></style>
