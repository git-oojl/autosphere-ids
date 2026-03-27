<template>
  <div class="lessor-dashboard">
    <v-container class="pa-4 pa-md-6">
      <!-- Header -->
      <v-row class="mb-6">
        <v-col cols="12">
          <div class="dashboard-header">
            <h1 class="dashboard-title">Dashboard del arrendador</h1>
            <p class="dashboard-subtitle">
              Gestiona tus vehículos y rentas activas
            </p>
          </div>
        </v-col>
      </v-row>

      <!-- Stats Cards -->
      <v-row class="mb-8">
        <v-col cols="12" md="4">
          <div class="stat-card">
            <div class="stat-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
                />
                <path d="M17 21v-4H7v4M7 3v4h10" />
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-value">{{ activeRentals.length }}</p>
              <p class="stat-label">Rentas activas</p>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="stat-card">
            <div class="stat-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-value">{{ totalVehicles }}</p>
              <p class="stat-label">Vehículos registrados</p>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="stat-card">
            <div class="stat-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-value">{{ monthlyRevenue }}</p>
              <p class="stat-label">Ingresos mensuales</p>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Active Rentals Section -->
      <v-row class="mb-8">
        <v-col cols="12">
          <div class="section-card">
            <div class="section-header">
              <div class="section-title-wrapper">
                <div class="section-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M8 2v4M16 2v4M3 10h18" />
                  </svg>
                </div>
                <h2 class="section-title">Rentas activas</h2>
              </div>
              <v-btn
                class="view-all-btn"
                variant="text"
                @click="viewAllRentals"
              >
                Ver todas
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="18"
                  height="18"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </v-btn>
            </div>

            <div class="table-responsive">
              <table class="rentals-table">
                <thead>
                  <tr>
                    <th>Vehículo</th>
                    <th>Inicio</th>
                    <th>Fin</th>
                    <th>Estado vehículo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="rental in paginatedRentals" :key="rental.id">
                    <td>
                      <div class="vehicle-info">
                        <div class="vehicle-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <rect x="2" y="8" width="20" height="12" rx="2" />
                            <circle cx="7" cy="16" r="2" />
                            <circle cx="17" cy="16" r="2" />
                          </svg>
                        </div>
                        <span>{{ rental.vehicle }}</span>
                      </div>
                    </td>
                    <td>{{ formatDate(rental.startDate) }}</td>
                    <td>{{ formatDate(rental.endDate) }}</td>
                    <td>
                      <span
                        :class="['status-badge', getStatusClass(rental.status)]"
                      >
                        {{ rental.status }}
                      </span>
                    </td>
                    <td>
                      <div class="action-buttons">
                        <button
                          class="action-btn edit"
                          @click="editRental(rental)"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path d="M17 3l4 4-7 7H10v-4l7-7z" />
                            <path d="M4 20h16" />
                          </svg>
                        </button>
                        <button
                          class="action-btn delete"
                          @click="deleteRental(rental.id)"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="pagination">
              <button
                class="page-btn"
                :disabled="currentPage === 1"
                @click="currentPage--"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <span class="page-info"
                >Página {{ currentPage }} de {{ totalPages }}</span
              >
              <button
                class="page-btn"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Register New Vehicle Section -->
      <v-row>
        <v-col cols="12">
          <div class="section-card">
            <div class="section-header">
              <div class="section-title-wrapper">
                <div class="section-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
                <h2 class="section-title">Registrar nuevo vehículo</h2>
              </div>
              <p class="section-subtitle">
                Completa los datos para poner tu vehículo en renta
              </p>
            </div>

            <form class="vehicle-form" @submit.prevent="registerVehicle">
              <!-- Información básica -->
              <div class="form-group">
                <h3 class="form-section-title">Información básica</h3>
                <div class="form-grid">
                  <div class="form-field">
                    <label>Marca</label>
                    <input
                      v-model="form.brand"
                      type="text"
                      placeholder="Ej. Toyota"
                      required
                    />
                  </div>
                  <div class="form-field">
                    <label>Modelo</label>
                    <input
                      v-model="form.model"
                      type="text"
                      placeholder="Ej. Corolla"
                      required
                    />
                  </div>
                  <div class="form-field">
                    <label>Año</label>
                    <input
                      v-model="form.year"
                      type="number"
                      placeholder="2024"
                      required
                    />
                  </div>
                  <div class="form-field">
                    <label>Color</label>
                    <input
                      v-model="form.color"
                      type="text"
                      placeholder="Blanco"
                    />
                  </div>
                  <div class="form-field">
                    <label>Kilometraje</label>
                    <input
                      v-model="form.mileage"
                      type="number"
                      placeholder="5000"
                    />
                  </div>
                  <div class="form-field">
                    <label>Transmisión</label>
                    <select v-model="form.transmission">
                      <option value="">Seleccionar</option>
                      <option>Manual</option>
                      <option>Automática</option>
                      <option>Semi-automática</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Detalles del vehículo -->
              <div class="form-group">
                <h3 class="form-section-title">Detalles del vehículo</h3>
                <div class="form-grid">
                  <div class="form-field">
                    <label>Tipo de combustible</label>
                    <select v-model="form.fuelType">
                      <option value="">Seleccionar</option>
                      <option>Gasolina</option>
                      <option>Diésel</option>
                      <option>Eléctrico</option>
                      <option>Híbrido</option>
                    </select>
                  </div>
                  <div class="form-field">
                    <label>Número de puertas</label>
                    <input
                      v-model="form.doors"
                      type="number"
                      min="1"
                      max="5"
                      placeholder="4"
                    />
                  </div>
                  <div class="form-field">
                    <label>Placa</label>
                    <input
                      v-model="form.plate"
                      type="text"
                      placeholder="ABC-123"
                    />
                  </div>
                </div>
              </div>

              <!-- Información de renta -->
              <div class="form-group">
                <h3 class="form-section-title">Información de renta</h3>
                <div class="form-grid">
                  <div class="form-field">
                    <label>Precio por día</label>
                    <input
                      v-model="form.pricePerDay"
                      type="number"
                      placeholder="$500"
                      required
                    />
                  </div>
                  <div class="form-field">
                    <label>Disponible desde</label>
                    <input v-model="form.availableFrom" type="date" />
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="form-actions">
                <button type="submit" class="submit-btn">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M20 14.66V20a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h5.34"
                    />
                    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />
                  </svg>
                  Registrar vehículo
                </button>
              </div>
            </form>
          </div>
        </v-col>
      </v-row>

      <!-- Success Snackbar -->
      <v-snackbar
        v-model="snackbar.show"
        :timeout="3000"
        :color="snackbar.color"
        class="custom-snackbar"
      >
        {{ snackbar.message }}
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'ArrendadorDashboard',
  data() {
    return {
      activeRentals: [
        {
          id: 1,
          vehicle: 'Toyota Corolla 2024',
          startDate: '2026-02-14',
          endDate: '2026-03-14',
          status: 'Impecable',
        },
        {
          id: 2,
          vehicle: 'Honda CR-V 2025',
          startDate: '2025-10-20',
          endDate: '2025-12-14',
          status: 'No impecable',
        },
        {
          id: 3,
          vehicle: 'Nissan Versa 2023',
          startDate: '2026-01-01',
          endDate: '2026-01-19',
          status: 'Dañado',
        },
        {
          id: 4,
          vehicle: 'Ford Mustang 2024',
          startDate: '2024-08-04',
          endDate: '2024-10-10',
          status: 'Impecable',
        },
        {
          id: 5,
          vehicle: 'Chevrolet Onix 2025',
          startDate: '2026-03-01',
          endDate: '2026-03-15',
          status: 'Impecable',
        },
      ],
      form: {
        brand: '',
        model: '',
        year: '',
        color: '',
        mileage: '',
        transmission: '',
        fuelType: '',
        doors: '',
        plate: '',
        pricePerDay: '',
        availableFrom: '',
      },
      currentPage: 1,
      itemsPerPage: 3,
      snackbar: {
        show: false,
        message: '',
        color: 'success',
      },
    };
  },
  computed: {
    totalVehicles() {
      return this.activeRentals.length;
    },
    monthlyRevenue() {
      const total = this.activeRentals.reduce((sum, rental) => {
        const days = Math.ceil(
          (new Date(rental.endDate) - new Date(rental.startDate)) /
            (1000 * 60 * 60 * 24)
        );
        return sum + days * 500;
      }, 0);
      return `$${total.toLocaleString('es-MX')}`;
    },
    paginatedRentals() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.activeRentals.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.activeRentals.length / this.itemsPerPage);
    },
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      return d.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    },
    getStatusClass(status) {
      const classes = {
        Impecable: 'status-excellent',
        'No impecable': 'status-warning',
        Dañado: 'status-damaged',
      };
      return classes[status] || 'status-default';
    },
    editRental(rental) {
      this.snackbar = {
        show: true,
        message: `Editando renta de ${rental.vehicle}`,
        color: 'info',
      };
    },
    deleteRental(id) {
      const index = this.activeRentals.findIndex((r) => r.id === id);
      if (index !== -1) {
        const vehicle = this.activeRentals[index].vehicle;
        this.activeRentals.splice(index, 1);
        this.snackbar = {
          show: true,
          message: `Renta de ${vehicle} eliminada`,
          color: 'success',
        };
      }
    },
    viewAllRentals() {
      this.snackbar = {
        show: true,
        message: 'Redirigiendo a todas las rentas...',
        color: 'info',
      };
    },
    registerVehicle() {
      console.log('Vehicle registered:', this.form);
      this.snackbar = {
        show: true,
        message: 'Vehículo registrado exitosamente',
        color: 'success',
      };

      this.form = {
        brand: '',
        model: '',
        year: '',
        color: '',
        mileage: '',
        transmission: '',
        fuelType: '',
        doors: '',
        plate: '',
        pricePerDay: '',
        availableFrom: '',
      };
    },
  },
};
</script>

<style scoped src="./styles.css"></style>
