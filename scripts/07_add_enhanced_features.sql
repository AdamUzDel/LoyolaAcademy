-- Migration script to add enhanced dashboard features to existing schema
-- This script adds new tables and columns without using enums

-- Add missing columns to existing profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS expertise TEXT[],
ADD COLUMN IF NOT EXISTS permissions TEXT[],
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended', 'banned')),
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('verified', 'pending', 'rejected')),
ADD COLUMN IF NOT EXISTS join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add missing columns to existing courses table
ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS total_lessons INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS tags TEXT[],
ADD COLUMN IF NOT EXISTS review_notes TEXT,
ADD COLUMN IF NOT EXISTS submitted_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS approved_date TIMESTAMP WITH TIME ZONE;

-- Update courses status check constraint to include new statuses
ALTER TABLE public.courses DROP CONSTRAINT IF EXISTS courses_status_check;
ALTER TABLE public.courses ADD CONSTRAINT courses_status_check 
CHECK (status IN ('draft', 'published', 'archived', 'pending_review', 'approved', 'rejected', 'needs_revision'));

-- Create lessons table (renamed from course_modules for consistency)
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration INTEGER DEFAULT 0, -- in minutes
  order_index INTEGER NOT NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lesson resources table
CREATE TABLE IF NOT EXISTS public.lesson_resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('pdf', 'video', 'link', 'quiz')),
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lesson progress table
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  watch_time INTEGER DEFAULT 0, -- in seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Create study goals table
CREATE TABLE IF NOT EXISTS public.study_goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_hours INTEGER NOT NULL,
  current_hours INTEGER DEFAULT 0,
  deadline TIMESTAMP WITH TIME ZONE,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create study groups table
CREATE TABLE IF NOT EXISTS public.study_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  next_meeting TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create study group members table
CREATE TABLE IF NOT EXISTS public.study_group_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.study_groups(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Create course ratings table
CREATE TABLE IF NOT EXISTS public.course_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Create content reports table
CREATE TABLE IF NOT EXISTS public.content_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('course', 'discussion', 'user', 'review')),
  content_id TEXT NOT NULL, -- can reference different table IDs
  content_title TEXT NOT NULL,
  reported_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN ('inappropriate', 'spam', 'copyright', 'harassment', 'other')),
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
  reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  review_date TIMESTAMP WITH TIME ZONE,
  action TEXT CHECK (action IN ('warning', 'content_removed', 'user_suspended', 'no_action')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create system alerts table
CREATE TABLE IF NOT EXISTS public.system_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('error', 'warning', 'info', 'success')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Update payments table to match new structure
ALTER TABLE public.payments 
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);
CREATE INDEX IF NOT EXISTS idx_courses_instructor ON public.courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON public.courses(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON public.enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON public.lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson ON public.lesson_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_study_goals_user ON public.study_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_content_reports_status ON public.content_reports(status);
CREATE INDEX IF NOT EXISTS idx_system_alerts_resolved ON public.system_alerts(resolved);

-- Enable Row Level Security on new tables
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_alerts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for new tables

-- Lessons policies
CREATE POLICY "Published lessons are viewable by everyone" ON public.lessons
  FOR SELECT USING (is_published = true OR EXISTS (
    SELECT 1 FROM public.courses WHERE id = lessons.course_id AND instructor_id = auth.uid()
  ));

CREATE POLICY "Instructors can manage their lessons" ON public.lessons
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.courses WHERE id = lessons.course_id AND instructor_id = auth.uid()
  ));

-- Study goals policies
CREATE POLICY "Users can manage their own study goals" ON public.study_goals
  FOR ALL USING (auth.uid() = user_id);

-- Study groups policies
CREATE POLICY "Study groups are viewable by everyone" ON public.study_groups
  FOR SELECT USING (true);

CREATE POLICY "Users can create study groups" ON public.study_groups
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Group creators can update their groups" ON public.study_groups
  FOR UPDATE USING (auth.uid() = created_by);

-- Study group members policies
CREATE POLICY "Group members are viewable by everyone" ON public.study_group_members
  FOR SELECT USING (true);

CREATE POLICY "Users can join study groups" ON public.study_group_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave study groups" ON public.study_group_members
  FOR DELETE USING (auth.uid() = user_id);

-- Course ratings policies
CREATE POLICY "Course ratings are viewable by everyone" ON public.course_ratings
  FOR SELECT USING (true);

CREATE POLICY "Users can rate courses they're enrolled in" ON public.course_ratings
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND 
    EXISTS (SELECT 1 FROM public.enrollments WHERE user_id = auth.uid() AND course_id = course_ratings.course_id)
  );

CREATE POLICY "Users can update their own ratings" ON public.course_ratings
  FOR UPDATE USING (auth.uid() = user_id);

-- Content reports policies (admin only for viewing)
CREATE POLICY "Admins can view all reports" ON public.content_reports
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can create reports" ON public.content_reports
  FOR INSERT WITH CHECK (auth.uid() = reported_by);

-- System alerts policies (admin only)
CREATE POLICY "Admins can manage system alerts" ON public.system_alerts
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Grant necessary permissions
GRANT ALL ON public.lessons TO anon, authenticated;
GRANT ALL ON public.lesson_resources TO anon, authenticated;
GRANT ALL ON public.lesson_progress TO anon, authenticated;
GRANT ALL ON public.study_goals TO anon, authenticated;
GRANT ALL ON public.study_groups TO anon, authenticated;
GRANT ALL ON public.study_group_members TO anon, authenticated;
GRANT ALL ON public.course_ratings TO anon, authenticated;
GRANT ALL ON public.content_reports TO anon, authenticated;
GRANT ALL ON public.system_alerts TO anon, authenticated;
