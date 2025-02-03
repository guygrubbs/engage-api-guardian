import os
from celery import Celery

# Celery Configuration
CELERY_BROKER_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
CELERY_RESULT_BACKEND = os.getenv("REDIS_URL", "redis://localhost:6379/0")

celery = Celery(__name__, broker=CELERY_BROKER_URL, backend=CELERY_RESULT_BACKEND)

if __name__ == "__main__":
    os.system("celery -A celery_config.celery flower")
