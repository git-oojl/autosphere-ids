const PublicLayout = () => import('../../layouts/PublicLayout.vue');

export default [
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '403',
        name: 'utility-forbidden',
        component: () => import('../../views/utility/forbidden/index.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'utility-not-found',
        component: () => import('../../views/utility/not-found/index.vue'),
      },
    ],
  },
];
