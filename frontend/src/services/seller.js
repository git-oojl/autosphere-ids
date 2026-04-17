import http from './http.js';
import { toFormData } from './apiUtils.js';

export async function getSellerDashboard() {
  const { data } = await http.get('/seller/dashboard');
  return data;
}

export async function getSellerListings(filters = {}) {
  const { data } = await http.get('/seller/listings', { params: filters });
  return data;
}

export async function getSellerListingById(id) {
  const { data } = await http.get(`/seller/listings/${id}`);
  return data;
}

export async function getListingFormOptions() {
  const { data } = await http.get('/seller/listings/form-options');
  return data;
}

export async function getSellerAppointments(filters = {}) {
  const { getSellerAppointments: getAppointmentsForSeller } = await import('./appointments.js');
  return getAppointmentsForSeller(undefined, filters);
}

export async function getSellerAppointmentById(id) {
  const { getAppointmentById } = await import('./appointments.js');
  return getAppointmentById(id);
}

export async function createListing(payload = {}) {
  const { data } = await http.post('/seller/listings', toFormData(payload));
  return data;
}

export async function updateListing(id, payload = {}) {
  const isMultipart = Array.isArray(payload.images) && payload.images.length > 0;
  const { data } = await http.patch(
    `/seller/listings/${id}`,
    isMultipart ? toFormData(payload) : payload
  );
  return data;
}

export async function deleteListing(id) {
  const { data } = await http.delete(`/seller/listings/${id}`);
  return data;
}

export async function createManualAppointment(payload = {}) {
  const { createAppointment } = await import('./appointments.js');
  return createAppointment(payload);
}
