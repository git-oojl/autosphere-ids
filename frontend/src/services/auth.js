import mockSession from '../mocks/auth/session.json';
import { resolveMock } from './mockResponse';

export async function login(credentials = {}) {
  // TODO: replace with POST /api/auth/login when backend auth is ready.
  return resolveMock({
    ...mockSession,
    lastLoginAttempt: {
      email: credentials.email || '',
    },
  });
}

export async function logout() {
  // TODO: replace with POST /api/auth/logout.
  return resolveMock({ ok: true });
}

export async function getCurrentSession() {
  // TODO: replace with GET /api/me.
  return resolveMock(mockSession);
}
