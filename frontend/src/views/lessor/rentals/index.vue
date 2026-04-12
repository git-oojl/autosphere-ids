<template>
  <div class="lessor-dashboard">
    <div class="dashboard-wrapper">
      <div class="dashboard-container">
        <div class="dashboard-header">
          <div>
            <h1 class="dashboard-title">Dashboard de Arrendador</h1>
            <p class="dashboard-subtitle">
              Controla tus rentas activas y disponibilidad de flota
            </p>
          </div>
          <button class="btn-primary" @click="registerVehicle">
            Registrar vehículo
          </button>
        </div>

        <div class="stats-cards">
          <div class="stat-card">
            <h2 class="stat-title">Rentas activas</h2>
            <p class="stat-value">{{ activeRentals.length }}</p>
          </div>
          <div class="stat-card">
            <h2 class="stat-title">Vehículos totales</h2>
            <p class="stat-value">{{ totalVehicles }}</p>
          </div>
          <div class="stat-card">
            <h2 class="stat-title">Pendientes de cierre</h2>
            <p class="stat-value">{{ pendingClosures }}</p>
          </div>
          <div class="stat-card highlight">
            <h2 class="stat-title">Ingreso mensual</h2>
            <p class="stat-value">{{ monthlyRevenue }}</p>
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <h3 class="section-title">Rentas recientes</h3>
            <button class="btn-secondary" @click="viewAllRentals">
              Ver todas
            </button>
          </div>
          <div class="listings-table-container">
            <table class="listings-table">
              <thead>
                <tr>
                  <th>Vehículo</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="rental in activeRentals" :key="rental.id">
                  <td>{{ rental.vehicle }}</td>
                  <td>{{ formatDate(rental.startDate) }}</td>
                  <td>{{ formatDate(rental.endDate) }}</td>
                  <td>
                    <span class="status-badge">{{ rental.status }}</span>
                  </td>
                  <td class="action-row">
                    <button class="btn-secondary" @click="editRental(rental)">
                      Editar
                    </button>
                    <button
                      class="btn-secondary"
                      @click="closeRental(rental.id)"
                    >
                      Cerrar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const activeRentals = ref([
  {
    id: 'r-1',
    vehicle: 'Toyota Corolla 2024',
    startDate: '2026-02-14',
    endDate: '2026-03-14',
    status: 'Activo',
  },
  {
    id: 'r-2',
    vehicle: 'Honda CR-V 2025',
    startDate: '2026-04-03',
    endDate: '2026-04-28',
    status: 'Por cerrar',
  },
  {
    id: 'r-3',
    vehicle: 'Nissan Versa 2023',
    startDate: '2026-05-02',
    endDate: '2026-05-30',
    status: 'Activo',
  },
]);

const totalVehicles = computed(() => activeRentals.value.length + 2);
const pendingClosures = computed(
  () => activeRentals.value.filter((r) => r.status === 'Por cerrar').length
);
const monthlyRevenue = computed(() => {
  const total = activeRentals.value.length * 18400;
  return `$${new Intl.NumberFormat('es-MX').format(total)}`;
});

const formatDate = (date) =>
  new Date(date).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

const registerVehicle = () => router.push({ name: 'create-listing' });
const viewAllRentals = () => router.push({ name: 'user-rentals' });
const editRental = (rental) =>
  router.push({ name: 'lessor-rental-detail', params: { id: rental.id } });
const closeRental = (id) =>
  router.push({ name: 'lessor-close-rental', params: { id } });
</script>

<style scoped src="./styles.css"></style>
