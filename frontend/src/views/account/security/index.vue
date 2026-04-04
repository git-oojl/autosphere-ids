<template>
  <section class="security-page">
    <br /><br /><br /><br /><br />

    <!-- PAGE HEADER -->
    <div class="page-header">
      <div class="header-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      </div>
      <div class="header-text">
        <p class="eyebrow">AutoSphere · Seguridad</p>
        <h1>Configuración de seguridad</h1>
        <p class="header-desc">
          Administra tu contraseña y la configuración de acceso a tu cuenta.
        </p>
      </div>
    </div>

    <!-- STATUS BANNER -->
    <transition name="banner-slide">
      <div v-if="banner.visible" class="status-banner" :class="banner.type">
        <div class="banner-icon">
          <svg
            v-if="banner.type === 'success'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <svg
            v-else-if="banner.type === 'error'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
        </div>
        <span>{{ banner.message }}</span>
        <button
          class="banner-close"
          aria-label="Cerrar notificación"
          @click="closeBanner"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition>

    <div class="content-grid">
      <!-- ── CAMBIO DE CONTRASEÑA ── -->
      <div class="security-card" :class="{ loading: isSubmitting }">
        <div class="card-header">
          <div class="card-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          <div>
            <h2 class="card-title">Cambiar contraseña</h2>
            <p class="card-subtitle">
              Actualiza tu contraseña periódicamente para mayor seguridad.
            </p>
          </div>
        </div>

        <div class="card-body">
          <!-- Contraseña actual -->
          <div class="field-group">
            <label class="field-label" for="current-password">
              Contraseña actual
              <span class="required">*</span>
            </label>
            <div
              class="input-wrapper"
              :class="{
                error: errors.currentPassword,
                focused: focus.currentPassword,
              }"
            >
              <span class="input-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </span>
              <input
                id="current-password"
                v-model="form.currentPassword"
                :type="show.current ? 'text' : 'password'"
                placeholder="••••••••"
                class="field-input"
                autocomplete="current-password"
                @focus="focus.currentPassword = true"
                @blur="
                  focus.currentPassword = false;
                  validateField('currentPassword');
                "
                @keyup.enter="submitPasswordChange"
              />
              <button
                class="toggle-eye"
                type="button"
                tabindex="-1"
                :aria-label="
                  show.current ? 'Ocultar contraseña' : 'Mostrar contraseña'
                "
                @click="show.current = !show.current"
              >
                <svg
                  v-if="!show.current"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                  />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
            <transition name="fade-slide">
              <p v-if="errors.currentPassword" class="field-error">
                {{ errors.currentPassword }}
              </p>
            </transition>
          </div>

          <div class="field-divider"></div>

          <!-- Nueva contraseña -->
          <div class="field-group">
            <label class="field-label" for="new-password">
              Nueva contraseña
              <span class="required">*</span>
            </label>
            <div
              class="input-wrapper"
              :class="{ error: errors.newPassword, focused: focus.newPassword }"
            >
              <span class="input-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <input
                id="new-password"
                v-model="form.newPassword"
                :type="show.newPass ? 'text' : 'password'"
                placeholder="••••••••"
                class="field-input"
                autocomplete="new-password"
                @focus="focus.newPassword = true"
                @blur="
                  focus.newPassword = false;
                  validateField('newPassword');
                "
                @input="
                  validateField('newPassword');
                  updatePasswordStrength();
                "
              />
              <button
                class="toggle-eye"
                type="button"
                tabindex="-1"
                :aria-label="
                  show.newPass ? 'Ocultar contraseña' : 'Mostrar contraseña'
                "
                @click="show.newPass = !show.newPass"
              >
                <svg
                  v-if="!show.newPass"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                  />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
            <transition name="fade-slide">
              <p v-if="errors.newPassword" class="field-error">
                {{ errors.newPassword }}
              </p>
            </transition>

            <!-- Strength meter -->
            <div v-if="form.newPassword" class="strength-meter">
              <div class="strength-bars">
                <span
                  v-for="i in 4"
                  :key="i"
                  class="strength-bar"
                  :class="{
                    active: i <= passwordStrength.score,
                    [`level-${passwordStrength.score}`]:
                      i <= passwordStrength.score,
                  }"
                ></span>
              </div>
              <span
                class="strength-label"
                :class="`strength-${passwordStrength.score}`"
              >
                {{ passwordStrength.label }}
              </span>
            </div>

            <!-- Requirements checklist -->
            <div v-if="form.newPassword" class="requirements-list">
              <div
                v-for="req in requirements"
                :key="req.key"
                class="requirement-item"
                :class="{ met: req.met }"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path v-if="req.met" d="M20 6L9 17l-5-5" />
                  <circle v-else cx="12" cy="12" r="4" />
                </svg>
                <span>{{ req.label }}</span>
              </div>
            </div>
          </div>

          <!-- Confirmar contraseña -->
          <div class="field-group">
            <label class="field-label" for="confirm-password">
              Confirmar nueva contraseña
              <span class="required">*</span>
            </label>
            <div
              class="input-wrapper"
              :class="{
                error: errors.confirmPassword,
                success: passwordsMatch && form.confirmPassword,
                focused: focus.confirmPassword,
              }"
            >
              <span class="input-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </span>
              <input
                id="confirm-password"
                v-model="form.confirmPassword"
                :type="show.confirm ? 'text' : 'password'"
                placeholder="••••••••"
                class="field-input"
                autocomplete="new-password"
                @focus="focus.confirmPassword = true"
                @blur="
                  focus.confirmPassword = false;
                  validateField('confirmPassword');
                "
                @input="validateField('confirmPassword')"
                @keyup.enter="submitPasswordChange"
              />
              <button
                class="toggle-eye"
                type="button"
                tabindex="-1"
                :aria-label="
                  show.confirm ? 'Ocultar contraseña' : 'Mostrar contraseña'
                "
                @click="show.confirm = !show.confirm"
              >
                <svg
                  v-if="!show.confirm"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                  />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
            <transition name="fade-slide">
              <p v-if="errors.confirmPassword" class="field-error">
                {{ errors.confirmPassword }}
              </p>
            </transition>
            <transition name="fade-slide">
              <p
                v-if="
                  passwordsMatch &&
                  form.confirmPassword &&
                  !errors.confirmPassword
                "
                class="field-success"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Las contraseñas coinciden
              </p>
            </transition>
          </div>
        </div>

        <div class="card-footer">
          <button
            class="btn-secondary"
            type="button"
            :disabled="isSubmitting"
            @click="resetForm"
          >
            Cancelar
          </button>
          <button
            class="btn-primary"
            type="button"
            :disabled="isSubmitting || !canSubmit"
            @click="submitPasswordChange"
          >
            <span v-if="isSubmitting" class="spinner"></span>
            <svg
              v-else
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            {{ isSubmitting ? 'Actualizando...' : 'Actualizar contraseña' }}
          </button>
        </div>
      </div>

      <!-- ── COLUMNA DERECHA ── -->
      <div class="side-column">
        <!-- Sesión activa -->
        <div class="info-card session-card">
          <div class="card-header">
            <div class="card-icon small">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </div>
            <div>
              <h3 class="card-title sm">Sesión activa</h3>
              <p class="card-subtitle">Dispositivo actual</p>
            </div>
          </div>
          <div class="session-info">
            <div class="session-row">
              <span class="session-label">Dispositivo</span>
              <span class="session-value"
                >{{ deviceInfo.os }} · {{ deviceInfo.browser }}</span
              >
            </div>
            <div class="session-row">
              <span class="session-label">Ubicación</span>
              <span class="session-value"
                >{{ locationInfo.city }}, {{ locationInfo.country }}</span
              >
            </div>
            <div class="session-row">
              <span class="session-label">Último acceso</span>
              <span class="session-value">Hoy, {{ currentTime }}</span>
            </div>
            <div class="session-row">
              <span class="session-label">IP</span>
              <span class="session-value mono">{{ ipAddress }}</span>
            </div>
          </div>
          <div class="active-badge">
            <span class="pulse-dot"></span>
            Sesión activa ahora
          </div>
        </div>

        <!-- Consejos de seguridad -->
        <div class="info-card tips-card">
          <div class="card-header">
            <div class="card-icon small amber">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4m0 4h.01" />
              </svg>
            </div>
            <div>
              <h3 class="card-title sm">Consejos de seguridad</h3>
            </div>
          </div>
          <ul class="tips-list">
            <li v-for="(tip, index) in securityTips" :key="index">
              <span class="tip-dot"></span>
              {{ tip }}
            </li>
          </ul>
        </div>

        <!-- Próximamente -->
        <div class="info-card coming-card">
          <div class="card-header">
            <div class="card-icon small blue"></div>
          </div>
          <ul class="coming-list">
            <li v-for="feature in upcomingFeatures" :key="feature.name">
              <span class="coming-badge">{{ feature.badge }}</span>
              {{ feature.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';

// ── Device & Location info ────────────────────────
const deviceInfo = reactive({
  os: '',
  browser: '',
});

const locationInfo = reactive({
  city: 'Tijuana',
  country: 'México',
});

const ipAddress = ref('192.168.xxx.xxx');

function getDeviceInfo() {
  const ua = navigator.userAgent;
  if (ua.includes('Windows')) deviceInfo.os = 'Windows';
  else if (ua.includes('Mac')) deviceInfo.os = 'macOS';
  else if (ua.includes('Linux')) deviceInfo.os = 'Linux';
  else if (ua.includes('Android')) deviceInfo.os = 'Android';
  else if (ua.includes('iOS')) deviceInfo.os = 'iOS';
  else deviceInfo.os = 'Desconocido';

  if (ua.includes('Chrome') && !ua.includes('Edg'))
    deviceInfo.browser = 'Chrome';
  else if (ua.includes('Firefox')) deviceInfo.browser = 'Firefox';
  else if (ua.includes('Safari') && !ua.includes('Chrome'))
    deviceInfo.browser = 'Safari';
  else if (ua.includes('Edg')) deviceInfo.browser = 'Edge';
  else deviceInfo.browser = 'Navegador';
}

// ── Time ──────────────────────────────────────────
const currentTime = ref('');
let timeInterval = null;

function updateTime() {
  currentTime.value = new Date().toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ── Form state ────────────────────────────────────
const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const show = ref({ current: false, newPass: false, confirm: false });
const focus = ref({
  currentPassword: false,
  newPassword: false,
  confirmPassword: false,
});
const errors = ref({});
const isSubmitting = ref(false);

const banner = ref({ visible: false, type: 'success', message: '' });
let bannerTimeout = null;

function closeBanner() {
  banner.value.visible = false;
  if (bannerTimeout) clearTimeout(bannerTimeout);
}

function showBanner(type, message) {
  closeBanner();
  banner.value = { visible: true, type, message };
  bannerTimeout = setTimeout(() => {
    banner.value.visible = false;
  }, 5000);
}

// ── Password strength and requirements ────────────
const requirements = computed(() => [
  {
    key: 'length',
    label: 'Mínimo 8 caracteres',
    met: form.value.newPassword.length >= 8,
  },
  {
    key: 'upper',
    label: 'Al menos una mayúscula',
    met: /[A-Z]/.test(form.value.newPassword),
  },
  {
    key: 'lower',
    label: 'Al menos una minúscula',
    met: /[a-z]/.test(form.value.newPassword),
  },
  {
    key: 'number',
    label: 'Al menos un número',
    met: /\d/.test(form.value.newPassword),
  },
  {
    key: 'special',
    label: 'Al menos un carácter especial',
    met: /[^A-Za-z0-9]/.test(form.value.newPassword),
  },
]);

const passwordStrength = ref({ score: 0, label: '' });

function updatePasswordStrength() {
  const metCount = requirements.value.filter((r) => r.met).length;
  const scores = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 3, 5: 4 };
  const score = scores[metCount] || 0;
  const labels = { 0: '', 1: 'Muy débil', 2: 'Débil', 3: 'Buena', 4: 'Fuerte' };
  passwordStrength.value = { score, label: labels[score] };
}

// ── Passwords match ───────────────────────────────
const passwordsMatch = computed(
  () =>
    form.value.newPassword &&
    form.value.newPassword === form.value.confirmPassword
);

// ── Can submit ────────────────────────────────────
const canSubmit = computed(
  () =>
    form.value.currentPassword &&
    form.value.newPassword &&
    passwordsMatch.value &&
    passwordStrength.value.score >= 3 &&
    Object.keys(errors.value).length === 0
);

// ── Validation ────────────────────────────────────
function validateField(field) {
  const e = { ...errors.value };

  if (field === 'currentPassword') {
    if (!form.value.currentPassword) {
      e.currentPassword = 'Ingresa tu contraseña actual.';
    } else if (form.value.currentPassword.length < 6) {
      e.currentPassword = 'La contraseña debe tener al menos 6 caracteres.';
    } else {
      delete e.currentPassword;
    }
  }

  if (field === 'newPassword') {
    if (!form.value.newPassword) {
      e.newPassword = 'Ingresa una nueva contraseña.';
    } else if (form.value.newPassword.length < 8) {
      e.newPassword = 'Debe tener al menos 8 caracteres.';
    } else if (form.value.newPassword === form.value.currentPassword) {
      e.newPassword = 'La nueva contraseña debe ser diferente a la actual.';
    } else {
      delete e.newPassword;
    }
  }

  if (field === 'confirmPassword') {
    if (!form.value.confirmPassword) {
      e.confirmPassword = 'Confirma tu nueva contraseña.';
    } else if (form.value.confirmPassword !== form.value.newPassword) {
      e.confirmPassword = 'Las contraseñas no coinciden.';
    } else {
      delete e.confirmPassword;
    }
  }

  errors.value = e;
}

function validateAll() {
  validateField('currentPassword');
  validateField('newPassword');
  validateField('confirmPassword');
  return Object.keys(errors.value).length === 0;
}

// ── Submit ────────────────────────────────────────
async function submitPasswordChange() {
  if (!validateAll() || !canSubmit.value) return;

  isSubmitting.value = true;

  try {
    // Simular llamada API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Aquí iría la llamada real a la API
    // await api.changePassword({
    //   currentPassword: form.value.currentPassword,
    //   newPassword: form.value.newPassword
    // })

    showBanner('success', '¡Contraseña actualizada correctamente!');
    resetForm();
  } catch (error) {
    showBanner(
      'error',
      error.message || 'Error al actualizar la contraseña. Intenta de nuevo.'
    );
  } finally {
    isSubmitting.value = false;
  }
}

function resetForm() {
  form.value = { currentPassword: '', newPassword: '', confirmPassword: '' };
  errors.value = {};
  updatePasswordStrength();
}

// ── Static content ────────────────────────────────
const securityTips = [
  'Usa al menos 12 caracteres con letras, números y símbolos.',
  'No reutilices contraseñas de otras plataformas.',
  'Cambia tu contraseña si sospechas acceso no autorizado.',
  'Nunca compartas tu contraseña por correo o chat.',
  'Activa las notificaciones de inicio de sesión cuando estén disponibles.',
];

// ── Lifecycle ─────────────────────────────────────
onMounted(() => {
  updateTime();
  timeInterval = setInterval(updateTime, 60000);
  getDeviceInfo();
});

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
  if (bannerTimeout) clearTimeout(bannerTimeout);
});
</script>

<style scoped src="./styles.css"></style>
