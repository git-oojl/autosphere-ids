import calendarEvents from '../mocks/appointments/calendar.json';
import { resolveMock } from './mockResponse';

export async function getCalendarEvents() {
  // TODO: replace with GET /api/appointments/calendar.
  return resolveMock(calendarEvents);
}

export async function getBuyerAppointments() {
  // TODO: replace with GET /api/buyer/appointments.
  return resolveMock(calendarEvents);
}

export async function getSellerAppointments() {
  // TODO: replace with GET /api/seller/appointments.
  return resolveMock(calendarEvents);
}

export async function createAppointment(payload = {}) {
  // TODO: replace with POST /api/appointments.
  return resolveMock({
    id: 999,
    status: 'pendiente',
    ...payload,
  });
}
