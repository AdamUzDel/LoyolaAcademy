-- Ensure the user_role enum exists
DO $$ 
BEGIN
    -- Check if the enum type exists, if not create it
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('learner', 'teacher', 'admin');
        RAISE NOTICE 'Created user_role enum type';
    ELSE
        RAISE NOTICE 'user_role enum type already exists';
    END IF;
END $$;

-- Ensure other enum types exist as well
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'course_status') THEN
        CREATE TYPE course_status AS ENUM ('draft', 'published', 'archived');
        RAISE NOTICE 'Created course_status enum type';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enrollment_status') THEN
        CREATE TYPE enrollment_status AS ENUM ('active', 'completed', 'cancelled');
        RAISE NOTICE 'Created enrollment_status enum type';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status') THEN
        CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
        RAISE NOTICE 'Created payment_status enum type';
    END IF;
END $$;

-- Create or replace the trigger function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_role_value user_role;
BEGIN
  -- Log the attempt
  RAISE NOTICE 'Creating profile for user: %', NEW.id;
  
  -- Safely cast role with fallback to 'learner'
  BEGIN
    user_role_value := COALESCE(NEW.raw_user_meta_data->>'role', 'learner')::user_role;
    RAISE NOTICE 'Role set to: %', user_role_value;
  EXCEPTION WHEN invalid_text_representation THEN
    user_role_value := 'learner'::user_role;
    RAISE NOTICE 'Invalid role provided, defaulting to learner';
  END;

  -- Check if profile already exists
  IF EXISTS (SELECT 1 FROM public.profiles WHERE id = NEW.id) THEN
    RAISE NOTICE 'Profile already exists for user %', NEW.id;
    RETURN NEW;
  END IF;

  -- Check if email already exists
  IF EXISTS (SELECT 1 FROM public.profiles WHERE email = NEW.email) THEN
    RAISE NOTICE 'Email % already exists in profiles table', NEW.email;
    RETURN NEW;
  END IF;

  -- Insert the profile
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    user_role_value
  );
  
  RAISE NOTICE 'Successfully created profile for user %', NEW.id;
  RETURN NEW;
  
EXCEPTION WHEN OTHERS THEN
  -- Log the error but don't fail the signup
  RAISE WARNING 'Error creating user profile for %: SQLSTATE: %, MESSAGE: %', NEW.id, SQLSTATE, SQLERRM;
  RETURN NEW;
END;
$$;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

RAISE NOTICE 'Database schema and trigger function updated successfully';
