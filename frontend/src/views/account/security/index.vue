<template>
  <div class="security-page">
    <br /><br /><br /><br /><br />

    <div class="page-header">
      <div class="header-container">
        <div class="header-left">
          <div>
            <h1 class="page-title">Seguridad</h1>
            <p class="page-subtitle">
              Gestiona tu acceso y mantén actualizado tu canal de recuperación.
            </p>
          </div>
        </div>

        <div class="header-actions">
          <button type="button" class="btn-secondary" @click="router.push({ name: 'user-profile' })">
            Mi perfil
          </button>
        </div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" />
            <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ canChangePassword ? 'Sí' : 'No' }}</span>
          <span class="stat-title">Cambio de contraseña disponible</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon green">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" />
            <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ recoveryChannelCount }}</span>
          <span class="stat-title">Método de recuperación configurado</span>
          <span class="stat-meta">{{ recoveryEmailLabel }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon purple">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16v16H4V4z" stroke="currentColor" stroke-width="2" />
            <path d="M8 8h8M8 12h6M8 16h4" stroke="currentColor" stroke-width="2" />
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
            <path d="M12 2a10 10 0 1010 10 10 10 0 00-10-10z" stroke="currentColor" stroke-width="2" />
            <path d="M12 6v4M12 14h.01" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ recommendations.length }}</span>
          <span class="stat-title">Recomendaciones activas</span>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <div class="left-column">
        <div class="security-card" id="password-card">
          <div class="card-header">
            <div class="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <div class="card-header-text">
              <h2 class="card-title">Cambiar contraseña</h2>
              <p class="card-subtitle">
                Actualiza tu contraseña y refuerza el acceso principal a tu cuenta.
              </p>
            </div>
          </div>
          <div class="card-body">
            <form @submit.prevent="changePassword">
              <div class="form-group">
                <label class="form-label">Contraseña actual</label>
                <div class="input-wrapper" :class="{ focused: focus.currentPassword }">
                  <span class="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
                  <button type="button" class="password-toggle" @click="showCurrentPassword = !showCurrentPassword">
                    <svg v-if="!showCurrentPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Nueva contraseña</label>
                <div class="input-wrapper" :class="{ focused: focus.newPassword }">
                  <span class="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
                  <button type="button" class="password-toggle" @click="showNewPassword = !showNewPassword">
                    <svg v-if="!showNewPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
                <div v-if="passwordForm.new" class="password-strength">
                  <div class="strength-bar">
                    <div class="strength-fill" :style="{ width: passwordStrength + '%', background: strengthColor }"></div>
                  </div>
                  <span class="strength-text" :style="{ color: strengthColor }">{{ strengthText }}</span>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Confirmar nueva contraseña</label>
                <div class="input-wrapper" :class="{ focused: focus.confirmPassword }">
                  <span class="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
                  <button type="button" class="password-toggle" @click="showConfirmPassword = !showConfirmPassword">
                    <svg v-if="!showConfirmPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn-primary" :disabled="isChangingPassword">
                  <span v-if="isChangingPassword" class="spinner"></span>
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  {{ isChangingPassword ? 'Actualizando...' : 'Actualizar contraseña' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="security-card">
          <div class="card-header">
            <div class="card-icon green">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div class="card-header-text">
              <h2 class="card-title">Recuperación de cuenta</h2>
              <p class="card-subtitle">
                Mantén un correo vigente para recuperar acceso y recibir avisos importantes.
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
              <span class="status-value">{{ recoveryChannelCount ? 'Configurado' : 'Pendiente' }}</span>
            </div>
            <div class="recovery-note">
              <p>{{ supportMessage }}</p>
            </div>
            <button type="button" class="btn-outline" @click="router.push({ name: 'user-profile' })">
              Actualizar datos desde Mi perfil
            </button>
          </div>
        </div>
      </div>

      <div class="right-column">
        <div class="security-card">
          <div class="card-header">
            <div class="card-icon blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            </div>
            <div class="card-header-text">
              <h2 class="card-title">Recomendaciones de seguridad</h2>
              <p class="card-subtitle">Sugerencias visibles para mantener tu acceso al día.</p>
            </div>
          </div>
          <div class="card-body">
            <div class="recommendations-list">
              <div v-for="item in recommendations" :key="item.key" class="recommendation-item" :class="{ completed: item.completed }">
                <div class="rec-check">
                  <svg v-if="item.completed" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <div class="rec-info">
                  <span class="rec-title">{{ item.title }}</span>
                  <span class="rec-desc">{{ item.description }}</span>
                </div>
                <button v-if="item.actionLabel" type="button" class="rec-action" @click="item.action()">
                  {{ item.actionLabel }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="security-card">
          <div class="card-header">
            <div class="card-icon orange">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <div class="card-header-text">
              <h2 class="card-title">Accesos rápidos</h2>
              <p class="card-subtitle">Atajos para revisar perfil, citas o recibir ayuda.</p>
            </div>
          </div>
          <div class="card-body quick-links">
            <button class="quick-link" type="button" @click="router.push({ name: 'user-profile' })">
              <div class="quick-link-text">
                <span class="quick-link-label">Ir a Mi perfil</span>
                <span class="quick-link-desc">Editar datos personales y el correo de recuperación.</span>
              </div>
              <span class="quick-link-arrow">›</span>
            </button>
            <button class="quick-link" type="button" @click="router.push({ name: 'my-appointments' })">
              <div class="quick-link-text">
                <span class="quick-link-label">Ver mis citas</span>
                <span class="quick-link-desc">Revisar agenda y cambios relevantes de actividad.</span>
              </div>
              <span class="quick-link-arrow">›</span>
            </button>
            <button class="quick-link" type="button" @click="router.push({ name: 'public-contact' })">
              <div class="quick-link-text">
                <span class="quick-link-label">Contactar soporte</span>
                <span class="quick-link-desc">Usa el canal de contacto si necesitas ayuda adicional.</span>
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
import { getSecuritySettings, updatePassword } from '../../../services/account.js';

const router = useRouter();

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

const canChangePassword = computed(() => security.value.canChangePassword !== false);
const recoveryEmailLabel = computed(() => security.value.recoveryEmail || 'No configurado');
const recoveryChannelCount = computed(() => (security.value.recoveryEmail ? 1 : 0));
const lastPasswordDays = computed(() => {
  if (!security.value.passwordLastUpdatedAt) return '—';
  const diff = Date.now() - new Date(security.value.passwordLastUpdatedAt).getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
});
const supportMessage = computed(
  () => security.value.supportMessage || 'Mantén este correo actualizado para recuperar el acceso cuando lo necesites.',
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

const recommendations = computed(() => {
  const items = [];

  if (lastPasswordDays.value !== '—') {
    items.push({
      key: 'password-cycle',
      title: 'Actualizar contraseña periódicamente',
      description:
        lastPasswordDays.value >= 90
          ? `Tu último cambio fue hace ${lastPasswordDays.value} días.`
          : `Tu último cambio fue hace ${lastPasswordDays.value} días.`,
      completed: lastPasswordDays.value < 90,
      actionLabel: lastPasswordDays.value >= 90 ? 'Actualizar' : null,
      action: goToPasswordCard,
    });
  }

  items.push({
    key: 'recovery-email',
    title: 'Correo de recuperación vigente',
    description: recoveryChannelCount.value
      ? 'Ya cuentas con un correo disponible para recuperación y avisos importantes.'
      : 'Agrega un correo de recuperación desde tu perfil.',
    completed: !!recoveryChannelCount.value,
    actionLabel: recoveryChannelCount.value ? 'Perfil' : 'Configurar',
    action: () => router.push({ name: 'user-profile' }),
  });

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
  if (!passwordForm.value.current || !passwordForm.value.new || !passwordForm.value.confirm) {
    showBanner('Completa los tres campos para continuar.', 'error');
    return;
  }
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    showBanner('Las contraseñas nuevas no coinciden.', 'error');
    return;
  }
  if (passwordForm.value.new.length < 8) {
    showBanner('La nueva contraseña debe tener al menos 8 caracteres.', 'error');
    return;
  }
  if (passwordStrength.value < 50) {
    showBanner('Elige una contraseña más robusta antes de guardar.', 'error');
    return;
  }

  isChangingPassword.value = true;
  const result = await updatePassword({ current: passwordForm.value.current, next: passwordForm.value.new });
  security.value.passwordLastUpdatedAt = result.changedAt;
  passwordForm.value = { current: '', new: '', confirm: '' };
  isChangingPassword.value = false;
  showBanner('Contraseña actualizada correctamente.');
};

onMounted(loadSecurity);
</script>

<style scoped src="./styles.css"></style>
