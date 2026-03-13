import cities from '../mocks/shared/cities.json';
import users from '../mocks/shared/users.json';
import { resolveMock } from './mockResponse.js';
import { includesText, normalizeText, unique } from './mockUtils.js';

export async function getCities() {
  // TODO: replace with GET /api/catalog/cities.
  return resolveMock(cities);
}

export async function getCityById(id) {
  // TODO: replace with GET /api/catalog/cities/:id.
  return resolveMock(cities.find((city) => city.id === id) || null);
}

export async function getUsers(filters = {}) {
  // TODO: replace with GET /api/users.
  const roleFilters = unique(filters.roles || filters.role || []);
  const query = normalizeText(filters.query);

  const filtered = users.filter((user) => {
    const matchesRole = roleFilters.length === 0 || roleFilters.some((role) => user.roles.includes(role));
    const matchesQuery = !query || [user.name, user.email, user.id].some((field) => includesText(field, query));

    return matchesRole && matchesQuery;
  });

  return resolveMock(filtered);
}

export async function getUserById(id) {
  // TODO: replace with GET /api/users/:id.
  return resolveMock(users.find((user) => user.id === id) || null);
}

export async function getUsersByRole(role) {
  return getUsers({ role });
}
