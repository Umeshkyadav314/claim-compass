-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  agency_name TEXT,
  agency_email TEXT,
  agency_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add user_id column to auto_loss_forms to link submissions to users
ALTER TABLE public.auto_loss_forms ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Update RLS policies on auto_loss_forms to allow user-specific access
DROP POLICY IF EXISTS "Anyone can read forms" ON public.auto_loss_forms;
DROP POLICY IF EXISTS "Anyone can submit forms" ON public.auto_loss_forms;

-- Authenticated users can view their own forms
CREATE POLICY "Users can view their own forms" 
  ON public.auto_loss_forms 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Authenticated users can insert their own forms
CREATE POLICY "Users can submit their own forms" 
  ON public.auto_loss_forms 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users can update their own forms
CREATE POLICY "Users can update their own forms" 
  ON public.auto_loss_forms 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Authenticated users can delete their own forms
CREATE POLICY "Users can delete their own forms" 
  ON public.auto_loss_forms 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();