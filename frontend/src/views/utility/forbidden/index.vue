<template>
  <section class="utility-page">
    <div class="card">
      <p class="eyebrow">AutoSphere</p>
      <h1>Sin permisos para continuar</h1>
      <p>La ruta existe, pero no corresponde a tu estado actual de sesión.</p>
      <div class="actions">
        <button @click="goPrimary">
          {{
            auth.isAdmin
              ? 'Ir a administración'
              : auth.isAuthenticated
                ? 'Ir a mi cuenta'
                : 'Iniciar sesión'
          }}
        </button>
        <button class="secondary" @click="router.push({ name: 'public-home' })">
          Volver al inicio
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../../stores/auth.js';

const router = useRouter();
const auth = useAuthStore();

function goPrimary() {
  router.push({
    name: auth.isAdmin
      ? 'admin-dashboard'
      : auth.isAuthenticated
        ? 'user-dashboard'
        : 'auth-login',
  });
}
</script>

<style scoped>
.utility-page {
  padding: 120px 24px 40px;
  display: grid;
  place-items: center;
}
.card {
  max-width: 620px;
  background: #fff;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 16px 40px rgba(15, 30, 44, 0.08);
  display: grid;
  gap: 16px;
}
.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 12px;
  color: #64748b;
}
.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
button {
  border: none;
  border-radius: 999px;
  padding: 12px 16px;
  background: #0f1e2c;
  color: #fff;
  cursor: pointer;
}
.secondary {
  background: #e2e8f0;
  color: #0f172a;
}
</style>
