import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

// API keys from environment variables
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY') ?? 'sk-placeholder-openai-key';
const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY') ?? 'pplx-placeholder-key';
const SERPAPI_API_KEY = Deno.env.get('SERPAPI_API_KEY') ?? 'serp-placeholder-key';
const LINKEDIN_API_KEY = Deno.env.get('LINKEDIN_API_KEY') ?? 'linkedin-placeholder-key';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function generateMockReport(companyName: string, tier: string) {
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

async function generateRealReport(companyData: any, tier: string) {
  try {
    // Check if all required APIs are configured
    const areApisConfigured = 
      OPENAI_API_KEY !== 'sk-placeholder-openai-key' &&
      PERPLEXITY_API_KEY !== 'pplx-placeholder-key' &&
      SERPAPI_API_KEY !== 'serp-placeholder-key' &&
      LINKEDIN_API_KEY !== 'linkedin-placeholder-key';

    if (!areApisConfigured) {
      console.log('Some APIs not configured, falling back to mock data');
      return generateMockReport(companyData.company_name, tier);
    }

    // Attempt to use real APIs for report generation
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
      console.error('Perplexity API error, falling back to mock data');
      return generateMockReport(companyData.company_name, tier);
    }

    const perplexityData = await perplexityResponse.json();
    
    // Process and structure the real API response
    return {
      summary: perplexityData.choices[0].message.content,
      // Add other real API integrations here
      // For now, include some mock data for missing parts
      marketSize: 'API-generated market size estimation',
      competitors: ['API-identified Competitor 1', 'API-identified Competitor 2'],
      strengths: ['API-identified Strength 1', 'API-identified Strength 2'],
      weaknesses: ['API-identified Weakness 1', 'API-identified Weakness 2'],
    };

  } catch (error) {
    console.error('Error generating real report:', error);
    return generateMockReport(companyData.company_name, tier);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pitchId } = await req.json();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch pitch data
    const { data: pitch, error: pitchError } = await supabase
      .from('pitches')
      .select('*')
      .eq('id', pitchId)
      .single();

    if (pitchError) throw pitchError;

    // Generate reports for each tier
    const reports = await Promise.all([
      { tier: 'teaser', content: await generateRealReport(pitch, 'teaser') },
      { tier: 'tier2', content: await generateRealReport(pitch, 'tier2') },
      { tier: 'tier3', content: await generateRealReport(pitch, 'tier3') }
    ]);

    // Insert reports into database
    const { error: reportsError } = await supabase
      .from('reports')
      .insert(
        reports.map(report => ({
          pitch_id: pitchId,
          tier: report.tier,
          content: report.content,
          is_paid: report.tier === 'teaser' ? true : false
        }))
      );

    if (reportsError) throw reportsError;

    console.log('Reports generated successfully for pitch:', pitchId);

    return new Response(
      JSON.stringify({ message: 'Reports generated successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-report function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});