<template>
  <section class="simple-page">
    <div class="card">
      <p class="eyebrow">AutoSphere Rentas</p>
      <h1>Cerrar renta</h1>
      <p>
        Usa esta acción como paso final del flujo para revisar la publicación y registrar la entrega del vehículo.
      </p>
      <div class="actions">
        <button @click="router.push({ name: 'lessor-rental-detail', params: { id: route.params.id } })">
          Revisar detalle
        </button>
        <button class="secondary" @click="router.push({ name: 'user-rentals' })">
          Volver a mis rentas
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
</script>

<style scoped>
.simple-page{padding:120px 24px 40px;display:grid;place-items:center}
.card{max-width:640px;background:#fff;border-radius:24px;padding:32px;box-shadow:0 16px 40px rgba(15,30,44,.08);display:grid;gap:16px}
.eyebrow{text-transform:uppercase;letter-spacing:.12em;font-size:12px;color:#64748b}
.actions{display:flex;gap:12px;flex-wrap:wrap}
button{border:none;border-radius:999px;padding:12px 16px;background:#0f1e2c;color:#fff;cursor:pointer}
.secondary{background:#e2e8f0;color:#0f172a}
</style>
