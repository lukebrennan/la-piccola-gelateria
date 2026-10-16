import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, PLATFORM_ID, afterNextRender, inject, input } from '@angular/core';

/**
 * Gentle scroll reveal. Content is visible by default (and in prerendered HTML); the global
 * `.js-reveal` class is only added in the browser once an observer is ready.
 */
@Directive({
  selector: '[lpReveal]',
  host: { class: 'reveal' },
})
export class Reveal {
  /** Stagger in milliseconds. */
  readonly lpReveal = input<number | ''>('');
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly platform = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platform) || !('IntersectionObserver' in window)) return;
      const delay = this.lpReveal();
      if (delay !== '') this.el.style.setProperty('--delay', `${delay}ms`);
      document.documentElement.classList.add('js-reveal');

      const rect = this.el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        // Already on screen at load: show without waiting
        this.el.classList.add('is-in');
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              this.el.classList.add('is-in');
              io.disconnect();
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      );
      io.observe(this.el);
    });
  }
}
