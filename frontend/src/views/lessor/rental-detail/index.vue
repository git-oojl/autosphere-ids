<template>
  <section v-if="rental" class="detail-page">
    <header class="hero">
      <p class="eyebrow">AutoSphere</p>
      <h1>Detalle de renta</h1>
      <p>{{ rental.vehicleLabel }}</p>
      <span class="status">{{ rental.status }}</span>
    </header>

    <div class="content-grid">
      <article class="card">
        <h2>Contrato visible</h2>
        <dl class="details-grid">
          <div>
            <dt>Cliente</dt>
            <dd>{{ rental.clientName }}</dd>
          </div>
          <div>
            <dt>Inicio</dt>
            <dd>{{ formatDate(rental.startDate) }}</dd>
          </div>
          <div>
            <dt>Fin</dt>
            <dd>{{ formatDate(rental.endDate) }}</dd>
          </div>
          <div>
            <dt>Renta mensual</dt>
            <dd>${{ formatPrice(rental.monthlyRate) }}</dd>
          </div>
          <div>
            <dt>Depósito</dt>
            <dd>${{ formatPrice(rental.deposit) }}</dd>
          </div>
          <div>
            <dt>Entrega</dt>
            <dd>{{ rental.pickupLocation }}</dd>
          </div>
        </dl>
      </article>
      <article class="card">
        <h2>Acciones</h2>
        <div class="actions">
          <button
            v-if="rental.status !== 'closed'"
            @click="
              router.push({
                name: 'lessor-close-rental',
                params: { id: rental.id },
              })
            "
          >
            Cerrar renta
          </button>
          <button
            class="secondary"
            @click="router.push({ name: 'user-rentals' })"
          >
            Volver a rentas
          </button>
        </div>
        <p class="notes">{{ rental.notes }}</p>
      </article>
    </div>
  </section>
  <section v-else class="detail-page">
    <div class="card">
      <h1>Renta no encontrada</h1>
      <button @click="router.push({ name: 'user-rentals' })">Volver</button>
    </div>
  </section>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getRentalById } from '../../../services/lessor.js';
const route = useRoute();
const router = useRouter();
const rental = ref(null);
const formatPrice = (value) =>
  new Intl.NumberFormat('es-MX').format(value || 0);
const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
onMounted(async () => {
  rental.value = await getRentalById(route.params.id);
});
</script>
<style scoped>
.detail-page {
  padding: 112px 24px 40px;
  display: grid;
  gap: 24px;
}
.hero,
.card {
  background: #fff;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 16px 40px rgba(15, 30, 44, 0.08);
}
.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 12px;
  color: #64748b;
}
.status {
  display: inline-flex;
  width: fit-content;
  padding: 6px 12px;
  border-radius: 999px;
  background: #e2e8f0;
}
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}
.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}
.details-grid dt {
  font-size: 13px;
  color: #64748b;
}
.details-grid dd {
  margin: 4px 0 0;
  font-weight: 600;
}
.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.actions button,
.card > button {
  border: none;
  border-radius: 999px;
  padding: 12px 16px;
  background: #0f1e2c;
  color: #fff;
  cursor: pointer;
}
.secondary {
  background: #e2e8f0;
  color: #0f172a;
}
.notes {
  color: #475569;
}
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
