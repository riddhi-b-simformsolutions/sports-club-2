import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { FaqService } from '../../../../core/services/faq.service';
import { FaqCategory } from '../../../../core/models/faq.model';
import { fadeInAnimation } from '../../../../shared/animations/fade.animation';

interface FaqGroup {
  category: FaqCategory;
  label: string;
}

// T049 — FaqListComponent
@Component({
  selector: 'app-faq-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzCollapseModule],
  animations: [fadeInAnimation],
  template: `
    <div class="faq-list" [@fadeIn]>
      @for (group of groups; track group.category) {
        <div class="faq-group">
          <h3 class="group-title">{{ group.label }}</h3>
          <nz-collapse [nzBordered]="false" class="faq-collapse">
            @for (item of itemsByCategory(group.category); track item.id) {
              <nz-collapse-panel
                [nzHeader]="item.question"
                [nzActive]="activeId() === item.id"
                (nzActiveChange)="onToggle($event, item.id)"
                class="faq-panel"
              >
                <p class="faq-answer">{{ item.answer }}</p>
              </nz-collapse-panel>
            }
          </nz-collapse>
        </div>
      }
    </div>
  `,
  styles: [`
    .faq-list {
      max-width: 800px;
      margin: 0 auto;
    }
    .faq-group {
      margin-bottom: 48px;
    }
    .group-title {
      font-size: 18px;
      font-weight: 700;
      color: #FF6B35;
      margin: 0 0 16px;
      text-transform: capitalize;
    }
    .faq-collapse {
      background: transparent !important;
    }
    .faq-answer {
      font-size: 14px;
      color: rgba(255,255,255,0.65);
      line-height: 1.8;
      margin: 0;
      padding: 4px 0;
    }
  `],
})
export class FaqListComponent {
  private readonly faqService = inject(FaqService);

  readonly faqs = this.faqService.faqs;
  readonly activeId = signal<string | null>(null);

  readonly groups: FaqGroup[] = [
    { category: 'General', label: 'General Questions' },
    { category: 'Membership', label: 'Membership' },
    { category: 'Activities', label: 'Activities & Training' },
    { category: 'Facilities', label: 'Facilities' },
  ];

  itemsByCategory(category: FaqCategory) {
    return this.faqs().filter((f) => f.category === category);
  }

  onToggle(active: boolean, id: string): void {
    this.activeId.set(active ? id : null);
  }
}
