<template>
  <main class="main">
    <div class="container">
      <div class="form-container">
         
        <!-- Two column layout -->
        <div class="form-layout">
          <!-- Left Column - Vehicle Info Card -->
          <div class="vehicle-info-card">
            <div class="vehicle-image">
              <img 
                :src="vehicle.image || 'https://via.placeholder.com/400x250?text=AutoSphere'" 
                :alt="vehicle.name"
              >
            </div>
            <div class="vehicle-details">
              <h2 class="vehicle-title">{{ vehicle.name }}</h2>
              <p class="vehicle-year">{{ vehicle.year }}</p>
              <div class="vehicle-badge">{{ vehicle.type || 'SEDAN' }}</div>
              
              <div class="vehicle-specs">
                <div class="spec-item">
                  <span class="spec-label">Kilometraje</span>
                  <span class="spec-value">{{ vehicle.mileage || 'N/A' }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Combustible</span>
                  <span class="spec-value">{{ vehicle.fuel || 'Gasolina' }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Transmisión</span>
                  <span class="spec-value">{{ vehicle.transmission || 'Automática' }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Ubicación</span>
                  <span class="spec-value">{{ vehicle.location || 'Ciudad de México' }}</span>
                </div>
              </div>

              <div class="vehicle-price">
                <span class="price-label">Precio</span>
                <span class="price-value">{{ vehicle.price }}</span>
              </div>
            </div>
          </div>

          <!-- Right Column - Appointment Form -->
          <div class="form-card">
            <div class="form-header">
              <h1 class="form-title">Agendar cita</h1>
              <p class="form-subtitle">
                Complete el siguiente formulario para agendar una cita y conocer más sobre este vehículo
              </p>
            </div>

            <form @submit.prevent="submitAppointment" class="appointment-form">
              <!-- Vehicle Info (Read-only) -->
              <div class="form-section">
                <h2 class="section-title">
                  Vehículo seleccionado
                </h2>
                
                <div class="readonly-field">
                  <label>Vehículo</label>
                  <div class="readonly-value">{{ vehicle.name }} {{ vehicle.year }}</div>
                </div>
                
                <div class="readonly-field">
                  <label>Precio</label>
                  <div class="readonly-value">{{ vehicle.price }}</div>
                </div>

                <div class="readonly-field">
                  <label>Ubicación</label>
                  <div class="readonly-value">{{ vehicle.location || 'Ciudad de México' }}</div>
                </div>
              </div>

              <!-- Personal Information -->
              <div class="form-section">
                <h2 class="section-title">
                  Tus datos
                </h2>
                
                <div class="form-row">
                  <div class="form-group">
                    <label for="name">Nombre completo *</label>
                    <input 
                      type="text" 
                      id="name" 
                      v-model="form.name" 
                      required
                      placeholder="Ej: Ana García"
                    >
                  </div>
                  <div class="form-group">
                    <label for="phone">Teléfono *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      v-model="form.phone" 
                      required
                      placeholder="Ej: 555-1234"
                    >
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="email">Correo electrónico *</label>
                    <input 
                      type="email" 
                      id="email" 
                      v-model="form.email" 
                      required
                      placeholder="ejemplo@correo.com"
                    >
                  </div>
                </div>
              </div>

              <!-- Appointment Details -->
              <div class="form-section">
                <h2 class="section-title">
                  Detalles de la cita
                </h2>
                
                <div class="form-row">
                  <div class="form-group">
                    <label for="date">Fecha preferida *</label>
                    <input 
                      type="date" 
                      id="date" 
                      v-model="form.date" 
                      required
                      :min="minDate"
                    >
                  </div>
                  <div class="form-group">
                    <label for="time">Hora preferida *</label>
                    <select id="time" v-model="form.time" required>
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
                      <option value="18:00">06:00 PM</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label for="preferredContact">¿Cómo prefieres que te contactemos?</label>
                  <select id="preferredContact" v-model="form.preferredContact">
                    <option value="whatsapp">WhatsApp</option>
                    <option value="llamada">Llamada telefónica</option>
                    <option value="correo">Correo electrónico</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="comments">Comentarios o preguntas</label>
                  <textarea 
                    id="comments" 
                    v-model="form.comments" 
                    rows="3"
                    placeholder="¿Alguna pregunta específica sobre el vehículo?"
                  ></textarea>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="form-actions">
                <button type="button" class="btn-back" @click="goBack">Cancelar</button>
                <button type="submit" class="btn-submit">Agendar cita</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Success Modal -->
      <div v-if="showSuccessModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-success">
          <div class="success-icon">✓</div>
          <h3>¡Cita agendada con éxito!</h3>
          <p>Hemos recibido tu solicitud. Un asesor se pondrá en contacto contigo en las próximas 24 horas para confirmar los detalles de tu cita.</p>
          <div class="appointment-summary">
            <p><strong>Vehículo:</strong> {{ vehicle.name }} {{ vehicle.year }}</p>
            <p><strong>Ubicación:</strong> {{ vehicle.location || 'Ciudad de México' }}</p>
            <p><strong>Fecha:</strong> {{ formattedDate }}</p>
            <p><strong>Hora:</strong> {{ form.time }}</p>
          </div>
          <div class="modal-buttons">
            <button class="btn-back-modal" @click="closeModal">Cerrar</button>
            <button class="btn-view-vehicles" @click="goToVehicles">Ver más vehículos</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'AgendarCita',
  props: {
    vehicle: {
      type: Object,
      required: true,
      default: () => ({
        id: null,
        name: '',
        year: '',
        type: '',
        mileage: '',
        fuel: '',
        transmission: '',
        price: '',
        location: '',
        image: ''
      })
    }
  },
  data() {
    return {
      showSuccessModal: false,
      form: {
        name: '',
        phone: '',
        email: '',
        rfc: '',
        date: '',
        time: '',
        preferredContact: 'whatsapp',
        comments: ''
      }
    }
  },
  computed: {
    minDate() {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    formattedDate() {
      if (!this.form.date) return ''
      const date = new Date(this.form.date)
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  methods: {
    submitAppointment() {
      const appointmentData = {
        vehicleId: this.vehicle.id,
        vehicleName: this.vehicle.name,
        vehicleYear: this.vehicle.year,
        vehicleLocation: this.vehicle.location,
        ...this.form
      }
      
      console.log('Cita agendada:', appointmentData)
      this.showSuccessModal = true
    },
    goBack() {
      this.$router.go(-1)
    },
    goToVehicles() {
      this.$router.push('/vehiculos')
    },
    closeModal() {
      this.showSuccessModal = false
      this.$router.push('/vehiculos')
    }
  }
}
</script>

<style scoped>
@import './styles.css';
</style>