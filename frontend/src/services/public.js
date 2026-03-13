import aboutContent from '../mocks/public/about.json';
import contactContent from '../mocks/public/contact.json';
import faqContent from '../mocks/public/faq.json';
import homeContent from '../mocks/public/home.json';
import listingDetails from '../mocks/catalog/listing-details.json';
import { resolveMock } from './mockResponse.js';

export async function getHomePage() {
  // TODO: replace with GET /api/public/home.
  const featuredListings = (homeContent.featuredVehicleIds || [])
    .map((id) => listingDetails[id])
    .filter(Boolean);

  return resolveMock({
    ...homeContent,
    featuredListings,
  });
}

export async function getAboutPage() {
  // TODO: replace with GET /api/public/about.
  return resolveMock(aboutContent);
}

export async function getContactPage() {
  // TODO: replace with GET /api/public/contact.
  return resolveMock(contactContent);
}

export async function getFaqPage() {
  // TODO: replace with GET /api/public/faq.
  return resolveMock(faqContent);
}
