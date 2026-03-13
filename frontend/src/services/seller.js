import formOptions from '../mocks/seller/listing-form-options.json';
import appointmentsData from '../mocks/seller/appointments.json';
import dashboardData from '../mocks/seller/dashboard.json';
import listingsData from '../mocks/seller/listings.json';
import listingDetails from '../mocks/catalog/listing-details.json';
import { resolveMock } from './mockResponse.js';
import { includesText, paginateItems, sortItems, toArray } from './mockUtils.js';

function filterListings(items, filters = {}) {
  const statuses = toArray(filters.status || filters.statuses);
  const query = filters.q || filters.query || '';

  return items.filter((item) => {
    const matchesStatus = statuses.length === 0 || statuses.includes(item.status);
    const matchesSeller = !filters.sellerId || item.sellerId === filters.sellerId;
    const matchesQuery = !query || [item.title, item.brand, item.model, item.id].some((value) => includesText(value, query));

    return matchesStatus && matchesSeller && matchesQuery;
  });
}

function filterAppointments(items, filters = {}) {
  const statuses = toArray(filters.status || filters.statuses);
  const query = filters.q || filters.query || '';

  return items.filter((item) => {
    const matchesStatus = statuses.length === 0 || statuses.includes(item.status);
    const matchesSeller = !filters.sellerId || item.sellerId === filters.sellerId;
    const matchesQuery = !query || [item.listingTitle, item.buyerName, item.locationLabel, item.id].some((value) => includesText(value, query));

    return matchesStatus && matchesSeller && matchesQuery;
  });
}

export async function getSellerDashboard() {
  // TODO: replace with GET /api/seller/dashboard.
  return resolveMock(dashboardData);
}

export async function getSellerListings(filters = {}) {
  // TODO: replace with GET /api/seller/listings.
  const filtered = filterListings(listingsData.items, filters);
  const sorted = sortItems(filtered, filters.sort || 'relevance');
  const paginated = paginateItems(sorted, filters.page ?? 1, filters.pageSize ?? 12);

  return resolveMock({
    meta: paginated.meta,
    items: paginated.items,
  });
}

export async function getSellerListingById(id) {
  // TODO: replace with GET /api/seller/listings/:id.
  return resolveMock(listingDetails[id] || listingsData.items.find((item) => item.id === id) || null);
}

export async function getListingFormOptions() {
  // TODO: replace with GET /api/seller/listings/form-options.
  return resolveMock(formOptions);
}

export async function getSellerAppointments(filters = {}) {
  // TODO: replace with GET /api/seller/appointments.
  const filtered = filterAppointments(appointmentsData.items, filters);
  return resolveMock(sortItems(filtered, filters.sort || 'date_asc'));
}

export async function getSellerAppointmentById(id) {
  // TODO: replace with GET /api/seller/appointments/:id.
  return resolveMock(appointmentsData.items.find((item) => item.id === id) || null);
}

export async function createListing(payload = {}) {
  // TODO: replace with POST /api/seller/listings.
  return resolveMock({
    id: payload.id || 'vh-mock-new',
    status: payload.status || 'draft',
    ...payload,
  });
}

export async function updateListing(id, payload = {}) {
  // TODO: replace with PATCH /api/seller/listings/:id.
  const current = listingDetails[id] || listingsData.items.find((item) => item.id === id) || null;

  return resolveMock(current ? { ...current, ...payload } : null);
}

export async function deleteListing(id) {
  // TODO: replace with DELETE /api/seller/listings/:id.
  return resolveMock({
    ok: true,
    id,
    status: 'deleted',
  });
}

export async function createManualAppointment(payload = {}) {
  // TODO: replace with POST /api/seller/appointments.
  return resolveMock({
    id: payload.id || 'ap-seller-manual',
    status: payload.status || 'pending',
    ...payload,
  });
}
