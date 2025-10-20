"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Calendar, BookOpen, DollarSign, Shield, Clock } from "lucide-react"
import type { PlatformUser } from "@/hooks/use-admin-data"

interface UserManagementModalProps {
  isOpen: boolean
  onClose: () => void
  user: PlatformUser | null
  onUpdateStatus: (userId: string, status: PlatformUser["status"]) => void
}

export function UserManagementModal({ isOpen, onClose, user, onUpdateStatus }: UserManagementModalProps) {
  const [actionNotes, setActionNotes] = useState("")
  const [selectedAction, setSelectedAction] = useState<PlatformUser["status"] | "">("")

  if (!user) return null

  const handleStatusUpdate = () => {
    if (selectedAction && user) {
      onUpdateStatus(user.id, selectedAction as PlatformUser["status"])
      onClose()
      setActionNotes("")
      setSelectedAction("")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "suspended":
        return "bg-orange-500"
      case "banned":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getVerificationColor = (status: string) => {
    switch (status) {
      case "verified":
        return "default"
      case "pending":
        return "secondary"
      case "rejected":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            User Management - {user.firstName} {user.lastName}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xl">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{user.role}</Badge>
                  <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  <Badge variant={getVerificationColor(user.verificationStatus)}>{user.verificationStatus}</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-sm font-medium">Joined</div>
                  <div className="text-xs text-muted-foreground">{new Date(user.joinDate).toLocaleDateString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-sm font-medium">Last Active</div>
                  <div className="text-xs text-muted-foreground">{new Date(user.lastActive).toLocaleDateString()}</div>
                </CardContent>
              </Card>
              {user.role === "learner" && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <BookOpen className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm font-medium">Courses Enrolled</div>
                    <div className="text-xs text-muted-foreground">{user.coursesEnrolled || 0}</div>
                  </CardContent>
                </Card>
              )}
              {user.role === "teacher" && (
                <>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <BookOpen className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                      <div className="text-sm font-medium">Courses Created</div>
                      <div className="text-xs text-muted-foreground">{user.coursesCreated || 0}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <DollarSign className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                      <div className="text-sm font-medium">Total Earnings</div>
                      <div className="text-xs text-muted-foreground">${user.totalEarnings?.toLocaleString() || 0}</div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Logged in to platform</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Completed lesson: "Introduction to AI"</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Enrolled in new course</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{user.role === "learner" ? "Enrolled Courses" : "Created Courses"}</CardTitle>
              </CardHeader>
              <CardContent>
                {user.role === "learner" ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Introduction to AI Basics</p>
                        <p className="text-sm text-muted-foreground">Progress: 75%</p>
                      </div>
                      <Badge variant="secondary">In Progress</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Web Development Fundamentals</p>
                        <p className="text-sm text-muted-foreground">Progress: 100%</p>
                      </div>
                      <Badge className="bg-green-500">Completed</Badge>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Advanced Machine Learning</p>
                        <p className="text-sm text-muted-foreground">856 students • $4,280 earned</p>
                      </div>
                      <Badge className="bg-green-500">Published</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">AI Ethics Course</p>
                        <p className="text-sm text-muted-foreground">0 students • Draft</p>
                      </div>
                      <Badge variant="secondary">Draft</Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Administrative Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="action">Select Action</Label>
                  <Select value={selectedAction} onValueChange={(value) => setSelectedAction(value as PlatformUser["status"] | "")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activate User</SelectItem>
                      <SelectItem value="suspended">Suspend User</SelectItem>
                      <SelectItem value="banned">Ban User</SelectItem>
                      <SelectItem value="pending">Set to Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Action Notes</Label>
                  <Textarea
                    id="notes"
                    value={actionNotes}
                    onChange={(e) => setActionNotes(e.target.value)}
                    placeholder="Add notes about this action (optional)"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleStatusUpdate} disabled={!selectedAction}>
                    Apply Action
                  </Button>
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Quick Actions</h4>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button size="sm" variant="outline">
                      <Shield className="w-4 h-4 mr-2" />
                      Reset Password
                    </Button>
                    <Button size="sm" variant="outline">
                      <User className="w-4 h-4 mr-2" />
                      View Full Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
