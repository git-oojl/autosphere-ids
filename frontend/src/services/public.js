import aboutContent from '../mocks/public/about.json';
import contactContent from '../mocks/public/contact.json';
import faqContent from '../mocks/public/faq.json';
import http from './http.js';

export async function getHomePage() {
  const { data } = await http.get('/public/home');
  return data;
}

export async function getAboutPage() {
  return aboutContent;
}

export async function getContactPage() {
  return contactContent;
}

export async function getFaqPage() {
  return faqContent;
}

export async function submitContactForm(payload = {}) {
  const { data } = await http.post('/public/contact', payload);
  return data;
}
