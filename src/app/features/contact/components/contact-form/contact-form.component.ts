import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { fadeInAnimation } from '../../../../shared/animations/fade.animation';

// T045 — ContactFormComponent
@Component({
  selector: 'app-contact-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzResultModule,
    NzIconModule,
  ],
  animations: [fadeInAnimation],
  template: `
    <div class="contact-form-wrap" [@fadeIn]>
      @if (submitted()) {
        <nz-result
          nzStatus="success"
          nzTitle="Message Sent!"
          nzSubTitle="Thanks for reaching out. We'll get back to you within 24 hours."
        >
          <div nz-result-extra>
            <button nz-button nzType="default" nzShape="round" (click)="reset()">
              Send Another
            </button>
          </div>
        </nz-result>
      } @else {
        <h2 class="form-title">Send Us a Message</h2>
        <p class="form-desc">Have a question? We'd love to hear from you.</p>

        <form nz-form [formGroup]="form" nzLayout="vertical" (ngSubmit)="submit()">
          <div nz-row [nzGutter]="16">
            <div nz-col nzXs="24" nzSm="12">
              <nz-form-item>
                <nz-form-label nzRequired>Full Name</nz-form-label>
                <nz-form-control nzHasFeedback [nzErrorTip]="nameError">
                  <input
                    nz-input
                    formControlName="name"
                    placeholder="Your full name"
                  />
                  <ng-template #nameError>
                    @if (form.get('name')?.hasError('required')) { Name is required. }
                  </ng-template>
                </nz-form-control>
              </nz-form-item>
            </div>
            <div nz-col nzXs="24" nzSm="12">
              <nz-form-item>
                <nz-form-label nzRequired>Email Address</nz-form-label>
                <nz-form-control nzHasFeedback [nzErrorTip]="emailError">
                  <input
                    nz-input
                    formControlName="email"
                    placeholder="you@example.com"
                    type="email"
                  />
                  <ng-template #emailError>
                    @if (form.get('email')?.hasError('required')) { Email is required. }
                    @else if (form.get('email')?.hasError('email')) { Enter a valid email. }
                  </ng-template>
                </nz-form-control>
              </nz-form-item>
            </div>
          </div>

          <nz-form-item>
            <nz-form-label nzRequired>Subject</nz-form-label>
            <nz-form-control nzHasFeedback [nzErrorTip]="'Subject is required.'">
              <input nz-input formControlName="subject" placeholder="What's this about?" />
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label nzRequired>Message</nz-form-label>
            <nz-form-control [nzErrorTip]="'Message is required.'">
              <textarea
                nz-input
                formControlName="message"
                placeholder="Tell us more..."
                [nzAutosize]="{ minRows: 5, maxRows: 10 }"
              ></textarea>
            </nz-form-control>
          </nz-form-item>

          <button
            nz-button
            nzType="primary"
            nzSize="large"
            nzShape="round"
            [nzLoading]="loading()"
            [disabled]="form.invalid"
            type="submit"
          >
            Send Message
            <span nz-icon nzType="arrow-right" nzTheme="outline"></span>
          </button>
        </form>
      }
    </div>
  `,
  styles: [`
    .contact-form-wrap {
      background: #141829;
      border-radius: 16px;
      padding: 36px;
      border: 1px solid rgba(255,255,255,0.07);
    }
    .form-title {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 8px;
    }
    .form-desc {
      font-size: 14px;
      color: rgba(255,255,255,0.5);
      margin: 0 0 28px;
    }
    @media (max-width: 480px) {
      .contact-form-wrap { padding: 24px 16px; }
    }
  `],
})
export class ContactFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly submitted = signal(false);
  readonly loading = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  submit(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((ctrl) => {
        ctrl.markAsDirty();
        ctrl.updateValueAndValidity({ onlySelf: true });
      });
      return;
    }
    this.loading.set(true);
    // Simulate async submit
    setTimeout(() => {
      this.loading.set(false);
      this.submitted.set(true);
    }, 800);
  }

  reset(): void {
    this.form.reset();
    this.submitted.set(false);
  }
}
