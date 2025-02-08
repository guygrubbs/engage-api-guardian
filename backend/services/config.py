
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Google Cloud Configuration
GCP_PROJECT_ID = os.getenv("GCP_PROJECT_ID")
GCS_BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")
DOCUMENT_AI_PROCESSOR_ID = os.getenv("DOCUMENT_AI_PROCESSOR_ID")

# OpenAI Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Application Configuration
DEBUG_MODE = os.getenv("DEBUG_MODE", "False").lower() == "true"
PORT = int(os.getenv("PORT", 5000))

# Print configuration (excluding sensitive values)
def print_config():
    print("\n=== Configuration Settings ===")
    print(f"GCP Project ID: {GCP_PROJECT_ID}")
    print(f"GCS Bucket Name: {GCS_BUCKET_NAME}")
    print(f"Debug Mode: {DEBUG_MODE}")
    print(f"Port: {PORT}")

