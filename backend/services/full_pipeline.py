from services.document_processor import DocumentProcessorAgent
from services.research_agent import ResearchAgent
from services.section_generator import SectionGeneratorAgent
from services.final_report_generator import FinalReportGeneratorAgent

# Define available research prompts
RESEARCH_PROMPTS = {
    "market_opportunity": [...],  # Insert predefined prompts
    "financial_growth": [...],
    "competitive_analysis": [...]
}

def run_full_pipeline(company_name, industry, document_paths):
    # Step 1: Extract text from uploaded documents
    document_agent = DocumentProcessorAgent(document_paths)
    extracted_text = document_agent.process_all_documents()

    # Step 2: Generate AI Research for all sections
    all_research_results = {}
    for section, prompts in RESEARCH_PROMPTS.items():
        research_agent = ResearchAgent(company_name, industry, extracted_text, section)
        all_research_results[section] = research_agent.run(prompts)

    # Step 3: Generate structured report sections
    all_sections = {}
    for section, research_results in all_research_results.items():
        section_agent = SectionGeneratorAgent(research_results, section)
        all_sections[section] = section_agent.generate_section()

    # Step 4: Generate Final Summary, Recommendations, and Dashboard
    final_report_agent = FinalReportGeneratorAgent(all_sections)
    final_report = final_report_agent.generate_final_report()

    return {**all_sections, **final_report}  # Return all report sections and summary
