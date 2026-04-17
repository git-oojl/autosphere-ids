<template>
  <div class="security-page" :class="{ 'admin-security': auth.isAdmin }">
    <br /><br /><br /><br /><br />

    <div class="page-header">
      <div class="header-container">
        <div class="header-left">
          <div>
            <h1 class="page-title">
              {{ auth.isAdmin ? 'Seguridad administrativa' : 'Seguridad' }}
            </h1>
            <p class="page-subtitle">
              {{
                auth.isAdmin
                  ? 'Resguarda el acceso operativo y mantén vigente el canal de recuperación de la cuenta admin.'
                  : 'Gestiona tu acceso y mantén actualizado tu canal de recuperación.'
              }}
            </p>
          </div>
        </div>

        <div class="header-actions">
          <button
            type="button"
            class="btn-secondary"
            @click="router.push({ name: 'user-profile' })"
          >
            {{ auth.isAdmin ? 'Cuenta admin' : 'Mi perfil' }}
          </button>
        </div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M12 8v4M12 16h.01"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ auth.isAdmin ? 'Admin' : canChangePassword ? 'Sí' : 'No' }}</span>
          <span class="stat-title">{{ auth.isAdmin ? 'Tipo de cuenta' : 'Cambio de contraseña disponible' }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon green">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              stroke="currentColor"
              stroke-width="2"
            />
            <polyline
              points="22,6 12,13 2,6"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ recoveryChannelCount }}</span>
          <span class="stat-title">{{ auth.isAdmin ? 'Canal de recuperación prioritario' : 'Método de recuperación configurado' }}</span>
          <span class="stat-meta">{{ recoveryEmailLabel }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon purple">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16v16H4V4z" stroke="currentColor" stroke-width="2" />
            <path
              d="M8 8h8M8 12h6M8 16h4"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ lastPasswordDays }}</span>
          <span class="stat-title">Días desde el último cambio</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon orange">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2a10 10 0 1010 10 10 10 0 00-10-10z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M12 6v4M12 14h.01"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ recommendations.length }}</span>
          <span class="stat-title">{{ auth.isAdmin ? 'Revisiones manuales sugeridas' : 'Recomendaciones activas' }}</span>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <div class="left-column">
        <div id="password-card" class="security-card">
          <div class="card-header">
            <div class="card-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <div class="card-header-text">
              <h2 class="card-title">
                {{ auth.isAdmin ? 'Cambiar contraseña administrativa' : 'Cambiar contraseña' }}
              </h2>
              <p class="card-subtitle">
                {{
                  auth.isAdmin
                    ? 'Actualiza la contraseña de esta cuenta de operación y reduce el riesgo de acceso no deseado.'
                    : 'Actualiza tu contraseña y refuerza el acceso principal a tu cuenta.'
                }}
              </p>
            </div>
          </div>
          <div class="card-body">
            <form @submit.prevent="changePassword">
              <div class="form-group">
                <label class="form-label">Contraseña actual</label>
                <div
                  class="input-wrapper"
                  :class="{ focused: focus.currentPassword }"
                >
                  <span class="input-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </span>
                  <input
                    v-model="passwordForm.current"
                    :type="showCurrentPassword ? 'text' : 'password'"
                    class="form-input"
                    placeholder="Ingresa tu contraseña actual"
                    @focus="focus.currentPassword = true"
                    @blur="focus.currentPassword = false"
                  />
                  <button
                    type="button"
                    class="password-toggle"
                    @click="showCurrentPassword = !showCurrentPassword"
                  >
                    <svg
                      v-if="!showCurrentPassword"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg
                      v-else
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                      />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Nueva contraseña</label>
                <div
                  class="input-wrapper"
                  :class="{ focused: focus.newPassword }"
                >
                  <span class="input-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </span>
                  <input
                    v-model="passwordForm.new"
                    :type="showNewPassword ? 'text' : 'password'"
                    class="form-input"
                    placeholder="Nueva contraseña"
                    @focus="focus.newPassword = true"
                    @blur="focus.newPassword = false"
                  />
                  <button
                    type="button"
                    class="password-toggle"
                    @click="showNewPassword = !showNewPassword"
                  >
                    <svg
                      v-if="!showNewPassword"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg
                      v-else
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                      />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
                <div v-if="passwordForm.new" class="password-strength">
                  <div class="strength-bar">
                    <div
                      class="strength-fill"
                      :style="{
                        width: passwordStrength + '%',
                        background: strengthColor,
                      }"
                    ></div>
                  </div>
                  <span
                    class="strength-text"
                    :style="{ color: strengthColor }"
                    >{{ strengthText }}</span
                  >
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Confirmar nueva contraseña</label>
                <div
                  class="input-wrapper"
                  :class="{ focused: focus.confirmPassword }"
                >
                  <span class="input-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </span>
                  <input
                    v-model="passwordForm.confirm"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="form-input"
                    placeholder="Confirma tu nueva contraseña"
                    @focus="focus.confirmPassword = true"
                    @blur="focus.confirmPassword = false"
                  />
                  <button
                    type="button"
                    class="password-toggle"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <svg
                      v-if="!showConfirmPassword"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg
                      v-else
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                      />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="form-actions">
                <button
                  type="submit"
                  class="btn-primary"
                  :disabled="isChangingPassword"
                >
                  <span v-if="isChangingPassword" class="spinner"></span>
                  <svg
                    v-else
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  {{
                    isChangingPassword
                      ? 'Actualizando...'
                      : 'Actualizar contraseña'
                  }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="security-card">
          <div class="card-header">
            <div class="card-icon green">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div class="card-header-text">
              <h2 class="card-title">
                {{ auth.isAdmin ? 'Recuperación administrativa' : 'Recuperación de cuenta' }}
              </h2>
              <p class="card-subtitle">
                {{
                  auth.isAdmin
                    ? 'Mantén un correo vigente para recuperar acceso y recibir avisos operativos de esta cuenta.'
                    : 'Mantén un correo vigente para recuperar acceso y recibir avisos importantes.'
                }}
              </p>
            </div>
          </div>
          <div class="card-body">
            <div class="status-row">
              <span class="status-label">Correo de recuperación</span>
              <span class="status-value">{{ recoveryEmailLabel }}</span>
            </div>
            <div class="status-row">
              <span class="status-label">Disponibilidad</span>
              <span class="status-value">{{
                recoveryChannelCount ? 'Configurado' : 'Pendiente'
              }}</span>
            </div>
            <div class="recovery-note">
              <p>{{ supportMessage }}</p>
            </div>
            <button
              type="button"
              class="btn-outline"
              @click="router.push({ name: 'user-profile' })"
            >
              {{ auth.isAdmin ? 'Actualizar datos desde Cuenta admin' : 'Actualizar datos desde Mi perfil' }}
            </button>
          </div>
        </div>
      </div>

      <div class="right-column">
        <div v-if="auth.isAdmin" class="security-card admin-ops-card">
          <div class="card-header">
            <div class="card-icon purple">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path d="M12 3l7 4v5c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V7l7-4z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <div class="card-header-text">
              <h2 class="card-title">Resguardo admin</h2>
              <p class="card-subtitle">
                Un acceso más sobrio, enfocado en operación y recuperación manual.
              </p>
            </div>
          </div>
          <div class="card-body admin-ops-list">
            <div class="admin-ops-item">
              <strong>Uso interno</strong>
              <span>Esta vista no simula centro de seguridad, dispositivos o 2FA.</span>
            </div>
            <div class="admin-ops-item">
              <strong>Canal prioritario</strong>
              <span>El correo de recuperación es el punto principal para restablecer acceso.</span>
            </div>
            <div class="admin-ops-item">
              <strong>Flujo real pendiente</strong>
              <span>Los controles avanzados llegarán cuando Wave 2 conecte backend real.</span>
            </div>
          </div>
        </div>

        <div class="security-card">
          <div class="card-header">
            <div class="card-icon blue">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path d="M12 20h9" />
                <path
                  d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"
                />
              </svg>
            </div>
            <div class="card-header-text">
              <h2 class="card-title">
                {{ auth.isAdmin ? 'Checklist administrativo' : 'Recomendaciones de seguridad' }}
              </h2>
              <p class="card-subtitle">
                {{
                  auth.isAdmin
                    ? 'Acciones manuales y visibles para mantener esta cuenta administrativa al día.'
                    : 'Sugerencias visibles para mantener tu acceso al día.'
                }}
              </p>
            </div>
          </div>
          <div class="card-body">
            <div class="recommendations-list">
              <div
                v-for="item in recommendations"
                :key="item.key"
                class="recommendation-item"
                :class="{ completed: item.completed }"
              >
                <div class="rec-check">
                  <svg
                    v-if="item.completed"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.2"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <svg
                    v-else
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <div class="rec-info">
                  <span class="rec-title">{{ item.title }}</span>
                  <span class="rec-desc">{{ item.description }}</span>
                </div>
                <button
                  v-if="item.actionLabel"
                  type="button"
                  class="rec-action"
                  @click="item.action()"
                >
                  {{ item.actionLabel }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="security-card">
          <div class="card-header">
            <div class="card-icon orange">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <div class="card-header-text">
              <h2 class="card-title">Accesos rápidos</h2>
              <p class="card-subtitle">
                {{
                  auth.isAdmin
                    ? 'Atajos para revisar cuenta, panel y ayuda operativa.'
                    : 'Atajos para revisar perfil, citas o recibir ayuda.'
                }}
              </p>
            </div>
          </div>
          <div class="card-body quick-links">
            <button
              v-for="item in securityQuickLinks"
              :key="item.label"
              class="quick-link"
              type="button"
              @click="router.push(item.route)"
            >
              <div class="quick-link-text">
                <span class="quick-link-label">{{ item.label }}</span>
                <span class="quick-link-desc">{{ item.description }}</span>
              </div>
              <span class="quick-link-arrow">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="banner.visible" class="toast-notification" :class="banner.type">
      <span>{{ banner.message }}</span>
      <button class="toast-close" @click="banner.visible = false">×</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../../stores/auth.js';
import {
  getSecuritySettings,
  updatePassword,
} from '../../../services/account.js';

const router = useRouter();
const auth = useAuthStore();

const security = ref({
  passwordLastUpdatedAt: null,
  recoveryEmail: '',
  canChangePassword: true,
  supportMessage: '',
});

const focus = ref({
  currentPassword: false,
  newPassword: false,
  confirmPassword: false,
});

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordForm = ref({ current: '', new: '', confirm: '' });
const isChangingPassword = ref(false);
const banner = ref({ visible: false, type: 'success', message: '' });

const canChangePassword = computed(
  () => security.value.canChangePassword !== false
);
const recoveryEmailLabel = computed(
  () => security.value.recoveryEmail || 'No configurado'
);
const recoveryChannelCount = computed(() =>
  security.value.recoveryEmail ? 1 : 0
);
const lastPasswordDays = computed(() => {
  if (!security.value.passwordLastUpdatedAt) return '—';
  const diff =
    Date.now() - new Date(security.value.passwordLastUpdatedAt).getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
});
const supportMessage = computed(
  () =>
    security.value.supportMessage ||
    (auth.isAdmin
      ? 'Mantén este correo actualizado para recuperar el acceso administrativo cuando lo necesites.'
      : 'Mantén este correo actualizado para recuperar el acceso cuando lo necesites.')
);

const passwordStrength = computed(() => {
  const pwd = passwordForm.value.new;
  if (!pwd) return 0;
  let strength = 0;
  if (pwd.length >= 8) strength += 25;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength += 25;
  if (/[0-9]/.test(pwd)) strength += 25;
  if (/[^a-zA-Z0-9]/.test(pwd)) strength += 25;
  return strength;
});
const strengthText = computed(() => {
  if (passwordStrength.value < 25) return 'Muy débil';
  if (passwordStrength.value < 50) return 'Débil';
  if (passwordStrength.value < 75) return 'Media';
  return 'Fuerte';
});
const strengthColor = computed(() => {
  if (passwordStrength.value < 25) return '#ef4444';
  if (passwordStrength.value < 50) return '#f59e0b';
  if (passwordStrength.value < 75) return '#3b82f6';
  return '#10b981';
});

const goToPasswordCard = () => {
  const el = document.getElementById('password-card');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const securityQuickLinks = computed(() =>
  auth.isAdmin
    ? [
        {
          label: 'Ir a Cuenta admin',
          description: 'Editar datos internos y el canal de recuperación.',
          route: { name: 'user-profile' },
        },
        {
          label: 'Abrir dashboard admin',
          description: 'Volver al panel operativo principal.',
          route: { name: 'admin-dashboard' },
        },
        {
          label: 'Contactar soporte',
          description: 'Usa el canal de contacto si necesitas ayuda adicional.',
          route: { name: 'public-contact' },
        },
      ]
    : [
        {
          label: 'Ir a Mi perfil',
          description: 'Editar datos personales y el correo de recuperación.',
          route: { name: 'user-profile' },
        },
        {
          label: 'Ver mis citas',
          description: 'Revisar agenda y cambios relevantes de actividad.',
          route: { name: 'my-appointments' },
        },
        {
          label: 'Contactar soporte',
          description: 'Usa el canal de contacto si necesitas ayuda adicional.',
          route: { name: 'public-contact' },
        },
      ]
);

const recommendations = computed(() => {
  const items = [];

  if (lastPasswordDays.value !== '—') {
    items.push({
      key: 'password-cycle',
      title: auth.isAdmin
        ? 'Rotar contraseña administrativa'
        : 'Actualizar contraseña periódicamente',
      description:
        lastPasswordDays.value >= 90
          ? auth.isAdmin
            ? `Tu cuenta admin lleva ${lastPasswordDays.value} días sin rotación de contraseña.`
            : `Tu último cambio fue hace ${lastPasswordDays.value} días.`
          : auth.isAdmin
            ? `Última actualización hace ${lastPasswordDays.value} días.`
            : `Tu último cambio fue hace ${lastPasswordDays.value} días.`,
      completed: lastPasswordDays.value < 90,
      actionLabel: lastPasswordDays.value >= 90 ? 'Actualizar' : null,
      action: goToPasswordCard,
    });
  }

  items.push({
    key: 'recovery-email',
    title: auth.isAdmin
      ? 'Correo administrativo vigente'
      : 'Correo de recuperación vigente',
    description: recoveryChannelCount.value
      ? auth.isAdmin
        ? 'Ya cuentas con un correo disponible para recuperación y avisos operativos.'
        : 'Ya cuentas con un correo disponible para recuperación y avisos importantes.'
      : auth.isAdmin
        ? 'Agrega o confirma el correo administrativo desde tu perfil.'
        : 'Agrega un correo de recuperación desde tu perfil.',
    completed: !!recoveryChannelCount.value,
    actionLabel: recoveryChannelCount.value ? 'Perfil' : 'Configurar',
    action: () => router.push({ name: 'user-profile' }),
  });

  if (auth.isAdmin) {
    items.push({
      key: 'admin-scope',
      title: 'Validación fuerte pendiente de backend',
      description:
        'Esta vista mantiene controles manuales y evita promesas falsas de 2FA o gestión de dispositivos.',
      completed: true,
      actionLabel: 'Dashboard',
      action: () => router.push({ name: 'admin-dashboard' }),
    });
  }

  return items;
});

const showBanner = (message, type = 'success') => {
  banner.value = { visible: true, type, message };
  setTimeout(() => {
    banner.value.visible = false;
  }, 4000);
};

const loadSecurity = async () => {
  security.value = await getSecuritySettings();
};

const changePassword = async () => {
  if (
    !passwordForm.value.current ||
    !passwordForm.value.new ||
    !passwordForm.value.confirm
  ) {
    showBanner('Completa los tres campos para continuar.', 'error');
    return;
  }
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    showBanner('Las contraseñas nuevas no coinciden.', 'error');
    return;
  }
  if (passwordForm.value.new.length < 8) {
    showBanner(
      'La nueva contraseña debe tener al menos 8 caracteres.',
      'error'
    );
    return;
  }
  if (passwordStrength.value < 50) {
    showBanner('Elige una contraseña más robusta antes de guardar.', 'error');
    return;
  }

  isChangingPassword.value = true;
  const result = await updatePassword({
    current: passwordForm.value.current,
    next: passwordForm.value.new,
  });
  security.value.passwordLastUpdatedAt = result.changedAt;
  passwordForm.value = { current: '', new: '', confirm: '' };
  isChangingPassword.value = false;
  showBanner('Contraseña actualizada correctamente.');
};

onMounted(loadSecurity);
</script>

<style scoped src="./styles.css"></style>
