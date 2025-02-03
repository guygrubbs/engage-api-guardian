import unittest
from unittest.mock import patch, MagicMock
from services.research_agent import ResearchAgent

class TestResearchAgent(unittest.TestCase):

    def setUp(self):
        """Initialize common test variables."""
        self.company_name = "StartupX"
        self.industry = "AI Software"
        self.extracted_text = "Sample extracted text from pitch deck."

    @patch("services.research_agent.openai.ChatCompletion.create")
    def test_generate_research_prompt(self, mock_openai):
        """
        Test if the research prompt is correctly formatted.
        """
        agent = ResearchAgent(self.company_name, self.industry, self.extracted_text, "market_opportunity")
        prompt_template = "Analyze {company_name} in {industry}. Document details: {extracted_text}"
        expected_prompt = "Analyze StartupX in AI Software. Document details: Sample extracted text from pitch deck."

        formatted_prompt = agent.generate_research_prompt(prompt_template)
        self.assertEqual(formatted_prompt, expected_prompt)

    @patch("services.research_agent.openai.ChatCompletion.create")
    def test_get_ai_response_success(self, mock_openai):
        """
        Test if the AI response is successfully returned from OpenAI.
        """
        # Mock OpenAI API response
        mock_openai.return_value = {"choices": [{"message": {"content": "AI-generated response"}}]}

        agent = ResearchAgent(self.company_name, self.industry, self.extracted_text, "market_opportunity")
        response = agent.get_ai_response("Test Prompt")

        self.assertEqual(response, "AI-generated response")

    @patch("services.research_agent.openai.ChatCompletion.create")
    def test_get_ai_response_failure(self, mock_openai):
        """
        Test if the AI research agent handles OpenAI API failures.
        """
        # Simulate API failure
        mock_openai.side_effect = Exception("OpenAI API Error")

        agent = ResearchAgent(self.company_name, self.industry, self.extracted_text, "market_opportunity")
        with self.assertRaises(Exception) as context:
            agent.get_ai_response("Test Prompt")

        self.assertTrue("OpenAI API Error" in str(context.exception))

    @patch("services.research_agent.ResearchAgent.get_ai_response")
    def test_run_research_agent(self, mock_get_ai_response):
        """
        Test if the research agent correctly processes multiple prompts.
        """
        # Mock AI-generated responses for multiple prompts
        mock_get_ai_response.side_effect = ["Response 1", "Response 2"]

        agent = ResearchAgent(self.company_name, self.industry, self.extracted_text, "market_opportunity")
        RESEARCH_PROMPTS = {
            "market_opportunity": [
                "What is the market size for {company_name}?",
                "Who are the top competitors for {company_name}?"
            ]
        }
        
        research_results = agent.run(RESEARCH_PROMPTS["market_opportunity"])

        self.assertEqual(research_results["market_opportunity_research_response_1"], "Response 1")
        self.assertEqual(research_results["market_opportunity_research_response_2"], "Response 2")

if __name__ == "__main__":
    unittest.main()
