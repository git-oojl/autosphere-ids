<template>
  <details class="dev-session-switcher">
    <summary>Dev session</summary>
    <div class="panel">
      <header>
        <h2>Selector rápido</h2>
        <p>Estado: {{ auth.isAuthenticated ? 'Autenticado' : 'Invitado' }}</p>
        <p>
          Rol:
          {{ auth.isAdmin ? 'Admin' : auth.isUser ? 'Usuario' : 'Ninguno' }}
        </p>
        <p>Usuario: {{ auth.user?.name || 'Sin sesión' }}</p>
      </header>

      <div class="button-grid">
        <button @click="setGuest">Invitado</button>
        <button @click="setUser">Usuario registrado</button>
        <button @click="setAdmin">Administrador</button>
      </div>

      <hr />
      <div class="button-grid">
        <button @click="goTo('/')">Inicio</button>
        <button @click="goTo('/vehiculos')">Catálogo</button>
        <button v-if="auth.isUser" @click="goTo('/cuenta/perfil')">
          Mi Perfil
        </button>
        <button
          v-if="auth.canListVehicles"
          @click="goTo('/cuenta/nuevo-anuncio')"
        >
          Nuevo anuncio
        </button>
        <button v-if="auth.isAdmin" @click="goTo('/admin')">
          Admin Dashboard
        </button>
      </div>
    </div>
  </details>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

function setGuest() {
  auth.clearSession();
  router.push('/');
}

function setUser() {
  auth.startSession({
    nextUser: { id: 101, name: 'Usuario Demo', email: 'user@demo.com' },
    nextRoles: ['user'], // único rol
    token: 'dev-token',
  });
  router.push('/'); // o a donde quieras
}

function setAdmin() {
  auth.startSession({
    nextUser: { id: 999, name: 'Admin', email: 'admin@autosphere.com' },
    nextRoles: ['admin'],
    token: 'admin-token',
  });
  router.push('/admin');
}

function goTo(path) {
  router.push(path);
}
</script>

<style scoped>
/* Mantén los estilos que ya tenías */
.dev-session-switcher {
  position: fixed;
  right: 20px;
  bottom: 16px;
  z-index: 2000;
  width: min(400px, calc(100vw - 32px));
  background: #111827;
  color: white;
  border-radius: 16px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
  overflow: hidden;
}
.dev-session-switcher summary {
  list-style: none;
  cursor: pointer;
  padding: 14px 16px;
  font-weight: 700;
}
.dev-session-switcher summary::-webkit-details-marker {
  display: none;
}
.dev-session-switcher[open] summary {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
.panel {
  padding: 16px;
  display: grid;
  gap: 16px;
}
.button-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.button-grid button {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #1f2937;
  color: white;
  border-radius: 10px;
  padding: 10px 12px;
  cursor: pointer;
  text-align: left;
}
.button-grid button:hover {
  outline: 2px solid #60a5fa;
}
@media (max-width: 640px) {
  .button-grid {
    grid-template-columns: 1fr;
  }
}
</style>
