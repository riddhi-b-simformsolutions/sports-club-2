import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Club } from '../../../core/models/club.model';

// T030 — ClubCardComponent
@Component({
  selector: 'app-club-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NzCardModule, NzTagModule, NzIconModule],
  host: {
    '[style.cursor]': '"pointer"',
    '[style.display]': '"block"',
  },
  template: `
    <div
      class="club-card"
      [class.compact]="compact()"
      [routerLink]="['/clubs', club().id]"
    >
      <!-- Cover image -->
      <div class="card-cover">
        <img
          [src]="club().coverImageUrl"
          [alt]="club().name + ' cover'"
          loading="lazy"
          class="cover-img"
        />
        <!-- Sport badge -->
        <div class="sport-badge">
          <nz-tag [nzColor]="club().accentColor">
            <span nz-icon [nzType]="club().sportIcon" nzTheme="outline"></span>
            {{ club().sport }}
          </nz-tag>
        </div>
      </div>

      <!-- Body -->
      <div class="card-body">
        <h3 class="club-name">{{ club().name }}</h3>
        <p class="club-tagline">{{ club().tagline }}</p>
        <div class="club-meta">
          <span class="meta-item">
            <span nz-icon nzType="environment" nzTheme="outline"></span>
            {{ club().location }}
          </span>
          <span class="meta-item">
            <span nz-icon nzType="team" nzTheme="outline"></span>
            {{ club().memberCount }}+ members
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .club-card {
      background: #141829;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.07);
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .club-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.4);
      border-color: rgba(255,107,53,0.3);
    }
    .card-cover {
      position: relative;
      overflow: hidden;
      height: 200px;
      flex-shrink: 0;
    }
    .compact .card-cover {
      height: 150px;
    }
    .cover-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .club-card:hover .cover-img {
      transform: scale(1.04);
    }
    .sport-badge {
      position: absolute;
      top: 12px;
      left: 12px;
    }
    .card-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }
    .club-name {
      font-size: 17px;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
      line-height: 1.3;
    }
    .club-tagline {
      font-size: 13px;
      color: rgba(255,255,255,0.55);
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.5;
      flex: 1;
    }
    .club-meta {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 4px;
    }
    .meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: rgba(255,255,255,0.4);
    }
  `],
})
export class ClubCardComponent {
  readonly club = input.required<Club>();
  readonly compact = input<boolean>(false);
}
