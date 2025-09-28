"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Calendar, Plus, MessageCircle, Video } from "lucide-react"
import type { StudyGroup } from "@/lib/hooks/use-learner-data"

interface StudyGroupsSectionProps {
  studyGroups: StudyGroup[]
}

export function StudyGroupsSection({ studyGroups }: StudyGroupsSectionProps) {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const availableGroups = [
    {
      id: "2",
      name: "Data Science Beginners",
      course: "Data Science with Python",
      members: 15,
      description: "Perfect for those starting their data science journey",
      nextMeeting: "2025-01-05T16:00:00",
    },
    {
      id: "3",
      name: "Web Dev Masters",
      course: "Advanced Web Development",
      members: 12,
      description: "Advanced concepts and project collaboration",
      nextMeeting: "2025-01-04T19:00:00",
    },
  ]

  const filteredGroups = availableGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.course.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Study Groups
        </CardTitle>
        <Dialog open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Join Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Join a Study Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search Groups</Label>
                <Input
                  id="search"
                  placeholder="Search by name or course..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {filteredGroups.map((group) => (
                  <div key={group.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{group.name}</h4>
                        <p className="text-sm text-muted-foreground">{group.course}</p>
                      </div>
                      <Badge variant="secondary">{group.members} members</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                    {group.nextMeeting && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Next: {new Date(group.nextMeeting).toLocaleDateString()} at{" "}
                        {new Date(group.nextMeeting).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    )}
                    <Button size="sm" className="w-full">
                      Join Group
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {studyGroups.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>You haven't joined any study groups yet.</p>
            <p className="text-sm">Connect with fellow learners to enhance your learning experience!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {studyGroups.map((group) => (
              <div key={group.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{group.name}</h4>
                    <p className="text-sm text-muted-foreground">{group.course}</p>
                  </div>
                  <Badge variant="secondary">{group.members} members</Badge>
                </div>

                <p className="text-sm text-muted-foreground">{group.description}</p>

                {group.nextMeeting && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Next meeting: {new Date(group.nextMeeting).toLocaleDateString()} at{" "}
                      {new Date(group.nextMeeting).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Video className="h-4 w-4 mr-2" />
                    Join Meeting
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
