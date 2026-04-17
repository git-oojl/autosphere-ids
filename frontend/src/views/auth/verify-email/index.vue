<template>
  <section class="verify-page">
    <div class="card">
      <p class="eyebrow">AutoSphere</p>
      <h1>Correo verificado</h1>
      <p>
        Confirma el estado actual del correo y mantiene continuidad hacia el
        acceso o el inicio.
      </p>
      <div :class="['status', statusClass]">
        <strong>{{ message }}</strong>
        <span>{{ detail }}</span>
      </div>
      <div class="actions">
        <button @click="router.push({ name: 'auth-login' })">
          Ir a iniciar sesión
        </button>
        <button class="secondary" @click="router.push({ name: 'public-home' })">
          Volver al inicio
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { verifyEmail } from '../../../services/auth.js';

const route = useRoute();
const router = useRouter();
const status = ref(route.query.status === 'pending' ? 'pending' : 'success');
const message = ref('Validando estado del correo...');
const detail = ref('');

const statusClass = computed(() =>
  status.value === 'error' ? 'error' : status.value === 'pending' ? 'pending' : 'success'
);

onMounted(async () => {
  if (route.query.status === 'pending') {
    message.value = 'Tu cuenta quedó pendiente de validación manual.';
    detail.value =
      'El frontend ya quedó detrás del seam de verificación. En Wave 2 este paso consultará el endpoint real.';
    return;
  }

  try {
    const response = await verifyEmail({ token: route.query.token || null });
    status.value = 'success';
    message.value = response?.message || 'Tu correo fue validado correctamente en el entorno actual.';
    detail.value = 'Ya puedes continuar con tu acceso o volver al inicio.';
  } catch (error) {
    status.value = 'error';
    message.value = 'No fue posible validar el correo.';
    detail.value = 'Reintenta desde el enlace de verificación o vuelve a iniciar sesión.';
  }
});
</script>

<style scoped>
.verify-page {
  padding: 120px 24px 40px;
  display: grid;
  place-items: center;
}
.card {
  max-width: 640px;
  background: white;
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
.status {
  border-radius: 18px;
  padding: 16px;
  display: grid;
  gap: 6px;
}
.status.success {
  background: #dcfce7;
  color: #166534;
}
.status.pending {
  background: #fef3c7;
  color: #92400e;
}
.status.error {
  background: #fee2e2;
  color: #991b1b;
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
  color: white;
  cursor: pointer;
}
button.secondary {
  background: #e2e8f0;
  color: #0f172a;
}
</style>
