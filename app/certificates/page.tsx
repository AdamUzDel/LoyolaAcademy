"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Award, Calendar, User } from "lucide-react"

export default function CertificatesPage() {
  // Mock data - replace with actual user certificates from Supabase
  const certificates = [
    {
      id: 1,
      courseName: "Introduction to AI Basics for Africa",
      completedDate: "2024-01-15",
      instructor: "Dr. Amara Okafor",
      grade: "A",
      certificateId: "LA-AI-2024-001",
      downloadUrl: "/api/certificates/download/1",
    },
    {
      id: 2,
      courseName: "Web Development Fundamentals",
      completedDate: "2024-02-20",
      instructor: "Prof. Kwame Asante",
      grade: "B+",
      certificateId: "LA-WEB-2024-002",
      downloadUrl: "/api/certificates/download/2",
    },
    {
      id: 3,
      courseName: "Digital Literacy for African Youth",
      completedDate: "2024-03-10",
      instructor: "Ms. Fatima Al-Rashid",
      grade: "A-",
      certificateId: "LA-DIG-2024-003",
      downloadUrl: "/api/certificates/download/3",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-navy-900 mb-2">My Certificates</h1>
          <p className="text-slate-600 text-lg">Your achievements and completed courses at Loyola Academy</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <Card key={cert.id} className="border-2 border-slate-200 hover:border-gold-500 transition-colors">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <Award className="h-8 w-8 text-gold-600 mb-2" />
                  <Badge variant="secondary" className="bg-gold-100 text-gold-800">
                    Grade: {cert.grade}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-serif text-navy-900 leading-tight">{cert.courseName}</CardTitle>
                <CardDescription className="text-slate-600">Certificate ID: {cert.certificateId}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Completed: {new Date(cert.completedDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <User className="h-4 w-4 mr-2" />
                    Instructor: {cert.instructor}
                  </div>
                </div>

                <Button
                  className="w-full bg-navy-900 hover:bg-navy-800 text-white"
                  onClick={() => window.open(cert.downloadUrl, "_blank")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {certificates.length === 0 && (
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-slate-600 mb-2">No certificates yet</h3>
            <p className="text-slate-500">Complete your first course to earn a certificate!</p>
          </div>
        )}
      </div>
    </div>
  )
}
