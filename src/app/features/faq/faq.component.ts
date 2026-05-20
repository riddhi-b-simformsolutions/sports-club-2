import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { FaqListComponent } from './components/faq-list/faq-list.component';

// T050+T051 — FaqComponent (page shell)
@Component({
  selector: 'app-faq',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeroComponent, FaqListComponent],
  template: `
    <app-page-hero
      title="Frequently Asked Questions"
      subtitle="Find answers to the most common questions about Sports Club Hub."
      imageUrl="https://picsum.photos/seed/faq-hero-banner/1600/500"
      minHeight="320px"
    />

    <section class="faq-section">
      <div class="faq-inner">
        <app-faq-list />
      </div>
    </section>
  `,
  styles: [`
    .faq-section {
      padding: 64px 24px 80px;
      background: #0A0E27;
    }
    .faq-inner {
      max-width: 1280px;
      margin: 0 auto;
    }
  `],
})
export class FaqComponent {}
