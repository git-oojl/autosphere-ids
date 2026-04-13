<template>
  <div class="udash">
    <div class="udash-header">
      <br /><br /><br /><br /><br />
      <div class="udash-header-inner">
        <div class="udash-header-title-block">
          <h1 class="udash-page-title">Dashboard</h1>
          <p class="udash-page-sub">
            Gestiona tus actividades · {{ currentTime }}
          </p>
        </div>
        <button class="udash-btn-primary" type="button" @click="goToNewListing">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nuevo Anuncio
        </button>
      </div>

      <div class="udash-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="udash-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
          <span v-if="tab.badge" class="udash-tab-badge">{{ tab.badge }}</span>
        </button>
      </div>
    </div>

    <!-- ──────────────────────────────────────────────
         CUERPO — contenido por tab
    ─────────────────────────────────────────────── -->
    <div class="udash-body">
      <!-- ════════════════════════════════════════════
           TAB COMPRADOR
      ════════════════════════════════════════════ -->
      <div v-if="activeTab === 'comprador'" class="udash-tab-content">
        <div class="udash-stats udash-stats-buyer">
          <div class="udash-stat-card accent-blue udash-stat--buyer">
            <div
              class="udash-stat-icon"
              style="background: rgba(255, 255, 255, 0.16)"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span
                class="udash-stat-lbl"
                style="color: rgba(255, 255, 255, 0.65)"
                >Citas próximas</span
              >
              <span class="udash-stat-val">{{ buyerData.appointments }}</span>
              <span
                class="udash-stat-sub"
                style="color: rgba(255, 255, 255, 0.78)"
                >{{ buyerNextAppointmentLine }}</span
              >
            </div>
          </div>

          <div class="udash-stat-card udash-stat--buyer">
            <div class="udash-stat-icon" style="background: #eef3fa">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#386ba8"
                stroke-width="2"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span class="udash-stat-lbl">Autos favoritos</span>
              <span class="udash-stat-val">{{ buyerData.savedCount }}</span>
              <span class="udash-stat-sub">guardados</span>
            </div>
          </div>

          <div class="udash-stat-card udash-stat--buyer">
            <div class="udash-stat-icon" style="background: #bfdbfe">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563eb"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span class="udash-stat-lbl">Búsquedas (mes)</span>
              <span class="udash-stat-val">{{
                buyerData.searchesThisMonth
              }}</span>
              <span class="udash-stat-sub">en el historial</span>
            </div>
          </div>

          <div class="udash-stat-card udash-stat--buyer">
            <div class="udash-stat-icon" style="background: #d1fae5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#059669"
                stroke-width="2"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span class="udash-stat-lbl">Mensajes</span>
              <span class="udash-stat-val">{{ buyerData.messages }}</span>
              <span class="udash-stat-sub warn"
                >{{ buyerData.unread }} sin leer</span
              >
            </div>
          </div>
        </div>

        <div class="udash-grid">
          <div class="udash-main-col">
            <div class="udash-card">
              <div class="udash-card-head">
                <div class="udash-card-head-l">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#386ba8"
                    stroke-width="2.2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <h3>Próximas citas</h3>
                </div>
                <button
                  type="button"
                  class="udash-link"
                  @click="buyerGoAppointments"
                >
                  Ver todas
                </button>
              </div>
              <div
                v-if="buyerAppointmentsList.length === 0"
                class="udash-empty"
              >
                <p>No tienes citas próximas</p>
                <button
                  type="button"
                  class="udash-btn-outline"
                  @click="buyerGoCatalog"
                >
                  Explorar catálogo
                </button>
              </div>
              <div v-else class="udash-appt-grid">
                <article
                  v-for="appt in buyerAppointmentsList"
                  :key="appt.id"
                  class="udash-appt-card"
                >
                  <div class="udash-appt-card-top">
                    <span>{{ appt.cardDateLabel }}</span>
                    <time>{{ appt.time }}</time>
                  </div>
                  <div class="udash-appt-card-body">
                    <h4 class="udash-appt-card-title">{{ appt.vehicle }}</h4>
                    <div class="udash-appt-card-loc">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                        />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{{ appt.location }}</span>
                    </div>
                    <span class="udash-status" :class="appt.status">{{
                      appt.statusLabel
                    }}</span>
                  </div>
                  <div class="udash-appt-card-actions">
                    <button
                      type="button"
                      class="udash-btn-ghost"
                      @click="buyerOpenAppointment(appt.id)"
                    >
                      Ver detalles
                    </button>
                    <button
                      type="button"
                      class="udash-btn-fill-sm"
                      @click="buyerOpenAppointment(appt.id)"
                    >
                      Reagendar
                    </button>
                    <button
                      type="button"
                      class="udash-btn-danger-soft"
                      @click="buyerOpenAppointment(appt.id)"
                    >
                      Cancelar
                    </button>
                  </div>
                </article>
              </div>
            </div>

            <div class="udash-card">
              <div class="udash-card-head">
                <div class="udash-card-head-l">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#386ba8"
                    stroke-width="2.2"
                  >
                    <path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    />
                  </svg>
                  <h3>Tus autos favoritos</h3>
                </div>
                <button type="button" class="udash-link" @click="buyerGoSaved">
                  Ver todos ({{ buyerData.savedCount }})
                </button>
              </div>

              <div v-if="buyerData.favorites.length === 0" class="udash-empty">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#cbd5e1"
                  stroke-width="1.5"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  />
                </svg>
                <p>Aún no tienes autos guardados</p>
                <button
                  type="button"
                  class="udash-btn-outline"
                  @click="buyerGoCatalog"
                >
                  Explorar catálogo
                </button>
              </div>

              <div v-else class="udash-fav-grid">
                <article
                  v-for="car in buyerData.favorites"
                  :key="car.id"
                  class="udash-fav-tile"
                >
                  <img
                    :src="car.image"
                    :alt="car.title"
                    class="udash-fav-tile-img"
                    @error="imgErr"
                  />
                  <div class="udash-fav-tile-body">
                    <span class="udash-fav-tile-title">{{ car.title }}</span>
                    <span class="udash-fav-tile-price"
                      >${{ fmt(car.price) }}</span
                    >
                    <span class="udash-fav-tile-specs">{{
                      car.specsLine
                    }}</span>
                  </div>
                  <div class="udash-fav-tile-actions">
                    <button
                      type="button"
                      class="udash-btn-fill-sm"
                      @click="buyerOpenListing(car.id)"
                    >
                      Ver auto
                    </button>
                    <button
                      type="button"
                      class="udash-icon-btn"
                      aria-label="Abrir en catálogo"
                      @click="buyerOpenListing(car.id)"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                        />
                        <path d="M15 3h6v6" />
                        <path d="m10 14 11-11" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="udash-icon-btn"
                      aria-label="Quitar de favoritos"
                      @click.stop="buyerOpenListing(car.id)"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </article>
              </div>
            </div>

            <div class="udash-card">
              <div class="udash-card-head">
                <div class="udash-card-head-l">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#386ba8"
                    stroke-width="2.2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <h3>Búsquedas recientes</h3>
                </div>
                <button
                  type="button"
                  class="udash-link"
                  @click="buyerGoHistory"
                >
                  Ver historial completo
                </button>
              </div>
              <div v-if="buyerSearchItems.length === 0" class="udash-empty">
                <p>No hay búsquedas recientes</p>
              </div>
              <div v-else class="udash-search-list">
                <div
                  v-for="s in buyerSearchItems"
                  :key="s.id"
                  class="udash-search-row"
                >
                  <div class="udash-search-main">
                    <span class="udash-search-query">{{ s.name }}</span>
                    <span class="udash-search-meta"
                      >{{ s.updated }} · {{ s.resultsLabel }}</span
                    >
                  </div>
                  <div class="udash-search-actions">
                    <button
                      type="button"
                      class="udash-link"
                      @click="buyerRepeatSearch(s.query)"
                    >
                      Buscar de nuevo
                    </button>
                    <button
                      type="button"
                      class="udash-link"
                      @click="buyerSaveSearchStub(s)"
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      class="udash-search-remove"
                      aria-label="Eliminar búsqueda"
                      @click="buyerRemoveSearch(s.id)"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="udash-side">
            <div class="udash-card">
              <div class="udash-card-head">
                <div class="udash-card-head-l">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#386ba8"
                    stroke-width="2.2"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <h3>Acciones rápidas</h3>
                </div>
              </div>
              <div class="udash-quick-grid">
                <button
                  v-for="a in buyerActions"
                  :key="a.label"
                  type="button"
                  class="udash-quick-btn"
                  :class="{ 'udash-quick-btn--primary': a.primary }"
                  @click="a.onClick"
                >
                  <div
                    class="udash-quick-icon"
                    :style="
                      a.primary
                        ? { background: 'rgba(255,255,255,0.22)' }
                        : { background: a.bg }
                    "
                  >
                    <svg
                      v-if="a.primary"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                    <svg
                      v-else-if="a.icon === 'calendar'"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#386ba8"
                      stroke-width="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <svg
                      v-else-if="a.icon === 'heart'"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#386ba8"
                      stroke-width="2"
                    >
                      <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      />
                    </svg>
                    <svg
                      v-else-if="a.icon === 'clock'"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#386ba8"
                      stroke-width="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <span>{{ a.label }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ════════════════════════════════════════════
           TAB VENDEDOR (panel vendedor — referencia AutoSphere)
      ════════════════════════════════════════════ -->
      <div v-if="activeTab === 'vendedor'" class="udash-tab-content">
        <div class="udash-stats udash-stats-seller">
          <div class="udash-stat-card">
            <div class="udash-stat-icon" style="background: #eef3fa">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#386ba8"
                stroke-width="2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span class="udash-stat-lbl">Anuncios activos</span>
              <span class="udash-stat-val">{{
                sellerData.activeListings
              }}</span>
              <span class="udash-stat-sub positive">↑ +3 este mes</span>
            </div>
          </div>

          <div class="udash-stat-card">
            <div class="udash-stat-icon" style="background: #fef9c3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d97706"
                stroke-width="2"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span class="udash-stat-lbl">Mensajes</span>
              <span class="udash-stat-val">{{ sellerData.messages }}</span>
              <span class="udash-stat-sub warn"
                >{{ sellerData.unread }} sin responder</span
              >
            </div>
          </div>

          <div
            class="udash-stat-card udash-stat-card--link"
            role="button"
            tabindex="0"
            @click="sellerGoAppointments"
            @keydown.enter.prevent="sellerGoAppointments"
            @keydown.space.prevent="sellerGoAppointments"
          >
            <div class="udash-stat-icon" style="background: #e8f0f8">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#386ba8"
                stroke-width="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span class="udash-stat-lbl">Citas esta semana</span>
              <span class="udash-stat-val">{{ sellerData.appointments }}</span>
              <span class="udash-stat-sub">programadas</span>
            </div>
          </div>

          <div class="udash-stat-card">
            <div class="udash-stat-icon" style="background: #d1fae5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#059669"
                stroke-width="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span class="udash-stat-lbl">Vistas totales</span>
              <span class="udash-stat-val">{{ fmt(sellerData.views) }}</span>
              <span class="udash-stat-sub positive">↑ +15% vs sem. pasada</span>
            </div>
          </div>

          <div class="udash-stat-card accent-blue udash-stat-card--cta">
            <button
              type="button"
              class="udash-stat-cta-btn"
              @click="sellerGoNewAppointment"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Crear Cita
            </button>
          </div>
        </div>

        <div class="udash-grid udash-grid--seller">
          <div class="udash-main-col">
            <div class="udash-card">
              <div class="udash-card-head">
                <div class="udash-card-head-l">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#386ba8"
                    stroke-width="2.2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <h3>Próximas citas</h3>
                </div>
                <button
                  type="button"
                  class="udash-link"
                  @click="sellerGoAppointments"
                >
                  Ver Mis citas
                </button>
              </div>
              <div>
                <div
                  v-for="appt in sellerData.appointments_list"
                  :key="appt.id"
                  class="udash-appt-row"
                >
                  <div
                    class="udash-appt-date"
                    :class="appt.isToday ? 'today' : 'future'"
                  >
                    <span class="udash-appt-day">{{ appt.dayLabel }}</span>
                    <span class="udash-appt-time">{{ appt.time }}</span>
                  </div>
                  <div class="udash-appt-info">
                    <span class="udash-appt-client">{{ appt.client }}</span>
                    <span class="udash-appt-vehicle">{{ appt.vehicle }}</span>
                  </div>
                  <span class="udash-status" :class="appt.status">{{
                    appt.statusLabel
                  }}</span>
                  <button
                    type="button"
                    class="udash-icon-btn"
                    @click="sellerGoAppointments"
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="udash-card">
              <div class="udash-card-head">
                <div class="udash-card-head-l">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#386ba8"
                    stroke-width="2.2"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    />
                  </svg>
                  <h3>Anuncios destacados</h3>
                </div>
                <button
                  type="button"
                  class="udash-link"
                  @click="sellerGoListings"
                >
                  Gestionar
                </button>
              </div>
              <div class="udash-featured-wrap">
                <div class="udash-featured-head">
                  <span>Vehículo</span>
                  <span>Vistas</span>
                  <span>Mensajes</span>
                  <span>Citas</span>
                  <span>Estado</span>
                  <span>Acciones</span>
                </div>
                <div
                  v-for="l in sellerData.listings"
                  :key="'f-' + l.id"
                  class="udash-featured-row"
                >
                  <div class="udash-featured-vehicle">
                    <img
                      :src="l.image"
                      :alt="l.title"
                      class="udash-featured-thumb"
                      width="48"
                      height="36"
                      @error="imgErr"
                    />
                    <div class="udash-featured-titles">
                      <span class="udash-featured-name">{{ l.title }}</span>
                      <span class="udash-featured-price"
                        >${{ fmt(l.price) }}</span
                      >
                    </div>
                  </div>
                  <span class="udash-featured-metric">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#94a3b8"
                      stroke-width="2"
                      class="udash-featured-ico"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    {{ l.views }}
                  </span>
                  <span class="udash-featured-metric">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#94a3b8"
                      stroke-width="2"
                      class="udash-featured-ico"
                    >
                      <path
                        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                      />
                    </svg>
                    {{ l.messages }}
                  </span>
                  <span class="udash-featured-metric">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#94a3b8"
                      stroke-width="2"
                      class="udash-featured-ico"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {{ l.appointments }}
                  </span>
                  <span class="udash-listing-status" :class="l.status">{{
                    l.statusLabel
                  }}</span>
                  <div class="udash-featured-actions">
                    <button
                      type="button"
                      class="udash-icon-btn sm"
                      aria-label="Editar"
                      @click="sellerEditListing(l.id)"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#386ba8"
                        stroke-width="2.5"
                      >
                        <path
                          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                        />
                        <path
                          d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="udash-icon-btn sm"
                      aria-label="Rendimiento"
                      @click="sellerGoListings"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#386ba8"
                        stroke-width="2"
                      >
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="udash-side">
            <div class="udash-card">
              <div class="udash-card-head">
                <div class="udash-card-head-l">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#386ba8"
                    stroke-width="2.2"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <h3>Acciones rápidas</h3>
                </div>
              </div>
              <div class="udash-quick-grid udash-quick-grid--outline">
                <button
                  v-for="a in sellerActions"
                  :key="a.label"
                  type="button"
                  class="udash-quick-btn udash-quick-btn--outline"
                  @click="a.onClick"
                >
                  <div class="udash-quick-icon udash-quick-icon--glyph">
                    <QuickActionGlyph :name="a.icon" />
                  </div>
                  <span>{{ a.label }}</span>
                </button>
              </div>
            </div>

            <div class="udash-card">
              <div class="udash-card-head">
                <div class="udash-card-head-l">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#386ba8"
                    stroke-width="2.2"
                  >
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  <h3>Rendimiento</h3>
                </div>
              </div>
              <div class="udash-perf-block">
                <div
                  v-for="row in sellerData.performance"
                  :key="row.label"
                  class="udash-perf-row"
                >
                  <div class="udash-perf-top">
                    <span class="udash-perf-label">{{ row.label }}</span>
                    <span class="udash-perf-pct">{{ row.value }}%</span>
                  </div>
                  <div class="udash-perf-track">
                    <div
                      class="udash-perf-fill"
                      :style="{ width: row.value + '%' }"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="udash-card udash-tip-card">
              <div class="udash-card-head">
                <div class="udash-card-head-l">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#386ba8"
                    stroke-width="2.2"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M12 3l1.2 3.6h3.8l-3 2.2 1.1 3.5L12 11.9 8.9 12.3l1.1-3.5-3-2.2h3.8L12 3z"
                    />
                  </svg>
                  <h3>Consejo del día</h3>
                </div>
              </div>
              <p class="udash-tip-text">{{ sellerData.tipOfDay }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ════════════════════════════════════════════
           TAB ARRENDADOR
      ════════════════════════════════════════════ -->
      <div v-if="activeTab === 'arrendador'" class="udash-tab-content">
        <div class="udash-stats">
          <div class="udash-stat-card">
            <div class="udash-stat-icon" style="background: #eef3fa">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#386ba8"
                stroke-width="2"
              >
                <path
                  d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
                />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span class="udash-stat-lbl">Rentas activas</span>
              <span class="udash-stat-val">{{
                landlordData.activeRentals
              }}</span>
              <span class="udash-stat-sub">en curso</span>
            </div>
          </div>

          <div class="udash-stat-card">
            <div class="udash-stat-icon" style="background: #fef3c7">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d97706"
                stroke-width="2"
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span class="udash-stat-lbl">Vehículos registrados</span>
              <span class="udash-stat-val">{{ landlordData.vehicles }}</span>
              <span class="udash-stat-sub">en flota</span>
            </div>
          </div>

          <!-- Stat destacada verde -->
          <div class="udash-stat-card accent-green">
            <div
              class="udash-stat-icon"
              style="background: rgba(255, 255, 255, 0.18)"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span
                class="udash-stat-lbl"
                style="color: rgba(255, 255, 255, 0.65)"
                >Ingresos del mes</span
              >
              <span class="udash-stat-val"
                >${{ fmt(landlordData.monthlyIncome) }}</span
              >
              <span
                class="udash-stat-sub"
                style="color: rgba(255, 255, 255, 0.82)"
                >↑ +8% vs mes anterior</span
              >
            </div>
          </div>

          <div class="udash-stat-card">
            <div class="udash-stat-icon" style="background: #fee2e2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                stroke-width="2"
              >
                <path
                  d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span class="udash-stat-lbl">Reportes de estado</span>
              <span class="udash-stat-val">{{ landlordData.reports }}</span>
              <span class="udash-stat-sub warn"
                >{{ landlordData.pending }} pendiente</span
              >
            </div>
          </div>
        </div>

        <div class="udash-grid udash-grid--landlord">
          <div class="udash-main-col">
            <div class="udash-card">
              <div class="udash-card-head udash-card-head--split">
                <div class="udash-card-head-l">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#386ba8"
                    stroke-width="2.2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <div>
                    <h3>Próximas citas</h3>
                    <p class="udash-card-sub">
                      Resumen de lo que viene en tu agenda
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  class="udash-link udash-link--head"
                  @click="landlordGoAppointments"
                >
                  Ver Mis citas
                </button>
              </div>
              <div class="udash-landlord-block">
                <div
                  v-for="c in landlordData.upcomingCitas"
                  :key="c.id"
                  class="udash-landlord-cita-row"
                >
                  <div class="udash-landlord-cita-date future">
                    <span class="udash-appt-day">{{ c.dayLabel }}</span>
                    <span class="udash-appt-time">{{ c.time }}</span>
                  </div>
                  <div class="udash-landlord-cita-main">
                    <span class="udash-landlord-cita-title">{{ c.title }}</span>
                    <span class="udash-landlord-cita-sub">{{
                      c.subtitle
                    }}</span>
                  </div>
                  <span class="udash-status" :class="c.status">{{
                    c.statusLabel
                  }}</span>
                  <button
                    type="button"
                    class="udash-icon-btn"
                    aria-label="Ir a citas"
                    @click="landlordGoAppointments"
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="udash-card">
              <div class="udash-card-head udash-card-head--split">
                <div class="udash-card-head-l">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#386ba8"
                    stroke-width="2.2"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                  <div>
                    <h3>Publicaciones en foco</h3>
                    <p class="udash-card-sub">
                      Anuncios populares y destacados (vista resumida)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  class="udash-link udash-link--head"
                  @click="landlordGoListings"
                >
                  Ver Mis publicaciones
                </button>
              </div>
              <div class="udash-landlord-block">
                <div
                  v-for="p in landlordData.popularListings"
                  :key="p.id"
                  class="udash-landlord-listing-row"
                >
                  <img
                    :src="p.image"
                    alt=""
                    class="udash-landlord-listing-thumb"
                    width="56"
                    height="42"
                    @error="imgErr"
                  />
                  <div class="udash-landlord-listing-main">
                    <span class="udash-landlord-listing-title">{{
                      p.title
                    }}</span>
                    <span class="udash-landlord-listing-meta"
                      >{{ p.views }} vistas · {{ p.inquiries }} consultas</span
                    >
                  </div>
                  <span class="udash-landlord-tag" :class="p.tagClass">{{
                    p.tag
                  }}</span>
                  <button
                    type="button"
                    class="udash-icon-btn"
                    aria-label="Ir a publicaciones"
                    @click="landlordGoListings"
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="udash-card">
              <div class="udash-card-head udash-card-head--split">
                <div class="udash-card-head-l">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#386ba8"
                    stroke-width="2.2"
                  >
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  <div>
                    <h3>Rentas activas</h3>
                    <p class="udash-card-sub">Contratos en curso (resumen)</p>
                  </div>
                </div>
                <button
                  type="button"
                  class="udash-link udash-link--head"
                  @click="landlordGoNewRenta"
                >
                  Ver todas las rentas
                </button>
              </div>
              <div class="udash-table udash-table--compact">
                <div class="udash-table-head">
                  <span>Vehículo</span>
                  <span>Inicio</span>
                  <span>Fin</span>
                  <span>Estado</span>
                  <span class="udash-th-actions">Acciones</span>
                </div>
                <div
                  v-for="r in landlordData.rentals"
                  :key="r.id"
                  class="udash-table-row"
                >
                  <div class="udash-rental-name">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#386ba8"
                      stroke-width="2"
                    >
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    {{ r.vehicle }}
                  </div>
                  <span class="udash-td">{{ r.start }}</span>
                  <span class="udash-td">{{ r.end }}</span>
                  <span class="udash-condition" :class="r.condition">{{
                    r.conditionLabel
                  }}</span>
                  <div class="udash-table-actions">
                    <button
                      type="button"
                      class="udash-icon-btn sm"
                      @click="landlordGoNewRenta"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#386ba8"
                        stroke-width="2.5"
                      >
                        <path
                          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                        />
                        <path
                          d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="udash-side udash-side--landlord">
            <div class="udash-landlord-cta-stack">
              <button
                type="button"
                class="udash-landlord-cta udash-landlord-cta--primary"
                @click="landlordGoAppointments"
              >
                <svg
                  width="18"
                  height="18"
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
                Mis citas
              </button>
              <button
                type="button"
                class="udash-landlord-cta udash-landlord-cta--secondary"
                @click="landlordGoListings"
              >
                <svg
                  width="18"
                  height="18"
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
                Mis publicaciones
              </button>
            </div>

            <div class="udash-card">
              <div class="udash-card-head">
                <div class="udash-card-head-l">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#386ba8"
                    stroke-width="2.2"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <h3>Acciones rápidas</h3>
                </div>
              </div>
              <div class="udash-quick-grid udash-quick-grid--outline">
                <button
                  v-for="a in landlordActions"
                  :key="a.label"
                  type="button"
                  class="udash-quick-btn udash-quick-btn--outline"
                  @click="a.onClick"
                >
                  <div class="udash-quick-icon udash-quick-icon--glyph">
                    <QuickActionGlyph :name="a.icon" />
                  </div>
                  <span>{{ a.label }}</span>
                </button>
              </div>
            </div>

            <div class="udash-card">
              <div class="udash-card-head">
                <div class="udash-card-head-l">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#386ba8"
                    stroke-width="2.2"
                  >
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  <h3>Ingresos por mes</h3>
                </div>
              </div>
              <div class="udash-bar-chart">
                <div
                  v-for="(item, i) in landlordData.incomeChart"
                  :key="i"
                  class="udash-bar-col"
                >
                  <div class="udash-bar-wrap">
                    <div
                      class="udash-bar-fill"
                      :class="{ current: item.current }"
                      :style="{ height: (item.value / maxIncome) * 100 + '%' }"
                    ></div>
                  </div>
                  <span class="udash-bar-lbl">{{ item.month }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /udash-body -->
  </div>
  <!-- /udash -->
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  getBuyerDashboard,
  getSavedVehicles,
  getSearchHistory,
  getUpcomingAppointments,
} from '../../../services/buyer.js';
import QuickActionGlyph from '../../../components/dashboard/QuickActionGlyph.vue';

const router = useRouter();

// ── Navegación ─────────────────────────────────────────────────
const goToNewListing = () => router.push({ name: 'create-listing' });

const sellerGoNewListing = () => router.push({ name: 'create-listing' });
const sellerGoNewAppointment = () => router.push({ name: 'my-appointments' });
const sellerGoAppointments = () => router.push({ name: 'my-appointments' });
const sellerGoMessages = () => router.push({ name: 'user-listings' });
const sellerGoAnalytics = () => router.push({ name: 'user-listings' });
const sellerGoListings = () => router.push({ name: 'user-listings' });
const sellerEditListing = (id) =>
  router.push({ name: 'seller-edit-listing', params: { id: String(id) } });

const landlordGoAddVehicle = () => router.push({ name: 'create-listing' });
const landlordGoNewRenta = () => router.push({ name: 'user-rentals' });
const landlordGoReports = () => router.push({ name: 'user-rentals' });
const landlordGoIncome = () => router.push({ name: 'user-rentals' });
const landlordGoAppointments = () => router.push({ name: 'user-appointments' });
const landlordGoListings = () => router.push({ name: 'user-listings' });

const buyerGoCatalog = () => router.push({ name: 'public-catalog' });
const buyerGoAppointments = () => router.push({ name: 'user-appointments' });
const buyerGoSaved = () => router.push({ name: 'buyer-saved-vehicles' });
const buyerGoHistory = () => router.push({ name: 'buyer-search-history' });
const buyerOpenListing = (id) =>
  router.push({ name: 'public-listing-detail', params: { id } });
const buyerOpenAppointment = (id) =>
  router.push({ name: 'buyer-appointment-detail', params: { id } });
const buyerRepeatSearch = (query) =>
  router.push({ name: 'public-catalog', query: { q: query } });

// ── Estado ─────────────────────────────────────────────────────
const activeTab = ref('comprador');

// ── Tiempo ─────────────────────────────────────────────────────
const currentTime = ref('');
const tick = () => {
  currentTime.value = new Date().toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
let timer;

onMounted(() => {
  tick();
  timer = setInterval(tick, 60000);
  loadBuyerData();
});
onUnmounted(() => {
  clearInterval(timer);
});

// ── Helpers ─────────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat('es-MX').format(n);
const imgErr = (e) => {
  e.target.src = 'https://placehold.co/56x56/e2e8f0/94a3b8?text=Auto';
};

// ── Tabs ────────────────────────────────────────────────────────
const tabs = computed(() => [
  {
    id: 'comprador',
    label: 'Comprador',
    badge: buyerData.value.unread || null,
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  },
  {
    id: 'vendedor',
    label: 'Vendedor',
    badge: sellerData.value.unread || null,
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  },
  {
    id: 'arrendador',
    label: 'Arrendador',
    badge: landlordData.value.pending || null,
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  },
]);

// ── Data comprador ───────────────────────────────────────────────
const buyerAppointmentsList = ref([]);
const buyerSearchItems = ref([]);

const buyerData = ref({
  savedCount: 0,
  searchesThisMonth: 0,
  messages: 5,
  unread: 2,
  appointments: 0,
  offersNew: 0,
  favorites: [],
  savedSearches: [],
});

const buyerNextAppointmentLine = computed(() => {
  const first = buyerAppointmentsList.value[0];
  if (!first) return 'Sin citas programadas';
  return `Próxima: ${first.cardDateLabel} ${first.time}`;
});

function formatSearchRelative(ts) {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return '';
  const now = new Date();
  const diffMs = now - d;
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays <= 0) return 'Hoy';
  if (diffDays === 1) return 'Ayer';
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
}

function mapBuyerAppointment(appt) {
  const today = new Date().toISOString().slice(0, 10);
  const isToday = appt.date === today;
  const dateObj = new Date(`${appt.date}T12:00:00`);
  const dayLabel = isToday
    ? 'HOY'
    : dateObj
        .toLocaleDateString('es-MX', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })
        .toUpperCase();
  const statusMap = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    rescheduled: 'Reagendada',
  };
  const cardDateLabel = dateObj.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const location =
    appt.locationLabel ||
    appt.listing?.location?.addressLabel ||
    appt.listing?.location?.city ||
    '—';
  return {
    id: appt.id,
    listingId: appt.listingId,
    dayLabel,
    cardDateLabel,
    time: appt.time,
    sellerName: appt.sellerName || appt.seller?.name || 'Vendedor',
    vehicle: appt.listingTitle || appt.listing?.title || 'Vehículo',
    location,
    isToday,
    status: appt.status,
    statusLabel: statusMap[appt.status] || appt.status,
  };
}

async function loadBuyerData() {
  const settled = await Promise.allSettled([
    getBuyerDashboard(),
    getSavedVehicles(),
    getSearchHistory(),
    getUpcomingAppointments(),
  ]);

  const [dashR, savedR, historyR, upcomingR] = settled;
  if (dashR.status === 'fulfilled' && dashR.value?.summary) {
    const s = dashR.value.summary;
    buyerData.value.savedCount = s.savedVehicles ?? buyerData.value.savedCount;
    buyerData.value.searchesThisMonth =
      s.searchesThisMonth ?? buyerData.value.searchesThisMonth;
    buyerData.value.appointments =
      s.upcomingAppointments ?? buyerData.value.appointments;
    buyerData.value.messages = s.totalMessages ?? buyerData.value.messages;
    buyerData.value.unread = s.unreadMessages ?? buyerData.value.unread;
    buyerData.value.offersNew =
      s.newOffersThisWeek ?? buyerData.value.offersNew;
  } else if (dashR.status === 'rejected') {
    console.error('getBuyerDashboard', dashR.reason);
  }

  if (savedR.status === 'fulfilled') {
    const savedRes = savedR.value;
    const items = savedRes?.items || [];
    buyerData.value.favorites = items.map((item) => {
      const km = item.mileageKm != null ? fmt(item.mileageKm) + ' km' : '—';
      const trans = item.transmission || item.specs?.transmisión || '—';
      const fuel = item.fuel || item.specs?.combustible || '—';
      return {
        id: item.id,
        title: item.title,
        city: item.location?.city || item.cityId || '—',
        year: item.year,
        price: item.price,
        dropped: false,
        image: item.coverImage,
        specsLine: `${km} · ${trans} · ${fuel}`,
      };
    });
    if (items.length) {
      buyerData.value.savedCount = items.length;
    }
  } else {
    console.error('getSavedVehicles', savedR.reason);
  }

  if (historyR.status === 'fulfilled') {
    const historyRes = historyR.value;
    const historyItems = historyRes?.items || [];
    buyerData.value.savedSearches = historyItems.map((h) => ({
      id: h.id,
      name: h.query,
      query: h.query,
      updated: formatSearchRelative(h.timestamp),
    }));
    buyerSearchItems.value = historyItems.map((h) => ({
      id: h.id,
      name: h.query,
      query: h.query,
      updated: formatSearchRelative(h.timestamp),
      resultsLabel:
        typeof h.resultCount === 'number'
          ? `${h.resultCount} resultados`
          : 'Resultados recientes',
    }));
  } else {
    console.error('getSearchHistory', historyR.reason);
  }

  if (upcomingR.status === 'fulfilled') {
    const upcoming = upcomingR.value;
    const upcomingList = Array.isArray(upcoming)
      ? upcoming
      : (upcoming?.items ?? []);
    buyerAppointmentsList.value = upcomingList.map(mapBuyerAppointment);
  } else {
    console.error('getUpcomingAppointments', upcomingR.reason);
  }
}

const buyerActions = computed(() => [
  { label: 'Buscar autos', primary: true, onClick: buyerGoCatalog },
  {
    label: 'Mis citas',
    icon: 'calendar',
    bg: '#dbeafe',
    onClick: buyerGoAppointments,
  },
  {
    label: 'Favoritos',
    icon: 'heart',
    bg: '#cfe2f8',
    onClick: buyerGoSaved,
  },
  {
    label: 'Historial',
    icon: 'clock',
    bg: '#e8f0f8',
    onClick: buyerGoHistory,
  },
]);

function buyerRemoveSearch(id) {
  buyerSearchItems.value = buyerSearchItems.value.filter((s) => s.id !== id);
}

function buyerSaveSearchStub(_s) {
  void _s;
  /* reservado: guardar filtro en cuenta */
}

// ── Data vendedor ────────────────────────────────────────────────
const sellerData = ref({
  activeListings: 24,
  messages: 12,
  unread: 2,
  appointments: 8,
  views: 1846,
  performance: [
    { label: 'Tasa de respuesta', value: 92 },
    { label: 'Citas completadas', value: 78 },
    { label: 'Visitas a anuncios', value: 65 },
  ],
  tipOfDay:
    'Publica al menos 6 fotos con buena luz; los anuncios claros reciben más contactos y citas.',
  appointments_list: [
    {
      id: 1,
      dayLabel: 'HOY',
      time: '10:30',
      client: 'Ana García',
      vehicle: 'Nissan Sentra 2020',
      isToday: true,
      status: 'confirmed',
      statusLabel: 'Confirmada',
    },
    {
      id: 2,
      dayLabel: 'HOY',
      time: '13:00',
      client: 'Carlos Rodríguez',
      vehicle: 'Porsche 911 2019',
      isToday: true,
      status: 'pending',
      statusLabel: 'Pendiente',
    },
    {
      id: 3,
      dayLabel: 'MAR 22',
      time: '09:00',
      client: 'María López',
      vehicle: 'BMW X5 2022',
      isToday: false,
      status: 'confirmed',
      statusLabel: 'Confirmada',
    },
  ],
  listings: [
    {
      id: 1,
      title: 'Nissan Sentra 2020',
      price: 245000,
      views: 128,
      messages: 5,
      appointments: 3,
      image:
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=120&h=90&fit=crop',
      status: 'active',
      statusLabel: 'Activa',
    },
    {
      id: 2,
      title: 'Porsche 911 2019',
      price: 1850000,
      views: 94,
      messages: 12,
      appointments: 6,
      image:
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=120&h=90&fit=crop',
      status: 'featured',
      statusLabel: 'Destacado',
    },
    {
      id: 3,
      title: 'Chevrolet Silverado',
      price: 520000,
      views: 57,
      messages: 2,
      appointments: 1,
      image:
        'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=120&h=90&fit=crop',
      status: 'paused',
      statusLabel: 'Pausado',
    },
  ],
});

const sellerActions = [
  { label: 'Nuevo Anuncio', icon: 'plus', onClick: sellerGoNewListing },
  { label: 'Nueva Cita', icon: 'calendar', onClick: sellerGoNewAppointment },
  { label: 'Mensajes', icon: 'message', onClick: sellerGoMessages },
  { label: 'Analíticas', icon: 'chart', onClick: sellerGoAnalytics },
];

// ── Data arrendador ──────────────────────────────────────────────
const landlordData = ref({
  activeRentals: 5,
  vehicles: 5,
  monthlyIncome: 91000,
  reports: 3,
  pending: 1,
  upcomingCitas: [
    {
      id: 'lc-1',
      dayLabel: '18 MAR',
      time: '11:00',
      title: 'Inspección de salida',
      subtitle: 'Toyota Corolla · Luis Ramírez',
      status: 'confirmed',
      statusLabel: 'Confirmada',
    },
    {
      id: 'lc-2',
      dayLabel: '22 MAR',
      time: '10:30',
      title: 'Firma de contrato',
      subtitle: 'Kia Rio · Daniela Pérez',
      status: 'pending',
      statusLabel: 'Pendiente',
    },
    {
      id: 'lc-3',
      dayLabel: '28 MAR',
      time: '09:00',
      title: 'Checklist de entrega',
      subtitle: 'Mazda CX-5 · Grupo Atlas',
      status: 'confirmed',
      statusLabel: 'Confirmada',
    },
  ],
  popularListings: [
    {
      id: 'pl-1',
      title: 'Toyota Corolla LE 2020',
      views: 428,
      inquiries: 22,
      image:
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=120&h=90&fit=crop',
      tag: 'Destacado',
      tagClass: 'featured',
    },
    {
      id: 'pl-2',
      title: 'Kia Rio Hatchback 2019',
      views: 315,
      inquiries: 14,
      image:
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=120&h=90&fit=crop',
      tag: 'Popular',
      tagClass: 'popular',
    },
    {
      id: 'pl-3',
      title: 'Mazda CX-5 i Grand Touring 2021',
      views: 290,
      inquiries: 18,
      image:
        'https://images.unsplash.com/photo-1549399812-1d87fd4a2a28?w=120&h=90&fit=crop',
      tag: 'Destacado',
      tagClass: 'featured',
    },
  ],
  rentals: [
    {
      id: 1,
      vehicle: 'Toyota Corolla 2024',
      start: '13/02/2026',
      end: '13/03/2026',
      condition: 'impeccable',
      conditionLabel: 'Impecable',
    },
    {
      id: 2,
      vehicle: 'Honda CR-V 2025',
      start: '19/10/2025',
      end: '13/12/2025',
      condition: 'not-impeccable',
      conditionLabel: 'No impecable',
    },
    {
      id: 3,
      vehicle: 'Nissan Versa 2023',
      start: '31/12/2025',
      end: '18/01/2026',
      condition: 'damaged',
      conditionLabel: 'Dañado',
    },
  ],
  incomeChart: [
    { month: 'Oct', value: 62000, current: false },
    { month: 'Nov', value: 75000, current: false },
    { month: 'Dic', value: 88000, current: false },
    { month: 'Ene', value: 70000, current: false },
    { month: 'Feb', value: 84000, current: false },
    { month: 'Mar', value: 91000, current: true },
  ],
});

const maxIncome = computed(() =>
  Math.max(...landlordData.value.incomeChart.map((i) => i.value))
);

const landlordActions = [
  { label: 'Agregar vehículo', icon: 'plus', onClick: landlordGoAddVehicle },
  { label: 'Nueva renta', icon: 'calendar', onClick: landlordGoNewRenta },
  { label: 'Reportes', icon: 'alert', onClick: landlordGoReports },
  { label: 'Ingresos', icon: 'dollar', onClick: landlordGoIncome },
];
</script>

<style scoped src="./styles.css"></style>
