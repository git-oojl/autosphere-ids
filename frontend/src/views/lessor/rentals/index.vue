<template>
  <div class="lessor-dashboard">
    <div class="dashboard-wrapper">
      <div class="dashboard-container">
        <div class="dashboard-header">
          <div>
            <h1 class="dashboard-title">Dashboard de Arrendador</h1>
            <p class="dashboard-subtitle">
              Controla tu inventario en renta y su disponibilidad publicada
            </p>
          </div>
          <button class="btn-primary" @click="registerVehicle">
            Nuevo anuncio
          </button>
        </div>

        <div class="stats-cards">
          <div class="stat-card">
            <h2 class="stat-title">Publicadas</h2>
            <p class="stat-value">{{ activeRentals.length }}</p>
          </div>
          <div class="stat-card">
            <h2 class="stat-title">Total inventario</h2>
            <p class="stat-value">{{ totalVehicles }}</p>
          </div>
          <div class="stat-card">
            <h2 class="stat-title">No disponibles</h2>
            <p class="stat-value">{{ pendingClosures }}</p>
          </div>
          <div class="stat-card highlight">
            <h2 class="stat-title">Precio promedio por día</h2>
            <p class="stat-value">{{ monthlyRevenue }}</p>
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <h3 class="section-title">Vehículos en renta</h3>
            <button class="btn-secondary" @click="viewAllRentals">
              Ver todas
            </button>
          </div>
          <div class="listings-table-container">
            <table class="listings-table">
              <thead>
                <tr>
                  <th>Vehículo</th>
                  <th>Disponible desde</th>
                  <th>Disponible hasta</th>
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
                      Ver detalle
                    </button>
                    <button
                      class="btn-secondary"
                      @click="closeRental(rental.id)"
                    >
                      Cerrar renta
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
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getListings } from '../../../services/catalog.js';
import { DEMO_RENTAL_OWNER_ID, DEMO_SALE_OWNER_ID } from '../../../services/demoOwners.js';

const router = useRouter();
const activeRentals = ref([]);

const loadRentals = async () => {
  const response = await getListings({ mode: 'renta', sellerId: DEMO_RENTAL_OWNER_ID, pageSize: 100, includeUnpublished: true });
  activeRentals.value = (response?.items || []).map((item) => ({
    id: item.id,
    vehicle: item.title,
    startDate: item.availableFrom,
    endDate: item.availableTo,
    status: item.available === false ? 'No disponible' : 'Disponible',
    pricePerDay: item.pricePerDay || item.price,
  }));
};

onMounted(loadRentals);

const totalVehicles = computed(() => activeRentals.value.length);
const pendingClosures = computed(() => activeRentals.value.filter((rental) => rental.status === 'No disponible').length);
const monthlyRevenue = computed(() => {
  if (!activeRentals.value.length) return '$0';
  const average = activeRentals.value.reduce((sum, rental) => sum + Number(rental.pricePerDay || 0), 0) / activeRentals.value.length;
  return `$${new Intl.NumberFormat('es-MX').format(Math.round(average))}`;
});

const formatDate = (date) => {
  if (!date) return '—';
  return new Date(`${date}T00:00:00`).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const registerVehicle = () => router.push({ name: 'create-listing' });
const viewAllRentals = () => router.push({ name: 'user-rentals' });
const editRental = (rental) => router.push({ name: 'lessor-rental-detail', params: { id: rental.id } });
const closeRental = (id) => router.push({ name: 'lessor-close-rental', params: { id } });
</script>

<style scoped src="./styles.css"></style>
