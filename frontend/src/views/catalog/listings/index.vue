<template>
  <div class="listados">
    <!-- MAIN CONTENT WITH SIDEBAR FILTERS -->
    <div class="main-layout">
      <!-- SIDEBAR FILTERS - IZQUIERDA -->
      <aside class="filters-sidebar">
        <h3 class="filters-title">Filtros</h3>
        <button class="clear-filters" @click="clearAllFilters">
          Limpiar todo
        </button>

        <!-- FILTRO POR PRECIO -->
        <div class="filter-section">
          <div class="filter-header" @click="toggleSection('price')">
            <h4>Precio</h4>
            <span class="toggle-icon">{{
              expandedSections.price ? '−' : '+'
            }}</span>
          </div>
          <div v-show="expandedSections.price" class="filter-content">
            <div class="filter-option">
              <label>
                <input
                  v-model="priceOrder"
                  type="radio"
                  name="priceOrder"
                  value="lowToHigh"
                  @change="handlePriceChange"
                />
                <span>Menor a mayor</span>
              </label>
            </div>
            <div class="filter-option">
              <label>
                <input
                  v-model="priceOrder"
                  type="radio"
                  name="priceOrder"
                  value="highToLow"
                  @change="handlePriceChange"
                />
                <span>Mayor a menor</span>
              </label>
            </div>
          </div>
        </div>

        <!-- FILTRO POR AÑO -->
        <div class="filter-section">
          <div class="filter-header" @click="toggleSection('year')">
            <h4>Año</h4>
            <span class="toggle-icon">{{
              expandedSections.year ? '−' : '+'
            }}</span>
          </div>
          <div v-show="expandedSections.year" class="filter-content">
            <div class="filter-option">
              <label>
                <input
                  v-model="yearOrder"
                  type="radio"
                  name="yearOrder"
                  value="newToOld"
                  @change="handleYearChange"
                />
                <span>Más reciente primero</span>
              </label>
            </div>
            <div class="filter-option">
              <label>
                <input
                  v-model="yearOrder"
                  type="radio"
                  name="yearOrder"
                  value="oldToNew"
                  @change="handleYearChange"
                />
                <span>Más antiguo primero</span>
              </label>
            </div>
          </div>
        </div>

        <!-- FILTRO POR MARCA -->
        <div class="filter-section">
          <div class="filter-header" @click="toggleSection('brand')">
            <h4>Marca</h4>
            <span class="toggle-icon">{{
              expandedSections.brand ? '−' : '+'
            }}</span>
          </div>
          <div v-show="expandedSections.brand" class="filter-content">
            <div class="filter-search">
              <input
                v-model="brandSearch"
                type="text"
                placeholder="Buscar marca..."
                class="brand-search-input"
              />
            </div>
            <div class="brand-list">
              <div
                v-for="brandOption in filteredBrands"
                :key="brandOption"
                class="filter-option"
              >
                <label>
                  <input
                    v-model="selectedBrands"
                    type="checkbox"
                    :value="brandOption"
                  />
                  <span
                    >{{ brandOption }} ({{ getBrandCount(brandOption) }})</span
                  >
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- FILTRO POR TIPO DE VEHÍCULO -->
        <div class="filter-section">
          <div class="filter-header" @click="toggleSection('type')">
            <h4>Tipo de Vehículo</h4>
            <span class="toggle-icon">{{
              expandedSections.type ? '−' : '+'
            }}</span>
          </div>
          <div v-show="expandedSections.type" class="filter-content">
            <div v-for="type in uniqueTypes" :key="type" class="filter-option">
              <label>
                <input v-model="selectedTypes" type="checkbox" :value="type" />
                <span>{{ type }} ({{ getTypeCount(type) }})</span>
              </label>
            </div>
          </div>
        </div>

        <!-- FILTRO POR CIUDAD -->
        <div class="filter-section">
          <div class="filter-header" @click="toggleSection('city')">
            <h4>Ciudad</h4>
            <span class="toggle-icon">{{
              expandedSections.city ? '−' : '+'
            }}</span>
          </div>
          <div v-show="expandedSections.city" class="filter-content">
            <div v-for="city in uniqueCities" :key="city" class="filter-option">
              <label>
                <input v-model="selectedCities" type="checkbox" :value="city" />
                <span>{{ city }}</span>
              </label>
            </div>
          </div>
        </div>
      </aside>

      <!-- CONTENT - DERECHA -->
      <section class="content">
        <div class="content-header">
          <h2 class="subtitle">
            Lista de autos ({{ filteredVehicles.length }} vehículos)
          </h2>

          <!-- SORTING DROPDOWN -->
          <select
            v-model="sortMethod"
            class="mobile-sort"
            @change="handleSortChange"
          >
            <option value="">Ordenar por</option>
            <option value="price">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="year">Año: más reciente</option>
            <option value="year-asc">Año: más antiguo</option>
          </select>
        </div>

        <!-- ACTIVE FILTERS -->
        <div v-if="hasActiveFilters" class="active-filters">
          <span
            v-for="filter in activeFilters"
            :key="filter"
            class="active-filter"
          >
            {{ filter }}
            <button @click="removeFilter(filter)">×</button>
          </span>
          <button class="clear-all-btn" @click="clearAllFilters">
            Limpiar todo
          </button>
        </div>

        <!-- CARS GRID CON IMÁGENES OPTIMIZADAS -->
        <div class="cars-grid">
          <div
            v-for="vehicle in filteredVehicles"
            :key="vehicle.id"
            class="car-card"
            @click="goToVehicleDetail(vehicle.id)"
          >
            <div class="image-container">
              <img
                :src="getOptimizedImageUrl(vehicle.coverImage)"
                :alt="vehicle.title"
                width="400"
                height="200"
                :class="{ 'image-loaded': imagesLoaded[vehicle.id] }"
                @error="handleImageError"
                @load="(e) => handleImageLoad(e, vehicle.id)"
              />
              <div v-if="!imagesLoaded[vehicle.id]" class="image-placeholder">
                <div class="placeholder-shimmer"></div>
              </div>
            </div>
            <h3>{{ vehicle.title }}</h3>
            <span class="status">${{ formatPrice(vehicle.price) }} MXN</span>
            <p>{{ getCityName(vehicle.cityId) }} · {{ vehicle.year }}</p>
            <div class="vehicle-details">
              <span class="detail-badge">{{ vehicle.type }}</span>
              <span class="detail-badge">{{ vehicle.transmission }}</span>
            </div>
          </div>
        </div>

        <div v-if="filteredVehicles.length === 0" class="no-results">
          <p>No se encontraron vehículos con los filtros seleccionados</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Estado para controlar la carga de imágenes
const imagesLoaded = ref({});

// Función para optimizar URLs de imágenes
const getOptimizedImageUrl = (url) => {
  if (!url) return 'https://placehold.co/400x200/2d3748/ffffff?text=Sin+imagen';
  if (url.includes('unsplash.com')) {
    return `${url}?w=400&h=200&fit=crop&auto=format&q=80`;
  }
  return url;
};

const handleImageLoad = (event, vehicleId) => {
  imagesLoaded.value[vehicleId] = true;
};

const handleImageError = (event) => {
  event.target.src =
    'https://placehold.co/400x200/2d3748/ffffff?text=Error+de+carga';
};

// Mapeo de IDs de ciudades a nombres
const cityNames = {
  'mx-cdmx': 'Ciudad de México',
  'mx-gdl': 'Guadalajara',
  'mx-mty': 'Monterrey',
  'mx-pue': 'Puebla',
  'mx-mer': 'Mérida',
};

const getCityName = (cityId) => {
  return cityNames[cityId] || cityId;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-MX').format(price);
};

// Search
const search = ref('');
const brandSearch = ref('');

// Filter sections expand/collapse
const expandedSections = ref({
  price: true,
  year: true,
  brand: true,
  type: false,
  city: false,
});

// Filter states
const priceOrder = ref('lowToHigh');
const yearOrder = ref('newToOld');
const selectedBrands = ref([]);
const selectedTypes = ref([]);
const selectedCities = ref([]);
const sortMethod = ref('');

// MOCKUP DATA - Base de datos de vehículos
const vehiclesData = ref({
  meta: {
    total: 7,
    page: 1,
    pageSize: 12,
  },
  items: [
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
      sellerId: 'u-seller-001',
      coverImage:
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8',
      status: 'published',
      color: 'Blanco',
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
      sellerId: 'u-seller-002',
      coverImage:
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
      status: 'published',
      color: 'Gris',
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
      sellerId: 'u-seller-002',
      coverImage:
        'https://images.unsplash.com/photo-1511919884226-fd3cad34687c',
      status: 'published',
      color: 'Azul',
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
      sellerId: 'u-seller-001',
      coverImage:
        'https://images.unsplash.com/photo-1502877338535-766e1452684a',
      status: 'published',
      color: 'Negro',
    },
    {
      id: 'vh-006',
      title: 'Nissan NP300 2021',
      brand: 'Nissan',
      model: 'NP300',
      year: 2021,
      price: 395000,
      type: 'Pickup',
      transmission: 'Manual',
      fuel: 'Diésel',
      mileageKm: 50300,
      cityId: 'mx-mer',
      sellerId: 'u-seller-002',
      coverImage:
        'https://images.unsplash.com/photo-1504215680853-026ed2a45def',
      status: 'draft',
      color: 'Plata',
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
      sellerId: 'u-seller-001',
      coverImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d',
      status: 'published',
      color: 'Gris',
    },
    {
      id: 'vh-008',
      title: 'Chevrolet Onix LT 2021',
      brand: 'Chevrolet',
      model: 'Onix',
      year: 2021,
      price: 255000,
      type: 'Sedán',
      transmission: 'Manual',
      fuel: 'Gasolina',
      mileageKm: 38750,
      cityId: 'mx-pue',
      sellerId: 'u-seller-002',
      coverImage:
        'https://images.unsplash.com/photo-1489824904134-891ab64532f1',
      status: 'archived',
      color: 'Blanco',
    },
  ],
});

// Solo mostrar vehículos publicados
const vehicles = computed(() => {
  return vehiclesData.value.items.filter((v) => v.status === 'published');
});

// Pre-cargar imágenes en memoria
onMounted(() => {
  vehicles.value.forEach((vehicle) => {
    const img = new Image();
    img.src = getOptimizedImageUrl(vehicle.coverImage);
  });
});

// Get unique brands
const uniqueBrands = computed(() => {
  return [...new Set(vehicles.value.map((v) => v.brand))].sort();
});

// Get unique types
const uniqueTypes = computed(() => {
  return [...new Set(vehicles.value.map((v) => v.type))].sort();
});

// Get unique cities
const uniqueCities = computed(() => {
  return [...new Set(vehicles.value.map((v) => getCityName(v.cityId)))].sort();
});

// Filter brands based on search
const filteredBrands = computed(() => {
  if (!brandSearch.value) return uniqueBrands.value;
  return uniqueBrands.value.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.value.toLowerCase())
  );
});

// Get count of vehicles per brand
const getBrandCount = (brand) => {
  return vehicles.value.filter((v) => v.brand === brand).length;
};

// Get count of vehicles per type
const getTypeCount = (type) => {
  return vehicles.value.filter((v) => v.type === type).length;
};

// Handlers to sync radio buttons with select
const handlePriceChange = () => {
  if (priceOrder.value === 'lowToHigh') {
    sortMethod.value = 'price';
  } else if (priceOrder.value === 'highToLow') {
    sortMethod.value = 'price-desc';
  }
};

const handleYearChange = () => {
  if (yearOrder.value === 'newToOld') {
    sortMethod.value = 'year';
  } else if (yearOrder.value === 'oldToNew') {
    sortMethod.value = 'year-asc';
  }
};

const handleSortChange = () => {
  if (sortMethod.value === 'price') {
    priceOrder.value = 'lowToHigh';
  } else if (sortMethod.value === 'price-desc') {
    priceOrder.value = 'highToLow';
  } else if (sortMethod.value === 'year') {
    yearOrder.value = 'newToOld';
  } else if (sortMethod.value === 'year-asc') {
    yearOrder.value = 'oldToNew';
  } else {
    priceOrder.value = 'lowToHigh';
    yearOrder.value = 'newToOld';
  }
};

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return (
    selectedBrands.value.length > 0 ||
    selectedTypes.value.length > 0 ||
    selectedCities.value.length > 0 ||
    search.value ||
    priceOrder.value !== 'lowToHigh' ||
    yearOrder.value !== 'newToOld'
  );
});

// Get active filters for display
const activeFilters = computed(() => {
  const filters = [];
  if (search.value) filters.push(`Búsqueda: ${search.value}`);
  if (selectedBrands.value.length)
    filters.push(`${selectedBrands.value.length} marcas seleccionadas`);
  if (selectedTypes.value.length)
    filters.push(`${selectedTypes.value.length} tipos seleccionados`);
  if (selectedCities.value.length)
    filters.push(`${selectedCities.value.length} ciudades`);
  if (priceOrder.value === 'highToLow') filters.push('Precio: mayor a menor');
  if (yearOrder.value === 'oldToNew') filters.push('Año: más antiguo');
  return filters;
});

// Toggle filter sections
const toggleSection = (section) => {
  expandedSections.value[section] = !expandedSections.value[section];
};

// Clear all filters
const clearAllFilters = () => {
  search.value = '';
  brandSearch.value = '';
  priceOrder.value = 'lowToHigh';
  yearOrder.value = 'newToOld';
  selectedBrands.value = [];
  selectedTypes.value = [];
  selectedCities.value = [];
  sortMethod.value = '';
};

// Remove specific filter
const removeFilter = (filter) => {
  if (filter.includes('Búsqueda')) search.value = '';
  if (filter.includes('marcas')) selectedBrands.value = [];
  if (filter.includes('tipos')) selectedTypes.value = [];
  if (filter.includes('ciudades')) selectedCities.value = [];
  if (filter.includes('Precio')) {
    priceOrder.value = 'lowToHigh';
    sortMethod.value = '';
  }
  if (filter.includes('Año')) {
    yearOrder.value = 'newToOld';
    sortMethod.value = '';
  }
};

// FUNCIÓN PRINCIPAL: Navegar al detalle del vehículo
// Asegúrate que el nombre de la ruta coincida con el definido en router
const goToVehicleDetail = (vehicleId) => {
  console.log('Navegando a detalle del vehículo:', vehicleId);
  router.push({
    name: 'public-listing-detail', // Asegúrate que esta ruta exista en tu router
    params: { id: vehicleId },
  });
};

// Filtered vehicles
const filteredVehicles = computed(() => {
  let result = vehicles.value;

  // Search by title
  if (search.value) {
    result = result.filter((v) =>
      v.title.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  // Filter by selected brands
  if (selectedBrands.value.length > 0) {
    result = result.filter((v) => selectedBrands.value.includes(v.brand));
  }

  // Filter by selected types
  if (selectedTypes.value.length > 0) {
    result = result.filter((v) => selectedTypes.value.includes(v.type));
  }

  // Filter by selected cities
  if (selectedCities.value.length > 0) {
    result = result.filter((v) =>
      selectedCities.value.includes(getCityName(v.cityId))
    );
  }

  // Apply sorting
  if (sortMethod.value === 'price') {
    result = [...result].sort((a, b) => a.price - b.price);
  } else if (sortMethod.value === 'price-desc') {
    result = [...result].sort((a, b) => b.price - a.price);
  } else if (sortMethod.value === 'year') {
    result = [...result].sort((a, b) => b.year - a.year);
  } else if (sortMethod.value === 'year-asc') {
    result = [...result].sort((a, b) => a.year - b.year);
  }

  return result;
});
</script>

<style scoped src="./styles.css"></style>
