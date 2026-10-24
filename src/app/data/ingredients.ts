import { PhotoKey } from '../core/photos';

export interface Ingredient {
  slug: string;
  name: string;
  short: string;
  /** Longer, sourcing-focused copy for the Ingredients page. */
  story: string;
  origin: string;
  photo?: PhotoKey;
  tile: 'lemon' | 'flower' | 'diamond' | 'sun';
  used: string[];
}

export const INGREDIENTS: Ingredient[] = [
  {
    slug: 'amalfi-lemons',
    name: 'Amalfi lemons',
    short: 'Big, fragrant Sfusato lemons from the terraces above town.',
    story:
      'The Sfusato Amalfitano is long, thick-skinned and wonderfully aromatic. Families have grown it on the steep terraces above the sea for generations, under chestnut-pole pergolas that shade the fruit. We use the zest and the juice, which is why our sorbet smells like the grove before it tastes like anything.',
    origin: 'Terraced groves above Amalfi',
    photo: 'ingredientLemons',
    tile: 'lemon',
    used: ['Limone di Amalfi', 'Delizia al Limone', 'Crema Amalfitana'],
  },
  {
    slug: 'sicilian-pistachios',
    name: 'Sicilian pistachios',
    short: 'Stone-ground from Bronte, with nothing green added.',
    story:
      'Real pistachio gelato is a dull, sandy green, and that is how you know. We buy shelled pistachios from the volcanic slopes around Bronte, toast them lightly and grind them to a paste in house. Nothing else goes in the tub but milk, sugar and a pinch of salt.',
    origin: 'Bronte, Sicily',
    photo: 'ingredientPistachios',
    tile: 'diamond',
    used: ['Pistacchio'],
  },
  {
    slug: 'italian-milk',
    name: 'Italian milk',
    short: 'Fresh whole milk from Campanian farms, delivered each morning.',
    story:
      'Gelato lives or dies on its milk. Ours comes from small farms in Campania and arrives every morning, so the base can be pasteurised and left to rest before the first batch is churned. Good milk tastes slightly sweet on its own, so we add very little sugar.',
    origin: 'Campania',
    tile: 'flower',
    used: ['Fior di Latte', 'Stracciatella', 'Vaniglia Bourbon'],
  },
  {
    slug: 'seasonal-fruit',
    name: 'Seasonal fruit',
    short: 'Strawberries, peaches and blood oranges, only when they are at their best.',
    story:
      'We make fruit flavours when the fruit is ripe and put them away when it is not. Strawberries from spring, white peaches through the summer, blood oranges in the cooler months. If it is not on the counter, it is not good right now, and we would rather tell you so.',
    origin: 'Local orchards and markets',
    photo: 'ingredientStrawberries',
    tile: 'sun',
    used: ['Fragola', 'Pesca Bianca', 'Arancia Rossa'],
  },
  {
    slug: 'dark-chocolate',
    name: 'Dark chocolate',
    short: 'Italian dark chocolate, made with water so it stays pure.',
    story:
      'Our fondente is made with water instead of milk, which lets the chocolate speak without anything to soften it. It is dark, a little bitter and unexpectedly clean. It is also dairy-free, which is a happy accident that a lot of our guests appreciate.',
    origin: 'Italy',
    tile: 'diamond',
    used: ['Cioccolato Fondente', 'Stracciatella'],
  },
  {
    slug: 'fresh-cream',
    name: 'Fresh cream',
    short: 'Just enough to make it silky, never enough to make it heavy.',
    story:
      'Gelato carries less fat than ice cream, so the cream we use has to count. A measured amount gives the texture its silk, and the slow churn keeps the air out. That is why a small scoop feels generous.',
    origin: 'Campania',
    tile: 'flower',
    used: ['Fior di Latte', 'Nocciola', 'Tiramisù'],
  },
];
