import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: { code?: string }
}) {
  const supabase = await createServerSupabaseClient()

  if (searchParams.code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(searchParams.code)

    if (!error && data.user) {
      // Get user profile to determine redirect
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single()

      const role = profile?.role || "learner"
      redirect(`/dashboard/${role}`)
    }
  }

  // If no code or error, redirect to sign in
  redirect("/auth/signin")
}
