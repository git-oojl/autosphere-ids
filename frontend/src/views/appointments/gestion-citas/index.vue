<template>
  <div class="gestion-citas">
    <div class="container">
      <!-- Page Title -->
      <h1 class="page-title">Mis citas</h1>
      <p class="page-subtitle">Listado completo de tus citas con todas las acciones disponibles</p>

      <!-- Tabs: Comprador / Vendedor / Rentador -->
      <div class="tabs-container">
        <button 
          :class="['tab-btn', { active: activeTab === 'comprador' }]"
          @click="activeTab = 'comprador'"
        >
          Comprador
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'vendedor' }]"
          @click="activeTab = 'vendedor'"
        >
          Vendedor
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'rentador' }]"
          @click="activeTab = 'rentador'"
        >
          Rentador
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-info">
            <span class="stat-value">{{ totalCitas }}</span>
            <span class="stat-label">Total Citas</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-info">
            <span class="stat-value">{{ citasPendientes }}</span>
            <span class="stat-label">Pendientes</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-info">
            <span class="stat-value">{{ citasConfirmadas }}</span>
            <span class="stat-label">Confirmadas</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-info">
            <span class="stat-value">{{ citasCompletadas }}</span>
            <span class="stat-label">Completadas</span>
          </div>
        </div>
      </div>

      <!-- Filters Bar -->
      <div class="filters-bar">
        <div class="filters-group">
          <span class="filter-label">Ver por:</span>
          <div class="filter-buttons">
            <button 
              :class="['filter-btn', { active: viewBy === 'fecha' }]" 
              @click="viewBy = 'fecha'"
            >Fecha</button>
            <button 
              :class="['filter-btn', { active: viewBy === 'vehiculo' }]" 
              @click="viewBy = 'vehiculo'"
            >Vehículo</button>
          </div>
        </div>
        <div class="filters-group">
          <span class="filter-label">Filtrar estado:</span>
          <div class="custom-select">
            <button class="select-btn" @click="toggleStatusDropdown">
              {{ statusFilter || 'Todos' }} ▼
            </button>
            <div v-if="showStatusDropdown" class="dropdown-menu">
              <div @click="setStatusFilter('')" class="dropdown-item">Todos</div>
              <div @click="setStatusFilter('Pendiente')" class="dropdown-item">Pendiente</div>
              <div @click="setStatusFilter('Confirmada')" class="dropdown-item">Confirmada</div>
              <div @click="setStatusFilter('Completada')" class="dropdown-item">Completada</div>
              <div @click="setStatusFilter('Cancelada')" class="dropdown-item">Cancelada</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Appointments by Day -->
      <div v-for="(group, index) in filteredGroupedAppointments" :key="index" class="day-section">
        <h2 class="day-title">{{ group.title }}</h2>
        <div class="table-wrapper">
          <table class="appointments-table">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Vehículo</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Ver detalle</th>
                <th>Reprogramar</th>
                <th>Cancelar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="appointment in group.appointments" :key="appointment.id">
                <td>{{ appointment.time }}</td>
                <td>{{ appointment.client }}</td>
                <td>{{ appointment.vehicle }}</td>
                <td>
                  <span :class="['type-badge', getTipoClass(appointment.tipo)]">
                    {{ getTipoLabel(appointment.tipo) }}
                  </span>
                </td>
                <td>
                  <span :class="['status', getStatusClass(appointment.status)]">
                    {{ appointment.status }}
                  </span>
                </td>
                <td>
                  <button class="action-btn view" @click="viewAppointmentDetail(appointment)">
                    Ver detalle
                  </button>
                </td>
                <td>
                  <button 
                    class="action-btn reschedule" 
                    @click="openRescheduleModal(appointment)"
                    :disabled="appointment.status === 'Cancelada'"
                  >
                    Reprogramar
                  </button>
                </td>
                <td>
                  <button 
                    class="action-btn cancel" 
                    @click="cancelAppointment(appointment)"
                    :disabled="appointment.status === 'Cancelada' || appointment.status === 'Completada'"
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
              <tr v-if="group.appointments.length === 0">
                <td colspan="8" class="empty-row">No hay citas para este día</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal for Reschedule -->
    <div v-if="isRescheduleModalOpen" class="modal-overlay" @click.self="closeRescheduleModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Reprogramar cita</h3>
          <button class="modal-close" @click="closeRescheduleModal">&times;</button>
        </div>
        <form @submit.prevent="rescheduleAppointment" class="modal-form">
          <div class="form-group">
            <label>Cliente</label>
            <input type="text" :value="rescheduleTarget?.client" disabled>
          </div>
          <div class="form-group">
            <label>Vehículo</label>
            <input type="text" :value="rescheduleTarget?.vehicle" disabled>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Nueva Fecha *</label>
              <input type="date" v-model="rescheduleData.date" required :min="minDate">
            </div>
            <div class="form-group">
              <label>Nueva Hora *</label>
              <select v-model="rescheduleData.time" required>
                <option value="">Seleccione una hora</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="17:00">05:00 PM</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Motivo de reprogramación</label>
            <textarea v-model="rescheduleData.reason" rows="2" placeholder="Ej: Conflicto de horario..."></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-cancel" @click="closeRescheduleModal">Cancelar</button>
            <button type="submit" class="btn-save">Reprogramar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de confirmación de cancelación -->
    <div v-if="showCancelModal" class="modal-overlay" @click.self="closeCancelModal">
      <div class="modal-container modal-small">
        <div class="modal-header">
          <h3>Cancelar cita</h3>
          <button class="modal-close" @click="closeCancelModal">&times;</button>
        </div>
        <div class="modal-body">
          <p>¿Estás seguro de que deseas cancelar esta cita?</p>
          <p class="cancel-warning">Esta acción no se puede deshacer.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-cancel" @click="closeCancelModal">No, volver</button>
          <button type="button" class="btn-danger" @click="confirmCancelAppointment">Sí, cancelar cita</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GestionCitas',
  data() {
    return {
      activeTab: 'comprador',
      viewBy: 'fecha',
      statusFilter: '',
      showStatusDropdown: false,
      isRescheduleModalOpen: false,
      showCancelModal: false,
      rescheduleTarget: null,
      cancelTarget: null,
      rescheduleData: {
        date: '',
        time: '',
        reason: ''
      },
      appointments: {
        comprador: [
          {
            id: 1,
            client: 'Ana García',
            vehicle: 'Toyota Corolla 2020',
            date: '2026-03-16',
            time: '10:30',
            status: 'Pendiente',
            tipo: 'compra',
            phone: '555-0101',
            email: 'ana@email.com',
            notes: 'Interesada en financiamiento',
            sellerName: 'Juan Pérez',
            sellerPhone: '555-0102'
          },
          {
            id: 2,
            client: 'Carlos López',
            vehicle: 'Honda CR-V 2021',
            date: '2026-03-16',
            time: '13:00',
            status: 'Confirmada',
            tipo: 'renta',
            phone: '555-0103',
            email: 'carlos@email.com',
            notes: 'Renta por 6 meses',
            sellerName: 'María Gómez',
            sellerPhone: '555-0104'
          }
        ],
        vendedor: [
          {
            id: 101,
            client: 'Roberto Martínez',
            vehicle: 'Nissan Sentra 2020',
            date: '2026-03-17',
            time: '09:00',
            status: 'Pendiente',
            tipo: 'venta',
            phone: '555-0201',
            email: 'roberto@email.com',
            notes: 'Prueba de manejo',
            buyerName: 'Roberto Martínez'
          },
          {
            id: 102,
            client: 'Laura Fernández',
            vehicle: 'Mazda CX-5 2022',
            date: '2026-03-18',
            time: '15:00',
            status: 'Confirmada',
            tipo: 'venta',
            phone: '555-0202',
            email: 'laura@email.com',
            notes: 'Interesada en compra directa',
            buyerName: 'Laura Fernández'
          }
        ],
        rentador: [
          {
            id: 201,
            client: 'Pedro Sánchez',
            vehicle: 'Kia Rio 2023',
            date: '2026-03-17',
            time: '11:00',
            status: 'Pendiente',
            tipo: 'renta',
            phone: '555-0301',
            email: 'pedro@email.com',
            notes: 'Renta por 3 meses',
            renterName: 'Pedro Sánchez'
          },
          {
            id: 202,
            client: 'Sofía Ramírez',
            vehicle: 'Ford Mustang 2022',
            date: '2026-03-19',
            time: '14:00',
            status: 'Confirmada',
            tipo: 'renta',
            phone: '555-0302',
            email: 'sofia@email.com',
            notes: 'Renta por 12 meses',
            renterName: 'Sofía Ramírez'
          }
        ]
      }
    }
  },
  computed: {
    currentUser() {
      // Obtener el rol del usuario logueado desde el store o localStorage
      return localStorage.getItem('userRole') || 'comprador'
    },
    currentAppointments() {
      return this.appointments[this.activeTab] || []
    },
    totalCitas() {
      return this.currentAppointments.length
    },
    citasPendientes() {
      return this.currentAppointments.filter(a => a.status === 'Pendiente').length
    },
    citasConfirmadas() {
      return this.currentAppointments.filter(a => a.status === 'Confirmada').length
    },
    citasCompletadas() {
      return this.currentAppointments.filter(a => a.status === 'Completada').length
    },
    filteredAppointments() {
      let filtered = [...this.currentAppointments]
      if (this.statusFilter) {
        filtered = filtered.filter(a => a.status === this.statusFilter)
      }
      return filtered
    },
    groupedAppointments() {
      const groups = {}
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      
      const dayAfter = new Date(today)
      dayAfter.setDate(dayAfter.getDate() + 2)
      
      const formatDate = (date) => {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
      }
      
      this.filteredAppointments.forEach(app => {
        const appDate = new Date(app.date)
        appDate.setHours(0, 0, 0, 0)
        
        let key
        if (appDate.getTime() === today.getTime()) {
          key = `Hoy - ${formatDate(today)}`
        } else if (appDate.getTime() === tomorrow.getTime()) {
          key = `Mañana - ${formatDate(tomorrow)}`
        } else if (appDate.getTime() === dayAfter.getTime()) {
          key = `Pasado mañana - ${formatDate(dayAfter)}`
        } else {
          key = formatDate(appDate)
        }
        
        if (!groups[key]) {
          groups[key] = []
        }
        groups[key].push(app)
      })
      
      const sortedGroups = {}
      Object.keys(groups).sort((a, b) => {
        const dateA = a.split(' - ')[1] || a
        const dateB = b.split(' - ')[1] || b
        const [dayA, monthA, yearA] = dateA.split('/')
        const [dayB, monthB, yearB] = dateB.split('/')
        return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB)
      }).forEach(key => {
        sortedGroups[key] = groups[key].sort((a, b) => a.time.localeCompare(b.time))
      })
      
      return sortedGroups
    },
    filteredGroupedAppointments() {
      const groups = this.groupedAppointments
      return Object.keys(groups).map(key => ({
        title: key,
        appointments: groups[key]
      }))
    },
    minDate() {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
  },
  mounted() {
    // Establecer la pestaña activa según el rol del usuario
    const userRole = localStorage.getItem('userRole')
    if (userRole && ['comprador', 'vendedor', 'rentador'].includes(userRole)) {
      this.activeTab = userRole
    }
  },
  methods: {
    getTipoLabel(tipo) {
      const labels = {
        compra: 'Compra',
        venta: 'Venta',
        renta: 'Renta'
      }
      return labels[tipo] || tipo
    },
    getTipoClass(tipo) {
      const classes = {
        compra: 'compra',
        venta: 'venta',
        renta: 'renta'
      }
      return classes[tipo] || ''
    },
    getStatusClass(status) {
      const classes = {
        'Pendiente': 'pending',
        'Confirmada': 'confirmed',
        'Completada': 'completed',
        'Cancelada': 'cancelled'
      }
      return classes[status] || 'pending'
    },
    toggleStatusDropdown() {
      this.showStatusDropdown = !this.showStatusDropdown
    },
    setStatusFilter(status) {
      this.statusFilter = status
      this.showStatusDropdown = false
    },
    viewAppointmentDetail(appointment) {
      // Navegar al detalle según el rol
      const routeName = this.activeTab === 'vendedor' 
        ? 'seller-appointment-detail' 
        : 'buyer-appointment-detail'
      
      this.$router.push({
        name: routeName,
        params: { id: appointment.id }
      })
    },
    openRescheduleModal(appointment) {
      this.rescheduleTarget = appointment
      this.rescheduleData = {
        date: appointment.date,
        time: appointment.time,
        reason: ''
      }
      this.isRescheduleModalOpen = true
    },
    closeRescheduleModal() {
      this.isRescheduleModalOpen = false
      this.rescheduleTarget = null
      this.rescheduleData = { date: '', time: '', reason: '' }
    },
    rescheduleAppointment() {
      const appointmentsList = this.appointments[this.activeTab]
      const index = appointmentsList.findIndex(a => a.id === this.rescheduleTarget.id)
      
      if (index !== -1) {
        appointmentsList[index] = {
          ...appointmentsList[index],
          date: this.rescheduleData.date,
          time: this.rescheduleData.time,
          status: 'Pendiente',
          rescheduleReason: this.rescheduleData.reason
        }
        
        // Forzar actualización reactiva
        this.appointments[this.activeTab] = [...appointmentsList]
        
        // Mostrar notificación de éxito
        alert('Cita reprogramada exitosamente')
      }
      
      this.closeRescheduleModal()
    },
    cancelAppointment(appointment) {
      this.cancelTarget = appointment
      this.showCancelModal = true
    },
    closeCancelModal() {
      this.showCancelModal = false
      this.cancelTarget = null
    },
    confirmCancelAppointment() {
      const appointmentsList = this.appointments[this.activeTab]
      const index = appointmentsList.findIndex(a => a.id === this.cancelTarget.id)
      
      if (index !== -1) {
        appointmentsList[index] = {
          ...appointmentsList[index],
          status: 'Cancelada'
        }
        
        this.appointments[this.activeTab] = [...appointmentsList]
        alert('Cita cancelada exitosamente')
      }
      
      this.closeCancelModal()
    }
  }
}
</script>

<style scoped>
@import './styles.css';
</style>