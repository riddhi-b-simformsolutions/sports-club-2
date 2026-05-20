---
description: "Task list for Modern Static Sports-Club Website"
---

# Tasks: Modern Static Sports-Club Website

**Input**: Design documents from `specs/001-sports-club-website/`

**Prerequisites**: plan.md ✅ · spec.md ✅ · research.md ✅ · data-model.md ✅ · contracts/ ✅ · quickstart.md ✅

**Tests**: Not requested — no test tasks generated.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no blocking dependency)
- **[Story]**: User story ownership — US1–US6 map to spec.md priorities P1–P6
- Every task includes the exact file path it creates or modifies

---

## Phase 1: Setup (Project Scaffolding)

**Purpose**: Initialise the Angular 19 project with all tooling, theme, and configuration wired up before any feature code is written.

- [X] T001 Scaffold Angular 19 app with `ng new sports-club-website --routing --style=less --strict --skip-git` in repo root (produces `src/`, `angular.json`, `tsconfig.json`, `package.json`)
- [X] T002 Add ng-zorro-antd via `ng add ng-zorro-antd` — select locale `en_US`, enable custom theme; produces initial `src/styles.less` ng-zorro import
- [X] T003 [P] Add Inter font via Google Fonts `<link>` preconnect tags in `src/index.html` (`fonts.googleapis.com` + `fonts.gstatic.com`)
- [X] T004 [P] Create `src/styles/theme.less` with all brand Less variable overrides: `@primary-color: #FF6B35`, `@body-background: #0A0E27`, `@component-background: #141829`, `@text-color`, `@heading-color`, `@border-radius-base: 8px`, `@border-radius-lg: 12px`, `@font-family: 'Inter', ...`, `@font-size-base: 15px`, `@border-color-base`, `@box-shadow-base`
- [X] T005 Update `src/styles.less` to import `./styles/theme.less` before the ng-zorro import, add global `* { box-sizing: border-box; }` and `body { margin: 0; padding: 0; }`
- [X] T006 Configure `angular.json` — add `stylePreprocessorOptions.includePaths: ["node_modules"]`, set `outputHashing: "all"` under production configuration, add initial bundle size budgets (warn 600 kB, error 1 MB)
- [X] T007 [P] Configure `.eslintrc.json` with `@angular-eslint` rules for `*.ts` and `*.html` files (run `ng add @angular-eslint/schematics` to generate)
- [X] T008 [P] Create `.prettierrc` at repo root: `singleQuote: true`, `trailingComma: "all"`, `printWidth: 100`, `semi: true`
- [X] T009 Create full directory skeleton per plan.md: `src/app/core/{data,models,services}`, `src/app/shared/components/{nav-header,footer,page-hero,club-card}`, `src/app/shared/animations`, `src/app/features/{landing/components/{hero-section,featured-clubs,stats-bar},clubs/components/{clubs-listing,club-detail},about/components/{mission-section,team-section},contact/components/{contact-form,contact-info},faq/components/faq-list,not-found}`, `src/environments`, `src/styles`

**Checkpoint**: `ng serve` starts without errors; browser shows default Angular welcome page with Less styles loading.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Models, mock data, services, shared components, and app shell that every user-story phase depends on. **No feature work can start until this phase is complete.**

### Models

- [X] T010 [P] Create `Club` and `Activity` TypeScript interfaces in `src/app/core/models/club.model.ts` (fields: id, name, sport, sportIcon, tagline, location, coverImageUrl, heroImageUrl, foundingYear, memberCount, description, achievements, activities, accentColor)
- [X] T011 [P] Create `TeamMember` interface in `src/app/core/models/team.model.ts` (fields: id, name, title, bio, avatarUrl)
- [X] T012 [P] Create `FaqItem` interface and `FaqCategory` union type in `src/app/core/models/faq.model.ts` (fields: id, question, answer, category)
- [X] T013 [P] Create `ContactDetail` interface and `ContactType` union type in `src/app/core/models/contact.model.ts` (fields: id, type, label, value, icon)

### Mock Data

- [X] T014 Create all 9 clubs mock array in `src/app/core/data/clubs.data.ts` — export `CLUBS_DATA: Club[]` with complete data for Football, Basketball, Tennis, Swimming, Cricket, Badminton, Athletics, Cycling, Boxing clubs; Picsum cover/hero URLs `https://picsum.photos/seed/club-{sport}-{type}/{w}/{h}`; unique `accentColor` per club
- [X] T015 [P] Create 6 team members mock array in `src/app/core/data/team.data.ts` — export `TEAM_DATA: TeamMember[]` with Picsum avatar URLs `https://picsum.photos/seed/team-{n}/120/120`
- [X] T016 [P] Create 10 FAQ items mock array in `src/app/core/data/faq.data.ts` — export `FAQ_DATA: FaqItem[]` grouped across categories General, Membership, Activities, Facilities
- [X] T017 [P] Create 4 contact detail entries in `src/app/core/data/contact.data.ts` — export `CONTACT_DATA: ContactDetail[]` (address, phone, email, hours) with ng-zorro icon names

### Services

- [X] T018 Create `ClubsService` in `src/app/core/services/clubs.service.ts` — `@Injectable({ providedIn: 'root' })`, `private readonly _clubs = signal<Club[]>(CLUBS_DATA)`, `readonly clubs = this._clubs.asReadonly()`, `getById(id: string): Club | undefined` method
- [X] T019 [P] Create `TeamService` in `src/app/core/services/team.service.ts` — same signal pattern, `readonly team` from `TEAM_DATA`
- [X] T020 [P] Create `FaqService` in `src/app/core/services/faq.service.ts` — same signal pattern, `readonly faqs` from `FAQ_DATA`
- [X] T021 [P] Create `ContactService` in `src/app/core/services/contact.service.ts` — same signal pattern, `readonly details` from `CONTACT_DATA`
- [X] T022 Create `src/app/core/index.ts` barrel re-exporting all models and services

### App Configuration

- [X] T023 Configure `src/app/app.config.ts` with `provideRouter(routes, withComponentInputBinding())`, `provideAnimationsAsync()`, and `importProvidersFrom(NzIconModule.forRoot([HomeOutline, BarsOutline, MenuOutline, CloseOutline, TrophyOutline, FireOutline, TeamOutline, StarOutline, MailOutline, PhoneOutline, EnvironmentOutline, CheckCircleOutline, ClockCircleOutline, FacebookOutline, TwitterOutline, InstagramOutline, YoutubeOutline, ArrowRightOutline, ArrowLeftOutline, CalendarOutline, UserOutline]))` — import each icon from `@ant-design/icons-angular/icons`
- [X] T024 Configure `src/app/app.routes.ts` with 7 lazy routes: `''` → LandingComponent, `'clubs'` → ClubsListingComponent, `'clubs/:id'` → ClubDetailComponent, `'about'` → AboutComponent, `'contact'` → ContactComponent, `'faq'` → FaqComponent, `'**'` → NotFoundComponent (eager); all with `title` strings
- [X] T025 Create `src/environments/environment.ts` (`{ production: false }`) and `src/environments/environment.production.ts` (`{ production: true }`)

### Shared Animations

- [X] T026 Create `src/app/shared/animations/fade.animation.ts` exporting `fadeInAnimation` trigger: `:enter` animates `opacity 0 → 1` + `translateY(16px → 0)` over `400ms cubic-bezier(0.35,0,0.25,1)`

### Shared Components

- [X] T027 Create `NavHeaderComponent` standalone, `ChangeDetectionStrategy.OnPush`, in `src/app/shared/components/nav-header/nav-header.component.ts` — horizontal nav links (Home/Clubs/About/Contact/FAQ) with `routerLinkActive="is-active"`, `routerLinkActiveOptions: { exact: true }` on Home; mobile: `Signal<boolean>` `menuOpen` drives `nz-drawer` toggled by hamburger `nz-button` with `BarsOutline` icon; imports `NzLayoutModule`, `NzMenuModule`, `NzButtonModule`, `NzIconModule`, `NzDrawerModule`, `RouterLink`, `RouterLinkActive`
- [X] T028 Create `FooterComponent` standalone, `OnPush`, in `src/app/shared/components/footer/footer.component.ts` — nav links row, social icon row (Facebook/Twitter/Instagram/YouTube as `nz-button` with icons), copyright line; no inputs/outputs
- [X] T029 Create `PageHeroComponent` standalone, `OnPush`, in `src/app/shared/components/page-hero/page-hero.component.ts` — inputs: `title: string` (required), `subtitle?: string`, `imageUrl?: string`, `overlayColor?: string`, `minHeight?: string` (default `'360px'`); renders full-width div with background-image CSS + dark overlay gradient + centred text; imports `NzGridModule`
- [X] T030 Create `ClubCardComponent` standalone, `OnPush`, in `src/app/shared/components/club-card/club-card.component.ts` — input: `club: Club` (required), `compact?: boolean`; renders `nz-card` with `nzCover` image template (Picsum `coverImageUrl`), `nz-tag` sport badge with `accentColor` background, club name `h3`, tagline clamped to 2 lines with CSS `-webkit-line-clamp`, location with `EnvironmentOutline` icon; entire card wrapped in `[routerLink]="['/clubs', club.id]"`; hover lift via `:host:hover` CSS `transform: translateY(-4px)`; imports `NzCardModule`, `NzTagModule`, `NzIconModule`, `RouterLink`
- [X] T031 Create `src/app/shared/index.ts` barrel re-exporting `NavHeaderComponent`, `FooterComponent`, `PageHeroComponent`, `ClubCardComponent`, `fadeInAnimation`

### App Shell

- [X] T032 Update `src/app/app.component.ts` as root shell — standalone, `OnPush`; template: `<app-nav-header />` + `<main [@fadeIn]><router-outlet /></main>` + `<app-footer />`; `animations: [fadeInAnimation]`; imports `NavHeaderComponent`, `FooterComponent`, `RouterOutlet`

**Checkpoint**: `ng serve` shows nav header + footer on all routes; `/` loads without error; lazy-loaded chunks appear in network tab.

---

## Phase 3: User Story 1 — Captivating Landing Page (Priority: P1) 🎯 MVP

**Goal**: Deliver a visually immersive landing page with hero, featured clubs, and stats sections that creates a premium first impression and drives navigation to Clubs.

**Independent Test**: Open `http://localhost:4200/` — verify full-screen hero with headline/CTA buttons, 3 featured club cards visible below, stats bar with 4 metrics, "Explore Clubs" button navigates to `/clubs`.

- [X] T033 [P] [US1] Create `HeroSectionComponent` standalone, `OnPush`, in `src/app/features/landing/components/hero-section/hero-section.component.ts` — full-screen section (`min-height: 100svh`) with Picsum background image (`https://picsum.photos/seed/landing-hero/1920/800`), dark gradient overlay, animated headline (`SportClub Hub`), sub-headline, two `nz-button` CTAs: "Explore Clubs" (`[routerLink]="['/clubs']"`, primary type) and "Learn More" (`[routerLink]="['/about']"`, ghost type); `[@fadeIn]` on root element; imports `NzButtonModule`, `NzIconModule`, `RouterLink`, `fadeInAnimation`
- [X] T034 [P] [US1] Create `FeaturedClubsComponent` standalone, `OnPush`, in `src/app/features/landing/components/featured-clubs/featured-clubs.component.ts` — injects `ClubsService` via `inject()`; `featuredClubs = computed(() => this.clubsService.clubs().slice(0, 3))`; renders section heading, `nz-row` with 3 `ClubCardComponent` (`compact=true`) inside `nz-col [nzXs]=24 [nzSm]=12 [nzMd]=8`, and "View All Clubs" `nz-button` linking to `/clubs`; imports `NzGridModule`, `NzButtonModule`, `RouterLink`, `ClubCardComponent`, `ClubsService`
- [X] T035 [P] [US1] Create `StatsBarComponent` standalone, `OnPush`, in `src/app/features/landing/components/stats-bar/stats-bar.component.ts` — renders 4 stat items (9 Clubs, 2,000+ Members, 6 Cities, 40+ Coaches) as a horizontal `nz-row` of `nz-statistic` cards with icons; responsive: stacks 2×2 on mobile via `nzXs=12 nzSm=6`; imports `NzStatisticModule`, `NzGridModule`, `NzIconModule`
- [X] T036 [US1] Create `LandingComponent` standalone, `OnPush`, in `src/app/features/landing/landing.component.ts` — composes `<app-hero-section>`, `<app-featured-clubs>`, `<app-stats-bar>` in order; imports `HeroSectionComponent`, `FeaturedClubsComponent`, `StatsBarComponent`
- [X] T037 [US1] Create `src/app/features/landing/routes.ts` exporting `LANDING_ROUTES: Routes = [{ path: '', loadComponent: () => import('./landing.component').then(c => c.LandingComponent) }]`

**Checkpoint**: `http://localhost:4200/` renders all three landing sections; "Explore Clubs" navigates to `/clubs` (may show empty shell for now).

---

## Phase 4: User Story 2 — Clubs Listing Page (Priority: P2)

**Goal**: Display all 9 clubs in a responsive, scannable card grid that enables navigation to each club's detail page.

**Independent Test**: Open `http://localhost:4200/clubs` — verify all 9 club cards visible with name, sport badge, tagline, location; cards navigate to `/clubs/:id` on click; grid is single-column on mobile, 2-col on tablet, 3-col on desktop.

- [X] T038 [US2] Create `ClubsListingComponent` standalone, `OnPush`, in `src/app/features/clubs/components/clubs-listing/clubs-listing.component.ts` — injects `ClubsService`; `clubs = this.clubsService.clubs`; template: `<app-page-hero>` (title "Our Sports Clubs", subtitle "Find your perfect sporting home"), then `nz-row [nzGutter]="{ xs: 8, sm: 16, md: 24 }"` with `@for (club of clubs(); track club.id)` inside `nz-col [nzXs]=24 [nzSm]=24 [nzMd]=12 [nzLg]=8 [nzXl]=8` rendering `<app-club-card [club]="club" />`; `[@fadeIn]` on root; imports `NzGridModule`, `PageHeroComponent`, `ClubCardComponent`, `NzSpinModule`, `fadeInAnimation`
- [X] T039 [US2] Create `src/app/features/clubs/routes.ts` exporting `CLUBS_ROUTES: Routes` — `{ path: '', loadComponent: () => ClubsListingComponent }`, `{ path: ':id', loadComponent: () => ClubDetailComponent }`

**Checkpoint**: `http://localhost:4200/clubs` renders 9 club cards in correct responsive grid; clicking any card navigates to `/clubs/{id}` URL.

---

## Phase 5: User Story 3 — Club Detail Page (Priority: P3)

**Goal**: Deliver a rich per-club page with hero, about/stats, achievements, activities, and a contact CTA, accessible via deep link.

**Independent Test**: Open `http://localhost:4200/clubs/city-football-fc` — verify: hero banner with club name and sport badge, about text, founding year + member count, ≥3 achievements, ≥3 activities, "Contact / Join" button navigates to `/contact`; breadcrumb navigates back to `/clubs`; open `/clubs/unknown` and verify inline not-found message with back link.

- [X] T040 [US3] Create `ClubDetailComponent` standalone, `OnPush`, in `src/app/features/clubs/components/club-detail/club-detail.component.ts` — injects `ActivatedRoute` and `ClubsService`; `clubId = toSignal(inject(ActivatedRoute).paramMap.pipe(map(p => p.get('id') ?? '')))`, `club = computed(() => this.clubsService.getById(this.clubId()))`, `notFound = computed(() => !!this.clubId() && !this.club())`; template sections: (1) `<app-page-hero>` with `[title]="club().name"`, `[imageUrl]="club().heroImageUrl"`, (2) `nz-breadcrumb` (Clubs → club name), (3) About section with description, (4) Key Stats row (`nz-statistic` for foundingYear and memberCount), (5) Achievements `nz-list` with `CheckCircleOutline` icons, (6) Activities `nz-list` of `nz-list-item` with name/description/schedule, (7) CTA `nz-button` "Contact / Join" `[routerLink]="['/contact']"`, (8) if `notFound()` renders `nz-result [nzStatus]="'404'"` with back link; `[@fadeIn]` on root; imports `NzBreadCrumbModule`, `NzStatisticModule`, `NzListModule`, `NzResultModule`, `NzButtonModule`, `NzTagModule`, `NzIconModule`, `PageHeroComponent`, `RouterLink`, `fadeInAnimation`, `AsyncPipe`; uses `toSignal` from `@angular/core/rxjs-interop`

**Checkpoint**: Each of the 9 club slugs renders full detail; browser back returns to `/clubs`; unknown slug shows inline 404 state.

---

## Phase 6: User Story 4 — About Page (Priority: P4)

**Goal**: Present the organisation's mission, values, and team to build trust and credibility.

**Independent Test**: Open `http://localhost:4200/about` — verify: hero banner, mission statement with 3 value-proposition cards (icon + title + description), 6 team member cards with avatar/name/title/bio.

- [X] T041 [P] [US4] Create `MissionSectionComponent` standalone, `OnPush`, in `src/app/features/about/components/mission-section/mission-section.component.ts` — static content; renders section heading "Our Mission", bold mission statement paragraph, then `nz-row` of 3 `nz-card` value-proposition items (Passion, Inclusivity, Excellence) each with an `nz-icon` and short description; imports `NzCardModule`, `NzGridModule`, `NzIconModule`
- [X] T042 [P] [US4] Create `TeamSectionComponent` standalone, `OnPush`, in `src/app/features/about/components/team-section/team-section.component.ts` — injects `TeamService`; `team = this.teamService.team`; `nz-row [nzGutter]="[16,16]"` with `@for (member of team(); track member.id)` in `nz-col [nzXs]=24 [nzSm]=12 [nzMd]=8`; each card: `nz-avatar [nzSrc]="member.avatarUrl" [nzSize]=80`, name `h4`, title `nz-tag`, bio `<p>`; imports `NzAvatarModule`, `NzCardModule`, `NzGridModule`, `NzTagModule`, `TeamService`
- [X] T043 [US4] Create `AboutComponent` standalone, `OnPush`, in `src/app/features/about/about.component.ts` — composes `<app-page-hero>` (title "About Us"), `<app-mission-section>`, `<app-team-section>`; `[@fadeIn]`; imports `PageHeroComponent`, `MissionSectionComponent`, `TeamSectionComponent`, `fadeInAnimation`
- [X] T044 [US4] Create `src/app/features/about/routes.ts` with `loadComponent` to `AboutComponent`

**Checkpoint**: `http://localhost:4200/about` renders hero + 3 value cards + 6 team member cards in responsive grid.

---

## Phase 7: User Story 5 — Contact Us Page (Priority: P5)

**Goal**: Provide a credible-looking contact form with client-side validation and a success state, plus mocked contact detail cards.

**Independent Test**: Open `http://localhost:4200/contact` — verify: 4 contact detail cards, form with Name/Email/Subject/Message fields; submit with empty fields shows inline validation errors on each; fill all fields and submit shows success confirmation banner.

- [X] T045 [P] [US5] Create `ContactFormComponent` standalone, `OnPush`, in `src/app/features/contact/components/contact-form/contact-form.component.ts` — injects `FormBuilder`; reactive form with controls: name (required), email (required + `Validators.email`), subject (required), message (required); `submitted = signal(false)`; `loading = signal(false)`; `onSubmit()`: marks all controls touched, if valid sets `loading(true)` then after 800 ms timeout sets `submitted(true)` and `loading(false)`; template: `@if (!submitted())` shows `nz-form` with `nz-form-item` + `nz-form-explain` per field + `nzHasFeedback`, submit `nz-button [nzLoading]="loading()"`; `@else` shows `nz-result [nzStatus]="'success'"` "Message Sent!" success state; imports `ReactiveFormsModule`, `NzFormModule`, `NzInputModule`, `NzButtonModule`, `NzResultModule`
- [X] T046 [P] [US5] Create `ContactInfoComponent` standalone, `OnPush`, in `src/app/features/contact/components/contact-info/contact-info.component.ts` — injects `ContactService`; `details = this.contactService.details`; renders `@for (detail of details(); track detail.id)` as `nz-card` with `[nzIcon]="detail.icon"` + label + value; imports `NzCardModule`, `NzIconModule`, `ContactService`
- [X] T047 [US5] Create `ContactComponent` standalone, `OnPush`, in `src/app/features/contact/contact.component.ts` — composes `<app-page-hero>` (title "Contact Us"), `nz-row` with `nz-col [nzXs]=24 [nzMd]=14` for `<app-contact-form>` and `nz-col [nzXs]=24 [nzMd]=9` for `<app-contact-info>`; `[@fadeIn]`; imports `PageHeroComponent`, `ContactFormComponent`, `ContactInfoComponent`, `NzGridModule`, `fadeInAnimation`
- [X] T048 [US5] Create `src/app/features/contact/routes.ts` with `loadComponent` to `ContactComponent`

**Checkpoint**: `http://localhost:4200/contact` renders side-by-side form + info cards; validation and success state work without any network calls.

---

## Phase 8: User Story 6 — FAQ Page (Priority: P6)

**Goal**: Provide a scannable accordion FAQ page grouped by category, reducing common support enquiries.

**Independent Test**: Open `http://localhost:4200/faq` — verify ≥8 FAQ items visible as collapsed rows across ≥3 categories; clicking a row expands it and collapses any previously open row; all question text visible without expanding.

- [X] T049 [US6] Create `FaqListComponent` standalone, `OnPush`, in `src/app/features/faq/components/faq-list/faq-list.component.ts` — injects `FaqService`; `faqs = this.faqService.faqs`; `grouped = computed(() => groupByCategory(this.faqs()))` (helper function groups `FaqItem[]` into `Map<FaqCategory, FaqItem[]>`); template: `@for (category of grouped().keys(); track category)` renders section label + `nz-collapse [nzAccordion]="true"` with `@for (item of grouped().get(category); track item.id)` as `nz-collapse-panel [nzHeader]="item.question"`; expansion content is `item.answer` in a `<p>`; imports `NzCollapseModule`, `NzGridModule`, `FaqService`; define `groupByCategory` as a pure function in the same file
- [X] T050 [US6] Create `FaqComponent` standalone, `OnPush`, in `src/app/features/faq/faq.component.ts` — composes `<app-page-hero>` (title "Frequently Asked Questions", subtitle "Got questions? We have answers."), `<app-faq-list>`; `[@fadeIn]`; imports `PageHeroComponent`, `FaqListComponent`, `fadeInAnimation`
- [X] T051 [US6] Create `src/app/features/faq/routes.ts` with `loadComponent` to `FaqComponent`

**Checkpoint**: `http://localhost:4200/faq` renders 10 items grouped under 4 category headings; accordion opens/closes correctly; only one panel open at a time.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: 404 handling, static hosting config, accessibility, responsive verification, and final production build gate.

- [X] T052 [P] Create `NotFoundComponent` standalone, `OnPush`, in `src/app/features/not-found/not-found.component.ts` — renders full-page `nz-result [nzStatus]="'404'" [nzTitle]="'Page Not Found'" [nzSubTitle]="'The page you are looking for does not exist.'"` with an `nzExtra` template containing a primary `nz-button` "Back to Home" `[routerLink]="['/']"`; imports `NzResultModule`, `NzButtonModule`, `RouterLink`
- [X] T053 [P] Create `staticwebapp.config.json` at repo root with `{ "navigationFallback": { "rewrite": "/index.html", "exclude": ["/assets/*", "/*.{css,js,ico,png,svg,webmanifest}"] } }` for Azure Static Web Apps deployment
- [X] T054 Add `loading="lazy"` attribute and descriptive `alt` text to every `<img>` element across `ClubCardComponent`, `ClubDetailComponent` (hero), `PageHeroComponent`, `TeamSectionComponent` (avatar), and `HeroSectionComponent` — ensuring WCAG AA compliance for images
- [X] T055 Verify responsive grid breakpoints in `ClubsListingComponent` (`nzXs=24 nzSm=24 nzMd=12 nzLg=8`) and `TeamSectionComponent` (`nzXs=24 nzSm=12 nzMd=8`) match the spec's mobile/tablet/desktop requirements; adjust `nzGutter` responsive object `{ xs: 8, sm: 16, md: 24, lg: 24 }` on all nz-row instances
- [X] T056 Run `ng build --configuration production` and resolve any TypeScript strict-mode errors, template errors, or bundle budget violations before marking complete
- [X] T057 Run `ng lint` and resolve all ESLint errors reported by `@angular-eslint` across all modified files

**Checkpoint (Final)**: Production build output in `dist/sports-club-website/browser/` contains only static assets; `ng lint` exits 0; all 6 page types render correctly at mobile/tablet/desktop viewport widths.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
  └── Phase 2 (Foundational) ← BLOCKS all user stories
        ├── Phase 3 (US1 — Landing)
        ├── Phase 4 (US2 — Clubs Listing)
        ├── Phase 5 (US3 — Club Detail)    ← depends on clubs/routes.ts from Phase 4
        ├── Phase 6 (US4 — About)
        ├── Phase 7 (US5 — Contact)
        └── Phase 8 (US6 — FAQ)
              └── Phase 9 (Polish)
```

### Within Phase 2 — Dependency Order

```
T010–T013 (models, [P])  →  T014–T017 (mock data, [P])  →  T018–T021 (services, [P])
                                               ↓
                                     T022 (barrel)
                                     T023 (app.config.ts)
                                     T024 (app.routes.ts)
                                     T025 (env files, [P])
                                     T026 (fade animation, [P])
                                               ↓
                          T027–T030 (shared components, all [P])
                                               ↓
                                     T031 (shared barrel)
                                     T032 (app.component.ts)
```

### User Story Dependencies After Phase 2

- **US1 (Phase 3)**: Independent — depends only on Phase 2
- **US2 (Phase 4)**: Independent — depends only on Phase 2
- **US3 (Phase 5)**: Depends on `clubs/routes.ts` from T039 (US2) for the `:id` route to be accessible; can be developed in parallel but needs T039 to be wired in
- **US4 (Phase 6)**: Independent — depends only on Phase 2
- **US5 (Phase 7)**: Independent — depends only on Phase 2
- **US6 (Phase 8)**: Independent — depends only on Phase 2

---

## Parallel Execution Examples

### Phase 2 — Parallel batch 1 (all 4 can start immediately)

```
T010 Create club.model.ts
T011 Create team.model.ts
T012 Create faq.model.ts
T013 Create contact.model.ts
```

### Phase 2 — Parallel batch 2 (after batch 1)

```
T014 clubs.data.ts      T015 team.data.ts
T016 faq.data.ts        T017 contact.data.ts
```

### Phase 2 — Parallel batch 3 (after batch 2)

```
T018 clubs.service.ts   T019 team.service.ts
T020 faq.service.ts     T021 contact.service.ts
```

### Phase 2 — Parallel batch 4 (after app.config + routes wired)

```
T027 NavHeaderComponent    T028 FooterComponent
T029 PageHeroComponent     T030 ClubCardComponent
```

### Phase 3–8 — All user stories can run in parallel (after Phase 2)

```
Developer A: T033–T037 (Landing)   Developer B: T038–T039 (Clubs Listing)
Developer C: T040     (Club Detail) Developer D: T041–T044 (About)
Developer E: T045–T048 (Contact)   Developer F: T049–T051 (FAQ)
```

### Phase 9 — Parallel pair

```
T052 NotFoundComponent    T053 staticwebapp.config.json
```

---

## Implementation Strategy

### MVP First — User Stories 1 & 2 Only

1. Complete Phase 1: Setup (T001–T009)
2. Complete Phase 2: Foundational (T010–T032)
3. Complete Phase 3: US1 Landing (T033–T037)
4. Complete Phase 4: US2 Clubs Listing (T038–T039)
5. **STOP and VALIDATE**: Landing page and clubs listing work end-to-end
6. Deploy static build → immediate value delivered

### Incremental Delivery

- **Iteration 1** → MVP: Landing + Clubs Listing (Phase 1–4)
- **Iteration 2** → High value: + Club Detail (Phase 5)
- **Iteration 3** → Credibility: + About (Phase 6)
- **Iteration 4** → Complete: + Contact + FAQ + Polish (Phase 7–9)

### Single-Developer Sequential Order

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 → Phase 8 → Phase 9
(Setup)   (Found.)  (Landing) (Listing) (Detail)  (About)  (Contact)  (FAQ)    (Polish)
T001–T009 T010–T032 T033–T037 T038–T039 T040      T041–T044 T045–T048 T049–T051 T052–T057
```
