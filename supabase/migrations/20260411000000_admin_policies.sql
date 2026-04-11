-- Admin RLS policies: allow admin role to read all profiles and suppliers

-- Admin can read all profiles
CREATE POLICY "admin_read_profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Admin can read all suppliers
CREATE POLICY "admin_read_suppliers" ON suppliers
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Admin can read all leads
CREATE POLICY "admin_read_leads" ON leads
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Admin can read all projects
CREATE POLICY "admin_read_projects" ON projects
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );
