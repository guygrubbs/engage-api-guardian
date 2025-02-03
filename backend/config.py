import os
from dotenv import load_dotenv

# Load environment variables from a .env file (for local development)
load_dotenv()

# ------------- GOOGLE CLOUD CONFIGURATION -------------
GCP_PROJECT_ID = os.getenv("GCP_PROJECT_ID", "your-gcp-project-id")
GCS_BUCKET_NAME = os.getenv("GCS_BUCKET_NAME", "your-bucket-name")
DOCUMENT_AI_PROCESSOR_ID = os.getenv("DOCUMENT_AI_PROCESSOR_ID", "your-document-ai-processor-id")

# ------------- OPENAI CONFIGURATION -------------
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "your-openai-api-key")

# ------------- CLOUD RUN SERVICE CONFIGURATION -------------
CLOUD_RUN_SERVICE_URL = os.getenv("CLOUD_RUN_SERVICE_URL", "https://your-cloud-run-service-url")

# ------------- APPLICATION CONFIGURATION -------------
DEBUG_MODE = os.getenv("DEBUG_MODE", "False").lower() == "true"
PORT = int(os.getenv("PORT", 5000))

# ------------- LOGGING CONFIGURATION -------------
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

# ------------- SECURITY SETTINGS -------------
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "*").split(",")

# ------------- PRINT CONFIGURATION ON STARTUP -------------
def print_config():
    """Prints configuration settings on startup (excluding sensitive values)."""
    print(f"\n--- CONFIGURATION SETTINGS ---")
    print(f"GCP Project ID: {GCP_PROJECT_ID}")
    print(f"GCS Bucket Name: {GCS_BUCKET_NAME}")
    print(f"Document AI Processor ID: {DOCUMENT_AI_PROCESSOR_ID}")
    print(f"Cloud Run Service URL: {CLOUD_RUN_SERVICE_URL}")
    print(f"Debug Mode: {DEBUG_MODE}")
    print(f"Log Level: {LOG_LEVEL}")
    print(f"Allowed Hosts: {ALLOWED_HOSTS}")

# Run configuration check at startup
if __name__ == "__main__":
    print_config()
