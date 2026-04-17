import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

const DEV_SESSION_KEY = 'autosphere.devSession';
const IS_DEV = Boolean(import.meta.env?.DEV);

function canUseLocalStorage() {
  return typeof localStorage !== 'undefined';
}

function readPersistedSession() {
  if (!IS_DEV || !canUseLocalStorage()) return null;
  try {
    const raw = localStorage.getItem(DEV_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const useAuthStore = defineStore('auth', () => {
  const persisted = readPersistedSession();

  const isAuthenticated = ref(Boolean(persisted));
  const accessToken = ref(persisted?.token ?? null);
  const user = ref(persisted?.user ?? null);
  const roles = ref(Array.isArray(persisted?.roles) ? persisted.roles : []);

  const isGuest = computed(() => !isAuthenticated.value);
  const isAdmin = computed(() => roles.value.includes('admin'));
  const isUser = computed(() => isAuthenticated.value && !isAdmin.value);
  const primaryRole = computed(() => (isAdmin.value ? 'admin' : isUser.value ? 'user' : 'guest'));
  const capabilitySurfaces = computed(() =>
    isUser.value ? ['buyer', 'seller', 'lessor'] : isAdmin.value ? ['admin'] : []
  );
  const canListVehicles = computed(() => isUser.value);

  function persistSession() {
    if (!IS_DEV || !canUseLocalStorage()) return;
    if (!isAuthenticated.value) {
      localStorage.removeItem(DEV_SESSION_KEY);
      return;
    }
    localStorage.setItem(
      DEV_SESSION_KEY,
      JSON.stringify({
        token: accessToken.value,
        user: user.value,
        roles: roles.value,
      })
    );
  }

  function startSession({ nextUser = null, nextRoles = [], token = null } = {}) {
    isAuthenticated.value = true;
    accessToken.value = token;
    user.value = nextUser;
    roles.value = Array.isArray(nextRoles) ? nextRoles : [];
    persistSession();
  }

  function clearSession() {
    isAuthenticated.value = false;
    accessToken.value = null;
    user.value = null;
    roles.value = [];
    persistSession();
  }

  function setUser(nextUser) {
    user.value = nextUser;
    persistSession();
  }

  function setRoles(nextRoles = []) {
    roles.value = Array.isArray(nextRoles) ? nextRoles : [];
    persistSession();
  }

  function hasRole(role) {
    if (role === 'guest') return isGuest.value;
    if (role === 'user') return isUser.value;
    if (role === 'admin') return isAdmin.value;
    return capabilitySurfaces.value.includes(role);
  }

  function hasAnyRole(nextRoles = []) {
    return nextRoles.some((role) => hasRole(role));
  }

  return {
    isAuthenticated,
    accessToken,
    user,
    roles,
    isGuest,
    isUser,
    isAdmin,
    primaryRole,
    capabilitySurfaces,
    canListVehicles,
    startSession,
    clearSession,
    setUser,
    setRoles,
    hasRole,
    hasAnyRole,
  };
});
