-- Add onboarding fields to suppliers table
ALTER TABLE public.suppliers ADD COLUMN IF NOT EXISTS availability JSONB;
-- Structure: { days: ['mon','tue','wed','thu','fri'], time_from: '08:00', time_to: '18:00', urgent: true }

ALTER TABLE public.suppliers ADD COLUMN IF NOT EXISTS price_category TEXT;
-- Values: 'low' | 'medium' | 'high'

ALTER TABLE public.suppliers ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;
