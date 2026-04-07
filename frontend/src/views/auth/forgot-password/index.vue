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

const router = useRouter();
const email = ref('');
const isLoading = ref(false);
const successMessage = ref('');

const handleSubmit = async () => {
  isLoading.value = true;

  // Simular envío de correo
  await new Promise((resolve) => setTimeout(resolve, 1500));

  successMessage.value = `Se han enviado las instrucciones a ${email.value}`;
  isLoading.value = false;

  // Opcional: redirigir después de 3 segundos
  setTimeout(() => {
    router.push({ name: 'auth-login' });
  }, 3000);
};
</script>

<style scoped>
.forgot-password-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3a5f 0%, #2d5179 100%);
  padding: 20px;
}

.forgot-password-card {
  background: white;
  border-radius: 24px;
  padding: 40px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.brand-section {
  text-align: center;
  margin-bottom: 32px;
}

.brand-title {
  font-size: 28px;
  font-weight: 700;
  color: #1e3a5f;
  margin: 0;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-primary {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.footer {
  text-align: center;
  margin-top: 24px;
}

.footer a {
  color: #3b82f6;
  text-decoration: none;
  font-size: 14px;
}

.footer a:hover {
  text-decoration: underline;
}

.success-message {
  margin-top: 20px;
  padding: 12px;
  background: #d1fae5;
  color: #065f46;
  border-radius: 12px;
  font-size: 14px;
  text-align: center;
}
</style>
