<template>
  <div class="dashboard-layout">
    <aside class="dashboard-sidebar">
      <h2>AutoSphere</h2>
      <p class="sidebar-subtitle">Panel interno</p>

      <nav class="dashboard-nav">
        <RouterLink to="/panel/comprador">Comprador</RouterLink>
        <RouterLink to="/panel/vendedor">Vendedor</RouterLink>
        <RouterLink to="/panel/arrendador">Arrendador</RouterLink>
        <RouterLink to="/panel/cuenta/perfil">Perfil</RouterLink>
        <RouterLink to="/panel/cuenta/seguridad">Seguridad</RouterLink>
      </nav>
    </aside>

    <v-main class="dashboard-main">
      <router-view />
    </v-main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;
  background: #f6f8fb;
}

.dashboard-sidebar {
  padding: 24px;
  background: #0f172a;
  color: white;
}

.sidebar-subtitle {
  color: rgba(255, 255, 255, 0.7);
  margin-top: 8px;
}

.dashboard-nav {
  display: grid;
  gap: 12px;
  margin-top: 24px;
}

.dashboard-nav a {
  padding: 12px 14px;
  border-radius: 10px;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.05);
}

.dashboard-nav a.router-link-active,
.dashboard-nav a.router-link-exact-active {
  background: rgba(255, 255, 255, 0.14);
}

.dashboard-main {
  padding: 24px !important;
}

@media (max-width: 960px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
  }
}
</style>
