"use client"

import { useState, useEffect } from "react"
import { dbService } from "@/lib/database/supabase-service"
import { createClient } from "@/lib/supabase/client"

export interface AdminProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  role: "admin" | "super_admin"
  permissions: string[]
  lastLogin: string
}

export interface PlatformUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "learner" | "teacher" | "admin"
  status: "active" | "pending" | "suspended" | "banned"
  joinDate: string
  lastActive: string
  avatar?: string
  coursesEnrolled?: number
  coursesCreated?: number
  totalEarnings?: number
  verificationStatus: "verified" | "pending" | "rejected"
}

export interface CourseApproval {
  id: string
  title: string
  description: string
  instructor: {
    id: string
    name: string
    email: string
  }
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  price: number
  submittedDate: string
  status: "pending_review" | "approved" | "rejected" | "needs_revision"
  reviewNotes?: string
  thumbnail?: string
  totalLessons: number
}

export interface ContentReport {
  id: string
  type: "course" | "discussion" | "user" | "review"
  contentId: string
  contentTitle: string
  reportedBy: {
    id: string
    name: string
  }
  reason: "inappropriate" | "spam" | "copyright" | "harassment" | "other"
  description: string
  status: "pending" | "resolved" | "dismissed"
  reportDate: string
  reviewedBy?: string
  reviewDate?: string
  action?: "warning" | "content_removed" | "user_suspended" | "no_action"
}

export interface PlatformAnalytics {
  totalUsers: number
  totalCourses: number
  totalRevenue: number
  activeInstructors: number
  pendingApprovals: number
  reportedContent: number
  userGrowth: { month: string; users: number }[]
  revenueGrowth: { month: string; revenue: number }[]
  courseCompletionRate: number
  averageRating: number
  topCategories: { category: string; count: number }[]
}

export interface SystemAlert {
  id: string
  type: "error" | "warning" | "info" | "success"
  title: string
  message: string
  timestamp: string
  resolved: boolean
  severity: "low" | "medium" | "high" | "critical"
}

export function useAdminData() {
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [users, setUsers] = useState<PlatformUser[]>([])
  const [courseApprovals, setCourseApprovals] = useState<CourseApproval[]>([])
  const [contentReports, setContentReports] = useState<ContentReport[]>([])
  const [analytics, setAnalytics] = useState<PlatformAnalytics | null>(null)
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setLoading(false)
          return
        }

        // Load admin data in parallel
        const [profileData, usersData, approvalsData, reportsData, analyticsData, alertsData] = await Promise.all([
          dbService.getAdminProfile(user.id),
          dbService.getPlatformUsers(),
          dbService.getCourseApprovals(),
          dbService.getContentReports(),
          dbService.getPlatformAnalytics(),
          dbService.getSystemAlerts(),
        ])

        // Set user email from auth
        if (profileData) {
          profileData.email = user.email || ""
        }

        setProfile(profileData)
        setUsers(usersData)
        setCourseApprovals(approvalsData)
        setContentReports(reportsData)
        setAnalytics(analyticsData)
        setSystemAlerts(alertsData)
      } catch (error) {
        console.error("[v0] Error loading admin data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAdminData()
  }, [])

  const updateUserStatus = async (userId: string, status: PlatformUser["status"]) => {
    try {
      const success = await dbService.updateUserStatus(userId, status)
      if (success) {
        setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status } : user)))
      }
    } catch (error) {
      console.error("[v0] Error updating user status:", error)
    }
  }

  const approveCourse = async (courseId: string, reviewNotes?: string) => {
    try {
      const success = await dbService.approveCourse(courseId, reviewNotes)
      if (success) {
        setCourseApprovals((prev) =>
          prev.map((course) => (course.id === courseId ? { ...course, status: "approved", reviewNotes } : course)),
        )
      }
    } catch (error) {
      console.error("[v0] Error approving course:", error)
    }
  }

  const rejectCourse = async (courseId: string, reviewNotes: string) => {
    try {
      const success = await dbService.rejectCourse(courseId, reviewNotes)
      if (success) {
        setCourseApprovals((prev) =>
          prev.map((course) => (course.id === courseId ? { ...course, status: "rejected", reviewNotes } : course)),
        )
      }
    } catch (error) {
      console.error("[v0] Error rejecting course:", error)
    }
  }

  const resolveReport = async (reportId: string, action: ContentReport["action"], reviewNotes?: string) => {
    try {
      if (!profile) return

      const success = await dbService.resolveReport(reportId, action!, profile.id)
      if (success) {
        setContentReports((prev) =>
          prev.map((report) =>
            report.id === reportId
              ? {
                  ...report,
                  status: "resolved",
                  action,
                  reviewedBy: profile.id,
                  reviewDate: new Date().toISOString(),
                }
              : report,
          ),
        )
      }
    } catch (error) {
      console.error("[v0] Error resolving report:", error)
    }
  }

  const dismissReport = async (reportId: string) => {
    try {
      if (!profile) return

      const success = await dbService.dismissReport(reportId, profile.id)
      if (success) {
        setContentReports((prev) =>
          prev.map((report) =>
            report.id === reportId
              ? {
                  ...report,
                  status: "dismissed",
                  reviewedBy: profile.id,
                  reviewDate: new Date().toISOString(),
                }
              : report,
          ),
        )
      }
    } catch (error) {
      console.error("[v0] Error dismissing report:", error)
    }
  }

  const resolveAlert = async (alertId: string) => {
    try {
      const success = await dbService.resolveAlert(alertId)
      if (success) {
        setSystemAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, resolved: true } : alert)))
      }
    } catch (error) {
      console.error("[v0] Error resolving alert:", error)
    }
  }

  return {
    profile,
    users,
    courseApprovals,
    contentReports,
    analytics,
    systemAlerts,
    loading,
    updateUserStatus,
    approveCourse,
    rejectCourse,
    resolveReport,
    dismissReport,
    resolveAlert,
  }
}
