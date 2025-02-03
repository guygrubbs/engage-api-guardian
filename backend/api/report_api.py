import os
from flask import Blueprint, request, jsonify
from tasks.tasks import generate_report_task
from google.cloud import storage
from services.config import GCS_BUCKET_NAME

# Create Flask Blueprint for API routes
report_api = Blueprint('report_api', __name__)

# Initialize Google Cloud Storage Client
storage_client = storage.Client()

@report_api.route('/generate_report', methods=['POST'])
def generate_report():
    """
    Asynchronously triggers AI-powered report generation.
    """
    data = request.json
    company_name = data.get("company_name")
    industry = data.get("industry")
    document_paths = data.get("document_paths", [])

    if not company_name or not industry or not document_paths:
        return jsonify({"error": "Missing required parameters"}), 400

    # Trigger Celery background job
    task = generate_report_task.apply_async(args=[company_name, industry, document_paths])

    return jsonify({"message": "Report generation started!", "task_id": task.id})

@report_api.route('/report_status/<task_id>', methods=['GET'])
def report_status(task_id):
    """
    Checks the status of a report generation job.
    """
    task = generate_report_task.AsyncResult(task_id)

    if task.state == "PENDING":
        return jsonify({"status": "pending"}), 202
    elif task.state == "SUCCESS":
        return jsonify({"status": "completed", "report_data": task.result}), 200
    elif task.state == "FAILURE":
        return jsonify({"status": "failed", "error": str(task.info)}), 500

@report_api.route('/get_report/<company_name>', methods=['GET'])
def get_report(company_name):
    """
    Retrieves a generated AI report from Google Cloud Storage.
    """
    try:
        bucket = storage_client.bucket(GCS_BUCKET_NAME)
        blob = bucket.blob(f"reports/{company_name}_report.json")

        if not blob.exists():
            return jsonify({"error": "Report not found"}), 404

        report_data = blob.download_as_text()
        return jsonify({"company_name": company_name, "report_data": report_data})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
