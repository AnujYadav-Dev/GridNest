# ForgeUI - Design System + Component Library with Live Docs Site
## Complete Phase-wise Implementation Plan for AI IDE

---

## Project Vision

**ForgeUI** is a production-grade, open-source design system and component library built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and a Django REST backend. It ships a live documentation site where every component is interactive, animatable, and copy-paste ready - paired with a registered-user dashboard that tracks saved components, custom themes, and usage history.

The aesthetic direction: **Editorial Precision meets Developer Utility** - like if Linear and Radix UI had a design system baby. Dark-first, monospaced accents, surgical motion, generous whitespace, typographic hierarchy as the primary design tool.

**Live URL target:** `forgeui.dev` (or subdomain)
**GitHub:** Public repo, MIT licensed
**Recruitment signal:** Figma source file + live site + Django API + npm-publishable structure

---

## Tech Stack

### Frontend
| Tool | Version | Purpose |
|---|---|---|
| Next.js | 15 (App Router) | Framework, routing, SSR |
| TypeScript | 5.x | Type safety across all components |
| Tailwind CSS | 3.x | Utility styling, design tokens |
| Framer Motion | 11.x | All animations and transitions |
| GSAP + ScrollTrigger | 3.x | Scroll-linked hero and section animations |
| Shadcn/ui (base) | latest | Radix primitive base, then fully reskinned |
| Prism.js / Shiki | latest | Syntax highlighting in code blocks |
| next-themes | latest | Dark/Light/System theme switching |
| Zustand | 4.x | Client state (theme config, saved components) |
| React Hook Form + Zod | latest | Auth forms with full validation |

### Backend
| Tool | Version | Purpose |
|---|---|---|
| Django | 5.x | REST API framework |
| Django REST Framework | 3.x | API serializers, viewsets, routers |
| SimpleJWT | latest | JWT authentication (access + refresh tokens) |
| PostgreSQL | 16 | Primary database |
| django-cors-headers | latest | CORS for Next.js frontend |
| dj-database-url | latest | DB config from environment |
| Whitenoise | latest | Static file serving |
| python-decouple | latest | Environment variable management |

### DevOps & Tooling
| Tool | Purpose |
|---|---|
| Vercel | Frontend deployment |
| Railway / Render | Django backend deployment |
| GitHub Actions | CI for lint + type check on PR |
| ESLint + Prettier | Code quality |
| Husky + lint-staged | Pre-commit hooks |
| Figma | Full design source file |

---

## Folder Structure

```
forgeui/
├── frontend/                          # Next.js 15 App
│   ├── app/
│   │   ├── (docs)/                    # Route group: public docs
│   │   │   ├── layout.tsx             # Docs layout (sidebar + topnav)
│   │   │   ├── page.tsx               # Landing / Hero
│   │   │   ├── components/
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx       # Dynamic component doc page
│   │   │   │   └── page.tsx           # All components overview
│   │   │   ├── tokens/
│   │   │   │   └── page.tsx           # Design tokens explorer
│   │   │   └── motion/
│   │   │       └── page.tsx           # Motion / animation guide
│   │   ├── (auth)/                    # Route group: auth pages
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── dashboard/                 # Protected user dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx               # Dashboard home
│   │   │   ├── saved/page.tsx         # Saved components
│   │   │   └── themes/page.tsx        # Custom theme builder
│   │   ├── api/                       # Next.js route handlers (proxy to Django)
│   │   │   └── [...path]/route.ts
│   │   ├── globals.css
│   │   └── layout.tsx                 # Root layout
│   ├── components/
│   │   ├── forge/                     # ForgeUI component library (the product)
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Toast/
│   │   │   ├── Badge/
│   │   │   ├── Tabs/
│   │   │   ├── Accordion/
│   │   │   ├── Card/
│   │   │   ├── Dropdown/
│   │   │   ├── Toggle/
│   │   │   ├── Avatar/
│   │   │   ├── Tooltip/
│   │   │   ├── Skeleton/
│   │   │   ├── Progress/
│   │   │   └── index.ts               # Barrel export
│   │   ├── docs/                      # Docs site UI components
│   │   │   ├── ComponentPreview.tsx   # Live preview + code tab switcher
│   │   │   ├── CodeBlock.tsx          # Syntax highlighted code block
│   │   │   ├── PropsTable.tsx         # Component props documentation
│   │   │   ├── Sidebar.tsx            # Docs navigation sidebar
│   │   │   ├── ThemeSwitcher.tsx      # Dark/Light toggle
│   │   │   └── SearchPalette.tsx      # Cmd+K component search
│   │   └── ui/                        # Layout/shared UI
│   │       ├── Navbar.tsx
│   │       ├── Footer.tsx
│   │       └── AnimatedLayout.tsx
│   ├── lib/
│   │   ├── api.ts                     # Axios instance with JWT interceptors
│   │   ├── auth.ts                    # Auth helpers
│   │   ├── tokens.ts                  # Design token definitions (JS)
│   │   └── motion.ts                  # Shared Framer Motion variants
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useTheme.ts
│   │   └── useCopyToClipboard.ts
│   ├── store/
│   │   └── useForgeStore.ts           # Zustand: saved components, theme prefs
│   ├── styles/
│   │   ├── tokens.css                 # CSS custom properties (design tokens)
│   │   └── animations.css             # Keyframe definitions
│   └── types/
│       ├── component.types.ts
│       └── auth.types.ts
│
├── backend/                           # Django REST API
│   ├── forgeui/                       # Django project
│   │   ├── settings/
│   │   │   ├── base.py
│   │   │   ├── development.py
│   │   │   └── production.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── apps/
│   │   ├── accounts/                  # User auth app
│   │   │   ├── models.py              # CustomUser model
│   │   │   ├── serializers.py
│   │   │   ├── views.py               # Register, Login, Profile
│   │   │   └── urls.py
│   │   └── library/                   # Component library app
│   │       ├── models.py              # Component, SavedComponent, ThemeConfig
│   │       ├── serializers.py
│   │       ├── views.py               # CRUD for saved components + themes
│   │       └── urls.py
│   ├── requirements.txt
│   ├── manage.py
│   └── .env.example
│
├── figma/                             # Design source
│   └── ForgeUI_DesignSystem.fig       # Figma export or link in README
│
├── .github/
│   └── workflows/
│       └── ci.yml                     # Lint + typecheck on PR
├── README.md
└── AGENTS.md                          # AI IDE instruction file
```

---

## Design System Tokens (CSS + JS)

```css
/* styles/tokens.css */
:root {
  /* Color - Base */
  --forge-bg:           #0A0A0B;
  --forge-surface:      #111113;
  --forge-surface-2:    #1A1A1E;
  --forge-border:       #2A2A2E;
  --forge-border-hover: #3A3A3E;

  /* Color - Text */
  --forge-text-primary:   #F0F0F2;
  --forge-text-secondary: #8A8A92;
  --forge-text-muted:     #4A4A52;

  /* Color - Accent */
  --forge-accent:         #6366F1;   /* Indigo - primary brand */
  --forge-accent-hover:   #818CF8;
  --forge-accent-subtle:  #6366F120;
  --forge-success:        #22C55E;
  --forge-warning:        #F59E0B;
  --forge-danger:         #EF4444;

  /* Typography */
  --forge-font-sans:  'Syne', sans-serif;        /* Display headings */
  --forge-font-body:  'DM Sans', sans-serif;      /* Body text */
  --forge-font-mono:  'JetBrains Mono', monospace; /* Code blocks */

  /* Spacing scale */
  --forge-space-1: 4px;
  --forge-space-2: 8px;
  --forge-space-3: 12px;
  --forge-space-4: 16px;
  --forge-space-6: 24px;
  --forge-space-8: 32px;
  --forge-space-12: 48px;
  --forge-space-16: 64px;

  /* Radius */
  --forge-radius-sm: 4px;
  --forge-radius-md: 8px;
  --forge-radius-lg: 12px;
  --forge-radius-xl: 16px;
  --forge-radius-full: 9999px;

  /* Shadow */
  --forge-shadow-sm: 0 1px 3px rgba(0,0,0,0.4);
  --forge-shadow-md: 0 4px 16px rgba(0,0,0,0.5);
  --forge-shadow-glow: 0 0 24px rgba(99,102,241,0.2);

  /* Motion */
  --forge-duration-fast:   150ms;
  --forge-duration-normal: 250ms;
  --forge-duration-slow:   400ms;
  --forge-ease-out:   cubic-bezier(0.16, 1, 0.3, 1);
  --forge-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## Shared Framer Motion Variants

```typescript
// lib/motion.ts
import { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}

export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
  }
}

export const magneticHover = {
  rest: { x: 0, y: 0 },
  hover: { scale: 1.04, transition: { duration: 0.2 } }
}
```

---

## Django Models

```python
# apps/accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    bio = models.TextField(blank=True)
    avatar_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username


# apps/library/models.py
class Component(models.Model):
    """Seeded component metadata - read-only from frontend"""
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    description = models.TextField()
    is_new = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class SavedComponent(models.Model):
    """User bookmarks a component"""
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='saved_components')
    component = models.ForeignKey(Component, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'component')

    def __str__(self):
        return f"{self.user.username} → {self.component.name}"


class ThemeConfig(models.Model):
    """User-saved custom theme configurations"""
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='themes')
    name = models.CharField(max_length=100)
    config = models.JSONField()   # stores full token overrides as JSON
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.name}"
```

---

## Django API Endpoints

```
AUTH
POST   /api/auth/register/          → Create account
POST   /api/auth/login/             → JWT token pair
POST   /api/auth/token/refresh/     → Refresh access token
GET    /api/auth/me/                → Authenticated user profile
PATCH  /api/auth/me/                → Update profile

LIBRARY
GET    /api/components/             → List all components (public)
GET    /api/components/:slug/       → Single component metadata (public)

DASHBOARD (authenticated)
GET    /api/saved/                  → User's saved components
POST   /api/saved/                  → Save a component
DELETE /api/saved/:id/              → Unsave a component

GET    /api/themes/                 → User's saved themes
POST   /api/themes/                 → Create theme config
PATCH  /api/themes/:id/             → Update theme
DELETE /api/themes/:id/             → Delete theme
```

---

# PHASE-WISE IMPLEMENTATION PLAN

---

## PHASE 1 - Project Scaffolding
**Output: Both repos initialized, env vars set, deployments connected**

### Frontend Setup
```bash
cd forgeui-frontend

# Install all dependencies
npm install framer-motion gsap @gsap/react next-themes zustand \
  axios react-hook-form zod @hookform/resolvers \
  class-variance-authority clsx tailwind-merge \
  @radix-ui/react-dialog @radix-ui/react-tabs \
  @radix-ui/react-accordion @radix-ui/react-tooltip \
  @radix-ui/react-dropdown-menu @radix-ui/react-toggle \
  shiki lucide-react

npm install -D @types/node prettier eslint-config-prettier \
  husky lint-staged
```

### Backend Setup
```bash
python -m venv venv && source venv/bin/activate

pip install django djangorestframework djangorestframework-simplejwt \
  django-cors-headers psycopg2-binary dj-database-url \
  whitenoise python-decouple gunicorn

django-admin startproject forgeui .
python manage.py startapp accounts
python manage.py startapp library
```

### AI IDE Instruction - AGENTS.md
```markdown
# AGENTS.md - ForgeUI

## Project Overview
ForgeUI is a design system + component library with a live Next.js 15 docs site
and a Django REST backend. Read this file before making any changes.

## Repository Structure
- /frontend - Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion
- /backend  - Django 5 REST API with SimpleJWT auth and PostgreSQL

## Coding Rules
1. ALL components live in /frontend/components/forge/
2. Every ForgeUI component MUST have: default export, TypeScript props interface,
   forwardRef support, and className override via clsx/tailwind-merge
3. Use CSS custom properties from styles/tokens.css - never hardcode colors
4. Animation variants go in lib/motion.ts - never define inline in components
5. All API calls go through lib/api.ts (Axios instance with JWT interceptors)
6. Django views use class-based APIView or ModelViewSet - no function views
7. All Django serializers must validate on create/update - never trust raw data
8. Environment variables: frontend uses NEXT_PUBLIC_ prefix, backend uses python-decouple

## Component Structure
Each component in /components/forge/ComponentName/ must contain:
- ComponentName.tsx     → implementation
- ComponentName.types.ts → prop types interface
- index.ts              → re-export

## Git Commit Convention
feat: / fix: / docs: / style: / refactor: / chore:
Commit after every completed phase checkpoint.
```

---

## PHASE 2 - Design Tokens + Global Styles
**Output: Token CSS file, Tailwind config extended, font setup**

### Tasks
- [ ] Copy full `tokens.css` from Phase 0 Figma into `styles/tokens.css`
- [ ] Import fonts from Google Fonts (Syne, DM Sans, JetBrains Mono) in `app/layout.tsx`
- [ ] Extend `tailwind.config.ts` to map CSS variables as Tailwind color/font utilities
- [ ] Set up `next-themes` ThemeProvider in root layout
- [ ] Create `styles/animations.css` with global keyframes (shimmer, pulse, spin)
- [ ] Test dark/light switch works at root level

```typescript
// tailwind.config.ts (extension)
theme: {
  extend: {
    colors: {
      'forge-bg': 'var(--forge-bg)',
      'forge-surface': 'var(--forge-surface)',
      'forge-accent': 'var(--forge-accent)',
      'forge-text': 'var(--forge-text-primary)',
      'forge-muted': 'var(--forge-text-muted)',
      'forge-border': 'var(--forge-border)',
    },
    fontFamily: {
      sans: ['var(--forge-font-sans)'],
      body: ['var(--forge-font-body)'],
      mono: ['var(--forge-font-mono)'],
    },
    transitionTimingFunction: {
      'forge-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      'forge-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    }
  }
}
```

---

## PHASE 3 - ForgeUI Component Library (The Core Product)
**Output: All 14 components built, typed, animated, accessible**

### Component Implementation Order
Build in this exact order (each builds on the previous):

1. **Button** - variants (primary, secondary, ghost, danger), sizes (sm/md/lg), loading state with spinner animation, disabled state, icon support (left/right)
2. **Badge** - color variants, dot indicator, animated pulse for "live" variant
3. **Avatar** - image with fallback initials, size variants, status indicator dot
4. **Skeleton** - shimmer animation, variants (text, circle, rectangle), composable
5. **Progress** - determinate + indeterminate, animated fill, color variants
6. **Toggle** - spring-physics animation on switch, accessible label, size variants
7. **Input** - label, helper text, error state, icon adornment, focus ring animation
8. **Tooltip** - Radix primitive, custom styled, appear/disappear animation
9. **Dropdown** - Radix primitive, animated open/close with Framer Motion
10. **Tabs** - animated underline indicator, keyboard navigation, vertical option
11. **Accordion** - spring-based expand/collapse, multiple/single mode
12. **Card** - variants (default, elevated, bordered, interactive hover)
13. **Toast** - slide-in from bottom-right, auto-dismiss with progress bar, variants
14. **Modal** - backdrop blur, scale + fade animation, focus trap, Radix portal

### Component Template
```typescript
// components/forge/Button/Button.tsx
'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonProps } from './Button.types'

const buttonVariants = cva(
  // base styles
  'inline-flex items-center justify-center gap-2 rounded-[var(--forge-radius-md)] font-body font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-accent)] disabled:opacity-40 disabled:pointer-events-none select-none',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--forge-accent)] text-white hover:bg-[var(--forge-accent-hover)] shadow-[var(--forge-shadow-glow)]',
        secondary: 'bg-[var(--forge-surface-2)] text-[var(--forge-text-primary)] border border-[var(--forge-border)] hover:border-[var(--forge-border-hover)]',
        ghost: 'text-[var(--forge-text-secondary)] hover:bg-[var(--forge-surface-2)] hover:text-[var(--forge-text-primary)]',
        danger: 'bg-[var(--forge-danger)] text-white hover:opacity-90',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      }
    },
    defaultVariants: { variant: 'primary', size: 'md' }
  }
)

const Button = forwardRef<HTMLButtonElement, ButtonProps & VariantProps<typeof buttonVariants>>(
  ({ className, variant, size, loading, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={twMerge(clsx(buttonVariants({ variant, size }), className))}
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -1 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Spinner size={size} />}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
export default Button
```

---

## PHASE 4 - Django Backend
**Output: Full REST API deployed on Railway, all endpoints working**

### 4.1 - Settings & Config
```python
# forgeui/settings/base.py - key additions
AUTH_USER_MODEL = 'accounts.CustomUser'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://forgeui.vercel.app",
]
```

### 4.2 - Accounts App (Register + Login + Profile)
```python
# apps/accounts/views.py
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import RegisterSerializer, UserProfileSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

### 4.3 - Library App (Saved + Themes)
```python
# apps/library/views.py
from rest_framework import viewsets, permissions
from .models import SavedComponent, ThemeConfig
from .serializers import SavedComponentSerializer, ThemeConfigSerializer

class SavedComponentViewSet(viewsets.ModelViewSet):
    serializer_class = SavedComponentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedComponent.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ThemeConfigViewSet(viewsets.ModelViewSet):
    serializer_class = ThemeConfigSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ThemeConfig.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
```

### 4.4 - Deploy to Railway
```bash
# Procfile
web: gunicorn forgeui.wsgi --bind 0.0.0.0:$PORT

# requirements.txt must include
gunicorn
whitenoise
dj-database-url
psycopg2-binary
```

---

## PHASE 5 - Docs Site (The Showpiece)
**Output: Complete, animated, live documentation site**

### 5.1 - Hero Section
```
Layout: Full viewport height
Left: Large typographic headline with clip-path word reveal (GSAP)
Right: Animated component preview - Button group cycling through variants
Background: Subtle grid pattern + floating orb gradients (CSS)
CTA: "Explore Components" → scrolls to component grid
    "View on GitHub" → external link
Animation sequence:
  1. Grid fades in (opacity 0→1, 800ms)
  2. Headline words reveal left→right with clip-path (staggered, 100ms apart)
  3. Subtitle fades up (delay 600ms)
  4. CTA buttons scale in (delay 900ms)
  5. Component preview slides in from right (delay 400ms)
```

### 5.2 - Component Grid Page (`/components`)
```
Layout: 2-column sidebar + main content
Sidebar: Category filter (All, Form, Display, Feedback, Navigation)
Main: Masonry-style component cards
Each card shows: component name, live mini-preview, "New" badge if flagged
Hover: card lifts with shadow, accent border appears
Click: navigates to /components/[slug]
Cmd+K: opens SearchPalette with fuzzy search across all components
```

### 5.3 - Individual Component Page (`/components/[slug]`)
```
Sections per page:
1. Header - Component name + description + "Copy import" button
2. Preview Panel - Live interactive demo with variant switcher
3. Code Block - Syntax highlighted, copy button, tab switch (Preview / Code)
4. Props Table - Name | Type | Default | Description (all typed)
5. Variants Gallery - Visual grid of all states
6. Accessibility Notes - ARIA roles, keyboard shortcuts used
7. Related Components - Cards linking to similar ones
```

### 5.4 - ComponentPreview Component
```typescript
// This is the most important docs component
// It renders:
// - A live interactive demo of the ForgeUI component
// - A tab switcher (Preview | Code)
// - Copy-to-clipboard button
// - Variant selector controls (radio/select inputs that update the preview)
// - Dark/Light preview toggle independent of global theme
// - Resize handle to test responsiveness
```

### 5.5 - Token Explorer Page (`/tokens`)
```
Sections:
1. Color Tokens - Swatches grid, click to copy hex/var name
2. Typography Scale - Live text samples at each size
3. Spacing Scale - Visual ruler showing each space value
4. Radius Tokens - Rectangle previews showing border-radius
5. Shadow Tokens - Cards with each shadow applied
6. Motion Tokens - Animated demo of each easing curve
All tokens: click to copy → Toast confirmation
```

### 5.6 - Motion Guide Page (`/motion`)
```
Content:
1. Philosophy section - "Motion should be felt, not seen"
2. Easing Curves - Animated balls demonstrating each curve
3. Duration Guide - Same animation at fast/normal/slow speeds
4. Variants Gallery - All shared motion variants from lib/motion.ts shown live
5. Usage Examples - Code + preview for fadeUp, clipReveal, staggerContainer
6. Do / Don't - Side by side comparison of good vs bad motion
```

---

## PHASE 6 - Auth + Dashboard
**Output: Protected user dashboard with saved components and theme builder**

### 6.1 - Auth Flow
```
/login  → JWT login form → stores access/refresh in httpOnly cookie via Next.js route handler
/register → registration form with Zod validation → auto-login on success
Middleware → protects /dashboard/* routes, redirects to /login
Token refresh → Axios interceptor handles 401 → auto-refresh → retry request
```

### 6.2 - Dashboard Pages
```
/dashboard         → Welcome + stats (X components saved, X themes created)
/dashboard/saved   → Grid of saved components with unsave button
/dashboard/themes  → Theme config list + "New Theme" button

Theme Builder UI:
- Color pickers for each token (accent, bg, surface, text)
- Live preview panel showing Button + Card + Badge with selected tokens
- Save → POST /api/themes/ with JSON config
- Export as CSS → generates and downloads tokens.css with overrides
```

---

## PHASE 7 - Polish, Performance, Deploy

### 7.1 - Performance Checklist
- [ ] All ForgeUI components use dynamic import where appropriate
- [ ] Images use next/image with proper sizing
- [ ] Fonts loaded with `next/font/google` (no layout shift)
- [ ] Lighthouse score target: Performance 90+, Accessibility 95+, Best Practices 100
- [ ] Bundle analyzer run - remove any unused deps

### 7.2 - Animation Polish Pass
- [ ] All page transitions use `AnimatePresence` with exit animations
- [ ] Scroll-triggered animations use `useInView` from Framer Motion (not GSAP unless hero)
- [ ] No animation runs if `prefers-reduced-motion` is set (respect OS setting)
- [ ] Custom cursor on desktop (dot that follows with spring physics)

### 7.3 - Deployment
```
Frontend → Vercel
  - Connect GitHub repo → auto-deploy on push to main
  - Set env: NEXT_PUBLIC_API_URL=https://forgeui-api.railway.app

Backend → Railway
  - Connect GitHub repo → auto-deploy
  - Add PostgreSQL plugin
  - Set env: SECRET_KEY, DEBUG=False, ALLOWED_HOSTS, DATABASE_URL, CORS_ALLOWED_ORIGINS

Domain → forgeui.dev (or forgeui.vercel.app)
```

### 7.4 - README Quality
```
README must include:
1. Project banner (screenshot of homepage)
2. Tech stack badges
3. Live URL link
4. Feature list with screenshots
5. Local development setup (step by step)
6. API documentation summary
7. Contributing guide
8. License (MIT)
```

---


