<template>
  <section class="appointments-page">
    <header class="hero">
      <p class="eyebrow">AutoSphere</p>
      <h1>Mis citas</h1>
      <p>Listado completo para revisar estado, abrir detalle y volver al catálogo con continuidad real.</p>
    </header>

    <div class="list-grid" v-if="appointments.length">
      <article v-for="appointment in appointments" :key="appointment.id" class="card appointment-card">
        <div>
          <span class="status" :class="appointment.status">{{ statusLabel(appointment.status) }}</span>
          <h2>{{ appointment.listingTitle }}</h2>
          <p>{{ formatDate(appointment.date) }} · {{ appointment.time || 'Hora por confirmar' }}</p>
          <p>{{ appointment.locationLabel }}</p>
        </div>
        <div class="actions">
          <button @click="openDetail(appointment.id)">Ver detalle</button>
          <button class="secondary" @click="openListing(appointment.listingId)">Ver vehículo</button>
        </div>
      </article>
    </div>

    <div v-else class="card empty-state">
      <h2>Aún no tienes citas registradas</h2>
      <p>Explora el catálogo y agenda una revisión o prueba de manejo desde el detalle del vehículo.</p>
      <button @click="router.push({ name: 'public-catalog' })">Ir al catálogo</button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getBuyerAppointments } from '../../../services/appointments.js';

const router = useRouter();
const appointments = ref([]);

function statusLabel(status) {
  return ({ pending: 'Pendiente', confirmed: 'Confirmada', rescheduled: 'Reagendada', cancelled: 'Cancelada', completed: 'Completada' })[status] || status;
}

function formatDate(value) {
  if (!value) return 'Fecha por confirmar';
  return new Date(`${value}T00:00:00`).toLocaleDateString('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function openDetail(id) {
  router.push({ name: 'buyer-appointment-detail', params: { id } });
}

function openListing(id) {
  router.push({ name: 'public-listing-detail', params: { id } });
}

onMounted(async () => {
  appointments.value = await getBuyerAppointments();
});
</script>

<style scoped>
.appointments-page{padding:112px 24px 40px;display:grid;gap:24px}.hero,.card{background:#fff;border-radius:24px;padding:24px;box-shadow:0 16px 40px rgba(15,30,44,.08)}.eyebrow{text-transform:uppercase;letter-spacing:.12em;font-size:12px;color:#64748b}.list-grid{display:grid;gap:16px}.appointment-card{display:flex;justify-content:space-between;gap:16px;align-items:center}.status{display:inline-flex;padding:6px 12px;border-radius:999px;background:#e2e8f0;margin-bottom:12px}.status.pending,.status.rescheduled{background:#fef3c7;color:#92400e}.status.confirmed{background:#dcfce7;color:#166534}.status.cancelled{background:#fee2e2;color:#991b1b}.status.completed{background:#dbeafe;color:#1d4ed8}.actions{display:flex;gap:12px;flex-wrap:wrap}.actions button,.empty-state button{border:none;border-radius:999px;padding:12px 16px;background:#0f1e2c;color:#fff;cursor:pointer}.actions .secondary{background:#e2e8f0;color:#0f172a}.empty-state{display:grid;gap:12px}@media(max-width:768px){.appointment-card{flex-direction:column;align-items:flex-start}}
</style>
