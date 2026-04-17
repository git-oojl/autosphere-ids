import { useAuthStore } from '../stores/auth';

export function registerRouterGuards(router) {
  router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    const requiresAuth = to.matched.some((record) => record.meta?.requiresAuth);
    const requiresGuest = to.matched.some(
      (record) => record.meta?.requiresGuest
    );
    const roleRequirements = to.matched
      .flatMap((record) => record.meta?.roles || [])
      .filter(Boolean);

    if (requiresGuest && auth.isAuthenticated) {
      next({ name: auth.isAdmin ? 'admin-dashboard' : 'user-dashboard' });
      return;
    }

    if (requiresAuth && !auth.isAuthenticated) {
      next({ name: 'auth-login', query: { redirect: to.fullPath } });
      return;
    }

    if (roleRequirements.length > 0 && !auth.hasAnyRole(roleRequirements)) {
      next({ name: 'utility-forbidden' });
      return;
    }

    next();
  });
}
