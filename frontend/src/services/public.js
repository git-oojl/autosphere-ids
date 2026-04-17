import aboutContent from '../mocks/public/about.json';
import contactContent from '../mocks/public/contact.json';
import faqContent from '../mocks/public/faq.json';
import homeContent from '../mocks/public/home.json';
import { getFeaturedListings } from './catalog.js';
import { resolveMock } from './mockResponse.js';

const testimonials = [
  {
    id: 'press-001',
    initials: 'R',
    title: 'Reseña pública',
    outlet: 'Fuente externa · Revista Ruta Norte',
    type: 'Artículo editorial',
    source: '',
    text: 'La propuesta destaca por conectar búsqueda, ficha del vehículo y agenda sin romper el flujo visual del usuario.',
  },
  {
    id: 'press-002',
    initials: 'C',
    title: 'Comentario recopilado',
    outlet: 'Fuente externa · Cuaderno Motor',
    type: 'Columna de producto',
    source: '',
    text: 'AutoSphere toma referencias claras del mercado automotriz digital: fichas limpias, filtros directos y pasos de contacto fáciles de entender.',
  },
  {
    id: 'press-003',
    initials: 'M',
    title: 'Mención pública',
    outlet: 'Fuente externa · Mercado Vial Hoy',
    type: 'Nota de tendencias',
    source: '',
    text: 'Lo más fuerte es la lectura inmediata del tipo de publicación y la forma en que la cita aparece como continuación natural de la navegación.',
  },
];

export async function getHomePage() {
  const featuredListings = await getFeaturedListings({
    limit: 3,
  });

  return resolveMock({
    ...homeContent,
    featuredListings,
    testimonials,
  });
}

export async function getAboutPage() {
  return resolveMock(aboutContent);
}

export async function getContactPage() {
  return resolveMock(contactContent);
}

export async function getFaqPage() {
  return resolveMock(faqContent);
}


export async function submitContactForm(payload = {}) {
  // TODO: replace with POST /api/public/contact.
  return resolveMock({
    ok: true,
    ticketId: `contact-${Date.now()}`,
    message: 'Mensaje recibido en el entorno mock',
    submittedAt: new Date().toISOString(),
    payload: {
      name: payload.name || '',
      email: payload.email || '',
      phone: payload.phone || '',
      subject: payload.subject || '',
      message: payload.message || '',
    },
  });
}
