<template>
  <div class="home-page">
    <!-- HERO SECTION — arranca desde y:0, el navbar flota encima con position:fixed -->
    <section id="hero" class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Autos en venta con excelentes precios<br />y la mejor calidad
        </h1>
        <p class="hero-subtitle">Marca y modelo</p>

        <!-- SEARCH BOX -->
        <div class="search-container">
          <div class="search-box">
            <div class="search-group">
              <label>Marca</label>
              <select v-model="searchFilters.make">
                <option value="">Seleccionar Marca</option>
                <option
                  v-for="brand in uniqueBrands"
                  :key="brand"
                  :value="brand"
                >
                  {{ brand }}
                </option>
              </select>
            </div>
            <div class="search-group">
              <label>Modelo</label>
              <select v-model="searchFilters.model">
                <option value="">Seleccionar Modelo</option>
                <option
                  v-for="model in uniqueModels"
                  :key="model"
                  :value="model"
                >
                  {{ model }}
                </option>
              </select>
            </div>
            <div class="search-group">
              <label>Año</label>
              <input
                v-model="searchFilters.year"
                type="text"
                placeholder="Año (opcional)"
              />
            </div>
            <button class="search-btn" @click="handleSearch">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21L16.65 16.65" />
              </svg>
              Buscar
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED LISTINGS -->
    <section id="cars" class="featured-section">
      <div class="featured-ambient featured-ambient-a"></div>
      <div class="featured-ambient featured-ambient-b"></div>
      <div class="section-container featured-shell">
        <p class="section-eyebrow">Selección destacada</p>
        <h2 class="section-title">Listados en tendencia</h2>

        <div class="cars-grid">
          <div
            v-for="car in displayedCars"
            :key="car.id"
            class="car-card"
            @click="viewCarDetail(car.id)"
          >
            <div class="car-image">
              <img
                :src="getOptimizedImageUrl(car.coverImage)"
                :alt="car.model"
                loading="lazy"
              />
              <div class="car-badge">{{ getModeTag(car) }}</div>
              <div class="car-chip">{{ getPriceHint(car) }}</div>
            </div>
            <div class="car-content">
              <div class="car-header">
                <span class="car-model">{{ getCarTitle(car) }}</span>
                <span class="car-price">{{ formatListingPrice(car) }}</span>
              </div>
              <div class="car-meta-row">
                <span class="car-year">{{ car.year }}</span>
                <span class="car-meta-separator">•</span>
                <span class="car-mode-label">{{ getModeDescription(car) }}</span>
              </div>
              <div class="car-actions">
                <button class="btn-view" @click.stop="viewDetail(car.id)">
                  Ver Detalles
                </button>
                <button class="btn-contact" @click.stop="contactSeller(car.id)">
                  Contactar
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          v-if="filteredCars.length > perPage"
          class="carousel-next"
          @click="nextPage"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M9 18L15 12L9 6" />
          </svg>
        </button>
      </div>
    </section>

    <!-- TRUST SECTION -->
    <section id="about" class="trust-section">
      <div class="section-container">
        <h2 class="trust-title">
          Descubre por qué inspira la
          <span class="highlight">propuesta</span>
          de AutoSphere
        </h2>

        <div class="reviews-grid">
          <article v-for="review in reviews" :key="review.id" class="review-card">
            <div class="review-source-row">
              <div class="review-source-badge">{{ review.initials }}</div>
              <div class="reviewer-info">
                <div class="reviewer-name">{{ review.title }}</div>
                <div class="reviewer-role">{{ review.outlet }}</div>
              </div>
            </div>
            <p class="review-text">“{{ review.text }}”</p>
            <div class="review-source-meta">
              <span class="review-source-pill">{{ review.type }}</span>
              <span class="review-source-link">{{ review.source }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getHomePage } from '../../../services/public.js';

const router = useRouter();

const searchFilters = ref({
  make: '',
  model: '',
  year: '',
});

const currentPage = ref(0);
const perPage = 3;
const featuredCars = ref([]);
const reviews = ref([]);

const loadHome = async () => {
  const page = await getHomePage();
  featuredCars.value = page?.featuredListings || [];
  reviews.value = page?.testimonials || [];
};

onMounted(loadHome);

const allVehicles = computed(() => featuredCars.value);

const uniqueBrands = computed(() => {
  const brands = allVehicles.value.map((vehicle) => vehicle.brand).filter(Boolean);
  return [...new Set(brands)].sort();
});

const uniqueModels = computed(() => {
  const models = allVehicles.value
    .filter((vehicle) => {
      return !searchFilters.value.make || vehicle.brand === searchFilters.value.make;
    })
    .map((vehicle) => vehicle.model)
    .filter(Boolean);
  return [...new Set(models)].sort();
});

watch(
  () => searchFilters.value.make,
  (nextBrand) => {
    if (!nextBrand) return;
    const modelStillValid = allVehicles.value.some(
      (vehicle) =>
        vehicle.brand === nextBrand && vehicle.model === searchFilters.value.model
    );
    if (!modelStillValid) {
      searchFilters.value.model = '';
    }
  }
);

const filteredCars = computed(() => {
  let result = [...allVehicles.value];

  if (searchFilters.value.make) {
    result = result.filter((vehicle) => vehicle.brand === searchFilters.value.make);
  }

  if (searchFilters.value.model) {
    result = result.filter((vehicle) => vehicle.model === searchFilters.value.model);
  }

  if (searchFilters.value.year) {
    result = result.filter(
      (vehicle) => String(vehicle.year) === String(searchFilters.value.year)
    );
  }

  return result;
});

const displayedCars = computed(() => {
  const start = currentPage.value * perPage;
  return filteredCars.value.slice(start, start + perPage);
});

const formatPrice = (price) => new Intl.NumberFormat('es-MX').format(price || 0);

const formatListingPrice = (car) => {
  if (car?.mode === 'rental') {
    return `$${formatPrice(car.pricePerDay || car.price)}/día`;
  }
  return `$${formatPrice(car?.price)}`;
};

const getPriceHint = (car) => {
  if (car?.mode === 'rental') {
    return 'Tarifa diaria';
  }
  return 'Precio de venta';
};

const getModeTag = (car) => (car?.mode === 'rental' ? 'Renta' : 'Venta');
const getModeDescription = (car) =>
  car?.mode === 'rental' ? 'Disponible para renta' : 'Publicación en venta';

const getOptimizedImageUrl = (url) => {
  if (!url) return 'https://placehold.co/800x600/2d5179/ffffff?text=AutoSphere';
  if (url.includes('unsplash.com')) {
    return `${url}?w=800&h=600&fit=crop&auto=format&q=80`;
  }
  return url;
};

const getCarTitle = (car) => {
  if (!car) return 'Vehículo AutoSphere';
  return car.title || `${car.brand} ${car.model} ${car.year}`;
};

const nextPage = () => {
  const totalPages = Math.ceil(filteredCars.value.length / perPage);
  if (totalPages > 0) {
    currentPage.value = (currentPage.value + 1) % totalPages;
  }
};

const handleSearch = () => {
  const query = {
    ...(searchFilters.value.make ? { brand: searchFilters.value.make } : {}),
    ...(searchFilters.value.model ? { q: searchFilters.value.model } : {}),
    ...(searchFilters.value.year ? { minYear: searchFilters.value.year, maxYear: searchFilters.value.year } : {}),
  };

  router.push({
    name: 'public-catalog',
    query,
  });
};

const viewCarDetail = (carId) => {
  router.push({
    name: 'public-listing-detail',
    params: { id: carId },
  });
};

const viewDetail = viewCarDetail;

const contactSeller = (carId) => {
  router.push({
    name: 'public-listing-detail',
    params: { id: carId },
  });
};
</script>

<style scoped src="./styles.css"></style>
