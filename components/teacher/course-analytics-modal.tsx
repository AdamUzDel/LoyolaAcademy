"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, Star, TrendingUp, Clock, Target } from "lucide-react"
import type { Course, CourseAnalytics } from "@/lib/hooks/use-teacher-data"

interface CourseAnalyticsModalProps {
  isOpen: boolean
  onClose: () => void
  course: Course
  analytics?: CourseAnalytics
}

export function CourseAnalyticsModal({ isOpen, onClose, course, analytics }: CourseAnalyticsModalProps) {
  if (!analytics) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Course Analytics - {course.title}</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No analytics data available for this course yet.</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const ratingDistribution = Object.entries(analytics.ratings.distribution).sort(
    ([a], [b]) => Number.parseInt(b) - Number.parseInt(a),
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Course Analytics - {course.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{analytics.enrollments.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Enrollments</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{analytics.completions.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Completions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold">${analytics.revenue.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Revenue</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{analytics.ratings.average}</div>
                <div className="text-xs text-muted-foreground">Average Rating</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Student Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Student Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Progress</span>
                    <span>{analytics.averageProgress}%</span>
                  </div>
                  <Progress value={analytics.averageProgress} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion Rate</span>
                    <span>{Math.round((analytics.completions / analytics.enrollments) * 100)}%</span>
                  </div>
                  <Progress value={(analytics.completions / analytics.enrollments) * 100} />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">
                      {analytics.enrollments - analytics.completions}
                    </div>
                    <div className="text-xs text-muted-foreground">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-500">{analytics.completions}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rating Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">{analytics.ratings.average}</div>
                  <div className="flex justify-center mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(analytics.ratings.average)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">Based on {analytics.ratings.count} reviews</div>
                </div>

                {ratingDistribution.map(([rating, count]) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-8">{rating}★</span>
                    <Progress value={(count / analytics.ratings.count) * 100} className="flex-1 h-2" />
                    <span className="text-sm text-muted-foreground w-12">{count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Engagement Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                    <div className="text-lg font-bold">{Math.round(analytics.engagement.totalWatchTime / 60)}h</div>
                    <div className="text-xs text-muted-foreground">Total Watch Time</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
                    <div className="text-lg font-bold">{analytics.engagement.averageSessionDuration}m</div>
                    <div className="text-xs text-muted-foreground">Avg Session</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Drop-off Points */}
            <Card>
              <CardHeader>
                <CardTitle>Drop-off Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {analytics.engagement.dropoffPoints.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No significant drop-off points detected</p>
                ) : (
                  <div className="space-y-3">
                    {analytics.engagement.dropoffPoints.map((point, index) => (
                      <div key={point.lessonId} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Lesson {point.lessonId.split("-")[1]}</div>
                          <div className="text-sm text-muted-foreground">High drop-off point</div>
                        </div>
                        <Badge variant="destructive">{point.dropoffRate}% drop-off</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
