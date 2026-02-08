-- Create table for automobile loss form submissions
CREATE TABLE public.auto_loss_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Agency Information
  agency_name TEXT,
  agency_contact TEXT,
  agency_phone TEXT,
  agency_fax TEXT,
  agency_email TEXT,
  agency_address TEXT,
  agency_code TEXT,
  agency_subcode TEXT,
  agency_customer_id TEXT,
  
  -- Policy Information
  form_date DATE,
  insured_location_code TEXT,
  loss_date DATE,
  loss_time TEXT,
  carrier TEXT,
  naic_code TEXT,
  policy_number TEXT,
  line_of_business TEXT,
  
  -- Insured Information
  insured_name TEXT,
  insured_address TEXT,
  insured_dob DATE,
  insured_fein TEXT,
  insured_marital_status TEXT,
  insured_phone_primary TEXT,
  insured_phone_secondary TEXT,
  insured_email_primary TEXT,
  insured_email_secondary TEXT,
  
  -- Contact Information
  contact_is_insured BOOLEAN DEFAULT false,
  contact_name TEXT,
  contact_address TEXT,
  contact_phone_primary TEXT,
  contact_phone_secondary TEXT,
  contact_email_primary TEXT,
  contact_email_secondary TEXT,
  contact_when TEXT,
  
  -- Loss Information
  loss_location TEXT,
  loss_department TEXT,
  loss_street TEXT,
  loss_city_state_zip TEXT,
  loss_report_number TEXT,
  loss_country TEXT,
  loss_location_desc TEXT,
  loss_accident_desc TEXT,
  
  -- Vehicle Information (stored as JSONB for flexibility)
  insured_vehicle JSONB,
  other_vehicle JSONB,
  
  -- Injured and Witnesses (stored as JSONB arrays)
  injured_persons JSONB DEFAULT '[]'::jsonb,
  witnesses JSONB DEFAULT '[]'::jsonb,
  
  -- Remarks
  reported_by TEXT,
  reported_to TEXT,
  remarks TEXT,
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'processing', 'completed'))
);

-- Enable RLS
ALTER TABLE public.auto_loss_forms ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for now, public form submission)
CREATE POLICY "Anyone can submit forms"
  ON public.auto_loss_forms
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read their own submissions by ID
CREATE POLICY "Anyone can read forms"
  ON public.auto_loss_forms
  FOR SELECT
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.auto_loss_forms
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();