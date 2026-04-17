import publicProfiles from '../mocks/shared/public-profiles.json';
import reviewsData from '../mocks/shared/reviews.json';
import { getListingsBySeller, getSellerProfile } from './catalog.js';
import { resolveMock } from './mockResponse.js';

export async function getPublicProfileById(id) {
  const summary = await getSellerProfile(id);
  if (!summary && !publicProfiles[id]) {
    return resolveMock(null);
  }

  const inventoryRes = await getListingsBySeller(id, {
    includeUnpublished: false,
    pageSize: 50,
  });

  return resolveMock({
    ...(publicProfiles[id] || {}),
    ...(summary || {}),
    reviews: reviewsData.filter((item) => item.profileId === id),
    inventory: inventoryRes?.items || [],
  });
}

export async function getPublicProfileReviews(id) {
  return resolveMock(reviewsData.filter((item) => item.profileId === id));
}
