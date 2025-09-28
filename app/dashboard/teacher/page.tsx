"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  BarChart3,
  Star,
  MessageSquare,
  Calendar,
  Download,
} from "lucide-react"
import { AuthGuard } from "@/components/auth/auth-guard"
import { useTeacherData } from "@/hooks/use-teacher-data"
import { CourseCreationModal } from "@/components/teacher/course-creation-modal"
import { CourseAnalyticsModal } from "@/components/teacher/course-analytics-modal"
import type { Course } from "@/hooks/use-teacher-data"

export default function TeacherDashboard() {
  const {
    profile,
    courses,
    analytics,
    loading,
    createCourse,
    updateCourse,
    deleteCourse,
    publishCourse,
    unpublishCourse,
  } = useTeacherData()

  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false)
  const [analyticsModal, setAnalyticsModal] = useState<{ isOpen: boolean; course: Course | null }>({
    isOpen: false,
    course: null,
  })

  if (loading) {
    return (
      <AuthGuard requiredRole="teacher">
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
              <Skeleton className="h-32 w-full" />
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-24" />
                ))}
              </div>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Skeleton className="h-96 w-full" />
                </div>
                <div className="space-y-6">
                  <Skeleton className="h-48" />
                  <Skeleton className="h-48" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthGuard>
    )
  }

  if (!profile) {
    return (
      <AuthGuard requiredRole="teacher">
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Profile not found</h2>
            <p className="text-muted-foreground">Please try refreshing the page.</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  const recentActivity = [
    {
      type: "enrollment",
      message: "25 new students enrolled in 'Introduction to AI Basics for Africa'",
      time: "2 hours ago",
    },
    {
      type: "review",
      message: "New 5-star review on 'Advanced Machine Learning Techniques'",
      time: "4 hours ago",
    },
    {
      type: "question",
      message: "3 new questions in course discussions",
      time: "6 hours ago",
    },
    {
      type: "earning",
      message: "Earned $340 from course sales today",
      time: "1 day ago",
    },
  ]

  const upcomingTasks = [
    {
      task: "Review assignment submissions",
      course: "Introduction to AI Basics for Africa",
      dueDate: "Today",
      priority: "high",
    },
    {
      task: "Update course materials",
      course: "Advanced Machine Learning Techniques",
      dueDate: "Tomorrow",
      priority: "medium",
    },
    {
      task: "Respond to student questions",
      course: "Introduction to AI Basics for Africa",
      dueDate: "Mar 25",
      priority: "medium",
    },
  ]

  const handleViewAnalytics = (course: Course) => {
    const courseAnalytics = analytics.find((a) => a.courseId === course.id)
    setAnalyticsModal({ isOpen: true, course })
  }

  const handleTogglePublish = (course: Course) => {
    if (course.status === "published") {
      unpublishCourse(course.id)
    } else {
      publishCourse(course.id)
    }
  }

  return (
    <AuthGuard requiredRole="teacher">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profile.avatar || "/professional-headshot.png"} />
                  <AvatarFallback>
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-serif text-2xl font-bold">Welcome, {profile.firstName}!</h1>
                  <p className="text-muted-foreground">Manage your courses and track your impact</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button onClick={() => setIsCourseModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Course
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{profile.totalCourses}</div>
                <div className="text-xs text-muted-foreground">Total Courses</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{profile.totalStudents.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Students</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">${profile.totalEarnings.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Earnings</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold">{profile.avgRating}</div>
                <div className="text-xs text-muted-foreground">Avg Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold">$2,340</div>
                <div className="text-xs text-muted-foreground">This Month</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">89</div>
                <div className="text-xs text-muted-foreground">New Students</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="courses" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="courses">My Courses</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="earnings">Earnings</TabsTrigger>
                </TabsList>

                <TabsContent value="courses" className="space-y-4">
                  {courses.length === 0 ? (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">No courses yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Create your first course to start teaching and earning!
                        </p>
                        <Button onClick={() => setIsCourseModalOpen(true)}>
                          <Plus className="w-4 h-4 mr-2" />
                          Create Your First Course
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    courses.map((course) => (
                      <Card key={course.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <img
                              src={course.thumbnail || "/placeholder.svg"}
                              alt={course.title}
                              className="w-24 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-lg">{course.title}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {course.totalLessons} lessons • Last updated{" "}
                                    {new Date(course.lastUpdated).toLocaleDateString()}
                                  </p>
                                  <div className="flex gap-1 mt-1">
                                    {course.tags.slice(0, 3).map((tag) => (
                                      <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant={course.status === "published" ? "default" : "secondary"}>
                                    {course.status}
                                  </Badge>
                                  <Badge variant="outline">{course.level}</Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-4 gap-4 mb-4">
                                <div className="text-center">
                                  <div className="text-lg font-bold">{course.students.toLocaleString()}</div>
                                  <div className="text-xs text-muted-foreground">Students</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold flex items-center justify-center gap-1">
                                    <Star className="w-4 h-4 fill-accent text-accent" />
                                    {course.rating || "N/A"}
                                  </div>
                                  <div className="text-xs text-muted-foreground">Rating</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold">${course.earnings.toLocaleString()}</div>
                                  <div className="text-xs text-muted-foreground">Earnings</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold">{course.completionRate}%</div>
                                  <div className="text-xs text-muted-foreground">Completion</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 flex-wrap">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleViewAnalytics(course)}>
                                  <BarChart3 className="w-4 h-4 mr-1" />
                                  Analytics
                                </Button>
                                {course.status === "published" && (
                                  <Button size="sm" variant="outline">
                                    <MessageSquare className="w-4 h-4 mr-1" />
                                    Discussions
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant={course.status === "published" ? "secondary" : "default"}
                                  onClick={() => handleTogglePublish(course)}
                                >
                                  {course.status === "published" ? "Unpublish" : "Publish"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Performance Overview</CardTitle>
                      <CardDescription>Overview of your course metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-primary">
                              {courses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Total Enrollments</div>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-accent">{profile.avgRating}</div>
                            <div className="text-sm text-muted-foreground">Average Rating</div>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-green-500">
                              {Math.round(
                                courses.reduce((sum, course) => sum + course.completionRate, 0) / courses.length,
                              )}
                              %
                            </div>
                            <div className="text-sm text-muted-foreground">Avg Completion Rate</div>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-blue-500">89</div>
                            <div className="text-sm text-muted-foreground">New This Month</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="earnings" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Earnings Overview</CardTitle>
                      <CardDescription>Your revenue and payout information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-green-500">
                              ${profile.totalEarnings.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Total Earnings</div>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-accent">$2,340</div>
                            <div className="text-sm text-muted-foreground">This Month</div>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-primary">$1,890</div>
                            <div className="text-sm text-muted-foreground">Available for Payout</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1">Request Payout</Button>
                          <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download Report
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="border-l-4 border-accent pl-4">
                      <h4 className="font-medium text-sm">{task.task}</h4>
                      <p className="text-xs text-muted-foreground">{task.course}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">Due {task.dueDate}</span>
                        <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>{task.priority}</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => setIsCourseModalOpen(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Course
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View All Discussions
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Earnings Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Course Creation Modal */}
        <CourseCreationModal
          isOpen={isCourseModalOpen}
          onClose={() => setIsCourseModalOpen(false)}
          onCreateCourse={createCourse}
        />

        {/* Course Analytics Modal */}
        <CourseAnalyticsModal
          isOpen={analyticsModal.isOpen}
          onClose={() => setAnalyticsModal({ isOpen: false, course: null })}
          course={analyticsModal.course!}
          analytics={
            analyticsModal.course ? analytics.find((a) => a.courseId === analyticsModal.course!.id) : undefined
          }
        />
      </div>
    </AuthGuard>
  )
}
