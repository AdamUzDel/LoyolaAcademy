-- Seed sample data for Loyola Academy Learning Platform

-- Insert sample categories
INSERT INTO categories (id, name, description, icon) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Technology', 'Programming, AI, and tech skills', '💻'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Business', 'Entrepreneurship and business skills', '💼'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Design', 'UI/UX, graphic design, and creativity', '🎨'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Marketing', 'Digital marketing and growth strategies', '📈'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Health', 'Wellness and healthcare topics', '🏥');

-- Insert sample system alerts
INSERT INTO system_alerts (type, title, message, severity, resolved) VALUES
  ('warning', 'High Server Load', 'Server load is above 85%. Consider scaling resources.', 'medium', false),
  ('info', 'Backup Completed', 'Weekly backup completed successfully.', 'low', true),
  ('error', 'Payment Gateway Timeout', 'Payment gateway timeout reported by multiple users.', 'high', false);

-- Note: User profiles, courses, and other user-generated content will be created
-- through the application interface and authentication system
