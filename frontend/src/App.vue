<template>
  <v-app>
    <v-app-bar title="Autosphere">
      <v-btn to="/"> Home </v-btn>
      <v-btn to="/listados"> Listados </v-btn>
      <v-btn to="/citas"> Citas </v-btn>
      <v-btn to="/login" color="primary" variant="flat"> Login </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
