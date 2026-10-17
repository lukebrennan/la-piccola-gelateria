import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lp-brand-mark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-light]': 'light()' },
  template: `
    @if (light()) {
      <span class="mark__sprig"><img src="brand/website/illustrations/watercolour-lemon-sprig.webp" alt="" width="500" height="500" /></span>
    } @else {
      <span class="mark__lemons"><img src="brand/website/logos/la-piccola-gelateria-logo.webp" alt="" width="560" height="280" /></span>
    }
    <span class="mark__name">La Piccola Gelateria</span>
    <span class="mark__descriptor">Gelato Artigianale</span>
    @if (!light()) { <span class="mark__place">Amalfi · Italia</span> }
  `,
  styles: [`
    :host { display: flex; flex-direction: column; align-items: center; color: var(--navy); text-align: center; line-height: 1; }
    :host.is-light { color: var(--cream); }
    .mark__lemons { display: block; width: var(--mark-art, clamp(8rem, 16vw, 12rem)); height: var(--mark-art-height, clamp(2.25rem, 4.5vw, 3.4rem)); overflow: hidden; }
    .mark__lemons img { width: 100%; height: auto; max-width: none; }
    .mark__sprig { display: block; width: 6.5rem; height: 3.8rem; margin-bottom: -.15rem; }
    .mark__sprig img { width: 100%; height: 100%; object-fit: contain; }
    .mark__name { font-family: var(--font-display); font-size: var(--mark-title, clamp(1.25rem, 2.45vw, 2.1rem)); font-weight: 500; letter-spacing: .035em; text-transform: uppercase; white-space: nowrap; }
    .mark__descriptor { margin-top: .4rem; font-family: var(--font-body); font-size: var(--mark-subtitle, .46rem); letter-spacing: .3em; text-transform: uppercase; white-space: nowrap; }
    .mark__place { margin-top: .4rem; font-family: var(--font-body); font-size: .43rem; letter-spacing: .22em; text-transform: uppercase; }
  `],
})
export class BrandMark { readonly light = input(false); }
