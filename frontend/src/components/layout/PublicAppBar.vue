<template>
  <!-- Navbar personalizado - SIN v-app-bar de Vuetify -->
  <header class="custom-navbar" :class="{ 'navbar-hidden': !isNavbarVisible }">
    <div class="navbar-container">
      <nav class="navbar">
        <div class="logo" @click="goHome">AutoSphere</div>

        <!-- Menú de navegación principal -->
        <div class="nav-links">
          <button
            class="nav-btn"
            :class="{ 'nav-active': isActive('public-home') }"
            @click="goToPage('public-home')"
          >
            Inicio
          </button>

          <button
            class="nav-btn"
            :class="{ 'nav-active': isActive('public-catalog') }"
            @click="goToPage('public-catalog')"
          >
            Vehículos
          </button>

          <button
            class="nav-btn"
            :class="{ 'nav-active': isActive('public-about') }"
            @click="goToPage('public-about')"
          >
            Nosotros
          </button>

          <button
            class="nav-btn"
            :class="{ 'nav-active': isActive('public-contact') }"
            @click="goToPage('public-contact')"
          >
            Contacto
          </button>

          <!-- Botón "Publicar vehículo" -->
          <button
            v-if="auth.isAuthenticated && !auth.isAdmin"
            class="nav-btn nav-highlight"
            @click="goToPage('create-listing')"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              style="margin-right: 6px"
            >
              <line
                x1="12"
                y1="5"
                x2="12"
                y2="19"
                stroke="currentColor"
                stroke-width="2"
              />
              <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            Publicar vehículo
          </button>

          <!-- Enlace a Admin -->
          <button
            v-if="auth.isAdmin"
            class="nav-btn nav-admin"
            @click="goToPage('admin-dashboard')"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              style="margin-right: 6px"
            >
              <path
                d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            Admin
          </button>
        </div>

        <div class="search-container">
          <!-- Buscador -->
          <div class="search-box">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              class="search-icon-custom"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            <input
              v-model="q"
              type="text"
              placeholder="Búsqueda"
              class="search-input-custom"
              @keyup.enter="goSearch"
            />
          </div>

          <!-- Icono de usuario con menú -->
          <div v-if="auth.isAuthenticated" class="user-menu-wrapper">
            <button class="user-icon user-logged" @click="toggleUserMenu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </button>

            <div v-if="showUserMenu" class="user-dropdown" @click.stop>
              <div class="user-menu-header">
                <div class="user-avatar-custom">
                  {{ auth.user?.name?.charAt(0) || 'U' }}
                </div>
                <div class="user-info-custom">
                  <div class="user-name-custom">
                    {{ auth.user?.name || 'Usuario' }}
                  </div>
                  <div class="user-email-custom">
                    {{ auth.user?.email || 'usuario@email.com' }}
                  </div>
                </div>
              </div>
              <div class="user-menu-divider"></div>
              <div class="user-menu-items">
                <button
                  v-if="!auth.isAdmin"
                  class="menu-item-custom"
                  @click="goToPage('user-dashboard')"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 3H21V21H3V3Z"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M7 15L10 10L13 13L19 6"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                  Dashboard
                </button>
                <!--<button v-if="!auth.isAdmin" class="menu-item-custom" @click="goToPage('buyer-dashboard')">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z" stroke="currentColor" stroke-width="2"/>
                    <path d="M16 21V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V21" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  Comprador
                </button> -->
                <button
                  v-if="!auth.isAdmin"
                  class="menu-item-custom"
                  @click="goToPage('my-appointments')"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <line
                      x1="8"
                      y1="2"
                      x2="8"
                      y2="6"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <line
                      x1="16"
                      y1="2"
                      x2="16"
                      y2="6"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <circle cx="12" cy="14" r="1" fill="currentColor" />
                  </svg>
                  Mis citas
                </button>
                <button
                  v-if="!auth.isAdmin"
                  class="menu-item-custom"
                  @click="goToPage('user-listings')"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M16 21V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V21"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                  Mis publicaciones
                </button>
                <button
                  class="menu-item-custom"
                  @click="goToPage('user-profile')"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                  Mi perfil
                </button>
                <button
                  class="menu-item-custom"
                  @click="goToPage('user-security')"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                  Seguridad
                </button>
                <div class="user-menu-divider"></div>
                <button class="menu-item-custom logout" @click="handleLogout">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M16 17L21 12L16 7"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path d="M21 12H9" stroke="currentColor" stroke-width="2" />
                  </svg>
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>

          <!-- Icono de login (invitado) -->
          <button v-else class="user-icon" @click="goToPage('auth-login')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const q = ref('');
const isNavbarVisible = ref(true);
const showUserMenu = ref(false);
let lastScrollY = ref(0);

// Cerrar menú al hacer clic fuera
const handleClickOutside = (event) => {
  const wrapper = document.querySelector('.user-menu-wrapper');
  if (wrapper && !wrapper.contains(event.target)) {
    showUserMenu.value = false;
  }
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY <= 10) {
    isNavbarVisible.value = true;
    lastScrollY.value = currentScrollY;
    return;
  }

  if (currentScrollY > lastScrollY.value && currentScrollY > 80) {
    isNavbarVisible.value = false;
    showUserMenu.value = false; // Cerrar menú al ocultar navbar
  } else if (currentScrollY < lastScrollY.value) {
    isNavbarVisible.value = true;
  }

  lastScrollY.value = currentScrollY;
};

const isActive = (name) => {
  return route.name === name;
};

const goToPage = (name) => {
  showUserMenu.value = false;
  router.push({ name });
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

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
  showUserMenu.value = false;
  router.push({ name: 'public-home' });
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* ============================================
   NAVBAR PERSONALIZADO - SIN FONDO BLANCO
   ============================================ */
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 32px;
  transition: transform 0.3s ease-in-out;
}

.navbar-hidden {
  transform: translateY(-100%);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
}

.navbar {
  background: #0f1e2c;
  padding: 12px 32px;
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
  white-space: nowrap;
}

.logo:hover {
  opacity: 0.8;
}

.nav-links {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.nav-btn {
  background: none;
  border: none;
  text-transform: none;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-active {
  color: #0f1e2c !important;
  font-weight: 600 !important;
  background: rgba(255, 255, 255, 0.9) !important;
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
  gap: 12px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  padding: 0 16px;
  border-radius: 40px;
  min-width: 200px;
  height: 40px;
}

.search-icon-custom {
  color: #777;
  flex-shrink: 0;
}

.search-input-custom {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;
  color: #333;
}

.search-input-custom::placeholder {
  color: #999;
}

/* Icono de usuario */
.user-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2a4c6d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.user-icon:hover {
  transform: scale(1.05);
  background: #3a5c7d;
}

.user-logged {
  background: linear-gradient(135deg, #436d97 0%, #436d97 100%);
}

/* Menú desplegable */
.user-menu-wrapper {
  position: relative;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 12px;
  background: white;
  border-radius: 16px;
  min-width: 260px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  overflow: hidden;
}

.user-menu-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.user-avatar-custom {
  width: 44px;
  height: 44px;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.user-info-custom {
  flex: 1;
}

.user-name-custom {
  font-weight: 700;
  font-size: 14px;
  color: #1e293b;
}

.user-email-custom {
  font-size: 11px;
  color: #64748b;
}

.user-menu-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 8px 0;
}

.user-menu-items {
  padding: 8px 0;
}

.menu-item-custom {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 16px;
  background: none;
  border: none;
  font-size: 13px;
  color: #334155;
  cursor: pointer;
  transition: background 0.2s;
  text-align: left;
}

.menu-item-custom svg {
  flex-shrink: 0;
  color: #64748b;
}

.menu-item-custom:hover {
  background: #f1f5f9;
}

.menu-item-custom.logout {
  color: #dc2626;
}

.menu-item-custom.logout svg {
  color: #dc2626;
}

/* Responsive */
@media (max-width: 1100px) {
  .custom-navbar {
    padding: 16px 20px;
  }

  .navbar {
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 30px;
    padding: 16px 24px;
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
  .custom-navbar {
    padding: 12px 16px;
  }

  .navbar {
    flex-direction: column;
    gap: 12px;
    border-radius: 20px;
    padding: 16px;
  }

  .nav-links {
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  .nav-btn {
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

  .logo {
    text-align: center;
    width: 100%;
  }
}
</style>
