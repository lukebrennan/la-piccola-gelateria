import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
export interface Crumb { name: string; path?: string; }
@Component({
  selector: 'lp-page-head',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-intro">
      <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a routerLink="/">Home</a></li>@for (c of crumbs(); track c.name) { <li>@if (c.path) { <a [routerLink]="c.path">{{ c.name }}</a> } @else { <span aria-current="page">{{ c.name }}</span> }</li> }</ol></nav>
      <img class="page-intro__lemon" src="brand/website/illustrations/watercolour-lemon-sprig.webp" alt="" width="500" height="500" />
      <div class="page-intro__copy"><ng-content /></div>
      <span class="page-intro__flourish" aria-hidden="true">— ✥ —</span>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .page-intro { display: flex; flex-direction: column; align-items: center; text-align: center; padding: clamp(2.5rem, 5vw, 5rem) var(--gutter) 2.5rem; }
    .crumbs ol { display: flex; flex-wrap: wrap; justify-content: center; gap: .6rem; font-size: .58rem; letter-spacing: .15em; text-transform: uppercase; }
    .crumbs a { text-decoration: none; }
    .crumbs li + li::before { content: '/'; margin-right: .6rem; opacity: .4; }
    .page-intro__lemon { width: 6.5rem; height: 5rem; object-fit: contain; margin-top: 1rem; }
    .page-intro__copy { display: grid; justify-items: center; gap: 1rem; }
    .page-intro__copy ::ng-deep h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 500; line-height: 1.04; letter-spacing: .04em; text-transform: uppercase; }
    .page-intro__copy ::ng-deep .lede { max-width: 42ch; }
    .page-intro__flourish { display: block; margin-top: 1.5rem; font-size: .8rem; letter-spacing: .3em; }
  `],
})
export class PageHead { readonly crumbs = input<Crumb[]>([]); }
