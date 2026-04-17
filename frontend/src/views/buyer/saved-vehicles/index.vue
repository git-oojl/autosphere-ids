<template>
  <section class="saved-page">
    <header class="hero">
      <p class="eyebrow">AutoSphere</p>
      <h1>Vehículos guardados</h1>
      <p>Tu lista guardada ya existe como superficie real, con salto a detalle y perfil del anunciante.</p>
    </header>

    <div v-if="items.length" class="grid">
      <article v-for="item in items" :key="item.id" class="card vehicle-card">
        <img :src="item.coverImage" :alt="item.title" />
        <div class="content">
          <h2>{{ item.title }}</h2>
          <p>{{ item.city?.name || item.cityLabel }} · {{ item.year }}</p>
          <strong>${{ formatPrice(item.price) }}</strong>
          <div class="actions">
            <button @click="openListing(item.id)">Ver detalle</button>
            <button class="secondary" @click="openSeller(item.sellerId)">Ver anunciante</button>
          </div>
        </div>
      </article>
    </div>

    <div v-else class="card empty-state">
      <h2>No hay vehículos guardados</h2>
      <button @click="router.push({ name: 'public-catalog' })">Explorar catálogo</button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getSavedVehicles } from '../../../services/buyer.js';

const router = useRouter();
const items = ref([]);
const formatPrice = (value) => new Intl.NumberFormat('es-MX').format(value || 0);
function openListing(id) { router.push({ name: 'public-listing-detail', params: { id } }); }
function openSeller(id) { if (id) router.push({ name: 'public-user-profile', params: { id } }); }
onMounted(async () => { const response = await getSavedVehicles(); items.value = response?.items || []; });
</script>

<style scoped>
.saved-page{padding:112px 24px 40px;display:grid;gap:24px}.hero,.card{background:#fff;border-radius:24px;padding:24px;box-shadow:0 16px 40px rgba(15,30,44,.08)}.eyebrow{text-transform:uppercase;letter-spacing:.12em;font-size:12px;color:#64748b}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}.vehicle-card{padding:0;overflow:hidden}.vehicle-card img{width:100%;height:180px;object-fit:cover}.content{padding:18px;display:grid;gap:8px}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:8px}.actions button,.empty-state button{border:none;border-radius:999px;padding:12px 16px;background:#0f1e2c;color:#fff;cursor:pointer}.secondary{background:#e2e8f0;color:#0f172a}
</style>
