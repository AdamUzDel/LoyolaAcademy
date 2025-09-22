-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved trigger function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_role_value user_role;
  profile_exists boolean;
BEGIN
  -- Log the trigger execution
  RAISE LOG 'handle_new_user trigger called for user: %', NEW.id;
  
  -- Safely cast role with fallback to 'learner'
  BEGIN
    user_role_value := COALESCE(NEW.raw_user_meta_data->>'role', 'learner')::user_role;
    RAISE LOG 'Role set to: %', user_role_value;
  EXCEPTION WHEN invalid_text_representation THEN
    user_role_value := 'learner'::user_role;
    RAISE LOG 'Invalid role, defaulting to learner';
  END;

  -- Check if profile already exists
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = NEW.id) INTO profile_exists;
  
  IF profile_exists THEN
    RAISE LOG 'Profile already exists for user %', NEW.id;
    RETURN NEW;
  END IF;

  -- Check if email already exists (shouldn't happen but good to check)
  IF EXISTS (SELECT 1 FROM public.profiles WHERE email = NEW.email) THEN
    RAISE LOG 'Email % already exists in profiles table', NEW.email;
    -- Don't return here, let it continue as this might be a re-signup
  END IF;

  -- Insert the profile
  BEGIN
    INSERT INTO public.profiles (id, email, first_name, last_name, role, created_at, updated_at)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
      COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
      user_role_value,
      NOW(),
      NOW()
    );
    
    RAISE LOG 'Profile created successfully for user %', NEW.id;
    
  EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'Error creating profile for user %: SQLSTATE=%, MESSAGE=%', NEW.id, SQLSTATE, SQLERRM;
    -- Don't re-raise the exception, just log it and continue
    -- This prevents the signup from failing
  END;

  RETURN NEW;
END;
$$;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Update RLS policies to be more permissive for profile creation
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow service role to manage all profiles (for admin functions)
CREATE POLICY "Service role can manage all profiles" ON public.profiles
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
