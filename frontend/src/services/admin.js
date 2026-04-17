import appointmentsSeed from '../mocks/admin/appointments.json';
import brandsSeed from '../mocks/admin/brands.json';
import catalogSeed from '../mocks/admin/catalog.json';
import dashboardSeed from '../mocks/admin/dashboard.json';
import listingsSeed from '../mocks/admin/listings.json';
import locationsSeed from '../mocks/admin/locations.json';
import moderationSeed from '../mocks/admin/moderation.json';
import modelsSeed from '../mocks/admin/models.json';
import reportsSeed from '../mocks/admin/reports.json';
import suspensionsSeed from '../mocks/admin/suspensions.json';
import usersSeed from '../mocks/admin/users.json';
import vehicleTypesSeed from '../mocks/admin/vehicle-types.json';
import { cloneData, resolveMock } from './mockResponse.js';
import { includesText, sortItems, toArray } from './mockUtils.js';

const usersState = cloneData(usersSeed.items || []);
const listingsState = cloneData(listingsSeed.items || []);
const appointmentsState = cloneData(appointmentsSeed.items || []);
const reportsState = cloneData(reportsSeed.items || []);
const suspensionsState = cloneData(suspensionsSeed.items || []);
const brandsState = cloneData(brandsSeed.items || []);
const modelsState = cloneData(modelsSeed.items || []);
const vehicleTypesState = cloneData(vehicleTypesSeed.items || []);
const locationsState = cloneData(locationsSeed.items || []);

const moderationState = [
  {
    id: 'mod-001',
    title: 'Porsche 911 Carrera 2022',
    price: 2850000,
    seller: 'Carlos Méndez',
    sellerEmail: 'carlos.mendez@email.com',
    sellerPhone: '55 1234 5678',
    year: 2022,
    mileage: 8500,
    transmission: 'Automático',
    fuel: 'Gasolina',
    color: 'Rojo',
    description:
      'Porsche 911 Carrera en excelentes condiciones, único dueño, servicio completo en agencia. Incluye techo solar, asientos de piel y sistema de sonido premium.',
    features: [
      'Aire acondicionado',
      'Vidrios eléctricos',
      'Cámara reversa',
      'Sensores de estacionamiento',
      'Asientos de piel',
      'Techo solar',
    ],
    views: 245,
    imageIcon: '🏎️',
    status: 'pending',
    type: 'vehiculo',
    createdAt: '2026-03-20T10:30:00',
  },
  {
    id: 'mod-002',
    title: 'BMW X5 M Competition 2023',
    price: 1980000,
    seller: 'Ana Ramírez',
    sellerEmail: 'ana.ramirez@email.com',
    sellerPhone: '55 8765 4321',
    year: 2023,
    mileage: 3200,
    transmission: 'Automático',
    fuel: 'Gasolina',
    color: 'Negro',
    description:
      'BMW X5 M Competition con equipamiento completo, garantía extendida y factura original.',
    features: [
      'Cámara 360°',
      'Asientos calefactables',
      'Apple CarPlay',
      'Techo panorámico',
    ],
    views: 189,
    imageIcon: '🚙',
    status: 'pending',
    type: 'vehiculo',
    createdAt: '2026-03-19T15:20:00',
  },
  {
    id: 'mod-003',
    title: 'Chevrolet Silverado 2023 (Renta)',
    price: 35000,
    seller: 'Roberto Gómez',
    sellerEmail: 'roberto.gomez@email.com',
    sellerPhone: '55 6677 8899',
    year: 2023,
    mileage: 25000,
    transmission: 'Automático',
    fuel: 'Gasolina',
    color: 'Negro',
    description:
      'Camioneta Chevrolet Silverado disponible para renta mensual. Ideal para trabajo o familia.',
    features: ['Caja de carga', 'Remolque', 'Cámara reversa'],
    views: 98,
    imageIcon: '🚛',
    status: 'pending',
    type: 'renta',
    createdAt: '2026-03-20T08:00:00',
  },
  {
    id: 'mod-004',
    title: 'Audi RS7 Sportback 2022',
    price: 2150000,
    seller: 'Mario González',
    sellerEmail: 'mario.gonzalez@email.com',
    sellerPhone: '55 9988 7766',
    year: 2022,
    mileage: 15000,
    transmission: 'Automático',
    fuel: 'Gasolina',
    color: 'Gris',
    description:
      'Audi RS7 en perfecto estado, motor V8 biturbo, tracción quattro e interior en cuero.',
    features: ['Quattro', 'Asientos deportivos', 'Techo solar'],
    views: 167,
    imageIcon: '🏎️',
    status: 'approved',
    type: 'vehiculo',
    createdAt: '2026-03-15T11:00:00',
  },
  {
    id: 'mod-005',
    title: 'Tesla Model S Plaid',
    price: 2350000,
    seller: 'Sofía Ramírez',
    sellerEmail: 'sofia.ramirez@email.com',
    sellerPhone: '55 4433 2211',
    year: 2023,
    mileage: 8000,
    transmission: 'Automático',
    fuel: 'Eléctrico',
    color: 'Azul',
    description:
      'Tesla Model S Plaid con autonomía de 600 km y autopilot incluido.',
    features: ['Autopilot', 'Pantalla 17"', 'Carga rápida'],
    views: 423,
    imageIcon: '🔋',
    status: 'rejected',
    type: 'vehiculo',
    createdAt: '2026-03-14T14:30:00',
  },
];

function createId(prefix = 'adm') {
  return `${prefix}-${Date.now()}`;
}

function findById(items, id) {
  return items.find((item) => item.id === id) || null;
}

function replaceById(items, id, nextItem) {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  items[index] = nextItem;
  return items[index];
}

function removeById(items, id) {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const [removed] = items.splice(index, 1);
  return removed || null;
}

function matchesQuery(values, query) {
  if (!query) return true;
  return values.some((value) => includesText(value, query));
}

function getModerationPendingCount() {
  return moderationState.filter((item) => item.status === 'pending').length;
}

function buildDashboardSummary() {
  return {
    totalUsers: usersState.length,
    totalListings: listingsState.length,
    totalAppointments: appointmentsState.length,
    pendingReports: reportsState.filter((item) => item.status === 'pending').length,
    pendingModeration: getModerationPendingCount(),
    suspendedUsers: suspensionsState.filter((item) => item.status === 'active').length,
  };
}

export async function getAdminDashboard() {
  return resolveMock({
    summary: buildDashboardSummary(),
    recentAlerts: dashboardSeed.recentAlerts || [],
  });
}

export async function getAdminUsers(filters = {}) {
  const statuses = toArray(filters.status || filters.statuses);
  const roles = toArray(filters.role || filters.roles);
  const query = filters.q || filters.query || '';

  const items = usersState.filter((item) => {
    const matchesStatus = statuses.length === 0 || statuses.includes(item.status);
    const matchesRole = roles.length === 0 || roles.includes(item.role);
    const matchesSearch = matchesQuery([item.name, item.email, item.phone, item.id], query);
    return matchesStatus && matchesRole && matchesSearch;
  });

  return resolveMock({ items });
}

export async function getAdminUserById(id) {
  return resolveMock(findById(usersState, id));
}

export async function saveAdminUser(payload = {}) {
  const normalized = {
    ...payload,
    verified: payload.verified === true || payload.verified === 'true',
  };

  if (normalized.id) {
    const current = findById(usersState, normalized.id);
    if (!current) return resolveMock(null);

    return resolveMock(
      replaceById(usersState, normalized.id, {
        ...current,
        ...normalized,
      })
    );
  }

  const created = {
    id: createId(`u-${normalized.role || 'buyer'}`),
    name: normalized.name || 'Usuario AutoSphere',
    email: normalized.email || '',
    phone: normalized.phone || '',
    location: normalized.location || '',
    role: normalized.role || 'buyer',
    status: normalized.status || 'active',
    verified: normalized.verified === true,
    registeredAt: normalized.registeredAt || new Date().toISOString().split('T')[0],
    lastLogin: normalized.lastLogin || null,
    listingsCount: normalized.listingsCount || 0,
    avatar: normalized.avatar || null,
  };

  usersState.unshift(created);
  return resolveMock(created);
}

export async function updateUserStatus(userId, status, extras = {}) {
  const current = findById(usersState, userId);
  if (!current) return resolveMock(null);

  return resolveMock(
    replaceById(usersState, userId, {
      ...current,
      status,
      ...extras,
    })
  );
}

export async function deleteAdminUser(id) {
  return resolveMock({ ok: Boolean(removeById(usersState, id)), id });
}

export async function getAdminListings(filters = {}) {
  const statuses = toArray(filters.status || filters.statuses);
  const query = filters.q || filters.query || '';

  const items = listingsState.filter((item) => {
    const matchesStatus = statuses.length === 0 || statuses.includes(item.status);
    const matchesSeller = !filters.sellerId || item.sellerId === filters.sellerId;
    const matchesSearch = matchesQuery(
      [item.title, item.brand, item.model, item.id, item.sellerName],
      query
    );
    return matchesStatus && matchesSeller && matchesSearch;
  });

  return resolveMock({ items: sortItems(items, filters.sort || 'date_desc') });
}

export async function saveAdminListing(payload = {}) {
  const normalized = {
    ...payload,
    year: payload.year ? Number(payload.year) : payload.year,
    price: payload.price ? Number(payload.price) : payload.price,
    mileageKm: payload.mileageKm ? Number(payload.mileageKm) : payload.mileageKm,
  };

  if (normalized.id) {
    const current = findById(listingsState, normalized.id);
    if (!current) return resolveMock(null);

    return resolveMock(
      replaceById(listingsState, normalized.id, {
        ...current,
        ...normalized,
        updatedAt: new Date().toISOString(),
      })
    );
  }

  const created = {
    id: createId('vh'),
    title: normalized.title || 'Nueva publicación',
    brand: normalized.brand || '',
    model: normalized.model || '',
    year: normalized.year || null,
    price: normalized.price || 0,
    type: normalized.type || 'venta',
    category: normalized.category || 'SUV',
    transmission: normalized.transmission || 'Automática',
    fuel: normalized.fuel || 'Gasolina',
    mileageKm: normalized.mileageKm || null,
    cityId: normalized.cityId || null,
    cityName: normalized.cityName || '',
    sellerId: normalized.sellerId || 'u-seller-001',
    sellerName: normalized.sellerName || 'Carlos Méndez',
    sellerEmail: normalized.sellerEmail || 'carlos.mendez@email.com',
    sellerPhone: normalized.sellerPhone || '55 8765 4321',
    coverImage: normalized.coverImage || '',
    status: normalized.status || 'pending',
    color: normalized.color || '',
    description: normalized.description || '',
    features: normalized.features || [],
    views: normalized.views || 0,
    messages: normalized.messages || 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  listingsState.unshift(created);
  return resolveMock(created);
}

export async function reviewListing(id, status = 'active') {
  const current = findById(listingsState, id);
  if (!current) return resolveMock(null);
  return resolveMock(
    replaceById(listingsState, id, {
      ...current,
      status,
      updatedAt: new Date().toISOString(),
    })
  );
}

export async function deleteAdminListing(id) {
  return resolveMock({ ok: Boolean(removeById(listingsState, id)), id });
}

export async function getAdminAppointments(filters = {}) {
  const statuses = toArray(filters.status || filters.statuses);
  const query = filters.q || filters.query || '';

  const items = appointmentsState.filter((item) => {
    const matchesStatus = statuses.length === 0 || statuses.includes(item.status);
    const matchesSearch = matchesQuery(
      [item.id, item.notes, item.locationLabel, item.listingTitle, item.buyerName, item.sellerName],
      query
    );
    return matchesStatus && matchesSearch;
  });

  return resolveMock({ items: sortItems(items, filters.sort || 'date_desc') });
}

export async function updateAdminAppointment(id, payload = {}) {
  const current = findById(appointmentsState, id);
  if (!current) return resolveMock(null);

  return resolveMock(
    replaceById(appointmentsState, id, {
      ...current,
      ...payload,
    })
  );
}

export async function deleteAdminAppointment(id) {
  return resolveMock({ ok: Boolean(removeById(appointmentsState, id)), id });
}

export async function getAdminCatalog() {
  return resolveMock(catalogSeed);
}

export async function getAdminCatalogCollections() {
  return resolveMock({
    brands: brandsState,
    models: modelsState,
    types: vehicleTypesState,
    locations: locationsState,
  });
}

export async function saveAdminCatalogItem(kind, payload = {}) {
  const stateMap = {
    brands: brandsState,
    models: modelsState,
    types: vehicleTypesState,
    locations: locationsState,
  };

  const items = stateMap[kind];
  if (!items) return resolveMock(null);

  if (payload.id) {
    const current = findById(items, payload.id);
    if (!current) return resolveMock(null);
    return resolveMock(
      replaceById(items, payload.id, {
        ...current,
        ...payload,
      })
    );
  }

  const created = {
    id: createId(kind.slice(0, 2)),
    ...payload,
  };
  items.push(created);
  return resolveMock(created);
}

export async function deleteAdminCatalogItem(kind, id) {
  const stateMap = {
    brands: brandsState,
    models: modelsState,
    types: vehicleTypesState,
    locations: locationsState,
  };

  const items = stateMap[kind];
  if (!items) return resolveMock({ ok: false, id, kind });

  return resolveMock({ ok: Boolean(removeById(items, id)), id, kind });
}

export async function getAdminModeration() {
  return resolveMock({
    ...moderationSeed,
    items: moderationState,
  });
}

export async function getAdminModerationListings() {
  return resolveMock({ items: moderationState });
}

export async function approveAdminModerationListing(id) {
  const current = findById(moderationState, id);
  if (!current) return resolveMock(null);
  return resolveMock(
    replaceById(moderationState, id, {
      ...current,
      status: 'approved',
    })
  );
}

export async function rejectAdminModerationListing(id, payload = {}) {
  const current = findById(moderationState, id);
  if (!current) return resolveMock(null);
  return resolveMock(
    replaceById(moderationState, id, {
      ...current,
      status: 'rejected',
      rejectionReason: payload.reason || '',
      rejectionComments: payload.comments || '',
    })
  );
}

export async function deleteAdminModerationListing(id) {
  return resolveMock({ ok: Boolean(removeById(moderationState, id)), id });
}

export async function getAdminReports(filters = {}) {
  const statuses = toArray(filters.status || filters.statuses);
  const query = filters.q || filters.query || '';

  const items = reportsState.filter((item) => {
    const matchesStatus = statuses.length === 0 || statuses.includes(item.status);
    const matchesSearch = matchesQuery(
      [item.id, item.reason, item.targetId, item.targetName, item.title, item.reporterName, item.reportedName],
      query
    );
    return matchesStatus && matchesSearch;
  });

  return resolveMock({ items: sortItems(items, filters.sort || 'date_desc') });
}

export async function startAdminReportReview(id) {
  const current = findById(reportsState, id);
  if (!current) return resolveMock(null);

  return resolveMock(
    replaceById(reportsState, id, {
      ...current,
      status: 'reviewing',
      updatedAt: new Date().toISOString(),
      adminNotes: 'En revisión por el equipo de moderación',
    })
  );
}

export async function resolveReport(id, payload = {}) {
  const current = findById(reportsState, id);
  if (!current) return resolveMock(null);

  return resolveMock(
    replaceById(reportsState, id, {
      ...current,
      status: payload.status || 'resolved',
      resolvedAt: payload.resolvedAt || new Date().toISOString(),
      resolution: payload.action || payload.resolution || null,
      adminNotes: payload.notes || payload.adminNotes || current.adminNotes,
      updatedAt: new Date().toISOString(),
    })
  );
}

export async function deleteAdminReport(id) {
  return resolveMock({ ok: Boolean(removeById(reportsState, id)), id });
}

export async function getAdminSuspensions(filters = {}) {
  const statuses = toArray(filters.status || filters.statuses);
  const query = filters.q || filters.query || '';

  const items = suspensionsState.filter((item) => {
    const matchesStatus = statuses.length === 0 || statuses.includes(item.status);
    const matchesSearch = matchesQuery(
      [item.id, item.userId, item.reason, item.userName, item.userEmail],
      query
    );
    return matchesStatus && matchesSearch;
  });

  return resolveMock({ items });
}

export async function getAdminSuspensionFormOptions() {
  return resolveMock({
    activeUsers: usersState
      .filter((user) => user.status === 'active')
      .map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      })),
  });
}

export async function saveAdminSuspension(payload = {}) {
  if (payload.id) {
    const current = findById(suspensionsState, payload.id);
    if (!current) return resolveMock(null);

    return resolveMock(
      replaceById(suspensionsState, payload.id, {
        ...current,
        ...payload,
      })
    );
  }

  const user = usersState.find((item) => item.id === payload.userId) || null;
  const created = {
    id: createId('sp'),
    userId: payload.userId || user?.id || '',
    userName: payload.userName || user?.name || 'Usuario AutoSphere',
    userEmail: payload.email || user?.email || '',
    reason: payload.reason || '',
    description: payload.description || '',
    status: payload.status || (payload.duration === 'Permanente' ? 'permanent' : 'active'),
    duration: payload.duration || '7 días',
    suspensionDate: payload.suspensionDate || new Date().toISOString().split('T')[0],
    expiresAt: payload.reinstatementDate || null,
    reinstatementDate: payload.reinstatementDate || null,
  };

  suspensionsState.unshift(created);
  return resolveMock(created);
}

export async function reinstateAdminSuspension(id) {
  const current = findById(suspensionsState, id);
  if (!current) return resolveMock(null);

  return resolveMock(
    replaceById(suspensionsState, id, {
      ...current,
      status: 'expired',
      reinstatementDate: new Date().toISOString().split('T')[0],
    })
  );
}

export async function deleteAdminSuspension(id) {
  return resolveMock({ ok: Boolean(removeById(suspensionsState, id)), id });
}
