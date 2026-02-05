import { createRouter, createWebHistory } from 'vue-router';

// Notice the paths now go deeper into the specific folders
import HomeView from '../views/Home/index.vue';
import LoginView from '../views/Login/index.vue';
import CitasView from '../views/Citas/index.vue';
import ListadosView from '../views/Listados/index.vue';
import DetalleView from '../views/ListadoDetalle/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/citas',
      name: 'citas',
      component: CitasView,
    },
    {
      path: '/listados',
      name: 'listados',
      component: ListadosView,
    },
    {
      path: '/listados/:id',
      name: 'listado-detalle',
      component: DetalleView,
    },
  ],
});

export default router;
