import os
from celery import Celery

# Celery Configuration
CELERY_BROKER_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
CELERY_RESULT_BACKEND = os.getenv("REDIS_URL", "redis://localhost:6379/0")

def make_celery(app_name=__name__):
    return Celery(app_name, broker=CELERY_BROKER_URL, backend=CELERY_RESULT_BACKEND)

celery = make_celery()
