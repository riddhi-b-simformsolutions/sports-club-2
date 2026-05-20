# Component Contracts: Modern Static Sports-Club Website

**Phase**: 1 — Design
**Branch**: `001-sports-club-website`
**Date**: 2026-05-20

Defines the **public interface** (inputs, outputs, consumed signals) for each component. Implementation details (template structure, CSS) are intentionally excluded.

---

## Shared Components

### `NavHeaderComponent`

**Selector**: `app-nav-header`
**Path**: `src/app/shared/components/nav-header/`

| Interface | Name | Type | Description |
|---|---|---|---|
| Internal Signal | `menuOpen` | `Signal<boolean>` | Mobile drawer open/closed state |
| None (no @Input / @Output — uses Router directly) | — | — | — |

**Contract**: Renders navigation links for all 6 routes. Highlights active route with `routerLinkActive`. On viewports < 768 px, collapses links into an `nz-drawer` toggled by a hamburger icon button.

---

### `FooterComponent`

**Selector**: `app-footer`
**Path**: `src/app/shared/components/footer/`

No inputs or outputs. Renders: navigation links, social media icons (Facebook, Twitter, Instagram, YouTube), copyright line. All static.

---

### `PageHeroComponent`

**Selector**: `app-page-hero`
**Path**: `src/app/shared/components/page-hero/`

| Interface | Name | Type | Required | Description |
|---|---|---|---|---|
| `@Input` | `title` | `string` | ✅ | Main heading text |
| `@Input` | `subtitle` | `string` | ❌ | Sub-heading or breadcrumb text |
| `@Input` | `imageUrl` | `string` | ❌ | Background image URL; falls back to gradient |
| `@Input` | `overlayColor` | `string` | ❌ | CSS colour string for overlay tint |
| `@Input` | `minHeight` | `string` | ❌ | CSS min-height (default `'360px'`) |

**Contract**: Full-width hero banner. Displays `title` and optional `subtitle` over a background image with a dark overlay. Used on About, Contact, FAQ, and Clubs listing pages.

---

### `ClubCardComponent`

**Selector**: `app-club-card`
**Path**: `src/app/shared/components/club-card/`

| Interface | Name | Type | Required | Description |
|---|---|---|---|---|
| `@Input` | `club` | `Club` | ✅ | Club data object to render |
| `@Input` | `compact` | `boolean` | ❌ | If true, renders smaller variant for landing featured section |

**Contract**: Renders an `nz-card` with cover image, club name, sport category badge, tagline (truncated to 2 lines), and location. Entire card is wrapped in `routerLink="/clubs/{{ club.id }}"`. Hover state applies elevation lift via CSS transition.

---

## Feature Components

### Landing Feature

#### `HeroSectionComponent`

**Selector**: `app-hero-section`
**Path**: `src/app/features/landing/components/hero-section/`

No inputs. Full-screen (`min-height: 100svh`) parallax hero with background image, animated headline, sub-headline, and two buttons ("Explore Clubs" → `/clubs`, "Learn More" → `/about`).

---

#### `FeaturedClubsComponent`

**Selector**: `app-featured-clubs`
**Path**: `src/app/features/landing/components/featured-clubs/`

| Interface | Name | Type | Description |
|---|---|---|---|
| Internal Signal | `featuredClubs` | `Signal<Club[]>` | First 3 clubs from `ClubsService.clubs` |

**Contract**: Displays first 3 clubs from mock data using `ClubCardComponent` with `compact=true`. Shows a "View All Clubs" `nz-button` linking to `/clubs`.

---

#### `StatsBarComponent`

**Selector**: `app-stats-bar`
**Path**: `src/app/features/landing/components/stats-bar/`

No inputs. Hardcoded stat values (9 clubs, 2000+ members, 6 cities, 40+ coaches) displayed as animated counter cards in a horizontal row.

---

### Clubs Feature

#### `ClubsListingComponent`

**Selector**: `app-clubs-listing`
**Path**: `src/app/features/clubs/components/clubs-listing/`

| Interface | Name | Type | Description |
|---|---|---|---|
| Internal Signal | `clubs` | `Signal<Club[]>` | Full list from `ClubsService.clubs` |

**Contract**: Renders all 9 clubs in a responsive `nz-row`/`nz-col` grid using `ClubCardComponent`. Includes `app-page-hero` at top. No filter/search (out of scope).

---

#### `ClubDetailComponent`

**Selector**: `app-club-detail`
**Path**: `src/app/features/clubs/components/club-detail/`

| Interface | Name | Type | Description |
|---|---|---|---|
| Internal Signal | `club` | `Signal<Club \| undefined>` | Resolved from route `:id` via `ClubsService.getById()` |
| Internal Signal | `notFound` | `Signal<boolean>` | `true` if club ID not found in mock data |

**Contract**: Full-width hero banner from `club.heroImageUrl`. Sections: About the Club, Key Stats (founding year, members), Achievements list, Activities list, Join/Contact CTA button. Breadcrumb: Clubs → Club Name. If `notFound`, renders `nz-result` with Status 404 and back link.

---

### About Feature

#### `MissionSectionComponent`

**Selector**: `app-mission-section`
**Path**: `src/app/features/about/components/mission-section/`

No inputs. Static content: mission statement, 3 value propositions displayed as `nz-card` with icon + title + description.

---

#### `TeamSectionComponent`

**Selector**: `app-team-section`
**Path**: `src/app/features/about/components/team-section/`

| Interface | Name | Type | Description |
|---|---|---|---|
| Internal Signal | `team` | `Signal<TeamMember[]>` | From `TeamService.team` |

**Contract**: Renders 6 team member cards in responsive grid: avatar (`nz-avatar`), name, title, bio. `nzXs=24 nzSm=12 nzMd=8`.

---

### Contact Feature

#### `ContactFormComponent`

**Selector**: `app-contact-form`
**Path**: `src/app/features/contact/components/contact-form/`

| Interface | Name | Type | Description |
|---|---|---|---|
| Internal Signal | `submitted` | `Signal<boolean>` | Drives success/form display toggle |
| Internal Signal | `loading` | `Signal<boolean>` | Submit button loading state |

**Contract**: `nz-form` with reactive form (Angular `FormBuilder`). Fields: Name (required), Email (required, email validator), Subject (required), Message (required, `nz-input[nzType=textarea]`). On valid submit: sets `submitted` to `true`, shows `nz-result` success component. Inline validation via `nz-form-item` `nzHasFeedback`.

---

#### `ContactInfoComponent`

**Selector**: `app-contact-info`
**Path**: `src/app/features/contact/components/contact-info/`

| Interface | Name | Type | Description |
|---|---|---|---|
| Internal Signal | `details` | `Signal<ContactDetail[]>` | From `ContactService.details` |

**Contract**: Renders contact detail cards (address, phone, email, hours) with ng-zorro icons.

---

### FAQ Feature

#### `FaqListComponent`

**Selector**: `app-faq-list`
**Path**: `src/app/features/faq/components/faq-list/`

| Interface | Name | Type | Description |
|---|---|---|---|
| Internal Signal | `faqs` | `Signal<FaqItem[]>` | From `FaqService.faqs` |
| Internal Signal | `activeId` | `Signal<string \| null>` | Tracks currently expanded item |

**Contract**: Groups FAQ items by `category`. Renders each group as a labelled section. Each item uses `nz-collapse` (`nz-collapse-panel`) with single-open behaviour (setting `activeId`, closing others). Smooth expansion via Angular Animations.

---

### Not-Found Feature

#### `NotFoundComponent`

**Selector**: `app-not-found`
**Path**: `src/app/features/not-found/`

No inputs. Renders `nz-result` with `nzStatus="404"`, title "Page Not Found", sub-title, and an Extra button linking to `/`.

---

## Component Dependency Graph

```
AppComponent
├── NavHeaderComponent        (shared)
├── [router-outlet]
│   ├── LandingComponent
│   │   ├── HeroSectionComponent
│   │   ├── FeaturedClubsComponent
│   │   │   └── ClubCardComponent (shared, compact=true)
│   │   └── StatsBarComponent
│   ├── ClubsListingComponent
│   │   ├── PageHeroComponent (shared)
│   │   └── ClubCardComponent (shared) × 9
│   ├── ClubDetailComponent
│   │   └── PageHeroComponent (shared)
│   ├── AboutComponent
│   │   ├── PageHeroComponent (shared)
│   │   ├── MissionSectionComponent
│   │   └── TeamSectionComponent
│   ├── ContactComponent
│   │   ├── PageHeroComponent (shared)
│   │   ├── ContactFormComponent
│   │   └── ContactInfoComponent
│   ├── FaqComponent
│   │   ├── PageHeroComponent (shared)
│   │   └── FaqListComponent
│   └── NotFoundComponent
└── FooterComponent           (shared)
```
