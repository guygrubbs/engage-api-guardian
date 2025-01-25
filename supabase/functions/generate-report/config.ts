export const REPORT_CONFIGS: Record<string, any> = {
  teaser: {
    model: 'gpt-4o-mini',
    temperature: 0.2,
    systemPrompt: 'Generate a teaser report highlighting key aspects of the company.',
  },
  tier2: {
    model: 'gpt-4o-mini',
    temperature: 0.3,
    systemPrompt: 'Generate a detailed analysis including financial projections and team assessment.',
  },
  tier3: {
    model: 'gpt-4o',
    temperature: 0.4,
    systemPrompt: 'Generate a comprehensive analysis including market strategy and risk assessment.',
  },
};

export const CURRENT_REPORT_VERSION = '1.0.0';