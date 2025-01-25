export interface ReportConfig {
  tier: 'teaser' | 'tier2' | 'tier3';
  model: string;
  temperature: number;
  systemPrompt: string;
}

export interface CompanyData {
  company_name: string;
  company_description?: string;
  funding_goal?: number;
  industry?: string;
  stage?: string;
  team_size?: number;
  website_url?: string;
  [key: string]: any;
}

export interface GeneratedReport {
  summary: string;
  marketSize: string;
  competitors: string[];
  strengths: string[];
  weaknesses: string[];
  financialAnalysis?: string;
  teamAssessment?: string;
  marketStrategy?: string;
  riskAnalysis?: string;
  timestamp: string;
  status: 'success' | 'error';
  version: string;
}