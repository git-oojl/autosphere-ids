import listingDetails from '../mocks/catalog/listing-details.json';
import listings from '../mocks/catalog/listings.json';
import { resolveMock } from './mockResponse';

export async function getListings(filters = {}) {
  // TODO: replace with GET /api/listings and map server-side filters.
  const normalizedQuery = (filters.query || '').trim().toLowerCase();

  const filtered = normalizedQuery
    ? listings.filter((listing) => {
        return [listing.title, listing.brand, listing.location].some((field) =>
          field.toLowerCase().includes(normalizedQuery)
        );
      })
    : listings;

  return resolveMock(filtered);
}

export async function getListingById(id) {
  // TODO: replace with GET /api/listings/:id.
  const numericId = Number(id);
  const listing = listingDetails.find((item) => item.id === numericId) || null;

  return resolveMock(listing);
}
