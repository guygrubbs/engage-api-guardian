from celery_config import celery
from services.full_pipeline import run_full_pipeline
from services.config import GCS_BUCKET_NAME
from google.cloud import storage
import json

@celery.task(bind=True)
def generate_report_task(self, company_name, industry, document_paths):
    """
    Asynchronously generates an AI-powered startup report.
    """
    try:
        # Run AI pipeline to generate the report
        result = run_full_pipeline(company_name, industry, document_paths)

        # Save report to Google Cloud Storage
        storage_client = storage.Client()
        bucket = storage_client.bucket(GCS_BUCKET_NAME)
        blob = bucket.blob(f"reports/{company_name}_report.json")

        # Store AI-generated report as a JSON file
        blob.upload_from_string(json.dumps(result), content_type="application/json")

        return {"status": "completed", "report_url": blob.public_url}

    except Exception as e:
        return {"status": "failed", "error": str(e)}
