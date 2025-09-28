"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Eye, User, Calendar, DollarSign, BookOpen, Star } from "lucide-react"
import type { CourseApproval } from "@/lib/hooks/use-admin-data"

interface CourseApprovalModalProps {
  isOpen: boolean
  onClose: () => void
  course: CourseApproval | null
  onApprove: (courseId: string, reviewNotes?: string) => void
  onReject: (courseId: string, reviewNotes: string) => void
}

export function CourseApprovalModal({ isOpen, onClose, course, onApprove, onReject }: CourseApprovalModalProps) {
  const [reviewNotes, setReviewNotes] = useState("")
  const [action, setAction] = useState<"approve" | "reject" | null>(null)

  if (!course) return null

  const handleSubmit = () => {
    if (!action) return

    if (action === "approve") {
      onApprove(course.id, reviewNotes)
    } else {
      onReject(course.id, reviewNotes)
    }

    onClose()
    setReviewNotes("")
    setAction(null)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500"
      case "Intermediate":
        return "bg-yellow-500"
      case "Advanced":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Course Review - {course.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Course Overview */}
          <div className="flex gap-6">
            <img
              src={course.thumbnail || "/placeholder.svg"}
              alt={course.title}
              className="w-32 h-20 object-cover rounded-lg"
            />
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p className="text-muted-foreground">{course.description}</p>
              <div className="flex gap-2">
                <Badge variant="outline">{course.category}</Badge>
                <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                <Badge variant="secondary">${course.price}</Badge>
              </div>
            </div>
          </div>

          {/* Course Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <User className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <div className="text-sm font-medium">Instructor</div>
                <div className="text-xs text-muted-foreground">{course.instructor.name}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <div className="text-sm font-medium">Submitted</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(course.submittedDate).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <div className="text-sm font-medium">Lessons</div>
                <div className="text-xs text-muted-foreground">{course.totalLessons}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <div className="text-sm font-medium">Price</div>
                <div className="text-xs text-muted-foreground">${course.price}</div>
              </CardContent>
            </Card>
          </div>

          {/* Instructor Information */}
          <Card>
            <CardHeader>
              <CardTitle>Instructor Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{course.instructor.name}</h4>
                  <p className="text-sm text-muted-foreground">{course.instructor.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.8 rating • 12 courses • 2,340 students</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Content Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Module 1: Introduction</p>
                    <p className="text-sm text-muted-foreground">3 lessons • 45 minutes</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Module 2: Core Concepts</p>
                    <p className="text-sm text-muted-foreground">5 lessons • 1.2 hours</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Module 3: Advanced Topics</p>
                    <p className="text-sm text-muted-foreground">8 lessons • 2.1 hours</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review Section */}
          <Card>
            <CardHeader>
              <CardTitle>Review Decision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reviewNotes">Review Notes</Label>
                <Textarea
                  id="reviewNotes"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add notes about your review decision..."
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => setAction("approve")}
                  variant={action === "approve" ? "default" : "outline"}
                  className="flex-1"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Course
                </Button>
                <Button
                  onClick={() => setAction("reject")}
                  variant={action === "reject" ? "destructive" : "outline"}
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Course
                </Button>
              </div>

              {action && (
                <div className="pt-4 border-t">
                  <div className="flex gap-2">
                    <Button onClick={handleSubmit} disabled={action === "reject" && !reviewNotes.trim()}>
                      Confirm {action === "approve" ? "Approval" : "Rejection"}
                    </Button>
                    <Button variant="outline" onClick={() => setAction(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
