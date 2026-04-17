import profileSeed from '../mocks/account/profile.json';
import securitySeed from '../mocks/account/security.json';
import { resolveMock } from './mockResponse.js';

let profileState = { ...profileSeed };

export async function getProfile() {
  return resolveMock(profileState);
}

export async function updateProfile(payload = {}) {
  profileState = {
    ...profileState,
    ...payload,
  };

  return resolveMock(profileState);
}

export async function getSecuritySettings() {
  return resolveMock(securitySeed);
}

export async function updatePassword(payload = {}) {
  return resolveMock({
    ok: true,
    changedAt: new Date().toISOString(),
    ...payload,
  });
}
