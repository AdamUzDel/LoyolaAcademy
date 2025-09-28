"use client"

import { useState, useEffect } from "react"
import { dbService } from "@/lib/database/supabase-service"
import { createClient } from "@/lib/supabase/client"

export interface LearnerProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  joinDate: string
  totalHours: number
  dayStreak: number
  completedCourses: number
  certificates: number
}

export interface EnrolledCourse {
  id: string
  title: string
  instructor: string
  progress: number
  totalLessons: number
  completedLessons: number
  nextDeadline?: string
  thumbnail: string
  category: string
}

export interface Certificate {
  id: string
  courseTitle: string
  completedDate: string
  certificateUrl: string
  instructor: string
}

export interface StudyGoal {
  id: string
  title: string
  description: string
  targetHours: number
  currentHours: number
  deadline: string
  completed: boolean
}

export interface StudyGroup {
  id: string
  name: string
  course: string
  members: number
  nextMeeting?: string
  description: string
}

export function useLearnerData() {
  const [profile, setProfile] = useState<LearnerProfile | null>(null)
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [studyGoals, setStudyGoals] = useState<StudyGoal[]>([])
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLearnerData = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setLoading(false)
          return
        }

        const [profileData, coursesData, certificatesData, goalsData, groupsData] = await Promise.all([
          dbService.getLearnerProfile(user.id),
          dbService.getEnrolledCourses(user.id),
          dbService.getCertificates(user.id),
          dbService.getStudyGoals(user.id),
          dbService.getStudyGroups(user.id),
        ])

        if (profileData) {
          profileData.email = user.email || ""
        }

        setProfile(profileData)
        setEnrolledCourses(coursesData)
        setCertificates(certificatesData)
        setStudyGoals(goalsData)
        setStudyGroups(groupsData)
      } catch (error) {
        console.error("[v0] Error loading learner data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadLearnerData()
  }, [])

  const updateProfile = async (updates: Partial<LearnerProfile>) => {
    if (!profile) return

    setProfile((prev) => (prev ? { ...prev, ...updates } : null))

    console.log("[v0] Profile update not yet implemented:", updates)
  }

  const addStudyGoal = async (goal: Omit<StudyGoal, "id">) => {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const newGoal = await dbService.addStudyGoal(user.id, goal)
      if (newGoal) {
        setStudyGoals((prev) => [...prev, newGoal])
      }
    } catch (error) {
      console.error("[v0] Error adding study goal:", error)
    }
  }

  const updateStudyGoal = async (id: string, updates: Partial<StudyGoal>) => {
    try {
      const success = await dbService.updateStudyGoal(id, updates)
      if (success) {
        setStudyGoals((prev) => prev.map((goal) => (goal.id === id ? { ...goal, ...updates } : goal)))
      }
    } catch (error) {
      console.error("[v0] Error updating study goal:", error)
    }
  }

  const deleteStudyGoal = async (id: string) => {
    try {
      const success = await dbService.deleteStudyGoal(id)
      if (success) {
        setStudyGoals((prev) => prev.filter((goal) => goal.id !== id))
      }
    } catch (error) {
      console.error("[v0] Error deleting study goal:", error)
    }
  }

  return {
    profile,
    enrolledCourses,
    certificates,
    studyGoals,
    studyGroups,
    loading,
    updateProfile,
    addStudyGoal,
    updateStudyGoal,
    deleteStudyGoal,
  }
}
