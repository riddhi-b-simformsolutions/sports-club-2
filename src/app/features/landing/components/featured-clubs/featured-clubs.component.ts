import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ClubCardComponent } from '../../../../shared/components/club-card/club-card.component';
import { ClubsService } from '../../../../core/services/clubs.service';
import { fadeInAnimation } from '../../../../shared/animations/fade.animation';
import { computed } from '@angular/core';

// T034 — FeaturedClubsComponent
@Component({
  selector: 'app-featured-clubs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NzButtonModule, NzGridModule, NzIconModule, ClubCardComponent],
  animations: [fadeInAnimation],
  template: `
    <section class="featured-section" [@fadeIn]>
      <div class="section-inner">
        <div class="section-header">
          <span class="section-eyebrow">Spotlight</span>
          <h2 class="section-title">Featured Clubs</h2>
          <p class="section-desc">
            Explore some of the best sports communities in the city, handpicked for you.
          </p>
        </div>

        <div nz-row [nzGutter]="[24, 24]" class="clubs-grid">
          @for (club of featuredClubs(); track club.id) {
            <div nz-col nzXs="24" nzSm="24" nzMd="8">
              <app-club-card [club]="club" [compact]="true" />
            </div>
          }
        </div>

        <div class="view-all-wrap">
          <button
            nz-button
            nzType="primary"
            nzGhost
            nzSize="large"
            nzShape="round"
            [routerLink]="'/clubs'"
          >
            View All Clubs
            <span nz-icon nzType="arrow-right" nzTheme="outline"></span>
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .featured-section {
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
      max-width: 500px;
      margin: 0 auto;
    }
    .view-all-wrap {
      text-align: center;
      margin-top: 48px;
    }
  `],
})
export class FeaturedClubsComponent {
  private readonly clubsService = inject(ClubsService);

  readonly featuredClubs = computed(() => this.clubsService.clubs().slice(0, 3));
}
