import os
from typing import List
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 's_-aro!sw@)bob$t8jdq!s61$+3s82y=dbe!b5y3!p4ch&y3k#'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS: List[str] = ['*']


# Application definition
PREREQUISITE_APPS = [
    'admin_interface',
    'colorfield',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'drf_yasg',
    'corsheaders',
    'rolepermissions',
    'simple_history',
    'auditlog',
    'rest_framework',
    'rest_framework_simplejwt',
    'celery',
    'bootstrap5',
    'filebrowser',
]

PROJECT_APPS = [
    'myapp.apps.MyappConfig',
]

INSTALLED_APPS = PREREQUISITE_APPS + PROJECT_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'src_config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['./templates', './base_templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'builtins': [
                'src_config.filters'
            ]
        },
    },
]

WSGI_APPLICATION = 'src_config.wsgi.application'

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ.get("DB_NAME"),
        'USER': os.environ.get("DB_USER"),
        'PASSWORD': os.environ.get("DB_PASSWORD"),
        'HOST': os.environ.get("DB_HOST"),
        'PORT': os.environ.get("DB_PORT"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', # noqa : E501
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', # noqa : E501
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', # noqa : E501
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', # noqa : E501
    },
]
# Add Role Permissions "Cargos"
ROLEPERMISSIONS_MODULE = 'src_config.roles'

ROLEPERMISSIONS_REDIRECT_TO_LOGIN = True

ROLEPERMISSIONS_REGISTER_ADMIN = True

# django admin interface template

X_FRAME_OPTIONS = "SAMEORIGIN"
SILENCED_SYSTEM_CHECKS = ["security.W019"]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGES = (
    ('pt-br', u'Português'),
    ('en', u'Inglês'),
)
LOCALE_PATHS = [
    BASE_DIR / 'locale',
]

LANGUAGE_CODE = 'pt-br'
USE_I18N = True

TIME_ZONE = 'America/Sao_Paulo'
USE_TZ = True

DECIMAL_SEPARATOR = ','
THOUSAND_SEPARATOR = '.'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/media/'

CELERY_BROKER_URL = 'redis://redis:6379/0'
CELERY_RESULT_BACKEND = 'redis://redis:6379/0'

STATIC_ROOT = './static/'
MEDIA_ROOT = './media/'


REST_API_AUTH = False

# Settings specific for filebrowser
FILEBROWSER_DIRECTORY = 'media/uploads/'
FILEBROWSER_EXTENSIONS = {
    'XML': ['.xml'],
    'XSL': ['.xsl'],
    'JPG': ['.jpg'],
    'PNG': ['.png'],
    'GIF': ['.gif'],
    'TTF': ['.ttf'],
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO'),
        },
        'celery': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO'),
        },
    },
}

try:
    from .local_settings import * # noqa : F403,F401
except ImportError:
    print('No Local Settings Found')
