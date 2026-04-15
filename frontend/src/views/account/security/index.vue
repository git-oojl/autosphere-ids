<template>
  <div class="security-page">
    <br /><br /><br /><br /><br />
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-container">
        <div class="header-left">
          <div>
            <h1 class="page-title">Seguridad</h1>
            <p class="page-subtitle">
              Gestiona la seguridad de tu cuenta y protege tu información
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Security Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M12 8v4M12 16h.01"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ securityScore }}%</span>
          <span class="stat-title">Puntuación de seguridad</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="2"
            />
            <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ activeSessions }}</span>
          <span class="stat-title">Sesiones activas</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16v16H4V4z" stroke="currentColor" stroke-width="2" />
            <path
              d="M8 8h8M8 12h6M8 16h4"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ lastPasswordDays }}</span>
          <span class="stat-title">Días desde último cambio de contraseña</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2a10 10 0 1010 10 10 10 0 00-10-10z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M12 6v4M12 14h.01"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-number">{{ securityIssues }}</span>
          <span class="stat-title">Recomendaciones de seguridad</span>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="content-grid">
      <!-- Left Column -->
      <div class="left-column">
        <!-- Cambiar Contraseña -->
        <div class="security-card">
          <div class="card-header">
            <div class="card-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <div class="card-header-text">
              <h2 class="card-title">Cambiar contraseña</h2>
              <p class="card-subtitle">
                Actualiza tu contraseña regularmente para mantener tu cuenta
                segura
              </p>
            </div>
          </div>
          <div class="card-body">
            <form @submit.prevent="changePassword">
              <div class="form-group">
                <label class="form-label">Contraseña actual</label>
                <div
                  class="input-wrapper"
                  :class="{ focused: focus.currentPassword }"
                >
                  <span class="input-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </span>
                  <input
                    v-model="passwordForm.current"
                    :type="showCurrentPassword ? 'text' : 'password'"
                    class="form-input"
                    placeholder="Ingresa tu contraseña actual"
                    @focus="focus.currentPassword = true"
                    @blur="focus.currentPassword = false"
                  />
                  <button
                    type="button"
                    class="password-toggle"
                    @click="showCurrentPassword = !showCurrentPassword"
                  >
                    <svg
                      v-if="!showCurrentPassword"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg
                      v-else
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                      />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Nueva contraseña</label>
                <div
                  class="input-wrapper"
                  :class="{ focused: focus.newPassword }"
                >
                  <span class="input-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </span>
                  <input
                    v-model="passwordForm.new"
                    :type="showNewPassword ? 'text' : 'password'"
                    class="form-input"
                    placeholder="Nueva contraseña"
                    @focus="focus.newPassword = true"
                    @blur="focus.newPassword = false"
                  />
                  <button
                    type="button"
                    class="password-toggle"
                    @click="showNewPassword = !showNewPassword"
                  >
                    <svg
                      v-if="!showNewPassword"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg
                      v-else
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                      />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
                <div v-if="passwordForm.new" class="password-strength">
                  <div class="strength-bar">
                    <div
                      class="strength-fill"
                      :style="{
                        width: passwordStrength + '%',
                        background: strengthColor,
                      }"
                    ></div>
                  </div>
                  <span
                    class="strength-text"
                    :style="{ color: strengthColor }"
                    >{{ strengthText }}</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Confirmar nueva contraseña</label>
                <div
                  class="input-wrapper"
                  :class="{ focused: focus.confirmPassword }"
                >
                  <span class="input-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </span>
                  <input
                    v-model="passwordForm.confirm"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="form-input"
                    placeholder="Confirma tu nueva contraseña"
                    @focus="focus.confirmPassword = true"
                    @blur="focus.confirmPassword = false"
                  />
                  <button
                    type="button"
                    class="password-toggle"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <svg
                      v-if="!showConfirmPassword"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg
                      v-else
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                      />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="form-actions">
                <button
                  type="submit"
                  class="btn-primary"
                  :disabled="isChangingPassword"
                >
                  <span v-if="isChangingPassword" class="spinner"></span>
                  <svg
                    v-else
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  {{
                    isChangingPassword
                      ? 'Actualizando...'
                      : 'Actualizar contraseña'
                  }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Autenticación de Dos Factores (2FA) - Solo para usuarios registrados -->
        <div v-if="userRole !== 'admin'" class="security-card">
          <div class="card-header">
            <div class="card-icon green">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10"
                />
                <path d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div class="card-header-text">
              <h2 class="card-title">Autenticación de dos factores</h2>
              <p class="card-subtitle">
                Añade una capa extra de seguridad a tu cuenta
              </p>
            </div>
            <div class="card-badge" :class="{ active: twoFactorEnabled }">
              {{ twoFactorEnabled ? 'Activado' : 'Desactivado' }}
            </div>
          </div>
          <div class="card-body">
            <div v-if="!twoFactorEnabled">
              <p class="info-text">
                Protege tu cuenta con verificación en dos pasos. Recibirás un
                código único en tu teléfono cada vez que inicies sesión.
              </p>
              <button class="btn-secondary" @click="setupTwoFactor">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Configurar 2FA
              </button>
            </div>
            <div v-else class="two-factor-status">
              <div class="status-row">
                <span class="status-label">Método de verificación</span>
                <span class="status-value">SMS / Autenticador</span>
              </div>
              <div class="status-row">
                <span class="status-label">Teléfono vinculado</span>
                <span class="status-value">{{
                  userPhone || 'No vinculado'
                }}</span>
              </div>
              <button class="btn-outline" @click="disableTwoFactor">
                Desactivar 2FA
              </button>
            </div>
          </div>
        </div>

        <!-- Dispositivos Confiables - Solo para usuarios registrados -->
        <div v-if="userRole !== 'admin'" class="security-card">
          <div class="card-header">
            <div class="card-icon purple">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12" y2="18" />
              </svg>
            </div>
            <div class="card-header-text">
              <h2 class="card-title">Dispositivos confiables</h2>
              <p class="card-subtitle">
                Administra los dispositivos que tienen acceso a tu cuenta
              </p>
            </div>
          </div>
          <div class="card-body">
            <div class="devices-list">
              <div
                v-for="device in trustedDevices"
                :key="device.id"
                class="device-item"
              >
                <div class="device-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect
                      v-if="device.type === 'desktop'"
                      x="2"
                      y="3"
                      width="20"
                      height="14"
                      rx="2"
                      ry="2"
                    />
                    <rect
                      v-else
                      x="5"
                      y="2"
                      width="14"
                      height="20"
                      rx="2"
                      ry="2"
                    />
                  </svg>
                </div>
                <div class="device-info">
                  <span class="device-name">{{ device.name }}</span>
                  <span class="device-detail"
                    >{{ device.browser }} • {{ device.os }}</span
                  >
                  <span class="device-date"
                    >Último acceso: {{ device.lastUsed }}</span
                  >
                </div>
                <button
                  class="device-remove"
                  title="Eliminar dispositivo"
                  @click="removeDevice(device.id)"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <button class="btn-outline" @click="logoutOtherDevices">
              Cerrar sesión en otros dispositivos
            </button>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Actividad Reciente -->
        <div class="security-card">
          <div class="card-header">
            <div class="card-icon orange">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div class="card-header-text">
              <h2 class="card-title">Actividad reciente</h2>
              <p class="card-subtitle">
                Inicios de sesión y actividad en tu cuenta
              </p>
            </div>
          </div>
          <div class="card-body">
            <div class="activity-list">
              <div
                v-for="activity in recentActivity"
                :key="activity.id"
                class="activity-item"
              >
                <div class="activity-icon" :class="activity.type">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      v-if="activity.type === 'login'"
                      d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"
                    />
                    <path
                      v-else-if="activity.type === 'password'"
                      d="M12 5v14M5 12h14"
                    />
                    <path v-else d="M20 12H4" />
                  </svg>
                </div>
                <div class="activity-info">
                  <span class="activity-title">{{ activity.title }}</span>
                  <span class="activity-time">{{ activity.time }}</span>
                </div>
                <div v-if="activity.location" class="activity-location">
                  {{ activity.location }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recomendaciones de Seguridad -->
        <div class="security-card">
          <div class="card-header">
            <div class="card-icon blue">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div class="card-header-text">
              <h2 class="card-title">Recomendaciones de seguridad</h2>
              <p class="card-subtitle">Mejora la protección de tu cuenta</p>
            </div>
          </div>
          <div class="card-body">
            <div class="recommendations-list">
              <div
                v-for="rec in securityRecommendations"
                :key="rec.id"
                class="recommendation-item"
                :class="{ completed: rec.completed }"
              >
                <div class="rec-check">
                  <svg
                    v-if="rec.completed"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <svg
                    v-else
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div class="rec-info">
                  <span class="rec-title">{{ rec.title }}</span>
                  <span class="rec-desc">{{ rec.description }}</span>
                </div>
                <button
                  v-if="!rec.completed"
                  class="rec-action"
                  @click="takeAction(rec)"
                >
                  {{ rec.action }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Zona de Peligro (solo visible para usuarios registrados) -->
        <div v-if="userRole !== 'guest'" class="security-card danger-zone">
          <div class="card-header">
            <div class="card-icon red">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </div>
            <div class="card-header-text">
              <h2 class="card-title">Zona de peligro</h2>
              <p class="card-subtitle">Acciones irreversibles para tu cuenta</p>
            </div>
          </div>
          <div class="card-body">
            <div class="danger-item">
              <div class="danger-info">
                <span class="danger-title"
                  >Cerrar sesión en todos los dispositivos</span
                >
                <span class="danger-desc"
                  >Terminará todas las sesiones activas excepto la actual</span
                >
              </div>
              <button class="btn-warning" @click="logoutAllDevices">
                Cerrar todas las sesiones
              </button>
            </div>
            <div v-if="userRole !== 'admin'" class="danger-item">
              <div class="danger-info">
                <span class="danger-title"
                  >Desactivar cuenta temporalmente</span
                >
                <span class="danger-desc"
                  >Tu perfil quedará oculto hasta que lo reactives</span
                >
              </div>
              <button class="btn-warning" @click="deactivateAccount">
                Desactivar cuenta
              </button>
            </div>
            <div class="danger-item">
              <div class="danger-info">
                <span class="danger-title"
                  >Eliminar cuenta permanentemente</span
                >
                <span class="danger-desc">Esta acción es irreversible</span>
              </div>
              <button class="btn-danger" @click="showDeleteModal = true">
                Eliminar cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2FA Setup Modal -->
    <div
      v-if="show2FAModal"
      class="modal-overlay"
      @click.self="show2FAModal = false"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h2>Configurar autenticación de dos factores</h2>
          <button class="modal-close" @click="show2FAModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="qr-container">
            <div class="qr-placeholder">
              <svg width="200" height="200" viewBox="0 0 200 200">
                <rect width="200" height="200" fill="#f8f9fb" />
                <rect x="20" y="20" width="160" height="160" fill="#e2e8f0" />
                <rect x="40" y="40" width="40" height="40" fill="#94a3b8" />
                <rect x="120" y="40" width="40" height="40" fill="#94a3b8" />
                <rect x="40" y="120" width="40" height="40" fill="#94a3b8" />
                <rect x="120" y="120" width="40" height="40" fill="#94a3b8" />
                <rect x="80" y="80" width="40" height="40" fill="#3b82f6" />
              </svg>
            </div>
            <p class="qr-instruction">
              Escanea este código QR con Google Authenticator o similar
            </p>
            <p class="qr-code">
              Código secreto: <strong>ABCD EFGH IJKL MNOP</strong>
            </p>
          </div>
          <div class="form-group">
            <label class="form-label">Código de verificación</label>
            <input
              v-model="twoFactorCode"
              type="text"
              class="form-input"
              placeholder="Ingresa el código de 6 dígitos"
            />
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" @click="show2FAModal = false">
              Cancelar
            </button>
            <button class="btn-primary" @click="enableTwoFactor">
              Verificar y activar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <div
      v-if="showDeleteModal"
      class="modal-overlay"
      @click.self="showDeleteModal = false"
    >
      <div class="modal-content small">
        <div class="modal-header">
          <h2>Eliminar cuenta</h2>
          <button class="modal-close" @click="showDeleteModal = false">
            ×
          </button>
        </div>
        <div class="modal-body">
          <div class="confirmation-icon warning">⚠️</div>
          <p class="confirmation-text">
            ¿Estás seguro de que deseas eliminar tu cuenta?
          </p>
          <p class="confirmation-subtext">
            Esta acción es irreversible. Todos tus datos serán eliminados
            permanentemente.
          </p>
          <div class="form-group">
            <label class="form-label">Escribe "ELIMINAR" para confirmar</label>
            <input v-model="deleteConfirmText" type="text" class="form-input" />
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" @click="showDeleteModal = false">
              Cancelar
            </button>
            <button
              class="btn-danger"
              :disabled="deleteConfirmText !== 'ELIMINAR'"
              @click="deleteAccount"
            >
              Eliminar cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// ============================================
// USER ROLE DETECTION
// ============================================
// En producción, esto vendría del store de autenticación
const userRole = ref('user'); // 'user' | 'admin'
const userPhone = ref('+52 55 1234 5678');

// Security data
const securityScore = ref(85);
const activeSessions = ref(2);
const lastPasswordDays = ref(45);
const securityIssues = ref(3);
const twoFactorEnabled = ref(false);

// Password form
const passwordForm = ref({
  current: '',
  new: '',
  confirm: '',
});

const focus = ref({
  currentPassword: false,
  newPassword: false,
  confirmPassword: false,
});

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const isChangingPassword = ref(false);

// 2FA
const show2FAModal = ref(false);
const twoFactorCode = ref('');

// Delete account
const showDeleteModal = ref(false);
const deleteConfirmText = ref('');

// Trusted devices
const trustedDevices = ref([
  {
    id: 1,
    name: 'MacBook Pro',
    type: 'desktop',
    browser: 'Chrome',
    os: 'macOS',
    lastUsed: 'Hoy, 10:30 AM',
  },
  {
    id: 2,
    name: 'iPhone 14 Pro',
    type: 'mobile',
    browser: 'Safari',
    os: 'iOS',
    lastUsed: 'Ayer, 8:15 PM',
  },
]);

// Recent activity
const recentActivity = ref([
  {
    id: 1,
    type: 'login',
    title: 'Inicio de sesión',
    time: 'Hoy, 10:30 AM',
    location: 'Ciudad de México, MX',
  },
  {
    id: 2,
    type: 'login',
    title: 'Inicio de sesión',
    time: 'Ayer, 8:15 PM',
    location: 'Guadalajara, MX',
  },
  {
    id: 3,
    type: 'password',
    title: 'Cambio de contraseña',
    time: 'Hace 3 días',
    location: null,
  },
  {
    id: 4,
    type: 'security',
    title: 'Configuración de seguridad actualizada',
    time: 'Hace 1 semana',
    location: null,
  },
]);

// Security recommendations
const securityRecommendations = ref([
  {
    id: 2,
    title: 'Actualizar contraseña',
    description: 'Tu contraseña tiene más de 90 días',
    action: 'Actualizar',
    completed: false,
  },
  {
    id: 3,
    title: 'Verificar número de teléfono',
    description: 'Añade un número de teléfono para recuperación',
    action: 'Verificar',
    completed: true,
  },
  {
    id: 4,
    title: 'Revisar dispositivos conectados',
    description: 'Hay 2 dispositivos con acceso a tu cuenta',
    action: 'Revisar',
    completed: false,
  },
]);

// Password strength
const passwordStrength = computed(() => {
  const pwd = passwordForm.value.new;
  if (!pwd) return 0;
  let strength = 0;
  if (pwd.length >= 8) strength += 25;
  if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength += 25;
  if (pwd.match(/[0-9]/)) strength += 25;
  if (pwd.match(/[^a-zA-Z0-9]/)) strength += 25;
  return strength;
});

const strengthText = computed(() => {
  const strength = passwordStrength.value;
  if (strength < 25) return 'Muy débil';
  if (strength < 50) return 'Débil';
  if (strength < 75) return 'Media';
  return 'Fuerte';
});

const strengthColor = computed(() => {
  const strength = passwordStrength.value;
  if (strength < 25) return '#ef4444';
  if (strength < 50) return '#f59e0b';
  if (strength < 75) return '#eab308';
  return '#10b981';
});

// Methods

const changePassword = () => {
  if (
    !passwordForm.value.current ||
    !passwordForm.value.new ||
    !passwordForm.value.confirm
  ) {
    alert('Por favor completa todos los campos');
    return;
  }

  if (passwordForm.value.new !== passwordForm.value.confirm) {
    alert('Las contraseñas nuevas no coinciden');
    return;
  }

  if (passwordForm.value.new.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres');
    return;
  }

  if (passwordStrength.value < 50) {
    alert('Por favor elige una contraseña más segura');
    return;
  }

  isChangingPassword.value = true;

  setTimeout(() => {
    alert('Contraseña actualizada correctamente');
    passwordForm.value = { current: '', new: '', confirm: '' };
    isChangingPassword.value = false;
    lastPasswordDays.value = 0;
  }, 1500);
};

const setupTwoFactor = () => {
  show2FAModal.value = true;
};

const enableTwoFactor = () => {
  if (twoFactorCode.value.length === 6) {
    twoFactorEnabled.value = true;
    show2FAModal.value = false;
    twoFactorCode.value = '';
    alert('Autenticación de dos factores activada correctamente');

    // Marcar recomendación como completada
    const rec = securityRecommendations.value.find((r) => r.id === 1);
    if (rec) rec.completed = true;
    securityIssues.value = securityRecommendations.value.filter(
      (r) => !r.completed
    ).length;
    securityScore.value = 100 - securityIssues.value * 5;
  } else {
    alert('Por favor ingresa un código válido de 6 dígitos');
  }
};

const disableTwoFactor = () => {
  if (
    confirm(
      '¿Estás seguro de que deseas desactivar la autenticación de dos factores?'
    )
  ) {
    twoFactorEnabled.value = false;
    alert('Autenticación de dos factores desactivada');

    const rec = securityRecommendations.value.find((r) => r.id === 1);
    if (rec) rec.completed = false;
    securityIssues.value = securityRecommendations.value.filter(
      (r) => !r.completed
    ).length;
    securityScore.value = 100 - securityIssues.value * 5;
  }
};

const removeDevice = (deviceId) => {
  if (confirm('¿Eliminar este dispositivo de la lista de confiados?')) {
    trustedDevices.value = trustedDevices.value.filter(
      (d) => d.id !== deviceId
    );
    alert('Dispositivo eliminado');
  }
};

const logoutOtherDevices = () => {
  if (confirm('¿Cerrar sesión en todos los demás dispositivos?')) {
    alert('Se ha cerrado sesión en todos los otros dispositivos');
  }
};

const logoutAllDevices = () => {
  if (
    confirm(
      '¿Cerrar sesión en TODOS los dispositivos? Serás redirigido al inicio de sesión.'
    )
  ) {
    alert('Sesión cerrada en todos los dispositivos');
    // router.push('/login')
  }
};

const deactivateAccount = () => {
  if (
    confirm(
      '¿Desactivar tu cuenta temporalmente? Podrás reactivarla más tarde.'
    )
  ) {
    alert('Cuenta desactivada. Serás redirigido al inicio de sesión.');
    // router.push('/login')
  }
};

const deleteAccount = () => {
  if (deleteConfirmText.value === 'ELIMINAR') {
    alert('Cuenta eliminada permanentemente');
    showDeleteModal.value = false;
    // router.push('/login')
  }
};

const takeAction = (recommendation) => {
  if (recommendation.id === 1) {
    setupTwoFactor();
  } else if (recommendation.id === 2) {
    document
      .querySelector('.security-card')
      .scrollIntoView({ behavior: 'smooth' });
  } else {
    alert(`Acción: ${recommendation.action}`);
  }
};

// Initialize
onMounted(() => {
  // Calcular puntuación de seguridad inicial
  securityIssues.value = securityRecommendations.value.filter(
    (r) => !r.completed
  ).length;
  securityScore.value = Math.max(0, 100 - securityIssues.value * 5);
});
</script>

<style scoped src="./styles.css"></style>
