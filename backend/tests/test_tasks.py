import unittest
from unittest.mock import patch, MagicMock
from tasks.tasks import generate_report_task

class TestCeleryTasks(unittest.TestCase):

    @patch("tasks.tasks.run_full_pipeline")
    @patch("tasks.tasks.storage.Client")
    def test_generate_report_task_success(self, mock_storage_client, mock_run_pipeline):
        """
        Test if Celery successfully generates and stores the report in GCS.
        """
        # Mock AI pipeline output
        mock_run_pipeline.return_value = {"executive_summary": "AI Summary", "final_recommendations": "Investment Ready"}

        # Mock GCS storage behavior
        mock_bucket = mock_storage_client.return_value.bucket.return_value
        mock_blob = mock_bucket.blob.return_value
        mock_blob.upload_from_string.return_value = None  # Simulate successful upload

        # Run Celery task
        task_result = generate_report_task("StartupX", "AI Software", ["gs://bucket/doc1.pdf"])

        self.assertEqual(task_result["status"], "completed")
        self.assertIn("report_url", task_result)

    @patch("tasks.tasks.run_full_pipeline")
    def test_generate_report_task_failure(self, mock_run_pipeline):
        """
        Test if Celery task handles AI pipeline errors correctly.
        """
        # Simulate AI pipeline failure
        mock_run_pipeline.side_effect = Exception("AI Processing Error")

        # Run Celery task
        task_result = generate_report_task("StartupX", "AI Software", ["gs://bucket/doc1.pdf"])

        self.assertEqual(task_result["status"], "failed")
        self.assertIn("error", task_result)
        self.assertEqual(task_result["error"], "AI Processing Error")

if __name__ == "__main__":
    unittest.main()
