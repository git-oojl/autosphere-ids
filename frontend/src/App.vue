<template>
  <v-app>
    <!-- Barra de navegación personalizada -->
    <div class="navbar-wrapper">
      <nav class="navbar">
        <div class="logo">AutoSphere</div>
        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/listados">Listados</router-link>
          <router-link to="/citas">Citas</router-link>
        </div>
        <div class="search-container">
          <div class="search-box">
            <input type="text" placeholder="Search..." />
          </div>
          <div class="user-icon" @click="goToLogin"></div>
        </div>
      </nav>
    </div>
    <!-- Contenido principal -->
    <v-main class="main-content">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style>
/* Reset global */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Contenedor de la barra */
.navbar-wrapper {
  padding: 20px;
  background: transparent;
  z-index: 100;
}

/* Barra de navegación */
.navbar {
  background: white;
  padding: 15px 40px;
  border-radius: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

/* Logo */
.logo {
  font-weight: bold;
  font-size: 20px;
  color: #333;
}

/* Enlaces de navegación */
.nav-links {
  display: flex;
  gap: 30px;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #666;
  transition: color 0.3s ease;
  font-weight: 500;
  font-size: 16px;
}

.nav-links a:hover {
  color: #333;
}

/* Enlaces activos */
.nav-links a.router-link-active,
.nav-links a.router-link-exact-active {
  color: #007bff !important;
  font-weight: 600;
}

/* Contenedor de búsqueda */
.search-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Caja de búsqueda */
.search-box {
  background: #f5f5f5;
  padding: 8px 15px;
  border-radius: 20px;
}

.search-box input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  width: 150px;
  color: #333;
}

.search-box input::placeholder {
  color: #999;
}

/* Icono de usuario */
.user-icon {
  width: 35px;
  height: 35px;
  background: #666;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
}

.user-icon:hover {
  background: #333;
}

/* Contenido principal sin padding */
.main-content {
  padding: 0 !important;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-wrapper {
    padding: 15px;
  }

  .navbar {
    flex-direction: column;
    gap: 15px;
    border-radius: 20px;
    padding: 20px;
  }

  .nav-links {
    flex-direction: column;
    gap: 10px;
    width: 100%;
    text-align: center;
  }

  .search-container {
    width: 100%;
    justify-content: center;
  }

  .search-box {
    flex: 1;
  }

  .search-box input {
    width: 100%;
  }
}
</style>
