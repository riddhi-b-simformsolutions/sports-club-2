import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// T029 — PageHeroComponent
@Component({
  selector: 'app-page-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="page-hero"
      [style.minHeight]="minHeight()"
      [style.backgroundImage]="imageUrl() ? 'url(' + imageUrl() + ')' : 'none'"
      [style.backgroundColor]="!imageUrl() ? '#141829' : undefined"
    >
      <!-- Gradient overlay -->
      <div
        class="hero-overlay"
        [style.background]="overlayColor() ?? 'linear-gradient(135deg, rgba(10,14,39,0.9) 0%, rgba(10,14,39,0.6) 100%)'"
      ></div>

      <!-- Content -->
      <div class="hero-content">
        <h1 class="hero-title">{{ title() }}</h1>
        @if (subtitle()) {
          <p class="hero-subtitle">{{ subtitle() }}</p>
        }
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .page-hero {
      position: relative;
      width: 100%;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      overflow: hidden;
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
    }
    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 1280px;
      width: 100%;
      margin: 0 auto;
      padding: 96px 24px 56px;
      text-align: center;
    }
    .hero-title {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 16px;
      line-height: 1.15;
      letter-spacing: -0.02em;
    }
    .hero-subtitle {
      font-size: clamp(1rem, 2vw, 1.2rem);
      color: rgba(255,255,255,0.7);
      margin: 0;
      max-width: 600px;
      margin-inline: auto;
      line-height: 1.6;
    }
  `],
})
export class PageHeroComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly imageUrl = input<string>();
  readonly overlayColor = input<string>();
  readonly minHeight = input<string>('360px');
}
