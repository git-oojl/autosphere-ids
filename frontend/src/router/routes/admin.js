// ─────────────────────────────────────────────────────────────────────────────
// admin.js — Rutas del panel de administración
//
// CAMBIO PRINCIPAL:
//   Antes: rutas bajo /admin con AdminLayout (sidebar/navbar propio).
//   Ahora: rutas bajo /admin dentro del PublicLayout, de modo que el
//          PublicAppBar (navbar del sitio) siempre permanece visible.
//
// El guard de roles ['admin'] se mantiene igual en todos los meta.
// Los nombres de ruta (admin-dashboard, admin-users, etc.) NO cambian
// para no romper referencias existentes en el código.
// ─────────────────────────────────────────────────────────────────────────────

const PublicLayout = () => import('../../layouts/PublicLayout.vue');

export default [
  {
    // Las rutas de admin viven ahora dentro del PublicLayout.
    // El PublicAppBar ya maneja la visibilidad del enlace "Admin"
    // solo cuando auth.isAdmin === true.
    path: '/',
    component: PublicLayout,
    meta: { requiresAuth: true, roles: ['admin'] },
    children: [
      {
        path: 'admin',
        name: 'admin-dashboard',
        component: () => import('../../views/admin/dashboard/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'admin/usuarios',
        name: 'admin-users',
        component: () => import('../../views/admin/users/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'admin/vehiculos',
        name: 'admin-listings',
        component: () => import('../../views/admin/listings/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'admin/citas',
        name: 'admin-appointments',
        component: () => import('../../views/admin/appointments/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'admin/catalogo',
        name: 'admin-catalog',
        component: () => import('../../views/admin/catalog/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'admin/moderacion',
        name: 'admin-moderation',
        component: () => import('../../views/admin/moderation/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'admin/reportes',
        name: 'admin-reports',
        component: () => import('../../views/admin/reports/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'admin/suspensiones',
        name: 'admin-suspensions',
        component: () => import('../../views/admin/suspensions/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
    ],
  },
];
