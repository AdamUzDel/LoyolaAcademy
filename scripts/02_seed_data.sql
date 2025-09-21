-- Insert categories
INSERT INTO public.categories (id, name, slug, description, icon) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Artificial Intelligence', 'artificial-intelligence', 'Learn AI fundamentals, machine learning, and deep learning', 'brain'),
('550e8400-e29b-41d4-a716-446655440002', 'Web Development', 'web-development', 'Frontend and backend web development technologies', 'code'),
('550e8400-e29b-41d4-a716-446655440003', 'Data Science', 'data-science', 'Data analysis, visualization, and statistical modeling', 'bar-chart'),
('550e8400-e29b-41d4-a716-446655440004', 'Cybersecurity', 'cybersecurity', 'Information security and ethical hacking', 'shield'),
('550e8400-e29b-41d4-a716-446655440005', 'Digital Literacy', 'digital-literacy', 'Basic computer skills and digital citizenship', 'computer'),
('550e8400-e29b-41d4-a716-446655440006', 'Mobile Development', 'mobile-development', 'iOS and Android app development', 'smartphone');

-- Insert sample instructor profiles (these will be created when users sign up)
-- Note: In real implementation, these would be created through the auth system

-- Insert sample courses
INSERT INTO public.courses (id, title, slug, description, short_description, thumbnail_url, category_id, price, currency, status, level, duration_hours, language, requirements, what_you_learn, is_featured) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Introduction to AI for Africa', 'intro-ai-africa', 'A comprehensive introduction to Artificial Intelligence tailored for African contexts and applications. Learn the fundamentals of AI, machine learning, and how these technologies can address local challenges and opportunities.', 'Learn AI fundamentals with African context and real-world applications', '/ai-course-thumbnail.png', '550e8400-e29b-41d4-a716-446655440001', 49.99, 'USD', 'published', 'beginner', 12, 'en', ARRAY['Basic computer literacy', 'High school mathematics'], ARRAY['AI fundamentals and concepts', 'Machine learning basics', 'AI applications in African contexts', 'Ethical AI considerations', 'Hands-on projects'], true),

('650e8400-e29b-41d4-a716-446655440002', 'Full-Stack Web Development', 'fullstack-web-development', 'Master modern web development with React, Node.js, and databases. Build real-world applications from frontend to backend with deployment strategies.', 'Complete web development course from frontend to backend', '/web-development-course.png', '550e8400-e29b-41d4-a716-446655440002', 89.99, 'USD', 'published', 'intermediate', 40, 'en', ARRAY['Basic HTML/CSS knowledge', 'JavaScript fundamentals'], ARRAY['React.js development', 'Node.js and Express', 'Database design and management', 'API development', 'Deployment and DevOps'], true),

('650e8400-e29b-41d4-a716-446655440003', 'Python for Data Science', 'python-data-science', 'Learn Python programming for data analysis, visualization, and machine learning. Perfect for beginners wanting to enter the data science field.', 'Master Python for data analysis and machine learning', '/python-data-science-course.png', '550e8400-e29b-41d4-a716-446655440003', 69.99, 'USD', 'published', 'beginner', 25, 'en', ARRAY['No programming experience required'], ARRAY['Python programming fundamentals', 'Data manipulation with Pandas', 'Data visualization', 'Statistical analysis', 'Machine learning basics'], false),

('650e8400-e29b-41d4-a716-446655440004', 'Digital Literacy Essentials', 'digital-literacy-essentials', 'Essential digital skills for the modern world. Learn computer basics, internet safety, and productivity tools.', 'Master essential digital skills for personal and professional use', '/digital-literacy-course.jpg', '550e8400-e29b-41d4-a716-446655440005', 0.00, 'USD', 'published', 'beginner', 8, 'en', ARRAY['No prior experience required'], ARRAY['Computer basics and navigation', 'Internet safety and security', 'Email and communication tools', 'Document creation and editing', 'Online collaboration'], true),

('650e8400-e29b-41d4-a716-446655440005', 'Cybersecurity Fundamentals', 'cybersecurity-fundamentals', 'Learn the basics of cybersecurity, threat detection, and protection strategies for individuals and organizations.', 'Understand cybersecurity threats and protection strategies', '/cybersecurity-course.png', '550e8400-e29b-41d4-a716-446655440004', 79.99, 'USD', 'published', 'intermediate', 20, 'en', ARRAY['Basic computer knowledge', 'Understanding of networks'], ARRAY['Security fundamentals', 'Threat identification', 'Risk assessment', 'Security tools and techniques', 'Incident response'], false),

('650e8400-e29b-41d4-a716-446655440006', 'Machine Learning Mastery', 'machine-learning-mastery', 'Advanced machine learning course covering algorithms, model selection, and real-world applications.', 'Master machine learning algorithms and applications', '/machine-learning-course.png', '550e8400-e29b-41d4-a716-446655440001', 129.99, 'USD', 'published', 'advanced', 35, 'en', ARRAY['Python programming', 'Statistics knowledge', 'Linear algebra basics'], ARRAY['ML algorithms and theory', 'Model evaluation and selection', 'Deep learning introduction', 'Real-world ML projects', 'MLOps and deployment'], true),

('650e8400-e29b-41d4-a716-446655440007', 'React Native Mobile Development', 'react-native-mobile-dev', 'Build cross-platform mobile applications using React Native. Learn to create apps for both iOS and Android.', 'Create mobile apps for iOS and Android with React Native', '/react-native-course.png', '550e8400-e29b-41d4-a716-446655440006', 99.99, 'USD', 'published', 'intermediate', 30, 'en', ARRAY['JavaScript knowledge', 'React.js basics'], ARRAY['React Native fundamentals', 'Navigation and routing', 'State management', 'Native device features', 'App store deployment'], false),

('650e8400-e29b-41d4-a716-446655440008', 'Digital Marketing for Tech', 'digital-marketing-tech', 'Learn digital marketing strategies specifically for technology companies and startups.', 'Master digital marketing for tech companies and startups', '/digital-marketing-course.png', '550e8400-e29b-41d4-a716-446655440002', 59.99, 'USD', 'published', 'beginner', 15, 'en', ARRAY['Basic marketing knowledge'], ARRAY['Digital marketing fundamentals', 'Content marketing strategies', 'Social media marketing', 'SEO and SEM', 'Analytics and measurement'], false);

-- Insert modules for courses
INSERT INTO public.modules (id, course_id, title, description, order_index) VALUES
-- AI Course Modules
('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'Introduction to AI', 'Understanding what AI is and its applications', 1),
('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', 'Machine Learning Basics', 'Fundamentals of machine learning algorithms', 2),
('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001', 'AI in African Context', 'How AI can solve African challenges', 3),
('750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440001', 'Hands-on Projects', 'Build your first AI applications', 4),

-- Web Development Course Modules
('750e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440002', 'Frontend Development', 'HTML, CSS, and JavaScript fundamentals', 1),
('750e8400-e29b-41d4-a716-446655440006', '650e8400-e29b-41d4-a716-446655440002', 'React.js Mastery', 'Building modern UIs with React', 2),
('750e8400-e29b-41d4-a716-446655440007', '650e8400-e29b-41d4-a716-446655440002', 'Backend Development', 'Node.js and Express server development', 3),
('750e8400-e29b-41d4-a716-446655440008', '650e8400-e29b-41d4-a716-446655440002', 'Database Integration', 'Working with databases and APIs', 4),
('750e8400-e29b-41d4-a716-446655440009', '650e8400-e29b-41d4-a716-446655440002', 'Deployment & DevOps', 'Deploying applications to production', 5);

-- Insert sample lessons
INSERT INTO public.lessons (id, module_id, title, description, content, video_url, duration_minutes, order_index, is_preview) VALUES
-- AI Course Lessons
('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', 'What is Artificial Intelligence?', 'Introduction to AI concepts and definitions', 'In this lesson, we explore the fundamental concepts of Artificial Intelligence...', 'https://example.com/video1', 15, 1, true),
('850e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440001', 'History of AI', 'Evolution of AI from concept to reality', 'Learn about the fascinating history of AI development...', 'https://example.com/video2', 20, 2, false),
('850e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440001', 'Types of AI', 'Understanding different categories of AI systems', 'Explore the various types of AI systems and their applications...', 'https://example.com/video3', 18, 3, false),

-- Web Development Course Lessons
('850e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440005', 'HTML Fundamentals', 'Building blocks of web pages', 'Learn the essential HTML elements and structure...', 'https://example.com/video4', 25, 1, true),
('850e8400-e29b-41d4-a716-446655440005', '750e8400-e29b-41d4-a716-446655440005', 'CSS Styling', 'Making web pages beautiful with CSS', 'Master CSS selectors, properties, and layouts...', 'https://example.com/video5', 30, 2, false),
('850e8400-e29b-41d4-a716-446655440006', '750e8400-e29b-41d4-a716-446655440005', 'JavaScript Basics', 'Adding interactivity to web pages', 'Learn JavaScript fundamentals and DOM manipulation...', 'https://example.com/video6', 35, 3, false);

-- Insert sample reviews
INSERT INTO public.reviews (id, course_id, rating, comment, created_at) VALUES
('950e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 5, 'Excellent course! The African context made it very relevant to my work.', NOW() - INTERVAL '10 days'),
('950e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', 4, 'Great introduction to AI. Well structured and easy to follow.', NOW() - INTERVAL '5 days'),
('950e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440002', 5, 'Comprehensive web development course. Learned so much!', NOW() - INTERVAL '15 days'),
('950e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440003', 4, 'Perfect for beginners. Python concepts explained clearly.', NOW() - INTERVAL '8 days'),
('950e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440004', 5, 'Essential skills for everyone. Great free course!', NOW() - INTERVAL '3 days');

-- Create indexes for better performance
CREATE INDEX idx_courses_status ON public.courses(status);
CREATE INDEX idx_courses_category ON public.courses(category_id);
CREATE INDEX idx_courses_instructor ON public.courses(instructor_id);
CREATE INDEX idx_enrollments_user ON public.enrollments(user_id);
CREATE INDEX idx_enrollments_course ON public.enrollments(course_id);
CREATE INDEX idx_lesson_progress_user ON public.lesson_progress(user_id);
CREATE INDEX idx_reviews_course ON public.reviews(course_id);
CREATE INDEX idx_payments_user ON public.payments(user_id);
CREATE INDEX idx_certificates_user ON public.certificates(user_id);
