<template>
  <div class="appointment-booking-page">
    <br /><br /><br /><br /><br /><br />

    <!-- Page Header -->
    <div class="page-header">
      <div class="header-container">
        <button class="back-btn" @click="goBack">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          Volver
        </button>
        <div>
          <h1 class="page-title">Agendar Cita</h1>
          <p class="page-subtitle">
            Completa el formulario para agendar una cita con el vendedor
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content-wrapper">
      <div class="booking-grid">
        <!-- FORMULARIO -->
        <div class="booking-form-card">
          <form @submit.prevent="submitAppointment">
            <!-- Vehículo de interés -->
            <div class="form-group">
              <label>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M16 21V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V21"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                Vehículo de interés *
              </label>
              <div class="vehicle-selector">
                <div
                  class="selected-vehicle"
                  @click="showVehicleSelector = true"
                >
                  <div class="vehicle-icon">
                    {{
                      selectedVehicle.icon ||
                      getVehicleIcon(selectedVehicle.type) ||
                      '🚗'
                    }}
                  </div>
                  <div class="vehicle-info">
                    <span class="vehicle-title">{{
                      selectedVehicle.title || 'Seleccionar vehículo'
                    }}</span>
                    <span v-if="selectedVehicle.price" class="vehicle-price"
                      >${{ formatPrice(selectedVehicle.price) }}</span
                    >
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                </div>
              </div>
              <input v-model="formData.vehicleId" type="hidden" required />
            </div>

            <!-- Fecha y hora -->
            <div class="form-row">
              <div class="form-group">
                <label>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <line
                      x1="8"
                      y1="2"
                      x2="8"
                      y2="6"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <line
                      x1="16"
                      y1="2"
                      x2="16"
                      y2="6"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                  Fecha preferida *
                </label>
                <input
                  v-model="formData.date"
                  type="date"
                  :min="minDate"
                  required
                />
              </div>
              <div class="form-group">
                <label>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M12 6V12L16 14"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                  Hora preferida *
                </label>
                <select v-model="formData.time" required>
                  <option v-if="availableTimes.length === 0" value="">
                    Sin horarios disponibles
                  </option>
                  <option value="">Seleccionar hora</option>
                  <option
                    v-for="slot in availableTimes"
                    :key="slot"
                    :value="slot"
                  >
                    {{ slot }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Información personal -->
            <div class="form-group">
              <label>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                Nombre completo *
              </label>
              <input
                v-model="formData.fullName"
                type="text"
                placeholder="Ej: Juan Pérez García"
                required
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 16.92V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V5C2 3.9 2.9 3 4 3H20C21.1 3 22 3.9 22 5"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M22 7L12 13L2 7"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                  Correo electrónico *
                </label>
                <input
                  v-model="formData.email"
                  type="email"
                  placeholder="ejemplo@email.com"
                  required
                />
              </div>
              <div class="form-group">
                <label>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 16.92V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V5C2 3.9 2.9 3 4 3H20C21.1 3 22 3.9 22 5"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M22 7L12 13L2 7"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                  Teléfono *
                </label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  placeholder="55 1234 5678"
                  required
                />
              </div>
            </div>

            <!-- Tipo de cita -->
            <div class="form-group">
              <label>Tipo de cita *</label>
              <div class="radio-group">
                <label class="radio-option">
                  <input
                    v-model="formData.appointmentType"
                    type="radio"
                    value="test-drive"
                  />
                  <span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg>
                    Test Drive
                  </span>
                </label>
                <label class="radio-option">
                  <input
                    v-model="formData.appointmentType"
                    type="radio"
                    value="inspection"
                  />
                  <span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <circle cx="9" cy="12" r="1" fill="currentColor" />
                      <circle cx="15" cy="12" r="1" fill="currentColor" />
                    </svg>
                    Inspección
                  </span>
                </label>
                <label class="radio-option">
                  <input
                    v-model="formData.appointmentType"
                    type="radio"
                    value="negotiation"
                  />
                  <span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg>
                    Negociación
                  </span>
                </label>
              </div>
            </div>

            <!-- Lugar de cita -->
            <div class="form-group">
              <label>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                Lugar de cita *
              </label>
              <select v-model="formData.location" required>
                <option value="">Seleccionar lugar</option>
                <option value="Concesionaria">Concesionaria AutoSphere</option>
                <option value="Domicilio">Domicilio del cliente</option>
                <option value="Público">Lugar público (plaza, café)</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <!-- Dirección (condicional) -->
            <div v-if="formData.location === 'Domicilio'" class="form-group">
              <label>Dirección completa *</label>
              <textarea
                v-model="formData.address"
                rows="2"
                placeholder="Calle, número, colonia, ciudad, CP"
                required
              ></textarea>
            </div>
            <div v-if="formData.location === 'Público'" class="form-group">
              <label>Lugar de encuentro *</label>
              <input
                v-model="formData.publicPlace"
                type="text"
                placeholder="Ej: Plaza Satélite, Café Starbucks, etc."
              />
            </div>

            <!-- Notas adicionales -->
            <div class="form-group">
              <label>Notas adicionales</label>
              <textarea
                v-model="formData.notes"
                rows="3"
                placeholder="Información adicional que quieras compartir con el vendedor..."
              ></textarea>
            </div>

            <!-- Términos y condiciones -->
            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input
                  v-model="formData.termsAccepted"
                  type="checkbox"
                  required
                />
                <span
                  >Acepto los
                  <a href="#" @click.prevent="showTerms"
                    >términos y condiciones</a
                  >
                  y políticas de privacidad *</span
                >
              </label>
            </div>

            <!-- Botones -->
            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="goBack">
                Cancelar
              </button>
              <button
                type="submit"
                class="btn-primary"
                :disabled="isSubmitting"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                {{ isSubmitting ? 'Agendando...' : 'Agendar Cita' }}
              </button>
            </div>
          </form>
        </div>

        <!-- COLUMNA DERECHA - Información del vehículo -->
        <div class="booking-info-card">
          <!-- Vehículo seleccionado -->
          <div class="vehicle-preview">
            <div class="preview-header">
              <span class="preview-icon">🚗</span>
              <h3>Vehículo seleccionado</h3>
            </div>
            <div v-if="selectedVehicle.id" class="vehicle-detail-preview">
              <div class="preview-image">
                <img
                  :src="selectedVehicle.coverImage"
                  :alt="selectedVehicle.title"
                  @error="handleImageError"
                />
              </div>
              <h4>{{ selectedVehicle.title }}</h4>
              <div class="preview-specs">
                <span>{{ selectedVehicle.year }}</span>
                <span>•</span>
                <span
                  >{{
                    formatNumber(
                      selectedVehicle.mileageKm ||
                        selectedVehicle.specs?.kilometraje
                    )
                  }}
                  km</span
                >
                <span>•</span>
                <span>{{
                  selectedVehicle.transmission ||
                  selectedVehicle.specs?.transmisión
                }}</span>
              </div>
              <div class="preview-price">
                ${{ formatPrice(selectedVehicle.price) }}
              </div>
              <div class="preview-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                {{
                  selectedVehicle.location?.city ||
                  getCityName(selectedVehicle.cityId)
                }}, {{ selectedVehicle.location?.state || '' }}
              </div>
              <div class="preview-type">
                <span
                  class="type-badge"
                  :class="getTypeClass(selectedVehicle.type)"
                >
                  {{ selectedVehicle.type }}
                </span>
                <span
                  v-if="isRentalVehicle(selectedVehicle.id)"
                  class="type-badge rental"
                >
                  En Renta
                </span>
                <span v-else class="type-badge sale"> En Venta </span>
              </div>
            </div>
            <div v-else class="no-vehicle">
              <p>Selecciona un vehículo para continuar</p>
            </div>
          </div>

          <!-- Consejos para la cita -->
          <div class="tips-card">
            <div class="tips-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M12 6V12L16 14"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
              <h3>Consejos para tu cita</h3>
            </div>
            <ul class="tips-list">
              <li>📄 Lleva identificación oficial</li>
              <li>💰 Si es para compra, lleva tu presupuesto claro</li>
              <li>🔧 Pregunta por el historial de mantenimiento</li>
              <li>📸 Toma fotos durante la inspección</li>
              <li>📝 Revisa bien el contrato antes de firmar</li>
            </ul>
          </div>

          <!-- Contacto de soporte -->
          <div class="contact-card">
            <div class="contact-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
              <h3>¿Necesitas ayuda?</h3>
            </div>
            <p>Contáctanos al <strong>800-123-4567</strong></p>
            <p>o envía un correo a <strong>soporte@autosphere.com</strong></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Vehicle Selector Modal -->
    <div
      v-if="showVehicleSelector"
      class="modal-overlay"
      @click.self="showVehicleSelector = false"
    >
      <div class="modal-container">
        <div class="modal-header">
          <h3>Seleccionar vehículo</h3>
          <button class="modal-close" @click="showVehicleSelector = false">
            ×
          </button>
        </div>
        <div class="modal-body">
          <div class="vehicle-tabs">
            <button
              :class="['vehicle-tab', { active: vehicleTab === 'venta' }]"
              @click="vehicleTab = 'venta'"
            >
              🚗 Venta ({{ salesVehicles.length }})
            </button>
            <button
              :class="['vehicle-tab', { active: vehicleTab === 'renta' }]"
              @click="vehicleTab = 'renta'"
            >
              📋 Renta ({{ rentalVehicles.length }})
            </button>
          </div>
          <div class="vehicle-search">
            <input
              v-model="vehicleSearch"
              type="text"
              placeholder="Buscar vehículo..."
            />
          </div>
          <div class="vehicle-list">
            <div
              v-for="vehicle in filteredVehicles"
              :key="vehicle.id"
              class="vehicle-option"
              @click="selectVehicle(vehicle)"
            >
              <div class="vehicle-option-icon">
                {{ getVehicleIcon(vehicle.type) }}
              </div>
              <div class="vehicle-option-info">
                <span class="vehicle-option-title">{{ vehicle.title }}</span>
                <span class="vehicle-option-price"
                  >${{ formatPrice(vehicle.price) }}</span
                >
                <span class="vehicle-option-type"
                  >{{ vehicle.type }} • {{ vehicle.year }}</span
                >
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast-notification" :class="toastType">
      <span>{{ toastMessage }}</span>
      <button class="toast-close" @click="showToast = false">×</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../../stores/auth.js';
import {
  createAppointment,
  getAppointmentSlots,
} from '../../../services/appointments.js';
import { getListingById, getListings } from '../../../services/catalog.js';

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('success');

const showNotification = (message, type = 'success') => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const isSubmitting = ref(false);
const showVehicleSelector = ref(false);
const vehicleSearch = ref('');
const vehicleTab = ref('venta');
const availableTimes = ref([]);

const formData = ref({
  vehicleId: '',
  date: '',
  time: '',
  fullName: auth.user?.name || '',
  email: auth.user?.email || '',
  phone: auth.user?.phone || '',
  appointmentType: 'test-drive',
  location: '',
  address: '',
  publicPlace: '',
  notes: '',
  termsAccepted: false,
});

const selectedVehicle = ref({});
const salesVehicles = ref([]);
const rentalVehicles = ref([]);

const loadVehicles = async () => {
  const [sales, rentals] = await Promise.all([
    getListings({ mode: 'venta', pageSize: 100 }),
    getListings({ mode: 'renta', pageSize: 100 }),
  ]);
  salesVehicles.value = sales?.items || [];
  rentalVehicles.value = rentals?.items || [];
};

const allVehicles = computed(() =>
  vehicleTab.value === 'venta' ? salesVehicles.value : rentalVehicles.value
);

const filteredVehicles = computed(() => {
  if (!vehicleSearch.value) return allVehicles.value;
  const query = vehicleSearch.value.toLowerCase();
  return allVehicles.value.filter((vehicle) =>
    [vehicle.title, vehicle.brand, vehicle.model, vehicle.type]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query))
  );
});

const isRentalVehicle = (id) => id && String(id).startsWith('rt-');

const getVehicleIcon = (type) => {
  const icons = {
    SUV: '🚙',
    Sedán: '🚗',
    Pickup: '🛻',
    Hatchback: '🚘',
    Deportivo: '🏎️',
  };
  return icons[type] || '🚗';
};

const getTypeClass = (type) => {
  const classes = {
    SUV: 'suv',
    Sedán: 'sedan',
    Pickup: 'pickup',
    Hatchback: 'hatchback',
    Deportivo: 'sport',
  };
  return classes[type] || 'sedan';
};

const getCityName = (cityId) => {
  const cities = {
    'mx-cdmx': 'Ciudad de México',
    'mx-gdl': 'Guadalajara',
    'mx-mty': 'Monterrey',
    'mx-pue': 'Puebla',
    'mx-mer': 'Mérida',
  };
  return cities[cityId] || cityId || 'Ciudad por confirmar';
};

const minDate = computed(() => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today.toISOString().split('T')[0];
});

const formatPrice = (price) =>
  new Intl.NumberFormat('es-MX').format(price || 0);
const formatNumber = (num) => new Intl.NumberFormat('es-MX').format(num || 0);

const handleImageError = (event) => {
  event.target.src =
    'https://placehold.co/400x300/2d5179/ffffff?text=AutoSphere';
};

const selectVehicle = (vehicle) => {
  selectedVehicle.value = vehicle;
  formData.value.vehicleId = vehicle.id;
  formData.value.location = vehicle.location?.addressLabel
    ? 'Concesionaria'
    : formData.value.location;
  showVehicleSelector.value = false;
  vehicleSearch.value = '';
};

const goBack = () => {
  if (window.history.length > 1) router.back();
  else
    router.push({
      name: 'public-listing-detail',
      params: { id: route.params.id },
    });
};

const loadSlots = async () => {
  if (!formData.value.vehicleId || !formData.value.date) {
    availableTimes.value = [
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
    ];
    return;
  }
  const slotData = await getAppointmentSlots(formData.value.vehicleId, {
    date: formData.value.date,
  });
  const slots = slotData?.slots || [];
  availableTimes.value = slots.map((slot) => slot.time);
  if (!availableTimes.value.includes(formData.value.time)) {
    formData.value.time = '';
  }
};

watch(() => formData.value.date, loadSlots);
watch(() => formData.value.vehicleId, loadSlots);

const submitAppointment = async () => {
  if (!formData.value.termsAccepted) {
    showNotification('Debes aceptar los términos y condiciones', 'error');
    return;
  }

  if (!selectedVehicle.value.id) {
    showNotification('Debes seleccionar un vehículo', 'error');
    return;
  }

  isSubmitting.value = true;

  try {
    const created = await createAppointment({
      listingId: selectedVehicle.value.id,
      buyerId: auth.user?.id || 'u-buyer-001',
      buyerName: formData.value.fullName,
      date: formData.value.date,
      time: formData.value.time,
      notes: formData.value.notes,
      locationLabel:
        formData.value.location === 'Domicilio'
          ? formData.value.address
          : formData.value.location === 'Público'
            ? formData.value.publicPlace
            : selectedVehicle.value.location?.addressLabel ||
              selectedVehicle.value.cityLabel ||
              'Ubicación por confirmar',
    });

    router.push({
      name: 'public-appointment-success',
      params: { id: selectedVehicle.value.id },
      query: { appointmentId: created.id },
    });
  } finally {
    isSubmitting.value = false;
  }
};

const showTerms = () => {
  router.push({ name: 'public-terms' });
};

onMounted(async () => {
  await loadVehicles();
  const listingId = route.params.id || route.query.vehicle;
  if (listingId) {
    const listing = await getListingById(listingId);
    if (listing) {
      selectVehicle(listing);
      vehicleTab.value = isRentalVehicle(listing.id) ? 'renta' : 'venta';
    }
  }
  await loadSlots();
});
</script>

<style scoped src="./styles.css"></style>
