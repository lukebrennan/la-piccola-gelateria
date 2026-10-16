import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconName } from '../data/flavours';

const FILES: Record<IconName, string> = {
  lemon: 'amalfi-lemon',
  cone: 'gelato-cone',
  cup: 'gelato-cup',
  leaf: 'lemon-leaf-sprig',
  sun: 'sunshine',
  flower: 'ceramic-flower',
  spoon: 'gelato-spoon',
};

/** Brand icon from the supplied kit. Decorative: the label sits next to it. */
@Component({
  selector: 'lp-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<img [src]="src()" alt="" [attr.width]="size()" [attr.height]="size()" loading="lazy" />`,
  styles: [
    `
      :host {
        display: inline-block;
        line-height: 0;
      }
      img {
        width: 100%;
        height: 100%;
      }
    `,
  ],
  host: { '[style.width.px]': 'size()', '[style.height.px]': 'size()' },
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input(40);
  protected readonly src = computed(() => `brand/icons/${FILES[this.name()]}.svg`);
}
