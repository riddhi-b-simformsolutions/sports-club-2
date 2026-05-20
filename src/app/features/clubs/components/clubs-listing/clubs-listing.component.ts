import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PageHeroComponent } from '../../../../shared/components/page-hero/page-hero.component';
import { ClubCardComponent } from '../../../../shared/components/club-card/club-card.component';
import { ClubsService } from '../../../../core/services/clubs.service';
import { fadeInAnimation } from '../../../../shared/animations/fade.animation';

// T038 — ClubsListingComponent
@Component({
  selector: 'app-clubs-listing',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzGridModule, PageHeroComponent, ClubCardComponent],
  animations: [fadeInAnimation],
  template: `
    <app-page-hero
      title="Our Clubs"
      subtitle="9 sports clubs, one community. Find the perfect fit for your passion."
      imageUrl="https://picsum.photos/seed/clubs-listing-hero/1600/500"
      minHeight="400px"
    />

    <section class="listing-section" [@fadeIn]>
      <div class="listing-inner">
        <div class="listing-meta">
          <span class="club-count">{{ clubs().length }} clubs available</span>
        </div>

        <div nz-row [nzGutter]="[24, 24]">
          @for (club of clubs(); track club.id) {
            <div nz-col nzXs="24" nzSm="12" nzMd="8">
              <app-club-card [club]="club" />
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .listing-section {
      padding: 56px 24px 80px;
      background: #0A0E27;
    }
    .listing-inner {
      max-width: 1280px;
      margin: 0 auto;
    }
    .listing-meta {
      margin-bottom: 24px;
    }
    .club-count {
      font-size: 13px;
      color: rgba(255,255,255,0.4);
      font-weight: 500;
    }
  `],
})
export class ClubsListingComponent {
  private readonly clubsService = inject(ClubsService);
  readonly clubs = this.clubsService.clubs;
}
