<template>
  <div class="udash">
    <div class="udash-header">
      <br /><br /><br /><br />

      <div class="udash-header-inner">
        <div class="udash-header-left">
          <br /><br /><br />

          <div class="udash-avatar">{{ userInitials }}</div>
          <div>
            <span class="udash-eyebrow">Mi cuenta</span>
            <h1 class="udash-title">{{ user.name }}</h1>
            <span class="udash-sub">
              Gestiona tus actividades · Actualizado: {{ currentTime }}
            </span>
          </div>
        </div>

        <button class="udash-btn-primary" @click="goToNewListing">
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

      <!-- TABS -->
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
        <!-- Stats -->
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
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span class="udash-stat-lbl">Favoritos</span>
              <span class="udash-stat-val">{{
                buyerData.favorites.length
              }}</span>
              <span class="udash-stat-sub">autos guardados</span>
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span class="udash-stat-lbl">Búsquedas guardadas</span>
              <span class="udash-stat-val">{{
                buyerData.savedSearches.length
              }}</span>
              <span class="udash-stat-sub">activas</span>
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

          <div class="udash-stat-card">
            <div class="udash-stat-icon" style="background: #ede9fe">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7c3aed"
                stroke-width="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span class="udash-stat-lbl">Citas agendadas</span>
              <span class="udash-stat-val">{{ buyerData.appointments }}</span>
              <span class="udash-stat-sub">próximas</span>
            </div>
          </div>
        </div>

        <!-- Grid principal -->
        <div class="udash-grid">
          <!-- Favoritos -->
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
                <h3>Autos Favoritos</h3>
              </div>
              <button class="udash-link">Ver todos →</button>
            </div>

            <!-- Empty state -->
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
              <p>Aún no tienes autos favoritos</p>
              <button class="udash-btn-outline">Explorar catálogo</button>
            </div>

            <div v-else>
              <div
                v-for="car in buyerData.favorites"
                :key="car.id"
                class="udash-fav-row"
              >
                <img
                  :src="car.image"
                  :alt="car.title"
                  class="udash-fav-img"
                  @error="imgErr"
                />
                <div class="udash-fav-info">
                  <span class="udash-fav-title">{{ car.title }}</span>
                  <span class="udash-fav-meta"
                    >{{ car.city }} · {{ car.year }}</span
                  >
                </div>
                <div class="udash-fav-r">
                  <span class="udash-fav-price">${{ fmt(car.price) }}</span>
                  <span v-if="car.dropped" class="udash-dropped">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                    Bajó de precio
                  </span>
                </div>
                <button class="udash-icon-btn">
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

          <!-- Columna lateral comprador -->
          <div class="udash-side">
            <!-- Acciones rápidas -->
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
                  <h3>Acciones Rápidas</h3>
                </div>
              </div>
              <div class="udash-quick-grid">
                <button
                  v-for="a in buyerActions"
                  :key="a.label"
                  class="udash-quick-btn"
                >
                  <div
                    class="udash-quick-icon"
                    :style="{ background: a.bg }"
                  ></div>
                  <span>{{ a.label }}</span>
                </button>
              </div>
            </div>

            <!-- Búsquedas guardadas -->
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
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <h3>Búsquedas Guardadas</h3>
                </div>
              </div>
              <div>
                <div
                  v-for="s in buyerData.savedSearches"
                  :key="s.id"
                  class="udash-mini-row"
                >
                  <div class="udash-mini-info">
                    <span class="udash-mini-title">{{ s.name }}</span>
                    <span class="udash-mini-meta"
                      >{{ s.results }} resultados · {{ s.updated }}</span
                    >
                  </div>
                  <button class="udash-link">Ver →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ════════════════════════════════════════════
           TAB VENDEDOR
      ════════════════════════════════════════════ -->
      <div v-if="activeTab === 'vendedor'" class="udash-tab-content">
        <div class="udash-stats">
          <!-- Stat destacada azul -->
          <div class="udash-stat-card accent-blue">
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
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <div class="udash-stat-body">
              <span
                class="udash-stat-lbl"
                style="color: rgba(255, 255, 255, 0.65)"
                >Anuncios activos</span
              >
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
        </div>

        <div class="udash-grid">
          <!-- Próximas citas -->
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
                <h3>Próximas Citas</h3>
              </div>
              <button class="udash-link">Ver todas →</button>
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
                <button class="udash-icon-btn">
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

          <!-- Lateral vendedor -->
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
                  <h3>Acciones Rápidas</h3>
                </div>
              </div>
              <div class="udash-quick-grid">
                <button
                  v-for="a in sellerActions"
                  :key="a.label"
                  class="udash-quick-btn"
                >
                  <div
                    class="udash-quick-icon"
                    :style="{ background: a.bg }"
                  ></div>
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
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                  <h3>Mis Anuncios</h3>
                </div>
                <button class="udash-link">Ver todos →</button>
              </div>
              <div>
                <div
                  v-for="l in sellerData.listings"
                  :key="l.id"
                  class="udash-mini-row"
                >
                  <div class="udash-dot" :class="l.status"></div>
                  <div class="udash-mini-info">
                    <span class="udash-mini-title">{{ l.title }}</span>
                    <span class="udash-mini-meta"
                      >{{ l.views }} vistas · {{ l.statusLabel }}</span
                    >
                  </div>
                  <span class="udash-mini-price">${{ fmt(l.price) }}</span>
                </div>
              </div>
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

        <div class="udash-grid">
          <!-- Tabla rentas -->
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
                <h3>Rentas Activas</h3>
              </div>
              <button class="udash-link">Ver todas →</button>
            </div>

            <div class="udash-table">
              <div class="udash-table-head">
                <span>Vehículo</span>
                <span>Inicio</span>
                <span>Fin</span>
                <span>Estado</span>
                <span>Acciones</span>
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
                  <button class="udash-icon-btn sm">
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
                  <button class="udash-icon-btn sm danger">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#dc2626"
                      stroke-width="2.5"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path
                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Paginación -->
            <div class="udash-pagination">
              <button
                class="udash-page-btn"
                :disabled="page === 1"
                @click="page--"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <span>Página {{ page }} de {{ totalPages }}</span>
              <button
                class="udash-page-btn"
                :disabled="page === totalPages"
                @click="page++"
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

          <!-- Lateral arrendador -->
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
                  <h3>Acciones Rápidas</h3>
                </div>
              </div>
              <div class="udash-quick-grid">
                <button
                  v-for="a in landlordActions"
                  :key="a.label"
                  class="udash-quick-btn"
                >
                  <div
                    class="udash-quick-icon"
                    :style="{ background: a.bg }"
                  ></div>
                  <span>{{ a.label }}</span>
                </button>
              </div>
            </div>

            <!-- Mini gráfica ingresos -->
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

const router = useRouter();

// ── Navegación ─────────────────────────────────────────────────
const goToNewListing = () => router.push({ name: 'create-listing' });

// ── Estado ─────────────────────────────────────────────────────
const activeTab = ref('comprador');
const page = ref(1);
const totalPages = ref(2);

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
});
onUnmounted(() => clearInterval(timer));

// ── Usuario ─────────────────────────────────────────────────────
// En producción conectar con useAuthStore().user
const user = ref({ name: 'Carlos Méndez' });
const userInitials = computed(() =>
  user.value.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
);

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
const buyerData = ref({
  messages: 5,
  unread: 2,
  appointments: 3,
  favorites: [
    {
      id: 1,
      title: 'Toyota Corolla LE 2020',
      city: 'Guadalajara',
      year: 2020,
      price: 289000,
      dropped: true,
      image:
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=56&h=56&fit=crop',
    },
    {
      id: 2,
      title: 'Honda CR-V Touring 2022',
      city: 'CDMX',
      year: 2022,
      price: 598000,
      dropped: false,
      image:
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=56&h=56&fit=crop',
    },
    {
      id: 3,
      title: 'Volkswagen Jetta 2023',
      city: 'Monterrey',
      year: 2023,
      price: 529000,
      dropped: false,
      image:
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=56&h=56&fit=crop',
    },
  ],
  savedSearches: [
    { id: 1, name: 'SUV automática < $600k', results: 24, updated: 'Hace 2h' },
    { id: 2, name: 'Sedán 2021–2023 CDMX', results: 11, updated: 'Ayer' },
  ],
});

const buyerActions = [
  {
    label: 'Buscar autos',
    bg: '#eef3fa',
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#386ba8" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  },
  {
    label: 'Mis citas',
    bg: '#ede9fe',
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  },
  {
    label: 'Mensajes',
    bg: '#d1fae5',
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  },
  {
    label: 'Comparar',
    bg: '#fef9c3',
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.2"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>`,
  },
];

// ── Data vendedor ────────────────────────────────────────────────
const sellerData = ref({
  activeListings: 24,
  messages: 12,
  unread: 2,
  appointments: 8,
  views: 1846,
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
      status: 'active',
      statusLabel: 'Activo',
    },
    {
      id: 2,
      title: 'Porsche 911 2019',
      price: 1850000,
      views: 94,
      status: 'active',
      statusLabel: 'Activo',
    },
    {
      id: 3,
      title: 'Chevrolet Silverado',
      price: 520000,
      views: 57,
      status: 'paused',
      statusLabel: 'Pausado',
    },
  ],
});

const sellerActions = [
  {
    label: 'Nuevo Anuncio',
    bg: '#eef3fa',
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#386ba8" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  },
  {
    label: 'Nueva Cita',
    bg: '#ede9fe',
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  },
  {
    label: 'Mensajes',
    bg: '#fef9c3',
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  },
  {
    label: 'Analíticas',
    bg: '#d1fae5',
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  },
];

// ── Data arrendador ──────────────────────────────────────────────
const landlordData = ref({
  activeRentals: 5,
  vehicles: 5,
  monthlyIncome: 91000,
  reports: 3,
  pending: 1,
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
  {
    label: 'Agregar vehículo',
    bg: '#eef3fa',
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#386ba8" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  },
  {
    label: 'Nueva renta',
    bg: '#d1fae5',
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  },
  {
    label: 'Reportes',
    bg: '#fee2e2',
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  },
  {
    label: 'Ingresos',
    bg: '#fef9c3',
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  },
];
</script>

<style scoped src="./styles.css"></style>
