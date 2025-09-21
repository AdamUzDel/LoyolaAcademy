import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Compass } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Compass className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-primary">Loyola Academy</h1>
              <p className="text-sm text-muted-foreground">Knowledge for Greater Impact</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-2xl">Check Your Email</CardTitle>
            <CardDescription>We've sent you a verification link</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-accent" />
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Verification Email Sent!</h3>
              <p className="text-sm text-muted-foreground">
                Please check your email and click the verification link to activate your account.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Didn't receive the email? Check your spam folder or contact support.
              </p>

              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/auth/signin">Back to Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
