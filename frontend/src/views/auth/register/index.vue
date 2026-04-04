<template>
  <div class="register-container">
    <!-- Background Overlay -->
    <div class="background-overlay"></div>

    <!-- Register Card -->
    <div class="register-card">
      <!-- Logo or Brand Area -->
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

      <!-- Register Title -->
      <h2 class="register-title">Crear cuenta</h2>
      <p class="register-subtitle">Únete a la comunidad de autos de lujo</p>

      <!-- Register Form -->
      <form class="register-form" @submit.prevent="handleRegister">
        <!-- Full Name Field -->
        <div class="form-group">
          <label for="fullName" class="form-label">
            <span class="label-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            Nombre completo:
          </label>
          <input
            id="fullName"
            v-model="formData.fullName"
            type="text"
            class="form-input"
            placeholder="Juan Pérez"
            required
          />
        </div>

        <!-- Email Field -->
        <div class="form-group">
          <label for="email" class="form-label">
            <span class="label-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            Correo electrónico:
          </label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="form-input"
            placeholder="ejemplo@email.com"
            required
          />
        </div>

        <!-- Phone Field -->
        <div class="form-group">
          <label for="phone" class="form-label">
            <span class="label-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 16.92V19.92C22 20.4728 21.5523 20.92 21 20.92H18C8.61116 20.92 1 13.3088 1 3.92C1 3.36772 1.44772 2.92 2 2.92H5C5.55228 2.92 6 3.36772 6 3.92V7.42C6 7.97228 5.55228 8.42 5 8.42H3.5C4.5 13.92 9.5 18.92 15 19.92V18.42C15 17.8677 15.4477 17.42 16 17.42H19.5C20.0523 17.42 20.5 17.8677 20.5 18.42V19.92"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            Teléfono:
          </label>
          <input
            id="phone"
            v-model="formData.phone"
            type="tel"
            class="form-input"
            placeholder="+52 123 456 7890"
            required
          />
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <label for="password" class="form-label">
            <span class="label-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="11"
                  rx="2"
                  ry="2"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            Contraseña:
          </label>
          <div class="password-wrapper">
            <input
              id="password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder="Mínimo 8 caracteres"
              required
              minlength="8"
            />
            <button
              type="button"
              class="toggle-password"
              tabindex="-1"
              @click="togglePasswordVisibility"
            >
              <svg
                v-if="!showPassword"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <line
                  x1="1"
                  y1="1"
                  x2="23"
                  y2="23"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Confirm Password Field -->
        <div class="form-group">
          <label for="confirmPassword" class="form-label">
            <span class="label-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="11"
                  rx="2"
                  ry="2"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            Confirmar contraseña:
          </label>
          <div class="password-wrapper">
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              class="form-input"
              :class="{ 'input-error': passwordError }"
              placeholder="Repite tu contraseña"
              required
            />
            <button
              type="button"
              class="toggle-password"
              tabindex="-1"
              @click="toggleConfirmPasswordVisibility"
            >
              <svg
                v-if="!showConfirmPassword"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <line
                  x1="1"
                  y1="1"
                  x2="23"
                  y2="23"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="register-button"
          :disabled="isLoading || !acceptTerms"
        >
          <span v-if="!isLoading" class="button-content">
            <span>Crear cuenta</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span v-else class="button-loading">
            <span class="spinner"></span>
            Creando cuenta...
          </span>
        </button>
      </form>

      <!-- Footer -->
      <div class="card-footer">
        <p class="footer-text">
          ¿Ya tienes una cuenta?
          <router-link to="/login" class="footer-link">
            Inicia sesión
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

// Obtener instancia del router
const router = useRouter();

// Estado reactivo del formulario
const formData = reactive({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: '',
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const acceptTerms = ref(false);
const isLoading = ref(false);
const passwordError = ref('');

// Validar que las contraseñas coincidan
watch(
  () => formData.confirmPassword,
  (newValue) => {
    if (newValue && formData.password !== newValue) {
      passwordError.value = 'Las contraseñas no coinciden';
    } else {
      passwordError.value = '';
    }
  }
);

watch(
  () => formData.password,
  () => {
    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      passwordError.value = 'Las contraseñas no coinciden';
    } else {
      passwordError.value = '';
    }
  }
);

// Alternar visibilidad de contraseña
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

// Manejar envío del formulario
const handleRegister = async () => {
  // Validar que las contraseñas coincidan
  if (formData.password !== formData.confirmPassword) {
    passwordError.value = 'Las contraseñas no coinciden';
    return;
  }

  // Validar que se haya seleccionado un rol
  if (!formData.role) {
    alert('Por favor selecciona un tipo de cuenta');
    return;
  }

  isLoading.value = true;

  try {
    console.log('Intentando registrar usuario:', {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      acceptTerms: acceptTerms.value,
    });

    // Simulación de petición API
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Registro exitoso');

    // Redirigir según el rol
    if (formData.role === 'vendedor') {
      router.push('/dashboard-vendedor');
    } else {
      router.push('/dashboard-comprador');
    }
  } catch (error) {
    console.error('Error en el registro:', error);
  } finally {
    isLoading.value = false;
  }
};

// Mostrar términos y condiciones
// const showTerms = (e) => {
// //   e.preventDefault();
router.push('/registro');
// };
</script>

<style scoped src="./styles.css"></style>
