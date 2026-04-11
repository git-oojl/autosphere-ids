<template>
  <div class="auth-layout">
    <PublicAppBar v-if="route.meta.showPublicBar" />

    <v-main class="auth-main">
      <router-view />
    </v-main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import PublicAppBar from '../components/layout/PublicAppBar.vue';

const route = useRoute();
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
}
</style>
