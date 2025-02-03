import openai
import os
from crewai import Agent

# Load API Key from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

class FinalReportGeneratorAgent(Agent):
    def __init__(self, all_sections):
        """
        Initializes the Final Report Generator.

        :param all_sections: Dictionary containing structured text for all report sections
        """
        self.all_sections = all_sections  # Dictionary with section texts

    def generate_summary_prompt(self):
        """Concatenates all section texts and formats an AI prompt for the executive summary."""
        full_report_text = "\n\n".join(self.all_sections.values())
        return f"Summarize the following startup report into an executive summary, focusing on key investment insights:\n\n{full_report_text}"

    def generate_dashboard_prompt(self):
        """Requests an AI-generated data-driven dashboard summary."""
        full_report_text = "\n\n".join(self.all_sections.values())
        return f"Generate a concise data-driven dashboard/table summary from the following report:\n\n{full_report_text}"

    def generate_final_recommendations_prompt(self):
        """Creates investment-focused final recommendations based on all sections."""
        full_report_text = "\n\n".join(self.all_sections.values())
        return f"Based on this startup report, generate final recommendations for investors, focusing on risks, opportunities, and strategic positioning:\n\n{full_report_text}"

    def get_ai_response(self, prompt):
        """Sends structured prompts to OpenAI GPT-4 API."""
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            api_key=OPENAI_API_KEY
        )
        return response["choices"][0]["message"]["content"]

    def generate_final_report(self):
        """Executes AI prompts to create the executive summary, dashboard, and recommendations."""
        summary = self.get_ai_response(self.generate_summary_prompt())
        dashboard = self.get_ai_response(self.generate_dashboard_prompt())
        recommendations = self.get_ai_response(self.generate_final_recommendations_prompt())

        return {
            "executive_summary": summary,
            "dashboard_summary": dashboard,
            "final_recommendations": recommendations
        }

# Example Usage
if __name__ == "__main__":
    # Example structured report sections from `section_generator.py`
    all_sections = {
        "market_opportunity": "Market trends indicate AI adoption increasing at a rate of 20% YoY...",
        "financial_growth": "StartupX has raised $5M in funding, with a burn rate of $300K per month...",
        "competitive_analysis": "Competitor A has a 35% market share, while Competitor B focuses on B2B solutions..."
    }

    # Initialize Final Report Generator
    final_report_agent = FinalReportGeneratorAgent(all_sections)

    # Generate full final report outputs
    final_report = final_report_agent.generate_final_report()

    # Print Final Sections
    print("\n### Executive Summary ###\n", final_report["executive_summary"])
    print("\n### Dashboard Summary ###\n", final_report["dashboard_summary"])
    print("\n### Final Recommendations ###\n", final_report["final_recommendations"])
