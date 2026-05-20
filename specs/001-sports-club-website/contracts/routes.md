# Route Contracts: Modern Static Sports-Club Website

**Phase**: 1 — Design
**Branch**: `001-sports-club-website`
**Date**: 2026-05-20

This document defines the client-side routing contract for the Angular SPA.

---

## App-Level Routes (`app.routes.ts`)

| Path | Lazy Load Target | Feature | Title |
|---|---|---|---|
| `` (empty / root) | `LandingComponent` | `features/landing` | Home |
| `clubs` | `ClubsListingComponent` | `features/clubs` | Our Clubs |
| `clubs/:id` | `ClubDetailComponent` | `features/clubs` | Club Detail |
| `about` | `AboutComponent` | `features/about` | About Us |
| `contact` | `ContactComponent` | `features/contact` | Contact Us |
| `faq` | `FaqComponent` | `features/faq` | FAQs |
| `**` | `NotFoundComponent` | `features/not-found` | 404 Not Found |

### Route Parameter Contracts

**`clubs/:id`**

| Parameter | Type | Source | Example Values |
|---|---|---|---|
| `id` | `string` (URL-safe slug) | `Club.id` from mock data | `city-football-fc`, `metro-basketball`, `harbour-tennis` |

Resolution: `ClubDetailComponent` injects `ActivatedRoute`, reads `params['id']` as a signal via `toSignal(route.paramMap.pipe(map(p => p.get('id'))))`, then calls `ClubsService.getById(id)`. If `undefined` (unknown slug), the component renders a not-found inline message with a link to `/clubs`.

---

## Route Loading Strategy

All routes are **lazily loaded** via `loadComponent` arrow functions (except `NotFoundComponent` which is tiny and may be eagerly loaded).

```typescript
// app.routes.ts (contract definition)
export const routes: Routes = [
  { path: '',       loadComponent: () => import('./features/landing/landing.component').then(c => c.LandingComponent),        title: 'Home — Sports Club Hub' },
  { path: 'clubs',  loadComponent: () => import('./features/clubs/components/clubs-listing/clubs-listing.component').then(c => c.ClubsListingComponent), title: 'Our Clubs' },
  { path: 'clubs/:id', loadComponent: () => import('./features/clubs/components/club-detail/club-detail.component').then(c => c.ClubDetailComponent), title: 'Club Detail' },
  { path: 'about',   loadComponent: () => import('./features/about/about.component').then(c => c.AboutComponent),             title: 'About Us' },
  { path: 'contact', loadComponent: () => import('./features/contact/contact.component').then(c => c.ContactComponent),       title: 'Contact Us' },
  { path: 'faq',     loadComponent: () => import('./features/faq/faq.component').then(c => c.FaqComponent),                   title: 'FAQs' },
  { path: '**',      component: NotFoundComponent }
];
```

---

## Navigation Contract

The global nav header (`NavHeaderComponent`) MUST expose the following link items:

| Display Label | `routerLink` | `routerLinkActive` class |
|---|---|---|
| Home | `/` | `is-active` |
| Clubs | `/clubs` | `is-active` |
| About | `/about` | `is-active` |
| Contact | `/contact` | `is-active` |
| FAQ | `/faq` | `is-active` |

`routerLinkActiveOptions: { exact: true }` on the Home link to avoid `/` matching all sub-routes.

---

## Deep-Link & Static Host Contract

Because this is a static SPA, the hosting configuration MUST redirect all 404 responses to `index.html`. Angular's router then handles the correct route client-side.

| Host | Required Config |
|---|---|
| Azure Static Web Apps | `staticwebapp.config.json` with `navigationFallback` to `/index.html` |
| GitHub Pages | `404.html` copies `index.html` content (or use HashLocationStrategy) |
| General Nginx | `try_files $uri $uri/ /index.html;` |
| General Apache | `.htaccess` `RewriteRule ^ /index.html [L]` |

**Decision for this project**: Use `PathLocationStrategy` (default) — no hash URLs. Production deployment notes in `quickstart.md`.
