import { useAuthStore } from '../stores/auth.js';

export function requiresAuth(to) {
  return Boolean(to.meta?.requiresAuth);
}

export function requiresGuest(to) {
  return Boolean(to.meta?.requiresGuest);
}

export function hasRequiredRole(to, authStore) {
  const allowedRoles = to.meta?.roles || [];

  if (allowedRoles.length === 0) {
    return true;
  }

  return authStore.hasAnyRole(allowedRoles);
}

export function registerRouterGuards(router) {
  router.beforeEach((to) => {
    const authStore = useAuthStore();

    if (requiresGuest(to) && authStore.isAuthenticated) {
      return { name: 'account-profile' };
    }

    if (requiresAuth(to) && !authStore.isAuthenticated) {
      return {
        name: 'auth-login',
        query: { redirect: to.fullPath },
      };
    }

    if (requiresAuth(to) && !hasRequiredRole(to, authStore)) {
      return { name: 'utility-forbidden' };
    }

    return true;
  });
}
