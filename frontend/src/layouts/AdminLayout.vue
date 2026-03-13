<template>
  <div class="admin-layout">
    <header class="admin-header">
      <div>
        <h1>AutoSphere Admin</h1>
        <p>Zona de administración</p>
      </div>

      <nav class="admin-nav">
        <RouterLink to="/admin">Dashboard</RouterLink>
        <RouterLink to="/admin/usuarios">Usuarios</RouterLink>
        <RouterLink to="/admin/vehiculos">Vehículos</RouterLink>
        <RouterLink to="/admin/citas">Citas</RouterLink>
      </nav>
    </header>

    <v-main class="admin-main">
      <router-view />
    </v-main>
  </div>
</template>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background: #f8fafc;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: #111827;
  color: white;
}

.admin-header p {
  margin-top: 6px;
  color: rgba(255, 255, 255, 0.7);
}

.admin-nav {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.admin-nav a {
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
}

.admin-nav a.router-link-active,
.admin-nav a.router-link-exact-active {
  background: rgba(255, 255, 255, 0.16);
}

.admin-main {
  padding: 24px !important;
}
</style>
