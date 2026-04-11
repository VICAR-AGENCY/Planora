-- Leads table for pre-registration lead capture
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  postal_code TEXT,
  project_type TEXT,
  source TEXT,           -- e.g. 'calculator_warmtepomp', 'homepage_hero', 'category_dakisolatie'
  calculator_data JSONB, -- snapshot of calculator results at time of lead capture
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a lead (no auth required)
CREATE POLICY "Anyone can insert leads"
  ON leads FOR INSERT
  WITH CHECK (true);

-- Only service role / admins can read leads
CREATE POLICY "Admins can read leads"
  ON leads FOR SELECT
  USING (false); -- override with service role in backend/edge functions
