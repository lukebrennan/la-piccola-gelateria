import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Seo } from '../../core/seo';
import { PHOTOS } from '../../core/photos';
import { PageHead } from '../../shared/page-head';

@Component({
  selector: 'lp-credits',
  imports: [PageHead],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lp-page-head [crumbs]="[{ name: 'Credits' }]">
      <h1>Photo credits</h1>
      <p class="lede">
        La Piccola Gelateria is a fictional business, created as a web design and development
        portfolio project. Its imagery comes from the photographers below, shared freely on Unsplash.
      </p>
    </lp-page-head>

    <section class="section">
      <div class="container container--narrow">
        <ul class="list">
          @for (c of credits; track c.credit) {
            <li>
              <a class="link" [href]="c.creditUrl" target="_blank" rel="noopener">{{ c.credit }}</a>
              <span>on Unsplash</span>
            </li>
          }
        </ul>
        <p class="note">
          Typefaces: Bodoni Moda and DM Sans, both under the SIL Open Font Licence. Brand artwork:
          the La Piccola Gelateria brand kit.
        </p>
      </div>
    </section>
  `,
  styles: [
    `
      .list {
        columns: 2 16rem;
        column-gap: 3rem;
      }
      .list li {
        display: flex;
        gap: 0.5rem;
        padding: 0.55rem 0;
        border-bottom: 1px solid var(--line);
        break-inside: avoid;
        color: var(--ink-faint);
        font-size: var(--step--1);
      }
      .note {
        margin-top: 2.5rem;
        color: var(--ink-soft);
      }
    `,
  ],
})
export class Credits {
  protected readonly credits = Array.from(
    new Map(Object.values(PHOTOS).map((p) => [p.credit, p])).values(),
  ).sort((a, b) => a.credit.localeCompare(b.credit));

  constructor() {
    inject(Seo).set({
      title: 'Photo Credits',
      description: 'Credits for the photography and typefaces used on this site.',
      path: '/credits',
    });
  }
}
