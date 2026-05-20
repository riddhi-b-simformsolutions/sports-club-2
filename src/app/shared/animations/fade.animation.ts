// T026 — Page fade-in animation
import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(16px)' }),
    animate('400ms cubic-bezier(0.35,0,0.25,1)', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);
