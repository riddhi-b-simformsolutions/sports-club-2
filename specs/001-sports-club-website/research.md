# Research: Modern Static Sports-Club Website

**Phase**: 0 — Pre-Design Research
**Branch**: `001-sports-club-website`
**Date**: 2026-05-20

---

## R-001: Angular 19+ Standalone Architecture

**Decision**: All components, directives, and pipes will be standalone (no NgModules).

**Rationale**: Angular 19 makes standalone the default and zone-less model the future direction. Standalone components are independently tree-shakeable, simpler to test, and align with the constitution's Angular Modern-First principle. NgModules add indirection with no benefit for a single-team project of this scope.

**Pattern confirmed**:
- `loadComponent` / `loadChildren` arrow functions in `routes.ts` per feature folder
- `ChangeDetectionStrategy.OnPush` enforced on every `@Component`
- `inject()` function in component/service bodies (no constructor injection)
- `@for`, `@if`, `@switch` built-in control flow (not `*ngFor`/`*ngIf` directives)

**Alternatives considered**: Classic NgModule structure — rejected because it is deprecated-in-spirit for new Angular 17+ projects and violates Principle I.

---

## R-002: ng-zorro-antd Theming Strategy

**Decision**: Use ng-zorro-antd with a customised Less theme targeting a premium, dark-navy sports brand aesthetic.

**Key Less variable overrides** (applied in `src/styles/theme.less`):

| Variable | Value | Purpose |
|---|---|---|
| `@primary-color` | `#FF6B35` | Energetic orange — sports action |
| `@body-background` | `#0A0E27` | Deep navy — premium feel |
| `@component-background` | `#141829` | Card/panel backgrounds |
| `@text-color` | `rgba(255,255,255,0.85)` | High-contrast body copy |
| `@heading-color` | `#FFFFFF` | Section headings |
| `@border-radius-base` | `8px` | Modern rounded corners |
| `@border-radius-lg` | `12px` | Hero cards |
| `@font-family` | `'Inter', 'Segoe UI', sans-serif` | Clean, premium typography |
| `@font-size-base` | `15px` | Slightly larger base for readability |
| `@border-color-base` | `rgba(255,255,255,0.12)` | Subtle borders on dark bg |
| `@box-shadow-base` | `0 4px 20px rgba(0,0,0,0.4)` | Depth on cards |

**Setup**: `angular.json` `styles` array includes `src/styles.less` (which imports ng-zorro and then the theme file). `stylePreprocessorOptions.includePaths` includes `node_modules` so the `@import 'ng-zorro-antd/...'` path resolves.

**Alternatives considered**: Tailwind CSS — rejected (constitution mandates Ant Design token system); CSS-only custom theme — rejected (Less variables are the ng-zorro supported mechanism).

---

## R-003: Angular Signals for Mock Data Services

**Decision**: Each data domain (clubs, FAQ, team, contact) gets its own `@Injectable({ providedIn: 'root' })` service holding a `signal<T[]>` initialised from the corresponding mock data file.

**Pattern**:
```typescript
// core/services/clubs.service.ts
import { Injectable, signal } from '@angular/core';
import { CLUBS_DATA } from '../data/clubs.data';
import { Club } from '../models/club.model';

@Injectable({ providedIn: 'root' })
export class ClubsService {
  private readonly _clubs = signal<Club[]>(CLUBS_DATA);
  readonly clubs = this._clubs.asReadonly();

  getById(id: string): Club | undefined {
    return this._clubs().find(c => c.id === id);
  }
}
```

**Component consumption**:
```typescript
export class ClubsListingComponent {
  private clubsService = inject(ClubsService);
  readonly clubs = this.clubsService.clubs;  // Signal<Club[]>
}
```
Template uses `@for (club of clubs(); track club.id)`.

**Rationale**: Signals give fine-grained reactivity without subscribing/unsubscribing. For mock-data read-only services the overhead of full RxJS is unnecessary. `asReadonly()` enforces the service as the single write point.

**Alternatives considered**: Plain arrays returned from a method — rejected (not reactive, wouldn't benefit from future real-data migration); `BehaviorSubject` — rejected (RxJS is reserved for async I/O per constitution).

---

## R-004: Page Transition Animations

**Decision**: Use Angular `@angular/animations` with a `fadeIn` transition on each page's root element via `[@fadeIn]` trigger.

**Confirmed pattern**:
```typescript
// shared/animations/fade.animation.ts
export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(16px)' }),
    animate('400ms cubic-bezier(0.35,0,0.25,1)',
      style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);
```

Each page component imports `fadeInAnimation` into its `animations: []` array and applies `[@fadeIn]` to its root host element or outermost `<div>`.

**Rationale**: Component-local animations are simpler than router-level animation (which requires `RouterOutlet` data binding tricks). Every page independently fades in — giving a consistent premium feel without complex state management. `provideAnimations()` is registered once in `app.config.ts`.

**Alternatives considered**: CSS `@keyframes` only — rejected (no Angular lifecycle integration); route-level `routerAnimation` trigger — acceptable but more complex and fragile across lazy-loaded routes.

---

## R-005: Responsive Grid Strategy

**Decision**: Use `nz-row` / `nz-col` with the following breakpoint span values for the clubs card grid:

| Breakpoint | nzXs | nzSm | nzMd | nzLg | nzXl |
|---|---|---|---|---|---|
| Column count | 1 (24/24) | 1 (24/24) | 2 (12/24) | 3 (8/24) | 3 (8/24) |

`nzXs="24" nzSm="24" nzMd="12" nzLg="8" nzXl="8"`

**Gutter**: `[nzGutter]="{ xs: 8, sm: 16, md: 24, lg: 24 }"` (responsive object syntax)

**Rationale**: Ant Design's grid breakpoints map cleanly to the spec's three responsive tiers. Using `nzMd="12"` gives two columns from 768 px, `nzLg="8"` gives three from 992 px — appropriate for 9 cards.

**Alternatives considered**: CSS Grid with `auto-fill` — compatible but bypasses the ng-zorro grid, which is the correct Ant Design mechanism.

---

## R-006: Image CDN Strategy

**Decision**: Use Picsum Photos (`https://picsum.photos/seed/{key}/{w}/{h}`) for all mocked images.

**Rationale**: Picsum provides deterministic images by seed string, meaning the same URL always returns the same image — essential for visual consistency across builds and development. The `source.unsplash.com` redirect API is deprecated and unreliable. Specific Unsplash photo IDs (`https://images.unsplash.com/photo-{id}?w=600&q=80`) could be used as supplementary hero images but require knowing exact IDs upfront.

**Seed strategy**:
- Club cover (400×280): `https://picsum.photos/seed/club-{id}-cover/400/280`
- Club hero (1200×500): `https://picsum.photos/seed/club-{id}-hero/1200/500`
- Team member avatar (120×120): `https://picsum.photos/seed/team-{id}/120/120`
- Landing hero (1920×800): `https://picsum.photos/seed/landing-hero/1920/800`

**Known Unsplash sport photo IDs** (for optional enrichment in data):

| Sport | Unsplash Photo ID |
|---|---|
| Football | `photo-1574629810360-7efbbe195018` |
| Basketball | `photo-1546519638-68fe109691b8` |
| Tennis | `photo-1554224311-beee415c15c7` |
| Swimming | `photo-1560090995-60c595541928` |
| Cricket | `photo-1531415074968-036ba1b575da` |
| Cycling | `photo-1558742335-f7d45baa940f` |
| Boxing | `photo-1549719386-74dfcbf7dbed` |

Format: `https://images.unsplash.com/{photoId}?w=600&q=80&auto=format&fit=crop`

**Alternatives considered**: Local static images under `src/assets/` — rejected (adds binary bloat to repo and CI build times; CDN images are appropriate for a static marketing site prototype).

---

## R-007: Angular 19 Project Scaffolding

**Decision**: Scaffold with `ng new` using the following flags:

```bash
ng new sports-club-website \
  --routing \
  --style=less \
  --strict \
  --skip-git \
  --skip-tests=false
```

Then add ng-zorro-antd:
```bash
ng add ng-zorro-antd
# Select: en_US locale, dark theme customisation, custom theme (yes)
```

Configure in `angular.json`:
- `outputHashing: "all"` under production configuration
- `stylePreprocessorOptions.includePaths: ["node_modules"]`
- `budgets`: initial bundle warn at 600 kB, error at 1 MB

**Alternatives considered**: Nx monorepo — rejected (single app, no need for workspace tooling overhead); Vite-based toolchain — not yet the Angular CLI default for v19, avoided for stability.

---

## R-008: Icon Registration

**Decision**: Register only explicitly needed icons via `NzIconModule.forRoot([...icons])` in `app.config.ts`.

**Icons required for this project**:
- Navigation: `HomeOutline`, `BarsOutline`, `MenuOutline`, `CloseOutline`
- Sports/clubs: `TrophyOutline`, `FireOutline`, `TeamOutline`, `StarOutline`
- Contact/form: `MailOutline`, `PhoneOutline`, `EnvironmentOutline`, `CheckCircleOutline`
- Social: `FacebookOutline`, `TwitterOutline`, `InstagramOutline`, `YoutubeOutline`
- UI: `ArrowRightOutline`, `ArrowLeftOutline`, `CalendarOutline`, `UserOutline`

**Forbidden**: `import * from '@ant-design/icons-angular/icons'` — wildcard import adds ~200 kB to bundle.

**Pattern**: Import named icon constants from `@ant-design/icons-angular/icons` and pass array to `NzIconModule.forRoot()` inside `importProvidersFrom()` in `app.config.ts`.

**Alternatives considered**: SVG sprite sheet — compatible but redundant when ng-zorro's icon system already does tree-shaking by named import.

---

## R-009: 404 / Not-Found Route

**Decision**: Add a `not-found` feature with a `NotFoundComponent` registered as the `**` wildcard route in `app.routes.ts`.

**Rationale**: Static hosts (GitHub Pages, Azure SWA) serve `index.html` for all paths when `pathMatch: 'full'` is configured. Angular's client-side router handles the 404 display. The `NotFoundComponent` shows a styled `nz-result` (Ant Design Result component) with a 404 status and a "Back to Home" button.

**Alternatives considered**: No 404 handling — rejected per FR-001 edge case requirement.
