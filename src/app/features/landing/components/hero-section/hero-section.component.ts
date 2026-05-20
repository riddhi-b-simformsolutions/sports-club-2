import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { fadeInAnimation } from '../../../../shared/animations/fade.animation';

// T033 — HeroSectionComponent
@Component({
  selector: 'app-hero-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NzButtonModule, NzIconModule],
  animations: [fadeInAnimation],
  template: `
    <section class="hero" [@fadeIn]>
      <!-- Background image with overlay -->
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>

      <!-- Content -->
      <div class="hero-content">
        <div class="hero-eyebrow">Welcome to Sports Club Hub</div>
        <h1 class="hero-headline">
          Find Your <span class="accent">Perfect</span><br/>
          Sports Community
        </h1>
        <p class="hero-sub">
          Discover 9 world-class sports clubs across the city.<br/>
          Football, basketball, tennis, swimming and more — all in one place.
        </p>
        <div class="hero-actions">
          <button
            nz-button
            nzType="primary"
            nzSize="large"
            nzShape="round"
            [routerLink]="'/clubs'"
          >
            Explore Clubs
            <span nz-icon nzType="arrow-right" nzTheme="outline"></span>
          </button>
          <button
            nz-button
            nzType="default"
            nzGhost
            nzSize="large"
            nzShape="round"
            [routerLink]="'/about'"
          >
            Learn More
          </button>
        </div>

        <!-- Scroll indicator -->
        <div class="scroll-hint">
          <span nz-icon nzType="arrow-right" nzTheme="outline" style="transform: rotate(90deg)"></span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      min-height: 100svh;
      display: flex;
      align-items: center;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      background-image: url('https://picsum.photos/seed/sports-hero-main/1600/900');
      background-size: cover;
      background-position: center;
      transform: scale(1.04);
      animation: slowZoom 20s ease-in-out infinite alternate;
    }
    @keyframes slowZoom {
      from { transform: scale(1.04); }
      to   { transform: scale(1.10); }
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(10,14,39,0.92) 0%,
        rgba(10,14,39,0.65) 60%,
        rgba(10,14,39,0.85) 100%
      );
    }
    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
      width: 100%;
    }
    .hero-eyebrow {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #FF6B35;
      margin-bottom: 20px;
    }
    .hero-headline {
      font-size: clamp(2.5rem, 7vw, 5rem);
      font-weight: 900;
      color: #ffffff;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin: 0 0 24px;
    }
    .accent { color: #FF6B35; }
    .hero-sub {
      font-size: clamp(1rem, 2vw, 1.2rem);
      color: rgba(255,255,255,0.65);
      margin: 0 0 40px;
      max-width: 520px;
      line-height: 1.7;
    }
    .hero-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    .scroll-hint {
      margin-top: 60px;
      color: rgba(255,255,255,0.3);
      font-size: 20px;
      animation: bounce 2s ease-in-out infinite;
    }
    @keyframes bounce {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(8px); }
    }
    @media (max-width: 480px) {
      .hero-actions { flex-direction: column; }
      .hero-actions button { width: 100%; }
    }
  `],
})
export class HeroSectionComponent {}
