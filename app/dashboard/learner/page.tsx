"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Clock, Award, TrendingUp, Play, CheckCircle, Calendar, Target, Users, Download } from "lucide-react"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function LearnerDashboard() {
  // Mock data - in real app, fetch from Supabase
  const learnerStats = {
    coursesEnrolled: 5,
    coursesCompleted: 2,
    totalHours: 47,
    certificates: 2,
    currentStreak: 12,
  }

  const enrolledCourses = [
    {
      id: 1,
      title: "Introduction to AI Basics for Africa",
      instructor: "Dr. Amara Okafor",
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      nextLesson: "Machine Learning Applications in Agriculture",
      thumbnail: "/ai-course-thumbnail.png",
      level: "Beginner",
      estimatedTime: "2h 30m remaining",
    },
    {
      id: 2,
      title: "Web Development Fundamentals",
      instructor: "Prof. Kwame Asante",
      progress: 45,
      totalLessons: 32,
      completedLessons: 14,
      nextLesson: "CSS Grid and Flexbox",
      thumbnail: "/web-development-course.png",
      level: "Beginner",
      estimatedTime: "4h 15m remaining",
    },
    {
      id: 3,
      title: "Data Science with Python",
      instructor: "Dr. Fatima Al-Rashid",
      progress: 20,
      totalLessons: 40,
      completedLessons: 8,
      nextLesson: "Pandas DataFrames",
      thumbnail: "/python-data-science-course.png",
      level: "Intermediate",
      estimatedTime: "8h 45m remaining",
    },
  ]

  const completedCourses = [
    {
      id: 4,
      title: "Digital Literacy Fundamentals",
      instructor: "Prof. Sarah Mwangi",
      completedDate: "2024-01-15",
      grade: "A+",
      certificateId: "LA-2024-001",
      thumbnail: "/digital-literacy-course.jpg",
    },
    {
      id: 5,
      title: "Introduction to Cybersecurity",
      instructor: "Dr. Ahmed Hassan",
      completedDate: "2024-02-28",
      grade: "A",
      certificateId: "LA-2024-002",
      thumbnail: "/cybersecurity-course.png",
    },
  ]

  const upcomingDeadlines = [
    {
      course: "Introduction to AI Basics for Africa",
      assignment: "Final Project Submission",
      dueDate: "2024-03-25",
      daysLeft: 5,
    },
    {
      course: "Web Development Fundamentals",
      assignment: "Portfolio Website",
      dueDate: "2024-04-02",
      daysLeft: 13,
    },
  ]

  return (
    <AuthGuard requiredRole="learner">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-2xl font-bold">Welcome back, John!</h1>
                <p className="text-muted-foreground">Continue your learning journey</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{learnerStats.currentStreak}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/student-avatar.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{learnerStats.coursesEnrolled}</div>
                <div className="text-xs text-muted-foreground">Enrolled</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold">{learnerStats.coursesCompleted}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{learnerStats.totalHours}</div>
                <div className="text-xs text-muted-foreground">Hours Learned</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold">{learnerStats.certificates}</div>
                <div className="text-xs text-muted-foreground">Certificates</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{learnerStats.currentStreak}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="current" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="current">Current Courses</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="certificates">Certificates</TabsTrigger>
                </TabsList>

                <TabsContent value="current" className="space-y-4">
                  {enrolledCourses.map((course) => (
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
                                <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                              </div>
                              <Badge variant="secondary">{course.level}</Badge>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>
                                    Progress: {course.completedLessons}/{course.totalLessons} lessons
                                  </span>
                                  <span>{course.progress}%</span>
                                </div>
                                <Progress value={course.progress} className="h-2" />
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                  <span className="font-medium">Next:</span> {course.nextLesson}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-muted-foreground">{course.estimatedTime}</span>
                                  <Button size="sm">
                                    <Play className="w-4 h-4 mr-1" />
                                    Continue
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  {completedCourses.map((course) => (
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
                                <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                              </div>
                              <div className="text-right">
                                <Badge className="bg-accent text-accent-foreground">{course.grade}</Badge>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Completed {new Date(course.completedDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-accent" />
                                <span className="text-sm font-medium">Course Completed</span>
                              </div>
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4 mr-1" />
                                Certificate
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="certificates" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {completedCourses.map((course) => (
                      <Card key={course.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6 text-center">
                          <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                          <h3 className="font-semibold mb-2">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">Grade: {course.grade}</p>
                          <p className="text-xs text-muted-foreground mb-4">Certificate ID: {course.certificateId}</p>
                          <Button size="sm" className="w-full">
                            <Download className="w-4 h-4 mr-1" />
                            Download Certificate
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="border-l-4 border-accent pl-4">
                      <h4 className="font-medium text-sm">{deadline.assignment}</h4>
                      <p className="text-xs text-muted-foreground">{deadline.course}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          Due {new Date(deadline.dueDate).toLocaleDateString()}
                        </span>
                        <Badge variant={deadline.daysLeft <= 7 ? "destructive" : "secondary"}>
                          {deadline.daysLeft} days left
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Learning Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    This Week's Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Complete 5 lessons</span>
                      <span>3/5</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Study 10 hours</span>
                      <span>7/10</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Submit 2 assignments</span>
                      <span>1/2</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Study Group */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Study Groups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">AI</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">AI Study Group</p>
                        <p className="text-xs text-muted-foreground">12 members</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">WD</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Web Dev Beginners</p>
                        <p className="text-xs text-muted-foreground">8 members</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-4 bg-transparent">
                    Join New Group
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
