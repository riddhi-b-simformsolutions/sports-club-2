import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { MissionSectionComponent } from './components/mission-section/mission-section.component';
import { TeamSectionComponent } from './components/team-section/team-section.component';

// T043+T044 — AboutComponent (page shell)
@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeroComponent, MissionSectionComponent, TeamSectionComponent],
  template: `
    <app-page-hero
      title="About Sports Club Hub"
      subtitle="Our story, our mission, and the team behind it all."
      imageUrl="https://picsum.photos/seed/about-hero-banner/1600/500"
      minHeight="380px"
    />
    <app-mission-section />
    <app-team-section />
  `,
})
export class AboutComponent {}
