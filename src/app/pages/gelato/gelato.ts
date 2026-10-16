import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';
import { PHOTOS } from '../../core/photos';
import { PhotoComponent } from '../../shared/photo';
import { IconComponent } from '../../shared/icon';
import { PageHead } from '../../shared/page-head';
import {
  CATEGORIES,
  CATEGORY_NOTES,
  FLAVOURS,
  Flavour,
  flavoursForDay,
  inSeason,
} from '../../data/flavours';

type Filter = (typeof CATEGORIES)[number];

@Component({
  selector: 'lp-gelato',
  imports: [RouterLink, PhotoComponent, IconComponent, PageHead],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gelato.html',
  styleUrl: './gelato.scss',
})
export class Gelato {
  protected readonly photos = PHOTOS;
  protected readonly categories = CATEGORIES;
  protected readonly notes = CATEGORY_NOTES;

  /** Bound from the query string: /gelato?cat=Frutta&today=1 */
  readonly cat = input<string>();
  readonly today = input<string>();

  private readonly router = inject(Router);
  private readonly platform = inject(PLATFORM_ID);

  protected readonly filter = signal<Filter>('All');
  protected readonly onlyToday = signal(false);
  /** Today's counter, computed in the browser so the prerendered page stays date-neutral. */
  protected readonly todaySlugs = signal<Set<string> | null>(null);

  protected readonly visible = computed<Flavour[]>(() => {
    const f = this.filter();
    const today = this.onlyToday() ? this.todaySlugs() : null;
    return FLAVOURS.filter((x) => {
      if (today && !today.has(x.slug)) return false;
      if (f === 'All') return true;
      if (f === 'Senza Latte') return x.diet.includes('Milk-free');
      return x.category === f;
    });
  });

  protected readonly count = computed(() => this.visible().length);

  constructor() {
    inject(Seo).set({
      title: 'Gelato in Amalfi: Flavours & Menu',
      description:
        'The full La Piccola Gelateria menu: classic gelato, fruit sorbetti, house specialities and milk-free flavours, made fresh every morning in Amalfi.',
      path: '/gelato',
      crumbs: [{ name: 'Our Gelato', path: '/gelato' }],
    });

    effect(() => {
      const c = this.cat();
      this.filter.set(c && (CATEGORIES as string[]).includes(c) ? (c as Filter) : 'All');
      this.onlyToday.set(this.today() === '1');
    });

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platform)) return;
      this.todaySlugs.set(new Set(flavoursForDay(new Date()).map((f) => f.slug)));
    });
  }

  protected setFilter(f: Filter): void {
    this.filter.set(f);
    this.syncUrl();
  }

  protected toggleToday(): void {
    this.onlyToday.update((v) => !v);
    this.syncUrl();
  }

  protected isToday(f: Flavour): boolean {
    return this.todaySlugs()?.has(f.slug) ?? false;
  }

  protected seasonal(f: Flavour): boolean {
    return !!f.months && inSeason(f, new Date().getMonth() + 1);
  }

  private syncUrl(): void {
    this.router.navigate([], {
      queryParams: {
        cat: this.filter() === 'All' ? null : this.filter(),
        today: this.onlyToday() ? 1 : null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
      preserveFragment: false,
    });
  }
}
