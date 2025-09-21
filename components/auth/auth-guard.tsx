"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "learner" | "teacher" | "admin"
  redirectTo?: string
}

export function AuthGuard({ children, requiredRole, redirectTo = "/auth/signin" }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error || !user) {
          setIsAuthenticated(false)
          router.push(redirectTo)
          return
        }

        setUser(user)
        setIsAuthenticated(true)

        // Get user role from profiles table
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

        const role = profile?.role || "learner"
        setUserRole(role)

        // Check role permissions
        if (requiredRole && role !== requiredRole) {
          router.push("/unauthorized")
          return
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setIsAuthenticated(false)
        router.push(redirectTo)
      }
    }

    checkAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        setIsAuthenticated(false)
        setUser(null)
        setUserRole(null)
        router.push(redirectTo)
      } else if (event === "SIGNED_IN" && session) {
        setUser(session.user)
        setIsAuthenticated(true)

        // Get user role
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

        setUserRole(profile?.role || "learner")
      }
    })

    return () => subscription.unsubscribe()
  }, [router, redirectTo, requiredRole, supabase])

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, don't render children (redirect will happen)
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
