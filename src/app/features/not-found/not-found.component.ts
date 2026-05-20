import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';

// T052 — NotFoundComponent (eager — must exist for routes to compile)
@Component({
  selector: 'app-not-found',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NzResultModule, NzButtonModule],
  template: `
    <div class="not-found-wrap">
      <nz-result
        nzStatus="404"
        nzTitle="404"
        nzSubTitle="Sorry, the page you visited does not exist."
      >
        <div nz-result-extra>
          <button nz-button nzType="primary" nzShape="round" [routerLink]="'/'">
            Back to Home
          </button>
        </div>
      </nz-result>
    </div>
  `,
  styles: [`
    .not-found-wrap {
      min-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    nz-result {
      color: #ffffff;
    }
  `],
})
export class NotFoundComponent {}
