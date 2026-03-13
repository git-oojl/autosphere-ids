<template>
  <details class="dev-session-switcher">
    <summary aria-label="Abrir herramientas de sesión de desarrollo">
      Dev session
    </summary>

    <div
      class="panel"
      role="region"
      aria-label="Controles de sesión de desarrollo"
    >
      <header class="panel-header">
        <h2>Sesión de desarrollo</h2>
        <p class="panel-copy">
          Visible solo en desarrollo. Permite cambiar de rol sin backend.
        </p>
      </header>

      <section class="status-block" aria-live="polite">
        <p>
          <strong>Estado:</strong>
          {{ auth.isAuthenticated ? 'Autenticado' : 'Invitado' }}
        </p>
        <p>
          <strong>Rol principal:</strong> {{ auth.primaryRole || 'Ninguno' }}
        </p>
        <p><strong>Usuario:</strong> {{ auth.user?.name || 'Sin sesión' }}</p>
      </section>

      <section class="actions-block">
        <h3>Entrar como</h3>

        <div class="button-grid">
          <button type="button" @click="setGuest">Invitado</button>

          <button type="button" @click="setRole('buyer')">Comprador</button>

          <button type="button" @click="setRole('seller')">Vendedor</button>

          <button type="button" @click="setRole('lessor')">Arrendador</button>

          <button type="button" @click="setRole('admin')">Admin</button>
        </div>
      </section>

      <section class="links-block">
        <h3>Ir a</h3>

        <div class="button-grid">
          <button type="button" @click="goTo('/')">Inicio</button>
          <button type="button" @click="goTo('/login')">Login</button>
          <button type="button" @click="goTo('/panel/comprador')">
            Panel comprador
          </button>
          <button type="button" @click="goTo('/panel/vendedor')">
            Panel vendedor
          </button>
          <button type="button" @click="goTo('/panel/arrendador')">
            Panel arrendador
          </button>
          <button type="button" @click="goTo('/admin')">Admin</button>
        </div>
      </section>
    </div>
  </details>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const auth = useAuthStore();

const roleConfig = {
  buyer: {
    user: { id: 101, name: 'Dev Buyer', email: 'buyer@dev.local' },
    roles: ['buyer'],
    redirect: '/panel/comprador',
  },
  seller: {
    user: { id: 102, name: 'Dev Seller', email: 'seller@dev.local' },
    roles: ['seller'],
    redirect: '/panel/vendedor',
  },
  lessor: {
    user: { id: 103, name: 'Dev Lessor', email: 'lessor@dev.local' },
    roles: ['lessor'],
    redirect: '/panel/arrendador',
  },
  admin: {
    user: { id: 104, name: 'Dev Admin', email: 'admin@dev.local' },
    roles: ['admin'],
    redirect: '/admin',
  },
};

function setGuest() {
  auth.clearSession();
  router.push('/');
}

function setRole(role) {
  const config = roleConfig[role];

  auth.startSession({
    nextUser: config.user,
    nextRoles: config.roles,
    token: 'dev-token',
  });

  router.push(config.redirect);
}

function goTo(path) {
  router.push(path);
}
</script>

<style scoped>
.dev-session-switcher {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 2000;
  width: min(360px, calc(100vw - 32px));
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
  outline: none;
  user-select: none;
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

.panel-header h2,
.actions-block h3,
.links-block h3 {
  margin: 0 0 6px;
}

.panel-copy,
.status-block p {
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
}

.status-block,
.actions-block,
.links-block {
  display: grid;
  gap: 10px;
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

.button-grid button:hover,
.button-grid button:focus-visible,
.dev-session-switcher summary:focus-visible {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}

@media (max-width: 640px) {
  .button-grid {
    grid-template-columns: 1fr;
  }
}
</style>
