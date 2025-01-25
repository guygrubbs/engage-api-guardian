interface CompanyData {
  company_name: string;
  [key: string]: any;
}

export async function generateMockReport(companyName: string, tier: string) {
  return {
    summary: `${tier} analysis of ${companyName}`,
    marketSize: tier === 'teaser' ? 'Basic market estimation' : 'Detailed market analysis',
    competitors: ['Competitor A', 'Competitor B'],
    strengths: ['Strong team', 'Innovative solution'],
    weaknesses: ['Early stage', 'Limited funding'],
    ...(tier !== 'teaser' && {
      financialAnalysis: 'Detailed financial projections',
      teamAssessment: 'Comprehensive team analysis',
    }),
    ...(tier === 'tier3' && {
      marketStrategy: 'In-depth go-to-market strategy',
      riskAnalysis: 'Comprehensive risk assessment'
    })
  };
}

export async function generateRealReport(companyData: CompanyData, tier: string) {
  try {
    const areApisConfigured = 
      OPENAI_API_KEY !== 'sk-placeholder-openai-key' &&
      PERPLEXITY_API_KEY !== 'pplx-placeholder-key' &&
      SERPAPI_API_KEY !== 'serp-placeholder-key' &&
      LINKEDIN_API_KEY !== 'linkedin-placeholder-key';

    if (!areApisConfigured) {
      console.log('Some APIs not configured, falling back to mock data');
      return generateMockReport(companyData.company_name, tier);
    }

    const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: `Generate a ${tier} report for the company based on the following information.`
          },
          {
            role: 'user',
            content: JSON.stringify(companyData)
          }
        ],
        temperature: 0.2,
      }),
    });

    if (!perplexityResponse.ok) {
      throw new Error(`Perplexity API error: ${perplexityResponse.statusText}`);
    }

    const perplexityData = await perplexityResponse.json();
    
    return {
      summary: perplexityData.choices[0].message.content,
      marketSize: 'API-generated market size estimation',
      competitors: ['API-identified Competitor 1', 'API-identified Competitor 2'],
      strengths: ['API-identified Strength 1', 'API-identified Strength 2'],
      weaknesses: ['API-identified Weakness 1', 'API-identified Weakness 2'],
      timestamp: new Date().toISOString(),
      status: 'success',
    };

  } catch (error) {
    console.error('Error generating real report:', error);
    return generateMockReport(companyData.company_name, tier);
  }
}