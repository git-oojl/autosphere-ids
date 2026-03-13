<template>
  <v-app>
    <router-view />
    <DevSessionSwitcher v-if="isDev" />
  </v-app>
</template>

<script setup>
import DevSessionSwitcher from './components/dev/DevSessionSwitcher.vue';

const isDev = import.meta.env.DEV;
</script>
