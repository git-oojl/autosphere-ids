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
            {{ getItemIcon(item) }}
          </div>
          <div class="card-content">
            <h3 class="item-name">{{ item.name }}</h3>
            <p v-if="item.description" class="item-description">
              {{ item.description }}
            </p>
            <div class="item-stats">
              <span v-if="currentTab === 'brands'" class="stat-badge">
                {{ item.count || 0 }} vehículos
              </span>
              <span v-else-if="currentTab === 'models'" class="stat-badge">
                {{ item.brandName }} • {{ item.count || 0 }} vehículos
              </span>
              <span v-else-if="currentTab === 'types'" class="stat-badge">
                {{ item.count || 0 }} vehículos
              </span>
              <span v-else class="stat-badge">
                {{ item.listingsCount || 0 }} anuncios
              </span>
            </div>
            <div
              v-if="currentTab === 'locations' && item.address"
              class="item-location"
            >
              📍 {{ item.address }}
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

    <!-- Item Modal (Create/Edit) - El mismo que antes pero adaptado -->
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
            <label>Dirección / Ubicación *</label>
            <input
              v-model="itemForm.address"
              type="text"
              class="form-input"
              placeholder="Ej: Av. Reforma 123, CDMX"
            />
          </div>
          <div v-if="currentTab === 'locations'" class="form-group">
            <label>Ciudad</label>
            <input
              v-model="itemForm.city"
              type="text"
              class="form-input"
              placeholder="Ej: Ciudad de México"
            />
          </div>
          <div v-if="currentTab === 'locations'" class="form-group">
            <label>Estado</label>
            <input
              v-model="itemForm.state"
              type="text"
              class="form-input"
              placeholder="Ej: CDMX"
            />
          </div>
          <div v-if="currentTab === 'locations'" class="form-row">
            <div class="form-group">
              <label>Latitud</label>
              <input
                v-model="itemForm.lat"
                type="text"
                class="form-input"
                placeholder="Ej: 19.4326"
              />
            </div>
            <div class="form-group">
              <label>Longitud</label>
              <input
                v-model="itemForm.lng"
                type="text"
                class="form-input"
                placeholder="Ej: -99.1332"
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// IMPORTAR LOS MOCKS DESDE JSON
import brandsMock from '../../../mocks/admin/brands.json';
import modelsMock from '../../../mocks/admin/models.json';
import typesMock from '../../../mocks/admin/vehicle-types.json';
import locationsMock from '../../../mocks/admin/locations.json';

const router = useRouter();

// Current tab
const currentTab = ref('brands');

// Stats
const stats = ref({
  brands: 0,
  models: 0,
  types: 0,
  locations: 0,
});

// Datos desde JSON
const brands = ref(
  brandsMock.items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    country: item.country,
    founded: item.founded,
    logo: item.logo,
    active: item.active,
    count: item.count,
  }))
);

const models = ref(
  modelsMock.items.map((item) => ({
    id: item.id,
    name: item.name,
    brandId: item.brandId,
    brandName: item.brandName,
    generation: item.generation,
    bodyType: item.bodyType,
    active: item.active,
    count: item.count,
  }))
);

const types = ref(
  typesMock.items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    icon: item.icon,
    active: item.active,
    count: item.count,
  }))
);

const locations = ref(
  locationsMock.items.map((item) => ({
    id: item.id,
    name: item.name,
    type: item.type,
    address: item.address,
    city: item.city,
    state: item.state,
    postalCode: item.postalCode,
    lat: item.lat,
    lng: item.lng,
    phone: item.phone,
    email: item.email,
    schedule: item.schedule,
    active: item.active,
    listingsCount: item.listingsCount,
  }))
);

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
  city: '',
  state: '',
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
        (item.address && item.address.toLowerCase().includes(term)) ||
        (item.city && item.city.toLowerCase().includes(term))
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

const getItemIcon = (item) => {
  if (currentTab.value === 'brands') return item.logo || '🏭';
  if (currentTab.value === 'models') return '🚗';
  if (currentTab.value === 'types') return item.icon || '📋';
  if (currentTab.value === 'locations') return '📍';
  return '📦';
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
      city: item.city || '',
      state: item.state || '',
      lat: item.lat || '',
      lng: item.lng || '',
    };
  } else {
    itemForm.value = {
      name: '',
      description: '',
      brandId: '',
      address: '',
      city: '',
      state: '',
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
    alert('Por favor ingresa un nombre');
    return;
  }

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
          alert('Marca actualizada correctamente');
        }
      } else {
        const newId = `${currentTab.value.slice(0, 2)}-${Date.now()}`;
        brands.value.push({
          id: newId,
          name: itemForm.value.name,
          description: itemForm.value.description,
          country: 'No especificado',
          founded: null,
          logo: '🏭',
          active: true,
          count: 0,
        });
        alert('Marca agregada correctamente');
      }
      break;
    }

    case 'models': {
      if (!itemForm.value.brandId) {
        alert('Por favor selecciona una marca');
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
          alert('Modelo actualizado correctamente');
        }
      } else {
        const newId = `${currentTab.value.slice(0, 2)}-${Date.now()}`;
        models.value.push({
          id: newId,
          name: itemForm.value.name,
          brandId: itemForm.value.brandId,
          brandName: brand?.name,
          generation: '',
          bodyType: '',
          active: true,
          count: 0,
        });
        alert('Modelo agregado correctamente');
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
          alert('Tipo de vehículo actualizado correctamente');
        }
      } else {
        const newId = `${currentTab.value.slice(0, 2)}-${Date.now()}`;
        types.value.push({
          id: newId,
          name: itemForm.value.name,
          description: itemForm.value.description,
          icon: '📋',
          active: true,
          count: 0,
        });
        alert('Tipo de vehículo agregado correctamente');
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
            city: itemForm.value.city,
            state: itemForm.value.state,
            lat: itemForm.value.lat ? parseFloat(itemForm.value.lat) : null,
            lng: itemForm.value.lng ? parseFloat(itemForm.value.lng) : null,
          };
          alert('Ubicación actualizada correctamente');
        }
      } else {
        const newId = `${currentTab.value.slice(0, 2)}-${Date.now()}`;
        locations.value.push({
          id: newId,
          name: itemForm.value.name,
          type: 'concesionaria',
          address: itemForm.value.address,
          city: itemForm.value.city,
          state: itemForm.value.state,
          postalCode: '',
          lat: itemForm.value.lat ? parseFloat(itemForm.value.lat) : null,
          lng: itemForm.value.lng ? parseFloat(itemForm.value.lng) : null,
          phone: null,
          email: null,
          schedule: null,
          active: true,
          listingsCount: 0,
        });
        alert('Ubicación agregada correctamente');
      }
      break;
    }

    default:
      break;
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
        alert(`Marca "${selectedItem.value.name}" eliminada`);
      }
      break;
    }

    case 'models': {
      const modelIndex = models.value.findIndex(
        (m) => m.id === selectedItem.value.id
      );
      if (modelIndex !== -1) {
        models.value.splice(modelIndex, 1);
        alert(`Modelo "${selectedItem.value.name}" eliminado`);
      }
      break;
    }

    case 'types': {
      const typeIndex = types.value.findIndex(
        (t) => t.id === selectedItem.value.id
      );
      if (typeIndex !== -1) {
        types.value.splice(typeIndex, 1);
        alert(`Tipo "${selectedItem.value.name}" eliminado`);
      }
      break;
    }

    case 'locations': {
      const locationIndex = locations.value.findIndex(
        (l) => l.id === selectedItem.value.id
      );
      if (locationIndex !== -1) {
        locations.value.splice(locationIndex, 1);
        alert(`Ubicación "${selectedItem.value.name}" eliminada`);
      }
      break;
    }

    default:
      break;
  }

  showDeleteModal.value = false;
  selectedItem.value = null;
  updateStats();
};

// Initialize
onMounted(() => {
  updateStats();
});
</script>

<style scoped src="./styles.css"></style>
