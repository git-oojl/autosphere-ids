<template>
  <div class="seller-dashboard">
    <!-- DASHBOARD CONTENT -->
    <div class="dashboard-wrapper">
      <div class="dashboard-container">
        
        <!-- HEADER -->
        <div class="dashboard-header">
          <div>
            <h1 class="dashboard-title">Dashboard de Vendedor</h1>
            <p class="dashboard-subtitle">Bienvenido de nuevo, {{ userName }}</p>
          </div>
          <button class="btn-primary" @click="createListing">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Nuevo Anuncio
          </button>
        </div>

        <!-- STATS CARDS -->
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-icon listings">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="stat-content">
              <h2 class="stat-title">Anuncios</h2>
              <p class="stat-value">{{ stats.listings }}</p>
              <div class="stat-change positive">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>+3 este mes</span>
              </div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon messages">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="stat-content">
              <h2 class="stat-title">Mensajes</h2>
              <p class="stat-value">{{ stats.messages }}</p>
              <div class="stat-change negative">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12L12 19L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>-2 sin responder</span>
              </div>
            </div>
          </div>

          <div class="stat-card highlight">
            <div class="stat-icon appointments">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="stat-content">
              <h2 class="stat-title">Citas</h2>
              <p class="stat-value">{{ stats.appointments }}</p>
              <div class="stat-change positive">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>+4 esta semana</span>
              </div>
            </div>
            <button class="btn-card" @click="createAppointment">Crear Cita</button>
          </div>
        </div>

        <!-- UPCOMING APPOINTMENTS -->
        <div class="section">
          <div class="section-header">
            <h3 class="section-title">Próximas citas</h3>
            <button class="btn-secondary" @click="viewAllAppointments">Ver todas</button>
          </div>

          <div class="appointments-list">
            <div 
              v-for="appointment in upcomingAppointments" 
              :key="appointment.id"
              class="appointment-card"
            >
              <div class="appointment-time">
                <div class="time-badge" :class="appointment.isToday ? 'today' : ''">
                  {{ appointment.isToday ? 'Hoy' : appointment.date }}
                </div>
                <div class="time-value">{{ appointment.time }}</div>
              </div>

              <div class="appointment-info">
                <h4 class="appointment-client">{{ appointment.client }}</h4>
                <p class="appointment-vehicle">{{ appointment.vehicle }}</p>
              </div>

              <div class="appointment-status">
                <span class="status-badge" :class="appointment.status">
                  {{ appointment.statusText }}
                </span>
              </div>

              <div class="appointment-actions">
                <button class="btn-icon" @click="viewAppointment(appointment.id)">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- FEATURED LISTINGS -->
        <div class="section">
          <div class="section-header">
            <h3 class="section-title">Anuncios Destacados</h3>
            <button class="btn-secondary" @click="manageListings">Gestionar anuncios</button>
          </div>

          <div class="listings-table-container">
            <table class="listings-table">
              <thead>
                <tr>
                  <th>Vehículo</th>
                  <th>Vistas</th>
                  <th>Mensajes</th>
                  <th>Citas</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="listing in featuredListings" :key="listing.id">
                  <td>
                    <div class="vehicle-cell">
                      <img :src="listing.image" :alt="listing.name" class="vehicle-thumb" />
                      <div>
                        <div class="vehicle-name">{{ listing.name }}</div>
                        <div class="vehicle-price">${{ formatPrice(listing.price) }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="metric">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                      </svg>
                      {{ listing.views }}
                    </div>
                  </td>
                  <td>
                    <div class="metric">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2"/>
                      </svg>
                      {{ listing.messages }}
                    </div>
                  </td>
                  <td>
                    <div class="metric">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
                      </svg>
                      {{ listing.appointments }}
                    </div>
                  </td>
                  <td>
                    <span class="listing-status" :class="listing.status">
                      {{ listing.statusText }}
                    </span>
                  </td>
                  <td>
                    <div class="table-actions">
                      <button class="btn-icon" @click="editListing(listing.id)" title="Editar">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43741 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                      <button class="btn-icon" @click="viewStats(listing.id)" title="Estadísticas">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <line x1="12" y1="20" x2="12" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                          <line x1="18" y1="20" x2="18" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                          <line x1="6" y1="20" x2="6" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                      </button>
                    </div>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// User data
const userName = ref('Carlos Méndez')
const showUserMenu = ref(false)

// Stats
const stats = ref({
  listings: 24,
  messages: 12,
  appointments: 8
})

// Upcoming appointments
const upcomingAppointments = ref([
  {
    id: 1,
    isToday: true,
    date: 'Hoy',
    time: '10:30',
    client: 'Ana G.',
    vehicle: 'Nissan Sentra 2020',
    status: 'confirmed',
    statusText: 'Confirmada'
  },
  {
    id: 2,
    isToday: true,
    date: 'Hoy',
    time: '13:00',
    client: 'Carlos R.',
    vehicle: 'Porsche 911 2019',
    status: 'pending',
    statusText: 'Pendiente'
  },
  {
    id: 3,
    isToday: false,
    date: 'Mañana',
    time: '09:00',
    client: 'María L.',
    vehicle: 'BMW X5 2022',
    status: 'confirmed',
    statusText: 'Confirmada'
  }
])

// Featured listings
const featuredListings = ref([
  {
    id: 1,
    name: 'Nissan Sentra 2020',
    price: 245000,
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=100',
    views: 245,
    messages: 3,
    appointments: 2,
    status: 'active',
    statusText: 'Activo'
  },
  {
    id: 2,
    name: 'Porsche 911 2019',
    price: 1850000,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=100',
    views: 189,
    messages: 5,
    appointments: 1,
    status: 'active',
    statusText: 'Activo'
  },
  {
    id: 3,
    name: 'Chevrolet Silverado',
    price: 785000,
    image: 'https://images.unsplash.com/photo-1605559424843-9c3c3f4e9c2b?w=100',
    views: 312,
    messages: 8,
    appointments: 4,
    status: 'featured',
    statusText: 'Destacado'
  }
])

// Methods
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const createListing = () => {
  console.log('Crear nuevo anuncio')
  // router.push('/crear-anuncio')
}

const createAppointment = () => {
  console.log('Crear nueva cita')
  // router.push('/crear-cita')
}

const viewAllAppointments = () => {
  console.log('Ver todas las citas')
  // router.push('/citas')
}

const viewAppointment = (id) => {
  console.log('Ver cita:', id)
}

const manageListings = () => {
  console.log('Gestionar anuncios')
  // router.push('/mis-anuncios')
}

const editListing = (id) => {
  console.log('Editar anuncio:', id)
}

const viewStats = (id) => {
  console.log('Ver estadísticas:', id)
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-MX').format(price)
}
</script>

<style scoped src="./styles.css"></style>