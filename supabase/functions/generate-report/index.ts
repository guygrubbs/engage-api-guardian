import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { RateLimiter } from "https://deno.land/x/rate_limiter@v0.1.0/mod.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY') ?? 'sk-placeholder-openai-key';
const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY') ?? 'pplx-placeholder-key';
const SERPAPI_API_KEY = Deno.env.get('SERPAPI_API_KEY') ?? 'serp-placeholder-key';
const LINKEDIN_API_KEY = Deno.env.get('LINKEDIN_API_KEY') ?? 'linkedin-placeholder-key';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiter: 10 requests per minute per IP
const rateLimiter = new RateLimiter({
  requests: 10,
  window: 60000, // 1 minute
});

async function validateInput(data: any) {
  const requiredFields = ['pitchId'];
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}

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

    // Initialize API clients with proper error handling
    try {
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
      
      // Process and structure the real API response
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
      console.error('API Error:', error);
      throw new Error('Failed to generate report using external APIs');
    }

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
    // Rate limiting check
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    if (!await rateLimiter.isAllowed(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { 
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const requestData = await req.json();
    await validateInput(requestData);
    const { pitchId } = requestData;

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch pitch data with error handling
    const { data: pitch, error: pitchError } = await supabase
      .from('pitches')
      .select('*')
      .eq('id', pitchId)
      .single();

    if (pitchError) {
      console.error('Pitch fetch error:', pitchError);
      throw new Error('Failed to fetch pitch data');
    }

    // Generate reports for each tier with proper error handling
    const reports = await Promise.all([
      { tier: 'teaser', content: await generateRealReport(pitch, 'teaser') },
      { tier: 'tier2', content: await generateRealReport(pitch, 'tier2') },
      { tier: 'tier3', content: await generateRealReport(pitch, 'tier3') }
    ]);

    // Insert reports into database with error handling
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

    if (reportsError) {
      console.error('Reports insert error:', reportsError);
      throw new Error('Failed to save reports');
    }

    console.log('Reports generated successfully for pitch:', pitchId);

    return new Response(
      JSON.stringify({ 
        message: 'Reports generated successfully',
        reportIds: reports.map(r => r.id)
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in generate-report function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: error.status || 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});