<template>
  <div class="listados">
    <br /><br /><br /><br /><br />

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
                {{ getCityName(vehicle) }} · {{ vehicle.year }}
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
                  <span>{{ getCityName(vehicle) }}</span>
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
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getListings } from '../../../services/catalog.js';
import { recordSearchHistory } from '../../../services/buyer.js';

const router = useRouter();
const route = useRoute();

const listingMode = ref('venta');
const vehiclesData = ref([]);
const isLoading = ref(false);

const search = ref('');
const brandSearch = ref('');
const priceOrder = ref('lowToHigh');
const yearOrder = ref('newToOld');
const selectedBrands = ref([]);
const selectedTypes = ref([]);
const selectedCities = ref([]);
const sortMethod = ref('');
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

const imagesLoaded = ref({});
const getOptimizedImageUrl = (url) => {
  if (!url) return 'https://placehold.co/400x200/2d3748/ffffff?text=Sin+imagen';
  if (url.includes('unsplash.com')) {
    return `${url}?w=400&h=200&fit=crop&auto=format&q=80`;
  }
  return url;
};
const handleImageLoad = (_event, vehicleId) => {
  imagesLoaded.value[vehicleId] = true;
};
const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/400x200/2d3748/ffffff?text=Error+de+carga';
};

const formatPrice = (price) => new Intl.NumberFormat('es-MX').format(price || 0);
const formatMileage = (km) => new Intl.NumberFormat('es-MX').format(km || 0);
const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
};
const today = new Date().toISOString().split('T')[0];

const getCityName = (vehicle) => {
  if (!vehicle) return 'Ubicación por confirmar';
  return vehicle.cityLabel || vehicle.city?.name || vehicle.location?.city || vehicle.cityId;
};

let searchHistoryTimer = null;
let lastRecordedSearchSignature = '';

const hasMeaningfulSearch = computed(() => Boolean(
  search.value.trim() ||
  selectedBrands.value.length ||
  selectedTypes.value.length ||
  selectedCities.value.length ||
  route.query.minYear ||
  route.query.maxYear ||
  availableFrom.value ||
  availableTo.value ||
  maxDeposit.value ||
  minKmIncluded.value
));

const buildSearchHistoryPayload = () => {
  if (!hasMeaningfulSearch.value) return null;

  const parts = [];
  if (search.value.trim()) parts.push(search.value.trim());
  if (selectedBrands.value.length) parts.push(selectedBrands.value.join(', '));
  if (selectedTypes.value.length) parts.push(selectedTypes.value.join(', '));
  if (selectedCities.value.length) parts.push(selectedCities.value.join(', '));
  if (listingMode.value === 'renta') parts.push('renta');

  const queryText = parts.join(' · ').trim();
  if (!queryText) return null;

  return {
    query: queryText,
    resultCount: filteredVehicles.value.length,
    filtersSummary: activeFilters.value.join(' · '),
  };
};

const scheduleSearchHistoryRecord = (delay = 700) => {
  clearTimeout(searchHistoryTimer);
  searchHistoryTimer = setTimeout(async () => {
    const payload = buildSearchHistoryPayload();
    if (!payload) return;

    const signature = JSON.stringify({
      mode: listingMode.value,
      query: payload.query,
      filtersSummary: payload.filtersSummary,
    });

    if (signature === lastRecordedSearchSignature) return;

    await recordSearchHistory(payload);
    lastRecordedSearchSignature = signature;
  }, delay);
};

const loadInventory = async () => {
  isLoading.value = true;
  try {
    const response = await getListings({ mode: listingMode.value, pageSize: 100 });
    vehiclesData.value = response?.items || [];
  } finally {
    isLoading.value = false;
  }
};

const applyRouteQuery = () => {
  listingMode.value = route.query.mode === 'renta' ? 'renta' : 'venta';
  search.value = route.query.q || route.query.model || '';
  selectedBrands.value = route.query.brand ? [String(route.query.brand)] : [];
  const minYear = route.query.minYear || '';
  const maxYear = route.query.maxYear || '';
  yearOrder.value = 'newToOld';
  if (minYear && maxYear && String(minYear) === String(maxYear)) {
    search.value = search.value;
  }
};

onMounted(async () => {
  applyRouteQuery();
  await loadInventory();
  await nextTick();
  scheduleSearchHistoryRecord(0);
});

watch(
  () => route.fullPath,
  async () => {
    const prevMode = listingMode.value;
    applyRouteQuery();
    if (prevMode !== listingMode.value) {
      await loadInventory();
    }
    await nextTick();
    scheduleSearchHistoryRecord(0);
  }
);

watch(listingMode, async () => {
  await loadInventory();
  await nextTick();
  scheduleSearchHistoryRecord(0);
});

const switchMode = async (mode) => {
  listingMode.value = mode;
  clearAllFilters(false);
  await router.replace({
    name: 'public-catalog',
    query: mode === 'renta' ? { mode: 'renta' } : {},
  });
};

const vehicles = computed(() => vehiclesData.value.filter((vehicle) => vehicle.status === 'published'));

const uniqueBrands = computed(() => [...new Set(vehicles.value.map((vehicle) => vehicle.brand).filter(Boolean))].sort());
const uniqueTypes = computed(() => [...new Set(vehicles.value.map((vehicle) => vehicle.type).filter(Boolean))].sort());
const uniqueCities = computed(() => [...new Set(vehicles.value.map((vehicle) => getCityName(vehicle)).filter(Boolean))].sort());
const filteredBrands = computed(() => {
  if (!brandSearch.value) return uniqueBrands.value;
  return uniqueBrands.value.filter((brand) => brand.toLowerCase().includes(brandSearch.value.toLowerCase()));
});
const getBrandCount = (brand) => vehicles.value.filter((vehicle) => vehicle.brand === brand).length;
const getTypeCount = (type) => vehicles.value.filter((vehicle) => vehicle.type === type).length;

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

const hasActiveFilters = computed(() => (
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
));

const activeFilters = computed(() => {
  const filters = [];
  if (search.value) filters.push(`Búsqueda: ${search.value}`);
  if (selectedBrands.value.length) filters.push(`${selectedBrands.value.length} marcas`);
  if (selectedTypes.value.length) filters.push(`${selectedTypes.value.length} tipos`);
  if (selectedCities.value.length) filters.push(`${selectedCities.value.length} ciudades`);
  if (priceOrder.value === 'highToLow') filters.push('Precio: mayor a menor');
  if (yearOrder.value === 'oldToNew') filters.push('Año: más antiguo');
  if (availableFrom.value) filters.push(`Desde: ${formatDate(availableFrom.value)}`);
  if (availableTo.value) filters.push(`Hasta: ${formatDate(availableTo.value)}`);
  if (maxDeposit.value) filters.push(`Depósito ≤ $${formatPrice(maxDeposit.value)}`);
  if (minKmIncluded.value) filters.push(`Km/día ≥ ${minKmIncluded.value}`);
  return filters;
});

const toggleSection = (section) => {
  expandedSections.value[section] = !expandedSections.value[section];
};

const clearAllFilters = (clearModeQuery = true) => {
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
  if (clearModeQuery) {
    router.replace({
      name: 'public-catalog',
      query: listingMode.value === 'renta' ? { mode: 'renta' } : {},
    });
  }
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

const matchesYearQuery = (vehicle) => {
  const minYear = Number(route.query.minYear || 0);
  const maxYear = Number(route.query.maxYear || 9999);
  if (!route.query.minYear && !route.query.maxYear) return true;
  return Number(vehicle.year || 0) >= minYear && Number(vehicle.year || 0) <= maxYear;
};

const filteredVehicles = computed(() => {
  let result = [...vehicles.value];

  if (search.value) {
    const q = search.value.toLowerCase();
    result = result.filter((vehicle) =>
      [vehicle.title, vehicle.brand, vehicle.model, vehicle.sellerDisplayName, getCityName(vehicle)]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q))
    );
  }

  if (selectedBrands.value.length > 0) {
    result = result.filter((vehicle) => selectedBrands.value.includes(vehicle.brand));
  }

  if (selectedTypes.value.length > 0) {
    result = result.filter((vehicle) => selectedTypes.value.includes(vehicle.type));
  }

  if (selectedCities.value.length > 0) {
    result = result.filter((vehicle) => selectedCities.value.includes(getCityName(vehicle)));
  }

  result = result.filter(matchesYearQuery);

  if (listingMode.value === 'renta') {
    if (availableFrom.value) {
      result = result.filter((vehicle) => (vehicle.availableTo || '9999-12-31') >= availableFrom.value);
    }
    if (availableTo.value) {
      result = result.filter((vehicle) => (vehicle.availableFrom || today) <= availableTo.value);
    }
    if (maxDeposit.value) {
      result = result.filter((vehicle) => Number(vehicle.depositAmount || 0) <= Number(maxDeposit.value));
    }
    if (minKmIncluded.value) {
      result = result.filter((vehicle) => Number(vehicle.kmIncludedPerDay || 0) >= Number(minKmIncluded.value));
    }
  }

  if (sortMethod.value === 'price') {
    result = [...result].sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
  } else if (sortMethod.value === 'price-desc') {
    result = [...result].sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
  } else if (sortMethod.value === 'year') {
    result = [...result].sort((a, b) => Number(b.year || 0) - Number(a.year || 0));
  } else if (sortMethod.value === 'year-asc') {
    result = [...result].sort((a, b) => Number(a.year || 0) - Number(b.year || 0));
  }

  return result;
});

watch(
  [search, selectedBrands, selectedTypes, selectedCities, availableFrom, availableTo, maxDeposit, minKmIncluded],
  () => {
    if (!hasMeaningfulSearch.value) return;
    scheduleSearchHistoryRecord();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  clearTimeout(searchHistoryTimer);
});

const goToVehicleDetail = (vehicleId) => {
  router.push({ name: 'public-listing-detail', params: { id: vehicleId } });
};
</script>

<style scoped src="./styles.css"></style>
