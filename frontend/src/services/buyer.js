import dashboardData from '../mocks/buyer/dashboard.json';
import savedVehiclesData from '../mocks/buyer/saved-vehicles.json';
import searchHistoryData from '../mocks/buyer/search-history.json';
import { resolveMock } from './mockResponse.js';
import { getBuyerAppointments, getAppointmentById } from './appointments.js';
import { includesText, sortItems } from './mockUtils.js';

export async function getBuyerDashboard() {
  // TODO: replace with GET /api/buyer/dashboard.
  return resolveMock(dashboardData);
}

export async function getSavedVehicles(filters = {}) {
  // TODO: replace with GET /api/buyer/saved-vehicles.
  const query = filters.q || filters.query || '';
  const filtered = savedVehiclesData.items.filter((item) => {
    return (
      !query ||
      [item.title, item.brand, item.model, item.location?.city].some((value) =>
        includesText(value, query)
      )
    );
  });

  return resolveMock({
    items: sortItems(filtered, filters.sort || 'relevance'),
  });
}

export async function getSavedVehicleById(id) {
  // TODO: replace with GET /api/buyer/saved-vehicles/:id.
  return resolveMock(
    savedVehiclesData.items.find((item) => item.id === id) || null
  );
}

export async function getSearchHistory() {
  // TODO: replace with GET /api/buyer/search-history.
  return resolveMock(searchHistoryData);
}

export async function getUpcomingAppointments(buyerId = 'u-buyer-001') {
  const items = await getBuyerAppointments(buyerId);
  const filtered = items.filter((item) =>
    ['pending', 'confirmed', 'rescheduled'].includes(item.status)
  );
  return resolveMock(sortItems(filtered, 'date_asc'));
}

export async function getBuyerAppointmentDetail(id) {
  return getAppointmentById(id);
}
