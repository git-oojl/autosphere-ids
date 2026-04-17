import http from './http.js';
import { buildParams, resolveSessionUserId } from './apiUtils.js';

export async function getAppointmentCalendar() {
  const { data } = await http.get('/appointments/calendar');
  return data;
}

export async function getAppointmentSlots(listingId, options = {}) {
  const { data } = await http.get('/appointments/slots', {
    params: buildParams({
      listingId,
      date: options.date,
    }),
  });
  return options.date ? data : data?.slots || [];
}

export async function getAppointments(filters = {}) {
  const { data } = await http.get('/appointments', {
    params: buildParams(filters),
  });
  return data;
}

export async function getAppointmentById(id) {
  const { data } = await http.get(`/appointments/${id}`);
  return data;
}

export async function getBuyerAppointments(buyerId = 'u-buyer-001', filters = {}) {
  return getAppointments({
    ...filters,
    buyerId: resolveSessionUserId(buyerId),
  });
}

export async function getSellerAppointments(sellerId = 'u-seller-001', filters = {}) {
  return getAppointments({
    ...filters,
    sellerId: resolveSessionUserId(sellerId),
  });
}

export async function createAppointment(payload = {}) {
  const { data } = await http.post('/appointments', payload);
  return data;
}

export async function confirmAppointment(id) {
  const { data } = await http.post(`/appointments/${id}/confirm`);
  return data;
}

export async function rescheduleAppointment(id, payload = {}) {
  const { data } = await http.post(`/appointments/${id}/reschedule`, payload);
  return data;
}

export async function cancelAppointment(id, payload = {}) {
  const { data } = await http.post(`/appointments/${id}/cancel`, payload);
  return data;
}
