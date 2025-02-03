import os
import time
from google.cloud import storage, documentai
from google.api_core.exceptions import GoogleAPIError

# Load GCP Configuration
GCP_PROJECT_ID = os.getenv("GCP_PROJECT_ID")
GCS_BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")
PROCESSOR_ID = os.getenv("DOCUMENT_AI_PROCESSOR_ID")  # Needs to be set in env variables

class DocumentProcessorAgent:
    def __init__(self, document_paths):
        """
        Initialize the Document Processor with document paths stored in GCS.
        
        :param document_paths: List of GCS URIs of documents (e.g., ["gs://bucket/file1.pdf"])
        """
        self.document_paths = document_paths
        self.client = documentai.DocumentUnderstandingServiceClient()

    def extract_text_from_pdf(self, document_path):
        """
        Extracts text from a single PDF using Google Document AI.

        :param document_path: GCS URI of the document
        :return: Extracted text as a string
        """
        try:
            name = f"projects/{GCP_PROJECT_ID}/locations/us/processors/{PROCESSOR_ID}"
            raw_document = {"gcs_uri": document_path, "mime_type": "application/pdf"}
            request = {"name": name, "raw_document": raw_document}

            response = self.client.process_document(request=request)
            extracted_text = response.document.text
            return extracted_text

        except GoogleAPIError as e:
            print(f"Error processing {document_path}: {e}")
            return ""

    def process_all_documents(self):
        """
        Processes all documents in the document_paths list and concatenates the extracted text.

        :return: Concatenated extracted text from all documents
        """
        all_extracted_texts = []
        
        for document_path in self.document_paths:
            extracted_text = self.extract_text_from_pdf(document_path)
            if extracted_text:
                all_extracted_texts.append(extracted_text)

        return "\n\n".join(all_extracted_texts)  # Concatenate all extracted text

# Example Usage
if __name__ == "__main__":
    document_paths = [
        "gs://your-bucket-name/startup_pitch_deck.pdf",
        "gs://your-bucket-name/financial_summary.pdf"
    ]

    processor = DocumentProcessor(document_paths)
    extracted_text = processor.process_all_documents()

    print("\nFinal Extracted Text:")
    print(extracted_text[:1000])  # Print first 1000 characters for verification
