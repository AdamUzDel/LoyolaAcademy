import { Card, CardContent } from "@/components/ui/card"
import { Award, Calendar, User, CheckCircle } from "lucide-react"

interface CertificatePreviewProps {
  courseName: string
  studentName: string
  completionDate: string
  instructorName: string
  certificateId: string
  grade?: string
}

export function CertificatePreview({
  courseName,
  studentName,
  completionDate,
  instructorName,
  certificateId,
  grade = "Pass",
}: CertificatePreviewProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto border-4 border-gold-500 bg-gradient-to-br from-white to-slate-50">
      <CardContent className="p-12 text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <Award className="h-16 w-16 text-gold-600" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-navy-900">LOYOLA ACADEMY</h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
        </div>

        {/* Certificate Title */}
        <div className="space-y-2">
          <h2 className="text-2xl font-serif text-navy-800">Certificate of Completion</h2>
          <p className="text-slate-600 italic">This certifies that</p>
        </div>

        {/* Student Name */}
        <div className="space-y-2">
          <h3 className="text-3xl font-serif font-bold text-navy-900 border-b-2 border-gold-500 pb-2 inline-block">
            {studentName}
          </h3>
        </div>

        {/* Course Details */}
        <div className="space-y-4">
          <p className="text-slate-600">has successfully completed the course</p>
          <h4 className="text-xl font-serif font-semibold text-navy-800">{courseName}</h4>
          <div className="flex justify-center items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-slate-600">Grade: {grade}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="space-y-6 pt-8">
          <div className="flex justify-between items-center text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Completed: {new Date(completionDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Instructor: {instructorName}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-slate-500">Certificate ID: {certificateId}</p>
            <p className="text-sm font-serif text-navy-800 mt-2">"Knowledge for Greater Impact"</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
