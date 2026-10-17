import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, PLATFORM_ID, inject, signal, viewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { FOOTER_NAV, NAV, SITE } from './core/site';
import { BrandMark } from './shared/brand-mark';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, BrandMark],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { '(document:keydown)': 'handleKeydown($event)' },
})
export class App {
  protected readonly site = SITE;
  protected readonly leftNav = NAV.slice(0, 3);
  protected readonly rightNav = NAV.slice(3);
  protected readonly mobileNav = [NAV[0], ...FOOTER_NAV];
  protected readonly year = new Date().getFullYear();
  protected readonly menuOpen = signal(false);
  private readonly toggleBtn = viewChild<ElementRef<HTMLButtonElement>>('toggleBtn');
  private readonly closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');
  private readonly platform = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), takeUntilDestroyed()).subscribe(() => this.closeMenu(false));
  }

  protected toggleMenu(): void {
    this.menuOpen.update((value) => !value);
    if (!isPlatformBrowser(this.platform)) return;
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
    if (this.menuOpen()) setTimeout(() => this.closeBtn()?.nativeElement.focus(), 0);
  }

  protected closeMenu(returnFocus = true): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    if (!isPlatformBrowser(this.platform)) return;
    document.body.style.overflow = '';
    if (returnFocus) this.toggleBtn()?.nativeElement.focus();
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (!this.menuOpen() || !isPlatformBrowser(this.platform)) return;
    if (event.key === 'Escape') { this.closeMenu(); return; }
    if (event.key !== 'Tab') return;
    const controls = Array.from(document.querySelectorAll<HTMLElement>('#mobile-menu a, #mobile-menu button')).filter((el) => el.offsetParent !== null);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
}
