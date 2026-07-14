// Single source of truth for contact / social data. Edit values here only —
// components must not hardcode phone numbers, messages, or handles.
import { site } from './site.js';

export const contact = {
  whatsapp: {
    displayNumber: '+961 3 737 783',
    normalizedNumber: '9613737783',
    message: 'Hello Ali, I discovered your portfolio and would like to discuss an interior design project.',
  },
  instagram: 'https://www.instagram.com/aly.ussef',
  instagramHandle: '@aly.ussef',
  based: site.based,
};

export function getWhatsAppUrl() {
  const { normalizedNumber, message } = contact.whatsapp;
  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`;
}
