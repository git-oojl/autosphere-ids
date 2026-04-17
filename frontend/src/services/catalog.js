import http from './http.js';
import { buildParams } from './apiUtils.js';

function normalizeCatalogMode(mode = 'all') {
  if (mode === 'venta') return 'sale';
  if (mode === 'renta') return 'rental';
  return mode || 'all';
}

export function getListingFeaturedScore(listing) {
  if (!listing) return 0;

  let score = 0;
  const hasGallery = Array.isArray(listing.gallery) && listing.gallery.length > 1;
  const hasCover = Boolean(listing.coverImage);
  const hasDescription = Boolean(String(listing.description || '').trim());
  const featuresCount = Array.isArray(listing.features) ? listing.features.length : 0;
  const specsCount = Object.keys(listing.specs || {}).length;
  const isVerifiedSeller = listing.sellerProfile?.verified === true;
  const hasLocation = Boolean(listing.cityLabel || listing.location?.city);
  const isRentalAvailable = listing.mode === 'rental' ? listing.available !== false : true;

  score += hasGallery ? 22 : 0;
  score += hasCover ? 12 : 0;
  score += hasDescription ? 16 : 0;
  score += Math.min(18, featuresCount * 3);
  score += Math.min(18, specsCount * 2);
  score += isVerifiedSeller ? 16 : 0;
  score += hasLocation ? 10 : 0;
  score += isRentalAvailable ? 6 : 0;
  score += listing.year ? Math.max(0, Math.min(8, Number(listing.year) - 2018)) : 0;

  return score;
}

export function getListingFeaturedPercent(listing) {
  return Math.max(0, Math.min(100, Math.round((getListingFeaturedScore(listing) / 120) * 100)));
}

function sortFeatured(items = []) {
  return [...items].sort((a, b) => {
    const diff = getListingFeaturedScore(b) - getListingFeaturedScore(a);
    if (diff !== 0) return diff;
    return String(b.id || '').localeCompare(String(a.id || ''));
  });
}

export async function getCatalogFilters(options = {}) {
  const params = buildParams({
    mode: options.mode,
  });
  const { data } = await http.get('/catalog/filters', { params });
  return data;
}

export async function getListings(filters = {}) {
  const params = buildParams({
    ...filters,
    mode: filters.mode,
  });
  const { data } = await http.get('/listings', { params });
  return data;
}

export async function getListingById(id) {
  const { data } = await http.get(`/listings/${id}`);
  return data;
}

export async function getFeaturedListings(options = {}) {
  const response = await getListings({
    mode: options.mode,
    sellerId: options.sellerId,
    pageSize: options.pageSize || 100,
    includeUnpublished: false,
    sort: 'newest',
  });

  const ids = Array.isArray(options.ids) ? options.ids : [];
  const inventory = response?.items || [];
  const featured =
    ids.length > 0 && options.strategy === 'curated'
      ? ids.map((id) => inventory.find((entry) => entry.id === id)).filter(Boolean)
      : sortFeatured(inventory);

  return featured.slice(0, Number(options.limit || 3));
}

export async function getRelatedListings(id, options = {}) {
  const current = await getListingById(id);
  if (!current) return [];

  const response = await getListings({
    mode: current.mode,
    pageSize: options.pageSize || 50,
    includeUnpublished: false,
  });

  return (response?.items || [])
    .filter((item) => item.id !== current.id)
    .filter((item) => item.type === current.type || item.brand === current.brand)
    .slice(0, Number(options.limit || 4));
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
  const { data } = await http.get(`/public/profiles/${sellerId}`);
  return data;
}

export { normalizeCatalogMode };
