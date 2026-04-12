import appointmentDetailsMap from '../mocks/appointments/appointment-details.json';
import appointmentsData from '../mocks/appointments/appointments.json';
import calendarData from '../mocks/appointments/calendar.json';
import slotsByListing from '../mocks/appointments/slots-by-listing.json';
import listingDetails from '../mocks/catalog/listing-details.json';
import users from '../mocks/shared/users.json';
import { resolveMock } from './mockResponse.js';
import { includesText, sortItems, toArray } from './mockUtils.js';

const userMap = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});

function baseAppointments() {
  const list = Array.isArray(appointmentsData)
    ? appointmentsData
    : (appointmentsData?.items ?? []);
  return list.map((item) => appointmentDetailsMap[item.id] || item);
}

function enrichAppointment(appointment) {
  if (!appointment) {
    return null;
  }

  const buyer = userMap[appointment.buyerId] || null;
  const seller = userMap[appointment.sellerId] || null;
  const listing = listingDetails[appointment.listingId] || null;

  return {
    ...appointment,
    buyer,
    seller,
    listing,
  };
}

function filterAppointments(items, filters = {}) {
  const statuses = toArray(filters.status || filters.statuses);
  const query = filters.q || filters.query || '';

  return items.filter((appointment) => {
    const matchesStatus =
      statuses.length === 0 || statuses.includes(appointment.status);
    const matchesBuyer =
      !filters.buyerId || appointment.buyerId === filters.buyerId;
    const matchesSeller =
      !filters.sellerId || appointment.sellerId === filters.sellerId;
    const matchesListing =
      !filters.listingId || appointment.listingId === filters.listingId;
    const matchesDate = !filters.date || appointment.date === filters.date;
    const matchesQuery =
      !query ||
      [
        appointment.id,
        appointment.listingTitle,
        appointment.buyerName,
        appointment.sellerName,
        appointment.locationLabel,
      ].some((value) => includesText(value, query));

    return (
      matchesStatus &&
      matchesBuyer &&
      matchesSeller &&
      matchesListing &&
      matchesDate &&
      matchesQuery
    );
  });
}

export async function getAppointmentCalendar() {
  // TODO: replace with GET /api/appointments/calendar.
  return resolveMock(calendarData);
}

export async function getAppointmentSlots(listingId, options = {}) {
  // TODO: replace with GET /api/listings/:id/slots.
  const slots = slotsByListing[listingId] || [];

  if (!options.date) {
    return resolveMock(slots);
  }

  return resolveMock(
    slots.find((entry) => entry.date === options.date) || null
  );
}

export async function getAppointments(filters = {}) {
  // TODO: replace with GET /api/appointments.
  const items = filterAppointments(baseAppointments(), filters).map(
    enrichAppointment
  );
  return resolveMock(sortItems(items, filters.sort || 'date_asc'));
}

export async function getAppointmentById(id) {
  // TODO: replace with GET /api/appointments/:id.
  return resolveMock(enrichAppointment(appointmentDetailsMap[id] || null));
}

export async function getBuyerAppointments(
  buyerId = 'u-buyer-001',
  filters = {}
) {
  return getAppointments({ ...filters, buyerId });
}

export async function getSellerAppointments(
  sellerId = 'u-seller-001',
  filters = {}
) {
  return getAppointments({ ...filters, sellerId });
}

export async function createAppointment(payload = {}) {
  // TODO: replace with POST /api/appointments.
  const listing = listingDetails[payload.listingId] || null;
  const buyer = userMap[payload.buyerId || 'u-buyer-001'] || null;
  const seller = userMap[payload.sellerId || listing?.sellerId] || null;

  return resolveMock(
    enrichAppointment({
      id: payload.id || 'ap-mock-new',
      listingId: payload.listingId || null,
      buyerId: buyer?.id || null,
      sellerId: seller?.id || null,
      status: payload.status || 'pending',
      date: payload.date || null,
      time: payload.time || null,
      locationLabel:
        payload.locationLabel ||
        listing?.location?.addressLabel ||
        'Ubicación pendiente',
      notes: payload.notes || '',
      listingTitle: listing?.title || 'Publicación pendiente',
      buyerName: buyer?.name || 'Comprador pendiente',
      sellerName: seller?.name || 'Vendedor pendiente',
      timeline: [
        {
          label: 'Solicitud creada',
          timestamp: new Date().toISOString(),
          status: 'done',
        },
      ],
    })
  );
}

export async function confirmAppointment(id) {
  const appointment = appointmentDetailsMap[id] || null;

  if (!appointment) {
    return resolveMock(null);
  }

  return resolveMock(
    enrichAppointment({
      ...appointment,
      status: 'confirmed',
    })
  );
}

export async function rescheduleAppointment(id, payload = {}) {
  const appointment = appointmentDetailsMap[id] || null;

  if (!appointment) {
    return resolveMock(null);
  }

  return resolveMock(
    enrichAppointment({
      ...appointment,
      status: 'rescheduled',
      date: payload.date || appointment.date,
      time: payload.time || appointment.time,
      notes: payload.notes || appointment.notes,
    })
  );
}

export async function cancelAppointment(id, payload = {}) {
  const appointment = appointmentDetailsMap[id] || null;

  if (!appointment) {
    return resolveMock(null);
  }

  return resolveMock(
    enrichAppointment({
      ...appointment,
      status: 'cancelled',
      cancellationReason: payload.reason || null,
    })
  );
}
