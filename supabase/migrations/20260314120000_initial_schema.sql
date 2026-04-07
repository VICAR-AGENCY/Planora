-- ============================================
-- Planora Database Schema
-- ============================================
-- Drop alles eerst (clean slate)
-- ============================================

-- Drop existing triggers safely (tables may not exist yet)
DO $$ BEGIN
  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;
DO $$ BEGIN
  DROP TRIGGER IF EXISTS set_updated_at ON public.profiles;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;
DO $$ BEGIN
  DROP TRIGGER IF EXISTS set_updated_at ON public.suppliers;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;
DO $$ BEGIN
  DROP TRIGGER IF EXISTS set_updated_at ON public.projects;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;
DO $$ BEGIN
  DROP TRIGGER IF EXISTS set_updated_at ON public.quotes;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- Drop existing tables (in reverse dependency order)
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.quote_line_items CASCADE;
DROP TABLE IF EXISTS public.quotes CASCADE;
DROP TABLE IF EXISTS public.matches CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.supplier_regions CASCADE;
DROP TABLE IF EXISTS public.supplier_categories CASCADE;
DROP TABLE IF EXISTS public.suppliers CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop any leftover tables from previous schemas
DROP TABLE IF EXISTS public.tasks CASCADE;

-- Drop existing types
DROP TYPE IF EXISTS public.project_status CASCADE;
DROP TYPE IF EXISTS public.quote_status CASCADE;
DROP TYPE IF EXISTS public.match_status CASCADE;
DROP TYPE IF EXISTS public.user_role CASCADE;

-- ============================================
-- Enums
-- ============================================

CREATE TYPE public.user_role AS ENUM ('homeowner', 'supplier', 'admin');
CREATE TYPE public.project_status AS ENUM ('intake', 'ready', 'matching', 'comparing', 'decided', 'completed');
CREATE TYPE public.quote_status AS ENUM ('pending', 'submitted', 'accepted', 'rejected');
CREATE TYPE public.match_status AS ENUM ('pending', 'accepted', 'declined', 'expired');

-- ============================================
-- Profiles (extends Supabase Auth)
-- ============================================

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.user_role NOT NULL DEFAULT 'homeowner',
  full_name TEXT,
  phone TEXT,
  city TEXT,
  postal_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- Suppliers
-- ============================================

CREATE TABLE public.suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  description TEXT,
  logo_url TEXT,
  rating NUMERIC(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.supplier_regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID NOT NULL REFERENCES public.suppliers(id) ON DELETE CASCADE,
  postal_code_prefix TEXT NOT NULL, -- e.g. '2000', '9000'
  city TEXT NOT NULL
);

CREATE TABLE public.supplier_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID NOT NULL REFERENCES public.suppliers(id) ON DELETE CASCADE,
  category TEXT NOT NULL -- e.g. 'heat_pump_air_water', 'heat_pump_ground_water'
);

-- ============================================
-- Projects
-- ============================================

CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Nieuw project',
  category TEXT NOT NULL DEFAULT 'heat_pump',
  status public.project_status NOT NULL DEFAULT 'intake',
  city TEXT,
  postal_code TEXT,

  -- Project brief (structured data from AI intake)
  brief JSONB DEFAULT '{}'::jsonb,

  -- AI intake conversation history
  intake_messages JSONB DEFAULT '[]'::jsonb,

  -- Photos
  photo_urls TEXT[] DEFAULT '{}',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- Matches (project <-> supplier)
-- ============================================

CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES public.suppliers(id) ON DELETE CASCADE,
  status public.match_status NOT NULL DEFAULT 'pending',
  notified_at TIMESTAMPTZ,
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(project_id, supplier_id)
);

-- ============================================
-- Quotes
-- ============================================

CREATE TABLE public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES public.suppliers(id) ON DELETE CASCADE,
  match_id UUID REFERENCES public.matches(id) ON DELETE SET NULL,
  status public.quote_status NOT NULL DEFAULT 'pending',

  -- PDF
  pdf_url TEXT,

  -- Parsed data from AI
  parsed_data JSONB DEFAULT NULL,
  total_excl_vat NUMERIC(10,2),
  vat_amount NUMERIC(10,2),
  total_incl_vat NUMERIC(10,2),
  warranty_years INTEGER,
  estimated_duration TEXT,

  -- AI analysis
  ai_summary TEXT,
  ai_flags JSONB DEFAULT '[]'::jsonb, -- e.g. ["missing_floor_heating", "high_price"]

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.quote_line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity NUMERIC(10,2) DEFAULT 1,
  unit_price NUMERIC(10,2),
  total NUMERIC(10,2),
  category TEXT -- e.g. 'equipment', 'installation', 'accessories'
);

-- ============================================
-- Messages
-- ============================================

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- Indexes
-- ============================================

CREATE INDEX idx_projects_user_id ON public.projects(user_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_matches_project_id ON public.matches(project_id);
CREATE INDEX idx_matches_supplier_id ON public.matches(supplier_id);
CREATE INDEX idx_quotes_project_id ON public.quotes(project_id);
CREATE INDEX idx_quotes_supplier_id ON public.quotes(supplier_id);
CREATE INDEX idx_messages_project_id ON public.messages(project_id);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_supplier_regions_supplier ON public.supplier_regions(supplier_id);
CREATE INDEX idx_supplier_regions_postal ON public.supplier_regions(postal_code_prefix);
CREATE INDEX idx_supplier_categories_supplier ON public.supplier_categories(supplier_id);

-- ============================================
-- Updated_at triggers
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.suppliers
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.quotes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- Auto-create profile on signup
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- Row Level Security (RLS)
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplier_regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplier_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_line_items ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Suppliers: public read, own update
CREATE POLICY "Anyone can view active suppliers" ON public.suppliers
  FOR SELECT USING (active = true);
CREATE POLICY "Suppliers can update own record" ON public.suppliers
  FOR UPDATE USING (auth.uid() = user_id);

-- Supplier regions/categories: public read
CREATE POLICY "Anyone can view supplier regions" ON public.supplier_regions
  FOR SELECT USING (true);
CREATE POLICY "Anyone can view supplier categories" ON public.supplier_categories
  FOR SELECT USING (true);

-- Projects: owner can CRUD
CREATE POLICY "Users can view own projects" ON public.projects
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create projects" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON public.projects
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON public.projects
  FOR DELETE USING (auth.uid() = user_id);

-- Suppliers can view projects they're matched with
CREATE POLICY "Suppliers can view matched projects" ON public.projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.matches m
      JOIN public.suppliers s ON s.id = m.supplier_id
      WHERE m.project_id = projects.id AND s.user_id = auth.uid()
    )
  );

-- Matches: project owner and matched supplier can view
CREATE POLICY "Project owners can view matches" ON public.matches
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.user_id = auth.uid())
  );
CREATE POLICY "Suppliers can view own matches" ON public.matches
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.suppliers s WHERE s.id = supplier_id AND s.user_id = auth.uid())
  );
CREATE POLICY "Suppliers can update own matches" ON public.matches
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.suppliers s WHERE s.id = supplier_id AND s.user_id = auth.uid())
  );

-- Quotes: project owner and quote supplier can view
CREATE POLICY "Project owners can view quotes" ON public.quotes
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.user_id = auth.uid())
  );
CREATE POLICY "Suppliers can view own quotes" ON public.quotes
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.suppliers s WHERE s.id = supplier_id AND s.user_id = auth.uid())
  );
CREATE POLICY "Suppliers can create quotes" ON public.quotes
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.suppliers s WHERE s.id = supplier_id AND s.user_id = auth.uid())
  );
CREATE POLICY "Suppliers can update own quotes" ON public.quotes
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.suppliers s WHERE s.id = supplier_id AND s.user_id = auth.uid())
  );

-- Quote line items: same as quotes
CREATE POLICY "Users can view quote line items" ON public.quote_line_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.quotes q
      JOIN public.projects p ON p.id = q.project_id
      WHERE q.id = quote_id AND (p.user_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.suppliers s WHERE s.id = q.supplier_id AND s.user_id = auth.uid()
      ))
    )
  );

-- Messages: project participants can read/write
CREATE POLICY "Project participants can view messages" ON public.messages
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.user_id = auth.uid())
    OR
    EXISTS (
      SELECT 1 FROM public.matches m
      JOIN public.suppliers s ON s.id = m.supplier_id
      WHERE m.project_id = project_id AND s.user_id = auth.uid()
    )
  );
CREATE POLICY "Project participants can send messages" ON public.messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND (
      EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.user_id = auth.uid())
      OR
      EXISTS (
        SELECT 1 FROM public.matches m
        JOIN public.suppliers s ON s.id = m.supplier_id
        WHERE m.project_id = project_id AND s.user_id = auth.uid()
      )
    )
  );

-- ============================================
-- Realtime
-- ============================================

ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- ============================================
-- Storage buckets
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('photos', 'photos', true),
  ('quotes', 'quotes', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can upload photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'photos' AND auth.role() = 'authenticated');
CREATE POLICY "Anyone can view photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'photos');

CREATE POLICY "Authenticated users can upload quotes" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'quotes' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can view quotes" ON storage.objects
  FOR SELECT USING (bucket_id = 'quotes' AND auth.role() = 'authenticated');
