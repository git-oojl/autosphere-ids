import profile from '../mocks/account/profile.json';
import { resolveMock } from './mockResponse';

export async function getProfile() {
  // TODO: replace with GET /api/account/profile.
  return resolveMock(profile);
}

export async function updatePassword() {
  // TODO: replace with PATCH /api/account/password.
  return resolveMock({ ok: true });
}
