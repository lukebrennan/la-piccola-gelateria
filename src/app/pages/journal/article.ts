import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';
import { PHOTOS, photoUrl } from '../../core/photos';
import { SITE } from '../../core/site';
import { Reveal } from '../../core/reveal';
import { PhotoComponent } from '../../shared/photo';
import { PageHead } from '../../shared/page-head';
import { ARTICLES, articleBySlug } from '../../data/journal';

@Component({
  selector: 'lp-article',
  imports: [RouterLink, PhotoComponent, PageHead, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './article.html',
  styleUrl: './article.scss',
})
export class ArticlePage {
  /** Route param, bound by the router. */
  readonly slug = input.required<string>();

  protected readonly photos = PHOTOS;
  private readonly seo = inject(Seo);

  protected readonly article = computed(() => articleBySlug(this.slug()));
  protected readonly more = computed(() =>
    ARTICLES.filter((a) => a.slug !== this.slug()).slice(0, 2),
  );

  constructor() {
    effect(() => {
      const a = this.article();
      if (!a) {
        this.seo.set({
          title: 'Article not found',
          description: 'That article could not be found.',
          path: `/journal/${this.slug()}`,
        });
        return;
      }
      const path = `/journal/${a.slug}`;
      const image = photoUrl(PHOTOS[a.photo].id, 1200, 1200 / 630);
      this.seo.set({
        title: a.title,
        description: a.summary,
        path,
        image,
        type: 'article',
        publishedTime: a.date,
        crumbs: [
          { name: 'Journal', path: '/journal' },
          { name: a.title, path },
        ],
        jsonLd: [
          {
            '@type': 'Article',
            headline: a.title,
            description: a.summary,
            image: [image],
            datePublished: a.date,
            dateModified: a.date,
            mainEntityOfPage: this.seo.url(path),
            author: { '@type': 'Organization', name: SITE.name },
            publisher: { '@type': 'Organization', name: SITE.name },
          },
        ],
      });
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
