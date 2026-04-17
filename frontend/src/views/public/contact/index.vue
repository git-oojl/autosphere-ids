<template>
  <div class="contact-page">
    <!-- HERO HEADER -->
    <section class="contact-hero">
      <div class="hero-content">
        <br />
        <br />
        <br />
        <p class="eyebrow">ESTAMOS AQUÍ PARA AYUDARTE</p>
        <h1>Contáctanos</h1>
        <p class="hero-subtitle">
          ¿Tienes alguna pregunta? Nuestro equipo está listo para asistirte
        </p>
      </div>
    </section>

    <!-- CONTACT METHODS -->
    <section class="contact-methods">
      <div class="methods-container">
        <div class="method-card">
          <div class="method-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M3 5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H8.28C8.7623 3.00006 9.22944 3.16661 9.59928 3.47195C9.96911 3.77729 10.2191 4.20071 10.3 4.67L11.3 10.33C11.3783 10.7928 11.3021 11.2697 11.0832 11.6841C10.8643 12.0986 10.5159 12.4269 10.09 12.62L8.5 13.5C9.6 15.7 11.3 17.4 13.5 18.5L14.38 16.91C14.5731 16.4841 14.9014 16.1357 15.3159 15.9168C15.7303 15.6979 16.2072 15.6217 16.67 15.7L22.33 16.7C22.8013 16.781 23.2252 17.0314 23.5306 17.4019C23.8359 17.7723 24.0016 18.2401 24 18.7233V22C24 22.5304 23.7893 23.0391 23.4142 23.4142C23.0391 23.7893 22.5304 24 22 24H20C10.6112 24 3 16.3888 3 7V5Z"
              />
            </svg>
          </div>
          <h3>Teléfono</h3>
          <p class="method-value">+52 664 123 4567</p>
          <p class="method-hours">Lun - Vie: 9:00 AM - 6:00 PM</p>
          <button class="method-btn" @click="callPhone">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"
              />
            </svg>
            Llamar Ahora
          </button>
        </div>

        <div class="method-card">
          <div class="method-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
              />
            </svg>
          </div>
          <h3>Email</h3>
          <p class="method-value">soporte@autosphere.com</p>
          <p class="method-hours">Respuesta en 24 horas</p>
          <button class="method-btn" @click="sendEmail">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8"
              />
            </svg>
            Enviar Email
          </button>
        </div>
      </div>
    </section>

    <!-- CONTACT FORM & INFO -->
    <section id="contact-form" class="contact-section">
      <div class="contact-container">
        <!-- FORM -->
        <div class="form-card">
          <h2>Envíanos un Mensaje</h2>
          <p class="form-subtitle">
            Completa el formulario y nos pondremos en contacto contigo
          </p>
          <p v-if="submitState.message" :class="['form-feedback', submitState.type]">
            {{ submitState.message }}
          </p>

          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-row">
              <div class="form-group">
                <label>Nombre Completo *</label>
                <input
                  v-model="formData.name"
                  type="text"
                  placeholder="Juan Pérez"
                  required
                />
              </div>
              <div class="form-group">
                <label>Email *</label>
                <input
                  v-model="formData.email"
                  type="email"
                  placeholder="juan@email.com"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Teléfono</label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  placeholder="+52 664 123 4567"
                />
              </div>
              <div class="form-group">
                <label>Asunto *</label>
                <select v-model="formData.subject" required>
                  <option value="">Seleccionar...</option>
                  <option value="general">Consulta General</option>
                  <option value="compra">Compra de Vehículo</option>
                  <option value="venta">Venta de Vehículo</option>
                  <option value="soporte">Soporte Técnico</option>
                  <option value="sugerencia">Sugerencia</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Mensaje *</label>
              <textarea
                v-model="formData.message"
                rows="6"
                placeholder="Escribe tu mensaje aquí..."
                required
              ></textarea>
            </div>

            <div class="form-checkbox">
              <input
                id="privacy"
                v-model="formData.privacy"
                type="checkbox"
                required
              />
              <label for="privacy">
                Acepto la <a href="#">política de privacidad</a> y el
                tratamiento de mis datos
              </label>
            </div>

            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <svg
                v-if="!isSubmitting"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
              <svg
                v-else
                class="spinner"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
                />
              </svg>
              {{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}
            </button>
          </form>
        </div>

        <!-- INFO SIDEBAR -->
        <div class="info-sidebar">
          <div class="info-card">
            <h3>Información de Contacto</h3>
            <div class="info-list">
              <div class="info-item">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                  />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <strong>Dirección</strong>
                  <p>
                    Av. Revolución 1234<br />Zona Centro, Tijuana B.C.<br />México,
                    22000
                  </p>
                </div>
              </div>

              <div class="info-item">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"
                  />
                </svg>
                <div>
                  <strong>Teléfono</strong>
                  <p>+52 664 123 4567<br />+52 664 765 4321</p>
                </div>
              </div>

              <div class="info-item">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                  />
                </svg>
                <div>
                  <strong>Email</strong>
                  <p>soporte@autosphere.com<br />ventas@autosphere.com</p>
                </div>
              </div>

              <div class="info-item">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6V12L16 14" />
                </svg>
                <div>
                  <strong>Horario</strong>
                  <p>
                    Lunes - Viernes: 9:00 AM - 6:00 PM<br />Sábado: 10:00 AM -
                    2:00 PM<br />Domingo: Cerrado
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="social-card">
            <h3>Síguenos</h3>
            <div class="social-links">
              <a href="#" class="social-link facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
                  />
                </svg>
                Facebook
              </a>
              <a href="#" class="social-link instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                  />
                </svg>
                Instagram
              </a>
              <a href="#" class="social-link twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  />
                </svg>
                Twitter
              </a>
              <a href="#" class="social-link whatsapp">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                  />
                </svg>
                WhatsApp
              </a>
              <a href="#" class="social-link linkedin">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M20.447 20.452H16.89V14.86c0-1.333-.024-3.048-1.859-3.048-1.861 0-2.144 1.45-2.144 2.948v5.692H9.298V9h3.415v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a1.98 1.98 0 11-.001-3.961 1.98 1.98 0 010 3.961zM6.814 20.452H3V9h3v11.452zM22.225 0H1C0 .998 0 2 .001 3v18c-.001 1 .999 2 2 2h21c1 .001 2-.999 2-2V3c0-1-.999-2-2-2z"
                  />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MAP SECTION -->
    <section id="ubicacion" class="map-section">
      <div class="map-container">
        <h2>Nuestra Ubicación</h2>
        <div class="map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3365.0827447917186!2d-117.03644!3d32.525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDMxJzMwLjAiTiAxMTfCsDAyJzExLjIiVw!5e0!3m2!1ses!2smx!4v1234567890"
            width="100%"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { submitContactForm } from '../../../services/public.js';

const isSubmitting = ref(false);
const submitState = ref({ type: 'success', message: '' });

const makeInitialForm = () => ({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  privacy: false,
});

const formData = ref(makeInitialForm());

const submitForm = async () => {
  isSubmitting.value = true;
  submitState.value = { type: 'success', message: '' };

  try {
    await submitContactForm({ ...formData.value });
    submitState.value = {
      type: 'success',
      message:
        'Tu mensaje quedó registrado en la cola mock de contacto. En Wave 2 este paso irá al endpoint público real.',
    };
    formData.value = makeInitialForm();
  } catch (error) {
    submitState.value = {
      type: 'error',
      message: 'No fue posible registrar tu mensaje. Intenta nuevamente.',
    };
  } finally {
    isSubmitting.value = false;
  }
};

const callPhone = () => {
  window.location.href = 'tel:+526641234567';
};

const sendEmail = () => {
  window.location.href = 'mailto:soporte@autosphere.com';
};
</script>

<style scoped src="./styles.css">
.form-feedback {
  margin: 0 0 20px;
  padding: 12px 14px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.5;
}

.form-feedback.success {
  background: rgba(16, 185, 129, 0.12);
  color: #065f46;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.form-feedback.error {
  background: rgba(239, 68, 68, 0.1);
  color: #991b1b;
  border: 1px solid rgba(239, 68, 68, 0.18);
}
</style>
