<template>
  <section v-if="profile" class="public-profile-page">
    <header class="profile-hero card">
      <div class="hero-main">
        <p class="eyebrow">AutoSphere · Perfil público</p>
        <div class="identity-row">
          <div class="profile-avatar">{{ profileInitial }}</div>
          <div>
            <h1>{{ profile.displayName }}</h1>
            <p class="meta-line">
              {{ profile.surface === 'lessor' ? 'Arrendador' : 'Vendedor' }}
              <span>·</span>
              {{ locationLabel }}
            </p>
          </div>
        </div>
        <div class="hero-pills">
          <span v-if="profile.verified" class="meta-pill success">Verificado</span>
          <span class="meta-pill">{{ ratingLabel }}</span>
          <span class="meta-pill">{{ reviews.length }} reseñas</span>
        </div>
        <p class="summary">
          {{ profile.bio || 'Perfil disponible para revisar inventario, reseñas y datos públicos del anunciante.' }}
        </p>
      </div>

      <div class="stats-grid">
        <article class="stat-card">
          <strong>{{ inventory.length }}</strong>
          <span>Publicaciones activas</span>
        </article>
        <article class="stat-card">
          <strong>{{ averageRatingLabel }}</strong>
          <span>Calificación promedio</span>
        </article>
        <article class="stat-card">
          <strong>{{ reviews.length }}</strong>
          <span>Opiniones visibles</span>
        </article>
      </div>
    </header>

    <section class="card inventory-section">
      <div class="section-header">
        <div>
          <h2>Publicaciones del perfil</h2>
          <p class="section-copy">Superficie pública para ver el inventario visible de este vendedor o arrendador.</p>
        </div>
      </div>

      <div v-if="inventory.length" class="inventory-grid">
        <button
          v-for="item in inventory"
          :key="item.id"
          class="inventory-card"
          @click="openListing(item.id)"
        >
          <img :src="item.coverImage" :alt="item.title" />
          <div class="inventory-body">
            <strong>{{ item.title }}</strong>
            <span class="inventory-badge">{{ item.mode === 'rental' ? 'Renta' : 'Venta' }}</span>
            <p>{{ item.cityLabel || item.location?.city || 'Ubicación por confirmar' }}</p>
            <div class="inventory-price-row">
              <span class="label">{{ item.mode === 'rental' ? 'Tarifa' : 'Precio' }}</span>
              <span class="price">{{ priceLabel(item) }}</span>
            </div>
            <span class="inventory-cta">Ver publicación</span>
          </div>
        </button>
      </div>
      <p v-else class="empty-copy">Este perfil aún no tiene publicaciones activas.</p>
    </section>

    <section class="card reviews-section" id="reviews">
      <div class="section-header">
        <div>
          <h2>Reseñas visibles</h2>
          <p class="section-copy">Opiniones públicas disponibles para apoyar la reputación del perfil.</p>
        </div>
        <span class="meta-pill">{{ reviews.length }} registradas</span>
      </div>

      <div v-if="reviews.length" class="review-grid">
        <article v-for="review in reviews" :key="review.id" class="review-item">
          <div class="review-head">
            <div class="review-avatar">{{ reviewInitial(review.authorName) }}</div>
            <div>
              <strong>{{ review.authorName }}</strong>
              <span>{{ review.authorRole }} · {{ formatDate(review.createdAt) }}</span>
            </div>
            <span class="review-rating">{{ review.rating }}/5</span>
          </div>
          <p>{{ review.text }}</p>
        </article>
      </div>
      <p v-else class="empty-copy">Aún no hay reseñas visibles para este perfil.</p>
    </section>
  </section>

  <section v-else class="fallback-page card">
    <p class="eyebrow">Perfil público</p>
    <h1>Perfil no disponible</h1>
    <p>El perfil solicitado no existe o todavía no tiene datos públicos visibles.</p>
    <button @click="router.push({ name: 'public-catalog' })">Volver al catálogo</button>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPublicProfileById } from '../../../services/profiles.js';

const route = useRoute();
const router = useRouter();
const profile = ref(null);
const inventory = ref([]);
const reviews = ref([]);

const locationLabel = computed(() => {
  if (!profile.value) return '—';
  return [profile.value.city, profile.value.state].filter(Boolean).join(', ') || 'Sin ubicación pública';
});

const memberSinceLabel = computed(() => {
  if (!profile.value?.memberSince) return '—';
  return new Date(profile.value.memberSince).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
  });
});

const profileInitial = computed(() => String(profile.value?.displayName || 'A').trim().charAt(0).toUpperCase());

const averageRating = computed(() => {
  if (!reviews.value.length) return null;
  const total = reviews.value.reduce((sum, item) => sum + Number(item.rating || 0), 0);
  return total / reviews.value.length;
});

const averageRatingLabel = computed(() => averageRating.value ? averageRating.value.toFixed(1) : '—');
const ratingLabel = computed(() => averageRating.value ? `${averageRating.value.toFixed(1)} / 5` : 'Sin calificación');

function formatDate(value) {
  return new Date(value).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function priceLabel(item) {
  if (item.mode === 'rental') {
    return `$${new Intl.NumberFormat('es-MX').format(item.pricePerDay)} / día`;
  }

  return `$${new Intl.NumberFormat('es-MX').format(item.price)}`;
}

function reviewInitial(name) {
  return String(name || 'A').trim().charAt(0).toUpperCase();
}

function openListing(id) {
  router.push({ name: 'public-listing-detail', params: { id } });
}

onMounted(async () => {
  const response = await getPublicProfileById(route.params.id);
  profile.value = response;
  inventory.value = response?.inventory || [];
  reviews.value = response?.reviews || [];
});
</script>

<style scoped>
.public-profile-page,
.fallback-page {
  padding: 112px 24px 40px;
  display: grid;
  gap: 24px;
  max-width: 1240px;
  margin: 0 auto;
}

.card {
  background: #fff;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 16px 40px rgba(15, 30, 44, 0.08);
  border: 1px solid #e2e8f0;
}

.profile-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.9fr);
  gap: 24px;
  align-items: stretch;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 12px;
  color: #64748b;
  margin-bottom: 16px;
}

.identity-row {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}

.profile-avatar,
.review-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dbeafe;
  color: #1d4ed8;
  font-weight: 700;
  flex-shrink: 0;
}

.profile-avatar {
  width: 56px;
  height: 56px;
  font-size: 22px;
}

.profile-hero h1 {
  font-size: 32px;
  margin: 0 0 8px;
  color: #10213a;
}

.meta-line,
.summary,
.empty-copy,
.review-item p,
.inventory-card p,
.section-copy,
.fallback-page p {
  color: #475569;
}

.meta-line {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.hero-pills,
.section-header {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.hero-pills {
  margin-bottom: 16px;
  justify-content: flex-start;
}

.meta-pill {
  border-radius: 999px;
  padding: 8px 12px;
  background: #e2e8f0;
  color: #0f172a;
  font-size: 13px;
}

.meta-pill.success {
  background: #dcfce7;
  color: #166534;
}

.summary {
  max-width: 680px;
  line-height: 1.7;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.stat-card {
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 22px 18px;
  display: grid;
  gap: 8px;
  align-content: center;
  min-height: 110px;
}

.stat-card:last-child {
  grid-column: 1 / 2;
}

.stat-card strong {
  font-size: 38px;
  color: #10213a;
  line-height: 1;
}

.stat-card span {
  color: #0f172a;
  font-weight: 600;
}

.inventory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.inventory-card {
  border: 1px solid #e2e8f0;
  border-radius: 22px;
  background: #f8fafc;
  text-align: left;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.inventory-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(15, 30, 44, 0.1);
}

.inventory-card img {
  width: 100%;
  height: 170px;
  object-fit: cover;
}

.inventory-body {
  padding: 16px;
  display: grid;
  gap: 10px;
}

.inventory-body strong {
  font-size: 16px;
  color: #10213a;
}

.inventory-badge {
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-weight: 700;
  font-size: 12px;
}

.inventory-price-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #e2e8f0;
}

.label {
  color: #0f172a;
  font-weight: 700;
}

.price {
  color: #10213a;
  font-weight: 700;
}

.inventory-cta {
  width: fit-content;
  border-radius: 999px;
  background: #1d4ed8;
  color: #fff;
  padding: 10px 14px;
  font-weight: 700;
}

.review-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  margin-top: 16px;
}

.review-item {
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  padding: 18px;
  display: grid;
  gap: 12px;
}

.review-head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.review-head > div {
  display: grid;
  gap: 4px;
}

.review-head strong {
  color: #10213a;
}

.review-head span {
  color: #64748b;
  font-size: 14px;
}

.review-rating {
  margin-left: auto;
  border-radius: 999px;
  background: #e2e8f0;
  padding: 6px 10px;
  color: #1d4ed8 !important;
  font-weight: 700;
}

button {
  border: none;
}

.fallback-page button {
  width: fit-content;
  padding: 10px 16px;
  border-radius: 999px;
  background: #0f1e2c;
  color: white;
  cursor: pointer;
}

@media (max-width: 960px) {
  .profile-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .public-profile-page,
  .fallback-page {
    padding-inline: 16px;
  }

  .stats-grid,
  .review-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    align-items: flex-start;
  }
}
</style>
