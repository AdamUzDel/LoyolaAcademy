import { createClient } from "@/lib/supabase/client"
import type { createServerSupabaseClient } from "@/lib/supabase/server"
import type { LearnerProfile, EnrolledCourse, Certificate, StudyGoal, StudyGroup } from "@/hooks/use-learner-data"
import type { TeacherProfile, Course } from "@/hooks/use-teacher-data"
import type {
  AdminProfile,
  PlatformUser,
  CourseApproval,
  ContentReport,
  PlatformAnalytics,
  SystemAlert,
} from "@/hooks/use-admin-data"

// Client-side database service
export class SupabaseService {
  private supabase = createClient()

  // Learner data methods
  async getLearnerProfile(userId: string): Promise<LearnerProfile | null> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select(`
        id,
        first_name,
        last_name,
        avatar_url,
        join_date,
        created_at
      `)
      .eq("id", userId)
      .eq("role", "learner")
      .single()

    if (error || !data) return null

    // Get additional stats
    const [enrollmentsResult, certificatesResult] = await Promise.all([
      this.supabase.from("enrollments").select("id, progress, completed_at").eq("user_id", userId),
      this.supabase.from("certificates").select("id").eq("user_id", userId),
    ])

    const totalHours = enrollmentsResult.data?.reduce((sum, enrollment) => sum + (enrollment.progress || 0), 0) || 0
    const completedCourses = enrollmentsResult.data?.filter((e) => e.completed_at).length || 0
    const certificates = certificatesResult.data?.length || 0

    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: "", // Will be populated from auth
      avatar: data.avatar_url,
      joinDate: data.join_date || data.created_at,
      totalHours: Math.floor(totalHours / 10), // Convert progress to hours estimate
      dayStreak: 12, // TODO: Calculate from lesson_progress
      completedCourses,
      certificates,
    }
  }

  async getEnrolledCourses(userId: string): Promise<EnrolledCourse[]> {
    const { data, error } = await this.supabase
      .from("enrollments")
      .select(`
        id,
        progress,
        last_accessed,
        course_id,
        courses (
          id,
          title,
          thumbnail_url,
          total_lessons,
          categories (name),
          profiles (first_name, last_name)
        )
      `)
      .eq("user_id", userId)

    if (error || !data) return []

    return data.map((enrollment) => ({
      id: enrollment.course_id,
      title: enrollment.courses.title,
      instructor: `${enrollment.courses.profiles.first_name} ${enrollment.courses.profiles.last_name}`,
      progress: enrollment.progress || 0,
      totalLessons: enrollment.courses.total_lessons || 0,
      completedLessons: Math.floor(((enrollment.progress || 0) * (enrollment.courses.total_lessons || 0)) / 100),
      thumbnail: enrollment.courses.thumbnail_url || "/online-learning-platform.png",
      category: enrollment.courses.categories?.name || "General",
      nextDeadline: undefined, // TODO: Implement deadlines
    }))
  }

  async getCertificates(userId: string): Promise<Certificate[]> {
    const { data, error } = await this.supabase
      .from("certificates")
      .select(`
        id,
        certificate_url,
        issued_at,
        courses (
          title,
          profiles (first_name, last_name)
        )
      `)
      .eq("user_id", userId)

    if (error || !data) return []

    return data.map((cert) => ({
      id: cert.id,
      courseTitle: cert.courses.title,
      completedDate: cert.issued_at,
      certificateUrl: cert.certificate_url,
      instructor: `${cert.courses.profiles.first_name} ${cert.courses.profiles.last_name}`,
    }))
  }

  async getStudyGoals(userId: string): Promise<StudyGoal[]> {
    const { data, error } = await this.supabase
      .from("study_goals")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error || !data) return []

    return data.map((goal) => ({
      id: goal.id,
      title: goal.title,
      description: goal.description || "",
      targetHours: goal.target_hours,
      currentHours: goal.current_hours,
      deadline: goal.deadline,
      completed: goal.completed,
    }))
  }

  async getStudyGroups(userId: string): Promise<StudyGroup[]> {
    const { data, error } = await this.supabase
      .from("study_group_members")
      .select(`
        study_groups (
          id,
          name,
          description,
          next_meeting,
          courses (title),
          study_group_members (count)
        )
      `)
      .eq("user_id", userId)

    if (error || !data) return []

    return data.map((membership) => ({
      id: membership.study_groups.id,
      name: membership.study_groups.name,
      course: membership.study_groups.courses?.title || "General",
      members: membership.study_groups.study_group_members?.length || 0,
      nextMeeting: membership.study_groups.next_meeting,
      description: membership.study_groups.description || "",
    }))
  }

  // Study goals CRUD operations
  async addStudyGoal(userId: string, goal: Omit<StudyGoal, "id">): Promise<StudyGoal | null> {
    const { data, error } = await this.supabase
      .from("study_goals")
      .insert({
        user_id: userId,
        title: goal.title,
        description: goal.description,
        target_hours: goal.targetHours,
        current_hours: goal.currentHours,
        deadline: goal.deadline,
        completed: goal.completed,
      })
      .select()
      .single()

    if (error || !data) return null

    return {
      id: data.id,
      title: data.title,
      description: data.description || "",
      targetHours: data.target_hours,
      currentHours: data.current_hours,
      deadline: data.deadline,
      completed: data.completed,
    }
  }

  async updateStudyGoal(goalId: string, updates: Partial<StudyGoal>): Promise<boolean> {
    const { error } = await this.supabase
      .from("study_goals")
      .update({
        title: updates.title,
        description: updates.description,
        target_hours: updates.targetHours,
        current_hours: updates.currentHours,
        deadline: updates.deadline,
        completed: updates.completed,
      })
      .eq("id", goalId)

    return !error
  }

  async deleteStudyGoal(goalId: string): Promise<boolean> {
    const { error } = await this.supabase.from("study_goals").delete().eq("id", goalId)

    return !error
  }

  // Teacher data methods
  async getTeacherProfile(userId: string): Promise<TeacherProfile | null> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select(`
        id,
        first_name,
        last_name,
        avatar_url,
        bio,
        expertise,
        join_date,
        created_at
      `)
      .eq("id", userId)
      .eq("role", "teacher")
      .single()

    if (error || !data) return null

    // Get teacher stats
    const [coursesResult, enrollmentsResult, ratingsResult] = await Promise.all([
      this.supabase.from("courses").select("id").eq("instructor_id", userId),
      this.supabase
        .from("enrollments")
        .select("course_id, courses!inner(instructor_id)")
        .eq("courses.instructor_id", userId),
      this.supabase
        .from("course_ratings")
        .select("rating, courses!inner(instructor_id)")
        .eq("courses.instructor_id", userId),
    ])

    const totalCourses = coursesResult.data?.length || 0
    const totalStudents = enrollmentsResult.data?.length || 0
    const avgRating = ratingsResult.data?.length
      ? ratingsResult.data.reduce((sum, r) => sum + r.rating, 0) / ratingsResult.data.length
      : 0

    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: "", // Will be populated from auth
      avatar: data.avatar_url,
      bio: data.bio || "",
      expertise: data.expertise || [],
      joinDate: data.join_date || data.created_at,
      totalCourses,
      totalStudents,
      totalEarnings: 0, // TODO: Calculate from payment_transactions
      avgRating,
    }
  }

  async getTeacherCourses(userId: string): Promise<Course[]> {
    const { data, error } = await this.supabase
      .from("courses")
      .select(`
        id,
        title,
        description,
        level,
        price,
        thumbnail_url,
        status,
        total_lessons,
        tags,
        created_at,
        updated_at,
        categories (name),
        enrollments (count),
        course_ratings (rating)
      `)
      .eq("instructor_id", userId)
      .order("updated_at", { ascending: false })

    if (error || !data) return []

    return data.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      category: course.categories?.name || "General",
      level: course.level as "Beginner" | "Intermediate" | "Advanced",
      price: Number.parseFloat(course.price?.toString() || "0"),
      thumbnail: course.thumbnail_url,
      status: course.status as "draft" | "published" | "archived",
      students: course.enrollments?.length || 0,
      rating: course.course_ratings?.length
        ? course.course_ratings.reduce((sum, r) => sum + r.rating, 0) / course.course_ratings.length
        : 0,
      earnings: 0, // TODO: Calculate from payment_transactions
      totalLessons: course.total_lessons || 0,
      completionRate: 0, // TODO: Calculate from lesson_progress
      lastUpdated: course.updated_at,
      createdAt: course.created_at,
      tags: course.tags || [],
    }))
  }

  // Course CRUD operations
  async createCourse(
    userId: string,
    courseData: Omit<
      Course,
      "id" | "students" | "rating" | "earnings" | "completionRate" | "createdAt" | "lastUpdated"
    >,
  ): Promise<Course | null> {
    // Get category ID
    const { data: category } = await this.supabase
      .from("categories")
      .select("id")
      .eq("name", courseData.category)
      .single()

    const { data, error } = await this.supabase
      .from("courses")
      .insert({
        instructor_id: userId,
        title: courseData.title,
        description: courseData.description,
        category_id: category?.id,
        level: courseData.level,
        price: courseData.price,
        thumbnail_url: courseData.thumbnail,
        status: courseData.status,
        total_lessons: courseData.totalLessons,
        tags: courseData.tags,
      })
      .select()
      .single()

    if (error || !data) return null

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      category: courseData.category,
      level: data.level as "Beginner" | "Intermediate" | "Advanced",
      price: Number.parseFloat(data.price?.toString() || "0"),
      thumbnail: data.thumbnail_url,
      status: data.status as "draft" | "published" | "archived",
      students: 0,
      rating: 0,
      earnings: 0,
      totalLessons: data.total_lessons || 0,
      completionRate: 0,
      lastUpdated: data.updated_at,
      createdAt: data.created_at,
      tags: data.tags || [],
    }
  }

  async updateCourse(courseId: string, updates: Partial<Course>): Promise<boolean> {
    const { error } = await this.supabase
      .from("courses")
      .update({
        title: updates.title,
        description: updates.description,
        level: updates.level,
        price: updates.price,
        thumbnail_url: updates.thumbnail,
        status: updates.status,
        total_lessons: updates.totalLessons,
        tags: updates.tags,
        updated_at: new Date().toISOString(),
      })
      .eq("id", courseId)

    return !error
  }

  async deleteCourse(courseId: string): Promise<boolean> {
    const { error } = await this.supabase.from("courses").delete().eq("id", courseId)

    return !error
  }

  // Admin data methods
  async getAdminProfile(userId: string): Promise<AdminProfile | null> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select(`
        id,
        first_name,
        last_name,
        avatar_url,
        role,
        permissions,
        last_active
      `)
      .eq("id", userId)
      .in("role", ["admin", "super_admin"])
      .single()

    if (error || !data) return null

    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: "", // Will be populated from auth
      avatar: data.avatar_url,
      role: data.role as "admin" | "super_admin",
      permissions: data.permissions || [],
      lastLogin: data.last_active,
    }
  }

  async getPlatformUsers(): Promise<PlatformUser[]> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select(`
        id,
        first_name,
        last_name,
        role,
        status,
        verification_status,
        join_date,
        last_active,
        avatar_url,
        enrollments (count),
        courses (count)
      `)
      .order("join_date", { ascending: false })

    if (error || !data) return []

    return data.map((user) => ({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: "", // Email not exposed for privacy
      role: user.role as "learner" | "teacher" | "admin",
      status: user.status as "active" | "pending" | "suspended" | "banned",
      joinDate: user.join_date,
      lastActive: user.last_active,
      avatar: user.avatar_url,
      coursesEnrolled: user.enrollments?.length,
      coursesCreated: user.courses?.length,
      totalEarnings: 0, // TODO: Calculate from payment_transactions
      verificationStatus: user.verification_status as "verified" | "pending" | "rejected",
    }))
  }

  async getCourseApprovals(): Promise<CourseApproval[]> {
    const { data, error } = await this.supabase
      .from("courses")
      .select(`
        id,
        title,
        description,
        level,
        price,
        thumbnail_url,
        total_lessons,
        submitted_date,
        status,
        review_notes,
        categories (name),
        profiles (id, first_name, last_name)
      `)
      .in("status", ["pending_review", "needs_revision"])
      .order("submitted_date", { ascending: true })

    if (error || !data) return []

    return data.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      instructor: {
        id: course.profiles.id,
        name: `${course.profiles.first_name} ${course.profiles.last_name}`,
        email: "", // Email not exposed
      },
      category: course.categories?.name || "General",
      level: course.level as "Beginner" | "Intermediate" | "Advanced",
      price: Number.parseFloat(course.price?.toString() || "0"),
      submittedDate: course.submitted_date,
      status: course.status as "pending_review" | "approved" | "rejected" | "needs_revision",
      reviewNotes: course.review_notes,
      thumbnail: course.thumbnail_url,
      totalLessons: course.total_lessons || 0,
    }))
  }

  async getContentReports(): Promise<ContentReport[]> {
    const { data, error } = await this.supabase
      .from("content_reports")
      .select(`
        id,
        type,
        content_id,
        content_title,
        reason,
        description,
        status,
        action,
        created_at,
        review_date,
        profiles!content_reports_reported_by_fkey (id, first_name, last_name),
        reviewer:profiles!content_reports_reviewed_by_fkey (id, first_name, last_name)
      `)
      .order("created_at", { ascending: false })

    if (error || !data) return []

    return data.map((report) => ({
      id: report.id,
      type: report.type as "course" | "discussion" | "user" | "review",
      contentId: report.content_id,
      contentTitle: report.content_title,
      reportedBy: {
        id: report.profiles.id,
        name: `${report.profiles.first_name} ${report.profiles.last_name}`,
      },
      reason: report.reason as "inappropriate" | "spam" | "copyright" | "harassment" | "other",
      description: report.description,
      status: report.status as "pending" | "resolved" | "dismissed",
      reportDate: report.created_at,
      reviewedBy: report.reviewer?.id,
      reviewDate: report.review_date,
      action: report.action as "warning" | "content_removed" | "user_suspended" | "no_action" | undefined,
    }))
  }

  async getSystemAlerts(): Promise<SystemAlert[]> {
    const { data, error } = await this.supabase
      .from("system_alerts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error || !data) return []

    return data.map((alert) => ({
      id: alert.id,
      type: alert.type as "error" | "warning" | "info" | "success",
      title: alert.title,
      message: alert.message,
      timestamp: alert.created_at,
      resolved: alert.resolved,
      severity: alert.severity as "low" | "medium" | "high" | "critical",
    }))
  }

  async getPlatformAnalytics(): Promise<PlatformAnalytics | null> {
    // This would typically involve multiple queries and calculations
    // For now, returning basic counts
    const [usersResult, coursesResult, categoriesResult] = await Promise.all([
      this.supabase.from("profiles").select("id", { count: "exact" }),
      this.supabase.from("courses").select("id", { count: "exact" }),
      this.supabase.from("categories").select("name, courses(count)"),
    ])

    return {
      totalUsers: usersResult.count || 0,
      totalCourses: coursesResult.count || 0,
      totalRevenue: 0, // TODO: Calculate from payment_transactions
      activeInstructors: 0, // TODO: Calculate active teachers
      pendingApprovals: 0, // TODO: Count pending course approvals
      reportedContent: 0, // TODO: Count pending reports
      userGrowth: [], // TODO: Calculate monthly growth
      revenueGrowth: [], // TODO: Calculate monthly revenue
      courseCompletionRate: 0, // TODO: Calculate from enrollments
      averageRating: 0, // TODO: Calculate from course_ratings
      topCategories:
        categoriesResult.data?.map((cat) => ({
          category: cat.name,
          count: cat.courses?.length || 0,
        })) || [],
    }
  }

  // Admin actions
  async updateUserStatus(userId: string, status: "active" | "pending" | "suspended" | "banned"): Promise<boolean> {
    const { error } = await this.supabase.from("profiles").update({ status }).eq("id", userId)

    return !error
  }

  async approveCourse(courseId: string, reviewNotes?: string): Promise<boolean> {
    const { error } = await this.supabase
      .from("courses")
      .update({
        status: "approved",
        review_notes: reviewNotes,
        approved_date: new Date().toISOString(),
      })
      .eq("id", courseId)

    return !error
  }

  async rejectCourse(courseId: string, reviewNotes: string): Promise<boolean> {
    const { error } = await this.supabase
      .from("courses")
      .update({
        status: "rejected",
        review_notes: reviewNotes,
      })
      .eq("id", courseId)

    return !error
  }

  async resolveReport(
    reportId: string,
    action: "warning" | "content_removed" | "user_suspended" | "no_action",
    reviewerId: string,
  ): Promise<boolean> {
    const { error } = await this.supabase
      .from("content_reports")
      .update({
        status: "resolved",
        action,
        reviewed_by: reviewerId,
        review_date: new Date().toISOString(),
      })
      .eq("id", reportId)

    return !error
  }

  async dismissReport(reportId: string, reviewerId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from("content_reports")
      .update({
        status: "dismissed",
        reviewed_by: reviewerId,
        review_date: new Date().toISOString(),
      })
      .eq("id", reportId)

    return !error
  }

  async resolveAlert(alertId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from("system_alerts")
      .update({
        resolved: true,
        resolved_at: new Date().toISOString(),
      })
      .eq("id", alertId)

    return !error
  }
}

// Server-side database service
export class ServerSupabaseService {
  private supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>

  constructor(supabaseClient: Awaited<ReturnType<typeof createServerSupabaseClient>>) {
    this.supabase = supabaseClient
  }

  // Server-side methods for operations requiring elevated privileges
  async createUserProfile(
    userId: string,
    userData: {
      firstName: string
      lastName: string
      email: string
      role: "learner" | "teacher" | "admin"
    },
  ): Promise<boolean> {
    const { error } = await this.supabase.from("profiles").insert({
      id: userId,
      first_name: userData.firstName,
      last_name: userData.lastName,
      role: userData.role,
      status: "pending",
      verification_status: "pending",
    })

    return !error
  }

  // Add more server-side methods as needed
}

// Export singleton instance
export const dbService = new SupabaseService()
