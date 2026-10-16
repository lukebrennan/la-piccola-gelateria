import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { PHOTOS } from '../core/photos';
import { SITE } from '../core/site';
import { PhotoComponent } from './photo';

/**
 * Click-to-load OpenStreetMap embed. The map (and its third-party requests) only load when the
 * visitor asks for it, which keeps the page fast and respects privacy.
 */
@Component({
  selector: 'lp-map',
  imports: [PhotoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="map">
      @if (loaded()) {
        <iframe
          title="Map showing La Piccola Gelateria in Amalfi"
          [src]="src"
          loading="lazy"
          referrerpolicy="no-referrer"
        ></iframe>
      } @else {
        <lp-photo class="map__bg" [photo]="coast" [ratio]="4 / 3" sizes="(min-width: 62rem) 40vw, 90vw" alt="" />
        <div class="map__ui">
          <img src="brand/icons/find-us.svg" alt="" width="64" height="64" loading="lazy" />
          <p>{{ site.address.street }}, {{ site.address.city }}</p>
          <button type="button" class="btn btn--lemon btn--sm" (click)="loaded.set(true)">
            Show the map
          </button>
        </div>
      }
    </div>
    <p class="note">Map from OpenStreetMap, loaded as it scrolls into view.</p>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .map {
        position: relative;
        aspect-ratio: 4 / 3.2;
        border: 6px solid var(--navy);
        border-radius: 1rem;
        outline: 2px solid var(--cobalt);
        outline-offset: 5px;
        overflow: hidden;
        background: var(--sea-wash);
      }
      iframe {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }
      .map__bg {
        position: absolute;
        inset: 0;
        height: 100%;
        aspect-ratio: auto !important;
      }
      .map__ui {
        position: absolute;
        inset: 0;
        display: grid;
        place-content: center;
        justify-items: center;
        gap: 0.9rem;
        padding: 1rem;
        background: color-mix(in srgb, var(--navy) 72%, transparent);
        color: var(--cream);
        text-align: center;
      }
      .map__ui p {
        font-family: var(--font-display);
        font-size: var(--step-1);
      }
      .note {
        margin-top: 1.1rem;
        font-size: var(--step--1);
        color: var(--ink-faint);
      }
    `,
  ],
})
export class MapEmbed {
  protected readonly site = SITE;
  protected readonly coast = PHOTOS.coast;
  protected readonly loaded = signal(false);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly platform = inject(PLATFORM_ID);
  protected readonly src = inject(DomSanitizer).bypassSecurityTrustResourceUrl(
    'https://www.openstreetmap.org/export/embed.html?bbox=14.5965%2C40.6295%2C14.6095%2C40.6385&layer=mapnik&marker=40.6340%2C14.6027',
  );

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platform) || !('IntersectionObserver' in window)) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.loaded.set(true);
            io.disconnect();
          }
        },
        { rootMargin: '300px 0px' },
      );
      io.observe(this.host);
    });
  }
}
