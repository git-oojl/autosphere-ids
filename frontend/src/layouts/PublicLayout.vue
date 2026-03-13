<template>
  <div class="public-layout">
    <PublicAppBar />

    <v-main class="main-content">
      <div class="page-shell">
        <router-view />
      </div>
    </v-main>

    <v-footer class="py-6" border>
      <v-container class="text-center">
        <small>© {{ new Date().getFullYear() }} AutoSphere</small>
      </v-container>
    </v-footer>
  </div>
</template>

<script setup>
import PublicAppBar from '../components/layout/PublicAppBar.vue';
</script>

<style scoped>
.public-layout {
  min-height: 100vh;

  /*
    Reserve vertical space for the public app bar.
    Adjust this value if you tweak the app bar height/padding later.
  */
  --layout-top-offset: 116px;
}

.main-content {
  padding: 0 !important;
}

.page-shell {
  padding-top: var(--layout-top-offset);
}

@media (max-width: 768px) {
  .public-layout {
    /*
      Mobile needs more room because your navbar stacks vertically.
      Increase if the pill becomes taller on your screen.
    */
    --layout-top-offset: 190px;
  }
}
</style>
