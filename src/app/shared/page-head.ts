import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
export interface Crumb {
  name: string;
  path?: string;
}
@Component({
  selector: 'lp-page-head',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-intro">
      <nav class="crumbs" aria-label="Breadcrumb">
        <ol>
          <li><a routerLink="/">Home</a></li>
          @for (c of crumbs(); track c.name) {
            <li>
              @if (c.path) {
                <a [routerLink]="c.path">{{ c.name }}</a>
              } @else {
                <span aria-current="page">{{ c.name }}</span>
              }
            </li>
          }
        </ol>
      </nav>
      <div class="page-intro__copy"><ng-content /></div>
      <span class="page-intro__flourish" aria-hidden="true">— ✥ —</span>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .page-intro {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: clamp(2rem, 3.2vw, 2.75rem) var(--gutter) clamp(1.5rem, 2.3vw, 2rem);
        text-align: center;
      }
      .crumbs {
        max-width: 54rem;
        margin-bottom: 1rem;
      }
      .crumbs ol {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.35rem 0.6rem;
        font-size: 0.58rem;
        line-height: 1.5;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .crumbs a {
        text-decoration: none;
      }
      .crumbs li + li::before {
        content: '/';
        margin-right: 0.6rem;
        opacity: 0.4;
      }
      .page-intro__copy {
        display: grid;
        justify-items: center;
        gap: 0.75rem;
        max-width: 54rem;
      }
      .page-intro__copy ::ng-deep h1 {
        font-size: clamp(2.15rem, 3.8vw, 3.25rem);
        font-weight: 500;
        line-height: 1.08;
        letter-spacing: 0.035em;
        text-transform: uppercase;
      }
      .page-intro__copy ::ng-deep .lede {
        max-width: 52ch;
        font-size: clamp(1.125rem, 1rem + 0.35vw, 1.25rem);
        line-height: 1.4;
        text-wrap: balance;
      }
      .page-intro__flourish {
        display: block;
        margin-top: 1rem;
        font-size: 0.7rem;
        line-height: 1;
        letter-spacing: 0.3em;
      }
    `,
  ],
})
export class PageHead {
  readonly crumbs = input<Crumb[]>([]);
}
