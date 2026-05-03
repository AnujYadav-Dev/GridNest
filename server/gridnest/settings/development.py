from .base import *

DEBUG = True

ALLOWED_HOSTS = csv_config('ALLOWED_HOSTS', default='localhost,127.0.0.1,0.0.0.0')

CORS_ALLOWED_ORIGINS = csv_config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:3000,http://127.0.0.1:3000,https://grid-nest.vercel.app',
)
CORS_ALLOWED_ORIGIN_REGEXES = csv_config(
    'CORS_ALLOWED_ORIGIN_REGEXES',
    default=r'https://.*\.vercel\.app',
)
CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = csv_config(
    'CSRF_TRUSTED_ORIGINS',
    default='http://localhost:3000,http://127.0.0.1:3000,https://grid-nest.vercel.app',
)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
