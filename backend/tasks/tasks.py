
from celery_config import celery
from services.full_pipeline import run_full_pipeline
from services.config import GCS_BUCKET_NAME
from google.cloud import storage
import json

@celery.task(bind=True)
def generate_report_task(self, company_name, industry, document_paths):
    """
    Asynchronously generates an AI-powered startup report.
    First generates a detailed tier 2 report, then creates a teaser summary.
    """
    try:
        # Run AI pipeline to generate the tier 2 report
        tier2_result = run_full_pipeline(company_name, industry, document_paths)

        # Generate teaser summary from tier 2 report
        teaser_result = {
            "executive_summary": tier2_result.get("executive_summary", "")[:500],  # Truncated summary
            "key_highlights": {
                "market_opportunity": tier2_result.get("market_opportunity", {}).get("summary", ""),
                "competitive_position": tier2_result.get("competitive_analysis", {}).get("summary", ""),
                "recommendation": tier2_result.get("final_recommendations", "")[:200]  # Truncated recommendation
            }
        }

        # Save both reports to Google Cloud Storage
        storage_client = storage.Client()
        bucket = storage_client.bucket(GCS_BUCKET_NAME)

        # Store tier 2 report
        tier2_blob = bucket.blob(f"reports/{company_name}_tier2_report.json")
        tier2_blob.upload_from_string(
            json.dumps(tier2_result),
            content_type="application/json"
        )

        # Store teaser report
        teaser_blob = bucket.blob(f"reports/{company_name}_teaser_report.json")
        teaser_blob.upload_from_string(
            json.dumps(teaser_result),
            content_type="application/json"
        )

        return {
            "status": "completed",
            "tier2_url": tier2_blob.public_url,
            "teaser_url": teaser_blob.public_url,
            "tier2_report": tier2_result,
            "teaser_report": teaser_result
        }

    except Exception as e:
        return {"status": "failed", "error": str(e)}

