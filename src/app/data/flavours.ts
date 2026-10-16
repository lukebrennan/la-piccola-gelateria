import { PhotoKey } from '../core/photos';

export type Category = 'Classici' | 'Frutta' | 'Specialità';
export type Diet = 'Milk-free' | 'Contains nuts' | 'Contains egg' | 'Contains gluten';
export type IconName = 'lemon' | 'cone' | 'cup' | 'leaf' | 'sun' | 'flower' | 'spoon';

export interface Flavour {
  slug: string;
  name: string;
  /** One short, warm line. */
  description: string;
  category: Category;
  /** Dietary flags shown on the menu. Milk-free items also appear under "Senza Latte". */
  diet: Diet[];
  /** Always on the counter. Others rotate with the day and season. */
  staple: boolean;
  icon: IconName;
  photo?: PhotoKey;
  /** Months (1-12) the flavour is made. Omitted means year-round. */
  months?: number[];
  note?: string;
}

export const FLAVOURS: Flavour[] = [
  {
    slug: 'limone-di-amalfi',
    name: 'Limone di Amalfi',
    description: 'Fresh Amalfi lemon sorbet.',
    category: 'Frutta',
    diet: ['Milk-free'],
    staple: true,
    icon: 'lemon',
    photo: 'lemonSign',
    note: 'Sfusato lemons from the terraces above town, zest and juice.',
  },
  {
    slug: 'pistacchio',
    name: 'Pistacchio',
    description: 'Sicilian pistachios and fresh Italian milk.',
    category: 'Specialità',
    diet: ['Contains nuts'],
    staple: true,
    icon: 'leaf',
    photo: 'gelatoBowl',
    note: 'Stone-ground pistachios from Bronte, nothing green added.',
  },
  {
    slug: 'stracciatella',
    name: 'Stracciatella',
    description: 'Fior di latte with shards of dark chocolate.',
    category: 'Classici',
    diet: [],
    staple: true,
    icon: 'cone',
    photo: 'displayCounter',
  },
  {
    slug: 'fragola',
    name: 'Fragola',
    description: 'Fresh seasonal strawberries.',
    category: 'Frutta',
    diet: ['Milk-free'],
    staple: true,
    icon: 'sun',
    photo: 'strawberries',
    months: [4, 5, 6, 7, 8, 9],
  },
  {
    slug: 'cioccolato-fondente',
    name: 'Cioccolato Fondente',
    description: 'Rich Italian dark chocolate.',
    category: 'Classici',
    diet: ['Milk-free'],
    staple: true,
    icon: 'cup',
    photo: 'cone',
    note: 'Made with water, so it is as dark as it is dairy-free.',
  },
  {
    slug: 'fior-di-latte',
    name: 'Fior di Latte',
    description: 'Simple, creamy and traditional.',
    category: 'Classici',
    diet: [],
    staple: true,
    icon: 'cup',
    photo: 'display',
  },
  {
    slug: 'nocciola',
    name: 'Nocciola',
    description: 'Toasted Piedmont hazelnuts, slow and deep.',
    category: 'Classici',
    diet: ['Contains nuts'],
    staple: false,
    icon: 'leaf',
  },
  {
    slug: 'vaniglia',
    name: 'Vaniglia Bourbon',
    description: 'Real vanilla pods and nothing else it needs.',
    category: 'Classici',
    diet: ['Contains egg'],
    staple: false,
    icon: 'flower',
  },
  {
    slug: 'crema-amalfitana',
    name: 'Crema Amalfitana',
    description: 'Egg-yolk custard with lemon zest and a drop of Marsala.',
    category: 'Classici',
    diet: ['Contains egg'],
    staple: false,
    icon: 'sun',
  },
  {
    slug: 'caffe',
    name: 'Caffè',
    description: 'Espresso, pulled strong and churned slowly.',
    category: 'Classici',
    diet: [],
    staple: false,
    icon: 'cup',
  },
  {
    slug: 'fico',
    name: 'Fico',
    description: 'Ripe figs with a thread of honey.',
    category: 'Frutta',
    diet: ['Milk-free'],
    staple: false,
    icon: 'leaf',
    photo: 'strawberryFig',
    months: [7, 8, 9, 10],
  },
  {
    slug: 'pesca-bianca',
    name: 'Pesca Bianca',
    description: 'White peaches from the Campanian hills.',
    category: 'Frutta',
    diet: ['Milk-free'],
    staple: false,
    icon: 'sun',
    months: [6, 7, 8, 9],
  },
  {
    slug: 'arancia-rossa',
    name: 'Arancia Rossa',
    description: 'Sicilian blood orange, bright and a little bitter.',
    category: 'Frutta',
    diet: ['Milk-free'],
    staple: false,
    icon: 'lemon',
    months: [11, 12, 1, 2, 3, 4],
  },
  {
    slug: 'delizia-al-limone',
    name: 'Delizia al Limone',
    description: 'Lemon cream, soft sponge and a splash of limoncello.',
    category: 'Specialità',
    diet: ['Contains egg', 'Contains gluten'],
    staple: false,
    icon: 'lemon',
    note: 'Our take on the Amalfi Coast pastry.',
  },
  {
    slug: 'sfogliatella',
    name: 'Sfogliatella',
    description: 'Sweet ricotta, orange peel and crisp pastry.',
    category: 'Specialità',
    diet: ['Contains gluten'],
    staple: false,
    icon: 'cone',
  },
  {
    slug: 'tiramisu',
    name: 'Tiramisù',
    description: 'Mascarpone, espresso and a dusting of cocoa.',
    category: 'Specialità',
    diet: ['Contains egg', 'Contains gluten'],
    staple: false,
    icon: 'spoon',
  },
];

export const CATEGORIES: ('All' | Category | 'Senza Latte')[] = [
  'All',
  'Classici',
  'Frutta',
  'Specialità',
  'Senza Latte',
];

/** Short copy for each menu category. */
export const CATEGORY_NOTES: Record<string, string> = {
  All: 'Everything on the counter this season.',
  Classici: 'The flavours every gelateria is judged by, made the slow way.',
  Frutta: 'Fruit, sugar and water. Sorbetti taste of the fruit and little else.',
  Specialità: 'Our own small inventions, mostly inspired by what the coast bakes.',
  'Senza Latte': 'Every milk-free flavour in one place.',
};

export function inSeason(f: Flavour, month: number): boolean {
  return !f.months || f.months.includes(month);
}

/**
 * Flavours on the counter for a given day: all staples that are in season, plus a rotating
 * handful of the others so "today" genuinely changes from day to day.
 */
export function flavoursForDay(date: Date, rotating = 4): Flavour[] {
  const month = date.getMonth() + 1;
  const start = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((+date - +start) / 86_400_000);
  const pool = FLAVOURS.filter((f) => !f.staple && inSeason(f, month));
  const picked = new Set<string>();
  for (let i = 0; i < Math.min(rotating, pool.length); i++) {
    picked.add(pool[(dayOfYear * 3 + i * 5) % pool.length].slug);
  }
  return FLAVOURS.filter(
    (f) => (f.staple && inSeason(f, month)) || picked.has(f.slug),
  ).map((f) => f);
}
