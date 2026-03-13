import devSessions from '../mocks/auth/dev-sessions.json';
import sessionTemplate from '../mocks/auth/session.json';
import authUsers from '../mocks/auth/users.json';
import { resolveMock } from './mockResponse.js';

function makeGuestSession() {
  return {
    isAuthenticated: false,
    accessToken: null,
    user: null,
    roles: [],
  };
}

function buildSessionForUser(user, token = 'mock-access-token') {
  if (!user) {
    return makeGuestSession();
  }

  return {
    ...sessionTemplate,
    isAuthenticated: true,
    accessToken: token,
    user,
    roles: user.roles || [],
  };
}

export async function login(credentials = {}) {
  // TODO: replace with POST /api/auth/login.
  const matchedUser = authUsers.find((user) => {
    if (credentials.email) {
      return user.email.toLowerCase() === credentials.email.trim().toLowerCase();
    }

    if (credentials.role) {
      return user.roles.includes(credentials.role);
    }

    return user.id === 'u-buyer-001';
  }) || authUsers[0];

  return resolveMock(buildSessionForUser(matchedUser, `mock-token-${matchedUser.id}`));
}

export async function logout() {
  // TODO: replace with POST /api/auth/logout.
  return resolveMock({ ok: true });
}

export async function getCurrentSession() {
  // TODO: replace with GET /api/me.
  return resolveMock(sessionTemplate);
}

export async function getAvailableDevSessions() {
  // TODO: replace with local-only dev helper or remove entirely once backend auth exists.
  return resolveMock(devSessions);
}

export async function createDevSession(role = 'guest') {
  const config = devSessions[role] ?? null;

  if (!config) {
    return resolveMock(makeGuestSession());
  }

  const user = authUsers.find((item) => item.id === config.userId) || null;
  return resolveMock(buildSessionForUser(user, config.token));
}

export async function getAuthUsers() {
  // TODO: replace with GET /api/admin/users or auth provider directory lookup.
  return resolveMock(authUsers);
}

export async function register(payload = {}) {
  // TODO: replace with POST /api/auth/register.
  return resolveMock({
    ok: true,
    message: 'Registro simulado',
    user: {
      id: payload.id || 'u-pending-001',
      name: payload.name || 'Usuario pendiente',
      email: payload.email || '',
      roles: payload.roles || ['buyer'],
      status: 'pending_verification',
    },
  });
}

export async function requestPasswordReset(payload = {}) {
  // TODO: replace with POST /api/auth/forgot-password.
  return resolveMock({
    ok: true,
    email: payload.email || '',
    message: 'Solicitud de recuperación simulada',
  });
}

export async function verifyEmail(payload = {}) {
  // TODO: replace with POST /api/auth/verify-email.
  return resolveMock({
    ok: true,
    token: payload.token || null,
    message: 'Correo verificado en entorno mock',
  });
}
