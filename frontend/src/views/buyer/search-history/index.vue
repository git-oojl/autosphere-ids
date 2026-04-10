<template>
  <div class="history-page">
    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Historial de Búsquedas</h1>
        <p class="page-sub">
          {{ searchHistory.length }} búsquedas registradas este mes
        </p>
      </div>
      <button
        v-if="searchHistory.length > 0"
        class="btn-clear-all"
        @click="clearAll"
      >
        Limpiar todo
      </button>
    </div>

    <!-- SAVED SEARCHES -->
    <div class="section-label">Búsquedas guardadas</div>
    <div v-if="savedSearches.length > 0" class="searches-card">
      <div
        v-for="(s, i) in savedSearches"
        :key="'saved-' + i"
        class="search-row saved"
      >
        <div class="search-left">
          <div class="saved-icon"></div>
          <div>
            <div class="search-text">{{ s.query }}</div>
            <div class="search-meta">
              <span> {{ s.date }}</span>
              <span class="sep">·</span>
              <span>{{ s.resultsCount }} resultados</span>
              <span class="sep">·</span>
              <span class="tag-saved">Guardada</span>
            </div>
          </div>
        </div>
        <div class="search-actions">
          <button class="btn-link btn-link-blue" @click="repeatSearch(s)">
            Buscar de nuevo
          </button>
          <button class="btn-link btn-link-muted" @click="unsaveSearch(i)">
            Quitar
          </button>
          <button class="btn-close-sm" @click="removeSearch('saved', i)">
            ×
          </button>
        </div>
      </div>
    </div>
    <div v-else class="empty-section">
      <p>No tienes búsquedas guardadas aún.</p>
    </div>

    <!-- RECENT SEARCHES -->
    <div class="section-label" style="margin-top: 28px">
      Búsquedas recientes
    </div>
    <div v-if="recentSearches.length > 0" class="searches-card">
      <div
        v-for="(s, i) in recentSearches"
        :key="'recent-' + i"
        class="search-row"
      >
        <div class="search-left">
          <div class="recent-icon"></div>
          <div>
            <div class="search-text">{{ s.query }}</div>
            <div class="search-meta">
              <span>{{ s.date }}</span>
              <span class="sep">·</span>
              <span>{{ s.resultsCount }} resultados</span>
            </div>
          </div>
        </div>
        <div class="search-actions">
          <button class="btn-link btn-link-blue" @click="repeatSearch(s)">
            Buscar de nuevo
          </button>
          <button class="btn-link btn-link-muted" @click="saveSearch(i)">
            Guardar
          </button>
          <button class="btn-close-sm" @click="removeSearch('recent', i)">
            ×
          </button>
        </div>
      </div>
    </div>
    <div v-else class="empty-section">
      <p>No hay búsquedas recientes.</p>
    </div>

    <!-- EMPTY TOTAL -->
    <div v-if="searchHistory.length === 0" class="empty-state">
      <div class="empty-icon"></div>
      <p class="empty-title">Sin historial de búsquedas</p>
      <p class="empty-sub">
        Cuando busques vehículos, tu historial aparecerá aquí
      </p>
      <button
        class="btn-explore"
        @click="router.push({ name: 'public-catalog' })"
      >
        Ir al catálogo →
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const savedSearches = ref([
  {
    query: 'SUV · Automático · 4x4 · Menos de 50,000 km',
    date: 'Hoy 10:30',
    resultsCount: 5,
  },
]);

const recentSearches = ref([
  {
    query: 'Honda Civic · 2022-2024 · Gasolina · Manual',
    date: 'Ayer 14:20',
    resultsCount: 12,
  },
  {
    query: 'Diésel · Manual · Menos de 100,000 km · Menos de $20,000',
    date: 'Ayer 11:45',
    resultsCount: 23,
  },
  { query: 'Toyota Corolla · 2020-2023', date: 'Hace 2 días', resultsCount: 8 },
  {
    query: 'Camioneta · 4x4 · Automático',
    date: 'Hace 3 días',
    resultsCount: 17,
  },
]);

const searchHistory = computed(() => [
  ...savedSearches.value,
  ...recentSearches.value,
]);

const repeatSearch = (s) => {
  router.push({ name: 'public-catalog', query: { q: s.query } });
};

const saveSearch = (i) => {
  const s = recentSearches.value.splice(i, 1)[0];
  savedSearches.value.unshift(s);
};

const unsaveSearch = (i) => {
  const s = savedSearches.value.splice(i, 1)[0];
  recentSearches.value.unshift(s);
};

const removeSearch = (type, i) => {
  if (type === 'saved') savedSearches.value.splice(i, 1);
  else recentSearches.value.splice(i, 1);
};

const clearAll = () => {
  savedSearches.value = [];
  recentSearches.value = [];
};
</script>

<style scoped>
.history-page {
  --bg: transparent;
  --surface: #ffffff;
  --surface2: #f8fafc;
  --border: #e2e8f0;
  --accent: #3b82f6;
  --accent2: #60a5fa;
  --text: #1e293b;
  --muted: #64748b;
  --danger: #ef4444;
  --success: #22c55e;
  --warning: #f59e0b;
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
.btn-clear-all {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-clear-all:hover {
  background: rgba(239, 68, 68, 0.2);
}

.section-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--muted);
  margin-bottom: 12px;
}

.searches-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  animation: fadeUp 0.45s 0.05s ease both;
  box-shadow: 0 2px 10px rgba(30, 58, 95, 0.06);
}
.search-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  transition: background 0.2s;
  gap: 12px;
}
.search-row:last-child {
  border-bottom: none;
}
.search-row:hover {
  background: var(--surface2);
}
.search-row.saved {
  background: rgba(59, 130, 246, 0.04);
}
.search-row.saved:hover {
  background: rgba(59, 130, 246, 0.08);
}

.search-left {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
  min-width: 0;
}
.saved-icon,
.recent-icon {
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 2px;
}
.search-text {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.search-meta {
  font-size: 11px;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.sep {
  color: var(--border);
}
.tag-saved {
  background: rgba(59, 130, 246, 0.15);
  color: var(--accent2);
  border-radius: 4px;
  padding: 1px 6px;
  font-size: 10px;
  font-weight: 600;
}

.search-actions {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-shrink: 0;
}
.btn-link {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 6px;
  transition:
    background 0.2s,
    color 0.2s;
  white-space: nowrap;
}
.btn-link-blue {
  color: var(--accent2);
}
.btn-link-blue:hover {
  background: rgba(59, 130, 246, 0.1);
}
.btn-link-muted {
  color: var(--muted);
}
.btn-link-muted:hover {
  background: var(--surface2);
  color: var(--text);
}
.btn-close-sm {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--muted);
  font-size: 16px;
  padding: 2px 6px;
  border-radius: 4px;
  transition: color 0.2s;
}
.btn-close-sm:hover {
  color: var(--danger);
}

.empty-section {
  padding: 20px 0;
  font-size: 13px;
  color: var(--muted);
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
