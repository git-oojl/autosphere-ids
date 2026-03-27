<template>
  <div v-if="vehicle" class="vehicle-detail-page">
    <!-- HERO SECTION -->
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
      <!-- Price Card -->
      <div class="price-card">
        <div class="price-header">
          <div>
            <p class="price-label">Precio de venta</p>
            <h2 class="price-value">
              ${{ formatPrice(vehicle.price) }}
              <span class="price-currency">MXN</span>
            </h2>
            <p v-if="monthlyPayment" class="price-financing">
              Desde ${{ formatPrice(monthlyPayment) }}/mes con financiamiento*
            </p>
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
              <p class="spec-value">{{ formatNumber(vehicle.mileageKm) }} km</p>
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
              <p class="spec-value">{{ vehicle.fuel }}</p>
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
              <p class="spec-value">{{ vehicle.transmission }}</p>
            </div>
          </div>
        </div>

        <!-- CTA Buttons -->
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
            Agendar Prueba
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
            Contactar Vendedor
          </button>
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
            Vendedor
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// STATE
const currentImageIndex = ref(0);
const showDetails = ref(false);
const isFavorite = ref(false);

const vehicle = computed(() => {
  const id = route.params.id;
  return vehiclesDatabase.value.find((v) => v.id === id) || null;
});

watch(
  vehicle,
  (found) => {
    if (!found) router.replace('/vehiculos');
  },
  { immediate: true }
);

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

// DATABASE (MANTENER INTACTA)
const vehiclesDatabase = ref([
  {
    id: 'vh-001',
    title: 'Mazda CX-5 i Grand Touring 2021',
    brand: 'Mazda',
    model: 'CX-5',
    year: 2021,
    price: 478000,
    type: 'SUV',
    transmission: 'Automática',
    fuel: 'Gasolina',
    mileageKm: 42500,
    cityId: 'mx-cdmx',
    coverImage: 'https://images.unsplash.com/photo-1549399812-1d87fd4a2a28',
    status: 'published',
    color: 'Rojo',
    condition: 'Seminuevo',
    horsepower: 187,
    engine: 2.5,
    cylinders: 4,
    doors: 5,
    description:
      'Mazda CX-5 i Grand Touring 2021, SUV compacta premium. Equipamiento completo, único dueño, servicios en agencia.',
    features: [
      'Asientos de piel',
      'Pantalla táctil',
      'Cámara de reversa',
      'Sensores de estacionamiento',
      'Control crucero',
      'Bluetooth',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1549399812-1d87fd4a2a28',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    ],
    sellerProfile: {
      displayName: 'Auto Premium Sur',
      rating: 4.8,
      verified: true,
      responseTime: 'Menos de 1 hora',
      activeListings: 12,
    },
    location: { city: 'Ciudad de México', state: 'CDMX' },
  },
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
    condition: 'Seminuevo',
    horsepower: 140,
    engine: 1.8,
    cylinders: 4,
    doors: 4,
    description:
      'Toyota Corolla LE 2020, sedán confiable y económico. Excelente rendimiento de combustible y mantenimiento reciente.',
    features: [
      'Frenos ABS',
      'Airbags',
      'Aire acondicionado',
      'Dirección eléctrica',
      'Radio AM/FM',
      'USB',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
    ],
    sellerProfile: {
      displayName: 'Autos Confiables Occidente',
      rating: 4.6,
      verified: true,
      responseTime: 'Menos de 2 horas',
      activeListings: 8,
    },
    location: { city: 'Guadalajara', state: 'Jalisco' },
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
    horsepower: 200,
    engine: 2.0,
    cylinders: 4,
    doors: 4,
    description:
      'Ford Ranger XLT 2022, pickup robusta y potente. Ideal para trabajo y aventura. Impecable estado.',
    features: [
      'Tracción 4x4',
      'Caja de carga',
      'Control de tracción',
      'Pantalla 8"',
      'Sistema SYNC',
      'Asistente de pendiente',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    ],
    sellerProfile: {
      displayName: 'Pickups del Norte',
      rating: 4.9,
      verified: true,
      responseTime: 'Menos de 1 hora',
      activeListings: 6,
    },
    location: { city: 'Monterrey', state: 'Nuevo León' },
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
    condition: 'Seminuevo',
    horsepower: 120,
    engine: 1.6,
    cylinders: 4,
    doors: 5,
    description:
      'Kia Rio Hatchback 2019, compacto y eficiente. Perfecto para la ciudad con excelente rendimiento de combustible.',
    features: [
      'Bluetooth',
      'Aire acondicionado',
      'Dirección eléctrica',
      'Vidrios eléctricos',
      'Cierre centralizado',
      'Airbags',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800',
    ],
    sellerProfile: {
      displayName: 'Seminuevos La Roca',
      rating: 4.4,
      verified: true,
      responseTime: 'Menos de 2 horas',
      activeListings: 4,
    },
    location: { city: 'Puebla', state: 'Puebla' },
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
    description:
      'Volkswagen Jetta Comfortline 2023, sedán elegante y tecnológico. Excelente desempeño y confort. Único dueño.',
    features: [
      'Pantalla 8"',
      'Apple CarPlay',
      'Android Auto',
      'Asientos calefactables',
      'Control crucero adaptativo',
      'Sensores de estacionamiento',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a',
      'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    ],
    sellerProfile: {
      displayName: 'Auto Select Norte',
      rating: 4.7,
      verified: true,
      responseTime: 'Menos de 2 horas',
      activeListings: 4,
    },
    location: { city: 'Ciudad de México', state: 'CDMX' },
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
    description:
      'Honda CR-V Touring 2022, SUV familiar con amplio espacio y tecnología de punta. Excelente para viajes largos.',
    features: [
      'Asientos de piel',
      'Techo panorámico',
      'Cámara 360°',
      'Navegación',
      'Control crucero adaptativo',
      'Asistente de carril',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d',
      'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    ],
    sellerProfile: {
      displayName: 'Auto Select Norte',
      rating: 4.7,
      verified: true,
      responseTime: 'Menos de 2 horas',
      activeListings: 4,
    },
    location: { city: 'Guadalajara', state: 'Jalisco' },
  },
]);

const thumbnailImages = computed(
  () => vehicle.value?.gallery || [vehicle.value?.coverImage]
);
const vehicleBadge = computed(() => vehicle.value?.condition || 'Certificado');
const vehicleInfoItems = computed(() => [
  { label: 'Marca', value: vehicle.value?.brand },
  { label: 'Modelo', value: vehicle.value?.model },
  { label: 'Año', value: vehicle.value?.year },
  {
    label: 'Kilometraje',
    value: vehicle.value?.mileageKm
      ? formatNumber(vehicle.value.mileageKm) + ' km'
      : '—',
  },
  { label: 'Transmisión', value: vehicle.value?.transmission },
  { label: 'Combustible', value: vehicle.value?.fuel },
  { label: 'Color', value: vehicle.value?.color },
  { label: 'Puertas', value: vehicle.value?.doors || '4' },
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
const sellerName = computed(
  () => vehicle.value?.sellerProfile?.displayName || 'AutoSphere Certified'
);
const sellerRating = computed(
  () => vehicle.value?.sellerProfile?.rating || 4.8
);
const sellerVerified = computed(
  () => vehicle.value?.sellerProfile?.verified !== false
);
const monthlyPayment = computed(() => {
  if (!vehicle.value?.price) return null;
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
    `Contactando a ${sellerName.value}...\nTeléfono: 800-123-4567\nEmail: ventas@autosphere.com`
  );
};
const scheduleTestDrive = () => {
  router.push(`/citas?vehicle=${vehicle.value?.id}`);
};
//const goToHome = () => {
//  router.push('/');
//};
//const goToCatalog = () => {
//  router.push('/vehiculos');
//};
const formatPrice = (price) => new Intl.NumberFormat('es-MX').format(price);
const formatNumber = (num) => new Intl.NumberFormat('es-MX').format(num);

onMounted(() => {
  currentImageIndex.value = 0;
});
</script>

<style scoped src="./styles.css"></style>
