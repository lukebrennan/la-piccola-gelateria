/**
 * Photo ids may be Unsplash CDN ids or local generated brand assets. Local photos share the same
 * loader interface as remote photography.
 */
export interface Photo {
  /** Unsplash photo id (the part after `photo-`). */
  id: string;
  alt: string;
  credit: string;
  creditUrl: string;
  /** Intrinsic ratio of the original, used for aspect-ratio defaults. */
  ratio: number;
  /** CSS object-position, to keep the subject in frame when cropped. */
  focus?: string;
}

const u = (handle: string) => `https://unsplash.com/@${handle}`;

export const PHOTOS = {
  ingredientLemons: {
    id: '/brand/website/photography/ingredient-lemons.webp', alt: 'Fresh golden Amalfi lemons with glossy green leaves', credit: 'La Piccola Gelateria', creditUrl: '/', ratio: 1,
  },
  ingredientPistachios: {
    id: '/brand/website/photography/ingredient-pistachios.webp', alt: 'Sicilian pistachios and green kernels in a cream ceramic dish', credit: 'La Piccola Gelateria', creditUrl: '/', ratio: 1,
  },
  ingredientStrawberries: {
    id: '/brand/website/photography/ingredient-strawberries.webp', alt: 'Ripe strawberries and green leaves in warm sunlight', credit: 'La Piccola Gelateria', creditUrl: '/', ratio: 1,
  },
  heroAmalfi: {
    id: '/brand/website/photography/hero-amalfi-coast.webp',
    alt: 'Three scoops of gelato on a hand-painted ceramic table overlooking the Amalfi Coast',
    credit: 'La Piccola Gelateria',
    creditUrl: '/',
    ratio: 1672 / 941,
    focus: 'center 54%',
  },
  flavourLimone: {
    id: '/brand/website/photography/flavours/limone.webp',
    alt: 'Fresh lemon gelato with Amalfi lemons and a curl of peel',
    credit: 'La Piccola Gelateria', creditUrl: '/', ratio: 1,
  },
  flavourCaffe: {
    id: '/brand/website/photography/flavours/caffe.webp',
    alt: 'Italian coffee gelato with a dusting of espresso grounds', credit: 'La Piccola Gelateria', creditUrl: '/', ratio: 1,
  },
  flavourCaramello: {
    id: '/brand/website/photography/flavours/caramello-salato.webp',
    alt: 'Salted caramel gelato finished with a delicate caramel ribbon', credit: 'La Piccola Gelateria', creditUrl: '/', ratio: 1,
  },
  flavourCocco: {
    id: '/brand/website/photography/flavours/cocco.webp',
    alt: 'Coconut gelato topped with toasted coconut flakes', credit: 'La Piccola Gelateria', creditUrl: '/', ratio: 1,
  },
  flavourPistacchio: {
    id: '/brand/website/photography/flavours/pistacchio.webp',
    alt: 'Pistachio gelato with crushed Sicilian pistachios',
    credit: 'La Piccola Gelateria', creditUrl: '/', ratio: 1,
  },
  flavourStracciatella: {
    id: '/brand/website/photography/flavours/stracciatella.webp',
    alt: 'Creamy stracciatella gelato with dark chocolate pieces',
    credit: 'La Piccola Gelateria', creditUrl: '/', ratio: 1,
  },
  flavourFragola: {
    id: '/brand/website/photography/flavours/fragola.webp',
    alt: 'Strawberry gelato with fresh ripe strawberries',
    credit: 'La Piccola Gelateria', creditUrl: '/', ratio: 1,
  },
  flavourLampone: {
    id: '/brand/website/photography/flavours/lampone.webp',
    alt: 'Raspberry gelato with fresh raspberries', credit: 'La Piccola Gelateria', creditUrl: '/', ratio: 1,
  },
  flavourMango: {
    id: '/brand/website/photography/flavours/mango.webp',
    alt: 'Mango gelato with pieces of ripe mango', credit: 'La Piccola Gelateria', creditUrl: '/', ratio: 1,
  },
  flavourNocciola: {
    id: '/brand/website/photography/flavours/nocciola.webp',
    alt: 'Hazelnut gelato topped with toasted Piedmont hazelnuts', credit: 'La Piccola Gelateria', creditUrl: '/', ratio: 1,
  },
  flavourChocolate: {
    id: '/brand/website/photography/flavours/cioccolato-fondente.webp',
    alt: 'Dark chocolate gelato with curls of bittersweet chocolate',
    credit: 'La Piccola Gelateria', creditUrl: '/', ratio: 1,
  },
  flavourFiorDiLatte: {
    id: '/brand/website/photography/flavours/vaniglia.webp',
    alt: 'Fior di latte gelato, smooth and simply finished',
    credit: 'La Piccola Gelateria', creditUrl: '/', ratio: 1,
  },
  flavourVaniglia: {
    id: '/brand/website/photography/flavours/vaniglia.webp',
    alt: 'Vanilla gelato with vanilla bean and a smooth, creamy finish', credit: 'La Piccola Gelateria', creditUrl: '/', ratio: 1,
  },
  cone: {
    id: '1715194803865-54f4358f87ef',
    alt: 'A hand holding a gelato cone on a sunlit street',
    credit: 'Alexandra Tran',
    creditUrl: u('alexgoesglobal'),
    ratio: 3653 / 5480,
    focus: '50% 35%',
  },
  coneChocolate: {
    id: '1638176474160-10b700d32f25',
    alt: 'A chocolate and vanilla gelato cone held outdoors',
    credit: 'Dimitar Krastev',
    creditUrl: u('longlitsense'),
    ratio: 2818 / 4226,
    focus: '50% 30%',
  },
  gelatoBowl: {
    id: '1603736029103-dafad0eb0906',
    alt: 'Pale green gelato in a clear glass bowl',
    credit: 'Jason Richard',
    creditUrl: u('jasonthedesigner'),
    ratio: 4928 / 3285,
  },
  fiveBowls: {
    id: '1629385744299-74b9cf013f52',
    alt: 'Five small bowls of gelato scoops in a row',
    credit: 'Courtney Cook',
    creditUrl: u('courtneymcook'),
    ratio: 6000 / 4000,
  },
  display: {
    id: '1760308798378-d1a2e29ce54f',
    alt: 'Tubs of gelato in a glass display counter',
    credit: 'Haberdoedas',
    creditUrl: u('haberdoedas'),
    ratio: 6552 / 8736,
    focus: '50% 40%',
  },
  displayCounter: {
    id: '1648971413826-8377e3c65039',
    alt: 'A gelato display case filled with different flavours',
    credit: 'hai_gea',
    creditUrl: u('hai_gea'),
    ratio: 2268 / 3018,
  },
  cart: {
    id: '1636618322871-ac29cb96857b',
    alt: 'A small gelato cart on the side of a road',
    credit: 'Reka Fabian',
    creditUrl: u('rekakovacsfabian'),
    ratio: 2600 / 3469,
  },
  outside: {
    id: '1631970283920-5f53e4f2b0fa',
    alt: 'People sitting outside a small shop in the sun',
    credit: 'Lawrence Chismorie',
    creditUrl: u('lawrnsky'),
    ratio: 3047 / 2043,
  },
  lemonsLeaves: {
    id: '1608165132738-650658dad63c',
    alt: 'Amalfi lemons hanging among glossy green leaves',
    credit: 'Rebecca McKenna',
    creditUrl: u('reebs16'),
    ratio: 3240 / 4320,
  },
  lemonTree: {
    id: '1763066696319-d1093663bbd2',
    alt: 'Lemons growing on a tree',
    credit: 'Moritz Mentges',
    creditUrl: u('movisuals'),
    ratio: 3839 / 5751,
  },
  lemonGrove: {
    id: '1721398042102-c244538673ca',
    alt: 'A lemon tree heavy with yellow fruit',
    credit: 'Maria Gavrilova',
    creditUrl: u('mashyllya'),
    ratio: 2574 / 3218,
  },
  lemonSign: {
    id: '1786275996807-1d0a685dc049',
    alt: 'A wicker basket of lemons beside a sorbetto sign',
    credit: 'Michaela Böhm',
    creditUrl: u('michaelarimakova'),
    ratio: 3024 / 4032,
  },
  lemonSorbet: {
    id: '1749542120098-dbb1f36e1577',
    alt: 'Lemon sorbet served in a hollowed lemon',
    credit: 'Nenad Kaevik',
    creditUrl: u('nenadkaevik'),
    ratio: 4672 / 7008,
  },
  strawberryFig: {
    id: '1452804882841-573355623310',
    alt: 'Strawberries and figs on display at a market',
    credit: 'Bodie Pyndus',
    creditUrl: u('bpyndus'),
    ratio: 3264 / 2176,
  },
  strawberries: {
    id: '1652448919151-c8be3cfb185b',
    alt: 'A pile of ripe strawberries',
    credit: 'Adi Ulici',
    creditUrl: u('adiulici'),
    ratio: 2979 / 2979,
  },
  positano: {
    id: '1725396956222-9bd39d323e8b',
    alt: 'Pastel buildings stepping down to the sea on the Amalfi Coast',
    credit: 'Oliver Sherwin',
    creditUrl: u('sherwinphotography'),
    ratio: 3649 / 5444,
  },
  coast: {
    id: '1598972981358-8facd0e9e256',
    alt: 'The Amalfi Coast waterfront beneath the mountains',
    credit: 'Ryan Ancill',
    creditUrl: u('ryanancill'),
    ratio: 6000 / 4000,
  },
  beach: {
    id: '1723380775952-28ea1a7a330a',
    alt: 'Umbrellas on the beach at Amalfi in summer',
    credit: 'Maria Gavrilova',
    creditUrl: u('mashyllya'),
    ratio: 3024 / 4032,
  },
  stairs: {
    id: '1662232506939-534aa02a5fb6',
    alt: 'A stone staircase between whitewashed walls and plants',
    credit: 'Line Kjær',
    creditUrl: u('linekjaer'),
    ratio: 4160 / 6240,
  },
  street: {
    id: '1630053558099-770ca62dc1eb',
    alt: 'People walking along a sunlit Amalfi Coast street',
    credit: 'Georgi Kalaydzhiev',
    creditUrl: u('jorok'),
    ratio: 4078 / 5097,
  },
  ravello: {
    id: '1694335074154-2207527b7c50',
    alt: 'A narrow cobblestone street in Ravello',
    credit: 'Tulin Yucel',
    creditUrl: u('yuceltulin'),
    ratio: 2941 / 3675,
  },
  ceramics: {
    id: '1666345711127-a744ba545934',
    alt: 'Blue and yellow ceramics on a ledge above the Mediterranean',
    credit: 'Renzo Vanden Bussche',
    creditUrl: u('renzo_vb'),
    ratio: 4344 / 5792,
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;

/** Remote Unsplash image URL or the local file path. */
export function photoUrl(id: string, width: number, ratio?: number): string {
  if (id.startsWith('/')) return id;
  const h = ratio ? `&h=${Math.round(width / ratio)}` : '';
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=entropy&w=${width}${h}&q=72`;
}
