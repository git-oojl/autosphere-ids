<template>
  <v-app-bar
    elevation="0"
    color="transparent"
    class="public-appbar"
    height="96"
  >
    <v-container class="navbar-wrapper">
      <nav class="navbar">
        <div class="logo" @click="goHome">AutoSphere</div>

        <!-- Menú de navegación principal (siempre visible) -->
        <div class="nav-links">
          <v-btn
            variant="text"
            class="nav-btn"
            active-class="nav-active"
            :to="{ name: 'public-home' }"
            exact
          >
            Inicio
          </v-btn>

          <v-btn
            variant="text"
            class="nav-btn"
            active-class="nav-active"
            :to="{ name: 'public-catalog' }"
          >
            Vehículos
          </v-btn>

          <v-btn
            variant="text"
            class="nav-btn"
            active-class="nav-active"
            :to="{ name: 'public-about' }"
          >
            Nosotros
          </v-btn>

          <v-btn
            variant="text"
            class="nav-btn"
            active-class="nav-active"
            :to="{ name: 'public-contact' }"
          >
            Contacto
          </v-btn>

          <!-- Botón "Publicar vehículo" (solo usuarios autenticados NO admin) -->
          <v-btn
            v-if="auth.isAuthenticated && !auth.isAdmin"
            variant="text"
            class="nav-btn nav-highlight"
            :to="{ name: 'create-listing' }"
          >
            <v-icon left size="18" class="mr-1">mdi-plus-circle</v-icon>
            Publicar vehículo
          </v-btn>

          <!-- Enlace a Admin (solo admin) -->
          <v-btn
            v-if="auth.isAdmin"
            variant="text"
            class="nav-btn nav-admin"
            :to="{ name: 'admin-dashboard' }"
          >
            <v-icon left size="18" class="mr-1">mdi-shield-account</v-icon>
            Admin
          </v-btn>
        </div>

        <div class="search-container">
          <!-- Buscador -->
          <div class="search-box">
            <v-text-field
              v-model="q"
              variant="plain"
              density="compact"
              hide-details
              placeholder="Búsqueda"
              class="search-field"
              prepend-inner-icon="mdi-magnify"
              @keyup.enter="goSearch"
            />
          </div>

          <!-- Icono de usuario con menú desplegable -->
          <v-menu
            v-if="auth.isAuthenticated"
            offset-y
            transition="slide-y-transition"
            :close-on-content-click="false"
          >
            <template #activator="{ props }">
              <v-btn
                icon
                class="user-icon user-logged"
                v-bind="props"
                aria-label="Mi cuenta"
              >
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>

            <v-card class="user-menu-card" min-width="250">
              <div class="user-menu-header">
                <div class="user-avatar">
                  <v-icon size="40">mdi-account-circle</v-icon>
                </div>
                <div class="user-info">
                  <div class="user-name">
                    {{ auth.user?.name || 'Usuario' }}
                  </div>
                  <div class="user-email">
                    {{ auth.user?.email || 'usuario@email.com' }}
                  </div>
                </div>
              </div>

              <v-divider />

              <v-list density="compact">
                <!--
                  TODAS las rutas apuntan al layout PÚBLICO
                  (mismo layout que Inicio, Vehículos, etc.)
                  El DashboardLayout ya no inyecta sidebar propio.
                -->

                <!-- Dashboard unificado -->

                <v-list-item
                  v-if="!auth.isAdmin"
                  :to="{ name: 'user-dashboard' }"
                  class="menu-item"
                >
                  <template #prepend>
                    <v-icon>mdi-view-dashboard</v-icon>
                  </template>
                  <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item>

                <!-- Mis citas -->
                <v-list-item
                  v-if="!auth.isAdmin"
                  :to="{ name: 'my-appointments' }"
                  class="menu-item"
                >
                  <template #prepend>
                    <v-icon>mdi-calendar</v-icon>
                  </template>
                  <v-list-item-title>Mis citas</v-list-item-title>
                </v-list-item>
                <!-- Mis publicaciones -->
                <v-list-item
                  v-if="!auth.isAdmin"
                  :to="{ name: 'user-listings' }"
                  class="menu-item"
                >
                  <template #prepend>
                    <v-icon>mdi-car</v-icon>
                  </template>
                  <v-list-item-title>Mis publicaciones</v-list-item-title>
                </v-list-item>

                <!-- Mi perfil -->
                <v-list-item :to="{ name: 'user-profile' }" class="menu-item">
                  <template #prepend>
                    <v-icon>mdi-account-settings</v-icon>
                  </template>
                  <v-list-item-title>Mi perfil</v-list-item-title>
                </v-list-item>

                <!-- Seguridad -->
                <v-list-item :to="{ name: 'user-security' }" class="menu-item">
                  <template #prepend>
                    <v-icon>mdi-shield-lock</v-icon>
                  </template>
                  <v-list-item-title>Seguridad</v-list-item-title>
                </v-list-item>

                <v-divider />

                <!-- Cerrar sesión -->
                <v-list-item
                  class="menu-item logout-item"
                  @click="handleLogout"
                >
                  <template #prepend>
                    <v-icon color="error">mdi-logout</v-icon>
                  </template>
                  <v-list-item-title class="text-error"
                    >Cerrar sesión</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>

          <!-- Icono de login (invitado) -->
          <v-btn
            v-else
            icon
            class="user-icon"
            :to="{ name: 'auth-login' }"
            aria-label="login"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </div>
      </nav>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const auth = useAuthStore();
const q = ref('');

function goHome() {
  router.push({ name: 'public-home' });
}

function goSearch() {
  router.push({
    name: 'public-catalog',
    query: { q: q.value?.trim() || undefined },
  });
}

function handleLogout() {
  auth.clearSession();
  router.push({ name: 'public-home' });
}
</script>

<style scoped>
/* Estilos principales */
.public-appbar {
  background: transparent !important;
}

.navbar-wrapper {
  padding: 10px;
}

.navbar {
  background: #0f1e2c;
  padding: 15px 40px;
  border-radius: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.logo {
  font-weight: bold;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
  transition: opacity 0.3s;
}

.logo:hover {
  opacity: 0.8;
}

.nav-links {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.nav-btn {
  text-transform: none;
  letter-spacing: normal;
  font-weight: 500;
  font-size: 15px;
  color: #ffffff;
  transition: all 0.3s;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-active {
  color: #0f1e2c !important;
  font-weight: 600 !important;
}

.nav-highlight {
  color: #96abbe !important;
  font-weight: 600 !important;
  border: 1px solid #96abbe;
}

.nav-highlight:hover {
  background: rgba(59, 130, 246, 0.1) !important;
}

.nav-admin {
  color: #f59e0b !important;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  padding: 0 14px;
  border-radius: 20px;
  min-width: 220px;
  height: 40px;
}

.search-field {
  flex: 1;
}

.search-field :deep(.v-input__control) {
  min-height: 40px !important;
}

.search-field :deep(.v-field) {
  min-height: 40px !important;
  height: 40px !important;
  display: flex;
  align-items: center;
  background: transparent !important;
  box-shadow: none !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.search-field :deep(.v-field__field) {
  min-height: 40px !important;
  height: 40px !important;
  display: flex;
  align-items: center;
}

.search-field :deep(.v-field__input) {
  min-height: 40px !important;
  height: 40px !important;
  display: flex;
  align-items: center;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  font-size: 14px;
  color: #333;
}

.search-field :deep(.v-field__prepend-inner) {
  height: 40px !important;
  display: flex;
  align-items: center;
  padding-top: 0 !important;
}

.search-field :deep(.v-field__prepend-inner .v-icon) {
  transform: translateY(1px);
}

.search-field :deep(.v-icon) {
  color: #777;
}

.search-field :deep(input) {
  font-size: 14px;
  color: #333;
}

.search-field :deep(input::placeholder) {
  color: #999;
}

/* Estilos del icono de usuario */
.user-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2a4c6d;
  color: white;
  transition: all 0.3s ease;
}

.user-icon:hover {
  background: #2a4c6d;
  transform: scale(1.05);
}

.user-logged {
  background: linear-gradient(135deg, #436d97 0%, #436d97 100%);
}

.user-logged:hover {
  background: linear-gradient(135deg, #314d6a 0%, #314d6a 100%);
}

/* Menú desplegable del usuario */
.user-menu-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.user-menu-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.user-avatar {
  width: 50px;
  height: 50px;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 700;
  font-size: 16px;
  color: #1e293b;
}

.user-email {
  font-size: 12px;
  color: #64748b;
}

.menu-item {
  transition: background 0.2s;
}

.menu-item:hover {
  background: #f1f5f9;
}

.logout-item:hover {
  background: #fef2f2;
}

.text-error {
  color: #dc2626;
}

/* Responsive */
@media (max-width: 1200px) {
  .navbar {
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-links {
    order: 2;
    width: 100%;
    justify-content: center;
  }

  .search-container {
    order: 1;
  }
}

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
    gap: 8px;
    width: 100%;
    text-align: center;
  }

  .nav-links .nav-btn {
    width: 100%;
    justify-content: center;
  }

  .search-container {
    width: 100%;
    justify-content: center;
  }

  .search-box {
    width: 100%;
    min-width: unset;
  }
}
</style>
