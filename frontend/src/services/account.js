import profileData from '../mocks/account/profile.json';
import securityData from '../mocks/account/security.json';
import { resolveMock } from './mockResponse.js';

export async function getProfile() {
  // TODO: replace with GET /api/account/profile.
  return resolveMock(profileData);
}

export async function updateProfile(payload = {}) {
  // TODO: replace with PATCH /api/account/profile.
  return resolveMock({
    ...profileData,
    ...payload,
  });
}

export async function getSecuritySettings() {
  // TODO: replace with GET /api/account/security.
  return resolveMock(securityData);
}

export async function getActiveSessions() {
  // TODO: replace with GET /api/account/security/sessions.
  return resolveMock(securityData.activeSessions || []);
}

export async function updatePassword() {
  // TODO: replace with PATCH /api/account/password.
  return resolveMock({ ok: true });
}

export async function toggleTwoFactor(enabled) {
  // TODO: replace with PATCH /api/account/security/two-factor.
  return resolveMock({
    ...securityData,
    twoFactorEnabled: Boolean(enabled),
  });
}

export async function revokeSession(sessionId) {
  // TODO: replace with DELETE /api/account/security/sessions/:id.
  return resolveMock({
    ok: true,
    sessionId,
  });
}
