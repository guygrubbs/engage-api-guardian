import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

// Placeholder API keys - replace these with real keys in production
const OPENAI_API_KEY = 'sk-placeholder-openai-key';
const PERPLEXITY_API_KEY = 'pplx-placeholder-key';
const SERPAPI_API_KEY = 'serp-placeholder-key';
const LINKEDIN_API_KEY = 'linkedin-placeholder-key';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    // Simulate different report tiers
    const reports = [
      {
        tier: 'teaser',
        content: {
          summary: `Basic analysis of ${pitch.company_name}`,
          marketSize: 'Preliminary market size estimation',
          competitors: ['Competitor 1', 'Competitor 2'],
          strengths: ['Strength 1', 'Strength 2'],
          weaknesses: ['Weakness 1', 'Weakness 2'],
        }
      },
      {
        tier: 'tier2',
        content: {
          summary: `Detailed analysis of ${pitch.company_name}`,
          marketSize: 'Comprehensive market size analysis',
          competitors: ['Detailed Competitor 1', 'Detailed Competitor 2'],
          strengths: ['Detailed Strength 1', 'Detailed Strength 2'],
          weaknesses: ['Detailed Weakness 1', 'Detailed Weakness 2'],
          financialAnalysis: 'Basic financial projections',
          teamAssessment: 'Team background analysis'
        }
      },
      {
        tier: 'tier3',
        content: {
          summary: `In-depth analysis of ${pitch.company_name}`,
          marketSize: 'Extensive market size and growth potential analysis',
          competitors: ['Full Competitor Analysis 1', 'Full Competitor Analysis 2'],
          strengths: ['Comprehensive Strength 1', 'Comprehensive Strength 2'],
          weaknesses: ['Comprehensive Weakness 1', 'Comprehensive Weakness 2'],
          financialAnalysis: 'Detailed financial projections and valuation',
          teamAssessment: 'Comprehensive team background and capability analysis',
          marketStrategy: 'Go-to-market strategy assessment',
          riskAnalysis: 'Detailed risk assessment and mitigation strategies'
        }
      }
    ];

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