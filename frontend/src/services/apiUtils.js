const SESSION_KEY = 'autosphere.devSession';

export function readStoredSession() {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getSessionToken() {
  return readStoredSession()?.token || null;
}

export function getSessionUser() {
  return readStoredSession()?.user || null;
}

export function getSessionUserId() {
  return getSessionUser()?.id || null;
}

export function hasAdminSession() {
  return (readStoredSession()?.roles || []).includes('admin');
}

export function buildParams(input = {}) {
  const params = {};
  Object.entries(input || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    params[key] = value;
  });
  return params;
}

export function toFormData(payload = {}) {
  const formData = new FormData();

  Object.entries(payload || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;

    if (key === 'images' && Array.isArray(value)) {
      value.forEach((entry) => {
        if (entry instanceof File) {
          formData.append('images', entry);
        }
      });
      return;
    }

    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
      formData.append(key, JSON.stringify(value));
      return;
    }

    formData.append(key, value);
  });

  return formData;
}

export function resolveSessionUserId(fallbackId = null) {
  const sessionUserId = getSessionUserId();
  if (!sessionUserId) return fallbackId;
  if (!fallbackId) return sessionUserId;
  if (['u-seller-001', 'u-seller-rent-001', 'u-buyer-001'].includes(fallbackId)) {
    return sessionUserId;
  }
  return fallbackId;
}

export function extractErrorMessage(error, fallback = 'No fue posible completar la solicitud.') {
  return (
    error?.response?.data?.detail ||
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );
}
