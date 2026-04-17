import dashboardData from '../mocks/buyer/dashboard.json';
import savedVehiclesData from '../mocks/buyer/saved-vehicles.json';
import searchHistoryData from '../mocks/buyer/search-history.json';
import { resolveMock } from './mockResponse.js';
import { getBuyerAppointments, getAppointmentById } from './appointments.js';
import { getListingById, getListings } from './catalog.js';
import { includesText, sortItems } from './mockUtils.js';

let savedVehiclesState = [...savedVehiclesData.items];
let searchHistoryState = [...searchHistoryData.items]
  .sort((a, b) => String(b.timestamp || '').localeCompare(String(a.timestamp || '')));


function mapListingToSavedVehicle(item) {
  if (!item) return null;
  return {
    id: item.id,
    title: item.title,
    brand: item.brand,
    model: item.model,
    year: item.year,
    price: item.mode === 'rental' ? item.pricePerDay ?? item.price ?? 0 : item.price ?? 0,
    sellerId: item.sellerId || null,
    cityId: item.cityId || null,
    city: item.city || null,
    cityLabel: item.cityLabel || item.location?.city || '',
    location: item.location || null,
    coverImage: item.coverImage || null,
    mileageKm: item.mileageKm ?? item.specs?.kilometraje ?? null,
    transmission: item.transmission || item.specs?.transmisión || null,
    fuel: item.fuel || item.specs?.combustible || null,
    mode: item.mode || 'sale',
  };
}

export async function getBuyerDashboard() {
  // TODO: replace with GET /api/buyer/dashboard.
  return resolveMock(dashboardData);
}

export async function getSavedVehicles(filters = {}) {
  // TODO: replace with GET /api/buyer/saved-vehicles.
  const query = filters.q || filters.query || '';
  const filtered = savedVehiclesState.filter((item) => {
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
    savedVehiclesState.find((item) => item.id === id) || null
  );
}

export async function getSearchHistory() {
  // TODO: replace with GET /api/buyer/search-history.
  return resolveMock({
    items: sortItems(searchHistoryState, 'date_desc'),
  });
}

export async function recordSearchHistory(payload = {}) {
  const query = String(payload.query || '').trim();
  if (!query) return resolveMock(null);

  const inferredResultCount =
    typeof payload.resultCount === 'number'
      ? payload.resultCount
      : undefined;

  const existingIndex = searchHistoryState.findIndex(
    (item) => item.query.trim().toLowerCase() === query.toLowerCase()
  );

  const entry = {
    id: existingIndex !== -1 ? searchHistoryState[existingIndex].id : `sh-${Date.now()}`,
    query,
    timestamp: payload.timestamp || new Date().toISOString(),
    resultCount:
      inferredResultCount ??
      searchHistoryState[existingIndex]?.resultCount ??
      0,
    filtersSummary: payload.filtersSummary || searchHistoryState[existingIndex]?.filtersSummary || '',
  };

  if (existingIndex !== -1) {
    searchHistoryState.splice(existingIndex, 1);
  }

  searchHistoryState.unshift(entry);
  return resolveMock(entry);
}

export async function removeSearchHistoryItem(id) {
  searchHistoryState = searchHistoryState.filter((item) => item.id !== id);
  return resolveMock({ ok: true, id });
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

export async function isVehicleSaved(id) {
  return resolveMock(savedVehiclesState.some((item) => item.id === id));
}

export async function saveVehicleById(id) {
  if (savedVehiclesState.some((item) => item.id === id)) {
    return resolveMock(savedVehiclesState.find((item) => item.id === id));
  }

  const listing = await getListingById(id);
  const mapped = mapListingToSavedVehicle(listing);
  if (!mapped) return resolveMock(null);
  savedVehiclesState = [mapped, ...savedVehiclesState];
  return resolveMock(mapped);
}

export async function removeSavedVehicleById(id) {
  savedVehiclesState = savedVehiclesState.filter((item) => item.id !== id);
  return resolveMock({ ok: true, id });
}
