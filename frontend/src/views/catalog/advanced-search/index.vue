<template>
  <section class="advanced-search-page">
    <header class="hero">
      <p class="eyebrow">AutoSphere</p>
      <h1>Búsqueda avanzada</h1>
      <p>Consolida los filtros críticos y envíalos al catálogo sin dejar pantallas rotas ni controles huérfanos.</p>
    </header>

    <form class="card form-grid" @submit.prevent="applyFilters">
      <label>
        <span>Modo</span>
        <select v-model="form.mode">
          <option value="venta">Venta</option>
          <option value="renta">Renta</option>
        </select>
      </label>
      <label>
        <span>Marca</span>
        <select v-model="form.brand">
          <option value="">Todas</option>
          <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
        </select>
      </label>
      <label>
        <span>Tipo</span>
        <select v-model="form.type">
          <option value="">Todos</option>
          <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
        </select>
      </label>
      <label>
        <span>Ciudad</span>
        <select v-model="form.cityId">
          <option value="">Todas</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.label }}</option>
        </select>
      </label>
      <label>
        <span>Precio mínimo</span>
        <input v-model="form.minPrice" type="number" min="0" />
      </label>
      <label>
        <span>Precio máximo</span>
        <input v-model="form.maxPrice" type="number" min="0" />
      </label>
      <label>
        <span>Año mínimo</span>
        <input v-model="form.minYear" type="number" min="1990" />
      </label>
      <label>
        <span>Año máximo</span>
        <input v-model="form.maxYear" type="number" min="1990" />
      </label>
      <label class="full-width">
        <span>Búsqueda libre</span>
        <input v-model="form.q" type="text" placeholder="Marca, modelo, ciudad o anunciante" />
      </label>
      <div class="actions full-width">
        <button type="submit">Ver resultados</button>
        <button type="button" class="secondary" @click="resetFilters">Limpiar</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCatalogFilters } from '../../../services/catalog.js';

const router = useRouter();
const brands = ref([]);
const types = ref([]);
const cities = ref([]);
const form = ref({
  mode: 'venta',
  brand: '',
  type: '',
  cityId: '',
  minPrice: '',
  maxPrice: '',
  minYear: '',
  maxYear: '',
  q: '',
});

function resetFilters() {
  form.value = {
    mode: 'venta',
    brand: '',
    type: '',
    cityId: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    q: '',
  };
}

function applyFilters() {
  router.push({
    name: 'public-catalog',
    query: Object.fromEntries(
      Object.entries(form.value).filter(([, value]) => value !== '' && value !== null)
    ),
  });
}

onMounted(async () => {
  const filters = await getCatalogFilters();
  brands.value = filters.brands || [];
  types.value = filters.types || [];
  cities.value = filters.cities || [];
});
</script>

<style scoped>
.advanced-search-page { padding: 120px 24px 40px; display:grid; gap:24px; }
.hero,.card { background:white; border-radius:24px; padding:24px; box-shadow:0 16px 40px rgba(15,30,44,.08); }
.eyebrow { text-transform: uppercase; letter-spacing: .12em; font-size:12px; color:#64748b; }
.form-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)); gap:16px; }
label { display:grid; gap:8px; color:#334155; }
input,select { border:1px solid #cbd5e1; border-radius:14px; padding:12px 14px; }
.full-width { grid-column: 1 / -1; }
.actions { display:flex; gap:12px; flex-wrap:wrap; }
button { border:none; border-radius:999px; padding:12px 18px; background:#0f1e2c; color:white; cursor:pointer; }
button.secondary { background:#e2e8f0; color:#0f172a; }
</style>
