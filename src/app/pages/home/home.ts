import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';
import { SITE } from '../../core/site';

@Component({
  selector: 'lp-home',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly seo = inject(Seo);

  constructor() {
    this.seo.set({
      title: 'La Piccola Gelateria | A little taste of la dolce vita',
      raw: true,
      description: 'Small-batch Italian gelato, sun-ripened ingredients and a little Amalfi sunshine. Discover La Piccola Gelateria.',
      path: '/',
      image: SITE.url + '/brand/website/photography/hero-amalfi-coast.webp',
      jsonLd: [this.seo.localBusiness()],
    });
  }
}
