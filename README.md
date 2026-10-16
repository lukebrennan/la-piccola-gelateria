# La Piccola Gelateria

A web design and development portfolio project: the website for a fictional artisan gelateria on the Amalfi Coast.

Built with Angular 22 (standalone components, signals, SCSS), prerendered to static HTML so it can be hosted free on GitHub Pages. The Firebase ordering flow and the private owner dashboard are the next phase.

## Run it

```bash
npm install
npm start            # dev server at http://localhost:4200
npm run build:pages  # production build + prerender into dist/la-piccola-gelateria/browser
```

## What is in the site

| Route | Page |
|---|---|
| `/` | Home: hero, flavours, Amalfi lemon story, our story, ingredients, visit, gallery, journal |
| `/gelato` | Interactive menu: filter by Classici, Frutta, Specialità, Senza Latte, or "on the counter today" (shareable via `?cat=` and `?today=1`) |
| `/our-story` `/ingredients` `/visit-amalfi` | Story, sourcing, hours, map and directions |
| `/journal` `/journal/:slug` | SEO article archive and reusable article template |
| `/credits` | Photo and font credits |

Every page sets its own title, description, canonical URL, Open Graph tags and JSON-LD (LocalBusiness / IceCreamShop, BreadcrumbList, FAQPage, Article).

## Where things live

- `src/app/core/site.ts`: business facts (address, hours, contact), navigation. Edit here first.
- `src/app/core/photos.ts`: photography catalogue (Unsplash ids, alt text, credits). Swap an `id` for a real photo later.
- `src/app/data/`: flavours, ingredients, journal articles.
- `src/styles.scss`: design tokens, type, buttons and shared primitives.
- `public/brand/`: logos, icons and ceramic artwork from the brand kit. `design-assets/` holds unused product mockups.
- `PRODUCT.md` and `.impeccable/`: product context and design notes.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch.
2. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push. `.github/workflows/deploy.yml` builds with the right base path (`/<repo-name>/`) and publishes.
4. Set `url` in `src/app/core/site.ts` to the live address (for example `https://<username>.github.io/<repo-name>`), so canonical URLs and structured data are correct.

### Adding the custom domain later

1. In **Settings → Pages**, enter the domain, and add the DNS records GitHub lists.
2. In **Settings → Secrets and variables → Actions → Variables**, add `BASE_HREF` = `/` and `CUSTOM_DOMAIN` = your domain.
3. Change `url` in `src/app/core/site.ts` to `https://your-domain` and push.

## Notes

- The business, address, phone, email and Instagram handle are fictional placeholders.
- Photography is hotlinked from the Unsplash CDN. All photographers are credited on `/credits`.
- The map is click-to-load (OpenStreetMap) so no third-party requests happen until a visitor asks.
