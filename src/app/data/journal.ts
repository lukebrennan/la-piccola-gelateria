import { PhotoKey } from '../core/photos';

export interface Block {
  h2?: string;
  p: string[];
}

export interface Article {
  slug: string;
  title: string;
  /** Meta description and card summary. */
  summary: string;
  /** ISO date. */
  date: string;
  minutes: number;
  photo: PhotoKey;
  body: Block[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'amalfi-lemons',
    title: 'What Makes Amalfi Lemons So Special?',
    summary:
      'Large, fragrant and grown on terraces above the sea, Amalfi lemons are the heart of our sorbet. Here is why they taste the way they do.',
    date: '2026-09-18',
    minutes: 4,
    photo: 'lemonTree',
    body: [
      {
        p: [
          'Walk up any stairway in Amalfi in early summer and the air smells of lemon. It is not a trick of the tourist board. The lemons here are different, and once you have tasted them you start to notice them everywhere.',
        ],
      },
      {
        h2: 'A lemon with a long name',
        p: [
          'The variety is called Sfusato Amalfitano. Sfusato means spindle-shaped, and the fruit is long and tapered, often larger than a fist. The skin is thick and knobbly, the pith is mild rather than bitter, and the zest is full of fragrant oil.',
        ],
      },
      {
        h2: 'Grown on terraces',
        p: [
          'The groves cling to terraces cut into the cliffs, held up by dry-stone walls and shaded by chestnut-pole pergolas. Much of the harvest is still done by hand, because there is simply no other way to reach the trees. Sea air and steep sun do the rest.',
        ],
      },
      {
        h2: 'Why it makes a better sorbet',
        p: [
          'Gelato makers love a lemon that is aromatic first and sharp second. Because the Amalfi lemon is not harsh, we can use the zest as well as the juice, and the sorbet tastes of the whole fruit. We keep it simple: lemon, sugar and water, churned until it is cold and soft.',
          'If you only try one thing at La Piccola Gelateria, make it the Limone di Amalfi.',
        ],
      },
    ],
  },
  {
    slug: 'gelato-vs-ice-cream',
    title: "Gelato vs Ice Cream: What's the Difference?",
    summary:
      'Less fat, less air and a warmer serving temperature. A plain-spoken guide to what actually separates gelato from ice cream.',
    date: '2026-08-27',
    minutes: 4,
    photo: 'fiveBowls',
    body: [
      {
        p: [
          'They look similar and they sit in the same part of the freezer aisle in your head, but gelato and ice cream are made differently, and you can taste it.',
        ],
      },
      {
        h2: 'Less fat',
        p: [
          'Ice cream leans on cream and egg yolks, so it usually carries a lot more butterfat. Gelato uses more milk and less cream, which means the flavour is not coated by fat. Pistachio tastes more like pistachio.',
        ],
      },
      {
        h2: 'Less air',
        p: [
          'Ice cream is churned fast and takes in a lot of air, which makes it light and fluffy. Gelato is churned slowly. It contains much less air, so it is denser, silkier and more intense. That is why a small scoop of gelato feels like enough.',
        ],
      },
      {
        h2: 'Served a little warmer',
        p: [
          'Gelato is kept and served at a slightly higher temperature than ice cream. Colder food numbs your taste buds, so a warmer scoop gives you more flavour and a softer texture that is ready to eat straight away.',
        ],
      },
      {
        h2: 'So which is better?',
        p: [
          'Neither, honestly. But if you want to taste what the ingredients actually are, gelato makes the case very well.',
        ],
      },
    ],
  },
  {
    slug: 'flavours-of-amalfi-coast',
    title: 'The Flavours of the Amalfi Coast',
    summary:
      'Lemon, figs, nuts and sweet pastry: the tastes that define the coast, and where you will find them in our gelato.',
    date: '2026-07-30',
    minutes: 5,
    photo: 'ceramics',
    body: [
      {
        p: [
          'The Amalfi Coast has a short list of flavours that it does exceptionally well. Many of them end up in our counter, sometimes as a gelato and sometimes as a quiet inspiration.',
        ],
      },
      {
        h2: 'Lemon, of course',
        p: [
          'Lemon appears in everything here: in limoncello, in pastry, in pasta, in the zest scattered over fish. In gelato it takes the form of a sorbet and of our Delizia al Limone, which borrows from the lemon sponge dome the coast is famous for.',
        ],
      },
      {
        h2: 'Figs and stone fruit',
        p: [
          'As the summer turns, figs arrive heavy and honey-sweet, and the white peaches come off the hills at the same time. We make both when they are ripe and stop when they are not.',
        ],
      },
      {
        h2: 'Nuts and pastry',
        p: [
          'Hazelnuts, almonds and pistachios turn up across southern Italy, and the sfogliatella, a crisp pastry filled with sweet ricotta and orange peel, is a Campanian classic. We turned it into a gelato for the days you want a bakery and a scoop at once.',
        ],
      },
      {
        h2: 'Coffee',
        p: [
          'A good espresso is never more than a few steps away, so there is always a caffè gelato on the counter for the people who cannot choose.',
        ],
      },
    ],
  },
  {
    slug: 'food-lovers-guide-to-amalfi',
    title: "A Food Lover's Guide to Amalfi",
    summary:
      'Where to wander, what to eat and how to spend a slow day in Amalfi, from the Duomo steps to the paper mills.',
    date: '2026-06-12',
    minutes: 6,
    photo: 'positano',
    body: [
      {
        p: [
          'Amalfi is small enough to walk end to end in a few minutes and generous enough to fill a whole day. Here is how we would spend it.',
        ],
      },
      {
        h2: 'Morning: lemons and coffee',
        p: [
          'Start in the main square beneath the Duomo, with a coffee and a lemon pastry at a table in the shade. Climb the cathedral steps before the tour groups arrive.',
        ],
      },
      {
        h2: 'Midday: the valley of the mills',
        p: [
          'Walk uphill through the Valle dei Mulini, where Amalfi once made paper that was traded across the Mediterranean. There is a small museum in an old mill and the stream makes the shade a few degrees cooler.',
        ],
      },
      {
        h2: 'Afternoon: a slow lunch and a swim',
        p: [
          'Fresh anchovies, handmade scialatielli pasta and anything with lemon. Afterwards, find a spot on the rocks or take the short walk to the neighbouring village of Atrani.',
        ],
      },
      {
        h2: 'Evening: the best part',
        p: [
          'Wander the narrow streets as the heat lifts, and finish with a scoop of something cold. We are open until midnight for exactly this reason.',
        ],
      },
    ],
  },
  {
    slug: 'traditional-italian-gelato',
    title: 'What Is Traditional Italian Gelato?',
    summary:
      'A short guide to the craft behind a proper scoop: simple recipes, small batches and the habit of making it fresh every day.',
    date: '2026-05-22',
    minutes: 4,
    photo: 'cart',
    body: [
      {
        p: [
          'Walk into any Italian town and you will find gelaterie. The ones worth queueing for share a few quiet habits, and none of them is a secret.',
        ],
      },
      {
        h2: 'Short ingredient lists',
        p: [
          'A pistachio gelato should be made from pistachios. A strawberry sorbet should be made from strawberries. When the ingredient list is short, the flavour has nowhere to hide.',
        ],
      },
      {
        h2: 'Small batches',
        p: [
          'Gelato is best in the hours after it is made. We churn in small batches through the day rather than a large batch at dawn, so what is on the counter is always fresh.',
        ],
      },
      {
        h2: 'Natural colours',
        p: [
          'Real pistachio is a muted green-brown. Real banana is greyish. Real lemon is a pale cream. If it is neon, it is not natural. If it looks a little plain, that is a good sign.',
        ],
      },
      {
        h2: 'Eaten slowly',
        p: [
          'Gelato is meant to be enjoyed with a spoon or a cone while walking, without hurrying. One more scoop? Sempre.',
        ],
      },
    ],
  },
];

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
