import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavHeaderComponent } from './shared/components/nav-header/nav-header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { fadeInAnimation } from './shared/animations/fade.animation';

// T032 — Root App shell
@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NavHeaderComponent, FooterComponent],
  animations: [fadeInAnimation],
  template: `
    <app-nav-header />
    <main [@fadeIn]>
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [`
    main {
      padding-top: 68px; /* offset for fixed nav-header */
      min-height: 100vh;
    }
  `],
})
export class App {}
