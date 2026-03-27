<template>
  <div class="container">
    <!-- FORM MODAL -->
    <div class="modal">
      <div class="modal-header">
        <h2>Nueva cita</h2>
        <span class="close" @click="closeModal">×</span>
      </div>

      <form class="form" @submit.prevent="saveAppointment">
        <label>Nombre del cliente:</label>
        <input
          type="text"
          v-model="formData.nombreCliente"
          placeholder="Juan Perez Martinez"
          required
        />

        <label>Correo:</label>
        <input
          type="email"
          v-model="formData.correo"
          placeholder="juanperez@hotmail.com"
          required
        />

        <label>Teléfono:</label>
        <input
          type="text"
          v-model="formData.telefono"
          placeholder="664 215 4758"
          required
        />

        <label>Vehículo:</label>
        <input
          type="text"
          v-model="formData.vehiculo"
          placeholder="Seleccionar..."
          required
        />

        <div class="row">
          <div>
            <label>Fecha:</label>
            <input type="date" v-model="formData.fecha" required />
          </div>

          <div>
            <label>Hora:</label>
            <input type="time" v-model="formData.hora" required />
          </div>
        </div>

        <label>Comentarios:</label>
        <input
          type="text"
          v-model="formData.comentarios"
          placeholder="Información adicional..."
        />

        <div class="buttons">
          <button type="button" class="cancel" @click="closeModal">
            Cancelar cita
          </button>
          <button type="submit" class="save">Guardar cita</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateAppointment',
  data() {
    return {
      formData: {
        nombreCliente: '',
        correo: '',
        telefono: '',
        vehiculo: '',
        fecha: '',
        hora: '',
        comentarios: '',
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        nombreCliente: '',
        correo: '',
        telefono: '',
        vehiculo: '',
        fecha: '',
        hora: '',
        comentarios: '',
      };
    },
    saveAppointment() {
      console.log('Cita guardada:', this.formData);
      alert('Cita guardada exitosamente');
      this.$emit('save', this.formData);
      this.closeModal();
    },
  },
};
</script>

<style src="./styles.css"></style>
