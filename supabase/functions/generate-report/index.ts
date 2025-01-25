import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { RateLimiter } from './rateLimiter.ts';
import { generateRealReport } from './reportGenerator.ts';
import { CompanyData } from './types.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const rateLimiter = new RateLimiter({
  maxRequests: 10,
  windowMs: 60000,
});

async function validateInput(data: any) {
  if (!data.pitchId) {
    throw new Error('Missing required field: pitchId');
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log('Received report generation request');

  try {
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    if (!await rateLimiter.isAllowed(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
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

    console.log(`Generating report for pitch ID: ${pitchId}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch pitch data
    const { data: pitch, error: pitchError } = await supabase
      .from('pitches')
      .select('*')
      .eq('id', pitchId)
      .maybeSingle();

    if (pitchError) {
      console.error('Pitch fetch error:', pitchError);
      throw new Error('Failed to fetch pitch data');
    }

    if (!pitch) {
      throw new Error('Pitch not found');
    }

    // Generate reports for all tiers
    const reports = await Promise.all([
      { tier: 'teaser', content: await generateRealReport(pitch as CompanyData, 'teaser') },
      { tier: 'tier2', content: await generateRealReport(pitch as CompanyData, 'tier2') },
      { tier: 'tier3', content: await generateRealReport(pitch as CompanyData, 'tier3') }
    ]);

    // Save reports to database
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

    console.log(`Successfully generated and saved reports for pitch: ${pitchId}`);

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