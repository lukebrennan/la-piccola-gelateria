# La Piccola Gelateria — design direction

The user-supplied reference in `docs/design-reference.png` is the visual basis for this redesign. The approved spelling is **La Piccola Gelateria**. Keep the existing repository, routes and domain while rebuilding the visual experience.

## Homepage composition

1. A shallow cream navigation bar, fine ceramic corner flourishes and a central hanging lemon wordmark. Links split to either side.
2. A full-width Amalfi terrace photograph. The wall has no writing. Editorial navy heading on the open right side, one fine pill button.
3. Four transparent arched frames: small batch, Italian inspired, real ingredients, a sweeter community. Delicate watercolour artwork, serif labels and italic copy.
4. A tightly composed three-column gelato section: tall cone photograph on the left, centred editorial copy and a lemon drawing in the middle, three stacked ingredient/flavour notes on the right.
5. A narrow repeating maiolica rule and compact blue footer, with the wordmark in the centre and links either side.

The homepage ends there. Keep its concise composition; additional stories, menu details, sourcing and visiting information belong on their own routes.

## Visual language

- Navy `#0D2E57`, footer blue `#1C4B79`, cream `#FBF6E9`, lemon `#EFC342`, olive `#577A50`.
- Cormorant Garamond for editorial headings and prose; Montserrat for small tracked navigation and labels; Oooh Baby for handwritten flavour names.
- Fine one-pixel lines and restrained pill buttons. Warm, very subtle paper grain. Watercolour illustration is the primary decorative language.
- Keep photos large and composed. Avoid prominent plaster texture, visible blue tile grids as backgrounds, oversized buttons, thick outlined plates, scattered rotated tiles, and long repeated promotional sections.
- Inner pages use the same centred lemon heading, fine rules, serif prose, and quieter photo compositions.

## Assets and behaviour

Website-ready files are in `public/brand/website`. The original high-resolution PNG brand kit is a sibling workspace deliverable. Keep generated illustrations transparent. The hero and cone photograph are local assets; some secondary editorial photography remains credited to Unsplash.

On phones, the hero photograph and copy stack, frames form two columns, and flavour notes stack below the cone and editorial copy. Navigation becomes an accessible menu with Escape dismissal and focus containment. Maintain the existing menu filters, dietary information, fragment links and visiting details.

This is a fictional portfolio business. Preserve that disclosure and the central business data in `src/app/core/site.ts`; do not invent real contact details or social accounts.

## Desktop polish decisions

Online ordering is not planned. The small header cone links to the flavour menu; do not introduce shopping bags, carts or checkout language. Navigation and button labels use comfortable sizes and restrained tracking. Keep the footer compact and its small print legible. Frame illustrations have dedicated optical-size slots, with aligned text; vary lemon artwork between cards and editorial details.
