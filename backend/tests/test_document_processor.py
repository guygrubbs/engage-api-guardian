import unittest
from unittest.mock import patch, MagicMock
from services.document_processor import DocumentProcessor

class TestDocumentProcessor(unittest.TestCase):

    @patch("services.document_processor.documentai.DocumentProcessorServiceClient")
    def test_extract_text_from_pdf_success(self, mock_document_ai_client):
        """
        Test if DocumentProcessor successfully extracts text from a PDF.
        """
        # Mock Document AI response
        mock_client_instance = mock_document_ai_client.return_value
        mock_client_instance.process_document.return_value.document.text = "Mock extracted text"

        # Test document processor
        processor = DocumentProcessor(["gs://mock-bucket/mock-doc.pdf"])
        extracted_text = processor.extract_text_from_pdf("gs://mock-bucket/mock-doc.pdf")

        self.assertEqual(extracted_text, "Mock extracted text")

    @patch("services.document_processor.documentai.DocumentProcessorServiceClient")
    def test_extract_text_from_pdf_failure(self, mock_document_ai_client):
        """
        Test if DocumentProcessor handles errors when Document AI fails.
        """
        # Simulate API failure
        mock_client_instance = mock_document_ai_client.return_value
        mock_client_instance.process_document.side_effect = Exception("Document AI Error")

        processor = DocumentProcessor(["gs://mock-bucket/mock-doc.pdf"])
        extracted_text = processor.extract_text_from_pdf("gs://mock-bucket/mock-doc.pdf")

        self.assertEqual(extracted_text, "")  # Should return empty string on failure

    @patch("services.document_processor.DocumentProcessor.extract_text_from_pdf")
    def test_process_all_documents(self, mock_extract_text):
        """
        Test if multiple documents are processed and concatenated correctly.
        """
        # Mock responses for multiple documents
        mock_extract_text.side_effect = ["Text from Doc1", "Text from Doc2"]

        processor = DocumentProcessor(["gs://mock-bucket/doc1.pdf", "gs://mock-bucket/doc2.pdf"])
        extracted_text = processor.process_all_documents()

        self.assertEqual(extracted_text, "Text from Doc1\n\nText from Doc2")

if __name__ == "__main__":
    unittest.main()
