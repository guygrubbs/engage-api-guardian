import openai
import os
from crewai import Agent

# Load API Key from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY  # Set global API key

# Research prompts template for various sections
RESEARCH_PROMPTS = {
    "market_opportunity": [
        "Research and provide an overview of {company_name}’s primary market focus. Extracted report insights:\n{extracted_text}",
        "Identify key market trends influencing the {industry} for {company_name}. Consider the following company-provided information:\n{extracted_text}",
        "Analyze the pain points and challenges that {company_name} aims to address. Compare their solution to existing market alternatives. Reference the following:\n{extracted_text}",
        "Identify {company_name}’s top competitors based on the extracted industry report. Provide a comparative analysis:\n{extracted_text}",
        "Provide a SWOT analysis (Strengths, Weaknesses, Opportunities, and Threats) comparing {company_name} to its top 3-5 competitors. Extracted report insights:\n{extracted_text}"
    ],
    "financial_growth": [
        "Analyze the financial sustainability of {company_name}. Consider profitability, revenue growth, and investment history. Extracted data:\n{extracted_text}",
        "Compare {company_name}’s financial performance with key industry competitors. Extracted report insights:\n{extracted_text}",
        "Assess burn rate and funding efficiency for {company_name}. Compare against industry standards:\n{extracted_text}"
    ],
    "competitive_analysis": [
        "Analyze {company_name}’s competitive positioning within {industry}. Extracted data:\n{extracted_text}",
        "Provide a breakdown of {company_name}’s competitive advantages. Use industry benchmarks:\n{extracted_text}",
        "Identify major threats or market risks for {company_name}. Extracted report insights:\n{extracted_text}"
    ]
}

class ResearchAgent(Agent):
    def __init__(self, company_name, industry, extracted_text, section):
        """
        Initializes the Research Agent with contextual information.

        :param company_name: Name of the startup
        :param industry: Industry of the startup
        :param extracted_text: Text extracted from uploaded PDFs
        :param section: Report section for which research is being conducted
        """
        self.company_name = company_name
        self.industry = industry
        self.extracted_text = extracted_text  # Context from submitted reports
        self.section = section

    def generate_research_prompt(self, prompt_template):
        """Dynamically formats the research prompt using extracted text."""
        return prompt_template.format(
            company_name=self.company_name,
            industry=self.industry,
            extracted_text=self.extracted_text
        )

    def get_ai_response(self, prompt):
        """Sends a structured research prompt to OpenAI GPT-4 API."""
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}]
        )
        return response["choices"][0]["message"]["content"]

    def run(self):
        """Executes research prompts and gathers AI-generated insights."""
        if self.section not in RESEARCH_PROMPTS:
            raise ValueError(f"Invalid section name: {self.section}")

        research_results = {}
        for idx, prompt_template in enumerate(RESEARCH_PROMPTS[self.section]):
            prompt = self.generate_research_prompt(prompt_template)
            response = self.get_ai_response(prompt)
            research_results[f"{self.section}_research_response_{idx+1}"] = response

        return research_results  # Store research results for section generation

# Example Usage
if __name__ == "__main__":
    # Example extracted text from document_processor.py
    extracted_text = "The AI market is growing rapidly, with projected revenue of $500 billion by 2026."

    # Initialize the Research Agent for Market Opportunity
    research_agent = ResearchAgent(
        company_name="StartupX",
        industry="AI Software",
        extracted_text=extracted_text,
        section="market_opportunity"
    )

    # Run Research Agent
    research_results = research_agent.run()

    # Print Research Responses
    for key, response in research_results.items():
        print(f"\n{key}: {response}\n")
