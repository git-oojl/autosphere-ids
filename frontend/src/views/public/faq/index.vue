<template>
  <div class="faq-page">
    <!-- HERO HEADER -->
    <section class="faq-hero">
      <div class="hero-content">
        <br />
        <br />
        <br />
        <p class="eyebrow">CENTRO DE AYUDA</p>
        <h1>Preguntas Frecuentes</h1>
        <p class="hero-subtitle">
          Encuentra respuestas rápidas a las dudas más comunes sobre AutoSphere
        </p>

        <!-- SEARCH BAR -->
        <div class="search-container">
          <div class="search-box">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21L16.65 16.65" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar en preguntas frecuentes..."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ CONTENT -->
    <section class="faq-content">
      <div class="content-container">
        <!-- QUICK LINKS -->
        <div class="quick-links">
          <h3>Categorías</h3>
          <div class="categories-grid">
            <button
              v-for="category in categories"
              :key="category.id"
              class="category-card"
              :class="{ active: selectedCategory === category.id }"
              @click="selectCategory(category.id)"
            >
              <span>{{ category.name }}</span>
              <span class="category-count">{{ category.count }}</span>
            </button>
          </div>
        </div>

        <!-- GENERAL QUESTIONS -->
        <div id="general" class="faq-section">
          <h2 class="section-title">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Preguntas Generales
          </h2>
          <div class="faq-list">
            <div
              v-for="faq in filteredGeneralFAQs"
              :key="faq.id"
              class="faq-item"
              :class="{ open: openFAQ === faq.id }"
            >
              <button class="faq-question" @click="toggleFAQ(faq.id)">
                <span>{{ faq.question }}</span>
                <svg
                  class="faq-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M19 9L12 16L5 9" />
                </svg>
              </button>
              <div class="faq-answer">
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- BUYERS QUESTIONS -->
        <div id="buyers" class="faq-section">
          <h2 class="section-title">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
              />
              <path
                d="M3 5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H7V21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5Z"
              />
            </svg>
            Para Compradores
          </h2>
          <div class="faq-list">
            <div
              v-for="faq in filteredBuyersFAQs"
              :key="faq.id"
              class="faq-item"
              :class="{ open: openFAQ === faq.id }"
            >
              <button class="faq-question" @click="toggleFAQ(faq.id)">
                <span>{{ faq.question }}</span>
                <svg
                  class="faq-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M19 9L12 16L5 9" />
                </svg>
              </button>
              <div class="faq-answer">
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- SELLERS QUESTIONS -->
        <div id="sellers" class="faq-section">
          <h2 class="section-title">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M5 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V9.5"
              />
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
            </svg>
            Para Vendedores
          </h2>
          <div class="faq-list">
            <div
              v-for="faq in filteredSellersFAQs"
              :key="faq.id"
              class="faq-item"
              :class="{ open: openFAQ === faq.id }"
            >
              <button class="faq-question" @click="toggleFAQ(faq.id)">
                <span>{{ faq.question }}</span>
                <svg
                  class="faq-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M19 9L12 16L5 9" />
                </svg>
              </button>
              <div class="faq-answer">
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- CONTACT CTA -->
        <div class="contact-cta">
          <div class="cta-content">
            <h3>¿No encontraste lo que buscabas?</h3>
            <p>Nuestro equipo de soporte está listo para ayudarte</p>
            <div class="cta-buttons">
              <button class="btn-primary" @click="contactSupport">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                  />
                </svg>
                Contactar Soporte
              </button>
              <button class="btn-secondary" @click="goToLogin">
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const searchQuery = ref('');
const openFAQ = ref(null);
const selectedCategory = ref('all');

const categories = ref([
  {
    id: 'all',
    name: 'Todas',
    count: 15,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  },
  {
    id: 'general',
    name: 'General',
    count: 5,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>',
  },
  {
    id: 'buyers',
    name: 'Compradores',
    count: 5,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>',
  },
  {
    id: 'sellers',
    name: 'Vendedores',
    count: 5,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
  },
]);

const generalFAQs = ref([
  {
    id: 'g1',
    question: '¿Qué es AutoSphere?',
    answer:
      'AutoSphere es una plataforma digital líder en México que conecta compradores y vendedores de vehículos. Ofrecemos un marketplace seguro y transparente donde puedes encontrar el auto perfecto o vender tu vehículo de manera rápida y confiable.',
  },
  {
    id: 'g2',
    question: '¿Cómo funciona AutoSphere?',
    answer:
      'Es muy simple: los vendedores publican sus vehículos con fotos y detalles, mientras que los compradores pueden buscar, filtrar y contactar directamente a los vendedores. Facilitamos todo el proceso de compra-venta con herramientas de comunicación, verificación y soporte.',
  },
  {
    id: 'g3',
    question: '¿Es gratuito usar AutoSphere?',
    answer:
      'Crear una cuenta y buscar vehículos es completamente gratuito. Para vendedores, ofrecemos planes básicos gratuitos y opciones premium con mayor visibilidad y herramientas avanzadas de gestión.',
  },
  {
    id: 'g4',
    question: '¿En qué ciudades está disponible AutoSphere?',
    answer:
      'AutoSphere opera en las principales ciudades de México incluyendo Ciudad de México, Guadalajara, Monterrey, Puebla, Mérida y estamos expandiéndonos constantemente a más ubicaciones.',
  },
  {
    id: 'g5',
    question: '¿Cómo puedo confiar en los vendedores?',
    answer:
      'Implementamos un sistema de verificación de usuarios, calificaciones y reseñas. Además, recomendamos siempre realizar inspecciones presenciales, verificar documentación y hacer pruebas de manejo antes de cualquier transacción.',
  },
]);

const buyersFAQs = ref([
  {
    id: 'b1',
    question: '¿Cómo busco un vehículo en AutoSphere?',
    answer:
      'Utiliza los filtros del catálogo para buscar por marca, modelo, año, precio, ubicación y más. También puedes revisar y repetir tus búsquedas recientes desde tu cuenta.',
  },
  {
    id: 'b2',
    question: '¿Puedo agendar una cita para ver el vehículo?',
    answer:
      'Sí, a través de nuestra plataforma puedes contactar directamente al vendedor y coordinar citas para inspeccionar el vehículo. Te recomendamos hacer pruebas de manejo y llevar a un mecánico de confianza.',
  },
  {
    id: 'b3',
    question: '¿Qué debo verificar antes de comprar?',
    answer:
      'Verifica: documentación legal (factura, tarjeta de circulación), historial del vehículo, estado mecánico, kilometraje real, ausencia de multas o adeudos, y que el vendedor sea el propietario legítimo.',
  },
  {
    id: 'b4',
    question: '¿AutoSphere ofrece financiamiento?',
    answer:
      'No. En esta versión AutoSphere no ofrece financiamiento directo dentro de la plataforma.',
  },
  {
    id: 'b5',
    question: '¿Cómo contacto al vendedor?',
    answer:
      'Desde el detalle del vehículo puedes abrir el perfil público del anunciante y usar el flujo de cita para continuar con el contacto.',
  },
]);

const sellersFAQs = ref([
  {
    id: 's1',
    question: '¿Cómo publico mi vehículo?',
    answer:
      'Crea una cuenta, haz clic en "Publicar vehículo", completa el formulario con los datos del vehículo y revisa el resultado desde Mis publicaciones.',
  },
  {
    id: 's2',
    question: '¿Cuántas fotos puedo subir?',
    answer:
      'Puedes subir hasta 20 fotos por anuncio. Recomendamos incluir fotos del exterior desde todos los ángulos, interior, motor, tablero, kilometraje y cualquier detalle relevante.',
  },
  {
    id: 's3',
    question: '¿Cuánto tiempo tarda en venderse un auto?',
    answer:
      'El tiempo varía según precio, condición y demanda. Vehículos bien presentados y con precio competitivo pueden venderse en 1-4 semanas. Mantén tu anuncio actualizado y responde rápido a consultas.',
  },
  {
    id: 's4',
    question: '¿Puedo editar mi anuncio después de publicarlo?',
    answer:
      'Sí, puedes editar tu anuncio en cualquier momento desde tu panel de vendedor: actualizar precio, agregar o eliminar fotos, modificar descripción o pausar/activar la publicación.',
  },
  {
    id: 's5',
    question: '¿Qué hago si recibo ofertas bajas?',
    answer:
      'Puedes aceptar, rechazar o contraofertear. Mantén comunicación respetuosa, considera ofertas razonables y recuerda que un precio justo acelera la venta. También puedes marcar como "precio firme" si no aceptas regateos.',
  },
]);

const toggleFAQ = (id) => {
  openFAQ.value = openFAQ.value === id ? null : id;
};

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId;
};

const filteredGeneralFAQs = computed(() => {
  if (selectedCategory.value !== 'all' && selectedCategory.value !== 'general')
    return [];
  if (!searchQuery.value) return generalFAQs.value;
  return generalFAQs.value.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const filteredBuyersFAQs = computed(() => {
  if (selectedCategory.value !== 'all' && selectedCategory.value !== 'buyers')
    return [];
  if (!searchQuery.value) return buyersFAQs.value;
  return buyersFAQs.value.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const filteredSellersFAQs = computed(() => {
  if (selectedCategory.value !== 'all' && selectedCategory.value !== 'sellers')
    return [];
  if (!searchQuery.value) return sellersFAQs.value;
  return sellersFAQs.value.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// const goHome = () => {
//  router.push('/');
// };

const goToLogin = () => {
  router.push('/login');
};

const contactSupport = () => {
  console.log('Contactar soporte');
  // Aquí puedes abrir modal de contacto o navegar a página de soporte
};
</script>

<style scoped src="./styles.css"></style>
