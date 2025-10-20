"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface Course {
  id: string
  title: string
  description: string
  short_description: string
  thumbnail_url: string
  price: number
  currency: string
  level: string
  duration_hours: number
  instructor: {
    first_name: string
    last_name: string
  }
  category: {
    name: string
  }
  _count: {
    enrollments: number
  }
  avg_rating: number
}

export function useFeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFeaturedCourses() {
      try {
        const supabase = createClient()

        const { data, error } = await supabase
          .from("courses")
          .select(`
            id,
            title,
            description,
            short_description,
            thumbnail_url,
            price,
            currency,
            level,
            duration_hours,
            instructor:profiles!instructor_id (
              first_name,
              last_name
            ),
            category:categories (
              name
            ),
            enrollments (count),
            course_ratings (rating)
          `)
          .eq("status", "published")
          .eq("is_featured", true)
          .limit(6)

        if (error) throw error

        // Process the data to calculate averages and counts
        const processedCourses =
          data?.map((course) => ({
            ...course,
            instructor: Array.isArray(course.instructor) ? course.instructor[0] : course.instructor,
            category: Array.isArray(course.category) ? course.category[0] : course.category,
            _count: {
              enrollments: course.enrollments?.length || 0,
            },
            avg_rating:
              course.course_ratings?.length > 0
                ? course.course_ratings.reduce((sum: number, ratingObj: any) => sum + ratingObj.rating, 0) / course.course_ratings.length
                : 4.8,
          })) || []

        setCourses(processedCourses)
      } catch (err) {
        console.error("Error fetching featured courses:", err)
        setError("Failed to load featured courses")
        // Set fallback courses
        setCourses([
          {
            id: "1",
            title: "Introduction to AI Basics for Africa",
            description: "Learn fundamental AI concepts with real-world African applications and case studies.",
            short_description: "Learn fundamental AI concepts with real-world African applications and case studies.",
            thumbnail_url: "/ai-course-thumbnail.png",
            price: 0,
            currency: "USD",
            level: "beginner",
            duration_hours: 40,
            instructor: { first_name: "Dr. Sarah", last_name: "Johnson" },
            category: { name: "Artificial Intelligence" },
            _count: { enrollments: 2340 },
            avg_rating: 4.9,
          },
          {
            id: "2",
            title: "Web Development Fundamentals",
            description: "Master HTML, CSS, and JavaScript to build modern, responsive websites.",
            short_description: "Master HTML, CSS, and JavaScript to build modern, responsive websites.",
            thumbnail_url: "/web-development-course.png",
            price: 49,
            currency: "USD",
            level: "beginner",
            duration_hours: 60,
            instructor: { first_name: "Michael", last_name: "Chen" },
            category: { name: "Web Development" },
            _count: { enrollments: 1890 },
            avg_rating: 4.8,
          },
          {
            id: "3",
            title: "Data Science with Python",
            description: "Analyze data and build predictive models using Python and popular libraries.",
            short_description: "Analyze data and build predictive models using Python and popular libraries.",
            thumbnail_url: "/python-data-science-course.png",
            price: 99,
            currency: "USD",
            level: "intermediate",
            duration_hours: 80,
            instructor: { first_name: "Dr. Amara", last_name: "Okafor" },
            category: { name: "Data Science" },
            _count: { enrollments: 1560 },
            avg_rating: 4.9,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedCourses()
  }, [])

  return { courses, loading, error }
}
