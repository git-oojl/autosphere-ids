<template>
  <div class="vehicle-detail-page" v-if="vehicle">

    <!-- ===== HERO SECTION ===== -->
    <div class="hero-section">
      <div class="hero-image-wrapper">
        <img
          :src="currentImage"
          :alt="`${vehicle.brand} ${vehicle.model} ${vehicle.year}`"
          class="hero-image"
          @error="handleHeroImageError"
        />
        <div class="hero-gradient-bottom"></div>
        <div class="hero-gradient-top"></div>

        <!-- Top bar -->
        <div class="hero-topbar">
          <nav class="breadcrumb">
            <a href="#" class="breadcrumb-link" @click.prevent="goToHome">Inicio</a>
            <span class="breadcrumb-sep">›</span>
            <a href="#" class="breadcrumb-link" @click.prevent="goToCatalog">Listados</a>
            <span class="breadcrumb-sep">›</span>
            <span class="breadcrumb-current">{{ vehicle.brand }} {{ vehicle.model }}</span>
          </nav>
          <button class="buyer-info-btn" @click="showBuyerInfo">
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
              <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
            Info del comprador
          </button>
        </div>

        <!-- Nav Arrows -->
        <button class="arrow-btn arrow-left" @click="prevImage" aria-label="Imagen anterior">
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="arrow-btn arrow-right" @click="nextImage" aria-label="Imagen siguiente">
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Image dots -->
        <div class="image-dots" v-if="thumbnailImages.length > 1">
          <span
            v-for="(_, i) in thumbnailImages"
            :key="i"
            class="dot"
            :class="{ active: currentImageIndex === i }"
            @click="selectImage(i)"
          ></span>
        </div>

        <!-- Hero info overlay -->
        <div class="hero-info-overlay">
          <div class="hero-top-tags">
            <div class="hero-badge">
              <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {{ vehicleBadge }}
            </div>
            <div class="hero-type-tag">{{ vehicle.type || 'Vehículo' }}</div>
          </div>
          <h1 class="hero-title">
            {{ vehicle.brand }} <span class="model-highlight">{{ vehicle.model }}</span>
          </h1>
          <div class="hero-specs-row">
            <div class="hero-spec">
              <span class="hero-spec-value">{{ vehicle.horsepower || '--' }}<span class="spec-unit"> HP</span></span>
              <span class="hero-spec-label">Potencia</span>
            </div>
            <div class="hero-spec-divider"></div>
            <div class="hero-spec">
              <span class="hero-spec-value">{{ vehicle.engine || '--' }}<span class="spec-unit"> L</span></span>
              <span class="hero-spec-label">Motor</span>
            </div>
            <div class="hero-spec-divider"></div>
            <div class="hero-spec">
              <span class="hero-spec-value">{{ vehicle.year }}</span>
              <span class="hero-spec-label">Año</span>
            </div>
            <div class="hero-spec-divider"></div>
            <div class="hero-spec">
              <span class="hero-spec-value">{{ formatNumber(vehicle.mileageKm || 0) }}<span class="spec-unit"> km</span></span>
              <span class="hero-spec-label">Odómetro</span>
            </div>
          </div>
        </div>

        <!-- Fav button -->
        <div class="hero-actions-top">
          <button class="fav-btn" :class="{ active: isFavorite }" @click="toggleFavorite" aria-label="Agregar a favoritos">
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path d="M20.84 4.61C19.8 3.57 18.38 3 16.95 3c-1.43 0-2.85.57-3.89 1.61L12 5.67l-1.06-1.06C9.9 3.57 8.48 3 7.05 3 5.62 3 4.2 3.57 3.16 4.61 2.13 5.64 1.55 7.04 1.55 8.5s.58 2.86 1.61 3.89L12 21.23l8.84-8.84C21.88 11.36 22.45 9.96 22.45 8.5s-.57-2.86-1.61-3.89z"
                :fill="isFavorite ? 'var(--accent)' : 'none'" stroke="currentColor" stroke-width="1.8"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Thumbnails -->
      <div class="thumbnails-row" v-if="thumbnailImages.length > 1">
        <div
          v-for="(img, i) in thumbnailImages"
          :key="i"
          class="thumb"
          :class="{ active: currentImageIndex === i }"
          @click="selectImage(i)"
        >
          <img :src="getOptimizedThumbnailUrl(img)" :alt="`Vista ${i + 1}`" loading="lazy" />
          <div class="thumb-overlay"></div>
        </div>
      </div>
    </div>

    <!-- ===== CONTENT PANEL ===== -->
    <div class="content-area">

      <!-- Expand pill -->
      <button class="expand-pill" @click="showDetails = !showDetails" :aria-expanded="showDetails">
        <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/>
          <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        {{ showDetails ? 'Ocultar detalles' : 'Conoce más de este modelo' }}
        <svg class="pill-chevron" :class="{ rotated: showDetails }" viewBox="0 0 24 24" fill="none" width="14" height="14">
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- Main card -->
      <div class="main-card">

        <!-- Price Section — always visible -->
        <div class="price-section">
          <div class="price-left">
            <div class="price-label">Precio de venta</div>
            <div class="price-value">${{ formatPrice(vehicle.price) }} <span class="price-currency">MXN</span></div>
            <div class="price-financing" v-if="monthlyPayment">
              Desde ${{ formatPrice(monthlyPayment) }}/mes con financiamiento*
            </div>
          </div>
          <div class="price-right">
            <div class="condition-badge">{{ vehicle.condition || 'Certificado' }}</div>
            <div class="fuel-tag">
              <svg viewBox="0 0 24 24" fill="none" width="11" height="11"><path d="M5 4h10v16H5V4z" stroke="currentColor" stroke-width="1.8"/><path d="M15 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2" stroke="currentColor" stroke-width="1.8"/></svg>
              {{ vehicle.fuel || 'N/A' }}
            </div>
            <div class="transmission-tag">
              <svg viewBox="0 0 24 24" fill="none" width="11" height="11"><circle cx="5" cy="6" r="2" stroke="currentColor" stroke-width="1.8"/><circle cx="19" cy="6" r="2" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="18" r="2" stroke="currentColor" stroke-width="1.8"/><path d="M5 8v3l7 4 7-4V8" stroke="currentColor" stroke-width="1.8"/></svg>
              {{ vehicle.transmission || 'N/A' }}
            </div>
          </div>
        </div>

        <!-- Expandable details panel -->
        <div class="details-panel" :class="{ open: showDetails }">
          <div class="details-inner">

            <div class="section-divider"></div>

            <div class="section-block">
              <div class="section-header">
                <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M9 9h6M9 12h6M9 15h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                Información del Vehículo
              </div>
              <div class="info-grid">
                <div class="info-cell" v-for="item in vehicleInfoItems" :key="item.label">
                  <span class="info-label">{{ item.label }}</span>
                  <span class="info-value">{{ item.value || '—' }}</span>
                </div>
              </div>
            </div>

            <div class="section-divider"></div>

            <div class="section-block">
              <div class="section-header">
                <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M4 6h16M4 12h16M4 18h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                Descripción
              </div>
              <p class="description-text">{{ vehicle.description || defaultDescription }}</p>
            </div>

            <div class="section-divider"></div>

            <div class="section-block">
              <div class="section-header">
                <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                Características
              </div>
              <div class="features-list">
                <div class="feature-chip" v-for="(feature, i) in vehicleFeatures" :key="i">
                  <svg viewBox="0 0 24 24" fill="none" width="10" height="10">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ feature }}
                </div>
              </div>
            </div>

            <div class="section-divider"></div>
          </div>
        </div>

        <!-- Seller + CTA — always visible -->
        <div class="bottom-card">
          <div class="seller-label">Publicado por</div>
          <div class="seller-row">
            <div class="seller-avatar">
              <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
                <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="seller-info-block">
              <div class="seller-name-row">
                <span class="seller-name">{{ sellerName }}</span>
                <span class="seller-verified-badge" v-if="sellerVerified">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="9" height="9"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Verificado
                </span>
              </div>
              <div class="seller-stars">
                <svg v-for="star in 5" :key="star" viewBox="0 0 24 24" :fill="star <= Math.round(sellerRating) ? 'var(--accent)' : 'var(--border-color)'" width="13" height="13">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span class="seller-rating">{{ sellerRating.toFixed(1) }}</span>
              </div>
              <div class="seller-location">
                <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
                {{ vehicleLocation }}
              </div>
            </div>
          </div>

          <div class="cta-buttons">
            <button class="cta-btn cta-schedule" @click="scheduleTestDrive">
              <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.8"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="1.8"/>
              </svg>
              Agendar cita
            </button>
            <button class="cta-btn cta-contact" @click="contactSeller">
              <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              </svg>
              Contactar
            </button>
          </div>

          <p class="financing-note">* Financiamiento sujeto a aprobación crediticia. Tasa referencial 12% anual a 48 meses.</p>
        </div>

      </div>
    </div>

  </div>

  <!-- Loading State -->
  <div v-else class="loading-state">
    <div class="spinner"></div>
    <p>Cargando vehículo...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const showDetails = ref(false)
const isFavorite = ref(false)
const currentImageIndex = ref(0)
const heroImageError = ref(false)

// ============================================
// UTILITY FUNCTIONS
// ============================================

const getOptimizedImageUrl = (url, width = 800, height = 600) => {
  if (!url) return `https://placehold.co/${width}x${height}/2d3748/ffffff?text=Sin+imagen`
  if (url.includes('unsplash.com')) {
    return `${url}?w=${width}&h=${height}&fit=crop&auto=format&q=80`
  }
  return url
}

const getOptimizedThumbnailUrl = (url) => {
  return getOptimizedImageUrl(url, 100, 75)
}

const handleHeroImageError = (event) => {
  heroImageError.value = true
  event.target.src = 'https://placehold.co/1200x800/2d3748/ffffff?text=Imagen+no+disponible'
}

// ============================================
// CITY HELPERS
// ============================================

const cityNames = {
  'mx-cdmx': 'Ciudad de México',
  'mx-gdl': 'Guadalajara',
  'mx-mty': 'Monterrey',
  'mx-pue': 'Puebla',
  'mx-mer': 'Mérida'
}

const cityStates = {
  'mx-cdmx': 'CDMX',
  'mx-gdl': 'Jalisco',
  'mx-mty': 'Nuevo León',
  'mx-pue': 'Puebla',
  'mx-mer': 'Yucatán'
}

const getCityName = (cityId) => cityNames[cityId] || cityId || 'Ubicación no especificada'
const getStateFromCity = (cityId) => cityStates[cityId] || ''

// ============================================
// DEFAULTS
// ============================================

const defaultDescription = 'Vehículo en excelentes condiciones, listo para que lo conozcas. Agenda una cita para una prueba de manejo sin compromiso.'
const defaultFeatures = [
  'Aire acondicionado', 'Dirección asistida', 'Cierre centralizado',
  'Vidrios eléctricos', 'Frenos ABS', 'Airbags'
]

// ============================================
// VEHICLE DATABASE
// ============================================

const vehiclesDatabase = ref([
  {
    id: 'vh-002',
    title: 'Toyota Corolla LE 2020',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020,
    price: 289000,
    type: 'Sedán',
    transmission: 'Automática',
    fuel: 'Gasolina',
    mileageKm: 61200,
    cityId: 'mx-gdl',
    coverImage: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8',
    status: 'published',
    color: 'Blanco',
    condition: 'Certificado',
    horsepower: 139,
    engine: 1.8,
    cylinders: 4,
    doors: 4,
    description: 'Toyota Corolla LE 2020 en excelente estado. Documentación al día, historial de servicio completo y opción de cita para revisión presencial. Auto confiable, económico y con gran valor de reventa.',
    features: ['Cámara de reversa', 'Bluetooth', 'Control crucero', 'Asientos de tela', 'Aire acondicionado', 'ABS', 'Airbags', 'Sistema de sonido'],
    gallery: [
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800'
    ],
    sellerProfile: {
      displayName: 'Auto Select Norte',
      rating: 4.7,
      verified: true,
      responseTime: 'Menos de 2 horas',
      activeListings: 4
    },
    location: { city: 'Guadalajara', state: 'Jalisco' }
  },
  {
    id: 'vh-003',
    title: 'Ford Ranger XLT 2022',
    brand: 'Ford',
    model: 'Ranger',
    year: 2022,
    price: 615000,
    type: 'Pickup',
    transmission: 'Automática',
    fuel: 'Diésel',
    mileageKm: 28100,
    cityId: 'mx-mty',
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    status: 'published',
    color: 'Gris',
    condition: 'Seminuevo',
    horsepower: 270,
    engine: 3.2,
    cylinders: 5,
    doors: 4,
    description: 'Ford Ranger XLT 2022 en excelente estado. Ideal para trabajo y aventura. Excelente capacidad de carga y consumo eficiente. Tracción 4x4.',
    features: ['Tracción 4x4', 'Caja de carga', 'Control de estabilidad', 'Asistente de arranque', 'Cámara trasera', 'Sensores de estacionamiento'],
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
      'https://images.unsplash.com/photo-1533473359331-8405c4ab1efd?w=800',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
    ],
    sellerProfile: {
      displayName: 'Seminuevos La Roca',
      rating: 4.4,
      verified: true,
      responseTime: 'Menos de 2 horas',
      activeListings: 4
    },
    location: { city: 'Monterrey', state: 'Nuevo León' }
  },
  {
    id: 'vh-004',
    title: 'Kia Rio Hatchback 2019',
    brand: 'Kia',
    model: 'Rio',
    year: 2019,
    price: 229000,
    type: 'Hatchback',
    transmission: 'Manual',
    fuel: 'Gasolina',
    mileageKm: 73500,
    cityId: 'mx-pue',
    coverImage: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c',
    status: 'published',
    color: 'Azul',
    condition: 'Certificado',
    horsepower: 120,
    engine: 1.6,
    cylinders: 4,
    doors: 5,
    description: 'Kia Rio Hatchback 2019, compacto y eficiente. Perfecto para la ciudad con excelente rendimiento de combustible.',
    features: ['Bluetooth', 'Aire acondicionado', 'Dirección eléctrica', 'Vidrios eléctricos', 'Cierre centralizado', 'Airbags'],
    gallery: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800'
    ],
    sellerProfile: {
      displayName: 'Seminuevos La Roca',
      rating: 4.4,
      verified: true,
      responseTime: 'Menos de 2 horas',
      activeListings: 4
    },
    location: { city: 'Puebla', state: 'Puebla' }
  },
  {
    id: 'vh-005',
    title: 'Volkswagen Jetta Comfortline 2023',
    brand: 'Volkswagen',
    model: 'Jetta',
    year: 2023,
    price: 529000,
    type: 'Sedán',
    transmission: 'Automática',
    fuel: 'Gasolina',
    mileageKm: 12900,
    cityId: 'mx-cdmx',
    coverImage: 'https://images.unsplash.com/photo-1502877338535-766e1452684a',
    status: 'published',
    color: 'Negro',
    condition: 'Nuevo',
    horsepower: 150,
    engine: 1.4,
    cylinders: 4,
    doors: 4,
    description: 'Volkswagen Jetta Comfortline 2023, sedán elegante y tecnológico. Excelente desempeño y confort. Único dueño.',
    features: ['Pantalla 8"', 'Apple CarPlay', 'Android Auto', 'Asientos calefactables', 'Control crucero adaptativo', 'Sensores de estacionamiento'],
    gallery: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a',
      'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'
    ],
    sellerProfile: {
      displayName: 'Auto Select Norte',
      rating: 4.7,
      verified: true,
      responseTime: 'Menos de 2 horas',
      activeListings: 4
    },
    location: { city: 'Ciudad de México', state: 'CDMX' }
  },
  {
    id: 'vh-007',
    title: 'Honda CR-V Touring 2022',
    brand: 'Honda',
    model: 'CR-V',
    year: 2022,
    price: 598000,
    type: 'SUV',
    transmission: 'Automática',
    fuel: 'Gasolina',
    mileageKm: 24600,
    cityId: 'mx-gdl',
    coverImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d',
    status: 'published',
    color: 'Gris',
    condition: 'Seminuevo',
    horsepower: 190,
    engine: 1.5,
    cylinders: 4,
    doors: 5,
    description: 'Honda CR-V Touring 2022, SUV familiar con amplio espacio y tecnología de punta. Excelente para viajes largos.',
    features: ['Asientos de piel', 'Techo panorámico', 'Cámara 360°', 'Navegación', 'Control crucero adaptativo', 'Asistente de carril'],
    gallery: [
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d',
      'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
    ],
    sellerProfile: {
      displayName: 'Auto Select Norte',
      rating: 4.7,
      verified: true,
      responseTime: 'Menos de 2 horas',
      activeListings: 4
    },
    location: { city: 'Guadalajara', state: 'Jalisco' }
  }
])

// ============================================
// COMPUTED PROPERTIES
// ============================================

const vehicle = computed(() => {
  const id = route.params.id
  const found = vehiclesDatabase.value.find(v => v.id === id)
  if (!found) {
    router.push('/vehiculos')
    return null
  }
  return found
})

const thumbnailImages = computed(() => {
  return vehicle.value?.gallery || [vehicle.value?.coverImage]
})

const vehicleBadge = computed(() => {
  if (vehicle.value?.condition) return vehicle.value.condition
  return vehicle.value?.status === 'published' ? 'Certificado' : 'En stock'
})

const vehicleInfoItems = computed(() => [
  { label: 'Marca', value: vehicle.value?.brand },
  { label: 'Modelo', value: vehicle.value?.model },
  { label: 'Año', value: vehicle.value?.year },
  { label: 'Kilometraje', value: vehicle.value?.mileageKm ? formatNumber(vehicle.value.mileageKm) + ' km' : '—' },
  { label: 'Transmisión', value: vehicle.value?.transmission },
  { label: 'Combustible', value: vehicle.value?.fuel },
  { label: 'Color', value: vehicle.value?.color },
  { label: 'Puertas', value: vehicle.value?.doors || '4' }
])

const vehicleFeatures = computed(() => {
  return vehicle.value?.features || defaultFeatures
})

const vehicleLocation = computed(() => {
  if (vehicle.value?.location?.city && vehicle.value?.location?.state) {
    return `${vehicle.value.location.city}, ${vehicle.value.location.state}`
  }
  return `${getCityName(vehicle.value?.cityId)}, ${getStateFromCity(vehicle.value?.cityId)}`
})

const sellerName = computed(() => {
  return vehicle.value?.sellerProfile?.displayName || 'AutoSphere Certified'
})

const sellerRating = computed(() => {
  return vehicle.value?.sellerProfile?.rating || 4.8
})

const sellerVerified = computed(() => {
  return vehicle.value?.sellerProfile?.verified !== false
})

const monthlyPayment = computed(() => {
  if (!vehicle.value?.price) return null
  const rate = 0.12 / 12
  const months = 48
  const payment = vehicle.value.price * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1)
  return Math.round(payment)
})

const currentImage = computed(() => {
  const gallery = thumbnailImages.value
  const img = gallery[currentImageIndex.value] || vehicle.value?.coverImage
  return getOptimizedImageUrl(img, 1200, 800)
})

// ============================================
// METHODS
// ============================================

const selectImage = (index) => { currentImageIndex.value = index }
const nextImage = () => {
  const gallery = thumbnailImages.value
  currentImageIndex.value = (currentImageIndex.value + 1) % gallery.length
}
const prevImage = () => {
  const gallery = thumbnailImages.value
  currentImageIndex.value = currentImageIndex.value === 0 ? gallery.length - 1 : currentImageIndex.value - 1
}

const toggleFavorite = () => { isFavorite.value = !isFavorite.value }
const showBuyerInfo = () => { alert('Información para compradores: Financiamiento disponible, seguro incluido y garantía extendida. Contáctanos para más detalles.') }
const contactSeller = () => { alert(`Contactando a ${sellerName.value}...\nTeléfono: 800-123-4567\nEmail: ventas@autosphere.com`) }
const scheduleTestDrive = () => { router.push(`/citas?vehicle=${vehicle.value?.id}`) }
const goToHome = () => { router.push('/') }
const goToCatalog = () => { router.push('/vehiculos') }
const formatPrice = (price) => new Intl.NumberFormat('es-MX').format(price)
const formatNumber = (num) => new Intl.NumberFormat('es-MX').format(num)

onMounted(() => {
  currentImageIndex.value = 0
})
</script>

<style scoped src="./styles.css"></style>