from .base import *
import dj_database_url
from decouple import config

DEBUG = config('DEBUG', default=False, cast=bool)

ALLOWED_HOSTS = csv_config('ALLOWED_HOSTS', default='.onrender.com,.vercel.app')

CORS_ALLOWED_ORIGINS = csv_config('CORS_ALLOWED_ORIGINS', default='https://grid-nest.vercel.app')
CORS_ALLOWED_ORIGIN_REGEXES = csv_config('CORS_ALLOWED_ORIGIN_REGEXES', default=r'https://.*\.vercel\.app')
CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = csv_config('CSRF_TRUSTED_ORIGINS', default='https://grid-nest.vercel.app')

DATABASES = {
    'default': dj_database_url.config(
        default=config('DATABASE_URL', default='sqlite:///' + str(BASE_DIR / 'db.sqlite3'))
    )
}
