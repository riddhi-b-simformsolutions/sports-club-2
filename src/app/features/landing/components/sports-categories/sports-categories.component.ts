import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { fadeInAnimation } from '../../../../shared/animations/fade.animation';

interface SportCategory {
  name: string;
  icon: string;
  color: string;
  clubCount: number;
}

// T036 — SportsCategoriesComponent (US1 - showcase sport variety)
@Component({
  selector: 'app-sports-categories',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NzButtonModule, NzIconModule, NzGridModule],
  animations: [fadeInAnimation],
  template: `
    <section class="categories-section" [@fadeIn]>
      <div class="section-inner">
        <div class="section-header">
          <span class="section-eyebrow">Variety</span>
          <h2 class="section-title">9 Sports, One Hub</h2>
          <p class="section-desc">Every sport has a home here. Find your community.</p>
        </div>

        <div class="categories-grid">
          @for (cat of categories; track cat.name) {
            <a
              class="category-chip"
              [style.--accent]="cat.color"
              [routerLink]="'/clubs'"
            >
              <span nz-icon [nzType]="cat.icon" nzTheme="outline" class="cat-icon"></span>
              <span class="cat-name">{{ cat.name }}</span>
              <span class="cat-count">{{ cat.clubCount }} club</span>
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .categories-section {
      padding: 80px 24px;
      background: #0A0E27;
    }
    .section-inner {
      max-width: 1280px;
      margin: 0 auto;
    }
    .section-header {
      text-align: center;
      margin-bottom: 48px;
    }
    .section-eyebrow {
      display: inline-block;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #FF6B35;
      margin-bottom: 12px;
    }
    .section-title {
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 12px;
      letter-spacing: -0.02em;
    }
    .section-desc {
      font-size: 15px;
      color: rgba(255,255,255,0.5);
      max-width: 440px;
      margin: 0 auto;
    }
    .categories-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
    }
    .category-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      border-radius: 50px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .category-chip:hover {
      background: rgba(var(--accent-rgb, 255,107,53), 0.12);
      border-color: var(--accent, #FF6B35);
      transform: translateY(-2px);
    }
    .cat-icon {
      font-size: 18px;
      color: var(--accent, #FF6B35);
    }
    .cat-name {
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
    }
    .cat-count {
      font-size: 11px;
      color: rgba(255,255,255,0.35);
      margin-left: 2px;
    }
  `],
})
export class SportsCategoriesComponent {
  readonly categories: SportCategory[] = [
    { name: 'Football', icon: 'global', color: '#2ECC71', clubCount: 1 },
    { name: 'Basketball', icon: 'fire', color: '#E67E22', clubCount: 1 },
    { name: 'Tennis', icon: 'star', color: '#F1C40F', clubCount: 1 },
    { name: 'Swimming', icon: 'check-circle', color: '#3498DB', clubCount: 1 },
    { name: 'Cricket', icon: 'trophy', color: '#27AE60', clubCount: 1 },
    { name: 'Badminton', icon: 'arrow-right', color: '#9B59B6', clubCount: 1 },
    { name: 'Athletics', icon: 'clock-circle', color: '#E74C3C', clubCount: 1 },
    { name: 'Cycling', icon: 'environment', color: '#1ABC9C', clubCount: 1 },
    { name: 'Boxing', icon: 'user', color: '#C0392B', clubCount: 1 },
  ];
}
