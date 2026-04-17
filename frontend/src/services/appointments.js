import appointmentDetailsMap from '../mocks/appointments/appointment-details.json';
import appointmentsData from '../mocks/appointments/appointments.json';
import calendarSeed from '../mocks/appointments/calendar.json';
import slotsByListing from '../mocks/appointments/slots-by-listing.json';
import listingsData from '../mocks/catalog/listings.json';
import rentalsData from '../mocks/catalog/rentals.json';
import { getListingById } from './catalog.js';
import users from '../mocks/shared/users.json';
import { cloneData, resolveMock } from './mockResponse.js';
import { includesText, sortItems, toArray } from './mockUtils.js';

const userMap = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});

const catalogItems = [
  ...((listingsData && listingsData.items) || []),
  ...((rentalsData && rentalsData.items) || []),
];

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const catalogTitleMap = catalogItems.reduce((acc, item) => {
  const key = normalizeText(item.title);
  if (key && !acc[key]) acc[key] = item.id;
  return acc;
}, {});

function normalizeStatusKey(status) {
  if (!status) return 'pending';
  const raw = String(status).toLowerCase();
  return (
    {
      pendiente: 'pending',
      pending: 'pending',
      confirmada: 'confirmed',
      confirmed: 'confirmed',
      completada: 'completed',
      completed: 'completed',
      cancelada: 'cancelled',
      cancelled: 'cancelled',
      reagendada: 'rescheduled',
      rescheduled: 'rescheduled',
    }[raw] || raw
  );
}

function resolveListingIdFromTitle(title) {
  return catalogTitleMap[normalizeText(title)] || null;
}

function buildTimeline(statusKey, date, time) {
  const baseTimestamp = date ? `${date}T${time || '09:00'}:00` : null;
  const confirmationStatus = ['pending'].includes(statusKey)
    ? 'pending'
    : 'done';
  const visitStatus = statusKey === 'cancelled' ? 'pending' : 'scheduled';

  return [
    {
      label: 'Solicitud creada',
      timestamp: baseTimestamp,
      status: 'done',
    },
    {
      label: 'Confirmación',
      timestamp: baseTimestamp,
      status: confirmationStatus,
    },
    {
      label: 'Visita programada',
      timestamp: baseTimestamp,
      status: visitStatus,
    },
  ];
}

function buildAppointmentFromCalendarEntry(tab, item) {
  if (!item) return null;

  const status = normalizeStatusKey(item.statusKey || item.status);
  const listingId =
    item.listingId ||
    resolveListingIdFromTitle(item.vehicle || item.listingTitle);
  const buyer =
    tab === 'comprador'
      ? null
      : {
          id: item.buyer?.id || null,
          name: item.buyer?.name || item.client || 'Cliente AutoSphere',
          phone: item.buyer?.phone || item.phone || null,
          email: item.buyer?.email || item.email || null,
        };
  const seller =
    tab === 'comprador'
      ? {
          id: item.seller?.id || null,
          name: item.seller?.name || item.client || 'Vendedor AutoSphere',
          phone: item.seller?.phone || item.phone || null,
          email: item.seller?.email || item.email || null,
        }
      : null;

  return enrichAppointment({
    id: String(item.id),
    listingId,
    buyerId: buyer?.id || null,
    sellerId: seller?.id || null,
    status,
    date: item.date || null,
    time: item.time || null,
    locationLabel:
      item.address || item.locationLabel || 'Ubicación por confirmar',
    notes: item.notes || '',
    listingTitle: item.vehicle || item.listingTitle || 'Vehículo seleccionado',
    buyerName: buyer?.name || item.client || 'Cliente AutoSphere',
    sellerName: seller?.name || item.seller?.name || 'AutoSphere',
    buyer,
    seller,
    timeline: buildTimeline(status, item.date, item.time),
    sourceTab: tab,
    year: item.year || null,
    tipo: item.tipo || null,
  });
}

let appointmentState = (
  Array.isArray(appointmentsData)
    ? appointmentsData
    : appointmentsData?.items || []
).map((item) => ({
  ...item,
  ...(appointmentDetailsMap[item.id] || {}),
}));

let calendarState = cloneData(calendarSeed);

function enrichAppointment(appointment) {
  if (!appointment) return null;

  const buyer = userMap[appointment.buyerId] || null;
  const seller = userMap[appointment.sellerId] || null;

  return {
    ...appointment,
    buyer,
    seller,
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

function statusLabel(status) {
  return (
    {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      completed: 'Completada',
      cancelled: 'Cancelada',
      rescheduled: 'Reagendada',
    }[normalizeStatusKey(status)] || status
  );
}

function updateCalendarStats(tab) {
  const list = calendarState?.[tab]?.appointments || [];
  calendarState[tab].stats = {
    total: list.length,
    pending: list.filter((item) => item.status === 'Pendiente').length,
    confirmed: list.filter((item) => item.status === 'Confirmada').length,
    completed: list.filter((item) => item.status === 'Completada').length,
  };
}

function findCalendarEntry(id) {
  for (const tab of ['comprador', 'vendedor', 'rentador']) {
    const index = (calendarState[tab]?.appointments || []).findIndex(
      (item) => String(item.id) === String(id)
    );
    if (index !== -1) return { tab, index };
  }
  return null;
}

function findCalendarAppointmentById(id) {
  const entry = findCalendarEntry(id);
  if (!entry) return null;
  return {
    tab: entry.tab,
    appointment: calendarState[entry.tab]?.appointments?.[entry.index] || null,
  };
}

function mutateAppointment(id, updater) {
  appointmentState = appointmentState.map((item) => {
    if (String(item.id) !== String(id)) return item;
    return updater(item);
  });

  const entry = findCalendarEntry(id);
  if (entry) {
    const current = calendarState[entry.tab].appointments[entry.index];
    calendarState[entry.tab].appointments[entry.index] = updater({
      ...current,
      status: normalizeStatusKey(current.statusKey || current.status),
    });
    const next = calendarState[entry.tab].appointments[entry.index];
    calendarState[entry.tab].appointments[entry.index] = {
      ...next,
      status: statusLabel(next.status),
      statusKey: next.status,
    };
    updateCalendarStats(entry.tab);
  }
}

export async function getAppointmentCalendar() {
  return resolveMock(calendarState);
}

export async function getAppointmentSlots(listingId, options = {}) {
  const slots = slotsByListing[listingId] || [];
  if (!options.date) return resolveMock(slots);
  return resolveMock(
    slots.find((entry) => entry.date === options.date) || null
  );
}

export async function getAppointments(filters = {}) {
  const items = filterAppointments(appointmentState, filters).map(
    enrichAppointment
  );
  return resolveMock(sortItems(items, filters.sort || 'date_asc'));
}

export async function getAppointmentById(id) {
  const direct = appointmentState.find(
    (item) => String(item.id) === String(id)
  );
  if (direct) return resolveMock(enrichAppointment(direct));

  const calendarEntry = findCalendarAppointmentById(id);
  if (!calendarEntry) return resolveMock(null);

  return resolveMock(
    buildAppointmentFromCalendarEntry(
      calendarEntry.tab,
      calendarEntry.appointment
    )
  );
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
  const listing = await getListingById(payload.listingId);
  const buyer = userMap[payload.buyerId || 'u-buyer-001'] || null;
  const seller = userMap[payload.sellerId || listing?.sellerId] || null;

  const created = {
    id: payload.id || `ap-${Date.now()}`,
    listingId: payload.listingId || null,
    buyerId: buyer?.id || null,
    sellerId: seller?.id || listing?.sellerId || null,
    status: payload.status || 'pending',
    date: payload.date || null,
    time: payload.time || null,
    locationLabel:
      payload.locationLabel ||
      listing?.location?.addressLabel ||
      'Ubicación por confirmar',
    notes: payload.notes || '',
    listingTitle: listing?.title || 'Vehículo seleccionado',
    buyerName: buyer?.name || payload.buyerName || 'Comprador AutoSphere',
    sellerName:
      seller?.name || listing?.sellerDisplayName || 'Vendedor AutoSphere',
    timeline: [
      {
        label: 'Solicitud creada',
        timestamp: new Date().toISOString(),
        status: 'done',
      },
    ],
  };

  appointmentState.unshift(created);
  calendarState.comprador.appointments.unshift({
    id: created.id,
    client: created.sellerName,
    seller: { name: created.sellerName, phone: seller?.phone || null },
    vehicle: created.listingTitle,
    year: listing?.year || '',
    date: created.date,
    time: created.time,
    status: 'Pendiente',
    statusKey: 'pending',
    tipo: listing?.mode === 'rental' ? 'renta' : 'compra',
    locationLabel: created.locationLabel,
  });
  updateCalendarStats('comprador');

  return resolveMock(enrichAppointment(created));
}

export async function confirmAppointment(id) {
  mutateAppointment(id, (appointment) => ({
    ...appointment,
    status: 'confirmed',
  }));
  return getAppointmentById(id);
}

export async function rescheduleAppointment(id, payload = {}) {
  mutateAppointment(id, (appointment) => ({
    ...appointment,
    status: 'rescheduled',
    date: payload.date || appointment.date,
    time: payload.time || appointment.time,
    notes: payload.notes || appointment.notes,
  }));
  return getAppointmentById(id);
}

export async function cancelAppointment(id, payload = {}) {
  mutateAppointment(id, (appointment) => ({
    ...appointment,
    status: 'cancelled',
    cancellationReason: payload.reason || null,
  }));
  return getAppointmentById(id);
}
