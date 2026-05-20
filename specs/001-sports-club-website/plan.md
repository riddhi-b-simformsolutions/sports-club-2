# Implementation Plan: Modern Static Sports-Club Website

**Branch**: `001-sports-club-website` | **Date**: 2026-05-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-sports-club-website/spec.md`

## Summary

Build a fully static, mobile-responsive Angular 19+ sports-club marketing website with 6 page types (Landing, Club Listing, Club Detail ×9, About, Contact, FAQ), all content served from in-memory mocked TypeScript data. The site uses ng-zorro-antd as the sole UI library, Angular Signals for reactive state, standalone components throughout, and is deployable as a pure static bundle with no server runtime.

## Technical Context

**Language/Version**: TypeScript 5.7 / Angular 19 (latest stable)

**Primary Dependencies**: `@angular/core` 19, `@angular/router` 19, `ng-zorro-antd` 18+, `@angular/animations`, `@ant-design/icons-angular`

**Storage**: N/A — all data is in-memory TypeScript arrays (mock data files under `src/app/core/data/`)

**Testing**: Jest via `jest-preset-angular`; unit tests for services and complex components (`*.spec.ts` co-located)

**Target Platform**: Modern browsers (Chrome 120+, Firefox 120+, Safari 17+, Edge 120+); responsive across mobile (< 768 px), tablet (768–1199 px), desktop (≥ 1200 px)

**Project Type**: Static web application (SPA, Angular CLI production build)

**Performance Goals**: Sub-2 s first meaningful paint on broadband; initial bundle < 500 KB gzipped; lazy-loaded feature chunks per route

**Constraints**: No SSR, no server runtime, no external API calls; `outputHashing: "all"` in production; images from Picsum/Unsplash CDN only

**Scale/Scope**: 6 page types, 9 clubs, ~15 standalone components, ~5 services, ~4 mock data files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Principle | Gate | Status |
|---|---|---|---|
| I | Angular Modern-First | All components standalone; Signals for state; `inject()`; `OnPush`; lazy `loadComponent`/`loadChildren` | ✅ PASS |
| II | Ant Design UI Library | All UI via `ng-zorro-antd`; explicit icon registration only; theming via Less variables | ✅ PASS |
| III | Feature-Based Modular Structure | Feature folders self-contained; no cross-feature imports; `routes.ts` per feature; barrels at `shared/` and `core/` boundaries | ✅ PASS |
| IV | Static Deployment Constraint | `ng build --configuration production` output = static assets only; no SSR; `outputHashing: "all"` | ✅ PASS |

**Post-Phase-1 re-check**: All gates still pass — data-model uses TypeScript interfaces (no DB), contracts are route/component contracts (no server API), structure follows feature-folder layout exactly.

**No violations — Complexity Tracking table omitted.**

## Project Structure

### Documentation (this feature)

```text
specs/001-sports-club-website/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── routes.md
│   └── components.md
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
src/
  app/
    core/
      data/
        clubs.data.ts          # Mock club array (9 clubs)
        faq.data.ts            # Mock FAQ items
        team.data.ts           # Mock team members
        contact.data.ts        # Mock contact details
      models/
        club.model.ts          # Club, Activity interfaces
        faq.model.ts           # FaqItem interface
        team.model.ts          # TeamMember interface
        contact.model.ts       # ContactDetail interface
      services/
        clubs.service.ts       # ClubsService — signal-based
        faq.service.ts         # FaqService — signal-based
        team.service.ts        # TeamService — signal-based
        contact.service.ts     # ContactService — signal-based
      index.ts                 # Barrel: re-exports services & models
    shared/
      components/
        nav-header/
          nav-header.component.ts
          nav-header.component.html
          nav-header.component.less
        footer/
          footer.component.ts
          footer.component.html
          footer.component.less
        page-hero/
          page-hero.component.ts   # Reusable full-width hero banner
        club-card/
          club-card.component.ts   # Used in listing + landing featured section
      index.ts                 # Barrel: re-exports shared components
    features/
      landing/
        components/
          hero-section/
            hero-section.component.ts
          featured-clubs/
            featured-clubs.component.ts
          stats-bar/
            stats-bar.component.ts
        landing.component.ts
        routes.ts              # loadComponent → LandingComponent
      clubs/
        components/
          clubs-listing/
            clubs-listing.component.ts
          club-detail/
            club-detail.component.ts
        clubs.component.ts
        routes.ts              # '' → ClubsListingComponent; ':id' → ClubDetailComponent
      about/
        components/
          mission-section/
            mission-section.component.ts
          team-section/
            team-section.component.ts
        about.component.ts
        routes.ts
      contact/
        components/
          contact-form/
            contact-form.component.ts
          contact-info/
            contact-info.component.ts
        contact.component.ts
        routes.ts
      faq/
        components/
          faq-list/
            faq-list.component.ts
        faq.component.ts
        routes.ts
      not-found/
        not-found.component.ts
        routes.ts
    app.component.ts           # Root shell with nav-header, router-outlet, footer
    app.config.ts              # provideRouter, provideAnimations, NzIconModule.forRoot
    app.routes.ts              # Top-level lazy routes
  assets/
    icons/                     # Any custom SVG sport icons
  environments/
    environment.ts             # { production: false }
    environment.production.ts  # { production: true }
  styles.less                  # ng-zorro import + theme variable overrides
  styles/
    theme.less                 # Less variable customisation (brand colours)
    breakpoints.less           # Responsive mixin helpers

angular.json                   # Less stylePreprocessor, outputHashing: all (prod)
tsconfig.json                  # strict: true
.eslintrc.json                 # @angular-eslint rules
.prettierrc                    # Prettier config
jest.config.js                 # jest-preset-angular config
```

**Structure Decision**: Single Angular project (no backend). All 9 club detail pages are served by a single parameterised route (`/clubs/:id`). All data is in `core/data/` and exposed through signal-based services in `core/services/`. Shared presentational components (nav, footer, club-card, page-hero) live in `shared/` with a barrel export. Each feature module has its own `routes.ts` and is lazy-loaded from `app.routes.ts`.
