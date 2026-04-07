import { useAuthStore } from '../stores/auth';

export function registerRouterGuards(router) {
  router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    const requiresAuth = to.meta.requiresAuth;
    const requiresAdmin = to.meta.requiresAdmin;

    // Si la ruta requiere autenticación y el usuario no está autenticado
    if (requiresAuth && !auth.isAuthenticated) {
      next('/login');
    }
    // Si la ruta requiere ser admin y el usuario no es admin
    else if (requiresAdmin && !auth.isAdmin) {
      next('/');
    } else {
      next();
    }
  });
}
