"use client"

import { useState, useEffect } from "react"
import { dbService } from "@/lib/database/supabase-service"
import { createClient } from "@/lib/supabase/client"

export interface TeacherProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  bio: string
  expertise: string[]
  joinDate: string
  totalCourses: number
  totalStudents: number
  totalEarnings: number
  avgRating: number
}

export interface Course {
  id: string
  title: string
  description: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  price: number
  thumbnail?: string
  status: "draft" | "published" | "archived"
  students: number
  rating: number
  earnings: number
  totalLessons: number
  completionRate: number
  lastUpdated: string
  createdAt: string
  tags: string[]
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  videoUrl?: string
  duration: number
  order: number
  isPublished: boolean
  resources: LessonResource[]
}

export interface LessonResource {
  id: string
  title: string
  type: "pdf" | "video" | "link" | "quiz"
  url: string
}

export interface CourseAnalytics {
  courseId: string
  enrollments: number
  completions: number
  averageProgress: number
  revenue: number
  ratings: {
    average: number
    count: number
    distribution: { [key: number]: number }
  }
  engagement: {
    totalWatchTime: number
    averageSessionDuration: number
    dropoffPoints: { lessonId: string; dropoffRate: number }[]
  }
}

export function useTeacherData() {
  const [profile, setProfile] = useState<TeacherProfile | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [analytics, setAnalytics] = useState<CourseAnalytics[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTeacherData = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setLoading(false)
          return
        }

        const [profileData, coursesData] = await Promise.all([
          dbService.getTeacherProfile(user.id),
          dbService.getTeacherCourses(user.id),
        ])

        if (profileData) {
          profileData.email = user.email || ""
        }

        setProfile(profileData)
        setCourses(coursesData)
        setAnalytics([])
      } catch (error) {
        console.error("[v0] Error loading teacher data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTeacherData()
  }, [])

  const createCourse = async (
    courseData: Omit<
      Course,
      "id" | "students" | "rating" | "earnings" | "completionRate" | "createdAt" | "lastUpdated"
    >,
  ) => {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return null

      const newCourse = await dbService.createCourse(user.id, courseData)
      if (newCourse) {
        setCourses((prev) => [...prev, newCourse])
      }
      return newCourse
    } catch (error) {
      console.error("[v0] Error creating course:", error)
      return null
    }
  }

  const updateCourse = async (courseId: string, updates: Partial<Course>) => {
    try {
      const success = await dbService.updateCourse(courseId, updates)
      if (success) {
        setCourses((prev) =>
          prev.map((course) =>
            course.id === courseId ? { ...course, ...updates, lastUpdated: new Date().toISOString() } : course,
          ),
        )
      }
    } catch (error) {
      console.error("[v0] Error updating course:", error)
    }
  }

  const deleteCourse = async (courseId: string) => {
    try {
      const success = await dbService.deleteCourse(courseId)
      if (success) {
        setCourses((prev) => prev.filter((course) => course.id !== courseId))
      }
    } catch (error) {
      console.error("[v0] Error deleting course:", error)
    }
  }

  const publishCourse = async (courseId: string) => {
    await updateCourse(courseId, { status: "published" })
  }

  const unpublishCourse = async (courseId: string) => {
    await updateCourse(courseId, { status: "draft" })
  }

  return {
    profile,
    courses,
    analytics,
    loading,
    createCourse,
    updateCourse,
    deleteCourse,
    publishCourse,
    unpublishCourse,
  }
}
