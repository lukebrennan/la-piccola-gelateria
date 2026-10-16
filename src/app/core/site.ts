/**
 * Single source of truth for business facts.
 * La Piccola Gelateria is a fictional business created for a design portfolio.
 */
export const SITE = {
  name: 'La Piccola Gelateria',
  shortName: 'La Piccola',
  tagline: 'Un piccolo assaggio di felicità.',
  taglineEn: 'A little taste of happiness.',
  /**
   * Public origin + base path, no trailing slash. Used for canonical URLs, Open Graph and
   * structured data. Swap for the custom domain when it is live.
   */
  url: 'https://lapiccolagelateria.com',
  email: 'ciao@lapiccola.example',
  phone: '+39 089 000 0000',
  instagramHandle: '@lapiccolagelateria',
  instagramUrl: 'https://www.instagram.com/',
  address: {
    street: 'Via dei Limoni 18',
    postcode: '84011',
    city: 'Amalfi',
    region: 'SA',
    country: 'Italy',
    countryCode: 'IT',
  },
  geo: { lat: 40.634, lng: 14.6027 },
  landmark: 'A two-minute walk from the Duomo steps, just off Piazza Flavio Gioia.',
  hours: {
    label: 'Every day, 10:00am to midnight',
    opens: 10,
    closes: 24,
    timeZone: 'Europe/Rome',
  },
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.6340,14.6027',
} as const;

export const NAV = [
  { label: 'Gelato', path: '/gelato' },
  { label: 'Our Story', path: '/our-story' },
  { label: 'Ingredients', path: '/ingredients' },
  { label: 'Visit Us', path: '/visit-amalfi' },
  { label: 'Journal', path: '/journal' },
] as const;

export const WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;
