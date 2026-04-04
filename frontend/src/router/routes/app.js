// ─────────────────────────────────────────────────────────────────────────────
// app.js — Rutas de usuario autenticado
//
// CAMBIO PRINCIPAL:
//   Antes: todas las rutas vivían bajo /panel con DashboardLayout (sidebar oscuro).
//   Ahora: todas las rutas viven bajo /cuenta dentro del PublicLayout,
//          de modo que el PublicAppBar (navbar del sitio) siempre permanece visible.
//
// RUTAS RENOMBRADAS (para coincidir con PublicAppBar.vue actualizado):
//   buyer-dashboard   → user-dashboard
//   seller-listings   → user-listings
//   buyer-appointments / seller-appointments  → user-appointments
//   lessor-rentals    → user-rentals
//   account-profile   → user-profile
//   account-security  → user-security
//
// El resto de nombres (buyer-upcoming-appointments, seller-listing-detail, etc.)
// se mantienen igual para no romper referencias internas existentes.
// ─────────────────────────────────────────────────────────────────────────────

const PublicLayout = () => import('../../layouts/PublicLayout.vue');

export default [
  {
    // Todas las rutas de usuario autenticado viven bajo el PublicLayout.
    // Así el navbar principal (PublicAppBar) sigue visible en todas ellas.
    path: '/',
    component: PublicLayout,
    meta: { requiresAuth: true },
    children: [
      // ── DASHBOARD UNIFICADO ───────────────────────────────────────────────
      // Punto de entrada desde el menú desplegable del usuario.
      // Muestra tabs de Comprador / Vendedor / Arrendador en una sola pantalla.
      {
        path: 'cuenta/dashboard',
        name: 'user-dashboard',
        component: () => import('../../views/vehicles/dashboard/index.vue'),
        meta: { requiresAuth: true },
      },

      // ── COMPRADOR ─────────────────────────────────────────────────────────
      {
        path: 'cuenta/comprador',
        name: 'buyer-dashboard',
        component: () => import('../../views/buyer/dashboard/index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cuenta/proximas-citas',
        name: 'buyer-upcoming-appointments',
        component: () =>
          import('../../views/buyer/upcoming-appointments/index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cuenta/vehiculos-guardados',
        name: 'buyer-saved-vehicles',
        component: () => import('../../views/buyer/saved-vehicles/index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cuenta/historial-busqueda',
        name: 'buyer-search-history',
        component: () => import('../../views/buyer/search-history/index.vue'),
        meta: { requiresAuth: true },
      },

      // ── CITAS (unificadas comprador + vendedor) ───────────────────────────
      // "Mis citas" en el menú desplegable lleva aquí.
      {
        path: 'cuenta/citas',
        name: 'user-appointments',
        component: () => import('../../views/buyer/appointments/index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cuenta/citas/:id',
        name: 'buyer-appointment-detail',
        component: () =>
          import('../../views/buyer/appointment-detail/index.vue'),
        meta: { requiresAuth: true },
      },
      {
        // Citas desde el lado vendedor (detalle con acciones de vendedor)
        path: 'cuenta/citas-vendedor/:id',
        name: 'seller-appointment-detail',
        component: () =>
          import('../../views/seller/appointment-detail/index.vue'),
        meta: { requiresAuth: true },
      },

      // ── PUBLICACIONES (vendedor) ──────────────────────────────────────────
      // "Mis publicaciones" en el menú desplegable lleva aquí.
      {
        path: 'cuenta/publicaciones',
        name: 'user-listings',
        component: () => import('../../views/seller/listings/index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cuenta/publicaciones/:id',
        name: 'seller-listing-detail',
        component: () => import('../../views/seller/listing-detail/index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cuenta/publicaciones/:id/editar',
        name: 'seller-edit-listing',
        component: () => import('../../views/seller/edit-listing/index.vue'),
        meta: { requiresAuth: true },
      },

      // ── CITAS VENDEDOR (vista de gestión) ─────────────────────────────────
      {
        path: 'cuenta/citas-de-mis-anuncios',
        name: 'seller-appointments',
        component: () => import('../../views/seller/dashboard/index.vue'),
        meta: { requiresAuth: true },
      },

      // ── ARRENDADOR ────────────────────────────────────────────────────────
      // "Mis rentas" en el menú desplegable lleva aquí.
      {
        path: 'cuenta/rentas',
        name: 'user-rentals',
        component: () => import('../../views/lessor/rentals/index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cuenta/rentas/:id',
        name: 'lessor-rental-detail',
        component: () => import('../../views/lessor/rental-detail/index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cuenta/rentas/:id/cerrar',
        name: 'lessor-close-rental',
        component: () => import('../../views/lessor/close-rental/index.vue'),
        meta: { requiresAuth: true },
      },

      // ── NUEVO ANUNCIO ─────────────────────────────────────────────────────
      {
        path: 'cuenta/nuevo-anuncio',
        name: 'create-listing',
        component: () => import('../../views/vehicles/News/index.vue'),
        meta: { requiresAuth: true },
      },

      // ── CUENTA ────────────────────────────────────────────────────────────
      // "Mi perfil" y "Seguridad" en el menú desplegable llevan aquí.
      {
        path: 'cuenta/perfil',
        name: 'user-profile',
        component: () => import('../../views/account/profile/index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cuenta/seguridad',
        name: 'user-security',
        component: () => import('../../views/account/security/index.vue'),
        meta: { requiresAuth: true },
      },

      // ── REDIRECCIONES — rutas antiguas de /panel ──────────────────────────
      // Mantienen compatibilidad con cualquier enlace hardcodeado existente.
      { path: 'panel/comprador', redirect: { name: 'user-dashboard' } },
      { path: 'panel/vendedor', redirect: { name: 'user-dashboard' } },
      { path: 'panel/arrendador', redirect: { name: 'user-rentals' } },
      {
        path: 'panel/vendedor/publicaciones',
        redirect: { name: 'user-listings' },
      },
      {
        path: 'panel/vendedor/publicaciones/nuevo',
        redirect: { name: 'create-listing' },
      },
      {
        path: 'panel/arrendador/rentas/registrar',
        redirect: { name: 'create-listing' },
      },
      { path: 'panel/cuenta/perfil', redirect: { name: 'user-profile' } },
      { path: 'panel/cuenta/seguridad', redirect: { name: 'user-security' } },
      { path: 'panel/nuevo-anuncio', redirect: { name: 'create-listing' } },
    ],
  },
];
