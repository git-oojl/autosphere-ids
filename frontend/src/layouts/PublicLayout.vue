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
              <li><router-link to="/sobre-nosotros">Sobre nosotros</router-link></li>
              <li><router-link to="/faq">Preguntas frecuentes</router-link></li>
              <li><router-link to="/contacto">Contacto</router-link></li>
            </ul>
          </div>

          <div class="footer-col">
            <h3>Para ti</h3>
            <ul>
              <li><router-link to="/catalogo">Comprar vehículo</router-link></li>
              <li><router-link to="/vender">Vender vehículo</router-link></li>
              <li><router-link to="/financiamiento">Financiamiento</router-link></li>
              <li><router-link to="/seguros">Seguros</router-link></li>
            </ul>
          </div>

          <div class="footer-col">
            <h3>Soporte</h3>
            <ul>
              <li><router-link to="/centro-ayuda">Centro de ayuda</router-link></li>
              <li><router-link to="/terminos">Términos de servicio</router-link></li>
              <li><router-link to="/privacidad">Política de privacidad</router-link></li>
              <li><router-link to="/garantias">Garantías</router-link></li>
            </ul>
          </div>

          <div class="footer-col">
            <h3>Contacto</h3>
            <p>📞 +52 664 123 4567</p>
            <p>✉️ soporte@autosphere.com</p>
            <p>📍 Tijuana, Baja California</p>
            <p>🕒 Lun - Vie: 9:00 - 18:00</p>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
              </svg>
            </a>
            <a href="https://wa.me/5216641234567" target="_blank" rel="noopener noreferrer" class="social-icon whatsapp">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.527 1.098 3.574l-1.095 3.5 3.596-1.016c1.022.552 2.172.844 3.348.844 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.585-5.766-5.767-5.766zm2.974 8.343c-.128.306-.518.548-.846.606-.277.049-.559.074-.833.074-.233 0-.483-.025-.744-.074-.394-.074-.794-.17-1.15-.304-.285-.106-.546-.241-.782-.4-.182-.123-.345-.27-.488-.437-.138-.159-.258-.337-.357-.532-.248-.49-.346-1.014-.281-1.528.024-.198.084-.391.179-.568.146-.271.376-.491.643-.65.125-.074.266-.13.414-.165.11-.026.222.005.302.084.216.211.373.473.462.762.03.096.015.199-.03.291-.067.137-.151.267-.235.401-.062.099-.129.2-.178.304-.032.068-.029.145.008.211.097.171.239.324.408.432.217.139.466.234.725.274.134.02.271.011.401-.025.104-.029.199-.081.282-.151.183-.155.349-.331.486-.532.132-.194.224-.411.273-.641.02-.097.014-.197-.02-.291-.037-.103-.094-.2-.166-.285-.086-.102-.186-.189-.298-.258-.112-.069-.237-.117-.367-.142-.198-.038-.4-.014-.588.07-.095.043-.184.101-.261.169-.077.068-.141.148-.191.237-.038.069-.063.144-.072.222-.009.079.001.158.026.234.024.076.061.148.109.213.048.065.105.121.17.166.064.045.135.078.209.098.074.02.15.024.225.012.075-.012.148-.039.216-.078.068-.039.129-.09.179-.15.05-.06.089-.129.115-.202.027-.073.04-.15.039-.227-.001-.077-.016-.153-.043-.224-.028-.071-.07-.136-.123-.191-.053-.055-.116-.1-.185-.132-.069-.032-.144-.05-.219-.053-.075-.003-.15.009-.221.037-.07.028-.133.07-.186.122-.053.052-.094.114-.121.182-.027.068-.04.14-.038.212.002.072.018.142.046.207.028.065.068.123.116.171.048.048.104.086.165.112.061.026.127.04.194.04.067 0 .133-.014.194-.04.061-.026.115-.064.163-.112.048-.048.086-.106.113-.171.027-.065.041-.135.038-.207z"/>
              </svg>
            </a>
          </div>
          <p>© {{ new Date().getFullYear() }} AutoSphere. Todos los derechos reservados.</p>
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
/* ============================================
   FOOTER GLOBAL STYLES
   ============================================ */

.footer {
  background: #0f1f3d;
  padding: 60px 40px 0;
  color: rgba(255, 255, 255, 0.7);
  margin-top: auto;
  width: 100%;
  font-family: 'Inter', -apple-system, sans-serif;
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

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 768px) {
  .public-layout {
    --layout-top-offset: 190px;
  }

  .footer {
    padding: 40px 20px 0;
  }

  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  .footer-bottom {
    padding: 20px 0;
  }
}

@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer-col {
    text-align: center;
  }

  .footer-col ul {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .social-icons {
    justify-content: center;
  }
}
</style>