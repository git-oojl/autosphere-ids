<template>
  <section v-if="listing" class="listing-page">
    <header class="hero">
      <div>
        <p class="eyebrow">Mis publicaciones</p>
        <h1>{{ listing.title }}</h1>
        <p class="hero-copy">
          Vista interna de la publicación para revisar su estado, disponibilidad
          y citas relacionadas.
        </p>
      </div>
      <div class="hero-actions">
        <button type="button" class="secondary" @click="goBackToListings">
          Volver a publicaciones
        </button>
        <button type="button" @click="openEditInList">Editar en lista</button>
      </div>
    </header>

    <div class="content-grid">
      <article class="card media-card">
        <img :src="listing.coverImage" :alt="listing.title" class="cover" />
        <div class="hero-meta">
          <span>{{ listing.mode === 'rental' ? 'Renta' : 'Venta' }}</span>
          <span>{{ statusLabel }}</span>
          <span>{{
            listing.cityLabel ||
            listing.location?.city ||
            'Ubicación por confirmar'
          }}</span>
        </div>
        <div class="price-block">
          <strong>{{ priceLabel }}</strong>
          <span
            v-if="
              listing.mode === 'rental' &&
              listing.pricePerWeek &&
              listing.pricePerMonth
            "
          >
            {{ weeklyMonthlyLabel }}
          </span>
        </div>
        <p class="description">
          {{ listing.description || 'Sin descripción pública registrada.' }}
        </p>
      </article>

      <article class="card summary-card">
        <h2>Acciones rápidas</h2>
        <div class="actions">
          <button type="button" @click="openEditInList">
            Editar publicación
          </button>
          <button type="button" class="secondary" @click="openPublicView">
            Vista pública
          </button>
          <button
            type="button"
            class="secondary"
            @click="goToRelatedAppointments"
          >
            Ver citas relacionadas
          </button>
        </div>

        <div class="summary-grid">
          <div>
            <span class="label">Estado</span>
            <strong>{{ statusLabel }}</strong>
          </div>
          <div>
            <span class="label">Modalidad</span>
            <strong>{{ listing.mode === 'rental' ? 'Renta' : 'Venta' }}</strong>
          </div>
          <div>
            <span class="label">Citas relacionadas</span>
            <strong>{{ relatedAppointments.length }}</strong>
          </div>
          <div>
            <span class="label">Última actualización</span>
            <strong>{{
              formatDate(listing.updatedAt || listing.createdAt)
            }}</strong>
          </div>
        </div>
      </article>
    </div>

    <div class="content-grid lower-grid">
      <article class="card details-card">
        <h2>Ficha de la publicación</h2>
        <div class="details-grid">
          <div>
            <span class="label">Marca</span
            ><strong>{{ listing.brand || '—' }}</strong>
          </div>
          <div>
            <span class="label">Modelo</span
            ><strong>{{ listing.model || '—' }}</strong>
          </div>
          <div>
            <span class="label">Año</span
            ><strong>{{ listing.year || '—' }}</strong>
          </div>
          <div>
            <span class="label">Transmisión</span
            ><strong>{{ listing.transmission || '—' }}</strong>
          </div>
          <div>
            <span class="label">Combustible</span
            ><strong>{{ listing.fuel || '—' }}</strong>
          </div>
          <div>
            <span class="label">Kilometraje</span
            ><strong>{{ mileageLabel }}</strong>
          </div>
        </div>
        <div v-if="listing.mode === 'rental'" class="availability-panel">
          <span class="label">Disponibilidad</span>
          <strong>{{
            listing.available ? 'Disponible' : 'No disponible'
          }}</strong>
          <p>
            {{ formatDate(listing.availableFrom) }}
            <span v-if="listing.availableTo"
              >— {{ formatDate(listing.availableTo) }}</span
            >
          </p>
        </div>
      </article>

      <article class="card appointments-card">
        <div class="appointments-header">
          <div>
            <h2>Citas relacionadas</h2>
            <p>Solicitudes vinculadas a esta publicación.</p>
          </div>
          <button
            type="button"
            class="secondary"
            @click="goToRelatedAppointments"
          >
            Abrir en Mis citas
          </button>
        </div>

        <div v-if="relatedAppointments.length" class="appointments-list">
          <div
            v-for="appointment in relatedAppointments"
            :key="appointment.id"
            class="appointment-item"
          >
            <div>
              <strong>{{
                appointment.buyer?.name ||
                appointment.buyerName ||
                'Cliente AutoSphere'
              }}</strong>
              <p>
                {{ formatDate(appointment.date) }} ·
                {{ appointment.time || 'Horario por confirmar' }}
              </p>
            </div>
            <button
              type="button"
              class="ghost"
              @click="openAppointment(appointment.id)"
            >
              {{ appointmentStatusLabel(appointment.status) }}
            </button>
          </div>
        </div>
        <div v-else class="empty-state">
          <p>No hay citas registradas para esta publicación todavía.</p>
        </div>
      </article>
    </div>
  </section>

  <section v-else class="listing-page">
    <div class="card not-found-card">
      <h1>Publicación no encontrada</h1>
      <p>
        La publicación solicitada ya no está disponible o no pertenece a esta
        vista.
      </p>
      <button type="button" @click="goBackToListings">Volver</button>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getListingById } from '../../../services/catalog.js';
import { getAppointments } from '../../../services/appointments.js';

const route = useRoute();
const router = useRouter();

const listing = ref(null);
const relatedAppointments = ref([]);

const formatCurrency = (value) =>
  `$${new Intl.NumberFormat('es-MX').format(value || 0)}`;
const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const statusLabel = computed(
  () =>
    ({
      published: 'Activa',
      draft: 'Borrador',
      archived: 'Archivada',
      sold: 'Vendida',
      unavailable: 'No disponible',
    })[listing.value?.status] ||
    listing.value?.status ||
    'Sin estado'
);

const priceLabel = computed(() => {
  if (!listing.value) return '—';
  return listing.value.mode === 'rental'
    ? `${formatCurrency(listing.value.pricePerDay)} / día`
    : formatCurrency(listing.value.price);
});

const weeklyMonthlyLabel = computed(() => {
  if (!listing.value || listing.value.mode !== 'rental') return '';
  return `${formatCurrency(listing.value.pricePerWeek)} / semana · ${formatCurrency(listing.value.pricePerMonth)} / mes`;
});

const mileageLabel = computed(() => {
  if (!listing.value) return '—';
  if (listing.value.mileageKm)
    return `${new Intl.NumberFormat('es-MX').format(listing.value.mileageKm)} km`;
  if (listing.value.kmIncludedPerDay)
    return `${new Intl.NumberFormat('es-MX').format(listing.value.kmIncludedPerDay)} km / día`;
  return '—';
});

const appointmentStatusLabel = (status) =>
  ({
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    completed: 'Completada',
    cancelled: 'Cancelada',
    rescheduled: 'Reagendada',
  })[status] ||
  status ||
  'Sin estado';

const listingModeQuery = computed(() =>
  listing.value?.mode === 'rental' ? 'rental' : 'sale'
);

const goBackToListings = () => {
  router.push({
    name: 'user-listings',
    query: { mode: listingModeQuery.value },
  });
};

const openEditInList = () => {
  router.push({
    name: 'user-listings',
    query: {
      mode: listingModeQuery.value,
      edit: listing.value.id,
    },
  });
};

const openPublicView = () => {
  window.open(
    router.resolve({
      name: 'public-listing-detail',
      params: { id: listing.value.id },
    }).href,
    '_blank'
  );
};

const goToRelatedAppointments = () => {
  router.push({
    name: 'my-appointments',
    query: {
      tab: listing.value.mode === 'rental' ? 'rentador' : 'vendedor',
      vehicle: listing.value.title,
    },
  });
};

const openAppointment = (id) => {
  router.push({ name: 'seller-appointment-detail', params: { id } });
};

onMounted(async () => {
  listing.value = await getListingById(route.params.id);
  if (!listing.value) return;
  relatedAppointments.value = await getAppointments({
    listingId: listing.value.id,
    sellerId: listing.value.sellerId,
    sort: 'date_asc',
  });
});
</script>

<style scoped>
.listing-page {
  padding: 112px 24px 40px;
  display: grid;
  gap: 24px;
  background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

.hero,
.card {
  background: #fff;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 16px 40px rgba(15, 30, 44, 0.08);
  border: 1px solid #e2e8f0;
}

.hero {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
}

.hero h1 {
  font-size: 32px;
  color: #10213a;
  margin: 0 0 8px;
}

.hero-copy {
  color: #51627b;
  margin: 0;
}

.hero-actions,
.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

button {
  border: none;
  border-radius: 999px;
  padding: 12px 18px;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}

button.secondary,
button.ghost {
  background: #eef4ff;
  color: #17345f;
}

.content-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 24px;
}

.lower-grid {
  align-items: start;
}

.cover {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 18px;
  margin-bottom: 18px;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
}

.hero-meta span,
.label {
  color: #64748b;
}

.hero-meta span {
  padding: 6px 12px;
  border-radius: 999px;
  background: #f1f5f9;
  font-weight: 600;
}

.price-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
}

.price-block strong {
  font-size: 24px;
  color: #0f172a;
}

.price-block span,
.description,
.appointments-header p,
.appointment-item p,
.empty-state p {
  color: #51627b;
}

.summary-card h2,
.details-card h2,
.appointments-card h2 {
  margin: 0 0 16px;
  color: #10213a;
}

.summary-grid,
.details-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.summary-grid div,
.details-grid div,
.availability-panel {
  padding: 16px;
  border-radius: 18px;
  background: #f8fbff;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.summary-grid strong,
.details-grid strong,
.availability-panel strong {
  color: #0f172a;
}

.availability-panel {
  margin-top: 16px;
}

.appointments-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-bottom: 18px;
}

.appointments-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.appointment-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  padding: 14px 16px;
  border-radius: 18px;
  background: #f8fbff;
}

.empty-state {
  padding: 18px;
  border-radius: 18px;
  background: #f8fbff;
}

.not-found-card {
  max-width: 560px;
}

@media (max-width: 960px) {
  .hero,
  .content-grid {
    grid-template-columns: 1fr;
    display: grid;
  }

  .hero {
    align-items: start;
  }
}

@media (max-width: 640px) {
  .listing-page {
    padding: 104px 16px 32px;
  }

  .summary-grid,
  .details-grid {
    grid-template-columns: 1fr;
  }

  .appointments-header,
  .appointment-item {
    flex-direction: column;
    align-items: start;
  }
}
</style>
