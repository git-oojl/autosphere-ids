import http from './http.js';

const REAL_DEV_CREDENTIALS = {
  user: {
    email: 'user@autosphere.local',
    password: 'User123!',
  },
  admin: {
    email: 'admin@autosphere.local',
    password: 'Admin123!',
  },
};

function makeGuestSession() {
  return {
    isAuthenticated: false,
    accessToken: null,
    user: null,
    roles: [],
  };
}

export async function login(credentials = {}) {
  const { data } = await http.post('/auth/login', credentials);
  return data;
}

export async function logout() {
  const { data } = await http.post('/auth/logout');
  return data;
}

export async function getCurrentSession() {
  const { data } = await http.get('/me');
  return data;
}

export async function getAvailableDevSessions() {
  return {
    guest: { label: 'Invitado' },
    user: { label: 'Usuario demo real' },
    admin: { label: 'Administrador demo real' },
  };
}

export async function createDevSession(role = 'guest') {
  if (role === 'guest') return makeGuestSession();

  const credentials = REAL_DEV_CREDENTIALS[role] || REAL_DEV_CREDENTIALS.user;
  return login(credentials);
}

export async function getAuthUsers() {
  const { data } = await http.get('/admin/users');
  return data?.items || [];
}

export async function register(payload = {}) {
  const { data } = await http.post('/auth/register', payload);
  return data;
}

export async function requestPasswordReset(payload = {}) {
  const { data } = await http.post('/auth/forgot-password', payload);
  return data;
}

export async function verifyEmail(payload = {}) {
  const { data } = await http.post('/auth/verify-email', payload);
  return data;
}
