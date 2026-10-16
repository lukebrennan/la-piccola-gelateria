import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Photo } from '../core/photos';

/** Responsive, lazy-loaded photo at a fixed crop ratio (width / height). */
@Component({
  selector: 'lp-photo',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.aspect-ratio]': 'crop()' },
  template: `
    <img
      [ngSrc]="photo().id"
      fill
      [alt]="alt() ?? photo().alt"
      [sizes]="sizes()"
      [priority]="priority()"
      [loaderParams]="{ ratio: crop() }"
      [style.object-position]="photo().focus ?? 'center'"
    />
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
        overflow: hidden;
        background: var(--cream-2);
      }
      img {
        object-fit: cover;
      }
    `,
  ],
})
export class PhotoComponent {
  readonly photo = input.required<Photo>();
  /** Crop ratio (width / height). Defaults to the original's. */
  readonly ratio = input<number>();
  readonly sizes = input('100vw');
  readonly priority = input(false);
  /** Pass an empty string for purely decorative images. */
  readonly alt = input<string>();

  protected readonly crop = computed(() => this.ratio() ?? this.photo().ratio);
}
