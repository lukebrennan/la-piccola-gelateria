import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
  viewChild,
  ElementRef,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NAV, SITE } from './core/site';
import { TileWall } from './shared/tilewall';
import { openStatus } from './core/open-status';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TileWall],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { '(document:keydown.escape)': 'closeMenu()' },
})
export class App {
  protected readonly site = SITE;
  protected readonly nav = NAV;
  protected readonly phoneHref = 'tel:' + SITE.phone.replace(/\s/g, '');
  protected readonly year = new Date().getFullYear();

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly status = signal<string>('Freshly made today · Open every day until midnight');

  private readonly toggleBtn = viewChild<ElementRef<HTMLButtonElement>>('toggleBtn');
  private readonly closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');
  private readonly platform = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.closeMenu());

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platform)) return;
      const s = openStatus();
      this.status.set(
        s.open
          ? 'Freshly made today · Open now until midnight'
          : 'Freshly made today · Opens at 10:00 every day',
      );
      const onScroll = () => this.scrolled.set(window.scrollY > 8);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
    if (!isPlatformBrowser(this.platform)) return;
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
    // Move focus into the sheet once it is visible
    if (this.menuOpen()) setTimeout(() => this.closeBtn()?.nativeElement.focus(), 60);
  }

  protected closeMenu(): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    if (!isPlatformBrowser(this.platform)) return;
    document.body.style.overflow = '';
    // Return focus to the control that opened the sheet
    setTimeout(() => this.toggleBtn()?.nativeElement.focus(), 0);
  }
}
