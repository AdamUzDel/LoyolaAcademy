"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Download, Share2, Eye } from "lucide-react"
import type { Certificate } from "@/lib/hooks/use-learner-data"

interface CertificatesSectionProps {
  certificates: Certificate[]
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const handleDownload = (certificate: Certificate) => {
    // In a real app, this would download the actual certificate
    console.log("[v0] Downloading certificate:", certificate.id)
    // Simulate download
    const link = document.createElement("a")
    link.href = certificate.certificateUrl
    link.download = `${certificate.courseTitle.replace(/\s+/g, "_")}_Certificate.pdf`
    link.click()
  }

  const handleShare = (certificate: Certificate) => {
    if (navigator.share) {
      navigator.share({
        title: `${certificate.courseTitle} Certificate`,
        text: `I just completed ${certificate.courseTitle} and earned my certificate!`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Certificate link copied to clipboard!")
    }
  }

  if (certificates.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Award className="h-16 w-16 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-medium mb-2">No certificates yet</h3>
        <p>Complete your first course to earn your certificate!</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {certificates.map((certificate) => (
        <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-white" />
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-1">{certificate.courseTitle}</h3>
                <p className="text-sm text-muted-foreground mb-2">Instructor: {certificate.instructor}</p>
                <Badge variant="secondary" className="mb-3">
                  Completed {new Date(certificate.completedDate).toLocaleDateString()}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => handleDownload(certificate)}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleShare(certificate)}>
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => window.open(certificate.certificateUrl, "_blank")}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
