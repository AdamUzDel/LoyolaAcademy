"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MoreHorizontal,
  UserCheck,
  Flag,
  Search,
  Filter,
  Download,
} from "lucide-react"
import { AuthGuard } from "@/components/auth/auth-guard"
import { useAdminData } from "@/hooks/use-admin-data"
import { UserManagementModal } from "@/components/admin/user-management-modal"
import { CourseApprovalModal } from "@/components/admin/course-approval-modal"
import type { PlatformUser, CourseApproval } from "@/hooks/use-admin-data"

export default function AdminDashboard() {
  const {
    profile,
    users,
    courseApprovals,
    contentReports,
    analytics,
    systemAlerts,
    loading,
    updateUserStatus,
    approveCourse,
    rejectCourse,
    resolveReport,
    dismissReport,
    resolveAlert,
  } = useAdminData()

  const [userModal, setUserModal] = useState<{ isOpen: boolean; user: PlatformUser | null }>({
    isOpen: false,
    user: null,
  })
  const [courseModal, setCourseModal] = useState<{ isOpen: boolean; course: CourseApproval | null }>({
    isOpen: false,
    course: null,
  })
  const [searchQuery, setSearchQuery] = useState("")

  if (loading) {
    return (
      <AuthGuard requiredRole="admin">
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

  if (!profile || !analytics) {
    return (
      <AuthGuard requiredRole="admin">
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Data not available</h2>
            <p className="text-muted-foreground">Please try refreshing the page.</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleUserAction = (user: PlatformUser) => {
    setUserModal({ isOpen: true, user })
  }

  const handleCourseReview = (course: CourseApproval) => {
    setCourseModal({ isOpen: true, course })
  }

  const unresolvedAlerts = systemAlerts.filter((alert) => !alert.resolved)

  return (
    <AuthGuard requiredRole="admin">
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
                  <h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1>
                  <p className="text-muted-foreground">Platform management and oversight</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {unresolvedAlerts.length > 0 && (
                  <Badge variant="destructive" className="animate-pulse">
                    {unresolvedAlerts.length} Alert{unresolvedAlerts.length > 1 ? "s" : ""}
                  </Badge>
                )}
                <Button variant="outline" size="sm">
                  <Shield className="w-4 h-4 mr-2" />
                  System Settings
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
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{analytics.totalUsers.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Users</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{analytics.totalCourses.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Courses</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Revenue</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <UserCheck className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold">{analytics.activeInstructors}</div>
                <div className="text-xs text-muted-foreground">Active Instructors</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{analytics.pendingApprovals}</div>
                <div className="text-xs text-muted-foreground">Pending Approvals</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Flag className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{analytics.reportedContent}</div>
                <div className="text-xs text-muted-foreground">Reported Content</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="users" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="users" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">User Management</h3>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Search users..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button size="sm" variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                  {filteredUsers.map((user) => (
                    <Card key={user.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.firstName[0]}
                                {user.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">
                                {user.firstName} {user.lastName}
                              </h4>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={user.role === "teacher" ? "default" : "secondary"}>{user.role}</Badge>
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : user.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {user.status}
                            </Badge>
                            <Button size="sm" variant="outline" onClick={() => handleUserAction(user)}>
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                          <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                          <span>Last active {new Date(user.lastActive).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="courses" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Course Approvals</h3>
                    <Button size="sm">View All Courses</Button>
                  </div>
                  {courseApprovals.map((course) => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            <img
                              src={course.thumbnail || "/placeholder.svg"}
                              alt={course.title}
                              className="w-16 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <h4 className="font-medium">{course.title}</h4>
                              <p className="text-sm text-muted-foreground">by {course.instructor.name}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary">{course.category}</Badge>
                                <Badge variant="outline">{course.level}</Badge>
                                <Badge variant="outline">${course.price}</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              Submitted {new Date(course.submittedDate).toLocaleDateString()}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" variant="outline" onClick={() => handleCourseReview(course)}>
                                <Eye className="w-4 h-4 mr-1" />
                                Review
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="reports" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Content Reports</h3>
                    <Button size="sm">View All Reports</Button>
                  </div>
                  {contentReports.map((report) => (
                    <Card key={report.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{report.contentTitle}</h4>
                            <p className="text-sm text-muted-foreground">
                              Reported by {report.reportedBy.name} • {report.reason}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary">{report.type}</Badge>
                              <Badge variant={report.status === "pending" ? "destructive" : "default"}>
                                {report.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              {new Date(report.reportDate).toLocaleDateString()}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                Review
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => resolveReport(report.id, "no_action")}>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Resolve
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => dismissReport(report.id)}>
                                <XCircle className="w-4 h-4 mr-1" />
                                Dismiss
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Analytics</CardTitle>
                      <CardDescription>Overview of platform performance and growth</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-primary">{analytics.totalUsers.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Total Users</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-accent">{analytics.courseCompletionRate}%</div>
                          <div className="text-sm text-muted-foreground">Completion Rate</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-green-500">
                            ${analytics.totalRevenue.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Total Revenue</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-blue-500">{analytics.averageRating}</div>
                          <div className="text-sm text-muted-foreground">Average Rating</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Top Course Categories</h4>
                        {analytics.topCategories.map((category) => (
                          <div key={category.category} className="flex items-center justify-between">
                            <span className="text-sm">{category.category}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-muted rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{
                                    width: `${(category.count / Math.max(...analytics.topCategories.map((c) => c.count))) * 100}%`,
                                  }}
                                />
                              </div>
                              <span className="text-sm font-medium w-12 text-right">{category.count}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* System Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    System Alerts
                    {unresolvedAlerts.length > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {unresolvedAlerts.length}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {systemAlerts.slice(0, 5).map((alert) => (
                    <div key={alert.id} className="flex gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          alert.type === "error"
                            ? "bg-red-500"
                            : alert.type === "warning"
                              ? "bg-orange-500"
                              : alert.type === "success"
                                ? "bg-green-500"
                                : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.title}</p>
                        <p className="text-xs text-muted-foreground">{alert.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</p>
                          {!alert.resolved && (
                            <Button size="sm" variant="outline" onClick={() => resolveAlert(alert.id)}>
                              Resolve
                            </Button>
                          )}
                        </div>
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
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Review Courses
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Flag className="w-4 h-4 mr-2" />
                    Handle Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Shield className="w-4 h-4 mr-2" />
                    System Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              {/* Platform Health */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Server Status</span>
                    <Badge className="bg-green-500">Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database</span>
                    <Badge className="bg-green-500">Healthy</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Payment Gateway</span>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CDN</span>
                    <Badge className="bg-green-500">Operational</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email Service</span>
                    <Badge className="bg-green-500">Running</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* User Management Modal */}
        <UserManagementModal
          isOpen={userModal.isOpen}
          onClose={() => setUserModal({ isOpen: false, user: null })}
          user={userModal.user}
          onUpdateStatus={updateUserStatus}
        />

        {/* Course Approval Modal */}
        <CourseApprovalModal
          isOpen={courseModal.isOpen}
          onClose={() => setCourseModal({ isOpen: false, course: null })}
          course={courseModal.course}
          onApprove={approveCourse}
          onReject={rejectCourse}
        />
      </div>
    </AuthGuard>
  )
}
