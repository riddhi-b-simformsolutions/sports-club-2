import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';


interface NavItem {
  label: string;
  path: string;
  exact: boolean;
}

// T027 — NavHeaderComponent
@Component({
  selector: 'app-nav-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, NzButtonModule, NzIconModule, NzDrawerModule],
  template: `
    <header class="nav-header" [class.scrolled]="isScrolled()">
      <div class="nav-inner">
        <!-- Logo -->
        <a routerLink="/" class="nav-logo">
          <span class="logo-icon">⚡</span>
          <span class="logo-text">Sports Club Hub</span>
        </a>

        <!-- Desktop nav -->
        <nav class="nav-links desktop-only">
          @for (item of navItems; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="is-active"
              [routerLinkActiveOptions]="{ exact: item.exact }"
              class="nav-link"
            >{{ item.label }}</a>
          }
        </nav>

        <!-- Desktop CTA -->
        <div class="nav-cta desktop-only">
          <button nz-button nzType="primary" [routerLink]="'/contact'" nzShape="round">
            Join a Club
          </button>
        </div>

        <!-- Mobile hamburger -->
        <button
          class="hamburger mobile-only"
          nz-button
          nzType="text"
          (click)="openMenu()"
          aria-label="Open navigation menu"
        >
          <span nz-icon nzType="bars" nzTheme="outline"></span>
        </button>
      </div>
    </header>

    <!-- Mobile drawer -->
    <nz-drawer
      [nzVisible]="menuOpen()"
      nzPlacement="right"
      nzTitle="Navigation"
      [nzWidth]="280"
      (nzOnClose)="closeMenu()"
    >
      <ng-container *nzDrawerContent>
        <nav class="drawer-nav">
          @for (item of navItems; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="drawer-active"
              [routerLinkActiveOptions]="{ exact: item.exact }"
              class="drawer-link"
              (click)="closeMenu()"
            >{{ item.label }}</a>
          }
          <div class="drawer-cta">
            <button
              nz-button
              nzType="primary"
              nzBlock
              [routerLink]="'/contact'"
              nzShape="round"
              (click)="closeMenu()"
            >
              Join a Club
            </button>
          </div>
        </nav>
      </ng-container>
    </nz-drawer>
  `,
  styles: [`
    .nav-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(10, 14, 39, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      transition: background 0.3s ease, box-shadow 0.3s ease;
    }
    .nav-header.scrolled {
      background: rgba(10, 14, 39, 0.97);
      box-shadow: 0 4px 24px rgba(0,0,0,0.4);
    }
    .nav-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: #ffffff;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.3px;
    }
    .logo-icon { font-size: 22px; }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .nav-link {
      color: rgba(255,255,255,0.65);
      font-size: 14px;
      font-weight: 500;
      padding: 6px 14px;
      border-radius: 8px;
      text-decoration: none;
      transition: color 0.2s, background 0.2s;
    }
    .nav-link:hover { color: #ffffff; background: rgba(255,255,255,0.06); }
    .nav-link.is-active { color: #FF6B35; background: rgba(255,107,53,0.1); }
    .desktop-only { display: flex; }
    .mobile-only { display: none; }
    .hamburger { color: #ffffff; font-size: 20px; }
    .drawer-nav {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 8px 0;
    }
    .drawer-link {
      color: rgba(255,255,255,0.75);
      font-size: 16px;
      font-weight: 500;
      padding: 12px 16px;
      border-radius: 8px;
      text-decoration: none;
      transition: color 0.2s, background 0.2s;
    }
    .drawer-link:hover { color: #ffffff; background: rgba(255,255,255,0.06); }
    .drawer-link.drawer-active { color: #FF6B35; background: rgba(255,107,53,0.1); }
    .drawer-cta { margin-top: 24px; padding: 0 16px; }

    @media (max-width: 768px) {
      .desktop-only { display: none !important; }
      .mobile-only { display: flex !important; }
    }
  `],
})
export class NavHeaderComponent {
  readonly menuOpen = signal(false);
  readonly isScrolled = signal(false);

  readonly navItems: NavItem[] = [
    { label: 'Home', path: '/', exact: true },
    { label: 'Clubs', path: '/clubs', exact: false },
    { label: 'About', path: '/about', exact: true },
    { label: 'Contact', path: '/contact', exact: true },
    { label: 'FAQ', path: '/faq', exact: true },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  openMenu(): void {
    this.menuOpen.set(true);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
