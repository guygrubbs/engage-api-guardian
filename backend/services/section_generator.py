from crewai import Agent

# Section Formatting Templates
SECTION_TEMPLATES = {
    "market_opportunity": """
    ### Market Opportunity Analysis for {company_name}

    **Industry Overview**  
    {market_opportunity_research_response_1}

    **Key Market Trends**  
    {market_opportunity_research_response_2}

    **Challenges & Pain Points**  
    {market_opportunity_research_response_3}

    **Competitor Landscape**  
    {market_opportunity_research_response_4}

    **SWOT Analysis**  
    {market_opportunity_research_response_5}
    """,

    "financial_growth": """
    ### Financial Growth Analysis for {company_name}

    **Revenue & Growth Trends**  
    {financial_growth_research_response_1}

    **Comparative Financial Performance**  
    {financial_growth_research_response_2}

    **Burn Rate & Funding Efficiency**  
    {financial_growth_research_response_3}
    """,

    "competitive_analysis": """
    ### Competitive Analysis of {company_name}

    **Market Positioning**  
    {competitive_analysis_research_response_1}

    **Competitive Advantages**  
    {competitive_analysis_research_response_2}

    **Potential Market Risks**  
    {competitive_analysis_research_response_3}
    """
}

class SectionGeneratorAgent(Agent):
    def __init__(self, company_name, research_results, section):
        """
        Initializes the Section Generator Agent.

        :param company_name: Name of the startup
        :param research_results: AI-generated research insights
        :param section: Section name being written
        """
        self.company_name = company_name
        self.research_results = research_results
        self.section = section

    def format_section(self):
        """Formats the section using predefined templates and AI-generated insights."""
        if self.section not in SECTION_TEMPLATES:
            raise ValueError(f"Invalid section name: {self.section}")

        formatted_section = SECTION_TEMPLATES[self.section].format(
            company_name=self.company_name, **self.research_results
        )
        return formatted_section

    def run(self):
        """Generates the structured section content."""
        return self.format_section()

# Example Usage
if __name__ == "__main__":
    # Example AI-generated research responses from `research_agent.py`
    research_results = {
        "market_opportunity_research_response_1": "The AI industry is projected to grow by 20% annually...",
        "market_opportunity_research_response_2": "Key trends include automation, AI ethics, and regulatory adaptation...",
        "market_opportunity_research_response_3": "Startups struggle with AI model transparency and high computing costs...",
        "market_opportunity_research_response_4": "Competitor X focuses on SaaS AI solutions, while Competitor Y specializes in B2B AI...",
        "market_opportunity_research_response_5": "Strengths: AI-driven automation; Weaknesses: Limited dataset access..."
    }

    # Initialize Section Generator for Market Opportunity
    section_agent = SectionGeneratorAgent(
        company_name="StartupX",
        research_results=research_results,
        section="market_opportunity"
    )

    # Generate structured section content
    structured_section = section_agent.run()
    print(structured_section)
