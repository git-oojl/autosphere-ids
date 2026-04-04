<template>
  <div class="recover-password-page">
    <div class="recover-container">
      <!-- Logo / Brand -->
      <div class="brand-section">
        <div class="brand-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 13L9 17L19 7"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h1 class="brand-title">AUTOSPHERE</h1>
      </div>

      <div class="divider"></div>

      <!-- Header -->
      <div v-if="!emailSent && !isResetMode" class="recover-header">
        <div class="header-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 8v4M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="recover-title">¿Olvidaste tu contraseña?</h2>
        <p class="recover-subtitle">
          No te preocupes, te enviaremos un enlace para restablecerla.
        </p>
      </div>

      <div v-if="emailSent && !isResetMode" class="recover-header">
        <div class="header-icon success">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h2 class="recover-title">¡Revisa tu correo!</h2>
        <p class="recover-subtitle">
          Te hemos enviado un enlace para restablecer tu contraseña a
          <strong>{{ email }}</strong>
        </p>
      </div>

      <div v-if="isResetMode" class="recover-header">
        <div class="header-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h2 class="recover-title">Crear nueva contraseña</h2>
        <p class="recover-subtitle">
          Ingresa tu nueva contraseña para acceder a tu cuenta
        </p>
      </div>

      <!-- Formulario de recuperación (solicitar email) -->
      <form
        v-if="!emailSent && !isResetMode"
        class="recover-form"
        @submit.prevent="sendRecoveryEmail"
      >
        <div class="form-group">
          <label for="email" class="form-label">
            <span class="label-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                />
                <path d="M22 6L12 13L2 6" />
              </svg>
            </span>
            Correo electrónico
          </label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="form-input"
            placeholder="tu@email.com"
            required
            :disabled="isLoading"
          />
        </div>

        <button type="submit" class="recover-button" :disabled="isLoading">
          <span v-if="!isLoading" class="button-content">
            <span>Enviar instrucciones</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M5 12H19M19 12L12 5M19 12L12 19" />
            </svg>
          </span>
          <span v-else class="button-loading">
            <span class="spinner"></span>
            Enviando...
          </span>
        </button>
      </form>

      <!-- Formulario para restablecer contraseña -->
      <form
        v-if="isResetMode"
        class="recover-form"
        @submit.prevent="resetPassword"
      >
        <div class="form-group">
          <label for="newPassword" class="form-label">
            <span class="label-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            Nueva contraseña
          </label>
          <div class="password-wrapper">
            <input
              id="newPassword"
              v-model="resetForm.newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              class="form-input"
              :class="{ 'input-error': passwordErrors.newPassword }"
              placeholder="Mínimo 8 caracteres"
              required
              @input="validateNewPassword"
            />
            <button
              type="button"
              class="toggle-password"
              @click="toggleNewPasswordVisibility"
            >
              <svg
                v-if="!showNewPassword"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                />
                <circle cx="12" cy="12" r="3" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            </button>
          </div>
          <p v-if="passwordErrors.newPassword" class="error-message">
            {{ passwordErrors.newPassword }}
          </p>
          <p v-else class="hint-message">
            Mínimo 8 caracteres, incluyendo una mayúscula y un número
          </p>
        </div>

        <div class="form-group">
          <label for="confirmPassword" class="form-label">
            <span class="label-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            Confirmar contraseña
          </label>
          <div class="password-wrapper">
            <input
              id="confirmPassword"
              v-model="resetForm.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              class="form-input"
              :class="{ 'input-error': passwordErrors.confirmPassword }"
              placeholder="Repite tu nueva contraseña"
              required
              @input="validateConfirmPassword"
            />
            <button
              type="button"
              class="toggle-password"
              @click="toggleConfirmPasswordVisibility"
            >
              <svg
                v-if="!showConfirmPassword"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                />
                <circle cx="12" cy="12" r="3" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            </button>
          </div>
          <p v-if="passwordErrors.confirmPassword" class="error-message">
            {{ passwordErrors.confirmPassword }}
          </p>
        </div>

        <button
          type="submit"
          class="recover-button"
          :disabled="isLoading || !isFormValid"
        >
          <span v-if="!isLoading" class="button-content">
            <span>Restablecer contraseña</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M5 12H19M19 12L12 5M19 12L12 19" />
            </svg>
          </span>
          <span v-else class="button-loading">
            <span class="spinner"></span>
            Procesando...
          </span>
        </button>
      </form>

      <!-- Mensaje de éxito después de reset -->
      <div v-if="passwordReset" class="success-message">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M20 6L9 17L4 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p>¡Contraseña restablecida exitosamente!</p>
        <button class="btn-primary" @click="goToLogin">
          Ir al inicio de sesión
        </button>
      </div>

      <!-- Footer links -->
      <div v-if="!passwordReset" class="card-footer">
        <p class="footer-text">
          <router-link to="/login" class="footer-link">
            ← Volver al inicio de sesión
          </router-link>
        </p>
        <p v-if="emailSent && !isResetMode" class="footer-text">
          <a href="#" class="footer-link" @click.prevent="resetForm">
            ¿No recibiste el correo? Enviar nuevamente
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Estados
const isLoading = ref(false);
const emailSent = ref(false);
const isResetMode = ref(false);
const passwordReset = ref(false);
const email = ref('');

// Formulario de recuperación
const formData = ref({
  email: '',
});

// Formulario de reset
const resetForm = ref({
  token: '',
  newPassword: '',
  confirmPassword: '',
});

// Visibilidad de contraseñas
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

// Errores de validación
const passwordErrors = ref({
  newPassword: '',
  confirmPassword: '',
});

// Validaciones
const validateNewPassword = () => {
  const password = resetForm.value.newPassword;
  if (!password) {
    passwordErrors.value.newPassword = '';
    return;
  }
  if (password.length < 8) {
    passwordErrors.value.newPassword =
      'La contraseña debe tener al menos 8 caracteres';
  } else if (!/[A-Z]/.test(password)) {
    passwordErrors.value.newPassword = 'Debe contener al menos una mayúscula';
  } else if (!/[0-9]/.test(password)) {
    passwordErrors.value.newPassword = 'Debe contener al menos un número';
  } else {
    passwordErrors.value.newPassword = '';
  }
  validateConfirmPassword();
};

const validateConfirmPassword = () => {
  const { newPassword, confirmPassword } = resetForm.value;
  if (!confirmPassword) {
    passwordErrors.value.confirmPassword = '';
    return;
  }
  if (newPassword !== confirmPassword) {
    passwordErrors.value.confirmPassword = 'Las contraseñas no coinciden';
  } else {
    passwordErrors.value.confirmPassword = '';
  }
};

const isFormValid = computed(() => {
  return (
    resetForm.value.newPassword &&
    resetForm.value.confirmPassword &&
    !passwordErrors.value.newPassword &&
    !passwordErrors.value.confirmPassword
  );
});

// Enviar email de recuperación
const sendRecoveryEmail = async () => {
  if (!formData.value.email) return;

  isLoading.value = true;
  email.value = formData.value.email;

  try {
    // Simular envío de email
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Enviando correo a:', formData.value.email);
    emailSent.value = true;
  } catch (error) {
    console.error('Error al enviar correo:', error);
    alert('Error al enviar el correo. Intenta nuevamente.');
  } finally {
    isLoading.value = false;
  }
};

// Restablecer contraseña
const resetPassword = async () => {
  if (!isFormValid.value) return;

  isLoading.value = true;

  try {
    // Simular restablecimiento
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Restableciendo contraseña con token:', resetForm.value.token);
    passwordReset.value = true;
  } catch (error) {
    console.error('Error al restablecer:', error);
    alert('Error al restablecer la contraseña. Intenta nuevamente.');
  } finally {
    isLoading.value = false;
  }
};

// Alternar visibilidad de contraseñas
const toggleNewPasswordVisibility = () => {
  showNewPassword.value = !showNewPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

// Navegación
const goToLogin = () => {
  router.push('/login');
};

// Verificar si hay token en la URL (modo reset)
onMounted(() => {
  const token = route.query.token;
  if (token) {
    isResetMode.value = true;
    resetForm.value.token = token;
  }
});
</script>

<style scoped src="./styles.css"></style>
