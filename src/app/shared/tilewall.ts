import { ChangeDetectionStrategy, Component, input } from '@angular/core';

const SET = ['tile-lemons', 'medallion-round', 'tile-rosette', 'tile-fleur', 'medallion-square'];

/** A row of hand-painted tiles laid like a wall. Decorative only. */
@Component({
  selector: 'lp-tilewall',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', '[class.is-small]': "size() === 'sm'" },
  template: `
    @for (t of tiles; track $index) {
      <img [src]="'art/' + t + '.webp'" alt="" width="125" height="125" loading="lazy" />
    }
  `,
  styles: [
    `
      :host {
        --s: clamp(4.75rem, 3rem + 6.4vw, 9rem);
        display: flex;
        justify-content: center;
        overflow: hidden;
        padding-block: 0.25rem;
        pointer-events: none;
      }
      :host(.is-small) {
        --s: clamp(3.5rem, 2.4rem + 4vw, 6rem);
      }
      img {
        flex: none;
        width: var(--s);
        height: auto;
        margin-inline: calc(var(--s) * -0.035);
      }
      img:nth-child(3n + 1) {
        transform: rotate(-1.2deg);
      }
      img:nth-child(3n + 2) {
        transform: rotate(0.8deg) translateY(1px);
      }
      img:nth-child(3n) {
        transform: rotate(1.5deg);
      }
    `,
  ],
})
export class TileWall {
  readonly size = input<'sm' | 'md'>('md');
  protected readonly tiles = Array.from({ length: 16 }, (_, i) => SET[i % SET.length]);
}
