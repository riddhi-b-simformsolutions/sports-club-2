import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';

interface NavLink {
  label: string;
  path: string;
}

interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

// T028 — FooterComponent
@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NzIconModule, NzButtonModule, NzGridModule, NzDividerModule],
  template: `
    <footer class="site-footer">
      <div class="footer-inner">
        <!-- Top row -->
        <div class="footer-top">
          <!-- Brand -->
          <div class="footer-brand">
            <a routerLink="/" class="footer-logo">
              <span>⚡</span> Sports Club Hub
            </a>
            <p class="footer-tagline">
              Connecting communities through sport.<br>Discover, join, and thrive.
            </p>
          </div>

          <!-- Nav columns -->
          <div class="footer-nav">
            <div class="footer-col">
              <h4 class="col-title">Explore</h4>
              @for (link of navLinks; track link.path) {
                <a [routerLink]="link.path" class="footer-link">{{ link.label }}</a>
              }
            </div>
            <div class="footer-col">
              <h4 class="col-title">Follow Us</h4>
              @for (s of socialLinks; track s.label) {
                <a
                  [href]="s.href"
                  class="footer-link social-row"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span nz-icon [nzType]="s.icon" nzTheme="outline"></span>
                  {{ s.label }}
                </a>
              }
            </div>
          </div>
        </div>

        <nz-divider class="footer-divider"></nz-divider>

        <!-- Bottom row -->
        <div class="footer-bottom">
          <span class="copyright">© 2026 Sports Club Hub. All rights reserved.</span>
          <span class="built-with">Built with passion for sport.</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background: #0A0E27;
      border-top: 1px solid rgba(255,255,255,0.07);
      padding: 56px 24px 32px;
    }
    .footer-inner {
      max-width: 1280px;
      margin: 0 auto;
    }
    .footer-top {
      display: flex;
      gap: 64px;
      flex-wrap: wrap;
    }
    .footer-brand {
      flex: 1;
      min-width: 220px;
    }
    .footer-logo {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 18px;
      font-weight: 700;
      color: #ffffff;
      text-decoration: none;
      margin-bottom: 12px;
    }
    .footer-tagline {
      color: rgba(255,255,255,0.45);
      font-size: 13px;
      line-height: 1.7;
      margin: 0;
    }
    .footer-nav {
      display: flex;
      gap: 48px;
      flex-wrap: wrap;
    }
    .footer-col {
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-width: 120px;
    }
    .col-title {
      color: #ffffff;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin: 0 0 4px;
    }
    .footer-link {
      color: rgba(255,255,255,0.5);
      font-size: 14px;
      text-decoration: none;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .footer-link:hover { color: #FF6B35; }
    .footer-divider {
      border-color: rgba(255,255,255,0.07) !important;
      margin: 32px 0 20px;
    }
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    .copyright, .built-with {
      color: rgba(255,255,255,0.3);
      font-size: 12px;
    }
    @media (max-width: 640px) {
      .footer-top { flex-direction: column; gap: 32px; }
    }
  `],
})
export class FooterComponent {
  readonly navLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Clubs', path: '/clubs' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
  ];

  readonly socialLinks: SocialLink[] = [
    { icon: 'facebook', label: 'Facebook', href: '#' },
    { icon: 'twitter', label: 'Twitter', href: '#' },
    { icon: 'instagram', label: 'Instagram', href: '#' },
    { icon: 'youtube', label: 'YouTube', href: '#' },
  ];
}
