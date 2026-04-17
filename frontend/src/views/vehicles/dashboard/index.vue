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
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span class="udash-stat-lbl">Confirmadas</span>
              <span class="udash-stat-val">{{ buyerConfirmedAppointments }}</span>
              <span class="udash-stat-sub">listas para atender</span>
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
                      @click="buyerManageAppointment()"
                    >
                      Reagendar
                    </button>
                    <button
                      type="button"
                      class="udash-btn-danger-soft"
                      @click="buyerManageAppointment()"
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
                      @click="buyerOpenListingNewTab(car.id)"
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
                      @click.stop="buyerRemoveFavorite(car.id)"
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
              <span class="udash-stat-sub positive">Inventario visible</span>
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
              <span class="udash-stat-lbl">Citas pendientes</span>
              <span class="udash-stat-val">{{ sellerData.messages }}</span>
              <span class="udash-stat-sub warn"
                >{{ sellerData.unread }} por atender</span
              >
            </div>
          </div>

          <div
            class="udash-stat-card udash-stat-card--link"
            role="button"
            tabindex="0"
            @click="sellerGoAppointments()"
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
              <span class="udash-stat-lbl">Precio promedio</span>
              <span class="udash-stat-val">${{ fmt(sellerData.averagePrice) }}</span>
              <span class="udash-stat-sub positive">de tus publicaciones activas</span>
            </div>
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
                    @click="sellerOpenAppointment(appt.id)"
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
              <div class="udash-featured-wrap udash-featured-wrap--sales">
                <div class="udash-featured-head udash-featured-head--sales">
                  <span>Vehículo</span>
                  <span>Precio</span>
                  <span>Ubicación</span>
                  <span>Modo</span>
                  <span>Estado</span>
                  <span>Acciones</span>
                </div>
                <div
                  v-for="l in sellerData.listings"
                  :key="'f-' + l.id"
                  class="udash-featured-row udash-featured-row--sales"
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
                  <span class="udash-featured-metric">${{ fmt(l.price) }}</span>
                  <span class="udash-featured-metric" :title="l.cityLabel">{{ l.cityLabel }}</span>
                  <span class="udash-featured-metric">{{ l.modeLabel }}</span>
                  <span class="udash-listing-status" :class="l.status">{{
                    l.statusLabel
                  }}</span>
                  <div class="udash-featured-actions">
                    <button
                      type="button"
                      class="udash-icon-btn sm"
                      aria-label="Editar"
                      @click="sellerEditListing(l.id, l.mode === 'rental' ? 'renta' : 'venta')"
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
                      aria-label="Ver detalle"
                      @click="sellerViewListing(l.id)"
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
              <p class="udash-tip-text">{{ sellerTipOfDay }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ════════════════════════════════════════════
           TAB ARRENDADOR
      ════════════════════════════════════════════ -->
      <div v-if="activeTab === 'arrendador'" class="udash-tab-content">
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
                <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span class="udash-stat-lbl">Publicaciones visibles</span>
              <span class="udash-stat-val">{{ landlordData.activeRentals }}</span>
              <span class="udash-stat-sub">disponibles para renta</span>
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
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span class="udash-stat-lbl">Citas pendientes</span>
              <span class="udash-stat-val">{{ landlordData.pending }}</span>
              <span class="udash-stat-sub warn">por atender</span>
            </div>
          </div>

          <div
            class="udash-stat-card udash-stat-card--link"
            role="button"
            tabindex="0"
            @click="landlordGoAppointments()"
            @keydown.enter.prevent="landlordGoAppointments()"
            @keydown.space.prevent="landlordGoAppointments()"
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
              <span class="udash-stat-val">{{ landlordData.appointments }}</span>
              <span class="udash-stat-sub">relacionadas con rentas</span>
            </div>
          </div>

          <div class="udash-stat-card accent-green">
            <div class="udash-stat-icon" style="background: rgba(255, 255, 255, 0.18)">
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
              <span class="udash-stat-lbl" style="color: rgba(255, 255, 255, 0.65)">Precio diario promedio</span>
              <span class="udash-stat-val">${{ fmt(landlordData.monthlyIncome) }}</span>
              <span class="udash-stat-sub" style="color: rgba(255, 255, 255, 0.82)">basado en tu inventario</span>
            </div>
          </div>
        </div>

        <div class="udash-grid udash-grid--seller">
          <div class="udash-main-col">
            <div class="udash-card">
              <div class="udash-card-head">
                <div class="udash-card-head-l">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#386ba8" stroke-width="2.2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <h3>Próximas citas</h3>
                </div>
                <button type="button" class="udash-link" @click="landlordGoAppointments">Ver Mis citas</button>
              </div>
              <div v-if="landlordData.appointments_list.length === 0" class="udash-empty">
                <p>No hay citas relacionadas con tus rentas activas</p>
              </div>
              <div v-else>
                <div v-for="appt in landlordData.appointments_list" :key="appt.id" class="udash-appt-row">
                  <div class="udash-appt-date" :class="appt.isToday ? 'today' : 'future'">
                    <span class="udash-appt-day">{{ appt.dayLabel }}</span>
                    <span class="udash-appt-time">{{ appt.time }}</span>
                  </div>
                  <div class="udash-appt-info">
                    <span class="udash-appt-client">{{ appt.client }}</span>
                    <span class="udash-appt-vehicle">{{ appt.vehicle }}</span>
                  </div>
                  <span class="udash-status" :class="appt.status">{{ appt.statusLabel }}</span>
                  <button type="button" class="udash-icon-btn" @click="landlordOpenAppointment(appt.id)">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="udash-card">
              <div class="udash-card-head">
                <div class="udash-card-head-l">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#386ba8" stroke-width="2.2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <h3>Publicaciones destacadas</h3>
                </div>
                <button type="button" class="udash-link" @click="landlordGoListings">Gestionar</button>
              </div>
              <div class="udash-featured-wrap udash-featured-wrap--rentals">
                <div class="udash-featured-head udash-featured-head--rentals">
                  <span>Vehículo</span>
                  <span>Tarifa diaria</span>
                  <span>Ubicación</span>
                  <span>Vigencia</span>
                  <span>Estado</span>
                  <span>Acciones</span>
                </div>
                <div v-for="l in landlordData.listings" :key="'lr-' + l.id" class="udash-featured-row udash-featured-row--rentals">
                  <div class="udash-featured-vehicle">
                    <img :src="l.image" :alt="l.title" class="udash-featured-thumb" width="48" height="36" @error="imgErr" />
                    <div class="udash-featured-titles">
                      <span class="udash-featured-name">{{ l.title }}</span>
                      <span class="udash-featured-price">${{ fmt(l.pricePerDay) }}/día</span>
                    </div>
                  </div>
                  <span class="udash-featured-metric">${{ fmt(l.pricePerDay) }}/día</span>
                  <span class="udash-featured-metric" :title="l.cityLabel">{{ l.cityLabel }}</span>
                  <span class="udash-featured-metric" :title="l.availabilityWindow">{{ l.availabilityWindow }}</span>
                  <span class="udash-listing-status" :class="l.status">{{ l.statusLabel }}</span>
                  <div class="udash-featured-actions">
                    <button type="button" class="udash-icon-btn sm" aria-label="Editar" @click="landlordEditListing(l.id)">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#386ba8" stroke-width="2.5">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button type="button" class="udash-icon-btn sm" aria-label="Ver detalle" @click="landlordViewListing(l.id)">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#386ba8" stroke-width="2">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="udash-card">
              <div class="udash-card-head udash-card-head--split">
                <div class="udash-card-head-l">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#386ba8" stroke-width="2.2">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  <div>
                    <h3>Inventario en renta</h3>
                    <p class="udash-card-sub">Listado de vehículos publicados en esta superficie</p>
                  </div>
                </div>
                <button type="button" class="udash-link udash-link--head" @click="landlordGoListings">Ver todas las publicaciones</button>
              </div>
              <div class="udash-table udash-table--compact">
                <div class="udash-table-head">
                  <span>Vehículo</span>
                  <span>Disponible desde</span>
                  <span>Disponible hasta</span>
                  <span>Estado</span>
                  <span class="udash-th-actions">Acciones</span>
                </div>
                <div v-for="r in landlordData.rentals" :key="r.id" class="udash-table-row">
                  <div class="udash-rental-name">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#386ba8" stroke-width="2">
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    {{ r.vehicle }}
                  </div>
                  <span class="udash-td">{{ r.start }}</span>
                  <span class="udash-td">{{ r.end }}</span>
                  <span class="udash-condition" :class="r.condition">{{ r.conditionLabel }}</span>
                  <div class="udash-table-actions">
                    <button type="button" class="udash-icon-btn sm" @click="landlordEditListing(r.id)">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#386ba8" stroke-width="2.5">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
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
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#386ba8" stroke-width="2.2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <h3>Acciones rápidas</h3>
                </div>
              </div>
              <div class="udash-quick-grid udash-quick-grid--outline">
                <button v-for="a in landlordActions" :key="a.label" type="button" class="udash-quick-btn udash-quick-btn--outline" @click="a.onClick">
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
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#386ba8" stroke-width="2.2">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  <h3>Rendimiento</h3>
                </div>
              </div>
              <div class="udash-perf-block">
                <div v-for="row in landlordData.performance" :key="row.label" class="udash-perf-row">
                  <div class="udash-perf-top">
                    <span class="udash-perf-label">{{ row.label }}</span>
                    <span class="udash-perf-pct">{{ row.value }}%</span>
                  </div>
                  <div class="udash-perf-track">
                    <div class="udash-perf-fill" :style="{ width: row.value + '%' }" />
                  </div>
                </div>
              </div>
            </div>

            <div class="udash-card">
              <div class="udash-card-head">
                <div class="udash-card-head-l">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#386ba8" stroke-width="2.2">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  <h3>Tarifa diaria del inventario</h3>
                </div>
              </div>
              <div class="udash-bar-chart">
                <div v-for="(item, i) in landlordData.incomeChart" :key="i" class="udash-bar-col">
                  <div class="udash-bar-wrap">
                    <div class="udash-bar-fill" :class="{ current: item.current }" :style="{ height: (item.value / maxIncome) * 100 + '%' }"></div>
                  </div>
                  <span class="udash-bar-lbl">{{ item.month }}</span>
                </div>
              </div>
            </div>

            <div class="udash-card udash-tip-card">
              <div class="udash-card-head">
                <div class="udash-card-head-l">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#386ba8" stroke-width="2.2" stroke-linejoin="round">
                    <path d="M12 3l1.2 3.6h3.8l-3 2.2 1.1 3.5L12 11.9 8.9 12.3l1.1-3.5-3-2.2h3.8L12 3z" />
                  </svg>
                  <h3>Consejo del día</h3>
                </div>
              </div>
              <p class="udash-tip-text">{{ landlordTipOfDay }}</p>
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
  removeSavedVehicleById,
  removeSearchHistoryItem,
} from '../../../services/buyer.js';
import { getAppointmentCalendar, getSellerAppointments } from '../../../services/appointments.js';
import {
  getFeaturedListings,
  getListingFeaturedPercent,
  getListings,
} from '../../../services/catalog.js';
import { DEMO_RENTAL_OWNER_ID, DEMO_SALE_OWNER_ID } from '../../../services/demoOwners.js';
import QuickActionGlyph from '../../../components/dashboard/QuickActionGlyph.vue';

const router = useRouter();

const openListingEditModal = (id, mode = 'venta') =>
  router.push({
    name: 'user-listings',
    query: { mode, edit: String(id) },
  });

const openListingInternalDetail = (id) =>
  router.push({ name: 'seller-listing-detail', params: { id: String(id) } });

const openListingPublicDetail = (id) =>
  router.push({ name: 'public-listing-detail', params: { id } });

const openListingPublicDetailInNewTab = (id) => {
  const href = router.resolve({
    name: 'public-listing-detail',
    params: { id },
  }).href;
  window.open(href, '_blank', 'noopener');
};

// ── Navegación ─────────────────────────────────────────────────
const goToNewListing = () => router.push({ name: 'create-listing' });

const sellerGoNewListing = () => router.push({ name: 'create-listing' });
const sellerGoAppointments = () =>
  router.push({ name: 'my-appointments', query: { tab: 'vendedor' } });
const sellerGoListings = () =>
  router.push({ name: 'user-listings', query: { mode: 'venta' } });
const sellerEditListing = (id, mode = 'venta') => openListingEditModal(id, mode);
const sellerOpenAppointment = (id) =>
  router.push({ name: 'seller-appointment-detail', params: { id: String(id) } });
const sellerViewListing = (id) => openListingInternalDetail(id);

const landlordGoAppointments = () =>
  router.push({ name: 'my-appointments', query: { tab: 'rentador' } });
const landlordGoListings = () =>
  router.push({ name: 'user-listings', query: { mode: 'renta' } });
const landlordEditListing = (id) => openListingEditModal(id, 'renta');
const landlordViewListing = (id) => openListingInternalDetail(id);
const landlordOpenAppointment = (id) =>
  router.push({ name: 'seller-appointment-detail', params: { id: String(id) } });

const buyerGoCatalog = () => router.push({ name: 'public-catalog' });
const buyerGoAppointments = () =>
  router.push({ name: 'my-appointments', query: { tab: 'comprador' } });
const buyerGoSaved = () => router.push({ name: 'buyer-saved-vehicles' });
const buyerGoHistory = () => router.push({ name: 'buyer-search-history' });
const buyerOpenListing = (id) => openListingPublicDetail(id);
const buyerOpenListingNewTab = (id) => openListingPublicDetailInNewTab(id);
const buyerOpenAppointment = (id) =>
  router.push({ name: 'buyer-appointment-detail', params: { id } });
const buyerRepeatSearch = (query) =>
  router.push({ name: 'public-catalog', query: { q: query } });
const buyerManageAppointment = () => buyerGoAppointments();

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
  loadSellerData();
  loadLandlordData();
});
onUnmounted(() => {
  clearInterval(timer);
});

// ── Helpers ─────────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat('es-MX').format(n);
const imgErr = (e) => {
  e.target.src = 'https://placehold.co/56x56/e2e8f0/94a3b8?text=Auto';
};

const dashboardTips = [
  'Revisa primero las citas pendientes para no perder ventanas activas de atención.',
  'Usa las rutas internas de detalle para editar publicaciones sin romper el flujo del panel.',
  'Mantén tus favoritos depurados para que el panel comprador muestre solo autos realmente relevantes.',
  'Conviene repetir búsquedas desde el historial para validar rápido si el inventario cambió.',
  'Publicaciones con ubicación y precio claros tienden a requerir menos aclaraciones antes de la cita.',
  'En rentas, revisa disponibilidad y vigencia antes de confirmar visitas relacionadas.',
  'Cuando una cita requiere acción, la superficie correcta para gestionarla es Mis citas, no el dashboard.',
];

function pickDashboardTip(offset = 0) {
  const dayIndex = Math.floor(Date.now() / 86400000);
  return dashboardTips[(dayIndex + offset) % dashboardTips.length];
}

const sellerTipOfDay = computed(() => pickDashboardTip(0));
const landlordTipOfDay = computed(() => pickDashboardTip(3));

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

const buyerConfirmedAppointments = computed(() =>
  buyerAppointmentsList.value.filter((item) => item.status === 'confirmed').length
);

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
    buyerData.value.searchesThisMonth = historyItems.length;
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
    buyerData.value.appointments = buyerAppointmentsList.value.length;
    buyerData.value.unread = buyerAppointmentsList.value.filter((item) => item.status === 'pending').length;
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
]);

async function buyerRemoveSearch(id) {
  await removeSearchHistoryItem(id);
  buyerSearchItems.value = buyerSearchItems.value.filter((s) => s.id !== id);
  buyerData.value.searchesThisMonth = buyerSearchItems.value.length;
}

async function buyerRemoveFavorite(id) {
  await removeSavedVehicleById(id);
  buyerData.value.favorites = buyerData.value.favorites.filter((item) => item.id !== id);
  buyerData.value.savedCount = buyerData.value.favorites.length;
}

// ── Data vendedor ────────────────────────────────────────────────
const sellerData = ref({
  activeListings: 0,
  messages: 0,
  unread: 0,
  appointments: 0,
  averagePrice: 0,
  averageQuality: 0,
  performance: [],
  tipOfDay:
    'Usa las rutas de detalle para revisar citas y publicaciones sin abandonar la superficie principal.',
  appointments_list: [],
  listings: [],
});

const sellerActions = [
  { label: 'Nuevo Anuncio', icon: 'plus', onClick: sellerGoNewListing },
  { label: 'Mis Citas', icon: 'calendar', onClick: sellerGoAppointments },
  { label: 'Mis publicaciones', icon: 'car', onClick: sellerGoListings },
];

const landlordActions = [
  { label: 'Nuevo Anuncio', icon: 'plus', onClick: goToNewListing },
  { label: 'Mis Citas', icon: 'calendar', onClick: landlordGoAppointments },
  { label: 'Mis publicaciones', icon: 'car', onClick: landlordGoListings },
];

// ── Data arrendador ──────────────────────────────────────────────
const landlordData = ref({
  activeRentals: 0,
  vehicles: 0,
  monthlyIncome: 0,
  reports: 0,
  pending: 0,
  appointments: 0,
  performance: [],
  appointments_list: [],
  listings: [],
  rentals: [],
  incomeChart: [],
});

async function loadSellerData() {
  const [appointments, sales, featuredSales] = await Promise.all([
    getSellerAppointments('u-seller-001'),
    getListings({ mode: 'venta', sellerId: DEMO_SALE_OWNER_ID, pageSize: 100, includeUnpublished: true }),
    getFeaturedListings({ mode: 'venta', sellerId: DEMO_SALE_OWNER_ID, limit: 3 }),
  ]);

  const apptList = Array.isArray(appointments) ? appointments : [];
  const saleItems = sales?.items || [];
  const publishedSales = saleItems.filter((item) => item.status === 'published');
  const scoredSales = publishedSales.map((item) => getListingFeaturedPercent(item));

  sellerData.value.activeListings = publishedSales.length;
  sellerData.value.messages = apptList.filter((item) => item.status === 'pending').length;
  sellerData.value.unread = sellerData.value.messages;
  sellerData.value.appointments = apptList.length;
  sellerData.value.averagePrice = publishedSales.length
    ? Math.round(publishedSales.reduce((sum, item) => sum + Number(item.price || 0), 0) / publishedSales.length)
    : 0;
  sellerData.value.averageQuality = scoredSales.length
    ? Math.round(scoredSales.reduce((sum, value) => sum + value, 0) / scoredSales.length)
    : 0;
  sellerData.value.performance = [
    {
      label: 'Publicados',
      value: saleItems.length ? Math.round((sellerData.value.activeListings / saleItems.length) * 100) : 0,
    },
    {
      label: 'Citas atendibles',
      value: apptList.length ? Math.round(((apptList.length - sellerData.value.messages) / apptList.length) * 100) : 100,
    },
    {
      label: 'Ficha completa',
      value: sellerData.value.averageQuality,
    },
  ];
  sellerData.value.appointments_list = apptList.slice(0, 3).map((item) => {
    const dateObj = new Date(`${item.date}T12:00:00`);
    return {
      id: item.id,
      dayLabel: dateObj.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' }).toUpperCase(),
      time: item.time,
      client: item.buyerName || item.buyer?.name || 'Cliente AutoSphere',
      vehicle: item.listingTitle || 'Vehículo',
      isToday: item.date === new Date().toISOString().slice(0, 10),
      status: item.status,
      statusLabel: ({ pending: 'Pendiente', confirmed: 'Confirmada', rescheduled: 'Reagendada' }[item.status] || item.status),
    };
  });
  sellerData.value.listings = (featuredSales || []).map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    image: item.coverImage,
    cityLabel: item.cityLabel || item.location?.city || 'Ubicación por confirmar',
    mode: item.mode,
    modeLabel: 'Venta',
    status: item.status === 'published' ? 'active' : 'paused',
    statusLabel: item.status === 'published' ? 'Activo' : 'Borrador',
  }));
}

async function loadLandlordData() {
  const [calendar, rentals, featuredRentals] = await Promise.all([
    getAppointmentCalendar(),
    getListings({
      mode: 'renta',
      sellerId: DEMO_RENTAL_OWNER_ID,
      pageSize: 100,
      includeUnpublished: true,
    }),
    getFeaturedListings({ mode: 'renta', sellerId: DEMO_RENTAL_OWNER_ID, limit: 3 }),
  ]);

  const calendarAppointments = calendar?.rentador?.appointments || [];
  const items = rentals?.items || [];

  landlordData.value.activeRentals = items.filter((item) => item.available !== false).length;
  landlordData.value.vehicles = items.length;
  landlordData.value.monthlyIncome = items.length
    ? Math.round(items.reduce((sum, item) => sum + Number(item.pricePerDay || item.price || 0), 0) / items.length)
    : 0;
  landlordData.value.reports = items.filter((item) => item.available === false).length;
  landlordData.value.pending = calendarAppointments.filter((item) => item.status === 'Pendiente').length;
  landlordData.value.appointments = calendarAppointments.length;
  landlordData.value.performance = [
    {
      label: 'Disponibilidad',
      value: items.length ? Math.round((landlordData.value.activeRentals / items.length) * 100) : 0,
    },
    {
      label: 'Citas atendibles',
      value: calendarAppointments.length
        ? Math.round(((calendarAppointments.length - landlordData.value.pending) / calendarAppointments.length) * 100)
        : 100,
    },
    {
      label: 'Ficha completa',
      value: items.length ? Math.round(items.map((item) => getListingFeaturedPercent(item)).reduce((sum, value) => sum + value, 0) / items.length) : 0,
    },
  ];

  landlordData.value.appointments_list = [...calendarAppointments]
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
    .slice(0, 3)
    .map((item) => {
      const dateObj = new Date(`${item.date}T12:00:00`);
      const rawStatus = String(item.status || '').toLowerCase();
      const status = {
        pendiente: 'pending',
        confirmada: 'confirmed',
        completada: 'completed',
        cancelada: 'cancelled',
      }[rawStatus] || 'pending';
      return {
        id: item.id,
        dayLabel: dateObj.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' }).toUpperCase(),
        time: item.time,
        client: item.client || item.renter?.name || 'Cliente AutoSphere',
        vehicle: item.vehicle,
        isToday: item.date === new Date().toISOString().slice(0, 10),
        status,
        statusLabel: item.status,
      };
    });

  landlordData.value.listings = (featuredRentals || []).map((item) => ({
    id: item.id,
    title: item.title,
    pricePerDay: Number(item.pricePerDay || item.price || 0),
    image: item.coverImage,
    cityLabel: item.cityLabel || item.location?.city || 'Ubicación por confirmar',
    availabilityWindow: [item.availableFrom, item.availableTo].filter(Boolean).join(' → ') || 'Vigencia por definir',
    status: item.available === false ? 'paused' : 'active',
    statusLabel: item.available === false ? 'Ocupado' : 'Activo',
  }));

  landlordData.value.rentals = items.slice(0, 3).map((item) => ({
    id: item.id,
    vehicle: item.title,
    start: item.availableFrom || '—',
    end: item.availableTo || '—',
    condition: item.available === false ? 'not-impeccable' : 'impeccable',
    conditionLabel: item.available === false ? 'No disponible' : 'Disponible',
  }));

  landlordData.value.incomeChart = items.slice(0, 6).map((item, index) => ({
    month: `R${index + 1}`,
    value: Number(item.pricePerDay || item.price || 0),
    current: index === 0,
  }));
}

const maxIncome = computed(() =>
  Math.max(1, ...landlordData.value.incomeChart.map((i) => i.value))
);
</script>

<style scoped src="./styles.css"></style>
