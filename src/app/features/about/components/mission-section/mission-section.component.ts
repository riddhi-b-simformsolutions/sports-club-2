import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { fadeInAnimation } from '../../../../shared/animations/fade.animation';

interface ValueProp {
  icon: string;
  title: string;
  description: string;
}

// T041 — MissionSectionComponent
@Component({
  selector: 'app-mission-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzGridModule, NzCardModule, NzIconModule],
  animations: [fadeInAnimation],
  template: `
    <section class="mission-section" [@fadeIn]>
      <div class="section-inner">
        <!-- Mission statement -->
        <div class="mission-statement">
          <span class="section-eyebrow">Our Mission</span>
          <h2 class="section-title">Building Stronger Communities Through Sport</h2>
          <p class="mission-text">
            Sports Club Hub was founded with a simple belief: sport has the power to bring people
            together, foster resilience, and create lifelong friendships. We connect passionate
            individuals with world-class clubs across 9 disciplines, making it easy to find your
            tribe and pursue excellence.
          </p>
        </div>

        <!-- Value propositions -->
        <div nz-row [nzGutter]="[24, 24]" class="values-grid">
          @for (vp of valueProps; track vp.title) {
            <div nz-col nzXs="24" nzSm="12" nzMd="8">
              <div class="value-card">
                <div class="value-icon-wrap">
                  <span nz-icon [nzType]="vp.icon" nzTheme="outline" class="value-icon"></span>
                </div>
                <h3 class="value-title">{{ vp.title }}</h3>
                <p class="value-desc">{{ vp.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .mission-section {
      padding: 80px 24px;
      background: #0A0E27;
    }
    .section-inner {
      max-width: 1280px;
      margin: 0 auto;
    }
    .mission-statement {
      text-align: center;
      max-width: 760px;
      margin: 0 auto 64px;
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
      margin: 0 0 20px;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }
    .mission-text {
      font-size: 16px;
      color: rgba(255,255,255,0.6);
      line-height: 1.8;
      margin: 0;
    }
    .value-card {
      background: #141829;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 12px;
      padding: 32px 24px;
      height: 100%;
      transition: border-color 0.25s, transform 0.25s;
    }
    .value-card:hover {
      border-color: rgba(255,107,53,0.3);
      transform: translateY(-4px);
    }
    .value-icon-wrap {
      width: 52px;
      height: 52px;
      border-radius: 12px;
      background: rgba(255,107,53,0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .value-icon {
      font-size: 24px;
      color: #FF6B35;
    }
    .value-title {
      font-size: 18px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 10px;
    }
    .value-desc {
      font-size: 14px;
      color: rgba(255,255,255,0.5);
      line-height: 1.7;
      margin: 0;
    }
  `],
})
export class MissionSectionComponent {
  readonly valueProps: ValueProp[] = [
    {
      icon: 'star',
      title: 'Excellence in Sport',
      description:
        'We partner with top-tier clubs that maintain the highest standards of coaching, facilities, and sporting culture.',
    },
    {
      icon: 'team',
      title: 'Inclusive Community',
      description:
        'Whether you\'re a beginner or a seasoned athlete, every club on our platform welcomes members of all skill levels.',
    },
    {
      icon: 'global',
      title: 'City-Wide Coverage',
      description:
        'Our network spans 6 cities with clubs in convenient locations, making it easy to find something close to home.',
    },
  ];
}
