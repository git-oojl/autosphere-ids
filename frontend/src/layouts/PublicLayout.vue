<template>
  <div class="public-layout">
    <PublicAppBar />

    <v-main class="main-content">
      <div class="page-shell">
        <router-view />
      </div>
    </v-main>

    <!-- FOOTER PERSONALIZADO -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-grid">
          <div class="footer-col">
            <h3>AutoSphere</h3>
            <ul>
              <li><a @click.prevent="goToHome">Inicio</a></li>
              <li><router-link to="/nosotros">Sobre nosotros</router-link></li>
              <li><router-link to="/faq">Preguntas frecuentes</router-link></li>
              <li><router-link to="/contacto">Contacto</router-link></li>
            </ul>
          </div>

          <div class="footer-col">
            <h3>Para ti</h3>
            <ul>
              <li>
                <router-link to="/vehiculos"
                  >Comprar o rentar vehículo</router-link
                >
              </li>
              <li>
                <router-link to="/cuenta/nuevo-anuncio"
                  >Nuevo anuncio</router-link
                >
              </li>
            </ul>
          </div>

          <div class="footer-col">
            <h3>Soporte</h3>
            <ul>
              <li>
                <router-link to="/terminos-condiciones"
                  >Términos de servicio</router-link
                >
              </li>
              <li>
                <router-link to="/privacidad"
                  >Política de privacidad</router-link
                >
              </li>
            </ul>
          </div>

          <div class="footer-col footer-col-contact">
            <h3>Contacto</h3>
            <p class="footer-contact-line">
              <svg class="footer-ico" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                />
              </svg>
              +52 664 123 4567
            </p>
            <p class="footer-contact-line">
              <svg class="footer-ico" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                />
              </svg>
              soporte@autosphere.com
            </p>
            <p class="footer-contact-line">
              <svg class="footer-ico" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                />
              </svg>
              Tijuana, Baja California
            </p>
            <p class="footer-contact-line">
              <svg class="footer-ico" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                />
              </svg>
              Lun - Vie: 9:00 - 18:00
            </p>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
                />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"
                />
              </svg>
            </a>
            <a
              href="https://wa.me/5216641234567"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon whatsapp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
                />
                <path
                  d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.12 1.529 5.849L.057 23.55a.75.75 0 00.916.913l5.701-1.472A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.523-5.176-1.432l-.371-.22-3.384.874.893-3.383-.236-.381A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
                />
              </svg>
            </a>
          </div>
          <p>
            © {{ new Date().getFullYear() }} AutoSphere. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import PublicAppBar from '../components/layout/PublicAppBar.vue';

const router = useRouter();

const goToHome = () => {
  router.push('/');
};
</script>

<style scoped>
.public-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--as-page-bg, #deeaf6);
}

.page-shell {
  flex: 1 0 auto;
  width: 100%;
  background-color: var(--as-page-bg, #deeaf6);
}

:deep(.v-main.main-content) {
  background-color: var(--as-page-bg, #deeaf6) !important;
}

.footer-contact-line {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.footer-ico {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 2px;
  opacity: 0.85;
  color: rgba(255, 255, 255, 0.75);
}

/* ============================================
   FOOTER GLOBAL STYLES
   ============================================ */

.footer {
  background: #0f1f3d;
  padding: 60px 40px 0;
  color: rgba(255, 255, 255, 0.7);
  margin-top: auto;
  width: 100%;
  font-family:
    'Inter',
    -apple-system,
    sans-serif;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin-bottom: 40px;
}

.footer-col h3 {
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-col ul li {
  margin-bottom: 12px;
}

.footer-col ul li a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
}

.footer-col ul li a:hover {
  color: white;
  padding-left: 4px;
  transform: translateX(2px);
}

.footer-col p {
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 1.6;
}

/* Social Icons */
.social-icons {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  justify-content: flex-start;
}

.social-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
}

.social-icon:hover {
  background: #3b82f6;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.social-icon.whatsapp:hover {
  background: #25d366;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
}

.social-icon svg {
  width: 20px;
  height: 20px;
  color: white;
}

/* Footer Bottom */
.footer-bottom {
  padding: 24px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.footer-bottom p {
  margin: 0;
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 1024px) {
  .footer-grid {
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 20px 0;
  }

  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  .social-icons {
    justify-content: center;
  }

  .footer-bottom {
    padding: 20px 0;
  }
}

@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }

  .footer-col ul {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-col ul li a {
    text-align: center;
  }

  .social-icons {
    justify-content: center;
  }
}
</style>
