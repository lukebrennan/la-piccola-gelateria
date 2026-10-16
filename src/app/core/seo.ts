import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE } from './site';
import { PHOTOS, photoUrl } from './photos';

export interface SeoConfig {
  /** Page title without the brand suffix. Pass `raw` to skip the suffix. */
  title: string;
  raw?: boolean;
  description: string;
  /** Route path starting with a slash, e.g. "/gelato". */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  /** Extra JSON-LD nodes for this page. */
  jsonLd?: object[];
  /** Breadcrumb trail after Home. */
  crumbs?: { name: string; path: string }[];
  publishedTime?: string;
}

@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  /** Absolute URL for a route. Pages end with a trailing slash to match the static output. */
  url(path: string): string {
    const clean = path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;
    return `${SITE.url}${clean}`;
  }

  set(cfg: SeoConfig): void {
    const full = cfg.raw ? cfg.title : `${cfg.title} | ${SITE.name}`;
    const url = this.url(cfg.path);
    const image = cfg.image ?? photoUrl(PHOTOS.cone.id, 1200, 1200 / 630);

    this.title.setTitle(full);
    this.meta.updateTag({ name: 'description', content: cfg.description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large' });

    this.meta.updateTag({ property: 'og:site_name', content: SITE.name });
    this.meta.updateTag({ property: 'og:locale', content: 'en_GB' });
    this.meta.updateTag({ property: 'og:type', content: cfg.type ?? 'website' });
    this.meta.updateTag({ property: 'og:title', content: full });
    this.meta.updateTag({ property: 'og:description', content: cfg.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: full });
    this.meta.updateTag({ name: 'twitter:description', content: cfg.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    if (cfg.publishedTime) {
      this.meta.updateTag({ property: 'article:published_time', content: cfg.publishedTime });
    } else {
      this.meta.removeTag("property='article:published_time'");
    }

    this.canonical(url);

    const graph: object[] = [...(cfg.jsonLd ?? [])];
    if (cfg.crumbs?.length) graph.push(this.breadcrumbs(cfg.crumbs));
    this.jsonLd(graph);
  }

  private canonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private jsonLd(nodes: object[]): void {
    const id = 'lp-jsonld';
    this.doc.getElementById(id)?.remove();
    if (!nodes.length) return;
    const el = this.doc.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    el.text = JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
    this.doc.head.appendChild(el);
  }

  private breadcrumbs(crumbs: { name: string; path: string }[]): object {
    const items = [{ name: 'Home', path: '/' }, ...crumbs];
    return {
      '@type': 'BreadcrumbList',
      itemListElement: items.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: this.url(c.path),
      })),
    };
  }

  /** LocalBusiness node, reused on the home and visit pages. */
  localBusiness(): object {
    const a = SITE.address;
    return {
      '@type': ['IceCreamShop', 'FoodEstablishment', 'LocalBusiness'],
      '@id': `${SITE.url}/#business`,
      name: SITE.name,
      description:
        'Artisan gelato made fresh every morning in the heart of Amalfi, with Amalfi lemons, Sicilian pistachios and seasonal fruit.',
      url: this.url('/'),
      telephone: SITE.phone,
      email: SITE.email,
      image: photoUrl(PHOTOS.cone.id, 1200, 4 / 3),
      servesCuisine: ['Gelato', 'Italian'],
      priceRange: '€',
      address: {
        '@type': 'PostalAddress',
        streetAddress: a.street,
        addressLocality: a.city,
        addressRegion: a.region,
        postalCode: a.postcode,
        addressCountry: a.countryCode,
      },
      geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '10:00',
          closes: '23:59',
        },
      ],
      hasMap: SITE.directionsUrl,
      sameAs: [SITE.instagramUrl],
    };
  }
}
