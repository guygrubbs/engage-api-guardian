
from flask import Flask, request, jsonify
from flask_cors import CORS
from api.report_api import report_api
from tasks.tasks import generate_report_task
import os

# Initialize Flask App
app = Flask(__name__)
CORS(app)  # Enable CORS

# Register API Blueprint
app.register_blueprint(report_api, url_prefix='/api')

@app.route('/')
def home():
    return jsonify({"message": "AI-Powered Report Generation API is running!"})

@app.route('/generate_report', methods=['POST'])
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

    return jsonify({
        "message": "Report generation started!",
        "task_id": task.id
    })

@app.route('/report_status/<task_id>', methods=['GET'])
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

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    debug_mode = os.getenv("DEBUG_MODE", "False").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug_mode)

