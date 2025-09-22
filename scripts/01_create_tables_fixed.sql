-- Enable Row Level Security
-- ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
-- CREATE TYPE user_role AS ENUM ('learner', 'teacher', 'admin');
-- CREATE TYPE course_status AS ENUM ('draft', 'published', 'archived');
-- CREATE TYPE enrollment_status AS ENUM ('active', 'completed', 'cancelled');
-- CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role user_role NOT NULL DEFAULT 'learner',
  avatar_url TEXT,
  bio TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- Create functions and triggers
-- Fixed the trigger function to handle role casting properly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role_value user_role;
BEGIN
  -- Safely cast role with fallback to 'learner'
  BEGIN
    user_role_value := COALESCE(NEW.raw_user_meta_data->>'role', 'learner')::user_role;
  EXCEPTION WHEN invalid_text_representation THEN
    user_role_value := 'learner'::user_role;
  END;

  -- Check if profile already exists
  IF EXISTS (SELECT 1 FROM public.profiles WHERE id = NEW.id) THEN
    RAISE WARNING 'Profile already exists for user %', NEW.id;
    RETURN NEW;
  END IF;

  -- Check if email already exists
  IF EXISTS (SELECT 1 FROM public.profiles WHERE email = NEW.email) THEN
    RAISE WARNING 'Email % already exists in profiles table', NEW.email;
    RETURN NEW;
  END IF;

  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    user_role_value
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log detailed error information
  RAISE WARNING 'Error creating user profile - CODE: %, MESSAGE: %, DETAIL: %', SQLSTATE, SQLERRM, SQLDETAIL;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
