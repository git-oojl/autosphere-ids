import http from './http.js';

export async function getProfile() {
  const { data } = await http.get('/account/profile');
  return data;
}

export async function updateProfile(payload = {}) {
  const { data } = await http.patch('/account/profile', payload);
  return data;
}

export async function getSecuritySettings() {
  const { data } = await http.get('/account/security');
  return data;
}

export async function updatePassword(payload = {}) {
  const { data } = await http.patch('/account/password', payload);
  return data;
}
