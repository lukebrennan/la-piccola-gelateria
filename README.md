# La Piccola Gelateria

A web design and development portfolio project: the website for a fictional artisan gelateria on the Amalfi Coast.

Built with Angular 22 (standalone components, signals, SCSS), prerendered to static HTML and hosted on GitHub Pages at [lapiccolagelateria.com](https://lapiccolagelateria.com/). The design follows the supplied Amalfi Coast mockup: cream paper, navy typography, lemon illustrations and blue-and-yellow ceramic details. No online ordering is planned.

## Run it

```bash
npm ci
npm start            # dev server at http://localhost:4200
BASE_HREF=/ CUSTOM_DOMAIN=lapiccolagelateria.com npm run build:pages
# production output: dist/la-piccola-gelateria/browser
```

## What is in the site

| Route | Page |
|---|---|
| `/` | Amalfi terrace hero, four illustrated values, and an editorial gelato and ingredient feature |
| `/gelato` | Interactive menu: filter by Classici, Frutta, Specialità, Senza Latte, or "on the counter today" (shareable via `?cat=` and `?today=1`) |
| `/our-story` `/ingredients` `/visit-amalfi` | Story, sourcing, hours, map and directions |
| `/journal` `/journal/:slug` | SEO article archive and reusable article template |

Every page sets its own title, description, canonical URL, Open Graph tags and JSON-LD (LocalBusiness / IceCreamShop, BreadcrumbList, FAQPage, Article).

## Where things live

- `src/app/core/site.ts`: business facts (address, hours, contact), navigation. Edit here first.
- `src/app/core/photos.ts`: photography catalogue (local brand images, Unsplash ids, alt text and credits).
- `src/app/data/`: flavours, ingredients, journal articles.
- `src/styles.scss`: design tokens, type, buttons and shared primitives.
- `public/brand/website/`: optimized WebP photography, transparent illustrations, frames, ceramic borders and font licences used by this design.
- `src/assets/fonts/`: self-hosted Cormorant Garamond, Montserrat and Oooh Baby fonts.
- `src/app/shared/brand-mark.ts`: shared wordmark used in the navigation and footer.
- `DESIGN.md` and `docs/design-reference.png`: current design direction and supplied visual reference. `PRODUCT.md` contains the original portfolio project context.

## Deploy to GitHub Pages

The existing repository is `lukebrennan/la-piccola-gelateria`. A push to `main` runs `.github/workflows/deploy.yml`, builds the static pages, and publishes them through GitHub Actions. GitHub Pages already has the custom domain and enforced HTTPS configured.

### Current custom domain configuration

- Pages domain: `lapiccolagelateria.com`.
- Actions repository variables: `BASE_HREF=/` and `CUSTOM_DOMAIN=lapiccolagelateria.com`.
- Canonical site URL in `src/app/core/site.ts`: `https://lapiccolagelateria.com`.
- `scripts/postbuild.mjs` writes `CNAME`, `.nojekyll` and the static `404.html` into the deployment output.

Keep the existing domain and DNS configuration when publishing design updates.

## Notes

- The business, address, phone, email and Instagram handle are fictional placeholders.
- The hero, flavour photography and hand-painted brand artwork were created with AI image generation and are served locally as optimized WebP files. Additional editorial photographs use the Unsplash CDN; source attribution is retained in `src/app/core/photos.ts`.
- The map is click-to-load (OpenStreetMap) so no third-party requests happen until a visitor asks.
