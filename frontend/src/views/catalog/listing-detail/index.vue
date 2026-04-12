<template>
  <div v-if="vehicle" class="vehicle-detail-page">
    <!-- HERO SECTION -->
    <br />
    <br />
    <br />
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
          <h1 class="hero-title">
            {{ vehicle.brand }}
            <span class="model-highlight">{{ vehicle.model }}</span>
          </h1>
          <p class="hero-year">Año {{ vehicle.year }}</p>
        </div>

        <!-- Favorite Button -->
        <button
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
      <div class="price-card" :class="{ 'rental-price-card': isRental }">
        <div class="price-header">
          <div>
            <p class="price-label">
              {{ isRental ? 'Precio por día' : 'Precio de venta' }}
            </p>
            <h2 class="price-value">
              ${{
                formatPrice(
                  isRental ? vehicle.rentalSpecs?.pricePerDay : vehicle.price
                )
              }}
              <span class="price-currency">MXN</span>
            </h2>
            <p v-if="!isRental && monthlyPayment" class="price-financing">
              Desde ${{ formatPrice(monthlyPayment) }}/mes con financiamiento*
            </p>
            <div v-if="isRental" class="rental-price-options">
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

        <!-- Quick Specs -->
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
              <p class="spec-value">
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
              <p class="spec-value">
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
              <p class="spec-value">
                {{ vehicle.transmission || vehicle.specs?.transmisión }}
              </p>
            </div>
          </div>
        </div>

        <!-- CTA Buttons (diferenciados) -->
        <div class="cta-buttons">
          <button class="btn-secondary" @click="scheduleTestDrive">
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
          <button class="btn-primary" @click="contactSeller">
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
        </div>
      </div>

      <!-- PLANES DE PAGO (solo para venta) -->
      <div v-if="!isRental" class="payment-plans-card">
        <h3 class="section-title">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M3 10H21M7 15H11M7 18H14M6 3H18C19.1046 3 20 3.89543 20 5V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3Z"
            />
          </svg>
          Opciones de pago
        </h3>
        <div class="payment-options">
          <div
            class="payment-option"
            :class="{ active: paymentPlan === 'cash' }"
            @click="paymentPlan = 'cash'"
          >
            <div class="payment-option-header">
              <span class="payment-option-name">Contado</span>
              <span class="payment-option-badge">Ahorra hasta 15%</span>
            </div>
            <p class="payment-option-desc">
              Pago único con descuento especial.
            </p>
            <div class="payment-option-price">
              ${{ formatPrice(vehicle.price * 0.85) }} MXN
            </div>
          </div>
          <div
            class="payment-option"
            :class="{ active: paymentPlan === 'financing24' }"
            @click="paymentPlan = 'financing24'"
          >
            <div class="payment-option-header">
              <span class="payment-option-name">Financiamiento 24 meses</span>
              <span class="payment-option-badge">Tasa fija 9.9%</span>
            </div>
            <p class="payment-option-desc">
              Mensualidades fijas sin penalización por pago anticipado.
            </p>
            <div class="payment-option-price">
              ${{ formatPrice(calculateMonthlyPayment(24, 0.099)) }} MXN / mes
            </div>
          </div>
          <div
            class="payment-option"
            :class="{ active: paymentPlan === 'financing48' }"
            @click="paymentPlan = 'financing48'"
          >
            <div class="payment-option-header">
              <span class="payment-option-name">Financiamiento 48 meses</span>
              <span class="payment-option-badge">Tasa fija 12.5%</span>
            </div>
            <p class="payment-option-desc">
              Mensualidades bajas para mayor liquidez.
            </p>
            <div class="payment-option-price">
              ${{ formatPrice(calculateMonthlyPayment(48, 0.125)) }} MXN / mes
            </div>
          </div>
        </div>
        <button class="btn-primary payment-cta" @click="requestQuote">
          Solicitar cotización personalizada
        </button>
      </div>

      <!-- INFO DE RENTA (solo para renta) -->
      <div v-if="isRental && vehicle.rentalSpecs" class="rental-info-card">
        <h3 class="section-title">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Detalles de Renta
        </h3>
        <div class="rental-details-grid">
          <div class="rental-detail-item">
            <span class="detail-label">Depósito de garantía</span>
            <span class="detail-value"
              >${{ formatPrice(vehicle.rentalSpecs.depositAmount) }} MXN</span
            >
          </div>
          <div class="rental-detail-item">
            <span class="detail-label">Km incluidos/día</span>
            <span class="detail-value"
              >{{ vehicle.rentalSpecs.kmIncludedPerDay }} km</span
            >
          </div>
          <div class="rental-detail-item">
            <span class="detail-label">Costo por km extra</span>
            <span class="detail-value"
              >${{ vehicle.rentalSpecs.extraKmCost }} MXN/km</span
            >
          </div>
          <div class="rental-detail-item">
            <span class="detail-label">Disponibilidad</span>
            <span
              class="detail-value"
              :class="
                vehicle.rentalSpecs.available ? 'text-success' : 'text-danger'
              "
            >
              {{
                vehicle.rentalSpecs.available ? 'Disponible' : 'No disponible'
              }}
            </span>
          </div>
          <div
            v-if="vehicle.rentalSpecs.availableFrom"
            class="rental-detail-item full-width"
          >
            <span class="detail-label">Período de disponibilidad</span>
            <span class="detail-value"
              >{{ formatDate(vehicle.rentalSpecs.availableFrom) }} -
              {{ formatDate(vehicle.rentalSpecs.availableTo) }}</span
            >
          </div>
        </div>

        <div class="included-items">
          <h4>Incluye</h4>
          <div class="items-list">
            <span
              v-for="item in vehicle.rentalSpecs.includedItems"
              :key="item"
              class="included-badge"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ item }}
            </span>
          </div>
        </div>

        <div class="requirements">
          <h4>Requisitos</h4>
          <ul>
            <li v-for="req in vehicle.rentalSpecs.requirements" :key="req">
              {{ req }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Details Accordion -->
      <button class="expand-toggle" @click="showDetails = !showDetails">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
        {{ showDetails ? 'Ocultar detalles' : 'Ver más detalles del vehículo' }}
        <svg
          class="chevron"
          :class="{ rotated: showDetails }"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <!-- Expandable Details -->
      <div class="details-panel" :class="{ open: showDetails }">
        <!-- Vehicle Info -->
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
          </h3>
          <div class="info-grid">
            <div
              v-for="item in vehicleInfoItems"
              :key="item.label"
              class="info-item"
            >
              <p class="info-label">{{ item.label }}</p>
              <p class="info-value">{{ item.value || '—' }}</p>
            </div>
          </div>
        </div>

        <!-- Description -->
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
          <p class="description-text">
            {{ vehicle.description || defaultDescription }}
          </p>
        </div>

        <!-- Features -->
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
          <div class="features-grid">
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
        </div>

        <!-- Seller Info -->
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
                  >{{ sellerRating }} •
                  {{
                    vehicle.sellerProfile?.responseTime || 'Respuesta rápida'
                  }}</span
                >
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
            </div>
          </div>
        </div>

        <!-- Ubicación -->
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
              <p>
                <strong>{{ vehicleLocation }}</strong>
              </p>
              <p class="address-detail">
                {{ vehicle.location?.addressLabel || 'Sucursal principal' }}
              </p>
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

        <!-- Reseñas -->
        <div class="reviews-section info-section">
          <h3 class="section-title">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.07 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
            Reseñas de {{ isRental ? 'arrendatarios' : 'compradores' }}
          </h3>
          <div class="reviews-list">
            <div v-for="review in reviews" :key="review.id" class="review-item">
              <div class="review-header">
                <div class="reviewer-info">
                  <span class="reviewer-name">{{ review.name }}</span>
                  <div class="stars stars-sm">
                    <svg
                      v-for="star in getReviewStars(review.rating)"
                      :key="star.key"
                      viewBox="0 0 24 24"
                      :fill="star.filled ? 'currentColor' : 'none'"
                      :stroke="star.filled ? 'none' : 'currentColor'"
                    >
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.07 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"
                      />
                    </svg>
                  </div>
                </div>
                <span class="review-date">{{ formatDate(review.date) }}</span>
              </div>
              <p class="review-comment">{{ review.comment }}</p>
            </div>
          </div>

          <!-- Formulario para dejar reseña -->
          <div class="add-review">
            <h4>Deja tu reseña</h4>
            <div class="review-form">
              <input
                v-model="newReview.name"
                type="text"
                placeholder="Tu nombre"
                class="form-input"
              />
              <div class="rating-input">
                <span>Calificación: </span>
                <div class="stars stars-select">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    :class="{ active: i <= newReview.rating }"
                    @click="newReview.rating = i"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.07 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </svg>
                </div>
              </div>
              <textarea
                v-model="newReview.comment"
                placeholder="Escribe tu comentario..."
                rows="3"
                class="form-input"
              ></textarea>
              <button class="btn-secondary" @click="submitReview">
                Publicar reseña
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const getReviewStars = (rating) =>
  Array.from({ length: 5 }, (_, index) => ({
    key: index + 1,
    filled: index < rating,
  }));

// IMPORTAR DATOS DESDE JSON
import salesDetails from '../../../mocks/catalog/listing-details.json';
import rentalDetails from '../../../mocks/catalog/rental-details.json';

// STATE
const currentImageIndex = ref(0);
const showDetails = ref(false);
const isFavorite = ref(false);

// NUEVO: planes de pago y reseñas
const paymentPlan = ref('cash');
const reviews = ref([
  {
    id: 1,
    name: 'Carlos Rodríguez',
    rating: 5,
    date: '2025-02-10',
    comment:
      'Excelente servicio, el auto llegó en perfectas condiciones. Muy recomendable.',
  },
  {
    id: 2,
    name: 'María Fernanda López',
    rating: 4,
    date: '2025-01-28',
    comment:
      'Todo bien, solo un pequeño detalle con la entrega, pero lo resolvieron rápido.',
  },
  {
    id: 3,
    name: 'Javier Méndez',
    rating: 5,
    date: '2025-01-15',
    comment:
      'El mejor lugar para comprar un auto seminuevo. Proceso transparente y confiable.',
  },
]);

const newReview = ref({
  name: '',
  rating: 5,
  comment: '',
});

// DEFAULT DATA
const defaultDescription =
  'Vehículo en excelente condición, mantenimiento al día. Ideal para ciudad y carretera.';
const defaultFeatures = [
  'Aire acondicionado',
  'Dirección hidráulica',
  'Vidrios eléctricos',
  'Bluetooth',
  'Sistema de audio',
];

// HELPERS
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
  return cities[cityId] || cityId;
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

// DETERMINAR SI ES RENTA O VENTA
const isRental = computed(() => {
  const id = route.params.id;
  return id && id.startsWith('rt-');
});

// OBTENER VEHÍCULO DE LA FUENTE CORRECTA
const vehicle = computed(() => {
  const id = route.params.id;
  if (!id) return null;

  return isRental.value ? rentalDetails[id] || null : salesDetails[id] || null;
});

watch(
  () => route.params.id,
  () => {
    if (!vehicle.value) {
      router.replace('/vehiculos');
    }
  },
  { immediate: true }
);

const thumbnailImages = computed(
  () => vehicle.value?.gallery || [vehicle.value?.coverImage]
);
const vehicleBadge = computed(() => {
  if (isRental.value) return 'Disponible para renta';
  return vehicle.value?.condition || 'Certificado';
});
const vehicleInfoItems = computed(() => [
  { label: 'Marca', value: vehicle.value?.brand },
  { label: 'Modelo', value: vehicle.value?.model },
  { label: 'Año', value: vehicle.value?.year },
  {
    label: 'Kilometraje',
    value:
      vehicle.value?.mileageKm || vehicle.value?.specs?.kilometraje
        ? formatNumber(
            vehicle.value.mileageKm || vehicle.value?.specs?.kilometraje
          ) + ' km'
        : '—',
  },
  {
    label: 'Transmisión',
    value: vehicle.value?.transmission || vehicle.value?.specs?.transmisión,
  },
  {
    label: 'Combustible',
    value: vehicle.value?.fuel || vehicle.value?.specs?.combustible,
  },
  {
    label: 'Color',
    value: vehicle.value?.color || vehicle.value?.specs?.color,
  },
  {
    label: 'Puertas',
    value: vehicle.value?.doors || vehicle.value?.specs?.puertas || '4',
  },
  {
    label: 'Asientos',
    value: vehicle.value?.seats || vehicle.value?.specs?.asientos || '5',
  },
]);
const vehicleFeatures = computed(
  () => vehicle.value?.features || defaultFeatures
);
const vehicleLocation = computed(() => {
  if (vehicle.value?.location?.city && vehicle.value?.location?.state) {
    return `${vehicle.value.location.city}, ${vehicle.value.location.state}`;
  }
  return `${getCityName(vehicle.value?.cityId)}, ${getStateFromCity(vehicle.value?.cityId)}`;
});

// URL dinámica para el embed de Google Maps.
// Usa la dirección exacta si está disponible; si no, la ciudad del vehículo.
// No requiere API key — usa el endpoint público de Google Maps embed.
const googleMapsEmbedUrl = computed(() => {
  const address = encodeURIComponent(
    vehicle.value?.location?.addressLabel
      ? `${vehicle.value.location.addressLabel}, ${vehicleLocation.value}, México`
      : `${vehicleLocation.value}, México`
  );
  return `https://maps.google.com/maps?q=${address}&output=embed&hl=es&z=14`;
});
const sellerName = computed(
  () =>
    vehicle.value?.sellerProfile?.displayName ||
    (isRental.value ? 'AutoSphere Rentals' : 'AutoSphere Certified')
);
const sellerRating = computed(
  () => vehicle.value?.sellerProfile?.rating || 4.8
);
const sellerVerified = computed(
  () => vehicle.value?.sellerProfile?.verified !== false
);
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
  const img = gallery[currentImageIndex.value] || vehicle.value?.coverImage;
  return getOptimizedImageUrl(img, 1200, 800);
});

// METHODS
const selectImage = (index) => {
  currentImageIndex.value = index;
};
const nextImage = () => {
  const gallery = thumbnailImages.value;
  currentImageIndex.value = (currentImageIndex.value + 1) % gallery.length;
};
const prevImage = () => {
  const gallery = thumbnailImages.value;
  currentImageIndex.value =
    currentImageIndex.value === 0
      ? gallery.length - 1
      : currentImageIndex.value - 1;
};
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};
const contactSeller = () => {
  alert(
    `Contactando a ${sellerName.value}...\nTeléfono: 800-123-4567\nEmail: ${isRental.value ? 'rentas@autosphere.com' : 'ventas@autosphere.com'}`
  );
};
const scheduleTestDrive = () => {
  if (isRental.value) {
    alert('Redirigiendo a calendario de rentas...');
    router.push(`/rentas?vehicle=${vehicle.value?.id}`);
  } else {
    router.push(`/citas?vehicle=${vehicle.value?.id}`);
  }
};

const formatPrice = (price) => new Intl.NumberFormat('es-MX').format(price);
const formatNumber = (num) => new Intl.NumberFormat('es-MX').format(num);

// NUEVOS MÉTODOS
const calculateMonthlyPayment = (months, annualRate) => {
  if (!vehicle.value?.price) return 0;
  const principal = vehicle.value.price;
  const monthlyRate = annualRate / 12;
  if (monthlyRate === 0) return principal / months;
  const payment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(payment);
};

const requestQuote = () => {
  alert(
    'Gracias por tu interés. Un asesor se pondrá en contacto contigo en breve.'
  );
};

const openMaps = () => {
  const address = encodeURIComponent(
    vehicle.value?.location?.addressLabel ||
      `Av. Ejemplo #123, ${vehicleLocation.value}`
  );
  window.open(`https://www.google.com/maps/search/${address}`, '_blank');
};

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const submitReview = () => {
  if (!newReview.value.name.trim() || !newReview.value.comment.trim()) {
    alert('Por favor completa tu nombre y comentario.');
    return;
  }
  const newId = reviews.value.length + 1;
  reviews.value.unshift({
    id: newId,
    name: newReview.value.name,
    rating: newReview.value.rating,
    date: new Date().toISOString().split('T')[0],
    comment: newReview.value.comment,
  });
  newReview.value = { name: '', rating: 5, comment: '' };
  alert('Reseña publicada. ¡Gracias por compartir tu experiencia!');
};

onMounted(() => {
  currentImageIndex.value = 0;
});
</script>

<style scoped src="./styles.css"></style>
