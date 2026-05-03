# GridNest - Backend API

This is the Django-based REST API for the GridNest design system. It handles user authentication, component bookmarking, and custom theme persistence.

## 🛠 Tech Stack
- **Framework**: Django 5.x
- **API**: Django REST Framework (DRF)
- **Authentication**: JWT (SimpleJWT)
- **Database**: PostgreSQL (Production) / SQLite (Development)
- **Environment**: python-decouple
- **Deployment**: Gunicorn + Whitenoise (Railway optimized)

## 📁 Project Structure
```bash
backend/
├── apps/
│   ├── accounts/      # Custom User model, JWT Auth (Login/Register)
│   └── library/       # Components, SavedComponents, ThemeConfigs
├── gridnest/           # Project settings (Modular: base, dev, prod)
├── manage.py
├── Procfile           # Railway deployment config
└── requirements.txt
```

## 🔐 Environment Variables
Create a `.env` file in the `backend/` directory:
```env
SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgres://user:pass@localhost:5432/gridnest
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## 🚀 Local Setup

1. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run Migrations**
   ```bash
   python manage.py migrate
   ```

4. **Start Development Server**
   ```bash
   python manage.py runserver
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register/` - Create a new account
- `POST /api/auth/login/` - Get JWT tokens (access & refresh)
- `POST /api/auth/token/refresh/` - Refresh access token
- `GET /api/auth/me/` - Get current user profile

### Library & Dashboard
- `GET /api/components/` - List all components
- `GET /api/saved/` - Get user's bookmarked components
- `POST /api/saved/` - Bookmark a component
- `GET /api/themes/` - Get user's custom themes
- `POST /api/themes/` - Save a new theme configuration

## 🚢 Deployment
The backend is configured for **Railway**.
- Uses `dj-database-url` for automatic DB connection.
- Uses `Whitenoise` for static file serving.
- `Procfile` specifies the Gunicorn command.
