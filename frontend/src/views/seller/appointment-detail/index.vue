<template>
  <section v-if="appointment" class="detail-page">
    <header class="hero">
      <p class="eyebrow">AutoSphere</p>
      <h1>{{ detailTitle }}</h1>
      <p>{{ appointment.listingTitle }}</p>
      <small class="hero-meta">{{ surfaceMeta }}</small>
      <span class="status" :class="appointment.status">{{
        statusLabel(appointment.status)
      }}</span>
    </header>
    <div class="content-grid">
      <article class="card">
        <h2>Comprador y cita</h2>
        <dl class="details-grid">
          <div>
            <dt>Comprador</dt>
            <dd>
              {{ appointment.buyer?.name || appointment.buyerName || '—' }}
            </dd>
          </div>
          <div>
            <dt>Fecha</dt>
            <dd>{{ formatDate(appointment.date) }}</dd>
          </div>
          <div>
            <dt>Hora</dt>
            <dd>{{ appointment.time || 'Pendiente' }}</dd>
          </div>
          <div>
            <dt>Ubicación</dt>
            <dd>{{ appointment.locationLabel }}</dd>
          </div>
        </dl>
      </article>
      <article class="card">
        <h2>Acciones</h2>
        <div class="actions">
          <button @click="router.push({ name: 'seller-appointments' })">
            Volver a citas
          </button>
          <button
            class="secondary"
            :disabled="!canOpenListing"
            @click="openListing"
          >
            Ver publicación
          </button>
        </div>
      </article>
    </div>
  </section>
  <section v-else class="detail-page">
    <div class="card">
      <h1>Cita no encontrada</h1>
      <button @click="router.push({ name: 'seller-appointments' })">
        Volver
      </button>
    </div>
  </section>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAppointmentById } from '../../../services/appointments.js';
const route = useRoute();
const router = useRouter();
const appointment = ref(null);
const canOpenListing = computed(() => Boolean(appointment.value?.listingId));
const isRentalAppointment = computed(() => {
  const item = appointment.value;
  if (!item) return false;
  return (
    String(item.listingId || '').startsWith('rt-') || item.tipo === 'renta'
  );
});
const detailTitle = computed(() => 'Detalle de cita con cliente');
const surfaceMeta = computed(() =>
  isRentalAppointment.value ? 'Publicación de renta' : 'Publicación de venta'
);
function statusLabel(status) {
  return (
    {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      rescheduled: 'Reagendada',
      cancelled: 'Cancelada',
      completed: 'Completada',
    }[status] || status
  );
}
function formatDate(value) {
  if (!value) return 'Fecha pendiente';
  return new Date(`${value}T00:00:00`).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
function openListing() {
  if (!appointment.value?.listingId) return;
  router.push({
    name: 'seller-listing-detail',
    params: { id: appointment.value.listingId },
  });
}
onMounted(async () => {
  appointment.value = await getAppointmentById(route.params.id);
});
</script>
<style scoped>
.detail-page {
  padding: 112px 24px 40px;
  display: grid;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
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
.hero-meta {
  display: block;
  margin-top: 8px;
  color: #64748b;
  font-size: 13px;
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
.status {
  display: inline-flex;
  width: fit-content;
  padding: 6px 12px;
  border-radius: 999px;
  background: #e2e8f0;
}
.status.pending,
.status.rescheduled {
  background: #fef3c7;
  color: #92400e;
}
.status.confirmed {
  background: #dcfce7;
  color: #166534;
}
.status.cancelled {
  background: #fee2e2;
  color: #991b1b;
}
.status.completed {
  background: #dbeafe;
  color: #1d4ed8;
}
.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
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
.actions button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.secondary {
  background: #e2e8f0;
  color: #0f172a;
}
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
