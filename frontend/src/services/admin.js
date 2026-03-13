import appointmentsData from '../mocks/admin/appointments.json';
import catalogData from '../mocks/admin/catalog.json';
import dashboardData from '../mocks/admin/dashboard.json';
import listingsData from '../mocks/admin/listings.json';
import moderationData from '../mocks/admin/moderation.json';
import reportsData from '../mocks/admin/reports.json';
import suspensionsData from '../mocks/admin/suspensions.json';
import usersData from '../mocks/admin/users.json';
import { resolveMock } from './mockResponse.js';
import { includesText, sortItems, toArray } from './mockUtils.js';

export async function getAdminDashboard() {
  // TODO: replace with GET /api/admin/dashboard.
  return resolveMock(dashboardData);
}

export async function getAdminUsers(filters = {}) {
  // TODO: replace with GET /api/admin/users.
  const statuses = toArray(filters.status || filters.statuses);
  const roles = toArray(filters.role || filters.roles);
  const query = filters.q || filters.query || '';

  const items = usersData.items.filter((item) => {
    const matchesStatus = statuses.length === 0 || statuses.includes(item.status);
    const matchesRole = roles.length === 0 || roles.some((role) => item.roles.includes(role));
    const matchesQuery = !query || [item.name, item.email, item.id].some((value) => includesText(value, query));

    return matchesStatus && matchesRole && matchesQuery;
  });

  return resolveMock({ items });
}

export async function getAdminUserById(id) {
  return resolveMock(usersData.items.find((item) => item.id === id) || null);
}

export async function getAdminListings(filters = {}) {
  // TODO: replace with GET /api/admin/listings.
  const statuses = toArray(filters.status || filters.statuses);
  const query = filters.q || filters.query || '';

  const items = listingsData.items.filter((item) => {
    const matchesStatus = statuses.length === 0 || statuses.includes(item.status);
    const matchesSeller = !filters.sellerId || item.sellerId === filters.sellerId;
    const matchesQuery = !query || [item.title, item.brand, item.model, item.id].some((value) => includesText(value, query));

    return matchesStatus && matchesSeller && matchesQuery;
  });

  return resolveMock({ items: sortItems(items, filters.sort || 'relevance') });
}

export async function getAdminAppointments(filters = {}) {
  // TODO: replace with GET /api/admin/appointments.
  const statuses = toArray(filters.status || filters.statuses);
  const query = filters.q || filters.query || '';

  const items = appointmentsData.items.filter((item) => {
    const matchesStatus = statuses.length === 0 || statuses.includes(item.status);
    const matchesQuery = !query || [item.id, item.notes, item.locationLabel].some((value) => includesText(value, query));
    return matchesStatus && matchesQuery;
  });

  return resolveMock({ items: sortItems(items, filters.sort || 'date_asc') });
}

export async function getAdminCatalog() {
  // TODO: replace with GET /api/admin/catalog.
  return resolveMock(catalogData);
}

export async function getAdminModeration() {
  // TODO: replace with GET /api/admin/moderation.
  return resolveMock(moderationData);
}

export async function getAdminReports(filters = {}) {
  // TODO: replace with GET /api/admin/reports.
  const statuses = toArray(filters.status || filters.statuses);
  const query = filters.q || filters.query || '';

  const items = reportsData.items.filter((item) => {
    const matchesStatus = statuses.length === 0 || statuses.includes(item.status);
    const matchesQuery = !query || [item.id, item.reason, item.listingId].some((value) => includesText(value, query));
    return matchesStatus && matchesQuery;
  });

  return resolveMock({ items: sortItems(items, filters.sort || 'date_desc') });
}

export async function getAdminSuspensions(filters = {}) {
  // TODO: replace with GET /api/admin/suspensions.
  const statuses = toArray(filters.status || filters.statuses);
  const query = filters.q || filters.query || '';

  const items = suspensionsData.items.filter((item) => {
    const matchesStatus = statuses.length === 0 || statuses.includes(item.status);
    const matchesQuery = !query || [item.id, item.userId, item.reason].some((value) => includesText(value, query));
    return matchesStatus && matchesQuery;
  });

  return resolveMock({ items });
}

export async function updateUserStatus(userId, status) {
  // TODO: replace with PATCH /api/admin/users/:id/status.
  const user = usersData.items.find((item) => item.id === userId) || null;
  return resolveMock(user ? { ...user, status } : null);
}

export async function reviewListing(id, status = 'published') {
  // TODO: replace with PATCH /api/admin/listings/:id/review.
  const listing = listingsData.items.find((item) => item.id === id) || null;
  return resolveMock(listing ? { ...listing, status } : null);
}

export async function resolveReport(id, payload = {}) {
  // TODO: replace with PATCH /api/admin/reports/:id.
  const report = reportsData.items.find((item) => item.id === id) || null;
  return resolveMock(report ? { ...report, ...payload } : null);
}
