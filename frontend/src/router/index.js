import { createRouter, createWebHistory } from 'vue-router';
import { registerRouterGuards } from './guards.js';
import publicRoutes from './routes/public.js';
import authRoutes from './routes/auth.js';
import appRoutes from './routes/app.js';
import adminRoutes from './routes/admin.js';
import utilityRoutes from './routes/utility.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...publicRoutes,
    ...authRoutes,
    ...appRoutes,
    ...adminRoutes,
    ...utilityRoutes,
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

registerRouterGuards(router);

export default router;
