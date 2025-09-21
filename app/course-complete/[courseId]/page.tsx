"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CertificatePreview } from "@/components/certificates/certificate-preview"
import { Award, Download, Share2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CourseCompletePage({ params }: { params: { courseId: string } }) {
  // Mock data - replace with actual course completion data
  const completionData = {
    courseName: "Introduction to AI Basics for Africa",
    studentName: "John Doe", // Get from user session
    completionDate: new Date().toISOString(),
    instructorName: "Dr. Amara Okafor",
    certificateId: `LA-AI-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    grade: "A",
    finalScore: 92,
  }

  const handleDownloadCertificate = async () => {
    try {
      // Generate certificate via API
      const response = await fetch("/api/certificates/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user-123", // Get from session
          courseId: params.courseId,
          ...completionData,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        // Download the certificate
        window.open(result.certificate.downloadUrl, "_blank")
      }
    } catch (error) {
      console.error("[v0] Certificate download error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Congratulations Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Award className="h-24 w-24 text-gold-600" />
              <div className="absolute -top-2 -right-2 h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">✓</span>
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-serif font-bold text-navy-900 mb-4">Congratulations!</h1>
          <p className="text-xl text-slate-600 mb-2">You have successfully completed</p>
          <h2 className="text-2xl font-serif font-semibold text-navy-800 mb-4">{completionData.courseName}</h2>
          <div className="flex justify-center items-center space-x-6 text-lg">
            <span className="text-slate-600">Final Score:</span>
            <span className="text-2xl font-bold text-green-600">{completionData.finalScore}%</span>
            <span className="text-slate-600">Grade:</span>
            <span className="text-2xl font-bold text-gold-600">{completionData.grade}</span>
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="mb-12">
          <CertificatePreview {...completionData} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-navy-900 hover:bg-navy-800 text-white px-8"
            onClick={handleDownloadCertificate}
          >
            <Download className="h-5 w-5 mr-2" />
            Download Certificate
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-gold-500 text-gold-700 hover:bg-gold-50 px-8 bg-transparent"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share Achievement
          </Button>
        </div>

        {/* Next Steps */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-navy-900">What's Next?</CardTitle>
            <CardDescription>Continue your learning journey with these recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/courses">
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  Explore More Courses
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/certificates">
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  View All Certificates
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-slate-600 text-center">
                Share your achievement on social media and inspire others to join Loyola Academy!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
