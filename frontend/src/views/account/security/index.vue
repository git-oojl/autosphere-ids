<template>
  <section class="admin-security-page">
    <header class="security-header">
      <div>
        <p class="eyebrow">Panel de Administración</p>
        <h1>Seguridad del sistema</h1>
        <p class="description">
          Revisa accesos, sesiones activas y alertas de seguridad. Solo los
          administradores pueden ver esta sección.
        </p>
      </div>

      <div class="header-actions">
        <button class="btn-primary" type="button" @click="reviewSessions">
          Revisar sesiones activas
        </button>
        <button class="btn-secondary" type="button" @click="openAuditLog">
          Abrir registro de auditoría
        </button>
      </div>
    </header>

    <div class="hero-cards">
      <article class="hero-card warning-card">
        <span class="hero-label">Alertas críticas</span>
        <strong>{{ securityStats.criticalAlerts }}</strong>
        <p>{{ securityStats.criticalLabel }}</p>
      </article>
      <article class="hero-card info-card">
        <span class="hero-label">Sesiones activas</span>
        <strong>{{ securityStats.activeSessions }}</strong>
        <p>{{ securityStats.sessionLabel }}</p>
      </article>
      <article class="hero-card success-card">
        <span class="hero-label">Configuración MFA</span>
        <strong>{{ securityStats.mfaEnabled }}%</strong>
        <p>{{ securityStats.mfaLabel }}</p>
      </article>
    </div>

    <div class="content-grid">
      <main class="main-column">
        <section class="panel-card overview-card">
          <div class="panel-title-row">
            <div>
              <p class="card-eyebrow">Resumen de seguridad</p>
              <h2>Monitoreo y controles</h2>
            </div>
            <span class="badge">Administrativo</span>
          </div>

          <div class="overview-copy">
            Estas métricas te ayudan a controlar accesos y actividades
            sospechosas dentro de AutoSphere. Mantén el sistema protegido con
            acciones rápidas.
          </div>

          <div class="summary-grid">
            <div class="summary-item">
              <span class="summary-label">Incidentes abiertos</span>
              <strong>{{ securityStats.openIncidents }}</strong>
            </div>
            <div class="summary-item">
              <span class="summary-label">Bloqueos recientes</span>
              <strong>{{ securityStats.recentBlocks }}</strong>
            </div>
            <div class="summary-item">
              <span class="summary-label">Ventas con riesgo</span>
              <strong>{{ securityStats.riskyListings }}</strong>
            </div>
          </div>
        </section>

        <section class="panel-card sessions-card">
          <div class="panel-title-row">
            <div>
              <p class="card-eyebrow">Sesiones activas</p>
              <h2>Usuarios conectados</h2>
            </div>
            <button class="btn-link" type="button" @click="reviewSessions">
              Ver todo
            </button>
          </div>

          <ul class="session-list">
            <li
              v-for="session in sessions"
              :key="session.id"
              class="session-item"
            >
              <div>
                <p class="session-user">{{ session.user }}</p>
                <p class="session-meta">
                  {{ session.role }} · {{ session.device }}
                </p>
              </div>
              <div class="session-right">
                <span class="session-status" :class="session.status">
                  {{ session.status }}
                </span>
                <button
                  class="btn-sm"
                  type="button"
                  @click="terminateSession(session.id)"
                >
                  Terminar
                </button>
              </div>
            </li>
          </ul>
        </section>

        <section class="panel-card incidents-card">
          <div class="panel-title-row">
            <div>
              <p class="card-eyebrow">Alertas & eventos</p>
              <h2>Eventos recientes</h2>
            </div>
          </div>

          <div class="events-list">
            <article v-for="event in events" :key="event.id" class="event-row">
              <div>
                <p class="event-title">{{ event.title }}</p>
                <p class="event-meta">{{ event.time }} — {{ event.source }}</p>
              </div>
              <span class="event-severity" :class="event.severity">
                {{ event.severityLabel }}
              </span>
            </article>
          </div>
        </section>
      </main>

      <aside class="sidebar-column">
        <section class="panel-card quick-actions-card">
          <p class="card-eyebrow">Acciones rápidas</p>
          <h2>Controles</h2>

          <div class="action-list">
            <button class="action-button" type="button" @click="toggleMfa">
              {{ quickActions[0].label }}
            </button>
            <button
              class="action-button"
              type="button"
              @click="triggerPasswordReset"
            >
              {{ quickActions[1].label }}
            </button>
            <button class="action-button" type="button" @click="openAuditLog">
              {{ quickActions[2].label }}
            </button>
          </div>
        </section>

        <section class="panel-card shield-card">
          <div class="panel-title-row">
            <div>
              <p class="card-eyebrow">Protección</p>
              <h2>Riesgo de acceso</h2>
            </div>
          </div>

          <div class="risk-list">
            <div v-for="item in riskItems" :key="item.label" class="risk-item">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </div>
          </div>
        </section>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const securityStats = ref({
  criticalAlerts: 6,
  criticalLabel: 'Alertas que requieren revisión inmediata',
  activeSessions: 18,
  sessionLabel: 'Conexiones activas en la plataforma',
  mfaEnabled: 72,
  mfaLabel: 'Porcentaje de cuentas con MFA activado',
  openIncidents: 4,
  recentBlocks: 12,
  riskyListings: 7,
});

const sessions = ref([
  {
    id: 's1',
    user: 'Admin Central',
    role: 'admin',
    device: 'Chrome · Windows 11',
    status: 'active',
  },
  {
    id: 's2',
    user: 'Dev Buyer',
    role: 'buyer',
    device: 'Firefox · macOS',
    status: 'active',
  },
  {
    id: 's3',
    user: 'Vendedor VIP',
    role: 'seller',
    device: 'Safari · iPad',
    status: 'suspicious',
  },
]);

const events = ref([
  {
    id: 'e1',
    title: 'Inicio de sesión fallido detectado',
    time: 'Hace 5 min',
    source: 'IP 196.54.12.34',
    severity: 'high',
    severityLabel: 'Alto',
  },
  {
    id: 'e2',
    title: 'Nueva contraseña establecida',
    time: 'Hace 18 min',
    source: 'admin@dev.local',
    severity: 'low',
    severityLabel: 'Bajo',
  },
  {
    id: 'e3',
    title: 'Intento de acceso desde ubicación desconocida',
    time: 'Hace 35 min',
    source: 'IP 88.23.44.99',
    severity: 'medium',
    severityLabel: 'Medio',
  },
]);

const quickActions = [
  { label: 'Forzar MFA en toda la organización' },
  { label: 'Solicitar reinicio masivo de contraseña' },
  { label: 'Ver registros de auditoría' },
];

const riskItems = ref([
  { label: 'IPs bloqueadas', value: '16' },
  { label: 'Sesiones sospechosas', value: '3' },
  { label: 'Cuentas en revisión', value: '5' },
]);

function reviewSessions() {
  window.alert('Navegando a revisión de sesiones...');
}

function openAuditLog() {
  window.alert('Abriendo el registro de auditoría...');
}

function terminateSession(sessionId) {
  window.alert(`Terminando sesión ${sessionId}`);
}

function toggleMfa() {
  window.alert('Forzando MFA global...');
}

function triggerPasswordReset() {
  window.alert('Solicitando reinicio masivo de contraseñas...');
}
</script>

<style scoped src="./styles.css"></style>
