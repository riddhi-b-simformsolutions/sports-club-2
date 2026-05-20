import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';

// T024 — App-level lazy routes
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then((c) => c.LandingComponent),
    title: 'Home — Sports Club Hub',
  },
  {
    path: 'clubs',
    loadComponent: () =>
      import('./features/clubs/components/clubs-listing/clubs-listing.component').then(
        (c) => c.ClubsListingComponent,
      ),
    title: 'Our Clubs — Sports Club Hub',
  },
  {
    path: 'clubs/:id',
    loadComponent: () =>
      import('./features/clubs/components/club-detail/club-detail.component').then(
        (c) => c.ClubDetailComponent,
      ),
    title: 'Club Detail — Sports Club Hub',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then((c) => c.AboutComponent),
    title: 'About Us — Sports Club Hub',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then((c) => c.ContactComponent),
    title: 'Contact Us — Sports Club Hub',
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./features/faq/faq.component').then((c) => c.FaqComponent),
    title: 'FAQs — Sports Club Hub',
  },
  { path: '**', component: NotFoundComponent },
];

