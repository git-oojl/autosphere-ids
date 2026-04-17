import http from './http.js';

export async function getBuyerDashboard() {
  const { data } = await http.get('/buyer/dashboard');
  return data;
}

export async function getSavedVehicles(filters = {}) {
  const { data } = await http.get('/buyer/saved-vehicles', { params: filters });
  return data;
}

export async function getSavedVehicleById(id) {
  const { data } = await http.get(`/buyer/saved-vehicles/${id}`);
  return data;
}

export async function getSearchHistory() {
  const { data } = await http.get('/buyer/search-history');
  return data;
}

export async function recordSearchHistory(payload = {}) {
  const { data } = await http.post('/buyer/search-history', payload);
  return data;
}

export async function removeSearchHistoryItem(id) {
  const { data } = await http.delete(`/buyer/search-history/${id}`);
  return data;
}

export async function getUpcomingAppointments() {
  const { getBuyerAppointments } = await import('./appointments.js');
  const items = await getBuyerAppointments();
  const filtered = (Array.isArray(items) ? items : []).filter((item) =>
    ['pending', 'confirmed', 'rescheduled'].includes(item.status)
  );
  return filtered;
}

export async function getBuyerAppointmentDetail(id) {
  const { getAppointmentById } = await import('./appointments.js');
  return getAppointmentById(id);
}

export async function isVehicleSaved(id) {
  try {
    await getSavedVehicleById(id);
    return true;
  } catch {
    return false;
  }
}

export async function saveVehicleById(id) {
  const { data } = await http.post(`/buyer/saved-vehicles/${id}`);
  return data;
}

export async function removeSavedVehicleById(id) {
  const { data } = await http.delete(`/buyer/saved-vehicles/${id}`);
  return data;
}
