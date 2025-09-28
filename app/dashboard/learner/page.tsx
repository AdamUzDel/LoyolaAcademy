"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, Clock, Award, TrendingUp, Play, CheckCircle, Calendar, Edit, Flame } from "lucide-react"
import { AuthGuard } from "@/components/auth/auth-guard"
import { useLearnerData } from "@/hooks/use-learner-data"
import { ProfileEditModal } from "@/components/dashboard/profile-edit-modal"
import { StudyGoalsSection } from "@/components/dashboard/study-goals-section"
import { StudyGroupsSection } from "@/components/dashboard/study-groups-section"
import { CertificatesSection } from "@/components/dashboard/certificates-section"

export default function LearnerDashboard() {
  const {
    profile,
    enrolledCourses,
    certificates,
    studyGoals,
    studyGroups,
    loading,
    updateProfile,
    addStudyGoal,
    updateStudyGoal,
    deleteStudyGoal,
  } = useLearnerData()

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  if (loading) {
    return (
      <AuthGuard requiredRole="learner">
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
              <Skeleton className="h-32 w-full" />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
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
      <AuthGuard requiredRole="learner">
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Profile not found</h2>
            <p className="text-muted-foreground">Please try refreshing the page.</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  const upcomingDeadlines = enrolledCourses
    .filter((course) => course.nextDeadline)
    .map((course) => ({
      course: course.title,
      assignment: "Assignment Due",
      dueDate: course.nextDeadline!,
      daysLeft: Math.ceil((new Date(course.nextDeadline!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
    }))
    .sort((a, b) => a.daysLeft - b.daysLeft)

  return (
    <AuthGuard requiredRole="learner">
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile.avatar || "/professional-headshot.png"} />
                      <AvatarFallback className="text-xl">
                        {profile.firstName[0]}
                        {profile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                      onClick={() => setIsProfileModalOpen(true)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h1 className="font-serif text-3xl font-bold">Welcome back, {profile.firstName}!</h1>
                    <p className="text-muted-foreground text-lg">Continue your learning journey</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Member since {new Date(profile.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-2 text-3xl font-bold text-orange-500 mb-1">
                    <Flame className="h-8 w-8" />
                    {profile.dayStreak}
                  </div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                <div className="text-xs text-muted-foreground">Enrolled</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold">{profile.completedCourses}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{profile.totalHours}</div>
                <div className="text-xs text-muted-foreground">Hours Learned</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold">{certificates.length}</div>
                <div className="text-xs text-muted-foreground">Certificates</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{profile.dayStreak}</div>
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
                  {enrolledCourses.length === 0 ? (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">No enrolled courses</h3>
                        <p className="text-muted-foreground mb-4">
                          Start your learning journey by enrolling in a course!
                        </p>
                        <Button>Browse Courses</Button>
                      </CardContent>
                    </Card>
                  ) : (
                    enrolledCourses.map((course) => (
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
                                <Badge variant="secondary">{course.category}</Badge>
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
                                    {course.nextDeadline && (
                                      <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Due: {new Date(course.nextDeadline).toLocaleDateString()}
                                      </span>
                                    )}
                                  </div>
                                  <Button size="sm">
                                    <Play className="w-4 h-4 mr-1" />
                                    Continue Learning
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  {profile.completedCourses === 0 ? (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <CheckCircle className="h-16 w-16 mx-auto mb-4 opacity-50 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">No completed courses yet</h3>
                        <p className="text-muted-foreground">Complete your first course to see it here!</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Completed courses will appear here once you finish them.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="certificates" className="space-y-4">
                  <CertificatesSection certificates={certificates} />
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
                <CardContent>
                  {upcomingDeadlines.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No upcoming deadlines</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingDeadlines.slice(0, 3).map((deadline, index) => (
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
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Study Goals */}
              <StudyGoalsSection
                goals={studyGoals}
                onAddGoal={addStudyGoal}
                onUpdateGoal={updateStudyGoal}
                onDeleteGoal={deleteStudyGoal}
              />

              {/* Study Groups */}
              <StudyGroupsSection studyGroups={studyGroups} />
            </div>
          </div>
        </div>

        {/* Profile Edit Modal */}
        <ProfileEditModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          profile={profile}
          onSave={updateProfile}
        />
      </div>
    </AuthGuard>
  )
}
