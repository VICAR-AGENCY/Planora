-- Allow authenticated users to create their own supplier record
CREATE POLICY "Users can insert own supplier record"
  ON public.suppliers FOR INSERT
  WITH CHECK (auth.uid() = user_id);
