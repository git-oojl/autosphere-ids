<template>
  <div class="seller-dashboard">

    <!-- DASHBOARD CONTENT -->
    <div class="dashboard-wrapper">
      <div class="dashboard-container">
        
        <!-- HEADER -->
        <div class="dashboard-header">
          <div>
            <h1 class="dashboard-title">Dashboard de Vendedor</h1>
            <p class="dashboard-subtitle">Gestiona tus anuncios y citas • Última actualización: Hoy {{ currentTime }}</p>
          </div>
          <button class="btn-primary" @click="createListing">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Nuevo Anuncio
          </button>
        </div>

        <!-- STATS CARDS -->
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-header">
              <div class="stat-icon listings">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
              </div>
              <h2 class="stat-title">Anuncios Activos</h2>
            </div>
            <p class="stat-value">{{ stats.listings }}</p>
            <div class="stat-footer">
              <div class="stat-change positive">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 19V5M5 12L12 5L19 12"/>
                </svg>
                <span>+3 este mes</span>
              </div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <div class="stat-icon messages">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"/>
                </svg>
              </div>
              <h2 class="stat-title">Mensajes</h2>
            </div>
            <p class="stat-value">{{ stats.messages }}</p>
            <div class="stat-footer">
              <div class="stat-change warning">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4M12 16h.01"/>
                </svg>
                <span>2 sin responder</span>
              </div>
            </div>
          </div>

          <div class="stat-card highlight">
            <div class="stat-header">
              <div class="stat-icon appointments">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h2 class="stat-title">Citas Esta Semana</h2>
            </div>
            <p class="stat-value">{{ stats.appointments }}</p>
            <button class="btn-card" @click="createAppointment">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Crear Cita
            </button>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <div class="stat-icon views">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h2 class="stat-title">Vistas Totales</h2>
            </div>
            <p class="stat-value">{{ stats.totalViews }}</p>
            <div class="stat-footer">
              <div class="stat-change positive">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 19V5M5 12L12 5L19 12"/>
                </svg>
                <span>+15% vs. sem. pasada</span>
              </div>
            </div>
          </div>
        </div>

        <!-- TWO COLUMN LAYOUT -->
        <div class="dashboard-grid">
          
          <!-- LEFT COLUMN -->
          <div class="left-column">
            
            <!-- UPCOMING APPOINTMENTS -->
            <div class="section">
              <div class="section-header">
                <div class="section-title-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <h3 class="section-title">Próximas Citas</h3>
                </div>
                <button class="btn-secondary" @click="viewAllAppointments">Ver todas</button>
              </div>

              <div class="appointments-list">
                <div 
                  v-for="appointment in upcomingAppointments" 
                  :key="appointment.id"
                  class="appointment-card"
                >
                  <div class="appointment-left">
                    <div class="appointment-time">
                      <div class="time-badge" :class="appointment.isToday ? 'today' : ''">
                        {{ appointment.isToday ? 'Hoy' : appointment.date }}
                      </div>
                      <div class="time-value">{{ appointment.time }}</div>
                    </div>
                  </div>

                  <div class="appointment-content">
                    <div class="appointment-info">
                      <h4 class="appointment-client">{{ appointment.client }}</h4>
                      <p class="appointment-vehicle">{{ appointment.vehicle }}</p>
                    </div>

                    <div class="appointment-right">
                      <span class="status-badge" :class="appointment.status">
                        {{ appointment.statusText }}
                      </span>
                      <button class="btn-icon" @click="viewAppointment(appointment.id)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M9 18L15 12L9 6"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- FEATURED LISTINGS TABLE -->
            <div class="section">
              <div class="section-header">
                <div class="section-title-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V9.5"/>
                    <circle cx="7" cy="17" r="2"/>
                    <circle cx="17" cy="17" r="2"/>
                  </svg>
                  <h3 class="section-title">Anuncios Destacados</h3>
                </div>
                <button class="btn-secondary" @click="manageListings">Gestionar</button>
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
                            <div class="vehicle-price">${{ formatPrice(listing.price) }} MXN</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="metric">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                          {{ listing.views }}
                        </div>
                      </td>
                      <td>
                        <div class="metric">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"/>
                          </svg>
                          {{ listing.messages }}
                        </div>
                      </td>
                      <td>
                        <div class="metric">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
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
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"/>
                              <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43741 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"/>
                            </svg>
                          </button>
                          <button class="btn-icon" @click="viewStats(listing.id)" title="Estadísticas">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <line x1="12" y1="20" x2="12" y2="10"/>
                              <line x1="18" y1="20" x2="18" y2="4"/>
                              <line x1="6" y1="20" x2="6" y2="16"/>
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

          <!-- RIGHT COLUMN -->
          <div class="right-column">
            
            <!-- QUICK ACTIONS -->
            <div class="section quick-actions">
              <div class="section-header">
                <div class="section-title-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  <h3 class="section-title">Acciones Rápidas</h3>
                </div>
              </div>

              <div class="actions-grid">
                <button class="action-card" @click="createListing">
                  <div class="action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </div>
                  <span>Nuevo Anuncio</span>
                </button>

                <button class="action-card" @click="createAppointment">
                  <div class="action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <span>Nueva Cita</span>
                </button>

                <button class="action-card" @click="viewMessages">
                  <div class="action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"/>
                    </svg>
                  </div>
                  <span>Mensajes</span>
                </button>

                <button class="action-card" @click="viewAnalytics">
                  <div class="action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="12" y1="20" x2="12" y2="10"/>
                      <line x1="18" y1="20" x2="18" y2="4"/>
                      <line x1="6" y1="20" x2="6" y2="16"/>
                    </svg>
                  </div>
                  <span>Analíticas</span>
                </button>
              </div>
            </div>

            <!-- PERFORMANCE SUMMARY -->
            <div class="section performance">
              <div class="section-header">
                <div class="section-title-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 12H18L15 21L9 3L6 12H2"/>
                  </svg>
                  <h3 class="section-title">Rendimiento</h3>
                </div>
                <span class="period-badge">Esta Semana</span>
              </div>

              <div class="performance-grid">
                <div class="performance-item">
                  <div class="perf-label">Tasa de Conversión</div>
                  <div class="perf-value">12.5%</div>
                  <div class="perf-bar">
                    <div class="perf-fill" style="width: 12.5%"></div>
                  </div>
                </div>

                <div class="performance-item">
                  <div class="perf-label">Tiempo de Respuesta</div>
                  <div class="perf-value">1.2h</div>
                  <div class="perf-bar">
                    <div class="perf-fill" style="width: 85%"></div>
                  </div>
                </div>

                <div class="performance-item">
                  <div class="perf-label">Tasa de Citas</div>
                  <div class="perf-value">24%</div>
                  <div class="perf-bar">
                    <div class="perf-fill" style="width: 24%"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- TIPS -->
            <div class="section tips-card">
              <div class="section-header">
                <div class="section-title-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/>
                  </svg>
                  <h3 class="section-title">Consejo del Día</h3>
                </div>
              </div>

              <p class="tip-text">
                <strong>Responde rápido:</strong> Los vendedores que responden en menos de 2 horas tienen un 70% más de probabilidad de cerrar una venta.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userName = ref('Carlos Méndez')

const currentTime = computed(() => {
  const now = new Date()
  return now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
})

const stats = ref({
  listings: 24,
  messages: 12,
  appointments: 8,
  totalViews: 1846
})

const upcomingAppointments = ref([
  {
    id: 1,
    isToday: true,
    date: 'Hoy',
    time: '10:30',
    client: 'Ana García',
    vehicle: 'Nissan Sentra 2020',
    status: 'confirmed',
    statusText: 'Confirmada'
  },
  {
    id: 2,
    isToday: true,
    date: 'Hoy',
    time: '13:00',
    client: 'Carlos Rodríguez',
    vehicle: 'Porsche 911 2019',
    status: 'pending',
    statusText: 'Pendiente'
  },
  {
    id: 3,
    isToday: false,
    date: 'Mar 22',
    time: '09:00',
    client: 'María López',
    vehicle: 'BMW X5 2022',
    status: 'confirmed',
    statusText: 'Confirmada'
  }
])

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
    status: 'featured',
    statusText: 'Destacado'
  },
  {
    id: 3,
    name: 'Chevrolet Silverado',
    price: 785000,
    image: 'https://images.unsplash.com/photo-1605559424843-9c3c3f4e9c2b?w=100',
    views: 312,
    messages: 8,
    appointments: 4,
    status: 'active',
    statusText: 'Activo'
  }
])

const manageListings = (ListingId) => {
  console.log('Gestionar anuncios:', ListingId)
  router.push({
    name: 'seller-listings', // Asegúrate que esta ruta exista en tu router
    params: { id: ListingId }
  })
}

const manageAppointments = (appointmentId) => {
  console.log('Gestionar cita:', appointmentId)
  router.push({
    name: 'seller-appointments', // Asegúrate que esta ruta exista en tu router
    params: { id: appointmentId }
  })
}

const createListing = () => alert('Redirigiendo a Crear Anuncio...')

const createAppointment = () => alert('Redirigiendo a Crear Cita...')
const viewAllAppointments = () => alert('Redirigiendo a Citas...')
const viewAppointment = (id) => alert(`Ver detalles de cita #${id}`)
const editListing = (id) => alert(`Editar anuncio #${id}`)
const viewStats = (id) => alert(`Estadísticas del anuncio #${id}`)
const viewMessages = () => alert('Redirigiendo a Mensajes...')
const viewAnalytics = () => alert('Redirigiendo a Analíticas...')
const formatPrice = (price) => new Intl.NumberFormat('es-MX').format(price)
</script>

<style scoped src="./styles.css"></style>