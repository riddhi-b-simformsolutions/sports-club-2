# Quickstart: Modern Static Sports-Club Website

**Feature**: `001-sports-club-website`
**Date**: 2026-05-20
**Prerequisites**: Node ≥ 20 LTS, npm ≥ 10

---

## 1. Scaffold the Angular Project

```bash
# Install Angular CLI globally (skip if already installed at v19+)
npm install -g @angular/cli@latest

# Create the app (in repo root)
ng new sports-club-website \
  --routing \
  --style=less \
  --strict \
  --skip-git \
  --directory .

# Verify Angular version
ng version
```

---

## 2. Add ng-zorro-antd

```bash
ng add ng-zorro-antd
```

When prompted:

- **Choose your locale**: `en_US`
- **Set up custom theme file?**: `Yes`
- **Use a custom theme with predefined styles?**: `Yes`

This will:
- Add `ng-zorro-antd` to `package.json`
- Add the Less import to `src/styles.less`
- Generate `src/theme.less` (rename/move to `src/styles/theme.less` — see step 4)

---

## 3. Add Animations

```bash
npm install @angular/animations
```

Register in `src/app/app.config.ts`:

```typescript
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// ...
providers: [
  provideRouter(routes, withComponentInputBinding()),
  provideAnimationsAsync(),
  importProvidersFrom(NzIconModule.forRoot([/* see R-008 */]))
]
```

---

## 4. Configure Less Theme

Move the generated theme file and override variables:

```bash
mkdir -p src/styles
mv src/theme.less src/styles/theme.less
```

`src/styles/theme.less`:
```less
// Premium sports brand theme
@primary-color:          #FF6B35;
@body-background:        #0A0E27;
@component-background:   #141829;
@text-color:             rgba(255, 255, 255, 0.85);
@heading-color:          #FFFFFF;
@border-radius-base:     8px;
@border-radius-lg:       12px;
@font-family:            'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
@font-size-base:         15px;
@border-color-base:      rgba(255, 255, 255, 0.12);
@box-shadow-base:        0 4px 20px rgba(0, 0, 0, 0.4);
@success-color:          #22C55E;
@warning-color:          #F59E0B;
@error-color:            #EF4444;
@info-color:             #3B82F6;
```

`src/styles.less`:
```less
@import './styles/theme.less';
@import '../node_modules/ng-zorro-antd/ng-zorro-antd.less';

* { box-sizing: border-box; }
body { margin: 0; padding: 0; }
```

`angular.json` — add under `"architect" > "build" > "options"`:
```json
"stylePreprocessorOptions": {
  "includePaths": ["node_modules"]
},
```

---

## 5. Configure `angular.json` for Production

Under `"configurations" > "production"`:
```json
{
  "outputHashing": "all",
  "budgets": [
    { "type": "initial", "maximumWarning": "600kb", "maximumError": "1mb" },
    { "type": "anyComponentStyle", "maximumWarning": "8kb", "maximumError": "16kb" }
  ]
}
```

---

## 6. Create Feature Folder Structure

```bash
# Core
mkdir -p src/app/core/{data,models,services}

# Shared
mkdir -p src/app/shared/components/{nav-header,footer,page-hero,club-card}

# Features
for feature in landing clubs about contact faq not-found; do
  mkdir -p src/app/features/$feature/components
done

# Specific sub-components
mkdir -p src/app/features/landing/components/{hero-section,featured-clubs,stats-bar}
mkdir -p src/app/features/clubs/components/{clubs-listing,club-detail}
mkdir -p src/app/features/about/components/{mission-section,team-section}
mkdir -p src/app/features/contact/components/{contact-form,contact-info}
mkdir -p src/app/features/faq/components/faq-list
```

---

## 7. Run Development Server

```bash
ng serve --open
# → http://localhost:4200
```

---

## 8. Run Tests

```bash
# Unit tests (Jest — configure jest-preset-angular first)
npx jest

# Or if using Angular testing defaults:
ng test
```

**To add Jest**:
```bash
npm install --save-dev jest jest-preset-angular @types/jest
```

`jest.config.js`:
```js
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterFramework: ['./setup-jest.ts']
};
```

`setup-jest.ts`:
```typescript
import 'jest-preset-angular/setup-jest';
```

---

## 9. Production Build

```bash
ng build --configuration production
# Output: dist/sports-club-website/browser/
```

Verify output is purely static:
```bash
ls dist/sports-club-website/browser/
# Should show: index.html, main-[hash].js, polyfills-[hash].js, styles-[hash].css, assets/
```

---

## 10. Static Deployment

### Azure Static Web Apps

1. Create `staticwebapp.config.json` at project root:
   ```json
   {
     "navigationFallback": {
       "rewrite": "/index.html",
       "exclude": ["/assets/*", "/*.{css,js,ico,png,svg}"]
     }
   }
   ```
2. Deploy `dist/sports-club-website/browser/` as the app folder.

### GitHub Pages

```bash
npx angular-cli-ghpages --dir dist/sports-club-website/browser
```

Or set `"outputPath": "docs"` in `angular.json` and enable GitHub Pages from `docs/` folder.

### Netlify / Vercel

Set build command: `ng build --configuration production`
Set publish directory: `dist/sports-club-website/browser`
Add redirect rule: `/* /index.html 200`

---

## 11. Linting & Formatting

```bash
# ESLint
ng lint

# Prettier
npx prettier --write "src/**/*.{ts,html,less}"
```

`.eslintrc.json` — verified `@angular-eslint` ruleset applies to all `*.ts` and `*.html` files.
`.prettierrc`:
```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "semi": true
}
```

---

## Key URLs During Development

| URL | Page |
|---|---|
| `http://localhost:4200/` | Landing page |
| `http://localhost:4200/clubs` | Clubs listing |
| `http://localhost:4200/clubs/city-football-fc` | Football club detail |
| `http://localhost:4200/about` | About page |
| `http://localhost:4200/contact` | Contact page |
| `http://localhost:4200/faq` | FAQ page |
| `http://localhost:4200/clubs/unknown-id` | Club not-found inline state |
| `http://localhost:4200/anything-else` | 404 page |
