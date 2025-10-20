export type UserRole = "learner" | "teacher" | "admin"
export type CourseStatus = "draft" | "published" | "archived"
export type EnrollmentStatus = "active" | "completed" | "cancelled"
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded"
export type CourseLevel = "beginner" | "intermediate" | "advanced"

export interface Profile {
  id: string
  email: string
  first_name?: string
  last_name?: string
  role: UserRole
  avatar_url?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  title: string
  description?: string
  short_description?: string
  instructor_id: string
  category_id?: string
  price: number
  currency: string
  thumbnail_url?: string
  status: CourseStatus
  duration_hours: number
  level: CourseLevel
  created_at: string
  updated_at: string
}

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  status: EnrollmentStatus
  progress: number
  enrolled_at: string
  completed_at?: string
}

export interface Payment {
  id: string
  user_id: string
  course_id: string
  amount: number
  currency: string
  status: PaymentStatus
  payment_method?: string
  stripe_payment_intent_id?: string
  mobile_money_reference?: string
  created_at: string
  updated_at: string
}

export interface Certificate {
  id: string
  user_id: string
  course_id: string
  certificate_url?: string
  issued_at: string
}

export interface Category {
  id: string
  name: string
  description?: string
  icon?: string
  created_at: string
}

export interface CourseModule {
  id: string
  course_id: string
  title: string
  description?: string
  content?: string
  video_url?: string
  order_index: number
  duration_minutes: number
  created_at: string
}

const categories = [
  "Artificial Intelligence",
  "Web Development",
  "Data Science",
  "Business",
  "Cybersecurity",
  "Mobile Development",
  "Digital Marketing",
  "Blockchain",
  "Cloud Computing",
  "UI/UX Design",
]