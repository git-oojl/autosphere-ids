<template>
  <div class="catalog-page">
    <br /><br /><br /><br /><br />

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
            <h1 class="page-title">Catálogos</h1>
            <p class="page-subtitle">
              Administra marcas, modelos, tipos de vehículo y ubicaciones
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs-container">
      <div class="tabs">
        <button
          :class="['tab', { active: currentTab === 'brands' }]"
          @click="setTab('brands')"
        >
          <span class="tab-icon">🏭</span>
          Marcas
          <span class="tab-count">{{ stats.brands }}</span>
        </button>
        <button
          :class="['tab', { active: currentTab === 'models' }]"
          @click="setTab('models')"
        >
          <span class="tab-icon">🚗</span>
          Modelos
          <span class="tab-count">{{ stats.models }}</span>
        </button>
        <button
          :class="['tab', { active: currentTab === 'types' }]"
          @click="setTab('types')"
        >
          <span class="tab-icon">📋</span>
          Tipos de Vehículo
          <span class="tab-count">{{ stats.types }}</span>
        </button>
        <button
          :class="['tab', { active: currentTab === 'locations' }]"
          @click="setTab('locations')"
        >
          <span class="tab-icon">📍</span>
          Ubicaciones
          <span class="tab-count">{{ stats.locations }}</span>
        </button>
      </div>
    </div>

    <!-- Action Bar -->
    <div class="action-bar">
      <div class="action-container">
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
            :placeholder="`Buscar ${getTabLabel()}...`"
          />
        </div>
        <button class="btn-primary" @click="openItemModal('create')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" />
          </svg>
          Agregar {{ getTabLabel().slice(0, -1) }}
        </button>
      </div>
    </div>

    <!-- Items Grid -->
    <div class="items-container">
      <div class="items-grid">
        <div v-for="item in paginatedItems" :key="item.id" class="catalog-card">
          <div class="card-icon">
            {{ getItemIcon() }}
          </div>
          <div class="card-content">
            <h3 class="item-name">{{ item.name }}</h3>
            <p v-if="item.description" class="item-description">
              {{ item.description }}
            </p>
            <div v-if="currentTab !== 'locations'" class="item-stats">
              <span class="stat-badge">{{ item.count || 0 }} vehículos</span>
            </div>
            <div v-else class="item-stats">
              <span class="stat-badge"
                >{{ item.listingsCount || 0 }} anuncios</span
              >
            </div>
          </div>
          <div class="card-actions">
            <button
              class="action-btn edit"
              title="Editar"
              @click="openItemModal('edit', item)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 3L21 7L7 21H3V17L17 3Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </button>
            <button
              class="action-btn delete"
              title="Eliminar"
              @click="deleteItem(item)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </button>
          </div>
        </div>
        <div v-if="filteredItems.length === 0" class="empty-state">
          <div class="empty-icon">{{ getEmptyIcon() }}</div>
          <p>No hay {{ getTabLabel().toLowerCase() }} registrados</p>
          <button class="btn-primary-small" @click="openItemModal('create')">
            Agregar {{ getTabLabel().slice(0, -1) }}
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

    <!-- Item Modal (Create/Edit) -->
    <div
      v-if="showItemModal"
      class="modal-overlay"
      @click.self="closeItemModal"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h2>
            {{ isEditing ? 'Editar' : 'Agregar' }}
            {{ getTabLabel().slice(0, -1) }}
          </h2>
          <button class="modal-close" @click="closeItemModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Nombre *</label>
            <input
              v-model="itemForm.name"
              type="text"
              class="form-input"
              :placeholder="`Ej: ${getPlaceholder()}`"
            />
          </div>
          <div v-if="currentTab === 'models'" class="form-group">
            <label>Marca *</label>
            <select v-model="itemForm.brandId" class="form-input">
              <option value="">Seleccionar marca</option>
              <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                {{ brand.name }}
              </option>
            </select>
          </div>
          <div
            v-if="currentTab !== 'locations' && currentTab !== 'models'"
            class="form-group"
          >
            <label>Descripción (opcional)</label>
            <textarea
              v-model="itemForm.description"
              class="form-input"
              rows="3"
              :placeholder="`Descripción del ${getTabLabel().slice(0, -1).toLowerCase()}`"
            ></textarea>
          </div>
          <div v-if="currentTab === 'locations'" class="form-group">
            <label>Dirección / Ubicación</label>
            <input
              v-model="itemForm.address"
              type="text"
              class="form-input"
              placeholder="Ej: Av. Reforma 123, CDMX"
            />
          </div>
          <div v-if="currentTab === 'locations'" class="form-group">
            <label>Coordenadas (opcional)</label>
            <div class="form-row">
              <input
                v-model="itemForm.lat"
                type="text"
                class="form-input"
                placeholder="Latitud"
              />
              <input
                v-model="itemForm.lng"
                type="text"
                class="form-input"
                placeholder="Longitud"
              />
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" @click="closeItemModal">
              Cancelar
            </button>
            <button class="btn-primary" @click="saveItem">
              {{ isEditing ? 'Guardar cambios' : 'Agregar' }}
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
          <h2>Eliminar {{ getTabLabel().slice(0, -1) }}</h2>
          <button class="modal-close" @click="showDeleteModal = false">
            ×
          </button>
        </div>
        <div class="modal-body">
          <div class="confirmation-icon warning">⚠️</div>
          <p class="confirmation-text">
            ¿Eliminar <strong>{{ selectedItem?.name }}</strong
            >?
          </p>
          <p v-if="currentTab !== 'locations'" class="confirmation-subtext">
            Esta acción afectará a los vehículos que tienen esta
            {{ getTabLabel().slice(0, -1).toLowerCase() }} asociada.
          </p>
          <p v-else class="confirmation-subtext">
            Esta acción eliminará esta ubicación del catálogo.
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// ============================================
// NOTIFICATION SYSTEM
// ============================================
const showBanner = (type, message) => {
  // Temporal: usar alert mientras se implementa el sistema visual
  alert(message);
};

// Current tab
const currentTab = ref('brands');

// Stats
const stats = ref({
  brands: 0,
  models: 0,
  types: 0,
  locations: 0,
});

// Brands data
const brands = ref([
  {
    id: 1,
    name: 'Porsche',
    description: 'Marca alemana de autos deportivos de lujo',
    count: 23,
  },
  {
    id: 2,
    name: 'BMW',
    description: 'Bayerische Motoren Werke, autos premium alemanes',
    count: 31,
  },
  {
    id: 3,
    name: 'Mercedes-Benz',
    description: 'Marca alemana de autos de lujo',
    count: 28,
  },
  {
    id: 4,
    name: 'Audi',
    description: 'Marca alemana de autos premium',
    count: 19,
  },
  {
    id: 5,
    name: 'Ferrari',
    description: 'Marca italiana de autos deportivos',
    count: 8,
  },
  {
    id: 6,
    name: 'Lamborghini',
    description: 'Marca italiana de autos superdeportivos',
    count: 5,
  },
  {
    id: 7,
    name: 'Tesla',
    description: 'Marca americana de autos eléctricos',
    count: 12,
  },
  {
    id: 8,
    name: 'Chevrolet',
    description: 'Marca americana de autos',
    count: 15,
  },
]);

// Models data
const models = ref([
  { id: 1, name: '911 Carrera', brandId: 1, brandName: 'Porsche', count: 12 },
  { id: 2, name: 'Cayenne', brandId: 1, brandName: 'Porsche', count: 8 },
  { id: 3, name: 'Panamera', brandId: 1, brandName: 'Porsche', count: 3 },
  { id: 4, name: 'X5', brandId: 2, brandName: 'BMW', count: 15 },
  { id: 5, name: 'X6', brandId: 2, brandName: 'BMW', count: 9 },
  { id: 6, name: 'Serie 3', brandId: 2, brandName: 'BMW', count: 7 },
  { id: 7, name: 'Clase S', brandId: 3, brandName: 'Mercedes-Benz', count: 11 },
  { id: 8, name: 'Clase E', brandId: 3, brandName: 'Mercedes-Benz', count: 9 },
  { id: 9, name: 'GLE', brandId: 3, brandName: 'Mercedes-Benz', count: 8 },
  { id: 10, name: 'RS7', brandId: 4, brandName: 'Audi', count: 6 },
  { id: 11, name: 'Q7', brandId: 4, brandName: 'Audi', count: 7 },
  { id: 12, name: 'A8', brandId: 4, brandName: 'Audi', count: 6 },
  { id: 13, name: '488 GTB', brandId: 5, brandName: 'Ferrari', count: 4 },
  { id: 14, name: 'F8 Tributo', brandId: 5, brandName: 'Ferrari', count: 4 },
  { id: 15, name: 'Huracán', brandId: 6, brandName: 'Lamborghini', count: 3 },
  { id: 16, name: 'Model S', brandId: 7, brandName: 'Tesla', count: 7 },
  { id: 17, name: 'Model 3', brandId: 7, brandName: 'Tesla', count: 5 },
  { id: 18, name: 'Silverado', brandId: 8, brandName: 'Chevrolet', count: 10 },
  { id: 19, name: 'Camaro', brandId: 8, brandName: 'Chevrolet', count: 5 },
]);

// Vehicle types
const types = ref([
  {
    id: 1,
    name: 'Sedán',
    description: 'Vehículo de 4 puertas con baúl separado',
    count: 145,
  },
  {
    id: 2,
    name: 'SUV',
    description: 'Vehículo deportivo utilitario',
    count: 98,
  },
  {
    id: 3,
    name: 'Deportivo',
    description: 'Vehículo de alto rendimiento',
    count: 67,
  },
  {
    id: 4,
    name: 'Hatchback',
    description: 'Vehículo compacto de 5 puertas',
    count: 34,
  },
  {
    id: 5,
    name: 'Pickup',
    description: 'Camioneta con caja de carga',
    count: 28,
  },
  {
    id: 6,
    name: 'Convertible',
    description: 'Vehículo descapotable',
    count: 23,
  },
  { id: 7, name: 'Coupé', description: 'Vehículo de 2 puertas', count: 31 },
]);

// Locations
const locations = ref([
  {
    id: 1,
    name: 'Concesionaria AutoSphere CDMX',
    address: 'Av. Reforma 123, Col. Juárez, CDMX',
    lat: '19.4326',
    lng: '-99.1332',
    listingsCount: 45,
  },
  {
    id: 2,
    name: 'Concesionaria AutoSphere GDL',
    address: 'Av. Vallarta 456, Col. Americana, Guadalajara',
    lat: '20.6767',
    lng: '-103.3475',
    listingsCount: 32,
  },
  {
    id: 3,
    name: 'Concesionaria AutoSphere MTY',
    address: 'Av. Constitución 789, San Pedro, Monterrey',
    lat: '25.6866',
    lng: '-100.3161',
    listingsCount: 28,
  },
  {
    id: 4,
    name: 'Punto de encuentro - Plaza Satélite',
    address: 'Circuito Satélite, Naucalpan, EdoMéx',
    lat: '19.4965',
    lng: '-99.2365',
    listingsCount: 15,
  },
  {
    id: 5,
    name: 'Punto de encuentro - Andares',
    address: 'Av. Real Acueducto, Zapopan, Jalisco',
    lat: '20.7221',
    lng: '-103.4091',
    listingsCount: 12,
  },
  {
    id: 6,
    name: 'Punto de encuentro - Valle Oriente',
    address: 'Av. Gómez Morín, San Pedro Garza García',
    lat: '25.6578',
    lng: '-100.3689',
    listingsCount: 10,
  },
]);

// Filters
const searchTerm = ref('');
const currentPage = ref(1);
const itemsPerPage = 12;

// Modal states
const showItemModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const selectedItem = ref(null);
const itemForm = ref({
  name: '',
  description: '',
  brandId: '',
  address: '',
  lat: '',
  lng: '',
});

// Computed
const currentItems = computed(() => {
  switch (currentTab.value) {
    case 'brands':
      return brands.value;
    case 'models':
      return models.value;
    case 'types':
      return types.value;
    case 'locations':
      return locations.value;
    default:
      return [];
  }
});

const filteredItems = computed(() => {
  let filtered = [...currentItems.value];

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        (item.brandName && item.brandName.toLowerCase().includes(term)) ||
        (item.address && item.address.toLowerCase().includes(term))
    );
  }

  return filtered;
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredItems.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredItems.value.length / itemsPerPage)
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

// Methods
const goBack = () => {
  router.push('/admin');
};

const getTabLabel = () => {
  const labels = {
    brands: 'Marcas',
    models: 'Modelos',
    types: 'Tipos de Vehículo',
    locations: 'Ubicaciones',
  };
  return labels[currentTab.value] || '';
};

const getItemIcon = () => {
  const icons = {
    brands: '🏭',
    models: '🚗',
    types: '📋',
    locations: '📍',
  };
  return icons[currentTab.value] || '📦';
};

const getEmptyIcon = () => {
  const icons = {
    brands: '🏭',
    models: '🚗',
    types: '📋',
    locations: '📍',
  };
  return icons[currentTab.value] || '📦';
};

const getPlaceholder = () => {
  const placeholders = {
    brands: 'Porsche, BMW, Mercedes-Benz...',
    models: '911 Carrera, X5, Clase S...',
    types: 'Sedán, SUV, Deportivo...',
    locations: 'Concesionaria, Punto de encuentro...',
  };
  return placeholders[currentTab.value] || '';
};

const updateStats = () => {
  stats.value.brands = brands.value.length;
  stats.value.models = models.value.length;
  stats.value.types = types.value.length;
  stats.value.locations = locations.value.length;
};

const setTab = (tab) => {
  currentTab.value = tab;
  searchTerm.value = '';
  currentPage.value = 1;
};

const openItemModal = (action, item = null) => {
  isEditing.value = action === 'edit';

  if (item) {
    itemForm.value = {
      id: item.id,
      name: item.name,
      description: item.description || '',
      brandId: item.brandId || '',
      address: item.address || '',
      lat: item.lat || '',
      lng: item.lng || '',
    };
  } else {
    itemForm.value = {
      name: '',
      description: '',
      brandId: '',
      address: '',
      lat: '',
      lng: '',
    };
  }
  showItemModal.value = true;
};

const closeItemModal = () => {
  showItemModal.value = false;
  selectedItem.value = null;
};

const saveItem = () => {
  if (!itemForm.value.name) {
    showBanner('error', 'Por favor ingresa un nombre');
    return;
  }

  const newId = Date.now();

  switch (currentTab.value) {
    case 'brands': {
      if (isEditing.value && itemForm.value.id) {
        const index = brands.value.findIndex((b) => b.id === itemForm.value.id);
        if (index !== -1) {
          brands.value[index] = {
            ...brands.value[index],
            name: itemForm.value.name,
            description: itemForm.value.description,
          };
          showBanner('success', 'Marca actualizada correctamente');
        }
      } else {
        brands.value.push({
          id: newId,
          name: itemForm.value.name,
          description: itemForm.value.description,
          count: 0,
        });
        showBanner('success', 'Marca agregada correctamente');
      }
      break;
    }

    case 'models': {
      if (!itemForm.value.brandId) {
        showBanner('error', 'Por favor selecciona una marca');
        return;
      }
      const brand = brands.value.find((b) => b.id === itemForm.value.brandId);
      if (isEditing.value && itemForm.value.id) {
        const index = models.value.findIndex((m) => m.id === itemForm.value.id);
        if (index !== -1) {
          models.value[index] = {
            ...models.value[index],
            name: itemForm.value.name,
            brandId: itemForm.value.brandId,
            brandName: brand?.name,
          };
          showBanner('success', 'Modelo actualizado correctamente');
        }
      } else {
        models.value.push({
          id: newId,
          name: itemForm.value.name,
          brandId: itemForm.value.brandId,
          brandName: brand?.name,
          count: 0,
        });
        showBanner('success', 'Modelo agregado correctamente');
      }
      break;
    }

    case 'types': {
      if (isEditing.value && itemForm.value.id) {
        const index = types.value.findIndex((t) => t.id === itemForm.value.id);
        if (index !== -1) {
          types.value[index] = {
            ...types.value[index],
            name: itemForm.value.name,
            description: itemForm.value.description,
          };
          showBanner('success', 'Tipo de vehículo actualizado correctamente');
        }
      } else {
        types.value.push({
          id: newId,
          name: itemForm.value.name,
          description: itemForm.value.description,
          count: 0,
        });
        showBanner('success', 'Tipo de vehículo agregado correctamente');
      }
      break;
    }

    case 'locations': {
      if (isEditing.value && itemForm.value.id) {
        const index = locations.value.findIndex(
          (l) => l.id === itemForm.value.id
        );
        if (index !== -1) {
          locations.value[index] = {
            ...locations.value[index],
            name: itemForm.value.name,
            address: itemForm.value.address,
            lat: itemForm.value.lat,
            lng: itemForm.value.lng,
          };
          showBanner('success', 'Ubicación actualizada correctamente');
        }
      } else {
        locations.value.push({
          id: newId,
          name: itemForm.value.name,
          address: itemForm.value.address,
          lat: itemForm.value.lat,
          lng: itemForm.value.lng,
          listingsCount: 0,
        });
        showBanner('success', 'Ubicación agregada correctamente');
      }
      break;
    }

    default: {
      break;
    }
  }

  closeItemModal();
  updateStats();
};

const deleteItem = (item) => {
  selectedItem.value = item;
  showDeleteModal.value = true;
};

const confirmDelete = () => {
  if (!selectedItem.value) return;

  switch (currentTab.value) {
    case 'brands': {
      const brandIndex = brands.value.findIndex(
        (b) => b.id === selectedItem.value.id
      );
      if (brandIndex !== -1) {
        brands.value.splice(brandIndex, 1);
        showBanner('success', `Marca "${selectedItem.value.name}" eliminada`);
      }
      break;
    }

    case 'models': {
      const modelIndex = models.value.findIndex(
        (m) => m.id === selectedItem.value.id
      );
      if (modelIndex !== -1) {
        models.value.splice(modelIndex, 1);
        showBanner('success', `Modelo "${selectedItem.value.name}" eliminado`);
      }
      break;
    }

    case 'types': {
      const typeIndex = types.value.findIndex(
        (t) => t.id === selectedItem.value.id
      );
      if (typeIndex !== -1) {
        types.value.splice(typeIndex, 1);
        showBanner('success', `Tipo "${selectedItem.value.name}" eliminado`);
      }
      break;
    }

    case 'locations': {
      const locationIndex = locations.value.findIndex(
        (l) => l.id === selectedItem.value.id
      );
      if (locationIndex !== -1) {
        locations.value.splice(locationIndex, 1);
        showBanner(
          'success',
          `Ubicación "${selectedItem.value.name}" eliminada`
        );
      }
      break;
    }

    default: {
      break;
    }
  }

  showDeleteModal.value = false;
  selectedItem.value = null;
  updateStats();
};

// Inicializar estadísticas
updateStats();
</script>

<style scoped src="./styles.css"></style>
