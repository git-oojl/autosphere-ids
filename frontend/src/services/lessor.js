import rentalDetails from '../mocks/lessor/rental-details.json';
import rentalsData from '../mocks/lessor/rentals.json';
import { resolveMock } from './mockResponse.js';
import { includesText, sortItems, toArray } from './mockUtils.js';

export async function getRentals(filters = {}) {
  // TODO: replace with GET /api/lessor/rentals.
  const statuses = toArray(filters.status || filters.statuses);
  const query = filters.q || filters.query || '';

  const items = rentalsData.items.filter((item) => {
    const matchesStatus = statuses.length === 0 || statuses.includes(item.status);
    const matchesQuery = !query || [item.vehicleLabel, item.clientName, item.id].some((value) => includesText(value, query));

    return matchesStatus && matchesQuery;
  });

  return resolveMock({
    items: sortItems(items, filters.sort || 'date_desc'),
  });
}

export async function getRentalById(id) {
  // TODO: replace with GET /api/lessor/rentals/:id.
  return resolveMock(rentalDetails[id] || null);
}

export async function registerRental(payload = {}) {
  // TODO: replace with POST /api/lessor/rentals.
  return resolveMock({
    id: payload.id || 'rt-mock-new',
    status: payload.status || 'scheduled',
    ...payload,
  });
}

export async function closeRental(id, payload = {}) {
  // TODO: replace with POST /api/lessor/rentals/:id/close.
  const current = rentalDetails[id] || null;

  if (!current) {
    return resolveMock(null);
  }

  return resolveMock({
    ...current,
    status: 'closed',
    closedAt: payload.closedAt || new Date().toISOString(),
    closeNotes: payload.closeNotes || '',
  });
}
