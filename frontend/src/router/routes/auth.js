const AuthLayout = () => import('../../layouts/AuthLayout.vue');

export default [
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'auth-login',
        component: () => import('../../views/auth/login/index.vue'),
        meta: {
          requiresGuest: true,
          showPublicBar: true,
        },
      },
      {
        path: 'registro',
        name: 'auth-register',
        component: () => import('../../views/auth/register/index.vue'),
        meta: { requiresGuest: true },
      },
      {
        path: 'recuperar-contrasena',
        name: 'auth-forgot-password',
        component: () => import('../../views/auth/forgot-password/index.vue'),
        meta: { requiresGuest: true },
      },
      {
        path: 'verificar-correo',
        name: 'auth-verify-email',
        component: () => import('../../views/auth/verify-email/index.vue'),
        meta: { requiresGuest: true },
      },
    ],
  },
];
