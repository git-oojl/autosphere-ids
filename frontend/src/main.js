import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useAuthStore } from './stores/auth.js';
import { getCurrentSession } from './services/auth.js';
import './style.css';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(vuetify);

const auth = useAuthStore(pinia);
const bootstrap = async () => {
  if (!auth.accessToken) {
    app.mount('#app');
    return;
  }

  try {
    const session = await getCurrentSession();
    auth.startSession({
      nextUser: session?.user || null,
      nextRoles: session?.roles || [],
      token: auth.accessToken,
    });
  } catch {
    auth.clearSession();
  } finally {
    app.mount('#app');
  }
};

bootstrap();
