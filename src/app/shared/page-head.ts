import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Crumb {
  name: string;
  path?: string;
}

/** Inner-page header: breadcrumbs, projected H1 + lede, and a ceramic accent. */
@Component({
  selector: 'lp-page-head',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container head">
      <div class="head__copy">
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
        <ng-content />
      </div>
      <div class="head__art" aria-hidden="true">
        <img class="t t--a" src="art/tile-lemons.webp" alt="" width="180" height="180" />
        <img class="t t--b" src="art/medallion-round.webp" alt="" width="150" height="150" />
        <img class="t t--c" src="art/tile-rosette.webp" alt="" width="140" height="140" />
      </div>
    </div>
    <div class="ceramic-band" aria-hidden="true"></div>
  `,
  styles: [
    `
      :host {
        display: block;
        background: var(--cream);
      }
      .head {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 2rem;
        padding-block: clamp(2rem, 1.2rem + 3vw, 4rem) clamp(2.5rem, 1.5rem + 4vw, 5rem);
      }
      .head__copy {
        display: grid;
        gap: 1.25rem;
        justify-items: start;
      }
      .head__copy ::ng-deep :where(h1) {
        max-width: 16ch;
      }
      .crumbs ol {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        font-size: var(--step--1);
        color: var(--ink-faint);
      }
      .crumbs li + li::before {
        content: '/';
        margin-right: 0.35rem;
        opacity: 0.6;
      }
      .crumbs a {
        text-decoration: none;
        background-image: linear-gradient(var(--lemon), var(--lemon));
        background-repeat: no-repeat;
        background-position: 0 100%;
        background-size: 0 2px;
        transition: background-size var(--t-med) var(--ease-out);
      }
      .crumbs a:hover {
        background-size: 100% 2px;
      }
      .head__art {
        position: relative;
        width: clamp(10rem, 6rem + 14vw, 19rem);
        height: clamp(9rem, 5rem + 12vw, 16rem);
      }
      .t {
        position: absolute;
        height: auto;
      }
      .t--a {
        width: 52%;
        left: 0;
        top: 8%;
        transform: rotate(-8deg);
      }
      .t--b {
        width: 46%;
        right: 2%;
        top: 0;
        transform: rotate(7deg);
      }
      .t--c {
        width: 42%;
        left: 30%;
        bottom: 0;
        transform: rotate(-2deg);
      }
      @media (max-width: 40rem) {
        .head {
          grid-template-columns: minmax(0, 1fr);
        }
        .head__art {
          display: none;
        }
      }
    `,
  ],
})
export class PageHead {
  readonly crumbs = input<Crumb[]>([]);
}
