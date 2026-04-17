const PublicLayout = () => import('../../layouts/PublicLayout.vue');

export default [
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'public-home',
        component: () => import('../../views/public/home/index.vue'),
      },
      {
        path: 'nosotros',
        name: 'public-about',
        component: () => import('../../views/public/about/index.vue'),
      },
      {
        path: 'contacto',
        name: 'public-contact',
        component: () => import('../../views/public/contact/index.vue'),
      },
      {
        path: 'faq',
        name: 'public-faq',
        component: () => import('../../views/public/faq/index.vue'),
      },
      {
        path: 'terminos-condiciones',
        name: 'public-terms',
        component: () => import('../../views/public/terms/index.vue'),
      },
      {
        path: 'privacidad',
        name: 'public-privacy',
        component: () => import('../../views/public/privacy/index.vue'),
      },
      {
        path: 'vehiculos',
        name: 'public-catalog',
        alias: ['/listados'],
        component: () => import('../../views/catalog/listings/index.vue'),
      },
      {
        path: 'vehiculos/busqueda-avanzada',
        name: 'public-advanced-search',
        component: () =>
          import('../../views/catalog/advanced-search/index.vue'),
      },
      {
        path: 'vehiculos/:id',
        name: 'public-listing-detail',
        alias: ['/listados/:id'],
        component: () => import('../../views/catalog/listing-detail/index.vue'),
      },
      {
        path: 'usuarios/:id',
        name: 'public-user-profile',
        component: () => import('../../views/public/profile/index.vue'),
      },
      {
        path: 'vehiculos/:id/agendar-cita',
        name: 'public-appointment-booking',
        component: () => import('../../views/appointments/gestion-citas/index.vue'),
      },
      {
        path: 'citas',
        name: 'public-appointments-calendar',
        component: () => import('../../views/appointments/calendar/index.vue'),
      },
      {
        path: 'vehiculos/:id/citas/confirmacion',
        name: 'public-appointment-confirmation',
        component: () =>
          import('../../views/appointments/booking-confirmation/index.vue'),
      },
      {
        path: 'vehiculos/:id/citas/exito',
        name: 'public-appointment-success',
        component: () =>
          import('../../views/appointments/booking-success/index.vue'),
      },
    ],
  },
];
