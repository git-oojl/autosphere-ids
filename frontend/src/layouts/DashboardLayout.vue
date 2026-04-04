<template>
  <!-- 
    DashboardLayout ya no inyecta sidebar propio.
    El PublicAppBar (navbar principal) sigue visible porque
    este componente vive dentro del layout público del router.
    Solo renderizamos el contenido de la ruta hija.
  -->
  <router-view />
</template>
