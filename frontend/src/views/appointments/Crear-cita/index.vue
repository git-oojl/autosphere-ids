<template>
  <div class="container">
    <!-- NAVBAR -->
    <nav class="navbar">
      <h1>AutoSphere</h1>
      <ul>
        <li>Home</li>
        <li>Services</li>
        <li>Contact</li>
        <li>About Us</li>
        <li class="login">Login</li>
      </ul>
    </nav>

    <!-- FORM MODAL -->
    <div class="modal">
      <div class="modal-header">
        <h2>Nueva cita</h2>
        <span class="close">×</span>
      </div>

      <form class="form">
        <label>Nombre del cliente:</label>
        <input type="text" placeholder="Juan Perez Martinez" />

        <label>Correo:</label>
        <input type="email" placeholder="juanperez@hotmail.com" />

        <label>Teléfono:</label>
        <input type="text" placeholder="664 215 4758" />

        <label>Vehículo:</label>
        <input type="text" placeholder="Seleccionar..." />

        <div class="row">
          <div>
            <label>Fecha:</label>
            <input type="text" placeholder="dd/mm/aa" />
          </div>

          <div>
            <label>Hora:</label>
            <input type="text" placeholder="--:--" />
          </div>
        </div>

        <label>Comentarios:</label>
        <input type="text" placeholder="Información adicional..." />

        <div class="buttons">
          <button type="button" class="cancel">Cancelar cita</button>
          <button type="button" class="save">Guardar cita</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// Aquí irá lógica después
</script>

<style src="./styles.css"></style>
