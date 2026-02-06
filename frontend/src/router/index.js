import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home/index.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/listados',
    name: 'listados',
    component: () => import('../views/Listados/index.vue'),
  },
  {
    path: '/citas',
    name: 'citas',
    component: () => import('../views/Citas/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
