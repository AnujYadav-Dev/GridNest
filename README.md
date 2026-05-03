# ForgeUI — Editorial Precision meets Developer Utility

ForgeUI is a production-grade, open-source design system and component library built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion, backed by a robust Django REST API.

![ForgeUI Banner](https://raw.githubusercontent.com/AnujYadav-Dev/forgeui/main/docs/banner.png)

## 🚀 Vision
ForgeUI is designed for developers who value aesthetic precision as much as functional utility. It follows a **dark-first, typography-driven** aesthetic inspired by modern editorial design.

## ✨ Key Features
- **14 Production Components**: Accessible, typed, and animatable (Button, Input, Modal, Toast, etc.)
- **Interactive Docs**: Live preview, code playground, and detailed props documentation.
- **Design Token Explorer**: Browse and copy CSS variables for the entire system.
- **User Dashboard**: Save components, manage themes, and export custom CSS configs.
- **Motion System**: Built-in Framer Motion variants for consistent, surgical transitions.
- **Full-Stack Auth**: JWT-based authentication with auto-refreshing tokens.

## 🛠 Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Zustand, RHF + Zod.
- **Backend**: Django 5, Django REST Framework, SimpleJWT, PostgreSQL.
- **Infrastructure**: Vercel (Frontend), Railway (Backend).

## 📦 Repository Structure
```bash
forgeui/
├── frontend/          # Next.js 15 Documentation & Library
├── backend/           # Django REST API
└── AGENTS.md          # AI IDE Instructions & Design Standards
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL

### Local Development

1. **Clone the repo**
   ```bash
   git clone https://github.com/AnujYadav-Dev/forgeui.git
   cd forgeui
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Setup Backend**
   ```bash
   cd ../backend
   python -m venv venv
   source venv/bin/activate # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

## 📖 Design Standards
All components follow the standards defined in `AGENTS.md`. Key principles include:
- No hardcoded colors (always use tokens).
- `forwardRef` for all interactive elements.
- Strict TypeScript types (no `any`).
- WCAG 2.1 accessibility compliance.

## 📄 License
MIT License. Created by the ForgeUI Team.
