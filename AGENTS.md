# AGENTS.md — ForgeUI Design System

> This file is the single source of truth for any AI IDE working on this project.
> Read this entire file before making ANY change to the codebase.

---

## What is ForgeUI?

ForgeUI is an open-source design system and component library with two parts:

1. **Component Library** — 14 production-grade React components (TypeScript, Framer Motion,
   WCAG 2.1 accessible) located in `/frontend/components/forge/`

2. **Live Docs Site** — A Next.js 15 App Router website at `forgeui.dev` where every
   component is interactively documented with live preview, code copy, props table,
   and a token/motion explorer

3. **Django Backend** — REST API for user auth (JWT), component bookmarking, and
   custom theme config persistence

---

## Repository Layout

```
forgeui/
├── frontend/      → Next.js 15 App (TypeScript, Tailwind, Framer Motion)
├── backend/       → Django 5 REST API (PostgreSQL, SimpleJWT)
```

---

## Rules — Never Violate These

### General
- Commit after every completed phase. Message format: `feat: phase X — description`
- Never hardcode color values. Always use CSS custom properties from `styles/tokens.css`
- Never use `any` type in TypeScript. Use `unknown` and narrow it
- Never write inline styles except for dynamic values that can't use Tailwind
- All environment variables: frontend uses `NEXT_PUBLIC_` prefix, backend uses python-decouple

### Frontend — Component Rules
- Every ForgeUI component lives in `/frontend/components/forge/ComponentName/`
- Required files per component: `ComponentName.tsx`, `ComponentName.types.ts`, `index.ts`
- Every component MUST use `forwardRef`
- Every component MUST accept and merge `className` prop using `clsx` + `tailwind-merge`
- Use `class-variance-authority (CVA)` for variant management — no manual ternary chains
- Animation variants MUST be imported from `lib/motion.ts` — not defined inline
- All interactive components need `focus-visible` ring using `--forge-accent` color
- Respect `prefers-reduced-motion` — wrap all motion in a check or use `useReducedMotion()`
- Never use `useEffect` for data that can be derived from props or state

### Frontend — Architecture Rules
- `app/` directory handles routing ONLY — no business logic in page files
- All API calls go through `lib/api.ts` (Axios instance with JWT interceptors)
- Zustand store in `store/useForgeStore.ts` for: saved components, theme preferences
- Never import a `forge/` component from another `forge/` component (no circular deps)
- Use `next/font/google` for font loading — never a `<link>` tag in head

### Backend — Django Rules
- Use class-based views: `APIView` or `ModelViewSet` — no function-based views
- All serializers must have explicit `fields` list — never use `fields = '__all__'`
- Validate all user input in serializers — never trust raw request.data in views
- All endpoints that return user data MUST filter by `request.user`
- Use `python-decouple` for all settings — never hardcode secrets in settings files
- Settings split: `base.py`, `development.py`, `production.py`

---

## Component Checklist (build in this order)

| # | Component | Status |
|---|---|---|
| 1 | Button | [x] |
| 2 | Badge | [x] |
| 3 | Avatar | [x] |
| 4 | Skeleton | [x] |
| 5 | Progress | [x] |
| 6 | Toggle | [x] |
| 7 | Input | [x] |
| 8 | Tooltip | [x] |
| 9 | Dropdown | [x] |
| 10 | Tabs | [x] |
| 11 | Accordion | [x] |
| 12 | Card | [x] |
| 13 | Toast | [x] |
| 14 | Modal | [x] |

---

## Design Token Reference

All tokens are defined in `/frontend/styles/tokens.css` as CSS custom properties.
Tailwind utilities map to these tokens via `tailwind.config.ts`.

**Key token groups:**
- `--forge-bg`, `--forge-surface`, `--forge-surface-2` — backgrounds
- `--forge-accent`, `--forge-accent-hover`, `--forge-accent-subtle` — brand color
- `--forge-text-primary`, `--forge-text-secondary`, `--forge-text-muted` — text
- `--forge-border`, `--forge-border-hover` — borders
- `--forge-radius-*` — border radius scale
- `--forge-shadow-*` — shadow definitions
- `--forge-duration-*`, `--forge-ease-*` — motion constants

---

## API Endpoints Summary

```
POST   /api/auth/register/
POST   /api/auth/login/
POST   /api/auth/token/refresh/
GET    /api/auth/me/
PATCH  /api/auth/me/

GET    /api/components/
GET    /api/components/:slug/

GET    /api/saved/
POST   /api/saved/
DELETE /api/saved/:id/

GET    /api/themes/
POST   /api/themes/
PATCH  /api/themes/:id/
DELETE /api/themes/:id/
```

---

## Motion System

All animation variants are in `lib/motion.ts`. Available exports:
- `fadeUp` — opacity + y translate reveal
- `staggerContainer` — wrapper for staggered children
- `clipReveal` — horizontal clip-path text/element reveal
- `scaleIn` — scale + opacity entrance
- `magneticHover` — subtle scale on hover

Usage pattern:
```tsx
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

<motion.section variants={staggerContainer} initial="hidden" animate="visible">
  <motion.h1 variants={fadeUp}>Title</motion.h1>
  <motion.p variants={fadeUp}>Subtitle</motion.p>
</motion.section>
```

---

## Deployment

- Frontend → Vercel (auto-deploy on push to `main`)
- Backend → Railway (auto-deploy on push to `main`)
- Env var `NEXT_PUBLIC_API_URL` must point to Railway backend URL
- Run `python manage.py migrate` after every model change in production

---

## Phase Map (current progress tracker)

- [x] Phase 1 — Scaffolding
- [x] Phase 2 — Tokens + global styles
- [x] Phase 3 — Component library (14 components)
- [x] Phase 4 — Django backend
- [ ] Phase 5 — Docs site
- [ ] Phase 6 — Auth + Dashboard
- [ ] Phase 7 — Polish + deploy
