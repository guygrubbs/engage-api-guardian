
-- Create necessary enums and tables
CREATE TYPE pitch_status AS ENUM ('draft', 'submitted', 'under_review', 'approved', 'rejected');
CREATE TYPE report_tier AS ENUM ('teaser', 'tier2', 'tier3');

-- Create pitches table
CREATE TABLE IF NOT EXISTS public.pitches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    company_name TEXT NOT NULL,
    company_description TEXT,
    website_url TEXT,
    industry TEXT,
    stage TEXT,
    status pitch_status DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create reports table for AI-generated reports
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pitch_id UUID REFERENCES public.pitches(id) ON DELETE CASCADE,
    content JSONB NOT NULL,
    tier report_tier NOT NULL,
    is_paid BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add RLS policies
ALTER TABLE public.pitches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Policies for pitches
CREATE POLICY "Users can view their own pitches" 
    ON public.pitches FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pitches" 
    ON public.pitches FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pitches" 
    ON public.pitches FOR UPDATE 
    USING (auth.uid() = user_id);

-- Policies for reports
CREATE POLICY "Users can view their own reports" 
    ON public.reports FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM public.pitches 
        WHERE pitches.id = reports.pitch_id 
        AND pitches.user_id = auth.uid()
    ));

-- Updated triggers
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.pitches
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.reports
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
