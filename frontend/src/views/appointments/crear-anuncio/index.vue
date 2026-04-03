<template>
  <div class="mis-anuncios-container">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">AutoSphere</div>
      <ul class="nav-links">
        <li>Home</li>
        <li>Services</li>
        <li>Contact</li>
        <li>About Us</li>
        <li>Login</li>
      </ul>
    </nav>

    <!-- Header -->
    <div class="header">
      <h2>Mis anuncios</h2>
      <div class="header-actions">
        <button class="filter-btn" @click="filtrar">
          Filtrar por estado: Todos
        </button>
        <button class="create-btn" @click="crearAnuncio">+ Crear nuevo</button>
      </div>
    </div>

    <!-- Cards -->
    <div class="cards">
      <div class="card" v-for="(anuncio, index) in anuncios" :key="index">
        <img src="https://via.placeholder.com/120" class="car-img" />

        <div class="card-info">
          <div class="title-row">
            <h3>{{ anuncio.nombre }}</h3>
            <span class="badge">New</span>
          </div>

          <p>Publicado: {{ anuncio.fecha }}</p>
          <p>{{ anuncio.vistas }} vistas</p>
          <p>{{ anuncio.mensajes }} Mensajes</p>
        </div>

        <div class="card-side">
          <p>{{ anuncio.ubicacion }}</p>

          <button class="btn" @click="editarAnuncio(anuncio)">
            Editar anuncio
          </button>
          <button class="btn" @click="verPublico(anuncio)">
            Ver como público
          </button>
          <button class="btn danger" @click="eliminarAnuncio(index)">
            Eliminar anuncio
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      anuncios: [
        {
          nombre: '2016 Fiat 500',
          fecha: '10/02/2026',
          vistas: 1200,
          mensajes: 8,
          ubicacion: 'Charger USA',
        },
        {
          nombre: 'Chevrolet Silverado 1500',
          fecha: '05/02/2026',
          vistas: 2000,
          mensajes: 15,
          ubicacion: 'Alberta Condor',
        },
        {
          nombre: 'Porsche 2019',
          fecha: '28/01/2026',
          vistas: 3400,
          mensajes: 12,
          ubicacion: 'Barcelona Spain',
        },
      ],
    };
  },
  methods: {
    crearAnuncio() {
      this.$router.push('/vendedor/publicaciones/nuevo');
    },

    editarAnuncio(anuncio) {
      alert(`Editando: ${anuncio.nombre}`);
    },

    verPublico(anuncio) {
      alert(`Viendo como público: ${anuncio.nombre}`);
    },

    eliminarAnuncio(index) {
      const confirmacion = confirm(
        '¿Seguro que quieres eliminar este anuncio?'
      );
      if (confirmacion) {
        this.anuncios.splice(index, 1);
      }
    },

    filtrar() {
      alert('Filtro no implementado aún');
    },
  },
};
</script>

<style src="./styles.css"></style>
