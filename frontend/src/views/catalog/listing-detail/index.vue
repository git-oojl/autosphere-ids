<template>
  <div v-if="vehicle" class="vehicle-detail-page">
    <!-- Modo Edición Banner -->
    <div v-if="isEditMode" class="edit-mode-banner">
      <br />
      <div class="edit-mode-content">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M17 3L21 7L7 21H3V17L17 3Z" />
        </svg>
        <span>Estás editando este anuncio</span>
        <div class="edit-mode-actions">
          <button class="btn-save" @click="saveChanges">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M20 6L9 17L4 12" />
            </svg>
            Guardar cambios
          </button>
          <button class="btn-cancel" @click="cancelEdit">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 6L6 18M6 6L18 18" />
            </svg>
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- HERO SECTION -->
    <br /><br /><br /><br />
    <div class="hero-section">
      <div class="hero-image-wrapper">
        <img
          :src="currentImage"
          :alt="`${vehicle.brand} ${vehicle.model} ${vehicle.year}`"
          class="hero-image"
        />
        <div class="hero-overlay"></div>

        <!-- Navigation Arrows -->
        <button class="arrow-btn arrow-left" @click="prevImage">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M15 18L9 12L15 6" />
          </svg>
        </button>
        <button class="arrow-btn arrow-right" @click="nextImage">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M9 18L15 12L9 6" />
          </svg>
        </button>

        <!-- Image Dots -->
        <div v-if="thumbnailImages.length > 1" class="image-dots">
          <span
            v-for="(_, i) in thumbnailImages"
            :key="i"
            class="dot"
            :class="{ active: currentImageIndex === i }"
            @click="selectImage(i)"
          ></span>
        </div>

        <!-- Hero Info -->
        <div class="hero-info">
          <div class="hero-badges">
            <div class="badge-primary">{{ vehicleBadge }}</div>
            <div class="badge-type">{{ vehicle.type }}</div>
            <div v-if="isRental" class="badge-rental">En Renta</div>
          </div>
          <div v-if="isEditMode" class="editable-title">
            <input
              v-model="editableVehicle.title"
              class="edit-title-input"
              placeholder="Título del anuncio"
            />
          </div>
          <h1 v-else class="hero-title">
            {{ vehicle.brand }}
            <span class="model-highlight">{{ vehicle.model }}</span>
          </h1>
          <p class="hero-year">Año {{ vehicle.year }}</p>
        </div>

        <!-- Favorite Button (oculto en modo edición) -->
        <button
          v-if="!isEditMode"
          class="fav-btn"
          :class="{ active: isFavorite }"
          @click="toggleFavorite"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M20.84 4.61C19.8 3.57 18.38 3 16.95 3c-1.43 0-2.85.57-3.89 1.61L12 5.67l-1.06-1.06C9.9 3.57 8.48 3 7.05 3 5.62 3 4.2 3.57 3.16 4.61 2.13 5.64 1.55 7.04 1.55 8.5s.58 2.86 1.61 3.89L12 21.23l8.84-8.84C21.88 11.36 22.45 9.96 22.45 8.5s-.57-2.86-1.61-3.89z"
              :fill="isFavorite ? '#3b82f6' : 'none'"
            />
          </svg>
        </button>
      </div>

      <!-- Thumbnails -->
      <div v-if="thumbnailImages.length > 1" class="thumbnails-row">
        <div
          v-for="(img, i) in thumbnailImages"
          :key="i"
          class="thumb"
          :class="{ active: currentImageIndex === i }"
          @click="selectImage(i)"
        >
          <img :src="getOptimizedThumbnailUrl(img)" :alt="`Vista ${i + 1}`" />
        </div>
      </div>
    </div>

    <!-- CONTENT AREA -->
    <div class="content-area">
      <!-- Price Card (diferenciado por tipo) -->
      <div
        class="price-card"
        :class="{ 'rental-price-card': isRental, 'edit-mode-card': isEditMode }"
      >
        <div class="price-header">
          <div>
            <p class="price-label">
              {{ isRental ? 'Precio por día' : 'Precio de venta' }}
            </p>
            <div v-if="isEditMode" class="edit-price">
              <input
                v-model="editableVehicle.price"
                type="number"
                class="edit-price-input"
              />
              <span class="price-currency">MXN</span>
            </div>
            <h2 v-else class="price-value">
              ${{
                formatPrice(
                  isRental ? vehicle.rentalSpecs?.pricePerDay : vehicle.price
                )
              }}
              <span class="price-currency">MXN</span>
            </h2>
            <p
              v-if="!isRental && monthlyPayment && !isEditMode"
              class="price-financing"
            >
              Desde ${{ formatPrice(monthlyPayment) }}/mes con financiamiento*
            </p>
            <div v-if="isRental && !isEditMode" class="rental-price-options">
              <span class="price-week"
                >${{ formatPrice(vehicle.rentalSpecs?.pricePerWeek) }}/sem</span
              >
              <span class="price-month"
                >${{
                  formatPrice(vehicle.rentalSpecs?.pricePerMonth)
                }}/mes</span
              >
            </div>
            <div
              v-if="isRental && !vehicle.rentalSpecs?.available"
              class="unavailable-badge"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Temporalmente no disponible
            </div>
          </div>
        </div>

        <!-- Quick Specs (editables) -->
        <div class="quick-specs">
          <div class="spec-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <div>
              <p class="spec-label">Kilometraje</p>
              <div v-if="isEditMode" class="edit-spec">
                <input
                  v-model="editableVehicle.mileageKm"
                  type="number"
                  class="edit-spec-input"
                />
                <span>km</span>
              </div>
              <p v-else class="spec-value">
                {{
                  formatNumber(vehicle.mileageKm || vehicle.specs?.kilometraje)
                }}
                km
              </p>
            </div>
          </div>
          <div class="spec-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M5 4h10v16H5V4z" />
              <path d="M15 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2" />
            </svg>
            <div>
              <p class="spec-label">Combustible</p>
              <div v-if="isEditMode" class="edit-spec">
                <select v-model="editableVehicle.fuel" class="edit-spec-select">
                  <option value="Gasolina">Gasolina</option>
                  <option value="Diésel">Diésel</option>
                  <option value="Híbrido">Híbrido</option>
                  <option value="Eléctrico">Eléctrico</option>
                </select>
              </div>
              <p v-else class="spec-value">
                {{ vehicle.fuel || vehicle.specs?.combustible }}
              </p>
            </div>
          </div>
          <div class="spec-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <path d="M9 9h.01M15 9h.01" />
            </svg>
            <div>
              <p class="spec-label">Transmisión</p>
              <div v-if="isEditMode" class="edit-spec">
                <select
                  v-model="editableVehicle.transmission"
                  class="edit-spec-select"
                >
                  <option value="Automática">Automática</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <p v-else class="spec-value">
                {{ vehicle.transmission || vehicle.specs?.transmisión }}
              </p>
            </div>
          </div>
        </div>

        <!-- CTA Buttons (diferenciados por modo) -->
        <div class="cta-buttons">
          <button
            v-if="!isEditMode"
            class="btn-secondary"
            @click="scheduleTestDrive"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {{ isRental ? 'Agendar Cita' : 'Agendar Cita' }}
          </button>
          <button v-if="!isEditMode" class="btn-primary" @click="contactSeller">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
              />
            </svg>
            {{ isRental ? 'Contactar Arrendador' : 'Contactar Vendedor' }}
          </button>
          <button v-if="isEditMode" class="btn-primary" @click="saveChanges">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M20 6L9 17L4 12" />
            </svg>
            Guardar cambios
          </button>
        </div>
      </div>

      <div class="info-callout-card" :class="{ 'rental-info-card': isRental }">
        <h3 class="section-title">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 8v8M8 12h8" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          {{ isRental ? 'Condiciones de renta' : 'Lo que debes saber' }}
        </h3>
        <div class="callout-grid">
          <div class="callout-item">
            <span class="callout-label">{{
              isRental ? 'Tarifa diaria' : 'Precio publicado'
            }}</span>
            <strong>
              ${{
                formatPrice(
                  isRental ? vehicle.rentalSpecs?.pricePerDay : vehicle.price
                )
              }}
              <span v-if="isRental">/día</span>
            </strong>
          </div>
          <div class="callout-item">
            <span class="callout-label">{{
              isRental ? 'Disponibilidad' : 'Mensualidad estimada'
            }}</span>
            <strong>
              {{
                isRental
                  ? vehicle.rentalSpecs?.available
                    ? 'Disponible'
                    : 'No disponible'
                  : monthlyPayment
                    ? `$${formatPrice(monthlyPayment)}/mes`
                    : 'Consulta planes'
              }}
            </strong>
          </div>
          <div class="callout-item">
            <span class="callout-label">{{
              isRental ? 'Tarifa semanal' : 'Ubicación'
            }}</span>
            <strong>
              {{
                isRental
                  ? `$${formatPrice(vehicle.rentalSpecs?.pricePerWeek)}/sem`
                  : vehicleLocation
              }}
            </strong>
          </div>
          <div class="callout-item">
            <span class="callout-label">{{
              isRental ? 'Tarifa mensual' : 'Condición'
            }}</span>
            <strong>
              {{
                isRental
                  ? `$${formatPrice(vehicle.rentalSpecs?.pricePerMonth)}/mes`
                  : vehicleBadge
              }}
            </strong>
          </div>
        </div>
      </div>

      <div class="details-panel open">
        <!-- Vehicle Info (editable) -->
        <div class="info-section">
          <h3 class="section-title">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
            Información del Vehículo
            <span v-if="isEditMode" class="edit-badge">Editando</span>
          </h3>
          <div class="info-grid">
            <div
              v-for="item in editableInfoItems"
              :key="item.label"
              class="info-item"
            >
              <p class="info-label">{{ item.label }}</p>
              <div v-if="isEditMode && item.editable" class="edit-info">
                <input
                  v-model="item.value"
                  class="edit-info-input"
                  :type="item.type || 'text'"
                />
              </div>
              <p v-else class="info-value">{{ item.value || '—' }}</p>
            </div>
          </div>
        </div>

        <!-- Description (editable) -->
        <div class="info-section">
          <h3 class="section-title">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M4 6h16M4 12h16M4 18h12" />
            </svg>
            Descripción
          </h3>
          <div v-if="isEditMode" class="edit-description">
            <textarea
              v-model="editableVehicle.description"
              class="edit-description-textarea"
              rows="6"
              placeholder="Describe el vehículo..."
            ></textarea>
          </div>
          <p v-else class="description-text">
            {{ vehicle.description || defaultDescription }}
          </p>
        </div>

        <!-- Features (editable) -->
        <div class="info-section">
          <h3 class="section-title">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Características
          </h3>
          <div v-if="isEditMode" class="edit-features">
            <div class="features-input-container">
              <div class="features-tags">
                <span
                  v-for="(feature, idx) in editableVehicle.features"
                  :key="idx"
                  class="feature-tag-editable"
                >
                  {{ feature }}
                  <button class="remove-feature" @click="removeFeature(idx)">
                    ×
                  </button>
                </span>
              </div>
              <div class="add-feature">
                <input
                  v-model="newFeature"
                  placeholder="Agregar característica..."
                  class="add-feature-input"
                  @keyup.enter="addFeature"
                />
                <button class="add-feature-btn" @click="addFeature">+</button>
              </div>
            </div>
          </div>
          <div v-if="vehicleFeatures.length" class="features-grid">
            <div
              v-for="feature in vehicleFeatures"
              :key="feature"
              class="feature-item"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ feature }}
            </div>
          </div>
          <p v-else class="empty-copy">
            Esta publicación todavía no muestra características visibles.
          </p>
        </div>

        <!-- Seller Info (solo lectura en modo edición) -->
        <div class="seller-card">
          <h3 class="section-title">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
              />
            </svg>
            {{ isRental ? 'Arrendador' : 'Vendedor' }}
          </h3>
          <div class="seller-content">
            <div class="seller-avatar">
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
            <div class="seller-info">
              <div class="seller-header">
                <h4>{{ sellerName }}</h4>
                <div v-if="sellerVerified" class="verified-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Verificado
                </div>
              </div>
              <div class="seller-rating">
                <template v-if="sellerRatingNumber">
                  <div class="stars">
                    <svg
                      v-for="i in 5"
                      :key="i"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      />
                    </svg>
                  </div>
                  <span
                    >{{ sellerRatingNumber }} • {{ sellerReviewSummary }}</span
                  >
                </template>
                <span v-else>{{ sellerReviewSummary }}</span>
              </div>
              <div class="seller-location">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                  />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {{ vehicleLocation }}
              </div>
              <div class="cta-buttons" style="margin-top: 1rem">
                <button class="btn-secondary" @click="openSellerProfile">
                  Ver perfil público
                </button>
                <button class="btn-primary" @click="openSellerInventory">
                  Ver otros anuncios
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Ubicación (editable) -->
        <div class="location-section info-section">
          <h3 class="section-title">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Ubicación
          </h3>
          <div class="location-content">
            <div class="location-address">
              <div v-if="isEditMode" class="edit-location">
                <input
                  v-model="editableVehicle.location.city"
                  class="edit-location-input"
                  placeholder="Ciudad"
                />
                <input
                  v-model="editableVehicle.location.state"
                  class="edit-location-input"
                  placeholder="Estado"
                />
                <input
                  v-model="editableVehicle.location.addressLabel"
                  class="edit-location-input full-width"
                  placeholder="Dirección completa"
                />
              </div>
              <div v-else>
                <p>
                  <strong>{{ vehicleLocation }}</strong>
                </p>
                <p class="address-detail">
                  {{ vehicle.location?.addressLabel || 'Sucursal principal' }}
                </p>
              </div>
              <a href="#" class="map-link" @click.prevent="openMaps"
                >Ver en Google Maps →</a
              >
            </div>
            <div class="map-embed-wrapper">
              <iframe
                :src="googleMapsEmbedUrl"
                class="map-embed"
                width="100%"
                height="300"
                style="border: 0"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Ubicación del vehículo"
              ></iframe>
            </div>
          </div>
        </div>

        <div
          v-if="!isEditMode && sellerReviews.length"
          class="reviews-section info-section"
        >
          <div class="section-header-inline">
            <h3 class="section-title">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                />
              </svg>
              Opiniones sobre {{ sellerName }}
            </h3>
            <button class="link-button" @click="openSellerProfile">
              Ver más en el perfil
            </button>
          </div>
          <div class="review-preview-grid">
            <article
              v-for="review in previewSellerReviews"
              :key="review.id"
              class="review-preview-card"
            >
              <div class="review-preview-head">
                <div class="review-avatar">
                  {{ reviewInitial(review.authorName) }}
                </div>
                <div>
                  <strong>{{ review.authorName }}</strong>
                  <small
                    >{{ review.rating }}/5 ·
                    {{ formatReviewDate(review.createdAt) }}</small
                  >
                </div>
              </div>
              <p>{{ truncateReview(review.text) }}</p>
            </article>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast-notification" :class="toastType">
      <span>{{ toastMessage }}</span>
      <button class="toast-close" @click="showToast = false">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getListingById } from '../../../services/catalog.js';
import { getPublicProfileReviews } from '../../../services/profiles.js';
import {
  isVehicleSaved,
  removeSavedVehicleById,
  saveVehicleById,
} from '../../../services/buyer.js';

const route = useRoute();
const router = useRouter();

const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('success');
const vehicle = ref(null);
const sellerReviews = ref([]);
const currentImageIndex = ref(0);
const isFavorite = ref(false);
const editableVehicle = ref({});
const newFeature = ref('');

const showNotification = (message, type = 'success') => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const isEditMode = computed(() => route.query.edit === 'true');
const isRental = computed(
  () =>
    vehicle.value?.mode === 'rental' ||
    String(route.params.id || '').startsWith('rt-')
);

const getOptimizedImageUrl = (url, w = 1200, h = 800) => {
  if (!url)
    return 'https://placehold.co/1200x800/2d5179/ffffff?text=AutoSphere';
  if (url.includes('unsplash.com'))
    return `${url}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
  return url;
};
const getOptimizedThumbnailUrl = (url) => getOptimizedImageUrl(url, 200, 150);

const getCityName = (cityId) => {
  const cities = {
    'mx-cdmx': 'Ciudad de México',
    'mx-gdl': 'Guadalajara',
    'mx-mty': 'Monterrey',
    'mx-pue': 'Puebla',
    'mx-mer': 'Mérida',
  };
  return cities[cityId] || cityId || 'Ciudad por confirmar';
};

const getStateFromCity = (cityId) => {
  const states = {
    'mx-cdmx': 'CDMX',
    'mx-gdl': 'Jalisco',
    'mx-mty': 'Nuevo León',
    'mx-pue': 'Puebla',
    'mx-mer': 'Yucatán',
  };
  return states[cityId] || 'México';
};

const initEditableVehicle = () => {
  if (!vehicle.value) return;
  editableVehicle.value = {
    id: vehicle.value.id,
    title: vehicle.value.title,
    brand: vehicle.value.brand,
    model: vehicle.value.model,
    year: vehicle.value.year,
    price: vehicle.value.price,
    mileageKm: vehicle.value.mileageKm || vehicle.value.specs?.kilometraje || 0,
    fuel: vehicle.value.fuel || vehicle.value.specs?.combustible || 'Gasolina',
    transmission:
      vehicle.value.transmission ||
      vehicle.value.specs?.transmisión ||
      'Automática',
    color: vehicle.value.color || vehicle.value.specs?.color || '',
    description: vehicle.value.description || '',
    features: [...(vehicle.value.features || [])],
    location: {
      city: vehicle.value.location?.city || getCityName(vehicle.value.cityId),
      state:
        vehicle.value.location?.state || getStateFromCity(vehicle.value.cityId),
      addressLabel: vehicle.value.location?.addressLabel || '',
    },
  };
};

const displayVehicleInfo = computed(() => {
  if (isEditMode.value) {
    return editableVehicle.value || {};
  }

  return {
    brand: vehicle.value?.brand || '—',
    model: vehicle.value?.model || '—',
    year: vehicle.value?.year || '—',
    color: vehicle.value?.color || vehicle.value?.specs?.color || '—',
  };
});

const editableInfoItems = computed(() => [
  {
    label: 'Marca',
    value: displayVehicleInfo.value.brand,
    editable: isEditMode.value,
    type: 'text',
  },
  {
    label: 'Modelo',
    value: displayVehicleInfo.value.model,
    editable: isEditMode.value,
    type: 'text',
  },
  {
    label: 'Año',
    value: displayVehicleInfo.value.year,
    editable: isEditMode.value,
    type: 'number',
  },
  {
    label: 'Color',
    value: displayVehicleInfo.value.color,
    editable: isEditMode.value,
    type: 'text',
  },
]);

const thumbnailImages = computed(
  () => vehicle.value?.gallery || [vehicle.value?.coverImage].filter(Boolean)
);
const vehicleBadge = computed(() => {
  if (isRental.value)
    return vehicle.value?.available === false
      ? 'Renta ocupada'
      : 'Disponible para renta';
  return vehicle.value?.condition || 'Publicado';
});
const vehicleFeatures = computed(() => {
  if (isEditMode.value) return editableVehicle.value.features || [];
  const features = vehicle.value?.features || [];
  if (features.length) return features;
  return [];
});
const defaultDescription = computed(() => {
  if (!vehicle.value) return 'Descripción no disponible.';
  return isRental.value
    ? 'Vehículo disponible para renta con gestión desde AutoSphere y revisión previa a la entrega.'
    : 'Publicación disponible para compra con cita de revisión y seguimiento desde AutoSphere.';
});
const vehicleLocation = computed(() => {
  if (!vehicle.value) return 'Ubicación por confirmar';
  if (isEditMode.value) {
    return `${editableVehicle.value.location.city}, ${editableVehicle.value.location.state}`;
  }
  if (vehicle.value.location?.city && vehicle.value.location?.state) {
    return `${vehicle.value.location.city}, ${vehicle.value.location.state}`;
  }
  return (
    vehicle.value.cityLabel ||
    `${getCityName(vehicle.value.cityId)}, ${getStateFromCity(vehicle.value.cityId)}`
  );
});

const locationCoordinates = computed(() => {
  const lat = Number(vehicle.value?.location?.lat);
  const lng = Number(vehicle.value?.location?.lng);
  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    return { lat, lng };
  }
  return null;
});

const mapQuery = computed(() => {
  if (locationCoordinates.value) {
    return `${locationCoordinates.value.lat},${locationCoordinates.value.lng}`;
  }

  return vehicle.value?.location?.addressLabel
    ? `${vehicle.value.location.addressLabel}, ${vehicleLocation.value}, México`
    : `${vehicleLocation.value}, México`;
});

const googleMapsEmbedUrl = computed(() => {
  const query = encodeURIComponent(mapQuery.value);
  return `https://maps.google.com/maps?q=${query}&output=embed&hl=es&z=15`;
});

const sellerName = computed(
  () =>
    vehicle.value?.sellerDisplayName ||
    vehicle.value?.sellerProfile?.displayName ||
    'Perfil AutoSphere'
);
const sellerRatingNumber = computed(
  () => vehicle.value?.sellerProfile?.ratingAverage ?? null
);
const sellerReviewSummary = computed(() => {
  if (sellerRatingNumber.value) {
    return sellerReviews.value.length
      ? `${sellerReviews.value.length} opiniones publicadas`
      : 'Opiniones disponibles';
  }
  return sellerReviews.value.length
    ? `${sellerReviews.value.length} opiniones publicadas`
    : 'Perfil sin opiniones publicadas';
});
const sellerVerified = computed(
  () => vehicle.value?.sellerProfile?.verified === true
);
const previewSellerReviews = computed(() => sellerReviews.value.slice(0, 2));
const monthlyPayment = computed(() => {
  if (!vehicle.value?.price || isRental.value) return null;
  const rate = 0.12 / 12;
  const months = 48;
  const payment =
    (vehicle.value.price * rate * Math.pow(1 + rate, months)) /
    (Math.pow(1 + rate, months) - 1);
  return Math.round(payment);
});
const currentImage = computed(() => {
  const gallery = thumbnailImages.value;
  const image = gallery[currentImageIndex.value] || vehicle.value?.coverImage;
  return getOptimizedImageUrl(image, 1200, 800);
});

const addFeature = () => {
  if (!newFeature.value.trim()) return;
  editableVehicle.value.features.push(newFeature.value.trim());
  newFeature.value = '';
};

const removeFeature = (index) => {
  editableVehicle.value.features.splice(index, 1);
};

const saveChanges = () => {
  showNotification(
    'La edición se mantiene en la superficie interna del vendedor. Vuelve a tus publicaciones para continuar.',
    'info'
  );
  router.push({
    name: 'seller-listing-detail',
    params: { id: route.params.id },
  });
};

const cancelEdit = () => {
  router.push({
    name: 'seller-listing-detail',
    params: { id: route.params.id },
  });
};

const selectImage = (index) => {
  currentImageIndex.value = index;
};
const nextImage = () => {
  const gallery = thumbnailImages.value;
  currentImageIndex.value = gallery.length
    ? (currentImageIndex.value + 1) % gallery.length
    : 0;
};
const prevImage = () => {
  const gallery = thumbnailImages.value;
  currentImageIndex.value = gallery.length
    ? currentImageIndex.value === 0
      ? gallery.length - 1
      : currentImageIndex.value - 1
    : 0;
};
const toggleFavorite = async () => {
  if (!vehicle.value?.id) return;

  if (isFavorite.value) {
    await removeSavedVehicleById(vehicle.value.id);
    isFavorite.value = false;
    showNotification('Vehículo removido de guardados', 'success');
    return;
  }

  await saveVehicleById(vehicle.value.id);
  isFavorite.value = true;
  showNotification('Vehículo agregado a guardados', 'success');
};

const openSellerProfile = () => {
  if (!vehicle.value?.sellerId) return;
  router.push({
    name: 'public-user-profile',
    params: { id: vehicle.value.sellerId },
  });
};

const openSellerInventory = () => {
  if (!vehicle.value?.sellerId) return;
  router.push({
    name: 'public-catalog',
    query: {
      sellerId: vehicle.value.sellerId,
      ...(isRental.value ? { mode: 'renta' } : {}),
    },
  });
};

const contactSeller = openSellerProfile;

const scheduleTestDrive = () => {
  router.push({
    name: 'public-appointment-booking',
    params: { id: vehicle.value?.id },
  });
};

const formatPrice = (price) =>
  new Intl.NumberFormat('es-MX').format(price || 0);
const formatNumber = (num) => new Intl.NumberFormat('es-MX').format(num || 0);
const formatReviewDate = (value) =>
  new Date(value).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const openMaps = () => {
  const address = encodeURIComponent(
    vehicle.value?.location?.addressLabel || `${vehicleLocation.value}`
  );
  window.open(`https://www.google.com/maps/search/${address}`, '_blank');
};

const loadListing = async () => {
  const listing = await getListingById(route.params.id);
  if (!listing) {
    router.replace({ name: 'utility-not-found' });
    return;
  }
  vehicle.value = listing;
  isFavorite.value = await isVehicleSaved(listing.id);
  sellerReviews.value = listing.sellerId
    ? await getPublicProfileReviews(listing.sellerId)
    : [];
  currentImageIndex.value = 0;
  initEditableVehicle();
};

watch(() => route.params.id, loadListing, { immediate: true });
onMounted(() => {
  currentImageIndex.value = 0;
});
</script>

<style scoped src="./styles.css"></style>
