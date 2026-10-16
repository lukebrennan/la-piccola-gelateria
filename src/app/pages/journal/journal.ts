import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';
import { PHOTOS } from '../../core/photos';
import { Reveal } from '../../core/reveal';
import { PhotoComponent } from '../../shared/photo';
import { PageHead } from '../../shared/page-head';
import { ARTICLES } from '../../data/journal';

@Component({
  selector: 'lp-journal',
  imports: [RouterLink, PhotoComponent, PageHead, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './journal.html',
  styleUrl: './journal.scss',
})
export class Journal {
  protected readonly photos = PHOTOS;
  protected readonly lead = ARTICLES[0];
  protected readonly rest = ARTICLES.slice(1);

  constructor() {
    inject(Seo).set({
      title: 'The Journal: Gelato & Coast Life',
      description:
        'Stories from the counter: why Amalfi lemons are special, gelato versus ice cream, the flavours of the coast and a food lover’s guide to Amalfi.',
      path: '/journal',
      crumbs: [{ name: 'Journal', path: '/journal' }],
    });
  }

  protected date(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
