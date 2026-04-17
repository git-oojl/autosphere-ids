<template>
  <div class="forgot-password-container">
    <div class="forgot-password-card">
      <div class="brand-section">
        <h1 class="brand-title">AutoSphere</h1>
      </div>

      <h2 class="title">¿Olvidaste tu contraseña?</h2>
      <p class="subtitle">
        Ingresa tu correo electrónico y te enviaremos un enlace para
        restablecerla.
      </p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="tu@email.com"
            required
          />
        </div>

        <button type="submit" class="btn-primary" :disabled="isLoading">
          {{ isLoading ? 'Enviando...' : 'Enviar instrucciones' }}
        </button>

        <div class="footer">
          <router-link :to="{ name: 'auth-login' }">
            ← Volver al inicio de sesión
          </router-link>
        </div>
      </form>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { requestPasswordReset } from '../../../services/auth.js';

const router = useRouter();
const email = ref('');
const isLoading = ref(false);
const successMessage = ref('');

const handleSubmit = async () => {
  isLoading.value = true;

  try {
    const response = await requestPasswordReset({ email: email.value });
    successMessage.value =
      response?.message
        ? `${response.message} para ${email.value}`
        : `Se han enviado las instrucciones a ${email.value}`;
  } finally {
    isLoading.value = false;
  }

  setTimeout(() => {
    router.push({ name: 'auth-login' });
  }, 3000);
};
</script>

<style scoped src="./styles.css"></style>
