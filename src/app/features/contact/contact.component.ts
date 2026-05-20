import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';

// T047+T048 — ContactComponent (page shell)
@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzGridModule, PageHeroComponent, ContactFormComponent, ContactInfoComponent],
  template: `
    <app-page-hero
      title="Contact Us"
      subtitle="We'd love to hear from you. Drop us a message and we'll respond promptly."
      imageUrl="https://picsum.photos/seed/contact-hero-banner/1600/500"
      minHeight="340px"
    />

    <section class="contact-section">
      <div class="contact-inner">
        <div nz-row [nzGutter]="[48, 48]">
          <div nz-col nzXs="24" nzMd="8">
            <app-contact-info />
          </div>
          <div nz-col nzXs="24" nzMd="16">
            <app-contact-form />
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      padding: 64px 24px 80px;
      background: #0A0E27;
    }
    .contact-inner {
      max-width: 1280px;
      margin: 0 auto;
    }
  `],
})
export class ContactComponent {}
