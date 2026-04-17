<template>
  <section class="appointments-page">
    <header class="hero">
      <p class="eyebrow">AutoSphere</p>
      <h1>Próximas citas</h1>
      <p>
        Resumen enfocado en próximas fechas, con acceso directo al detalle
        completo.
      </p>
    </header>

    <div v-if="appointments.length" class="list-grid">
      <article
        v-for="appointment in appointments"
        :key="appointment.id"
        class="card appointment-card"
      >
        <div>
          <span class="status">{{ statusLabel(appointment.status) }}</span>
          <h2>{{ appointment.listingTitle }}</h2>
          <p>{{ formatDate(appointment.date) }} · {{ appointment.time }}</p>
        </div>
        <button
          @click="
            router.push({
              name: 'buyer-appointment-detail',
              params: { id: appointment.id },
            })
          "
        >
          Abrir detalle
        </button>
      </article>
    </div>

    <div v-else class="card empty-state">
      <h2>No tienes citas próximas</h2>
      <button @click="router.push({ name: 'public-catalog' })">
        Agendar una cita
      </button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getUpcomingAppointments } from '../../../services/buyer.js';

const router = useRouter();
const appointments = ref([]);
function statusLabel(status) {
  return (
    {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      rescheduled: 'Reagendada',
    }[status] || status
  );
}
function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
onMounted(async () => {
  appointments.value = await getUpcomingAppointments();
});
</script>

<style scoped>
.appointments-page {
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
.list-grid {
  display: grid;
  gap: 16px;
}
.appointment-card {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
}
.status {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  background: #fef3c7;
  color: #92400e;
  margin-bottom: 12px;
}
button {
  border: none;
  border-radius: 999px;
  padding: 12px 16px;
  background: #0f1e2c;
  color: #fff;
  cursor: pointer;
}
@media (max-width: 768px) {
  .appointment-card {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
