-- Fix admin RLS policies: replace recursive profiles subquery with get_my_role() function

-- Drop old recursive policies
DROP POLICY IF EXISTS "admin_read_profiles" ON profiles;
DROP POLICY IF EXISTS "admin_read_suppliers" ON suppliers;
DROP POLICY IF EXISTS "admin_read_leads" ON leads;
DROP POLICY IF EXISTS "admin_read_projects" ON projects;

-- Recreate using get_my_role() to avoid infinite recursion
CREATE POLICY "admin_read_profiles" ON profiles
  FOR SELECT USING (public.get_my_role() = 'admin');

CREATE POLICY "admin_read_suppliers" ON suppliers
  FOR SELECT USING (public.get_my_role() = 'admin');

CREATE POLICY "admin_read_leads" ON leads
  FOR SELECT USING (public.get_my_role() = 'admin');

CREATE POLICY "admin_read_projects" ON projects
  FOR SELECT USING (public.get_my_role() = 'admin');
