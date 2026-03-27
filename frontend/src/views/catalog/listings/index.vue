<template>
  <div class="listados">
    <br />
    <br />
    <br />

    <!-- MAIN CONTENT WITH SIDEBAR FILTERS -->
    <div class="main-layout">
      <!-- SIDEBAR FILTERS -->
      <aside class="filters-sidebar">
        <div class="mode-toggle-wrapper">
          <div class="mode-toggle">
            <button
              class="mode-btn"
              :class="{ active: listingMode === 'venta' }"
              @click="switchMode('venta')"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Comprar
            </button>
            <button
              class="mode-btn"
              :class="{ active: listingMode === 'renta' }"
              @click="switchMode('renta')"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Rentar
            </button>
            <div
              class="mode-indicator"
              :class="listingMode === 'renta' ? 'right' : 'left'"
            ></div>
          </div>
        </div>
        <h3 class="filters-title">Filtros</h3>
        <button class="clear-filters" @click="clearAllFilters">
          Limpiar todo
        </button>

        <!-- FILTRO PRECIO (VENTA) -->
        <div v-if="listingMode === 'venta'" class="filter-section">
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

        <!-- FILTRO PRECIO POR DÍA (RENTA) -->
        <div v-if="listingMode === 'renta'" class="filter-section">
          <div class="filter-header" @click="toggleSection('rentPrice')">
            <h4>Precio por día</h4>
            <span class="toggle-icon">{{
              expandedSections.rentPrice ? '−' : '+'
            }}</span>
          </div>
          <div v-show="expandedSections.rentPrice" class="filter-content">
            <div class="filter-option">
              <label>
                <input
                  v-model="priceOrder"
                  type="radio"
                  name="rentPriceOrder"
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
                  name="rentPriceOrder"
                  value="highToLow"
                  @change="handlePriceChange"
                />
                <span>Mayor a menor</span>
              </label>
            </div>
          </div>
        </div>

        <!-- FILTRO DISPONIBILIDAD (RENTA) -->
        <div v-if="listingMode === 'renta'" class="filter-section">
          <div class="filter-header" @click="toggleSection('availability')">
            <h4>Disponibilidad</h4>
            <span class="toggle-icon">{{
              expandedSections.availability ? '−' : '+'
            }}</span>
          </div>
          <div v-show="expandedSections.availability" class="filter-content">
            <div class="date-range-filter">
              <label class="date-label">Desde</label>
              <input
                v-model="availableFrom"
                type="date"
                class="date-input"
                :min="today"
              />
              <label class="date-label">Hasta</label>
              <input
                v-model="availableTo"
                type="date"
                class="date-input"
                :min="availableFrom || today"
              />
            </div>
          </div>
        </div>

        <!-- FILTRO DEPÓSITO (RENTA) -->
        <div v-if="listingMode === 'renta'" class="filter-section">
          <div class="filter-header" @click="toggleSection('deposit')">
            <h4>Depósito máximo</h4>
            <span class="toggle-icon">{{
              expandedSections.deposit ? '−' : '+'
            }}</span>
          </div>
          <div v-show="expandedSections.deposit" class="filter-content">
            <div
              v-for="dep in depositRanges"
              :key="dep.value"
              class="filter-option"
            >
              <label>
                <input
                  v-model="maxDeposit"
                  type="radio"
                  name="depositRange"
                  :value="dep.value"
                />
                <span>{{ dep.label }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- FILTRO KM INCLUIDOS (RENTA) -->
        <div v-if="listingMode === 'renta'" class="filter-section">
          <div class="filter-header" @click="toggleSection('kmIncluded')">
            <h4>Km incluidos / día</h4>
            <span class="toggle-icon">{{
              expandedSections.kmIncluded ? '−' : '+'
            }}</span>
          </div>
          <div v-show="expandedSections.kmIncluded" class="filter-content">
            <div v-for="km in kmOptions" :key="km.value" class="filter-option">
              <label>
                <input
                  v-model="minKmIncluded"
                  type="radio"
                  name="kmIncluded"
                  :value="km.value"
                />
                <span>{{ km.label }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- FILTRO AÑO -->
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

        <!-- FILTRO MARCA -->
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

        <!-- FILTRO TIPO -->
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

        <!-- FILTRO CIUDAD -->
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

      <!-- CONTENT -->
      <section class="content">
        <div class="content-header">
          <div>
            <h2 class="subtitle">
              {{
                listingMode === 'venta' ? 'Autos en venta' : 'Autos en renta'
              }}
              <span class="count-badge">{{ filteredVehicles.length }}</span>
            </h2>
            <p class="mode-description">
              {{
                listingMode === 'venta'
                  ? 'Encuentra el auto perfecto para comprar'
                  : 'Renta por día, semana o mes con todo incluido'
              }}
            </p>
          </div>
          <select
            v-model="sortMethod"
            class="mobile-sort"
            @change="handleSortChange"
          >
            <option value="">Ordenar por</option>
            <option value="price">
              {{
                listingMode === 'renta'
                  ? 'Precio/día: menor a mayor'
                  : 'Precio: menor a mayor'
              }}
            </option>
            <option value="price-desc">
              {{
                listingMode === 'renta'
                  ? 'Precio/día: mayor a menor'
                  : 'Precio: mayor a menor'
              }}
            </option>
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

        <!-- ── GRID VENTA ── -->
        <div v-if="listingMode === 'venta'" class="cars-grid">
          <div
            v-for="vehicle in filteredVehicles"
            :key="vehicle.id"
            class="car-card"
            @click="goToVehicleDetail(vehicle.id)"
          >
            <div class="image-container">
              <div class="listing-type-badge sale-badge">En Venta</div>
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
            <div class="card-body">
              <h3>{{ vehicle.title }}</h3>
              <div class="price-row">
                <span class="sale-price"
                  >${{ formatPrice(vehicle.price) }}</span
                >
                <span class="price-label">MXN</span>
              </div>
              <p class="card-meta">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {{ getCityName(vehicle.cityId) }} · {{ vehicle.year }}
              </p>
              <div class="vehicle-details">
                <span class="detail-badge">{{ vehicle.type }}</span>
                <span class="detail-badge">{{ vehicle.transmission }}</span>
                <span class="detail-badge"
                  >{{ formatMileage(vehicle.mileageKm) }} km</span
                >
              </div>
            </div>
          </div>

          <div v-if="filteredVehicles.length === 0" class="no-results">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              stroke-width="1.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <p>No se encontraron vehículos con los filtros seleccionados</p>
          </div>
        </div>

        <!-- ── GRID RENTA ── -->
        <div v-if="listingMode === 'renta'" class="cars-grid">
          <div
            v-for="vehicle in filteredVehicles"
            :key="vehicle.id"
            class="car-card rent-card"
            @click="goToVehicleDetail(vehicle.id)"
          >
            <!-- IMAGEN CON BADGES -->
            <div class="image-container">
              <div class="listing-type-badge rent-badge">En Renta</div>
              <div
                class="availability-chip"
                :class="vehicle.available ? 'avail-yes' : 'avail-no'"
              >
                <span class="avail-dot"></span>
                {{ vehicle.available ? 'Disponible' : 'No disponible' }}
              </div>
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

            <!-- CUERPO RENTA -->
            <div class="card-body">
              <h3>{{ vehicle.title }}</h3>

              <!-- PRECIOS DÍA / SEMANA / MES -->
              <div class="rent-prices">
                <div class="rent-price-item primary-price">
                  <span class="rp-value"
                    >${{ formatPrice(vehicle.pricePerDay) }}</span
                  >
                  <span class="rp-unit">/día</span>
                </div>
                <div class="rp-separator"></div>
                <div class="rent-price-item">
                  <span class="rp-value sm"
                    >${{ formatPrice(vehicle.pricePerWeek) }}</span
                  >
                  <span class="rp-unit">/sem</span>
                </div>
                <div class="rp-separator"></div>
                <div class="rent-price-item">
                  <span class="rp-value sm"
                    >${{ formatPrice(vehicle.pricePerMonth) }}</span
                  >
                  <span class="rp-unit">/mes</span>
                </div>
              </div>

              <!-- INFO GRID RENTA -->
              <div class="rent-info-grid">
                <div class="rent-info-item">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span
                    >Disponible desde
                    <strong>{{
                      formatDate(vehicle.availableFrom)
                    }}</strong></span
                  >
                </div>
                <div class="rent-info-item">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span
                    >Depósito
                    <strong
                      >${{ formatPrice(vehicle.depositAmount) }} MXN</strong
                    ></span
                  >
                </div>
                <div class="rent-info-item">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span
                    ><strong>{{ vehicle.kmIncludedPerDay }} km</strong>
                    incluidos/día</span
                  >
                </div>
                <div class="rent-info-item">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{{ getCityName(vehicle.cityId) }}</span>
                </div>
              </div>

              <div class="vehicle-details">
                <span class="detail-badge">{{ vehicle.type }}</span>
                <span class="detail-badge">{{ vehicle.transmission }}</span>
                <span class="detail-badge">{{ vehicle.year }}</span>
              </div>
            </div>
          </div>

          <div v-if="filteredVehicles.length === 0" class="no-results">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              stroke-width="1.5"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <p>No se encontraron autos en renta con esos filtros</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// IMPORTAR DATOS DESDE JSON
import salesData from '../../../mocks/catalog/listings.json';
import rentalsData from '../../../mocks/catalog/rentals.json';

const router = useRouter();

// ─── MODE ──────────────────────────────────────────────────────────────────────
const listingMode = ref('venta'); // 'venta' | 'renta'

const switchMode = (mode) => {
  listingMode.value = mode;
  clearAllFilters();
};

// ─── IMAGE HANDLING ────────────────────────────────────────────────────────────
const imagesLoaded = ref({});

const getOptimizedImageUrl = (url) => {
  if (!url) return 'https://placehold.co/400x200/2d3748/ffffff?text=Sin+imagen';
  if (url.includes('unsplash.com'))
    return `${url}?w=400&h=200&fit=crop&auto=format&q=80`;
  return url;
};
const handleImageLoad = (event, vehicleId) => {
  imagesLoaded.value[vehicleId] = true;
};
const handleImageError = (event) => {
  event.target.src =
    'https://placehold.co/400x200/2d3748/ffffff?text=Error+de+carga';
};

// ─── HELPERS ───────────────────────────────────────────────────────────────────
const cityNames = {
  'mx-cdmx': 'Ciudad de México',
  'mx-gdl': 'Guadalajara',
  'mx-mty': 'Monterrey',
  'mx-pue': 'Puebla',
  'mx-mer': 'Mérida',
};
const getCityName = (cityId) => cityNames[cityId] || cityId;
const formatPrice = (price) => new Intl.NumberFormat('es-MX').format(price);
const formatMileage = (km) => new Intl.NumberFormat('es-MX').format(km);
const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
};
const today = new Date().toISOString().split('T')[0];

// ─── FILTER STATE ──────────────────────────────────────────────────────────────
const search = ref('');
const brandSearch = ref('');
const priceOrder = ref('lowToHigh');
const yearOrder = ref('newToOld');
const selectedBrands = ref([]);
const selectedTypes = ref([]);
const selectedCities = ref([]);
const sortMethod = ref('');

// Renta-specific
const availableFrom = ref('');
const availableTo = ref('');
const maxDeposit = ref('');
const minKmIncluded = ref('');

const depositRanges = [
  { value: '5000', label: 'Hasta $5,000' },
  { value: '10000', label: 'Hasta $10,000' },
  { value: '20000', label: 'Hasta $20,000' },
  { value: '', label: 'Sin límite' },
];
const kmOptions = [
  { value: '100', label: 'Al menos 100 km' },
  { value: '200', label: 'Al menos 200 km' },
  { value: '300', label: 'Al menos 300 km' },
  { value: '', label: 'Sin mínimo' },
];

const expandedSections = ref({
  price: true,
  rentPrice: true,
  availability: true,
  deposit: false,
  kmIncluded: false,
  year: true,
  brand: true,
  type: false,
  city: false,
});

// ─── DATOS DESDE JSON ─────────────────────────────────────────────────────────
// Usar los datos importados en lugar de hardcodeados
const vehiclesData = ref(salesData);
const rentalsDataRef = ref(rentalsData);

// ─── ACTIVE LIST ───────────────────────────────────────────────────────────────
const vehicles = computed(() => {
  const source =
    listingMode.value === 'venta'
      ? vehiclesData.value.items
      : rentalsDataRef.value.items;
  return source.filter((v) => v.status === 'published');
});

onMounted(() => {
  vehicles.value.forEach((v) => {
    const img = new Image();
    img.src = getOptimizedImageUrl(v.coverImage);
  });
});

// ─── COMPUTED FILTER OPTIONS ───────────────────────────────────────────────────
const uniqueBrands = computed(() =>
  [...new Set(vehicles.value.map((v) => v.brand))].sort()
);
const uniqueTypes = computed(() =>
  [...new Set(vehicles.value.map((v) => v.type))].sort()
);
const uniqueCities = computed(() =>
  [...new Set(vehicles.value.map((v) => getCityName(v.cityId)))].sort()
);
const filteredBrands = computed(() => {
  if (!brandSearch.value) return uniqueBrands.value;
  return uniqueBrands.value.filter((b) =>
    b.toLowerCase().includes(brandSearch.value.toLowerCase())
  );
});
const getBrandCount = (brand) =>
  vehicles.value.filter((v) => v.brand === brand).length;
const getTypeCount = (type) =>
  vehicles.value.filter((v) => v.type === type).length;

// ─── SORT SYNC ─────────────────────────────────────────────────────────────────
const handlePriceChange = () => {
  sortMethod.value = priceOrder.value === 'lowToHigh' ? 'price' : 'price-desc';
};
const handleYearChange = () => {
  sortMethod.value = yearOrder.value === 'newToOld' ? 'year' : 'year-asc';
};
const handleSortChange = () => {
  if (sortMethod.value === 'price') priceOrder.value = 'lowToHigh';
  else if (sortMethod.value === 'price-desc') priceOrder.value = 'highToLow';
  else if (sortMethod.value === 'year') yearOrder.value = 'newToOld';
  else if (sortMethod.value === 'year-asc') yearOrder.value = 'oldToNew';
  else {
    priceOrder.value = 'lowToHigh';
    yearOrder.value = 'newToOld';
  }
};

// ─── ACTIVE FILTERS ────────────────────────────────────────────────────────────
const hasActiveFilters = computed(
  () =>
    selectedBrands.value.length > 0 ||
    selectedTypes.value.length > 0 ||
    selectedCities.value.length > 0 ||
    search.value ||
    priceOrder.value !== 'lowToHigh' ||
    yearOrder.value !== 'newToOld' ||
    availableFrom.value ||
    availableTo.value ||
    maxDeposit.value ||
    minKmIncluded.value
);
const activeFilters = computed(() => {
  const f = [];
  if (search.value) f.push(`Búsqueda: ${search.value}`);
  if (selectedBrands.value.length)
    f.push(`${selectedBrands.value.length} marcas`);
  if (selectedTypes.value.length) f.push(`${selectedTypes.value.length} tipos`);
  if (selectedCities.value.length)
    f.push(`${selectedCities.value.length} ciudades`);
  if (priceOrder.value === 'highToLow') f.push('Precio: mayor a menor');
  if (yearOrder.value === 'oldToNew') f.push('Año: más antiguo');
  if (availableFrom.value) f.push(`Desde: ${formatDate(availableFrom.value)}`);
  if (availableTo.value) f.push(`Hasta: ${formatDate(availableTo.value)}`);
  if (maxDeposit.value) f.push(`Depósito ≤ $${formatPrice(maxDeposit.value)}`);
  if (minKmIncluded.value) f.push(`Km/día ≥ ${minKmIncluded.value}`);
  return f;
});

const toggleSection = (section) => {
  expandedSections.value[section] = !expandedSections.value[section];
};
const clearAllFilters = () => {
  search.value = '';
  brandSearch.value = '';
  priceOrder.value = 'lowToHigh';
  yearOrder.value = 'newToOld';
  selectedBrands.value = [];
  selectedTypes.value = [];
  selectedCities.value = [];
  sortMethod.value = '';
  availableFrom.value = '';
  availableTo.value = '';
  maxDeposit.value = '';
  minKmIncluded.value = '';
};
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
  if (filter.includes('Desde')) availableFrom.value = '';
  if (filter.includes('Hasta')) availableTo.value = '';
  if (filter.includes('Depósito')) maxDeposit.value = '';
  if (filter.includes('Km')) minKmIncluded.value = '';
};

// ─── FILTERED VEHICLES ─────────────────────────────────────────────────────────
const filteredVehicles = computed(() => {
  let result = vehicles.value;

  if (search.value) {
    result = result.filter((v) =>
      v.title.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  if (selectedBrands.value.length > 0)
    result = result.filter((v) => selectedBrands.value.includes(v.brand));
  if (selectedTypes.value.length > 0)
    result = result.filter((v) => selectedTypes.value.includes(v.type));
  if (selectedCities.value.length > 0)
    result = result.filter((v) =>
      selectedCities.value.includes(getCityName(v.cityId))
    );

  if (listingMode.value === 'renta') {
    if (availableFrom.value)
      result = result.filter((v) => v.availableTo >= availableFrom.value);
    if (availableTo.value)
      result = result.filter((v) => v.availableFrom <= availableTo.value);
    if (maxDeposit.value)
      result = result.filter(
        (v) => v.depositAmount <= parseInt(maxDeposit.value)
      );
    if (minKmIncluded.value)
      result = result.filter(
        (v) => v.kmIncludedPerDay >= parseInt(minKmIncluded.value)
      );
    if (sortMethod.value === 'price')
      result = [...result].sort((a, b) => a.pricePerDay - b.pricePerDay);
    else if (sortMethod.value === 'price-desc')
      result = [...result].sort((a, b) => b.pricePerDay - a.pricePerDay);
    else if (sortMethod.value === 'year')
      result = [...result].sort((a, b) => b.year - a.year);
    else if (sortMethod.value === 'year-asc')
      result = [...result].sort((a, b) => a.year - b.year);
  } else {
    if (sortMethod.value === 'price')
      result = [...result].sort((a, b) => a.price - b.price);
    else if (sortMethod.value === 'price-desc')
      result = [...result].sort((a, b) => b.price - a.price);
    else if (sortMethod.value === 'year')
      result = [...result].sort((a, b) => b.year - a.year);
    else if (sortMethod.value === 'year-asc')
      result = [...result].sort((a, b) => a.year - b.year);
  }

  return result;
});

// ─── NAVIGATION ────────────────────────────────────────────────────────────────
const goToVehicleDetail = (vehicleId) => {
  console.log('Navegando a detalle:', vehicleId, '| modo:', listingMode.value);
  router.push(`/listados/${vehicleId}`);
};
</script>

<style scoped src="./styles.css"></style>
