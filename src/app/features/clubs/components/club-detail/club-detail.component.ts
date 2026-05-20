import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Club } from '../../../../core/models/club.model';
import { ClubsService } from '../../../../core/services/clubs.service';
import { fadeInAnimation } from '../../../../shared/animations/fade.animation';

// T040 — ClubDetailComponent
@Component({
  selector: 'app-club-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    NzResultModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule,
    NzGridModule,
    NzBreadCrumbModule,
    NzListModule,
    NzDividerModule,
  ],
  animations: [fadeInAnimation],
  template: `
    @if (notFound()) {
      <div class="not-found-wrap">
        <nz-result
          nzStatus="404"
          nzTitle="Club Not Found"
          nzSubTitle="We couldn't find a club with that ID."
        >
          <div nz-result-extra>
            <button nz-button nzType="primary" nzShape="round" [routerLink]="'/clubs'">
              Back to Clubs
            </button>
          </div>
        </nz-result>
      </div>
    } @else if (club(); as c) {
      <!-- Hero -->
      <div
        class="detail-hero"
        [style.backgroundImage]="'url(' + c.heroImageUrl + ')'"
        [@fadeIn]
      >
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <nz-breadcrumb class="breadcrumb">
            <nz-breadcrumb-item><a [routerLink]="'/clubs'">Clubs</a></nz-breadcrumb-item>
            <nz-breadcrumb-item>{{ c.name }}</nz-breadcrumb-item>
          </nz-breadcrumb>
          <nz-tag [nzColor]="c.accentColor" class="sport-tag">
            <span nz-icon [nzType]="c.sportIcon" nzTheme="outline"></span>
            {{ c.sport }}
          </nz-tag>
          <h1 class="hero-title">{{ c.name }}</h1>
          <p class="hero-tagline">{{ c.tagline }}</p>
          <div class="hero-meta">
            <span class="meta-chip">
              <span nz-icon nzType="environment" nzTheme="outline"></span>
              {{ c.location }}
            </span>
            <span class="meta-chip">
              <span nz-icon nzType="team" nzTheme="outline"></span>
              {{ c.memberCount }}+ members
            </span>
            <span class="meta-chip">
              <span nz-icon nzType="calendar" nzTheme="outline"></span>
              Est. {{ c.foundingYear }}
            </span>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="detail-body" [@fadeIn]>
        <div class="body-inner">
          <div nz-row [nzGutter]="[48, 48]">
            <!-- Main column -->
            <div nz-col nzXs="24" nzMd="16">
              <section class="detail-section">
                <h2 class="section-title">About the Club</h2>
                <p class="section-text">{{ c.description }}</p>
              </section>

              <nz-divider></nz-divider>

              <section class="detail-section">
                <h2 class="section-title">Activities</h2>
                <div class="activities-grid">
                  @for (activity of c.activities; track activity.name) {
                    <div class="activity-card">
                      <h4 class="activity-name">{{ activity.name }}</h4>
                      <p class="activity-desc">{{ activity.description }}</p>
                      @if (activity.schedule) {
                        <span class="activity-schedule">
                          <span nz-icon nzType="clock-circle" nzTheme="outline"></span>
                          {{ activity.schedule }}
                        </span>
                      }
                    </div>
                  }
                </div>
              </section>
            </div>

            <!-- Sidebar -->
            <div nz-col nzXs="24" nzMd="8">
              <div class="sidebar">
                <!-- Achievements -->
                <div class="sidebar-card">
                  <h3 class="sidebar-title">
                    <span nz-icon nzType="trophy" nzTheme="outline"></span>
                    Achievements
                  </h3>
                  <ul class="achievement-list">
                    @for (ach of c.achievements; track ach) {
                      <li class="achievement-item">
                        <span nz-icon nzType="check-circle" nzTheme="outline" class="ach-icon"></span>
                        {{ ach }}
                      </li>
                    }
                  </ul>
                </div>

                <!-- CTA -->
                <div class="cta-card">
                  <h3 class="cta-title">Ready to Join?</h3>
                  <p class="cta-desc">Get in touch with us to start your journey with {{ c.name }}.</p>
                  <button
                    nz-button
                    nzType="primary"
                    nzBlock
                    nzSize="large"
                    nzShape="round"
                    [routerLink]="'/contact'"
                  >
                    Contact Us
                    <span nz-icon nzType="arrow-right" nzTheme="outline"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .not-found-wrap {
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .detail-hero {
      position: relative;
      min-height: 500px;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: flex-end;
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(10,14,39,1) 0%,
        rgba(10,14,39,0.5) 60%,
        rgba(10,14,39,0.2) 100%
      );
    }
    .hero-content {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding: 40px 24px;
    }
    .breadcrumb {
      margin-bottom: 16px;
    }
    .breadcrumb a { color: rgba(255,255,255,0.6); }
    .breadcrumb a:hover { color: #FF6B35; }
    .sport-tag { margin-bottom: 12px; }
    .hero-title {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 900;
      color: #ffffff;
      margin: 0 0 12px;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }
    .hero-tagline {
      font-size: 16px;
      color: rgba(255,255,255,0.65);
      margin: 0 0 20px;
    }
    .hero-meta {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    .meta-chip {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: rgba(255,255,255,0.55);
      background: rgba(255,255,255,0.07);
      padding: 4px 12px;
      border-radius: 20px;
    }
    .detail-body {
      background: #0A0E27;
      padding: 56px 24px 80px;
    }
    .body-inner {
      max-width: 1280px;
      margin: 0 auto;
    }
    .detail-section { margin-bottom: 8px; }
    .section-title {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 16px;
    }
    .section-text {
      font-size: 15px;
      color: rgba(255,255,255,0.65);
      line-height: 1.8;
      margin: 0;
    }
    .activities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }
    .activity-card {
      background: #141829;
      border-radius: 10px;
      padding: 16px;
      border: 1px solid rgba(255,255,255,0.07);
    }
    .activity-name {
      font-size: 14px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 6px;
    }
    .activity-desc {
      font-size: 12px;
      color: rgba(255,255,255,0.5);
      margin: 0 0 8px;
      line-height: 1.5;
    }
    .activity-schedule {
      font-size: 11px;
      color: #FF6B35;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .sidebar { display: flex; flex-direction: column; gap: 24px; }
    .sidebar-card {
      background: #141829;
      border-radius: 12px;
      padding: 24px;
      border: 1px solid rgba(255,255,255,0.07);
    }
    .sidebar-title {
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .achievement-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .achievement-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 13px;
      color: rgba(255,255,255,0.65);
      line-height: 1.5;
    }
    .ach-icon { color: #FF6B35; flex-shrink: 0; margin-top: 2px; }
    .cta-card {
      background: linear-gradient(135deg, rgba(255,107,53,0.15) 0%, rgba(255,107,53,0.05) 100%);
      border-radius: 12px;
      padding: 24px;
      border: 1px solid rgba(255,107,53,0.2);
    }
    .cta-title {
      font-size: 18px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 8px;
    }
    .cta-desc {
      font-size: 13px;
      color: rgba(255,255,255,0.55);
      margin: 0 0 20px;
      line-height: 1.6;
    }
  `],
})
export class ClubDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly clubsService = inject(ClubsService);

  readonly club = signal<Club | undefined>(undefined);
  readonly notFound = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.notFound.set(true);
      return;
    }
    const found = this.clubsService.getById(id);
    if (found) {
      this.club.set(found);
    } else {
      this.notFound.set(true);
    }
  }
}
