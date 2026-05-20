import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ContactService } from '../../../../core/services/contact.service';
import { fadeInAnimation } from '../../../../shared/animations/fade.animation';

// T046 — ContactInfoComponent
@Component({
  selector: 'app-contact-info',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzIconModule],
  animations: [fadeInAnimation],
  template: `
    <div class="contact-info-wrap" [@fadeIn]>
      <h2 class="info-title">Get in Touch</h2>
      <p class="info-desc">
        We're here to help you find the perfect sports club. Reach out through
        any of these channels.
      </p>

      <div class="details-list">
        @for (detail of details(); track detail.id) {
          <div class="detail-item">
            <div class="detail-icon-wrap">
              <span nz-icon [nzType]="detail.icon" nzTheme="outline" class="detail-icon"></span>
            </div>
            <div class="detail-text">
              <span class="detail-label">{{ detail.label }}</span>
              <span class="detail-value">{{ detail.value }}</span>
            </div>
          </div>
        }
      </div>

      <!-- Social links -->
      <div class="social-links">
        <span class="social-label">Follow us</span>
        <div class="social-row">
          @for (s of socialLinks; track s.label) {
            <a
              [href]="s.href"
              class="social-btn"
              target="_blank"
              rel="noopener noreferrer"
              [attr.aria-label]="s.label"
            >
              <span nz-icon [nzType]="s.icon" nzTheme="outline"></span>
            </a>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-info-wrap {
      height: 100%;
    }
    .info-title {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 10px;
    }
    .info-desc {
      font-size: 14px;
      color: rgba(255,255,255,0.5);
      line-height: 1.7;
      margin: 0 0 36px;
    }
    .details-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 40px;
    }
    .detail-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }
    .detail-icon-wrap {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: rgba(255,107,53,0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .detail-icon {
      font-size: 20px;
      color: #FF6B35;
    }
    .detail-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .detail-label {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: rgba(255,255,255,0.35);
    }
    .detail-value {
      font-size: 14px;
      color: rgba(255,255,255,0.8);
      line-height: 1.5;
    }
    .social-links { }
    .social-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: rgba(255,255,255,0.35);
      margin-bottom: 12px;
    }
    .social-row {
      display: flex;
      gap: 10px;
    }
    .social-btn {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255,255,255,0.6);
      font-size: 18px;
      text-decoration: none;
      transition: all 0.2s;
    }
    .social-btn:hover {
      background: rgba(255,107,53,0.15);
      border-color: rgba(255,107,53,0.3);
      color: #FF6B35;
    }
  `],
})
export class ContactInfoComponent {
  private readonly contactService = inject(ContactService);
  readonly details = this.contactService.details;

  readonly socialLinks = [
    { icon: 'facebook', label: 'Facebook', href: '#' },
    { icon: 'twitter', label: 'Twitter', href: '#' },
    { icon: 'instagram', label: 'Instagram', href: '#' },
    { icon: 'youtube', label: 'YouTube', href: '#' },
  ];
}
