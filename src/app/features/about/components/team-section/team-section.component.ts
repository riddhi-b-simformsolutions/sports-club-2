import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { TeamService } from '../../../../core/services/team.service';
import { fadeInAnimation } from '../../../../shared/animations/fade.animation';

// T042 — TeamSectionComponent
@Component({
  selector: 'app-team-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzGridModule, NzAvatarModule],
  animations: [fadeInAnimation],
  template: `
    <section class="team-section" [@fadeIn]>
      <div class="section-inner">
        <div class="section-header">
          <span class="section-eyebrow">The People</span>
          <h2 class="section-title">Meet Our Team</h2>
          <p class="section-desc">
            Passionate individuals dedicated to making sport accessible to everyone.
          </p>
        </div>

        <div nz-row [nzGutter]="[24, 24]">
          @for (member of team(); track member.id) {
            <div nz-col nzXs="24" nzSm="12" nzMd="8">
              <div class="member-card">
                <nz-avatar
                  [nzSize]="80"
                  [nzSrc]="member.avatarUrl"
                  [nzText]="member.name[0]"
                  class="member-avatar"
                ></nz-avatar>
                <div class="member-info">
                  <h3 class="member-name">{{ member.name }}</h3>
                  <span class="member-title">{{ member.title }}</span>
                  <p class="member-bio">{{ member.bio }}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .team-section {
      padding: 80px 24px;
      background: #0d1120;
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
      max-width: 480px;
      margin: 0 auto;
    }
    .member-card {
      background: #141829;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 12px;
      padding: 28px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;
      height: 100%;
      transition: border-color 0.25s, transform 0.25s;
    }
    .member-card:hover {
      border-color: rgba(255,107,53,0.25);
      transform: translateY(-3px);
    }
    .member-info { display: flex; flex-direction: column; gap: 6px; }
    .member-name {
      font-size: 17px;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
    }
    .member-title {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #FF6B35;
    }
    .member-bio {
      font-size: 13px;
      color: rgba(255,255,255,0.5);
      line-height: 1.65;
      margin: 4px 0 0;
    }
  `],
})
export class TeamSectionComponent {
  private readonly teamService = inject(TeamService);
  readonly team = this.teamService.team;
}
