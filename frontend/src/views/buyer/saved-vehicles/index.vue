<template>
  <div class="saved-page">
    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Vehículos Guardados</h1>
        <p class="page-sub">
          {{ savedVehicles.length }} vehículos en tu lista de favoritos
        </p>
      </div>
      <div class="header-filters">
        <button
          v-for="f in typeFilters"
          :key="f"
          class="filter-btn"
          :class="{ active: activeType === f }"
          @click="activeType = f"
        >
          {{ f }}
        </button>
      </div>
    </div>

    <!-- GRID -->
    <div v-if="filteredVehicles.length > 0" class="cars-grid">
      <div
        v-for="vehicle in filteredVehicles"
        :key="vehicle.id"
        class="car-card"
        @click="goToDetail(vehicle.id)"
      >
        <div class="car-img">
          <img :src="getImageUrl(vehicle.coverImage)" :alt="vehicle.title" />
          <div class="car-badge">{{ vehicle.type }}</div>
          <button
            class="remove-btn"
            title="Quitar de favoritos"
            @click.stop="removeVehicle(vehicle.id)"
          >
            ×
          </button>
        </div>
        <div class="car-info">
          <div class="car-name">{{ vehicle.title }}</div>
          <div class="car-price">
            ${{ formatPrice(vehicle.price) }} <span class="currency">MXN</span>
          </div>
          <div class="car-specs">
            <span>{{ formatMileage(vehicle.mileageKm) }} km</span>
            <span class="dot">·</span>
            <span>{{ vehicle.transmission }}</span>
            <span class="dot">·</span>
            <span>{{ vehicle.fuel }}</span>
          </div>
          <div class="car-location">{{ getCityName(vehicle.cityId) }}</div>
          <div class="car-btns">
            <button class="btn-see" @click.stop="goToDetail(vehicle.id)">
              Ver auto
            </button>
            <button class="btn-appt" @click.stop="scheduleAppt(vehicle.id)">
              Agendar cita
            </button>
            <div class="btn-icon" title="Comparar">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M10 3H5a2 2 0 0 0-2 2v5M14 21h5a2 2 0 0 0 2-2v-5M21 10V5a2 2 0 0 0-2-2h-5M3 14v5a2 2 0 0 0 2 2h5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- EMPTY -->
    <div v-else class="empty-state">
      <div class="empty-icon"></div>
      <p class="empty-title">No hay vehículos guardados</p>
      <p class="empty-sub">Explora el catálogo y guarda los que te interesen</p>
      <button
        class="btn-explore"
        @click="router.push({ name: 'public-catalog' })"
      >
        Explorar catálogo →
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import savedVehiclesJson from '../../../mocks/buyer/saved-vehicles.json';

const router = useRouter();
const savedVehicles = ref(savedVehiclesJson.items || savedVehiclesJson);

const cityNames = {
  'mx-cdmx': 'Ciudad de México',
  'mx-gdl': 'Guadalajara',
  'mx-mty': 'Monterrey',
  'mx-pue': 'Puebla',
  'mx-mer': 'Mérida',
};
const getCityName = (id) => cityNames[id] || id;
const formatPrice = (p) => new Intl.NumberFormat('es-MX').format(p);
const formatMileage = (km) => new Intl.NumberFormat('es-MX').format(km);
const getImageUrl = (url) =>
  url?.includes('unsplash.com')
    ? `${url}?w=400&h=220&fit=crop&auto=format&q=80`
    : url || '';

const activeType = ref('Todos');
const typeFilters = computed(() => {
  const types = [...new Set(savedVehicles.value.map((v) => v.type))];
  return ['Todos', ...types];
});

const filteredVehicles = computed(() => {
  if (activeType.value === 'Todos') return savedVehicles.value;
  return savedVehicles.value.filter((v) => v.type === activeType.value);
});

const goToDetail = (id) =>
  router.push({ name: 'public-listing-detail', params: { id } });
const scheduleAppt = (id) =>
  router.push({
    name: 'public-appointments-calendar',
    query: { listingId: id },
  });
const removeVehicle = (id) => {
  savedVehicles.value = savedVehicles.value.filter((v) => v.id !== id);
};
</script>

<style scoped>
.saved-page {
  --bg: transparent;
  --surface: #ffffff;
  --surface2: #f8fafc;
  --border: #e2e8f0;
  --accent: #3b82f6;
  --accent2: #60a5fa;
  --text: #1e293b;
  --muted: #64748b;
  --danger: #ef4444;
  --radius: 16px;
  font-family:
    'Inter',
    -apple-system,
    sans-serif;
  font-size: 14px;
  min-height: 100vh;
  padding: 28px 24px 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
  animation: fadeUp 0.4s ease both;
}
.page-title {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 4px;
}
.page-sub {
  font-size: 13px;
  color: var(--muted);
}
.header-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.filter-btn {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--muted);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.filter-btn:hover {
  border-color: var(--accent);
  color: var(--text);
  background: #f8fbff;
}
.filter-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.cars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  animation: fadeUp 0.45s 0.05s ease both;
}
.car-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  transition:
    border-color 0.2s,
    transform 0.2s;
  box-shadow: 0 2px 10px rgba(30, 58, 95, 0.06);
}
.car-card:hover {
  border-color: rgba(59, 130, 246, 0.35);
  transform: translateY(-4px);
}

.car-img {
  position: relative;
  width: 100%;
  height: 160px;
  background: var(--surface2);
}
.car-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.car-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(15, 30, 50, 0.75);
  color: #dbeafe;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 10px;
  font-weight: 700;
}
.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.remove-btn:hover {
  background: rgba(239, 68, 68, 0.3);
}

.car-info {
  padding: 14px 16px 16px;
}
.car-name {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
}
.car-price {
  font-size: 18px;
  font-weight: 800;
  color: var(--accent2);
  margin-bottom: 6px;
}
.currency {
  font-size: 12px;
  font-weight: 500;
  color: var(--muted);
}
.car-specs {
  font-size: 11px;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}
.dot {
  color: var(--border);
}
.car-location {
  font-size: 11px;
  color: var(--muted);
  margin-bottom: 14px;
}
.car-btns {
  display: flex;
  gap: 8px;
  align-items: center;
}
.btn-see {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
  transition: background 0.2s;
}
.btn-see:hover {
  background: #2563eb;
}
.btn-appt {
  background: var(--surface2);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
  transition: border-color 0.2s;
}
.btn-appt:hover {
  border-color: var(--accent);
  color: var(--accent2);
}
.btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--surface2);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  flex-shrink: 0;
  transition: border-color 0.2s;
}
.btn-icon svg {
  width: 14px;
  height: 14px;
  color: #64748b;
}
.btn-icon:hover {
  border-color: var(--accent);
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--muted);
  animation: fadeUp 0.4s ease both;
}
.empty-icon {
  font-size: 56px;
  margin-bottom: 16px;
}
.empty-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
}
.empty-sub {
  font-size: 13px;
  margin-bottom: 24px;
}
.btn-explore {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px 28px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-explore:hover {
  background: var(--accent2);
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
