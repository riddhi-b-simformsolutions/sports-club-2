import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { fadeInAnimation } from '../../../../shared/animations/fade.animation';

interface Stat {
  value: string;
  label: string;
  icon: string;
}

// T035 — StatsBarComponent
@Component({
  selector: 'app-stats-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzGridModule, NzIconModule],
  animations: [fadeInAnimation],
  template: `
    <section class="stats-bar" [@fadeIn]>
      <div class="stats-inner">
        @for (stat of stats; track stat.label) {
          <div class="stat-item">
            <span nz-icon [nzType]="stat.icon" nzTheme="outline" class="stat-icon"></span>
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .stats-bar {
      background: #141829;
      border-top: 1px solid rgba(255,255,255,0.06);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding: 48px 24px;
    }
    .stats-inner {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 32px;
    }
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      min-width: 140px;
    }
    .stat-icon {
      font-size: 28px;
      color: #FF6B35;
    }
    .stat-value {
      font-size: clamp(2rem, 4vw, 2.75rem);
      font-weight: 800;
      color: #ffffff;
      line-height: 1;
      letter-spacing: -0.02em;
    }
    .stat-label {
      font-size: 13px;
      color: rgba(255,255,255,0.45);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
  `],
})
export class StatsBarComponent {
  readonly stats: Stat[] = [
    { value: '9', label: 'Sports Clubs', icon: 'trophy' },
    { value: '2,000+', label: 'Members', icon: 'team' },
    { value: '6', label: 'Cities', icon: 'environment' },
    { value: '40+', label: 'Coaches', icon: 'user' },
  ];
}
