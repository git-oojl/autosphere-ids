const DashboardLayout = () => import('../../layouts/DashboardLayout.vue');

export default [
  {
    path: '/panel',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'comprador',
        name: 'buyer-dashboard',
        component: () => import('../../views/buyer/dashboard/index.vue'),
        meta: { requiresAuth: true, roles: ['buyer'] },
      },
      {
        path: 'comprador/proximas-citas',
        name: 'buyer-upcoming-appointments',
        component: () =>
          import('../../views/buyer/upcoming-appointments/index.vue'),
        meta: { requiresAuth: true, roles: ['buyer'] },
      },
      {
        path: 'comprador/vehiculos-guardados',
        name: 'buyer-saved-vehicles',
        component: () => import('../../views/buyer/saved-vehicles/index.vue'),
        meta: { requiresAuth: true, roles: ['buyer'] },
      },
      {
        path: 'comprador/historial-busqueda',
        name: 'buyer-search-history',
        component: () => import('../../views/buyer/search-history/index.vue'),
        meta: { requiresAuth: true, roles: ['buyer'] },
      },
      {
        path: 'comprador/citas',
        name: 'buyer-appointments',
        component: () => import('../../views/buyer/appointments/index.vue'),
        meta: { requiresAuth: true, roles: ['buyer'] },
      },
      {
        path: 'comprador/citas/:id',
        name: 'buyer-appointment-detail',
        component: () =>
          import('../../views/buyer/appointment-detail/index.vue'),
        meta: { requiresAuth: true, roles: ['buyer'] },
      },
      {
        path: 'vendedor',
        name: 'seller-dashboard',
        component: () => import('../../views/seller/dashboard/index.vue'),
        meta: { requiresAuth: true, roles: ['seller'] },
      },
      {
        path: 'vendedor/publicaciones',
        name: 'seller-listings',
        component: () => import('../../views/seller/listings/index.vue'),
        meta: { requiresAuth: true, roles: ['seller'] },
      },
      {
        path: 'vendedor/publicaciones/nuevo',
        name: 'seller-create-listing',
        component: () => import('../../views/seller/create-listing/index.vue'),
        meta: { requiresAuth: true, roles: ['seller'] },
      },
      {
        path: 'vendedor/publicaciones/:id',
        name: 'seller-listing-detail',
        component: () => import('../../views/seller/listing-detail/index.vue'),
        meta: { requiresAuth: true, roles: ['seller'] },
      },
      {
        path: 'vendedor/publicaciones/:id/editar',
        name: 'seller-edit-listing',
        component: () => import('../../views/seller/edit-listing/index.vue'),
        meta: { requiresAuth: true, roles: ['seller'] },
      },
      {
        path: 'vendedor/citas',
        name: 'seller-appointments',
        component: () => import('../../views/seller/appointments/index.vue'),
        meta: { requiresAuth: true, roles: ['seller'] },
      },
      {
        path: 'vendedor/citas/:id',
        name: 'seller-appointment-detail',
        component: () =>
          import('../../views/seller/appointment-detail/index.vue'),
        meta: { requiresAuth: true, roles: ['seller'] },
      },
      {
        path: 'arrendador',
        name: 'lessor-rentals',
        component: () => import('../../views/lessor/rentals/index.vue'),
        meta: { requiresAuth: true, roles: ['lessor'] },
      },
      {
        path: 'arrendador/rentas/:id',
        name: 'lessor-rental-detail',
        component: () => import('../../views/lessor/rental-detail/index.vue'),
        meta: { requiresAuth: true, roles: ['lessor'] },
      },
      {
        path: 'arrendador/rentas/registrar',
        name: 'lessor-register-rental',
        component: () => import('../../views/lessor/register-rental/index.vue'),
        meta: { requiresAuth: true, roles: ['lessor'] },
      },
      {
        path: 'arrendador/rentas/:id/cerrar',
        name: 'lessor-close-rental',
        component: () => import('../../views/lessor/close-rental/index.vue'),
        meta: { requiresAuth: true, roles: ['lessor'] },
      },
      {
        path: 'cuenta/perfil',
        name: 'account-profile',
        component: () => import('../../views/account/profile/index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cuenta/seguridad',
        name: 'account-security',
        component: () => import('../../views/account/security/index.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];
