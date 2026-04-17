<template>
  <div class="profile-page">
    <div class="profile-hero">
      <br /><br /><br />
      <div class="hero-bg-pattern"></div>

      <div class="hero-inner">
        <div class="avatar-block">
          <div class="avatar-wrapper">
            <div class="avatar-ring">
              <img
                v-if="displayAvatarUrl"
                :src="displayAvatarUrl"
                :alt="fullName"
                class="avatar-img"
              />
              <div v-else class="avatar-placeholder avatar-theme" :class="`theme-${displayAvatarPreset}`">
                {{ initials }}
              </div>
            </div>

            <label class="avatar-upload-btn" title="Cambiar foto">
              <input
                type="file"
                accept="image/*"
                class="hidden-input"
                @change="handleAvatarChange"
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
                />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </label>
          </div>

          <div class="avatar-presets" v-if="isEditing">
            <button
              v-for="option in avatarOptions"
              :key="option.key"
              type="button"
              class="avatar-preset"
              :class="[{ active: displayAvatarPreset === option.key && !displayAvatarUrl }, `theme-${option.key}`]"
              :title="option.label"
              @click="applyAvatarPreset(option.key)"
            >
              {{ initials }}
            </button>
          </div>
          <button
            v-if="isEditing && displayAvatarUrl"
            type="button"
            class="avatar-reset"
            @click="clearCustomAvatar"
          >
            Usar avatar base
          </button>
          <p v-if="isEditing" class="avatar-help">
            Puedes subir una foto o elegir uno de los estilos base para la cuenta.
          </p>
        </div>

        <div class="hero-identity">
          <div class="hero-name-row">
            <h1 class="hero-name">{{ fullName }}</h1>
            <span class="role-badge" :class="roleBadgeClass">{{ roleLabel }}</span>
          </div>
          <p class="hero-email">{{ form.email }}</p>
          <p class="hero-meta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Miembro desde {{ joinDate }}
          </p>
          <div class="surface-chips">
            <span v-for="surface in capabilityLabels" :key="surface" class="surface-chip">
              {{ surface }}
            </span>
          </div>
        </div>

        <div class="hero-stats">
          <div v-for="stat in quickStats" :key="stat.label" class="hero-stat">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <transition name="banner">
      <div v-if="banner.visible" class="status-banner" :class="banner.type">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="banner-icon">
          <path v-if="banner.type === 'success'" d="M20 6L9 17l-5-5" />
          <path v-else d="M12 8v4m0 4h.01" />
        </svg>
        <span>{{ banner.message }}</span>
        <button class="banner-close" @click="banner.visible = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition>

    <div class="content-grid">
      <div class="main-column">
        <div class="profile-card" :class="{ saving: isSaving }">
          <div class="card-header">
            <div class="card-header-left">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <h2 class="card-title">Información personal</h2>
                <p class="card-subtitle">Así te verán otros usuarios en la plataforma.</p>
              </div>
            </div>
            <div class="card-actions">
              <button class="btn-ghost" type="button" @click="navigate({ name: 'user-security' })">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>
                Seguridad
              </button>
              <button class="btn-edit" :class="{ active: isEditing }" @click="toggleEdit">
                <svg v-if="!isEditing" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                {{ isEditing ? 'Cancelar' : 'Editar' }}
              </button>
            </div>
          </div>

          <div class="card-body">
            <div class="fields-row">
              <div class="field-group">
                <label class="field-label">Nombre</label>
                <div class="input-wrapper" :class="{ focused: focus.firstName, 'has-error': errors.firstName, readonly: !isEditing }">
                  <span class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    v-model="form.firstName"
                    type="text"
                    class="field-input"
                    placeholder="Tu nombre"
                    :readonly="!isEditing"
                    @focus="focus.firstName = true"
                    @blur="focus.firstName = false; validateField('firstName')"
                  />
                </div>
                <p v-if="errors.firstName" class="field-error">{{ errors.firstName }}</p>
              </div>

              <div class="field-group">
                <label class="field-label">Apellido</label>
                <div class="input-wrapper" :class="{ focused: focus.lastName, 'has-error': errors.lastName, readonly: !isEditing }">
                  <span class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    v-model="form.lastName"
                    type="text"
                    class="field-input"
                    placeholder="Tu apellido"
                    :readonly="!isEditing"
                    @focus="focus.lastName = true"
                    @blur="focus.lastName = false; validateField('lastName')"
                  />
                </div>
                <p v-if="errors.lastName" class="field-error">{{ errors.lastName }}</p>
              </div>
            </div>

            <div class="fields-row">
              <div class="field-group">
                <label class="field-label">
                  Correo electrónico
                  <span class="verified-chip" v-if="form.email">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Principal
                  </span>
                </label>
                <div class="input-wrapper" :class="{ focused: focus.email, 'has-error': errors.email, readonly: !isEditing }">
                  <span class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <input
                    v-model="form.email"
                    type="email"
                    class="field-input"
                    placeholder="correo@ejemplo.com"
                    :readonly="!isEditing"
                    @focus="focus.email = true"
                    @blur="focus.email = false; validateField('email')"
                  />
                </div>
                <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
              </div>

              <div class="field-group">
                <label class="field-label">Teléfono</label>
                <div class="input-wrapper" :class="{ focused: focus.phone, readonly: !isEditing }">
                  <span class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </span>
                  <input
                    v-model="form.phone"
                    type="tel"
                    class="field-input"
                    placeholder="+52 664 000 0000"
                    :readonly="!isEditing"
                    @focus="focus.phone = true"
                    @blur="focus.phone = false"
                  />
                </div>
              </div>
            </div>

            <div class="fields-row">
              <div class="field-group">
                <label class="field-label">Ciudad</label>
                <div class="input-wrapper" :class="{ focused: focus.city, readonly: !isEditing }">
                  <span class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <input
                    v-model="form.city"
                    type="text"
                    class="field-input"
                    placeholder="Tu ciudad"
                    :readonly="!isEditing"
                    @focus="focus.city = true"
                    @blur="focus.city = false"
                  />
                </div>
              </div>

              <div class="field-group">
                <label class="field-label">Estado</label>
                <div class="input-wrapper" :class="{ focused: focus.state, readonly: !isEditing }">
                  <span class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                  </span>
                  <select
                    v-model="form.state"
                    class="field-input field-select"
                    :disabled="!isEditing"
                    @focus="focus.state = true"
                    @blur="focus.state = false"
                  >
                    <option value="">Selecciona estado</option>
                    <option v-for="state in mexicanStates" :key="state" :value="state">{{ state }}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field-group full-width">
              <label class="field-label">
                Biografía
                <span class="char-count" :class="{ warn: form.bio.length > 220 }">{{ form.bio.length }}/250</span>
              </label>
              <div class="textarea-wrapper" :class="{ focused: focus.bio, readonly: !isEditing }">
                <textarea
                  v-model="form.bio"
                  class="field-textarea"
                  placeholder="Cuéntanos un poco sobre ti…"
                  :readonly="!isEditing"
                  rows="3"
                  maxlength="250"
                  @focus="focus.bio = true"
                  @blur="focus.bio = false"
                ></textarea>
              </div>
            </div>
          </div>

          <transition name="slide-up">
            <div v-if="isEditing" class="card-footer">
              <button class="btn-secondary" :disabled="isSaving" @click="cancelEdit">Descartar cambios</button>
              <button class="btn-primary" :disabled="isSaving || !hasChanges" @click="saveProfile">
                <span v-if="isSaving" class="spinner"></span>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                {{ isSaving ? 'Guardando…' : 'Guardar cambios' }}
              </button>
            </div>
          </transition>
        </div>

        <div class="profile-card">
          <div class="card-header">
            <div class="card-header-left">
              <div class="card-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
              </div>
              <div>
                <h2 class="card-title">Notificaciones</h2>
                <p class="card-subtitle">Preferencias básicas de comunicación para citas y actividad.</p>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="toggle-list">
              <div v-for="notif in notifications" :key="notif.key" class="toggle-item">
                <div class="toggle-info">
                  <span class="toggle-title">{{ notif.title }}</span>
                  <span class="toggle-desc">{{ notif.desc }}</span>
                </div>
                <button class="toggle-switch" :class="{ on: notif.enabled }" @click="notif.enabled = !notif.enabled">
                  <span class="toggle-thumb"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="side-column">
        <div class="side-card">
          <div class="side-card-header">
            <div class="card-icon amber">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div>
              <h3 class="card-title sm">Perfil completado</h3>
              <p class="card-subtitle">{{ completionPct }}% completo</p>
            </div>
          </div>

          <div class="completion-bar-wrap">
            <div class="completion-track">
              <div class="completion-fill" :style="{ width: completionPct + '%' }"></div>
            </div>
          </div>

          <ul class="completion-steps">
            <li v-for="step in completionSteps" :key="step.key" :class="{ done: step.done }">
              <span class="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path v-if="step.done" d="M20 6L9 17l-5-5" />
                  <circle v-else cx="12" cy="12" r="5" />
                </svg>
              </span>
              {{ step.label }}
            </li>
          </ul>
        </div>

        <div class="side-card">
          <div class="side-card-header">
            <div class="card-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M12 3v18M3 12h18" />
              </svg>
            </div>
            <div>
              <h3 class="card-title sm">Accesos rápidos</h3>
              <p class="card-subtitle">Superficies disponibles para esta cuenta.</p>
            </div>
          </div>
          <div class="quick-links">
            <button v-for="item in menuItems" :key="item.label" class="quick-link" type="button" @click="navigate(item.route)">
              <div class="quick-link-text">
                <span class="quick-link-label">{{ item.label }}</span>
                <span class="quick-link-desc">{{ item.description }}</span>
              </div>
              <span class="quick-link-arrow">›</span>
            </button>
          </div>
        </div>

        <div class="side-card">
          <div class="side-card-header">
            <div class="card-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
              </svg>
            </div>
            <h3 class="card-title sm">Información de cuenta</h3>
          </div>
          <div class="account-rows">
            <div class="account-row">
              <span class="account-label">ID de usuario</span>
              <span class="account-value mono">{{ profile.id }}</span>
            </div>
            <div class="account-row">
              <span class="account-label">Modelo de acceso</span>
              <span class="account-value">{{ authModelLabel }}</span>
            </div>
            <div class="account-row">
              <span class="account-label">Estado</span>
              <span class="status-chip active">
                <span class="chip-dot"></span>
                Activa
              </span>
            </div>
            <div class="account-row">
              <span class="account-label">Capacidades</span>
              <span class="account-value">{{ capabilityLabels.join(' · ') }}</span>
            </div>
            <div class="account-row">
              <span class="account-label">Miembro desde</span>
              <span class="account-value">{{ joinDate }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getProfile, updateProfile } from '../../../services/account.js';
import { useAuthStore } from '../../../stores/auth.js';

const router = useRouter();
const auth = useAuthStore();

const STATE_ALIASES = {
  CDMX: 'Ciudad de México',
  'Ciudad de Mexico': 'Ciudad de México',
};

const avatarOptions = [
  { key: 'aurora', label: 'Aurora' },
  { key: 'mar', label: 'Mar' },
  { key: 'grafito', label: 'Grafito' },
  { key: 'arena', label: 'Arena' },
];

const profile = reactive({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  state: '',
  bio: '',
  avatarUrl: null,
  avatarPreset: 'aurora',
  memberSince: '',
});

const form = ref({ ...profile });
const originalForm = ref({ ...profile });
const focus = ref({});
const errors = ref({});
const isEditing = ref(false);
const isSaving = ref(false);
const banner = ref({ visible: false, type: 'success', message: '' });

const notifications = ref([
  { key: 'appointments', title: 'Citas', desc: 'Recordatorios y cambios de estado.', enabled: true },
  { key: 'listingActivity', title: 'Actividad de publicaciones', desc: 'Consultas y visitas relevantes.', enabled: true },
  { key: 'marketing', title: 'Novedades AutoSphere', desc: 'Comunicaciones generales de producto.', enabled: false },
]);

const mexicanStates = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas',
];

const normalizeState = (value = '') => STATE_ALIASES[value] || value;

const fillFromSeed = (seed = {}) => {
  const nameParts = (seed.name || auth.user?.name || '').trim().split(' ').filter(Boolean);
  profile.id = seed.id || auth.user?.id || 'user-autosphere';
  profile.firstName = seed.firstName || nameParts[0] || 'Usuario';
  profile.lastName = seed.lastName || nameParts.slice(1).join(' ') || '';
  profile.email = seed.email || auth.user?.email || '';
  profile.phone = seed.phone || auth.user?.phone || '';
  profile.city = seed.city || '';
  profile.state = normalizeState(seed.state || '');
  profile.bio = seed.bio || '';
  profile.avatarUrl = seed.avatarUrl || null;
  profile.avatarPreset = seed.avatarPreset || 'aurora';
  profile.memberSince = seed.memberSince || new Date().toISOString().slice(0, 10);
  form.value = { ...profile };
  originalForm.value = { ...profile };
};

const loadProfile = async () => {
  const seed = await getProfile();
  fillFromSeed(seed);
};

onMounted(loadProfile);

const initials = computed(() => `${form.value.firstName?.[0] || ''}${form.value.lastName?.[0] || ''}`.toUpperCase() || 'AU');
const fullName = computed(() => [form.value.firstName, form.value.lastName].filter(Boolean).join(' '));
const displayAvatarUrl = computed(() => form.value.avatarUrl || '');
const displayAvatarPreset = computed(() => form.value.avatarPreset || 'aurora');
const roleLabel = computed(() => (auth.isAdmin ? 'Administrador' : 'Usuario autenticado'));
const roleBadgeClass = computed(() => (auth.isAdmin ? 'badge-admin' : 'badge-buyer'));
const authModelLabel = computed(() => (auth.isAdmin ? 'Admin' : auth.isAuthenticated ? 'Usuario autenticado' : 'Invitado'));
const capabilityLabels = computed(() => {
  if (auth.isAdmin) return ['Administración'];
  const labels = [];
  if (auth.hasRole('buyer')) labels.push('Comprador');
  if (auth.hasRole('seller')) labels.push('Vendedor');
  if (auth.hasRole('lessor')) labels.push('Arrendador');
  return labels.length ? labels : ['Cuenta'];
});
const joinDate = computed(() =>
  new Date(profile.memberSince).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
);
const hasChanges = computed(() => JSON.stringify(form.value) !== JSON.stringify(originalForm.value));

const completionSteps = computed(() => [
  { key: 'name', label: 'Nombre completo', done: !!(form.value.firstName && form.value.lastName) },
  { key: 'email', label: 'Correo principal', done: !!form.value.email },
  { key: 'phone', label: 'Teléfono agregado', done: !!form.value.phone },
  { key: 'avatar', label: 'Avatar configurado', done: !!(form.value.avatarUrl || form.value.avatarPreset) },
  { key: 'bio', label: 'Biografía escrita', done: !!form.value.bio },
  { key: 'location', label: 'Ubicación definida', done: !!(form.value.city && form.value.state) },
]);
const completionPct = computed(() => Math.round((completionSteps.value.filter((step) => step.done).length / completionSteps.value.length) * 100));
const quickStats = computed(() => [
  { value: capabilityLabels.value.length, label: 'Superficies activas' },
  { value: `${completionPct.value}%`, label: 'Perfil completo' },
  { value: new Date(profile.memberSince).getFullYear(), label: 'Miembro desde' },
]);

const menuItems = computed(() => {
  if (auth.isAdmin) {
    return [
      { label: 'Dashboard admin', description: 'Ir al panel administrativo.', route: { name: 'admin-dashboard' } },
      { label: 'Usuarios', description: 'Gestionar cuentas y permisos.', route: { name: 'admin-users' } },
      { label: 'Citas', description: 'Supervisar la agenda global.', route: { name: 'admin-appointments' } },
    ];
  }

  const items = [
    { label: 'Dashboard', description: 'Volver al panel principal.', route: { name: 'user-dashboard' } },
    { label: 'Mis citas', description: 'Ver agenda y detalle de citas.', route: { name: 'my-appointments' } },
    { label: 'Mis publicaciones', description: 'Gestionar anuncios y detalle interno.', route: { name: 'user-listings' } },
    { label: 'Vehículos guardados', description: 'Abrir tu lista de favoritos.', route: { name: 'buyer-saved-vehicles' } },
    { label: 'Historial de búsqueda', description: 'Repetir búsquedas recientes.', route: { name: 'buyer-search-history' } },
    { label: 'Mis rentas', description: 'Revisar inventario en renta.', route: { name: 'user-rentals' } },
    { label: 'Seguridad', description: 'Administrar contraseña y recuperación.', route: { name: 'user-security' } },
  ];

  return items.filter((item) => {
    if (item.route.name === 'user-rentals') return auth.hasRole('lessor');
    if (['buyer-saved-vehicles', 'buyer-search-history'].includes(item.route.name)) return auth.hasRole('buyer');
    if (item.route.name === 'user-listings') return auth.hasRole('seller') || auth.hasRole('lessor');
    return true;
  });
});

const navigate = (route) => router.push(route);
const toggleEdit = () => {
  if (isEditing.value) {
    cancelEdit();
    return;
  }
  isEditing.value = true;
};
const cancelEdit = () => {
  form.value = { ...originalForm.value };
  errors.value = {};
  isEditing.value = false;
};

const validateField = (field) => {
  const nextErrors = { ...errors.value };

  if (field === 'firstName') {
    if (!form.value.firstName?.trim()) nextErrors.firstName = 'El nombre es requerido.';
    else delete nextErrors.firstName;
  }

  if (field === 'lastName') {
    if (!form.value.lastName?.trim()) nextErrors.lastName = 'El apellido es requerido.';
    else delete nextErrors.lastName;
  }

  if (field === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.value.email?.trim()) nextErrors.email = 'El correo es requerido.';
    else if (!emailRegex.test(form.value.email)) nextErrors.email = 'Correo inválido.';
    else delete nextErrors.email;
  }

  errors.value = nextErrors;
};

const showBanner = (type, message) => {
  banner.value = { visible: true, type, message };
  setTimeout(() => {
    banner.value.visible = false;
  }, 5000);
};

const saveProfile = async () => {
  validateField('firstName');
  validateField('lastName');
  validateField('email');

  if (Object.keys(errors.value).length) return;

  isSaving.value = true;

  try {
    const payload = {
      ...form.value,
      state: normalizeState(form.value.state),
      name: [form.value.firstName, form.value.lastName].filter(Boolean).join(' '),
      memberSince: profile.memberSince,
    };

    const saved = await updateProfile(payload);
    fillFromSeed(saved);
    isEditing.value = false;
    showBanner('success', 'Perfil actualizado correctamente.');
  } catch (error) {
    showBanner('error', 'No se pudo actualizar el perfil.');
  } finally {
    isSaving.value = false;
  }
};

const handleAvatarChange = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (readerEvent) => {
    form.value.avatarUrl = readerEvent.target?.result;
  };
  reader.readAsDataURL(file);
};

const applyAvatarPreset = (presetKey) => {
  form.value.avatarPreset = presetKey;
  form.value.avatarUrl = null;
};

const clearCustomAvatar = () => {
  form.value.avatarUrl = null;
};
</script>

<style scoped src="./styles.css"></style>
