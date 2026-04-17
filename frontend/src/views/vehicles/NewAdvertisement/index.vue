<template>
  <div class="create-listing-page">
    <!-- MAIN CONTENT -->
    <div class="content-wrapper">
      <br /><br /><br /><br />
      <div class="content-container">
        <!-- HEADER -->
        <div class="page-header">
          <div class="header-left">
            <div class="header-content">
              <h1 class="page-title">Crear Nuevo Anuncio</h1>
              <p class="page-subtitle">
                Completa la información para publicar tu vehículo
              </p>
            </div>
          </div>
        </div>

        <!-- STEP INDICATOR -->
        <div class="steps-container">
          <div
            class="step"
            :class="{ active: currentStep === 1, completed: currentStep > 1 }"
            @click="goToStep(1)"
          >
            <div class="step-number">
              <svg
                v-if="currentStep > 1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span v-else>1</span>
            </div>
            <div class="step-info">
              <span class="step-title">Tipo de Anuncio</span>
              <span class="step-desc">Venta o Renta</span>
            </div>
          </div>

          <div class="step-divider"></div>

          <div
            class="step"
            :class="{ active: currentStep === 2, completed: currentStep > 2 }"
            @click="goToStep(2)"
          >
            <div class="step-number">
              <svg
                v-if="currentStep > 2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span v-else>2</span>
            </div>
            <div class="step-info">
              <span class="step-title">Información del Vehículo</span>
              <span class="step-desc">Detalles básicos</span>
            </div>
          </div>

          <div class="step-divider"></div>

          <div
            class="step"
            :class="{ active: currentStep === 3, completed: currentStep > 3 }"
            @click="goToStep(3)"
          >
            <div class="step-number">
              <svg
                v-if="currentStep > 3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span v-else>3</span>
            </div>
            <div class="step-info">
              <span class="step-title">Características</span>
              <span class="step-desc">Extras y estado</span>
            </div>
          </div>

          <div class="step-divider"></div>

          <div
            class="step"
            :class="{ active: currentStep === 4, completed: currentStep > 4 }"
            @click="goToStep(4)"
          >
            <div class="step-number">
              <svg
                v-if="currentStep > 4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span v-else>4</span>
            </div>
            <div class="step-info">
              <span class="step-title">Fotos y Precio</span>
              <span class="step-desc">Imágenes y valor</span>
            </div>
          </div>
        </div>

        <!-- FORM CONTENT -->
        <form class="listing-form" @submit.prevent="submitListing">
          <!-- STEP 1: LISTING TYPE -->
          <div v-if="currentStep === 1" class="form-step">
            <div class="step-card">
              <div class="step-card-header">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
                </svg>
                <h2>¿Qué tipo de anuncio deseas crear?</h2>
              </div>

              <div class="listing-type-grid">
                <label
                  class="type-card"
                  :class="{ selected: formData.listingType === 'sale' }"
                >
                  <input
                    v-model="formData.listingType"
                    type="radio"
                    value="sale"
                    name="listingType"
                  />
                  <div class="type-icon sale">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path
                        d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"
                      />
                    </svg>
                  </div>
                  <h3>Venta</h3>
                  <p>Publicar vehículo para vender</p>
                  <div class="check-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </label>

                <label
                  class="type-card"
                  :class="{ selected: formData.listingType === 'rent' }"
                >
                  <input
                    v-model="formData.listingType"
                    type="radio"
                    value="rent"
                    name="listingType"
                  />
                  <div class="type-icon rent">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <h3>Renta</h3>
                  <p>Publicar vehículo para rentar</p>
                  <div class="check-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- STEP 2: VEHICLE INFORMATION -->
          <div v-if="currentStep === 2" class="form-step">
            <div class="step-card">
              <div class="step-card-header">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M5 17H4a2 2 0 01-2-2V9.5M7 17a2 2 0 100-4M17 17a2 2 0 100-4"
                  />
                </svg>
                <h2>Información del Vehículo</h2>
              </div>

              <div class="form-grid">
                <!-- MARCA -->
                <div class="form-group">
                  <label class="form-label">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    Marca
                  </label>
                  <select v-model="formData.brand" class="form-input" required>
                    <option value="">Selecciona una marca</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Mazda">Mazda</option>
                    <option value="Ford">Ford</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Audi">Audi</option>
                    <option value="Kia">Kia</option>
                    <option value="Hyundai">Hyundai</option>
                  </select>
                </div>

                <!-- MODELO -->
                <div class="form-group">
                  <label class="form-label">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M5 17H4a2 2 0 01-2-2V9.5M7 17a2 2 0 100-4M17 17a2 2 0 100-4"
                      />
                    </svg>
                    Modelo
                  </label>
                  <input
                    v-model="formData.model"
                    type="text"
                    class="form-input"
                    placeholder="Ej: Corolla"
                    required
                  />
                </div>

                <!-- AÑO -->
                <div class="form-group">
                  <label class="form-label">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Año
                  </label>
                  <select v-model="formData.year" class="form-input" required>
                    <option value="">Selecciona año</option>
                    <option v-for="year in years" :key="year" :value="year">
                      {{ year }}
                    </option>
                  </select>
                </div>

                <!-- TIPO DE VEHÍCULO -->
                <div class="form-group">
                  <label class="form-label">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    Tipo de Vehículo
                  </label>
                  <select
                    v-model="formData.vehicleType"
                    class="form-input"
                    required
                  >
                    <option value="">Selecciona tipo</option>
                    <option value="sedan">Sedán</option>
                    <option value="suv">SUV</option>
                    <option value="pickup">Pickup</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="coupe">Coupé</option>
                    <option value="van">Van</option>
                    <option value="convertible">Convertible</option>
                  </select>
                </div>

                <!-- KILOMETRAJE -->
                <div class="form-group">
                  <label class="form-label">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    Kilometraje
                  </label>
                  <input
                    v-model.number="formData.mileage"
                    type="number"
                    class="form-input"
                    placeholder="Ej: 35000"
                    min="0"
                    required
                  />
                </div>

                <!-- COLOR -->
                <div class="form-group">
                  <label class="form-label">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    Color
                  </label>
                  <input
                    v-model="formData.color"
                    type="text"
                    class="form-input"
                    placeholder="Ej: Blanco"
                    required
                  />
                </div>

                <!-- TRANSMISIÓN -->
                <div class="form-group">
                  <label class="form-label">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1v6m0 6v6" />
                    </svg>
                    Transmisión
                  </label>
                  <select
                    v-model="formData.transmission"
                    class="form-input"
                    required
                  >
                    <option value="">Selecciona</option>
                    <option value="manual">Manual</option>
                    <option value="automatic">Automática</option>
                    <option value="cvt">CVT</option>
                  </select>
                </div>

                <!-- COMBUSTIBLE -->
                <div class="form-group">
                  <label class="form-label">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M3 22h12M5.5 22V7a2 2 0 012-2h5a2 2 0 012 2v15M6 5V3"
                      />
                    </svg>
                    Combustible
                  </label>
                  <select
                    v-model="formData.fuelType"
                    class="form-input"
                    required
                  >
                    <option value="">Selecciona</option>
                    <option value="gasoline">Gasolina</option>
                    <option value="diesel">Diésel</option>
                    <option value="electric">Eléctrico</option>
                    <option value="hybrid">Híbrido</option>
                  </select>
                </div>

                <!-- NÚMERO DE PUERTAS -->
                <div class="form-group">
                  <label class="form-label">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                    Número de Puertas
                  </label>
                  <select
                    v-model.number="formData.doors"
                    class="form-input"
                    required
                  >
                    <option value="">Selecciona</option>
                    <option :value="2">2 puertas</option>
                    <option :value="4">4 puertas</option>
                    <option :value="5">5 puertas</option>
                  </select>
                </div>

                <!-- PASAJEROS -->
                <div class="form-group">
                  <label class="form-label">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path
                        d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                      />
                    </svg>
                    Capacidad de Pasajeros
                  </label>
                  <select
                    v-model.number="formData.passengers"
                    class="form-input"
                    required
                  >
                    <option value="">Selecciona</option>
                    <option :value="2">2 pasajeros</option>
                    <option :value="4">4 pasajeros</option>
                    <option :value="5">5 pasajeros</option>
                    <option :value="7">7 pasajeros</option>
                    <option :value="8">8 pasajeros</option>
                  </select>
                </div>

                <!-- PLACA -->
                <div class="form-group">
                  <label class="form-label">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <rect x="3" y="7" width="18" height="10" rx="2" />
                    </svg>
                    Placa
                  </label>
                  <input
                    v-model="formData.licensePlate"
                    type="text"
                    class="form-input"
                    placeholder="Ej: ABC-123"
                    required
                  />
                </div>

                <!-- VIN -->
                <div class="form-group">
                  <label class="form-label">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11v3" />
                    </svg>
                    VIN (Opcional)
                  </label>
                  <input
                    v-model="formData.vin"
                    type="text"
                    class="form-input"
                    placeholder="Número de identificación"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 3: FEATURES -->
          <div v-if="currentStep === 3" class="form-step">
            <div class="step-card">
              <div class="step-card-header">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                <h2>Características y Estado</h2>
              </div>

              <!-- ESTADO DEL VEHÍCULO -->
              <div class="form-section">
                <h3 class="section-title">Estado del Vehículo</h3>
                <div class="radio-grid">
                  <label class="radio-card">
                    <input
                      v-model="formData.condition"
                      type="radio"
                      value="new"
                      name="condition"
                    />
                    <div class="radio-content">
                      <div class="radio-icon new">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                          />
                        </svg>
                      </div>
                      <span class="radio-title">Nuevo</span>
                      <span class="radio-desc">0 km, sin uso</span>
                    </div>
                  </label>

                  <label class="radio-card">
                    <input
                      v-model="formData.condition"
                      type="radio"
                      value="used-excellent"
                      name="condition"
                    />
                    <div class="radio-content">
                      <div class="radio-icon excellent">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
                        </svg>
                      </div>
                      <span class="radio-title">Usado - Excelente</span>
                      <span class="radio-desc">Como nuevo</span>
                    </div>
                  </label>

                  <label class="radio-card">
                    <input
                      v-model="formData.condition"
                      type="radio"
                      value="used-good"
                      name="condition"
                    />
                    <div class="radio-content">
                      <div class="radio-icon good">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                          <path d="M22 4L12 14.01l-3-3" />
                        </svg>
                      </div>
                      <span class="radio-title">Usado - Bueno</span>
                      <span class="radio-desc">Buen estado</span>
                    </div>
                  </label>

                  <label class="radio-card">
                    <input
                      v-model="formData.condition"
                      type="radio"
                      value="used-fair"
                      name="condition"
                    />
                    <div class="radio-content">
                      <div class="radio-icon fair">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v4M12 16h.01" />
                        </svg>
                      </div>
                      <span class="radio-title">Usado - Regular</span>
                      <span class="radio-desc">Detalles menores</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- CARACTERÍSTICAS ADICIONALES -->
              <div class="form-section">
                <h3 class="section-title">Características Adicionales</h3>
                <div class="features-grid">
                  <label class="feature-checkbox">
                    <input
                      v-model="formData.features"
                      type="checkbox"
                      value="airConditioning"
                    />
                    <svg
                      class="check-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Aire Acondicionado</span>
                  </label>

                  <label class="feature-checkbox">
                    <input
                      v-model="formData.features"
                      type="checkbox"
                      value="abs"
                    />
                    <svg
                      class="check-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>ABS</span>
                  </label>

                  <label class="feature-checkbox">
                    <input
                      v-model="formData.features"
                      type="checkbox"
                      value="airbags"
                    />
                    <svg
                      class="check-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Airbags</span>
                  </label>

                  <label class="feature-checkbox">
                    <input
                      v-model="formData.features"
                      type="checkbox"
                      value="bluetooth"
                    />
                    <svg
                      class="check-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Bluetooth</span>
                  </label>

                  <label class="feature-checkbox">
                    <input
                      v-model="formData.features"
                      type="checkbox"
                      value="cruiseControl"
                    />
                    <svg
                      class="check-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Control de Crucero</span>
                  </label>

                  <label class="feature-checkbox">
                    <input
                      v-model="formData.features"
                      type="checkbox"
                      value="gps"
                    />
                    <svg
                      class="check-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>GPS</span>
                  </label>

                  <label class="feature-checkbox">
                    <input
                      v-model="formData.features"
                      type="checkbox"
                      value="leatherSeats"
                    />
                    <svg
                      class="check-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Asientos de Cuero</span>
                  </label>

                  <label class="feature-checkbox">
                    <input
                      v-model="formData.features"
                      type="checkbox"
                      value="sunroof"
                    />
                    <svg
                      class="check-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Quemacocos</span>
                  </label>

                  <label class="feature-checkbox">
                    <input
                      v-model="formData.features"
                      type="checkbox"
                      value="reverseCamera"
                    />
                    <svg
                      class="check-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Cámara de Reversa</span>
                  </label>

                  <label class="feature-checkbox">
                    <input
                      v-model="formData.features"
                      type="checkbox"
                      value="parkingSensors"
                    />
                    <svg
                      class="check-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Sensores de Estacionamiento</span>
                  </label>

                  <label class="feature-checkbox">
                    <input
                      v-model="formData.features"
                      type="checkbox"
                      value="aluminumWheels"
                    />
                    <svg
                      class="check-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Rines de Aluminio</span>
                  </label>

                  <label class="feature-checkbox">
                    <input
                      v-model="formData.features"
                      type="checkbox"
                      value="fogLights"
                    />
                    <svg
                      class="check-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Faros Antiniebla</span>
                  </label>
                </div>
              </div>

              <!-- DESCRIPCIÓN -->
              <div class="form-section">
                <h3 class="section-title">Descripción Detallada</h3>
                <div class="form-group">
                  <label class="form-label">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                      />
                      <path
                        d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                      />
                    </svg>
                    Describe tu vehículo
                  </label>
                  <textarea
                    v-model="formData.description"
                    class="form-textarea"
                    rows="6"
                    placeholder="Incluye información relevante como: historial de mantenimiento, estado de las llantas, servicios recientes, razón de venta..."
                    required
                  ></textarea>
                  <span class="character-count"
                    >{{ formData.description.length }} / 1000 caracteres</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 4: PHOTOS AND PRICE -->
          <div v-if="currentStep === 4" class="form-step">
            <div class="step-card">
              <div class="step-card-header">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <h2>Fotos y Precio</h2>
              </div>

              <!-- FOTOS -->
              <div class="form-section">
                <h3 class="section-title">Fotos del Vehículo</h3>
                <p class="section-desc">
                  Sube entre 3 y 10 fotos de alta calidad. La primera será la
                  foto principal.
                </p>

                <div
                  class="upload-area"
                  @click="triggerFileInput"
                  @dragover.prevent
                  @drop.prevent="handleDrop"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    multiple
                    style="display: none"
                    @change="handleFileSelect"
                  />
                  <div class="upload-content">
                    <div class="upload-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                        />
                      </svg>
                    </div>
                    <h4>Arrastra fotos aquí o haz clic para seleccionar</h4>
                    <p>PNG, JPG hasta 5MB cada una</p>
                  </div>
                </div>

                <div v-if="uploadedImages.length > 0" class="images-preview">
                  <div
                    v-for="(image, index) in uploadedImages"
                    :key="index"
                    class="image-card"
                  >
                    <img :src="image.preview" alt="Preview" />
                    <div class="image-overlay">
                      <span v-if="index === 0" class="main-badge"
                        >Principal</span
                      >
                      <button
                        type="button"
                        class="btn-remove"
                        @click="removeImage(index)"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- PRECIO -->
              <div class="form-section">
                <h3 class="section-title">
                  {{
                    formData.listingType === 'sale'
                      ? 'Precio de Venta'
                      : 'Precio de Renta'
                  }}
                </h3>

                <div v-if="formData.listingType === 'sale'" class="form-grid">
                  <div class="form-group">
                    <label class="form-label">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path
                          d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
                        />
                      </svg>
                      Precio
                    </label>
                    <div class="input-with-prefix">
                      <span class="prefix">$</span>
                      <input
                        v-model.number="formData.price"
                        type="number"
                        class="form-input with-prefix"
                        placeholder="450000"
                        min="0"
                        required
                      />
                      <span class="suffix">MXN</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path
                          d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"
                        />
                      </svg>
                      ¿Negociable?
                    </label>
                    <div class="toggle-group">
                      <label class="toggle-option">
                        <input
                          v-model="formData.negotiable"
                          type="radio"
                          :value="true"
                          name="negotiable"
                        />
                        <span>Sí</span>
                      </label>
                      <label class="toggle-option">
                        <input
                          v-model="formData.negotiable"
                          type="radio"
                          :value="false"
                          name="negotiable"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div v-else class="form-grid">
                  <div class="form-group">
                    <label class="form-label">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path
                          d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
                        />
                      </svg>
                      Precio por Día
                    </label>
                    <div class="input-with-prefix">
                      <span class="prefix">$</span>
                      <input
                        v-model.number="formData.pricePerDay"
                        type="number"
                        class="form-input with-prefix"
                        placeholder="800"
                        min="0"
                        required
                      />
                      <span class="suffix">MXN/día</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path
                          d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
                        />
                      </svg>
                      Precio por Semana (Opcional)
                    </label>
                    <div class="input-with-prefix">
                      <span class="prefix">$</span>
                      <input
                        v-model.number="formData.pricePerWeek"
                        type="number"
                        class="form-input with-prefix"
                        placeholder="4500"
                        min="0"
                      />
                      <span class="suffix">MXN/sem</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path
                          d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
                        />
                      </svg>
                      Depósito de Garantía
                    </label>
                    <div class="input-with-prefix">
                      <span class="prefix">$</span>
                      <input
                        v-model.number="formData.deposit"
                        type="number"
                        class="form-input with-prefix"
                        placeholder="5000"
                        min="0"
                        required
                      />
                      <span class="suffix">MXN</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      Disponibilidad Mínima
                    </label>
                    <select
                      v-model.number="formData.minRentalDays"
                      class="form-input"
                      required
                    >
                      <option value="">Selecciona</option>
                      <option :value="1">1 día</option>
                      <option :value="2">2 días</option>
                      <option :value="3">3 días</option>
                      <option :value="7">7 días (1 semana)</option>
                      <option :value="15">15 días</option>
                      <option :value="30">30 días (1 mes)</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- UBICACIÓN -->
              <div class="form-section">
                <h3 class="section-title">Ubicación</h3>
                <div class="form-grid">
                  <div class="form-group">
                    <label class="form-label">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                        />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      Ciudad
                    </label>
                    <select v-model="formData.city" class="form-input" required>
                      <option value="">Selecciona ciudad</option>
                      <option value="mx-cdmx">Ciudad de México</option>
                      <option value="mx-gdl">Guadalajara</option>
                      <option value="mx-mty">Monterrey</option>
                      <option value="mx-pue">Puebla</option>
                      <option value="mx-tjn">Tijuana</option>
                      <option value="mx-leon">León</option>
                      <option value="mx-jrz">Juárez</option>
                      <option value="mx-zap">Zapopan</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                        />
                        <path d="M9 22V12h6v10" />
                      </svg>
                      Código Postal
                    </label>
                    <input
                      v-model="formData.postalCode"
                      type="text"
                      class="form-input"
                      placeholder="22000"
                      required
                    />
                  </div>
                </div>
              </div>

              <!-- CONTACTO -->
              <div class="form-section">
                <h3 class="section-title">Información de Contacto</h3>
                <div class="form-grid">
                  <div class="form-group">
                    <label class="form-label">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                        />
                      </svg>
                      Teléfono de Contacto
                    </label>
                    <input
                      v-model="formData.contactPhone"
                      type="tel"
                      class="form-input"
                      placeholder="664 123 4567"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        />
                        <path d="M22 6l-10 7L2 6" />
                      </svg>
                      Email de Contacto
                    </label>
                    <input
                      v-model="formData.contactEmail"
                      type="email"
                      class="form-input"
                      placeholder="contacto@ejemplo.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <!-- TÉRMINOS -->
              <div class="form-section">
                <label class="checkbox-large">
                  <input
                    v-model="formData.acceptTerms"
                    type="checkbox"
                    required
                  />
                  <div class="checkbox-content">
                    <span class="checkbox-title"
                      >Acepto los términos y condiciones</span
                    >
                    <span class="checkbox-desc"
                      >He leído y acepto los
                      <a href="#" class="link">términos y condiciones</a> y la
                      <a href="#" class="link">política de privacidad</a> de
                      AutoSphere. Confirmo que la información proporcionada es
                      verídica.</span
                    >
                  </div>
                </label>
              </div>
            </div>
          </div>

          <p v-if="submitFeedback.message" :class="['submission-feedback', submitFeedback.type]">
            {{ submitFeedback.message }}
          </p>

          <!-- NAVIGATION BUTTONS -->
          <div class="form-navigation">
            <button
              v-if="currentStep > 1"
              type="button"
              class="btn-nav btn-prev"
              @click="previousStep"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Anterior
            </button>

            <button
              v-if="currentStep < 4"
              type="button"
              class="btn-nav btn-next"
              @click="nextStep"
            >
              Siguiente
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <button
              v-if="currentStep === 4"
              type="submit"
              class="btn-nav btn-submit"
              :disabled="isSubmitting"
            >
              <svg
                v-if="!isSubmitting"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </svg>
              <svg
                v-else
                class="spinner"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
              {{ isSubmitting ? 'Publicando...' : 'Publicar Anuncio' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { createListing } from '../../../services/seller.js';
import { registerRental } from '../../../services/lessor.js';

const router = useRouter();
const currentStep = ref(1);
const isSubmitting = ref(false);
const fileInput = ref(null);
const uploadedImages = ref([]);
const submitFeedback = ref({ type: 'error', message: '' });

const currentYear = new Date().getFullYear();
const years = computed(() => {
  const arr = [];
  for (let i = currentYear; i >= 1990; i--) {
    arr.push(i);
  }
  return arr;
});

const formData = ref({
  listingType: 'sale',
  brand: '',
  model: '',
  year: '',
  vehicleType: '',
  mileage: '',
  color: '',
  transmission: '',
  fuelType: '',
  doors: '',
  passengers: '',
  licensePlate: '',
  vin: '',
  condition: 'used-excellent',
  features: [],
  description: '',
  price: '',
  negotiable: true,
  pricePerDay: '',
  pricePerWeek: '',
  deposit: '',
  minRentalDays: '',
  city: '',
  postalCode: '',
  contactPhone: '',
  contactEmail: '',
  acceptTerms: false,
});

const setFeedback = (type, message) => {
  submitFeedback.value = { type, message };
};

const goToStep = (step) => {
  if (step < currentStep.value) {
    currentStep.value = step;
  }
};

const nextStep = () => {
  if (validateStep()) {
    currentStep.value++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const previousStep = () => {
  currentStep.value--;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const validateStep = () => {
  setFeedback('error', '');
  if (currentStep.value === 1 && !formData.value.listingType) {
    setFeedback('error', 'Selecciona si el anuncio será de venta o renta.');
    return false;
  }
  return true;
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  processFiles(files);
};

const handleDrop = (event) => {
  const files = Array.from(event.dataTransfer.files);
  processFiles(files);
};

const processFiles = (files) => {
  setFeedback('error', '');
  const imageFiles = files.filter((file) => file.type.startsWith('image/'));

  if (uploadedImages.value.length + imageFiles.length > 10) {
    setFeedback('error', 'Máximo 10 fotos permitidas.');
    return;
  }

  imageFiles.forEach((file) => {
    if (file.size > 5 * 1024 * 1024) {
      setFeedback('error', `${file.name} es muy grande. Máximo 5MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImages.value.push({
        file,
        preview: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  });
};

const removeImage = (index) => {
  uploadedImages.value.splice(index, 1);
};

const submitListing = async () => {
  setFeedback('error', '');

  if (uploadedImages.value.length < 3) {
    setFeedback('error', 'Sube al menos 3 fotos del vehículo para continuar.');
    return;
  }

  isSubmitting.value = true;

  try {
    const payload = {
      title: `${formData.value.brand} ${formData.value.model} ${formData.value.year}`.trim(),
      brand: formData.value.brand,
      model: formData.value.model,
      year: formData.value.year,
      category: formData.value.vehicleType,
      mileageKm: formData.value.mileage,
      color: formData.value.color,
      transmission: formData.value.transmission,
      fuel: formData.value.fuelType,
      description: formData.value.description,
      cityName: formData.value.city,
      sellerPhone: formData.value.contactPhone,
      sellerEmail: formData.value.contactEmail,
      features: formData.value.features,
      price: formData.value.price,
      pricePerDay: formData.value.pricePerDay,
      pricePerWeek: formData.value.pricePerWeek,
      deposit: formData.value.deposit,
      minRentalDays: formData.value.minRentalDays,
      status: 'draft',
    };

    if (formData.value.listingType === 'sale') {
      await createListing({
        ...payload,
        type: 'venta',
      });
    } else {
      await registerRental({
        ...payload,
        vehicleLabel: payload.title,
        status: 'scheduled',
      });
    }

    setFeedback(
      'success',
      `Anuncio de ${formData.value.listingType === 'sale' ? 'venta' : 'renta'} preparado correctamente en el seam mock. En Wave 2 este formulario enviará el payload al backend real.`
    );
    router.push({ name: 'user-listings' });
  } catch (error) {
    setFeedback('error', 'No fue posible preparar el anuncio. Intenta nuevamente.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped src="./styles.css">
.submission-feedback {
  margin: 0 0 20px;
  padding: 14px 16px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
}

.submission-feedback.success {
  background: rgba(16, 185, 129, 0.12);
  color: #065f46;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.submission-feedback.error {
  background: rgba(239, 68, 68, 0.1);
  color: #991b1b;
  border: 1px solid rgba(239, 68, 68, 0.18);
}
</style>
