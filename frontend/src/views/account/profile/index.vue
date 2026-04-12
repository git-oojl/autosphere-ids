<template>
  <div class="profile-page">
    <!-- ══════════════════════════════════
         HERO HEADER
    ══════════════════════════════════ -->
    <div class="profile-hero">
      <br /><br /><br />
      <div class="hero-bg-pattern"></div>

      <div class="hero-inner">
        <!-- Avatar -->
        <div class="avatar-wrapper">
          <div class="avatar-ring">
            <img
              v-if="profile.avatar"
              :src="profile.avatar"
              :alt="fullName"
              class="avatar-img"
            />
            <div v-else class="avatar-placeholder">
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
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
              />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </label>
        </div>

        <!-- Identity -->
        <div class="hero-identity">
          <div class="hero-name-row">
            <h1 class="hero-name">
              {{ profile.firstName }} {{ profile.lastName }}
            </h1>
            <span class="role-badge" :class="roleBadgeClass">
              {{ roleLabel }}
            </span>
          </div>
          <p class="hero-email">{{ profile.email }}</p>
          <p class="hero-meta">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Miembro desde {{ joinDate }}
          </p>
        </div>

        <!-- Quick stats -->
        <div class="hero-stats">
          <div v-for="stat in quickStats" :key="stat.label" class="hero-stat">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════
         STATUS BANNER
    ══════════════════════════════════ -->
    <transition name="banner">
      <div v-if="banner.visible" class="status-banner" :class="banner.type">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          class="banner-icon"
        >
          <path v-if="banner.type === 'success'" d="M20 6L9 17l-5-5" />
          <path v-else d="M12 8v4m0 4h.01" />
        </svg>
        <span>{{ banner.message }}</span>
        <button class="banner-close" @click="banner.visible = false">
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

    <!-- ══════════════════════════════════
         MAIN CONTENT GRID
    ══════════════════════════════════ -->
    <div class="content-grid">
      <!-- ─── LEFT: EDIT FORM ─────────────────── -->
      <div class="main-column">
        <!-- Información personal -->
        <div class="profile-card" :class="{ saving: isSaving }">
          <div class="card-header">
            <div class="card-header-left">
              <div class="card-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <h2 class="card-title">Información personal</h2>
                <p class="card-subtitle">
                  Así te verán otros usuarios en la plataforma.
                </p>
              </div>
            </div>
            <button
              class="btn-edit"
              :class="{ active: isEditing }"
              @click="toggleEdit"
            >
              <svg
                v-if="!isEditing"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                />
                <path
                  d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
              {{ isEditing ? 'Cancelar' : 'Editar' }}
            </button>
          </div>

          <div class="card-body">
            <!-- Row 1: nombre y apellido -->
            <div class="fields-row">
              <div class="field-group">
                <label class="field-label">Nombre</label>
                <div
                  class="input-wrapper"
                  :class="{
                    focused: focus.firstName,
                    'has-error': errors.firstName,
                    readonly: !isEditing,
                  }"
                >
                  <span class="input-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                    >
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
                    @blur="
                      focus.firstName = false;
                      validateField('firstName');
                    "
                  />
                </div>
                <p v-if="errors.firstName" class="field-error">
                  {{ errors.firstName }}
                </p>
              </div>

              <div class="field-group">
                <label class="field-label">Apellido</label>
                <div
                  class="input-wrapper"
                  :class="{
                    focused: focus.lastName,
                    'has-error': errors.lastName,
                    readonly: !isEditing,
                  }"
                >
                  <span class="input-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                    >
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
                    @blur="
                      focus.lastName = false;
                      validateField('lastName');
                    "
                  />
                </div>
                <p v-if="errors.lastName" class="field-error">
                  {{ errors.lastName }}
                </p>
              </div>
            </div>

            <!-- Row 2: email y teléfono -->
            <div class="fields-row">
              <div class="field-group">
                <label class="field-label">
                  Correo electrónico
                  <span class="verified-chip">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Verificado
                  </span>
                </label>
                <div
                  class="input-wrapper"
                  :class="{
                    focused: focus.email,
                    'has-error': errors.email,
                    readonly: !isEditing,
                  }"
                >
                  <span class="input-icon">
                    <svg
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
                  </span>
                  <input
                    v-model="form.email"
                    type="email"
                    class="field-input"
                    placeholder="correo@ejemplo.com"
                    :readonly="!isEditing"
                    @focus="focus.email = true"
                    @blur="
                      focus.email = false;
                      validateField('email');
                    "
                  />
                </div>
                <p v-if="errors.email" class="field-error">
                  {{ errors.email }}
                </p>
              </div>

              <div class="field-group">
                <label class="field-label">Teléfono</label>
                <div
                  class="input-wrapper"
                  :class="{ focused: focus.phone, readonly: !isEditing }"
                >
                  <span class="input-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                    >
                      <path
                        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                      />
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

            <!-- Row 3: ciudad y estado -->
            <div class="fields-row">
              <div class="field-group">
                <label class="field-label">Ciudad</label>
                <div
                  class="input-wrapper"
                  :class="{ focused: focus.city, readonly: !isEditing }"
                >
                  <span class="input-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                    >
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
                <div
                  class="input-wrapper"
                  :class="{ focused: focus.state, readonly: !isEditing }"
                >
                  <span class="input-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                    >
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
                    <option v-for="s in mexicanStates" :key="s" :value="s">
                      {{ s }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Bio -->
            <div class="field-group full-width">
              <label class="field-label">
                Biografía
                <span
                  class="char-count"
                  :class="{ warn: form.bio.length > 220 }"
                >
                  {{ form.bio.length }}/250
                </span>
              </label>
              <div
                class="textarea-wrapper"
                :class="{ focused: focus.bio, readonly: !isEditing }"
              >
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
              <button
                class="btn-secondary"
                :disabled="isSaving"
                @click="cancelEdit"
              >
                Descartar cambios
              </button>
              <button
                class="btn-primary"
                :disabled="isSaving || !hasChanges"
                @click="saveProfile"
              >
                <span v-if="isSaving" class="spinner"></span>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
                  />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                {{ isSaving ? 'Guardando…' : 'Guardar cambios' }}
              </button>
            </div>
          </transition>
        </div>

        <!-- Notificaciones -->
        <div class="profile-card">
          <div class="card-header">
            <div class="card-header-left">
              <div class="card-icon green">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
              </div>
              <div>
                <h2 class="card-title">Notificaciones</h2>
                <p class="card-subtitle">Elige cómo quieres recibir alertas.</p>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="toggle-list">
              <div
                v-for="notif in notifications"
                :key="notif.key"
                class="toggle-item"
              >
                <div class="toggle-info">
                  <span class="toggle-title">{{ notif.title }}</span>
                  <span class="toggle-desc">{{ notif.desc }}</span>
                </div>
                <button
                  class="toggle-switch"
                  :class="{ on: notif.enabled }"
                  @click="notif.enabled = !notif.enabled"
                >
                  <span class="toggle-thumb"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── RIGHT: SIDEBAR ──────────────────── -->
      <div class="side-column">
        <!-- Completitud -->
        <div class="side-card">
          <div class="side-card-header">
            <div class="card-icon amber">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
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
              <div
                class="completion-fill"
                :style="{ width: completionPct + '%' }"
              ></div>
            </div>
          </div>

          <ul class="completion-steps">
            <li
              v-for="step in completionSteps"
              :key="step.key"
              :class="{ done: step.done }"
            >
              <span class="step-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path v-if="step.done" d="M20 6L9 17l-5-5" />
                  <circle v-else cx="12" cy="12" r="5" />
                </svg>
              </span>
              {{ step.label }}
            </li>
          </ul>
        </div>

        <!-- Accesos rápidos -->
        <div class="side-card">
          <div class="side-card-header">
            <div class="card-icon blue">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path d="M12 3v18M3 12h18" />
              </svg>
            </div>
            <div>
              <h3 class="card-title sm">Accesos rápidos</h3>
              <p class="card-subtitle">Opciones disponibles según tu rol.</p>
            </div>
          </div>
          <div class="quick-links">
            <button
              v-for="item in menuItems"
              :key="item.label"
              class="quick-link"
              type="button"
              @click="navigate(item)"
            >
              <div class="quick-link-text">
                <span class="quick-link-label">{{ item.label }}</span>
                <span class="quick-link-desc">{{ item.description }}</span>
              </div>
              <span class="quick-link-arrow">›</span>
            </button>
          </div>
        </div>

        <!-- Cuenta -->
        <div class="side-card">
          <div class="side-card-header">
            <div class="card-icon blue">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
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
              <span class="account-label">Tipo de cuenta</span>
              <span class="account-value">{{ roleLabel }}</span>
            </div>
            <div class="account-row">
              <span class="account-label">Estado</span>
              <span class="status-chip active">
                <span class="chip-dot"></span>
                Activa
              </span>
            </div>
            <div class="account-row">
              <span class="account-label">Miembro desde</span>
              <span class="account-value">{{ joinDate }}</span>
            </div>
            <div class="account-row">
              <span class="account-label">Último acceso</span>
              <span class="account-value">Hoy, {{ lastLogin }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../../stores/auth.js';

const router = useRouter();
const auth = useAuthStore();

// ── Profile ───────────────────────────────────
const defaultProfile = {
  id: 'U-00421',
  firstName: 'Carlos',
  lastName: 'Méndez',
  email: 'carlos.mendez@email.com',
  phone: '+52 664 123 4567',
  city: 'Tijuana',
  state: 'Baja California',
  bio: 'Apasionado de los autos. Vendedor certificado con más de 3 años en AutoSphere.',
  avatar: 'https://i.pravatar.cc/200?img=25',
  role: 'seller',
  joinedAt: '2022-03-15',
};

const profile = reactive({
  ...defaultProfile,
  id: auth.user?.id ?? defaultProfile.id,
  email: auth.user?.email ?? defaultProfile.email,
  firstName: auth.user?.name
    ? auth.user.name.split(' ')[0]
    : defaultProfile.firstName,
  lastName: auth.user?.name
    ? auth.user.name.split(' ').slice(1).join(' ') || defaultProfile.lastName
    : defaultProfile.lastName,
  role: auth.primaryRole ?? defaultProfile.role,
});

const lastLogin = ref('');
onMounted(() => {
  lastLogin.value = new Date().toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  });
});

// ── Computed ──────────────────────────────────
const initials = computed(() =>
  `${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`.toUpperCase()
);

const roleLabel = computed(
  () =>
    ({
      admin: 'Administrador',
      seller: 'Vendedor',
      buyer: 'Comprador',
      lessor: 'Arrendador',
    })[profile.role] ?? 'Usuario'
);

const roleBadgeClass = computed(
  () =>
    ({
      admin: 'badge-admin',
      seller: 'badge-seller',
      buyer: 'badge-buyer',
      lessor: 'badge-landlord',
    })[profile.role] ?? ''
);

const fullName = computed(() =>
  [profile.firstName, profile.lastName].filter(Boolean).join(' ')
);

const joinDate = computed(() =>
  new Date(profile.joinedAt).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
);

const quickStats = [
  { value: '24', label: 'Anuncios' },
  { value: '1.8k', label: 'Visitas' },
  { value: '4.8★', label: 'Calificación' },
];

// ── Form ──────────────────────────────────────
const form = ref({ ...profile });
const originalForm = ref({ ...profile });
const focus = ref({});
const errors = ref({});
const isEditing = ref(false);
const isSaving = ref(false);

const hasChanges = computed(
  () => JSON.stringify(form.value) !== JSON.stringify(originalForm.value)
);

function toggleEdit() {
  isEditing.value ? cancelEdit() : (isEditing.value = true);
}

function cancelEdit() {
  form.value = { ...originalForm.value };
  errors.value = {};
  isEditing.value = false;
}

function validateField(field) {
  const e = { ...errors.value };
  if (field === 'firstName') {
    !form.value.firstName?.trim()
      ? (e.firstName = 'El nombre es requerido.')
      : delete e.firstName;
  }
  if (field === 'lastName') {
    !form.value.lastName?.trim()
      ? (e.lastName = 'El apellido es requerido.')
      : delete e.lastName;
  }
  if (field === 'email') {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.value.email?.trim()) e.email = 'El correo es requerido.';
    else if (!re.test(form.value.email)) e.email = 'Correo inválido.';
    else delete e.email;
  }
  errors.value = e;
}

async function saveProfile() {
  validateField('firstName');
  validateField('lastName');
  validateField('email');
  if (Object.keys(errors.value).length) return;
  isSaving.value = true;
  await new Promise((r) => setTimeout(r, 1600));
  Object.assign(profile, form.value);
  originalForm.value = { ...form.value };
  isSaving.value = false;
  isEditing.value = false;
  showBanner('success', 'Perfil actualizado correctamente.');
}

// ── Avatar ────────────────────────────────────
function handleAvatarChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    profile.avatar = ev.target.result;
  };
  reader.readAsDataURL(file);
}

// ── Notifications ─────────────────────────────
const notifications = ref([
  {
    key: 'messages',
    title: 'Nuevos mensajes',
    desc: 'Cuando alguien te escribe',
    enabled: true,
  },
  {
    key: 'appointments',
    title: 'Recordatorio de citas',
    desc: '24 horas antes de cada cita',
    enabled: true,
  },
  {
    key: 'views',
    title: 'Visitas a mis anuncios',
    desc: 'Cuando alguien ve tu publicación',
    enabled: false,
  },
  {
    key: 'offers',
    title: 'Nuevas ofertas',
    desc: 'Cuando hacen una oferta en tu auto',
    enabled: true,
  },
  {
    key: 'news',
    title: 'Novedades AutoSphere',
    desc: 'Tips, promociones y actualizaciones',
    enabled: false,
  },
]);

// ── Completion ────────────────────────────────
const completionSteps = computed(() => [
  {
    key: 'name',
    label: 'Nombre completo',
    done: !!(profile.firstName && profile.lastName),
  },
  { key: 'email', label: 'Correo verificado', done: !!profile.email },
  { key: 'phone', label: 'Teléfono agregado', done: !!profile.phone },
  { key: 'avatar', label: 'Foto de perfil', done: !!profile.avatar },
  { key: 'bio', label: 'Biografía escrita', done: !!profile.bio },
  {
    key: 'city',
    label: 'Ubicación definida',
    done: !!(profile.city && profile.state),
  },
]);

const completionPct = computed(() =>
  Math.round(
    (completionSteps.value.filter((s) => s.done).length /
      completionSteps.value.length) *
      100
  )
);

// ── Banner ────────────────────────────────────
const banner = ref({ visible: false, type: 'success', message: '' });
function showBanner(type, message) {
  banner.value = { visible: true, type, message };
  setTimeout(() => {
    banner.value.visible = false;
  }, 5000);
}

function navigate(item) {
  if (!item?.route) return;
  router.push(item.route);
}

const menuItems = computed(() => {
  if (auth.hasRole('admin')) {
    return [
      {
        label: 'Moderación',
        description: 'Revisar contenido reportado y casos pendientes.',
        route: { name: 'admin-moderation' },
      },
      {
        label: 'Usuarios',
        description: 'Gestionar cuentas y permisos de usuarios.',
        route: { name: 'admin-users' },
      },
      {
        label: 'Reportes',
        description: 'Ver denuncias, métricas y seguimiento.',
        route: { name: 'admin-reports' },
      },
    ];
  }

  if (auth.hasRole('seller')) {
    return [
      {
        label: 'Citas',
        description: 'Ver y administrar tus citas.',
        route: { name: 'seller-appointments' },
      },
      {
        label: 'Publicaciones',
        description: 'Revisar tus anuncios publicados.',
        route: { name: 'seller-listings' },
      },
      {
        label: 'Publicar anuncio nuevo',
        description: 'Crear un nuevo anuncio para vender.',
        route: { name: 'seller-create-listing' },
      },
    ];
  }

  if (auth.hasRole('buyer')) {
    return [
      {
        label: 'Citas',
        description: 'Ver y administrar tus citas.',
        route: { name: 'buyer-appointments' },
      },
      {
        label: 'Guardados',
        description: 'Ver tus vehículos guardados.',
        route: { name: 'buyer-saved-vehicles' },
      },
      {
        label: 'Historial',
        description: 'Revisar tus búsquedas recientes.',
        route: { name: 'buyer-search-history' },
      },
    ];
  }

  if (auth.hasRole('lessor')) {
    return [
      {
        label: 'Rentas',
        description: 'Ver tus rentas activas.',
        route: { name: 'lessor-rentals' },
      },
      {
        label: 'Registrar renta',
        description: 'Agregar una nueva renta.',
        route: { name: 'lessor-register-rental' },
      },
    ];
  }

  return [
    {
      label: 'Inicio',
      description: 'Volver al panel principal.',
      route: { name: 'public-home' },
    },
  ];
});

// ── States data ───────────────────────────────
const mexicanStates = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas',
];
</script>

<style scoped src="./styles.css"></style>
