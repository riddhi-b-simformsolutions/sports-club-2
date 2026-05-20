import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { StatsBarComponent } from './components/stats-bar/stats-bar.component';
import { FeaturedClubsComponent } from './components/featured-clubs/featured-clubs.component';
import { SportsCategoriesComponent } from './components/sports-categories/sports-categories.component';

// T037 — LandingComponent (page shell)
@Component({
  selector: 'app-landing',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroSectionComponent,
    StatsBarComponent,
    FeaturedClubsComponent,
    SportsCategoriesComponent,
  ],
  template: `
    <app-hero-section />
    <app-stats-bar />
    <app-featured-clubs />
    <app-sports-categories />
  `,
})
export class LandingComponent {}
