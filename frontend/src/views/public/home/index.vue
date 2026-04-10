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
      <div class="section-container">
        <h2 class="section-title">Listados Destacados</h2>

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
              <div class="car-badge">{{ car.condition || 'CERTIFIED' }}</div>
            </div>
            <div class="car-content">
              <div class="car-header">
                <span class="car-model">{{ getCarTitle(car) }}</span>
                <span class="car-price">${{ formatPrice(car.price) }}</span>
              </div>
              <div class="car-year">{{ car.year }}</div>
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
          Descubre por qué más de
          <span class="highlight">300,000 clientes</span>
          ya confiaron en AutoSphere
        </h2>

        <div class="reviews-grid">
          <div v-for="review in reviews" :key="review.id" class="review-card">
            <div class="reviewer-header">
              <img
                class="reviewer-avatar"
                :src="review.avatar"
                :alt="review.name"
              />
              <div class="reviewer-info">
                <div class="reviewer-name">{{ review.name }}</div>
                <div class="reviewer-role">{{ review.role }}</div>
              </div>
            </div>
            <p class="review-text">{{ review.text }}</p>
            <div class="review-stars">
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
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

// IMPORTAR DATOS DESDE JSON
// Ajusta la ruta según la ubicación real de tu archivo listings.json
import listingsData from '../../../mocks/catalog/listings.json';

const router = useRouter();

// ESTADO
const searchFilters = ref({
  make: '',
  model: '',
  year: '',
});

const currentPage = ref(0);
const perPage = 3;

// RESEÑAS (se mantienen igual)
const reviews = ref([
  {
    id: 1,
    name: 'Mariana L.',
    role: 'Vendedora',
    avatar: 'https://i.pravatar.cc/100?img=47',
    text: 'He confiado en la plataforma perfecta para conectarme con compradores. El proceso de comunicación con los vendedores fue directo y transparente. Fue fácil y me llevó desde el inicio hasta el cierre de la compra.',
  },
  {
    id: 2,
    name: 'Juan M.',
    role: 'Comprador',
    avatar: 'https://i.pravatar.cc/100?img=12',
    text: 'Publicar mi auto fue súper sencillo. En menos de una hora ya tenía respuestas. La plataforma me guió para agregar todos los detalles. Recibí mensajes de compradores interesados en pocos días y logré vender rápido.',
  },
  {
    id: 3,
    name: 'Carlos M.',
    role: 'Comprador',
    avatar: 'https://i.pravatar.cc/100?img=25',
    text: 'La verdad me sorprendió lo fácil que fue encontrar el auto que quería. La página tiene buenos filtros para detallar mi búsqueda. Pude contactar al vendedor directamente. El proceso fue rápido y sin complicaciones.',
  },
]);

// OBTENER VEHÍCULOS DEL MOCK (solo los publicados)
const allVehicles = computed(() => {
  const items = listingsData.items || [];
  // Filtrar solo los que tienen status 'published'
  return items.filter((vehicle) => vehicle.status === 'published');
});

// Obtener marcas únicas para el filtro
const uniqueBrands = computed(() => {
  const brands = allVehicles.value.map((v) => v.brand);
  return [...new Set(brands)].sort();
});

// Obtener modelos únicos para el filtro
const uniqueModels = computed(() => {
  const models = allVehicles.value.map((v) => v.model);
  return [...new Set(models)].sort();
});

// Filtrar vehículos según los filtros de búsqueda
const filteredCars = computed(() => {
  let result = [...allVehicles.value];

  if (searchFilters.value.make) {
    result = result.filter((v) => v.brand === searchFilters.value.make);
  }
  if (searchFilters.value.model) {
    result = result.filter((v) => v.model === searchFilters.value.model);
  }

  if (searchFilters.value.year) {
    result = result.filter(
      (v) => String(v.year) === String(searchFilters.value.year)
    );
  }

  return result;
});

// Vehículos mostrados en la página actual (paginación)
const displayedCars = computed(() => {
  const start = currentPage.value * perPage;
  return filteredCars.value.slice(start, start + perPage);
});

// HELPERS
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-MX').format(price);
};

const getOptimizedImageUrl = (url) => {
  if (!url) return 'https://placehold.co/800x600/2d5179/ffffff?text=AutoSphere';
  if (url.includes('unsplash.com'))
    return `${url}?w=800&h=600&fit=crop&auto=format&q=80`;
  return url;
};

// Obtener título del vehículo (marca + modelo)
const getCarTitle = (car) => {
  return `${car.brand} ${car.model} ${car.year}`;
};

// MÉTODOS
const nextPage = () => {
  const totalPages = Math.ceil(filteredCars.value.length / perPage);
  if (totalPages > 0) {
    currentPage.value = (currentPage.value + 1) % totalPages;
  }
};

const handleSearch = () => {
  router.push({
    name: 'public-catalog',
    query: searchFilters.value,
  });
};

const viewCarDetail = (carId) => {
  router.push({
    name: 'public-listings-detail',
    params: { id: carId },
  });
};

const viewDetail = (carId) => {
  router.push({
    name: 'public-listings-detail',
    params: { id: carId },
  });
};

const contactSeller = (carId) => {
  console.log('Contactar vendedor:', carId);
  alert(`Contactando al vendedor del vehículo ${carId}`);
};
</script>

<style scoped src="./styles.css"></style>
