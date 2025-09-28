-- Row Level Security Policies for Loyola Academy Learning Platform

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can update any profile" ON profiles FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Categories policies (public read, admin write)
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Courses policies
CREATE POLICY "Anyone can view published courses" ON courses FOR SELECT USING (
  status = 'published' OR 
  instructor_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

CREATE POLICY "Teachers can create courses" ON courses FOR INSERT WITH CHECK (
  instructor_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('teacher', 'admin', 'super_admin')
  )
);

CREATE POLICY "Teachers can update own courses" ON courses FOR UPDATE USING (
  instructor_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

CREATE POLICY "Teachers can delete own courses" ON courses FOR DELETE USING (
  instructor_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Lessons policies
CREATE POLICY "Users can view lessons of enrolled/owned courses" ON lessons FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM courses c
    WHERE c.id = course_id 
    AND (
      c.instructor_id = auth.uid() OR
      c.status = 'published' OR
      EXISTS (
        SELECT 1 FROM enrollments e 
        WHERE e.course_id = c.id AND e.user_id = auth.uid()
      ) OR
      EXISTS (
        SELECT 1 FROM profiles p
        WHERE p.id = auth.uid() 
        AND p.role IN ('admin', 'super_admin')
      )
    )
  )
);

CREATE POLICY "Teachers can manage lessons of own courses" ON lessons FOR ALL USING (
  EXISTS (
    SELECT 1 FROM courses c
    WHERE c.id = course_id 
    AND (
      c.instructor_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM profiles p
        WHERE p.id = auth.uid() 
        AND p.role IN ('admin', 'super_admin')
      )
    )
  )
);

-- Lesson resources policies
CREATE POLICY "Users can view resources of accessible lessons" ON lesson_resources FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM lessons l
    JOIN courses c ON c.id = l.course_id
    WHERE l.id = lesson_id 
    AND (
      c.instructor_id = auth.uid() OR
      c.status = 'published' OR
      EXISTS (
        SELECT 1 FROM enrollments e 
        WHERE e.course_id = c.id AND e.user_id = auth.uid()
      ) OR
      EXISTS (
        SELECT 1 FROM profiles p
        WHERE p.id = auth.uid() 
        AND p.role IN ('admin', 'super_admin')
      )
    )
  )
);

CREATE POLICY "Teachers can manage resources of own lessons" ON lesson_resources FOR ALL USING (
  EXISTS (
    SELECT 1 FROM lessons l
    JOIN courses c ON c.id = l.course_id
    WHERE l.id = lesson_id 
    AND (
      c.instructor_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM profiles p
        WHERE p.id = auth.uid() 
        AND p.role IN ('admin', 'super_admin')
      )
    )
  )
);

-- Enrollments policies
CREATE POLICY "Users can view own enrollments" ON enrollments FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create own enrollments" ON enrollments FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own enrollments" ON enrollments FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Admins can view all enrollments" ON enrollments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Lesson progress policies
CREATE POLICY "Users can manage own lesson progress" ON lesson_progress FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Teachers can view progress of their course lessons" ON lesson_progress FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM lessons l
    JOIN courses c ON c.id = l.course_id
    WHERE l.id = lesson_id 
    AND c.instructor_id = auth.uid()
  )
);

-- Certificates policies
CREATE POLICY "Users can view own certificates" ON certificates FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "System can create certificates" ON certificates FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all certificates" ON certificates FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Study goals policies
CREATE POLICY "Users can manage own study goals" ON study_goals FOR ALL USING (user_id = auth.uid());

-- Study groups policies
CREATE POLICY "Users can view all study groups" ON study_groups FOR SELECT USING (true);
CREATE POLICY "Users can create study groups" ON study_groups FOR INSERT WITH CHECK (created_by = auth.uid());
CREATE POLICY "Group creators can update their groups" ON study_groups FOR UPDATE USING (created_by = auth.uid());
CREATE POLICY "Group creators can delete their groups" ON study_groups FOR DELETE USING (created_by = auth.uid());

-- Study group members policies
CREATE POLICY "Users can view group memberships" ON study_group_members FOR SELECT USING (true);
CREATE POLICY "Users can join groups" ON study_group_members FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can leave groups" ON study_group_members FOR DELETE USING (user_id = auth.uid());

-- Course ratings policies
CREATE POLICY "Anyone can view course ratings" ON course_ratings FOR SELECT USING (true);
CREATE POLICY "Enrolled users can rate courses" ON course_ratings FOR INSERT WITH CHECK (
  user_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM enrollments 
    WHERE user_id = auth.uid() AND course_id = course_ratings.course_id
  )
);
CREATE POLICY "Users can update own ratings" ON course_ratings FOR UPDATE USING (user_id = auth.uid());

-- Content reports policies
CREATE POLICY "Users can create reports" ON content_reports FOR INSERT WITH CHECK (reported_by = auth.uid());
CREATE POLICY "Admins can view and manage reports" ON content_reports FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- System alerts policies
CREATE POLICY "Admins can manage system alerts" ON system_alerts FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Payment transactions policies
CREATE POLICY "Users can view own transactions" ON payment_transactions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "System can create transactions" ON payment_transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all transactions" ON payment_transactions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);
