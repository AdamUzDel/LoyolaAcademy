"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Trash2,
  MoreHorizontal,
  UserCheck,
  Flag,
} from "lucide-react"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function AdminDashboard() {
  // Mock data - in real app, fetch from Supabase
  const platformStats = {
    totalUsers: 12847,
    totalCourses: 1456,
    totalRevenue: 284750,
    activeInstructors: 342,
    pendingApprovals: 23,
    reportedContent: 7,
  }

  const recentUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "learner",
      joinDate: "2024-03-18",
      status: "active",
      avatar: "/user-avatar-1.png",
    },
    {
      id: 2,
      name: "Dr. Sarah Wilson",
      email: "sarah@example.com",
      role: "teacher",
      joinDate: "2024-03-17",
      status: "pending",
      avatar: "/diverse-user-avatar-set-2.png",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael@example.com",
      role: "learner",
      joinDate: "2024-03-16",
      status: "active",
      avatar: "/diverse-user-avatars-3.png",
    },
  ]

  const pendingCourses = [
    {
      id: 1,
      title: "Advanced Blockchain Development",
      instructor: "Prof. Ahmed Hassan",
      submittedDate: "2024-03-15",
      category: "Technology",
      status: "pending_review",
    },
    {
      id: 2,
      title: "Digital Marketing for African Businesses",
      instructor: "Mary Okonkwo",
      submittedDate: "2024-03-14",
      category: "Business",
      status: "pending_review",
    },
  ]

  const reportedContent = [
    {
      id: 1,
      type: "course",
      title: "Introduction to Cryptocurrency",
      reporter: "student123",
      reason: "Inappropriate content",
      date: "2024-03-18",
      status: "pending",
    },
    {
      id: 2,
      type: "discussion",
      title: "Spam in course discussion",
      reporter: "learner456",
      reason: "Spam",
      date: "2024-03-17",
      status: "pending",
    },
  ]

  const systemAlerts = [
    {
      type: "warning",
      message: "Server load is above 85%",
      time: "2 hours ago",
    },
    {
      type: "info",
      message: "Weekly backup completed successfully",
      time: "1 day ago",
    },
    {
      type: "error",
      message: "Payment gateway timeout reported",
      time: "2 days ago",
    },
  ]

  return (
    <AuthGuard requiredRole="admin">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Platform management and oversight</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Shield className="w-4 h-4 mr-2" />
                  System Settings
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/admin-avatar.png" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
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
                <div className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Users</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{platformStats.totalCourses.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Courses</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">${platformStats.totalRevenue.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Revenue</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <UserCheck className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold">{platformStats.activeInstructors}</div>
                <div className="text-xs text-muted-foreground">Active Instructors</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{platformStats.pendingApprovals}</div>
                <div className="text-xs text-muted-foreground">Pending Approvals</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Flag className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{platformStats.reportedContent}</div>
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
                    <h3 className="text-lg font-semibold">Recent Users</h3>
                    <Button size="sm">View All Users</Button>
                  </div>
                  {recentUsers.map((user) => (
                    <Card key={user.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{user.name}</h4>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={user.role === "teacher" ? "default" : "secondary"}>{user.role}</Badge>
                            <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                            <Button size="sm" variant="outline">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                          <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            {user.status === "pending" && (
                              <>
                                <Button size="sm" variant="outline">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Approve
                                </Button>
                                <Button size="sm" variant="outline">
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="courses" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Pending Course Approvals</h3>
                    <Button size="sm">View All Courses</Button>
                  </div>
                  {pendingCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{course.title}</h4>
                            <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary">{course.category}</Badge>
                              <Badge variant="outline">{course.status.replace("_", " ")}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              Submitted {new Date(course.submittedDate).toLocaleDateString()}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                Review
                              </Button>
                              <Button size="sm" variant="outline">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="outline">
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
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
                    <h3 className="text-lg font-semibold">Reported Content</h3>
                    <Button size="sm">View All Reports</Button>
                  </div>
                  {reportedContent.map((report) => (
                    <Card key={report.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{report.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Reported by {report.reporter} • {report.reason}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary">{report.type}</Badge>
                              <Badge variant="destructive">{report.status}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              {new Date(report.date).toLocaleDateString()}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                Review
                              </Button>
                              <Button size="sm" variant="outline">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Resolve
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="w-4 h-4 mr-1" />
                                Remove
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
                      <CardDescription>Overview of platform performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-primary">12,847</div>
                          <div className="text-sm text-muted-foreground">Total Users</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-accent">1,456</div>
                          <div className="text-sm text-muted-foreground">Total Courses</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-green-500">$284,750</div>
                          <div className="text-sm text-muted-foreground">Total Revenue</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-blue-500">89%</div>
                          <div className="text-sm text-muted-foreground">User Satisfaction</div>
                        </div>
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
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {systemAlerts.map((alert, index) => (
                    <div key={index} className="flex gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          alert.type === "error"
                            ? "bg-red-500"
                            : alert.type === "warning"
                              ? "bg-orange-500"
                              : "bg-blue-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
