import { RenderMode, ServerRoute } from '@angular/ssr';
import { ARTICLES } from './data/journal';

/** Every route is prerendered to static HTML so search engines and GitHub Pages get real pages. */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'journal/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => ARTICLES.map((a) => ({ slug: a.slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
