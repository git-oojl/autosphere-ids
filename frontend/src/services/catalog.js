import filtersData from '../mocks/catalog/filters.json';
import listingDetails from '../mocks/catalog/listing-details.json';
import listingsData from '../mocks/catalog/listings.json';
import rentalDetails from '../mocks/catalog/rental-details.json';
import rentalsData from '../mocks/catalog/rentals.json';
import cities from '../mocks/shared/cities.json';
import users from '../mocks/shared/users.json';
import publicProfiles from '../mocks/shared/public-profiles.json';
import reviewsData from '../mocks/shared/reviews.json';
import adminListingsData from '../mocks/admin/listings.json';
import { resolveMock } from './mockResponse.js';
import {
  includesText,
  paginateItems,
  sortItems,
  toArray,
  unique,
} from './mockUtils.js';

const cityMap = cities.reduce((acc, city) => {
  acc[city.id] = city;
  return acc;
}, {});

const userMap = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});

const adminListingItems =
  adminListingsData.listings || adminListingsData.items || [];
const adminListingMap = adminListingItems.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

function getProfileSeed(profileId) {
  return publicProfiles[profileId] || userMap[profileId] || null;
}

function buildSellerProfile(profileId, fallback = {}) {
  const seed = getProfileSeed(profileId) || {};
  const reviews = reviewsData.filter((item) => item.profileId === profileId);
  const ratingAverage =
    reviews.length > 0
      ? Number(
          (
            reviews.reduce((sum, item) => sum + Number(item.rating || 0), 0) /
            reviews.length
          ).toFixed(1)
        )
      : null;

  return {
    id: profileId,
    displayName:
      fallback.displayName ||
      seed.displayName ||
      seed.name ||
      'Perfil AutoSphere',
    verified: fallback.verified ?? seed.verified ?? false,
    city: seed.city || fallback.city || null,
    state: seed.state || fallback.state || null,
    bio: seed.bio || fallback.bio || '',
    memberSince: seed.memberSince || null,
    surface: seed.surface || fallback.surface || 'seller',
    contactEmail: seed.email || userMap[profileId]?.email || null,
    reviews,
    ratingAverage,
  };
}

function normalizeSaleListing(listing) {
  if (!listing) return null;

  const detail = listingDetails[listing.id] || {};
  const adminSeed = adminListingMap[listing.id] || {};
  const city = cityMap[detail.cityId || listing.cityId] || null;
  const sellerId = detail.sellerId || listing.sellerId;
  const sellerProfile = buildSellerProfile(
    sellerId,
    detail.sellerProfile || {}
  );

  return {
    ...listing,
    ...detail,
    mode: 'sale',
    brand: detail.brand || listing.brand || adminSeed.brand || '',
    model: detail.model || listing.model || adminSeed.model || '',
    year: detail.year || listing.year || adminSeed.year || null,
    color: detail.color || listing.color || adminSeed.color || '',
    transmission:
      detail.transmission ||
      listing.transmission ||
      adminSeed.transmission ||
      '',
    fuel: detail.fuel || listing.fuel || adminSeed.fuel || '',
    mileageKm:
      detail.mileageKm ?? listing.mileageKm ?? adminSeed.mileageKm ?? null,
    price: detail.price ?? listing.price ?? adminSeed.price ?? 0,
    cityId: detail.cityId || listing.cityId || null,
    city,
    cityLabel: city
      ? `${city.name}, ${city.state}`
      : detail.location?.city || '',
    sellerId,
    sellerProfile,
    sellerDisplayName: sellerProfile.displayName,
    gallery:
      detail.gallery ||
      [detail.coverImage || listing.coverImage].filter(Boolean),
    coverImage: detail.coverImage || listing.coverImage || null,
    description: detail.description || adminSeed.description || '',
    location: detail.location || null,
    features: detail.features || listing.features || adminSeed.features || [],
    specs: detail.specs || {},
  };
}

function normalizeRentalListing(listing) {
  if (!listing) return null;

  const detail = rentalDetails[listing.id] || {};
  const adminSeed = adminListingMap[listing.id] || {};
  const rentalSpecs = detail.rentalSpecs || {};
  const city = cityMap[detail.cityId || listing.cityId] || null;
  const sellerId =
    detail.sellerProfile?.id ||
    detail.sellerId ||
    publicProfiles['u-lessor-001']?.id ||
    'u-lessor-001';
  const sellerProfile = buildSellerProfile(
    sellerId,
    detail.sellerProfile || {
      displayName: 'Rentas AutoSphere',
      verified: true,
      surface: 'lessor',
    }
  );

  return {
    ...listing,
    ...detail,
    mode: 'rental',
    brand: detail.brand || listing.brand || adminSeed.brand || '',
    model: detail.model || listing.model || adminSeed.model || '',
    year: detail.year || listing.year || adminSeed.year || null,
    color: detail.color || listing.color || adminSeed.color || '',
    transmission:
      detail.transmission ||
      listing.transmission ||
      adminSeed.transmission ||
      '',
    fuel: detail.fuel || listing.fuel || adminSeed.fuel || '',
    mileageKm:
      detail.mileageKm ?? listing.mileageKm ?? adminSeed.mileageKm ?? null,
    rentalSpecs,
    price:
      rentalSpecs.pricePerDay ??
      listing.pricePerDay ??
      adminSeed.pricePerDay ??
      0,
    pricePerDay: rentalSpecs.pricePerDay ?? listing.pricePerDay ?? 0,
    pricePerWeek: rentalSpecs.pricePerWeek ?? listing.pricePerWeek ?? null,
    pricePerMonth: rentalSpecs.pricePerMonth ?? listing.pricePerMonth ?? null,
    depositAmount: rentalSpecs.depositAmount ?? listing.depositAmount ?? null,
    kmIncludedPerDay:
      rentalSpecs.kmIncludedPerDay ?? listing.kmIncludedPerDay ?? null,
    availableFrom: rentalSpecs.availableFrom ?? listing.availableFrom ?? null,
    availableTo: rentalSpecs.availableTo ?? listing.availableTo ?? null,
    available: rentalSpecs.available ?? listing.available ?? true,
    cityId: detail.cityId || listing.cityId || null,
    city,
    cityLabel: city
      ? `${city.name}, ${city.state}`
      : detail.location?.city || '',
    sellerId,
    sellerProfile,
    sellerDisplayName: sellerProfile.displayName,
    gallery:
      detail.gallery ||
      [detail.coverImage || listing.coverImage].filter(Boolean),
    coverImage: detail.coverImage || listing.coverImage || null,
    description: detail.description || adminSeed.description || '',
    location: detail.location || null,
    features:
      rentalSpecs.includedItems ||
      detail.features ||
      listing.features ||
      adminSeed.features ||
      [],
    specs: detail.specs || {},
  };
}

function getSaleListings() {
  return listingsData.items.map(normalizeSaleListing);
}

function getRentalListings() {
  return rentalsData.items.map(normalizeRentalListing);
}

function normalizeCatalogMode(mode = 'all') {
  if (mode === 'venta') return 'sale';
  if (mode === 'renta') return 'rental';
  return mode || 'all';
}

function getCatalogInventory(mode = 'all') {
  const normalizedMode = normalizeCatalogMode(mode);
  if (normalizedMode === 'sale') return getSaleListings();
  if (normalizedMode === 'rental') return getRentalListings();
  return [...getSaleListings(), ...getRentalListings()];
}

function countDefinedMedia(listing) {
  const gallery = Array.isArray(listing?.gallery)
    ? listing.gallery.filter(Boolean)
    : [];
  const cover = listing?.coverImage ? 1 : 0;
  return Math.max(gallery.length, cover);
}

export function getListingFeaturedScore(listing) {
  if (!listing || listing.status !== 'published') return 0;

  const mediaCount = countDefinedMedia(listing);
  const descriptionLength = String(listing.description || '').trim().length;
  const featuresCount = Array.isArray(listing.features)
    ? listing.features.length
    : 0;
  const ratingAverage = Number(listing.sellerProfile?.ratingAverage || 0);
  const verifiedSeller = Boolean(listing.sellerProfile?.verified);
  const hasLocation = Boolean(
    listing.cityLabel ||
    listing.location?.city ||
    listing.location?.addressLabel
  );
  const hasPrice = Number(listing.price || listing.pricePerDay || 0) > 0;
  const isRentalAvailable =
    listing.mode !== 'rental' || listing.available !== false;

  let score = 40;
  score += Math.min(15, mediaCount * 5);
  score +=
    descriptionLength >= 120
      ? 12
      : descriptionLength >= 60
        ? 8
        : descriptionLength >= 20
          ? 4
          : 0;
  score += Math.min(12, featuresCount * 2);
  score += verifiedSeller ? 8 : 0;
  score += Math.min(10, Math.round(ratingAverage * 2));
  score += hasLocation ? 5 : 0;
  score += hasPrice ? 4 : 0;
  score += isRentalAvailable ? 6 : 0;
  score += listing.year
    ? Math.max(0, Math.min(8, Number(listing.year) - 2018))
    : 0;

  return score;
}

export function getListingFeaturedPercent(listing) {
  return Math.max(
    0,
    Math.min(100, Math.round((getListingFeaturedScore(listing) / 120) * 100))
  );
}

function matchesMultiValue(candidate, selectedValues = []) {
  if (selectedValues.length === 0) return true;
  return selectedValues.includes(candidate);
}

function applyListingFilters(items, filters = {}) {
  const query = filters.q || filters.query || '';
  const brandFilters = toArray(filters.brand || filters.brands);
  const typeFilters = toArray(filters.type || filters.types);
  const transmissionFilters = toArray(
    filters.transmission || filters.transmissions
  );
  const fuelFilters = toArray(filters.fuel || filters.fuels);
  const cityFilters = toArray(filters.cityId || filters.cityIds);
  const statusFilters = toArray(filters.status || filters.statuses);
  const sellerFilters = toArray(filters.sellerId || filters.sellerIds);
  const colorFilters = toArray(filters.color || filters.colors);
  const idFilters = toArray(filters.id || filters.ids);
  const modeFilters = toArray(filters.mode || filters.modes);
  const minPrice = Number(filters.minPrice ?? Number.NEGATIVE_INFINITY);
  const maxPrice = Number(filters.maxPrice ?? Number.POSITIVE_INFINITY);
  const minYear = Number(filters.minYear ?? Number.NEGATIVE_INFINITY);
  const maxYear = Number(filters.maxYear ?? Number.POSITIVE_INFINITY);

  return items.filter((listing) => {
    const matchesQuery =
      !query ||
      [
        listing.title,
        listing.brand,
        listing.model,
        listing.cityLabel,
        listing.sellerDisplayName,
      ].some((value) => includesText(value, query));

    return (
      matchesQuery &&
      matchesMultiValue(listing.brand, brandFilters) &&
      matchesMultiValue(listing.type, typeFilters) &&
      matchesMultiValue(listing.transmission, transmissionFilters) &&
      matchesMultiValue(listing.fuel, fuelFilters) &&
      matchesMultiValue(listing.cityId, cityFilters) &&
      matchesMultiValue(listing.status, statusFilters) &&
      matchesMultiValue(listing.sellerId, sellerFilters) &&
      matchesMultiValue(listing.color, colorFilters) &&
      matchesMultiValue(listing.id, idFilters) &&
      matchesMultiValue(listing.mode, modeFilters) &&
      Number(listing.price ?? 0) >= minPrice &&
      Number(listing.price ?? 0) <= maxPrice &&
      Number(listing.year ?? 0) >= minYear &&
      Number(listing.year ?? 0) <= maxYear
    );
  });
}

export async function getCatalogFilters(options = {}) {
  const mode = normalizeCatalogMode(options.mode || 'all');
  const inventory = getCatalogInventory(mode).filter(
    (item) => item.status === 'published'
  );

  return resolveMock({
    ...filtersData,
    brands: unique(inventory.map((item) => item.brand)).sort(),
    types: unique(inventory.map((item) => item.type)).sort(),
    cities: inventory
      .map((item) => item.city)
      .filter(Boolean)
      .map((city) => ({ id: city.id, label: `${city.name}, ${city.state}` })),
  });
}

export async function getListings(filters = {}) {
  const mode = normalizeCatalogMode(filters.mode || 'all');
  const normalizedFilters = {
    ...filters,
    mode: mode === 'all' ? undefined : mode,
  };

  const items = getCatalogInventory(mode).filter(
    (item) => item.status === 'published' || filters.includeUnpublished
  );
  const filtered = applyListingFilters(items, normalizedFilters);
  const sorted = sortItems(filtered, filters.sort || 'relevance');
  const paginated = paginateItems(
    sorted,
    filters.page ?? 1,
    filters.pageSize ?? 12
  );

  return resolveMock({
    meta: paginated.meta,
    items: paginated.items,
    appliedFilters: normalizedFilters,
  });
}

export async function getListingById(id) {
  const item = id?.startsWith('rt-')
    ? normalizeRentalListing(rentalsData.items.find((entry) => entry.id === id))
    : normalizeSaleListing(listingsData.items.find((entry) => entry.id === id));

  return resolveMock(item || null);
}

export async function getFeaturedListings(options = {}) {
  const ids = toArray(options.ids);
  const inventory = getCatalogInventory(
    normalizeCatalogMode(options.mode || 'all')
  ).filter((item) => item.status === 'published');

  const filtered = inventory.filter((item) => {
    if (options.sellerId && item.sellerId !== options.sellerId) return false;
    return true;
  });

  const items =
    ids.length > 0 && options.strategy === 'curated'
      ? ids
          .map((id) => filtered.find((entry) => entry.id === id))
          .filter(Boolean)
      : [...filtered].sort((a, b) => {
          const diff = getListingFeaturedScore(b) - getListingFeaturedScore(a);
          if (diff !== 0) return diff;
          return String(b.id).localeCompare(String(a.id));
        });

  return resolveMock(items.slice(0, Number(options.limit || 3)));
}

export async function getRelatedListings(id, options = {}) {
  const current = await getListingById(id);
  if (!current) return resolveMock([]);

  const inventory = getCatalogInventory(current.mode).filter(
    (item) => item.id !== current.id && item.status === 'published'
  );

  const related = inventory
    .filter(
      (item) => item.type === current.type || item.brand === current.brand
    )
    .slice(0, Number(options.limit || 4));

  return resolveMock(related);
}

export async function getListingsBySeller(sellerId, filters = {}) {
  return getListings({
    ...filters,
    sellerId,
    pageSize: filters.pageSize || 50,
    includeUnpublished: filters.includeUnpublished ?? true,
  });
}

export async function getSellerProfile(sellerId) {
  const listings = getCatalogInventory('all').filter(
    (item) => item.sellerId === sellerId && item.status === 'published'
  );
  if (
    listings.length === 0 &&
    !publicProfiles[sellerId] &&
    !userMap[sellerId]
  ) {
    return resolveMock(null);
  }

  const base = buildSellerProfile(sellerId, listings[0]?.sellerProfile || {});

  return resolveMock({
    ...base,
    activeListings: listings.length,
    inventory: listings,
  });
}
