import http from './http.js';

export async function getAdminDashboard() {
  const { data } = await http.get('/admin/dashboard');
  return data;
}

export async function getAdminUsers(filters = {}) {
  const { data } = await http.get('/admin/users', { params: filters });
  return data;
}

export async function getAdminUserById(id) {
  const { data } = await http.get(`/admin/users/${id}`);
  return data;
}

export async function saveAdminUser(payload = {}) {
  const { data } = await http.post('/admin/users', payload);
  return data;
}

export async function updateUserStatus(userId, status, extras = {}) {
  const { data } = await http.post(`/admin/users/${userId}/status`, {
    status,
    ...extras,
  });
  return data;
}

export async function deleteAdminUser(id) {
  const { data } = await http.delete(`/admin/users/${id}`);
  return data;
}

export async function getAdminListings(filters = {}) {
  const { data } = await http.get('/admin/listings', { params: filters });
  return data;
}

export async function saveAdminListing(payload = {}) {
  if (payload.id) {
    const { data } = await http.patch(`/admin/listings/${payload.id}`, payload);
    return data;
  }
  const { data } = await http.post('/admin/listings', payload);
  return data;
}

export async function reviewListing(id, status = 'active') {
  const { data } = await http.post(`/admin/listings/${id}/review`, { status });
  return data;
}

export async function deleteAdminListing(id) {
  const { data } = await http.delete(`/admin/listings/${id}`);
  return data;
}

export async function getAdminAppointments(filters = {}) {
  const { data } = await http.get('/admin/appointments', { params: filters });
  return data;
}

export async function updateAdminAppointment(id, payload = {}) {
  const { data } = await http.patch(`/admin/appointments/${id}`, payload);
  return data;
}

export async function deleteAdminAppointment(id) {
  const { data } = await http.delete(`/admin/appointments/${id}`);
  return data;
}

export async function getAdminCatalog() {
  const { data } = await http.get('/admin/catalog');
  return data;
}

export async function getAdminCatalogCollections() {
  const { data } = await http.get('/admin/catalog/collections');
  return data;
}

export async function saveAdminCatalogItem(kind, payload = {}) {
  const { data } = await http.post(`/admin/catalog/${kind}`, payload);
  return data;
}

export async function deleteAdminCatalogItem(kind, id) {
  const { data } = await http.delete(`/admin/catalog/${kind}/${id}`);
  return data;
}

export async function getAdminModeration() {
  const { data } = await http.get('/admin/moderation');
  return data;
}

export async function getAdminModerationListings() {
  const { data } = await http.get('/admin/moderation/listings');
  return data;
}

export async function approveAdminModerationListing(id) {
  const { data } = await http.post(`/admin/moderation/listings/${id}/approve`);
  return data;
}

export async function rejectAdminModerationListing(id, payload = {}) {
  const { data } = await http.post(`/admin/moderation/listings/${id}/reject`, payload);
  return data;
}

export async function deleteAdminModerationListing(id) {
  const { data } = await http.delete(`/admin/moderation/listings/${id}`);
  return data;
}

export async function getAdminReports(filters = {}) {
  const { data } = await http.get('/admin/reports', { params: filters });
  return data;
}

export async function startAdminReportReview(id) {
  const { data } = await http.post(`/admin/reports/${id}/start-review`);
  return data;
}

export async function resolveReport(id, payload = {}) {
  const { data } = await http.post(`/admin/reports/${id}/resolve`, payload);
  return data;
}

export async function deleteAdminReport(id) {
  const { data } = await http.delete(`/admin/reports/${id}`);
  return data;
}

export async function getAdminSuspensions(filters = {}) {
  const { data } = await http.get('/admin/suspensions', { params: filters });
  return data;
}

export async function getAdminSuspensionFormOptions() {
  const { data } = await http.get('/admin/suspensions/form-options');
  return data;
}

export async function saveAdminSuspension(payload = {}) {
  const { data } = await http.post('/admin/suspensions/save', payload);
  return data;
}

export async function reinstateAdminSuspension(id) {
  const { data } = await http.post(`/admin/suspensions/${id}/reinstate`);
  return data;
}

export async function deleteAdminSuspension(id) {
  const { data } = await http.delete(`/admin/suspensions/${id}`);
  return data;
}
