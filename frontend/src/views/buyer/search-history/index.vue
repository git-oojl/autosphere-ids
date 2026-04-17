<template>
  <section class="history-page">
    <header class="hero">
      <p class="eyebrow">AutoSphere</p>
      <h1>Historial de búsqueda</h1>
      <p>
        Repite búsquedas reales del catálogo o limpia entradas de esta vista sin
        salir de tu cuenta.
      </p>
    </header>

    <div v-if="items.length" class="history-list">
      <article v-for="item in items" :key="item.id" class="card history-item">
        <div>
          <strong>{{ item.query }}</strong>
          <p>{{ formatDate(item.timestamp) }}</p>
          <small v-if="item.filtersSummary">{{ item.filtersSummary }}</small>
          <small v-else-if="typeof item.resultCount === 'number'">
            {{ item.resultCount }} resultados recientes
          </small>
        </div>
        <div class="actions">
          <button @click="repeatSearch(item.query)">Buscar de nuevo</button>
          <button class="secondary" @click="removeItem(item.id)">
            Quitar del historial
          </button>
        </div>
      </article>
    </div>

    <div v-else class="card empty-state">
      <h2>Sin historial visible</h2>
      <button @click="router.push({ name: 'public-catalog' })">
        Buscar vehículos
      </button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  getSearchHistory,
  removeSearchHistoryItem,
} from '../../../services/buyer.js';

const router = useRouter();
const items = ref([]);

function formatDate(value) {
  return new Date(value).toLocaleString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function repeatSearch(query) {
  router.push({ name: 'public-catalog', query: { q: query } });
}

async function removeItem(id) {
  await removeSearchHistoryItem(id);
  items.value = items.value.filter((item) => item.id !== id);
}

onMounted(async () => {
  const response = await getSearchHistory();
  items.value = response?.items || [];
});
</script>

<style scoped>
.history-page{padding:112px 24px 40px;display:grid;gap:24px}.hero,.card{background:#fff;border-radius:24px;padding:24px;box-shadow:0 16px 40px rgba(15,30,44,.08)}.eyebrow{text-transform:uppercase;letter-spacing:.12em;font-size:12px;color:#64748b}.history-list{display:grid;gap:16px}.history-item{display:flex;justify-content:space-between;gap:16px;align-items:center}.actions{display:flex;gap:12px;flex-wrap:wrap}.actions button,.empty-state button{border:none;border-radius:999px;padding:12px 16px;background:#0f1e2c;color:#fff;cursor:pointer}.secondary{background:#e2e8f0;color:#0f172a}@media(max-width:768px){.history-item{flex-direction:column;align-items:flex-start}}
</style>
