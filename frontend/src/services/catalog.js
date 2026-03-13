import filtersData from '../mocks/catalog/filters.json';
import listingDetails from '../mocks/catalog/listing-details.json';
import listingsData from '../mocks/catalog/listings.json';
import cities from '../mocks/shared/cities.json';
import users from '../mocks/shared/users.json';
import { resolveMock } from './mockResponse.js';
import { includesText, paginateItems, sortItems, toArray } from './mockUtils.js';

const cityMap = cities.reduce((acc, city) => {
  acc[city.id] = city;
  return acc;
}, {});

const userMap = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});

function enrichListing(listing) {
  if (!listing) {
    return null;
  }

  const city = cityMap[listing.cityId] || null;
  const seller = userMap[listing.sellerId] || null;

  return {
    ...listing,
    city,
    cityLabel: city ? `${city.name}, ${city.state}` : null,
    seller,
    sellerDisplayName: seller?.name || null,
  };
}

function matchesMultiValue(candidate, selectedValues = []) {
  if (selectedValues.length === 0) {
    return true;
  }

  return selectedValues.includes(candidate);
}

function applyListingFilters(items, filters = {}) {
  const query = filters.q || filters.query || '';
  const brandFilters = toArray(filters.brand || filters.brands);
  const typeFilters = toArray(filters.type || filters.types);
  const transmissionFilters = toArray(filters.transmission || filters.transmissions);
  const fuelFilters = toArray(filters.fuel || filters.fuels);
  const cityFilters = toArray(filters.cityId || filters.cityIds);
  const statusFilters = toArray(filters.status || filters.statuses);
  const sellerFilters = toArray(filters.sellerId || filters.sellerIds);
  const colorFilters = toArray(filters.color || filters.colors);
  const idFilters = toArray(filters.id || filters.ids);
  const minPrice = Number(filters.minPrice ?? Number.NEGATIVE_INFINITY);
  const maxPrice = Number(filters.maxPrice ?? Number.POSITIVE_INFINITY);
  const minYear = Number(filters.minYear ?? Number.NEGATIVE_INFINITY);
  const maxYear = Number(filters.maxYear ?? Number.POSITIVE_INFINITY);

  return items.filter((listing) => {
    const matchesQuery = !query
      || [listing.title, listing.brand, listing.model, listing.cityLabel, listing.sellerDisplayName]
        .some((value) => includesText(value, query));

    return (
      matchesQuery
      && matchesMultiValue(listing.brand, brandFilters)
      && matchesMultiValue(listing.type, typeFilters)
      && matchesMultiValue(listing.transmission, transmissionFilters)
      && matchesMultiValue(listing.fuel, fuelFilters)
      && matchesMultiValue(listing.cityId, cityFilters)
      && matchesMultiValue(listing.status, statusFilters)
      && matchesMultiValue(listing.sellerId, sellerFilters)
      && matchesMultiValue(listing.color, colorFilters)
      && matchesMultiValue(listing.id, idFilters)
      && listing.price >= minPrice
      && listing.price <= maxPrice
      && listing.year >= minYear
      && listing.year <= maxYear
    );
  });
}

export async function getCatalogFilters() {
  // TODO: replace with GET /api/catalog/filters.
  return resolveMock(filtersData);
}

export async function getListings(filters = {}) {
  // TODO: replace with GET /api/listings.
  const items = listingsData.items.map(enrichListing);
  const filtered = applyListingFilters(items, filters);
  const sorted = sortItems(filtered, filters.sort || 'relevance');
  const paginated = paginateItems(
    sorted,
    filters.page ?? listingsData.meta?.page ?? 1,
    filters.pageSize ?? listingsData.meta?.pageSize ?? 12
  );

  return resolveMock({
    meta: paginated.meta,
    items: paginated.items,
    appliedFilters: filters,
  });
}

export async function getListingById(id) {
  // TODO: replace with GET /api/listings/:id.
  return resolveMock(enrichListing(listingDetails[id] || null));
}

export async function getFeaturedListings(options = {}) {
  const ids = toArray(options.ids);
  const items = ids.length > 0
    ? ids.map((id) => listingDetails[id]).filter(Boolean)
    : listingsData.items.filter((item) => item.status === 'published');

  const limit = Number(options.limit || 3);
  return resolveMock(items.slice(0, limit).map(enrichListing));
}

export async function getRelatedListings(id, options = {}) {
  const current = listingDetails[id] || null;

  if (!current) {
    return resolveMock([]);
  }

  const related = listingsData.items
    .filter((item) => item.id !== id)
    .filter((item) => item.type === current.type || item.brand === current.brand)
    .slice(0, Number(options.limit || 4))
    .map(enrichListing);

  return resolveMock(related);
}

export async function getListingsBySeller(sellerId, filters = {}) {
  return getListings({ ...filters, sellerId, pageSize: filters.pageSize || 50 });
}

export async function getSellerProfile(sellerId) {
  // TODO: replace with GET /api/public/sellers/:id.
  const listing = Object.values(listingDetails).find((item) => item.sellerId === sellerId);
  return resolveMock(listing?.sellerProfile || null);
}
