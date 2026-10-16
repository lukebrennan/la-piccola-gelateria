import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';

@Component({
  selector: 'lp-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="nf">
      <div class="container nf__inner">
        <img src="art/tile-lemons.webp" alt="" width="132" height="132" />
        <h1>Page not found</h1>
        <p class="lede">
          We could not find what you were looking for. The gelato, at least, is exactly where we left
          it.
        </p>
        <div class="nf__actions">
          <a class="btn" routerLink="/">Back to the home page</a>
          <a class="btn btn--ghost" routerLink="/gelato">See Our Gelato</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .nf {
        padding-block: clamp(4rem, 3rem + 7vw, 9rem);
      }
      .nf__inner {
        display: grid;
        justify-items: center;
        gap: 1.5rem;
        text-align: center;
      }
      img {
        height: auto;
        transform: rotate(-8deg);
      }
      .nf__actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem;
      }
    `,
  ],
})
export class NotFound {
  constructor() {
    inject(Seo).set({
      title: 'Page not found',
      description: 'That page could not be found.',
      path: '/404',
    });
  }
}
