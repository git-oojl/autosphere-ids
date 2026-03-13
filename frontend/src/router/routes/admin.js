const AdminLayout = () => import('../../layouts/AdminLayout.vue');

export default [
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, roles: ['admin'] },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('../../views/admin/dashboard/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'usuarios',
        name: 'admin-users',
        component: () => import('../../views/admin/users/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'vehiculos',
        name: 'admin-listings',
        component: () => import('../../views/admin/listings/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'citas',
        name: 'admin-appointments',
        component: () => import('../../views/admin/appointments/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'catalogo',
        name: 'admin-catalog',
        component: () => import('../../views/admin/catalog/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'moderacion',
        name: 'admin-moderation',
        component: () => import('../../views/admin/moderation/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'reportes',
        name: 'admin-reports',
        component: () => import('../../views/admin/reports/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'suspensiones',
        name: 'admin-suspensions',
        component: () => import('../../views/admin/suspensions/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
    ],
  },
];
