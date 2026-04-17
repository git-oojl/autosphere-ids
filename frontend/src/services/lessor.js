import http from './http.js';
import { toFormData } from './apiUtils.js';

export async function getRentals(filters = {}) {
  const { data } = await http.get('/lessor/rentals', { params: filters });
  return data;
}

export async function getRentalById(id) {
  const { data } = await http.get(`/lessor/rentals/${id}`);
  return data;
}

export async function registerRental(payload = {}) {
  const { data } = await http.post('/lessor/rentals', toFormData(payload));
  return data;
}

export async function closeRental(id, payload = {}) {
  const { data } = await http.post(`/lessor/rentals/${id}/close`, payload);
  return data;
}
