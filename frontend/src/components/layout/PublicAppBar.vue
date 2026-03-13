<template>
  <v-app-bar
    elevation="0"
    color="transparent"
    class="public-appbar"
    height="96"
  >
    <v-container class="navbar-wrapper">
      <nav class="navbar">
        <div class="logo" @click="goHome">AutoSphere</div>

        <div class="nav-links">
          <v-btn
            variant="text"
            class="nav-btn"
            active-class="nav-active"
            :to="{ name: 'public-home' }"
            exact
          >
            Inicio
          </v-btn>

          <v-btn
            variant="text"
            class="nav-btn"
            active-class="nav-active"
            :to="{ name: 'public-catalog' }"
          >
            Vehículos
          </v-btn>

          <v-btn
            variant="text"
            class="nav-btn"
            active-class="nav-active"
            :to="{ name: 'public-about' }"
          >
            Sobre
          </v-btn>

          <v-btn
            variant="text"
            class="nav-btn"
            active-class="nav-active"
            :to="{ name: 'public-contact' }"
          >
            Contacto
          </v-btn>

          <v-btn
            variant="text"
            class="nav-btn"
            active-class="nav-active"
            :to="{ name: 'public-faq' }"
          >
            FAQ
          </v-btn>
        </div>

        <div class="search-container">
          <div class="search-box">
            <v-text-field
              v-model="q"
              variant="plain"
              density="compact"
              hide-details
              placeholder="Búsqueda"
              class="search-field"
              prepend-inner-icon="mdi-magnify"
              @keyup.enter="goSearch"
            />
          </div>

          <v-btn
            icon
            class="user-icon"
            :to="{ name: 'auth-login' }"
            aria-label="Entrar"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </div>
      </nav>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const q = ref('');

function goHome() {
  router.push({ name: 'public-home' });
}

function goSearch() {
  router.push({
    name: 'public-catalog',
    query: { q: q.value?.trim() || undefined },
  });
}
</script>

<style scoped>
.public-appbar {
  background: transparent !important;
}

.navbar-wrapper {
  padding: 20px;
}

.navbar {
  background: white;
  padding: 15px 40px;
  border-radius: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.logo {
  font-weight: bold;
  font-size: 20px;
  color: #333;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 12px;
  align-items: center;
}

.nav-btn {
  text-transform: none;
  letter-spacing: normal;
  font-weight: 500;
  font-size: 16px;
  color: #666;
}

.nav-active {
  color: #007bff !important;
  font-weight: 600 !important;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  padding: 0 14px;
  border-radius: 20px;
  min-width: 220px;
  height: 40px;
}

.search-field {
  flex: 1;
}

.search-field :deep(.v-input__control) {
  min-height: 40px !important;
}

.search-field :deep(.v-field) {
  min-height: 40px !important;
  height: 40px !important;
  display: flex;
  align-items: center;
  background: transparent !important;
  box-shadow: none !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.search-field :deep(.v-field__field) {
  min-height: 40px !important;
  height: 40px !important;
  display: flex;
  align-items: center;
}

.search-field :deep(.v-field__input) {
  min-height: 40px !important;
  height: 40px !important;
  display: flex;
  align-items: center;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  font-size: 14px;
  color: #333;
}

.search-field :deep(.v-field__prepend-inner) {
  height: 40px !important;
  display: flex;
  align-items: center;
  padding-top: 0 !important;
}

.search-field :deep(.v-field__prepend-inner .v-icon) {
  transform: translateY(1px);
}

.search-field :deep(.v-icon) {
  color: #777;
}

.search-field :deep(input) {
  font-size: 14px;
  color: #333;
}

.search-field :deep(input::placeholder) {
  color: #999;
}

.user-icon {
  width: 35px;
  height: 35px;
  border-radius: 999px;
  background: #666;
  color: white;
  transition: background 0.3s ease;
}

.user-icon:hover {
  background: #333;
}

@media (max-width: 768px) {
  .navbar-wrapper {
    padding: 15px;
  }

  .navbar {
    flex-direction: column;
    gap: 15px;
    border-radius: 20px;
    padding: 20px;
  }

  .nav-links {
    flex-direction: column;
    gap: 10px;
    width: 100%;
    text-align: center;
  }

  .search-container {
    width: 100%;
    justify-content: center;
  }

  .search-box {
    width: 100%;
    min-width: unset;
  }
}
</style>
