import unittest
from services.section_generator import SectionGeneratorAgent

class TestSectionGenerator(unittest.TestCase):

    def setUp(self):
        """Initialize common test variables."""
        self.company_name = "StartupX"
        self.research_results = {
            "market_opportunity_research_response_1": "AI industry growth rate is 20% annually.",
            "market_opportunity_research_response_2": "Key market trends include AI automation and ethics.",
            "market_opportunity_research_response_3": "Main challenges are computing power costs and regulatory compliance.",
            "market_opportunity_research_response_4": "Top competitors include OpenAI, Anthropic, and Google DeepMind.",
            "market_opportunity_research_response_5": "SWOT Analysis: Strengths - Rapid AI adoption; Weaknesses - High infrastructure costs."
        }
        self.section = "market_opportunity"

    def test_generate_section_success(self):
        """
        Test if the section generator correctly formats a structured report section.
        """
        agent = SectionGeneratorAgent(self.company_name, self.research_results, self.section)
        generated_section = agent.generate_section()

        # Ensure the section contains required fields
        self.assertIn("### Market Opportunity Analysis for StartupX", generated_section)
        self.assertIn("**Industry Overview**", generated_section)
        self.assertIn("AI industry growth rate is 20% annually.", generated_section)
        self.assertIn("**SWOT Analysis**", generated_section)
        self.assertIn("Strengths - Rapid AI adoption", generated_section)

    def test_generate_section_with_missing_data(self):
        """
        Test if the section generator handles missing research responses gracefully.
        """
        incomplete_research_results = {
            "market_opportunity_research_response_1": "AI industry growth rate is 20% annually."
        }
        
        agent = SectionGeneratorAgent(self.company_name, incomplete_research_results, self.section)
        generated_section = agent.generate_section()

        self.assertIn("### Market Opportunity Analysis for StartupX", generated_section)
        self.assertIn("**Industry Overview**", generated_section)
        self.assertIn("AI industry growth rate is 20% annually.", generated_section)
        self.assertIn("**Key Market Trends**", generated_section)  # Should exist even if empty

    def test_invalid_section_name(self):
        """
        Test if the section generator raises an error for an invalid section name.
        """
        with self.assertRaises(ValueError) as context:
            agent = SectionGeneratorAgent(self.company_name, self.research_results, "invalid_section")
            agent.generate_section()

        self.assertTrue("Invalid section name" in str(context.exception))

if __name__ == "__main__":
    unittest.main()
