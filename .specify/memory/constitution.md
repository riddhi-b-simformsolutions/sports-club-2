<!--
SYNC IMPACT REPORT
==================
Version change: (none) → 1.0.0
Added sections: Core Principles (I–IV), Technology Stack, Development Workflow, Governance
Removed sections: N/A (initial fill)
Templates checked:
  ✅ .specify/templates/plan-template.md — Constitution Check gates align with principles below
  ✅ .specify/templates/spec-template.md — no mandatory section conflicts
  ✅ .specify/templates/tasks-template.md — task categories (Setup, Foundation, US phases) align
Deferred TODOs: none
-->

# Sports Club Constitution

## Core Principles

### I. Angular Modern-First (NON-NEGOTIABLE)

All Angular code MUST use the latest stable Angular APIs and patterns:

- Standalone components, directives, and pipes are the default unit of composition;
  NgModules MUST NOT be introduced for new code.
- Reactive state MUST use Angular Signals (`signal`, `computed`, `effect`).
  RxJS is permitted only for async I/O (HTTP, WebSockets) and MUST be bridged with
  `toSignal` / `toObservable` at the boundary.
- Dependency injection MUST use the `inject()` function; constructor injection is forbidden
  in new code.
- Routing MUST use the standalone router with lazy-loaded routes defined as
  `loadComponent` or `loadChildren` arrow functions.
- Change detection strategy MUST be `OnPush` for every component.

**Rationale**: Keeps the bundle lean, aligns with Angular's official guidance for v17+,
and avoids technical debt from deprecated patterns.

### II. Ant Design UI Library (NON-NEGOTIABLE)

The only permitted UI component library is **ng-zorro-antd** (Angular port of Ant Design):

- Every UI element that exists in ng-zorro-antd MUST be sourced from that library.
  Custom-built replacements for existing components are forbidden.
- Theming MUST be done through the ng-zorro-antd CSS variable / less-variable system.
  Direct overrides of internal Ant Design class names are forbidden.
- Icons MUST use `NzIconModule` with explicit icon registration; wildcard icon imports
  are forbidden (bundle-size concern).

**Rationale**: Provides a consistent, accessible, well-documented design system without
maintaining custom UI primitives.

### III. Feature-Based Modular Structure

The source tree MUST follow a feature-folder layout:

```
src/
  app/
    core/          # singleton services, interceptors, guards (no UI)
    shared/        # reusable standalone components/pipes/directives
    features/
      <feature>/   # one folder per product feature
        components/
        services/
        models/
        routes.ts  # standalone lazy route definition
  assets/
  environments/
```

Rules:
- Each feature folder is self-contained; cross-feature imports are forbidden except
  through `shared/` or `core/`.
- Route files (`routes.ts`) MUST be the sole entry point for lazy loading a feature.
- Barrel files (`index.ts`) MUST be used at the `shared/` and `core/` boundaries only.

**Rationale**: Enables independent development, clear ownership boundaries, and fast
incremental builds.

### IV. Static Deployment Constraint

This is a **static web application** (no server runtime):

- The build output (`ng build --configuration production`) MUST consist solely of
  static assets (HTML, JS, CSS, images) deployable to any static host (e.g., Azure
  Static Web Apps, GitHub Pages, S3).
- All API calls MUST target external service URLs configured via `environment.ts`
  files; no server-side proxy or SSR is permitted.
- `angular.json` MUST use `outputHashing: "all"` for production to enable long-term
  cache headers.

**Rationale**: Minimises infrastructure complexity and hosting cost while maximising
CDN cacheability.

## Technology Stack

| Concern | Chosen Technology |
|---|---|
| Framework | Angular (latest stable, currently v19+) |
| Language | TypeScript (strict mode ON) |
| UI Library | ng-zorro-antd (latest stable) |
| State | Angular Signals; RxJS for async I/O only |
| Styling | Less (ng-zorro-antd default) + component-scoped CSS |
| Build | Angular CLI (`@angular/cli`) |
| Testing (unit) | Jest via `jest-preset-angular` |
| Linting | ESLint with `@angular-eslint` ruleset |
| Formatting | Prettier (single config at repo root) |
| Node version | ≥ 20 LTS |

TypeScript `strict: true` (plus `strictTemplates: true` in `tsconfig.app.json`) MUST
remain enabled at all times.

## Development Workflow

1. **Feature branch** — every feature starts from a branch named `###-feature-name`.
2. **Spec first** — a `spec.md` MUST exist and be approved before implementation begins.
3. **Plan second** — a `plan.md` with a Constitution Check section MUST pass gates
   before coding starts.
4. **Tests alongside code** — unit tests for services and complex components MUST be
   written in the same PR as the implementation. Test files live beside source files
   (`*.spec.ts`).
5. **Build gate** — `ng build --configuration production` MUST succeed with zero errors
   and zero TypeScript errors before a PR can be merged.
6. **Lint gate** — `ng lint` MUST report zero errors. Warnings are allowed temporarily
   but MUST be resolved within the same sprint.
7. **No dead code** — unused imports, components, and services MUST be removed before
   merge; tree-shaking is relied upon for production bundles.

## Governance

- This constitution supersedes all other coding guidelines and prior conventions.
- Amendments are documented via a PR that updates this file, increments the version,
  and updates the Sync Impact Report comment above.
- Version bumps follow semantic versioning:
  - **MAJOR** — principle removed or redefined in a backward-incompatible way.
  - **MINOR** — new principle or section added.
  - **PATCH** — clarification, wording fix, or non-semantic refinement.
- All pull requests MUST include a "Constitution Check" section in the plan or PR
  description confirming compliance with Principles I–IV.
- Complexity beyond what the current constitution allows MUST be justified in writing
  and approved before implementation.

**Version**: 1.0.0 | **Ratified**: 2026-05-20 | **Last Amended**: 2026-05-20
