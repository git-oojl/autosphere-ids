<template>
  <div class="citas-page">
    <h1>Calendario de Citas</h1>

    <!-- Barra superior -->
    <div class="top-bar">
      <div class="filtros">
        <div>
          <span>Vista:</span>
          <button class="btn small">Semana</button>
          <button class="btn small">Mes</button>
        </div>

        <div>
          <span>Filtrar:</span>
          <select>
            <option>Mis citas</option>
          </select>
          <button class="btn primary">+ Nueva Cita</button>
        </div>
      </div>
    </div>

    <!-- Contenedor principal -->
    <div class="calendar-container">

      <!-- Agenda lateral -->
      <div class="sidebar">
        <h3>Agenda Semanal</h3>
        <ul>
          <li><strong>Hoy</strong> 10:30 Nissan</li>
          <li><strong>Mañana</strong> 11:00 Toyota</li>
          <li><strong>Próximas</strong> (3)</li>
        </ul>
      </div>

      <!-- Días -->
      <div class="calendar-days">
        <div class="day-card">
          <h4>Martes 27</h4>
          <p>10:00 - 10:30</p>
          <p><strong>Prueba:</strong> VW Golf</p>
          <span class="status confirmada">Confirmada</span>
        </div>

        <div class="day-card">
          <h4>Miércoles 28</h4>
          <p>10:30 - 11:30</p>
          <p><strong>Prueba:</strong> Nissan Sentra</p>
          <span class="status pendiente">Pendiente</span>
        </div>

        <div class="day-card">
          <h4>Jueves 29</h4>
          <p>16:00 - 17:00</p>
          <p><strong>Prueba:</strong> Honda Civic</p>
          <span class="status pendiente">Por confirmar</span>
        </div>
      </div>
    </div>

    <!-- Detalle -->
    <div class="detalle">
      <h3>Detalle de cita seleccionada</h3>
      <p><strong>Vehículo:</strong> Nissan Sentra 2020</p>
      <p><strong>Cliente:</strong> Ana G.</p>
      <div class="actions">
        <button class="btn success">Confirmar</button>
        <button class="btn warning">Reprogramar</button>
        <button class="btn danger">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// lógica aquí
</script>

<style scoped src="./styles.css"></style>