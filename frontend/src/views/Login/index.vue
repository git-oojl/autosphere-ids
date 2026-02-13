<template>
  <div class="login-container">
    <!-- Background Overlay -->
    <div class="background-overlay"></div>

    <!-- Decorative Elements -->
    <div class="decorative-line decorative-line-top"></div>
    <div class="decorative-line decorative-line-bottom"></div>

    <!-- Login Card -->
    <div class="login-card">
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

      <!-- Login Title -->
      <h2 class="login-title">Inicio de sesión</h2>
      <p class="login-subtitle">Accede a tu cuenta exclusiva</p>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="login-form">
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
            placeholder="ejemplo10@email.com"
            required
            @focus="handleFocus('email')"
            @blur="handleBlur('email')"
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
              placeholder="••••••••"
              required
              @focus="handleFocus('password')"
              @blur="handleBlur('password')"
            />
            <button
              type="button"
              class="toggle-password"
              @click="togglePasswordVisibility"
              tabindex="-1"
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

        <!-- Remember Me & Forgot Password -->
        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" />
            <span class="checkbox-custom"></span>
            <span class="checkbox-label">Recordarme</span>
          </label>
          <a
            href="#"
            class="forgot-password"
            @click.prevent="handleForgotPassword"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="login-button" :disabled="isLoading">
          <span v-if="!isLoading" class="button-content">
            <span>Ingresar</span>
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
            Ingresando...
          </span>
        </button>
      </form>

      <!-- Footer -->
      <div class="card-footer">
        <p class="footer-text">
          ¿No tienes una cuenta?
          <a href="#" class="footer-link" @click.prevent="handleRegister"
            >Regístrate</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// Estado reactivo del formulario
const formData = reactive({
  email: '',
  password: '',
});

const showPassword = ref(false);
const rememberMe = ref(false);
const isLoading = ref(false);

// Alternar visibilidad de contraseña
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Manejar focus de inputs
const handleFocus = (field) => {
  console.log(`Campo ${field} enfocado`);
  // Aquí puedes agregar lógica adicional si necesitas
};

// Manejar blur de inputs
const handleBlur = (field) => {
  console.log(`Campo ${field} desenfocado`);
  // Aquí puedes agregar validaciones adicionales
};

// Manejar envío del formulario
const handleLogin = async () => {
  isLoading.value = true;

  try {
    console.log('Intentando iniciar sesión con:', {
      email: formData.email,
      password: formData.password,
      rememberMe: rememberMe.value,
    });

    // Simulación de petición API (reemplaza con tu lógica real)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Aquí va tu lógica de autenticación
    // Por ejemplo:
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     email: formData.email,
    //     password: formData.password,
    //     rememberMe: rememberMe.value
    //   })
    // })

    console.log('Login exitoso');
  } catch (error) {
    console.error('Error en el login:', error);
  } finally {
    isLoading.value = false;
  }
};

// Manejar recuperación de contraseña
const handleForgotPassword = () => {
  console.log('Recuperar contraseña');
  // Navegar a la página de recuperación o abrir modal
};

// Manejar registro
const handleRegister = () => {
  console.log('Ir a registro');
  // Navegar a la página de registro
};
</script>

<style scoped src="./styles.css"></style>
