import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';
import { SITE } from '../../core/site';
import { PHOTOS, photoUrl } from '../../core/photos';
import { openStatus } from '../../core/open-status';
import { Reveal } from '../../core/reveal';
import { PhotoComponent } from '../../shared/photo';
import { MapEmbed } from '../../shared/map';
import { Hours } from '../../shared/hours';
import { IconComponent } from '../../shared/icon';
import { FLAVOURS } from '../../data/flavours';
import { INGREDIENTS } from '../../data/ingredients';
import { ARTICLES } from '../../data/journal';
import { IconName } from '../../data/flavours';

const FEATURED = [
  'limone-di-amalfi',
  'pistacchio',
  'stracciatella',
  'fragola',
  'cioccolato-fondente',
  'fior-di-latte',
];

const INGREDIENT_ICON: Record<string, IconName> = {
  'amalfi-lemons': 'lemon',
  'sicilian-pistachios': 'leaf',
  'italian-milk': 'cup',
  'seasonal-fruit': 'sun',
  'dark-chocolate': 'cone',
  'fresh-cream': 'flower',
};

@Component({
  selector: 'lp-home',
  imports: [RouterLink, PhotoComponent, IconComponent, MapEmbed, Hours, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly site = SITE;
  protected readonly photos = PHOTOS;
  protected readonly ingredients = INGREDIENTS;
  protected readonly ingredientIcon = INGREDIENT_ICON;
  protected readonly featured = FEATURED.map((s) => FLAVOURS.find((f) => f.slug === s)!);
  protected readonly articles = ARTICLES.slice(0, 3);

  private readonly seo = inject(Seo);
  private readonly platform = inject(PLATFORM_ID);

  /** Live open/closed state, set once in the browser so prerendered HTML stays neutral. */
  protected readonly open = signal<boolean | null>(null);
  protected readonly statusLabel = computed(() => {
    const o = this.open();
    return o === null ? 'Open every day until midnight' : o ? 'Open now, until midnight' : 'Opens today at 10:00';
  });

  protected readonly activeIngredient = signal(0);
  protected readonly activeIng = computed(() => this.ingredients[this.activeIngredient()]);

  constructor() {
    this.seo.set({
      title: 'La Piccola Gelateria | Artisan Gelato in Amalfi',
      raw: true,
      description:
        'Artisan gelato made fresh every morning in the heart of Amalfi. Amalfi lemon sorbet, Sicilian pistachio and seasonal flavours. Open every day until midnight.',
      path: '/',
      image: photoUrl(PHOTOS.cone.id, 1200, 1200 / 630),
      jsonLd: [this.seo.localBusiness()],
    });

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platform)) return;
      const s = openStatus();
      this.open.set(s.open);
    });
  }

  protected setIngredient(i: number): void {
    this.activeIngredient.set(i);
  }

  protected route(slug: string): string {
    return `/journal/${slug}`;
  }

  protected dateLabel(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
