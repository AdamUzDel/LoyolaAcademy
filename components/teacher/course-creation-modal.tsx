"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Plus } from "lucide-react"
import type { Course } from "@/lib/hooks/use-teacher-data"

interface CourseCreationModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateCourse: (
    courseData: Omit<
      Course,
      "id" | "students" | "rating" | "earnings" | "completionRate" | "createdAt" | "lastUpdated"
    >,
  ) => void
}

export function CourseCreationModal({ isOpen, onClose, onCreateCourse }: CourseCreationModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    price: 0,
    thumbnail: "",
    status: "draft" as "draft" | "published",
    totalLessons: 0,
    tags: [] as string[],
  })
  const [newTag, setNewTag] = useState("")

  const categories = [
    "Technology",
    "Business",
    "Design",
    "Marketing",
    "Health & Wellness",
    "Language",
    "Science",
    "Arts & Crafts",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateCourse(formData)
    onClose()
    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      level: "Beginner",
      price: 0,
      thumbnail: "",
      status: "draft",
      totalLessons: 0,
      tags: [],
    })
    setCurrentStep(1)
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, thumbnail: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const canProceedToStep2 = formData.title && formData.description && formData.category
  const canProceedToStep3 = formData.level && formData.price >= 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <div className="flex items-center space-x-2 mt-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className={`w-12 h-0.5 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>

              <div className="space-y-2">
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter course title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Course Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what students will learn in this course"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2: Course Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Course Details</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Difficulty Level *</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value: "Beginner" | "Intermediate" | "Advanced") =>
                      setFormData((prev) => ({ ...prev, level: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) || 0 }))
                    }
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalLessons">Estimated Number of Lessons</Label>
                <Input
                  id="totalLessons"
                  type="number"
                  min="1"
                  value={formData.totalLessons}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, totalLessons: Number.parseInt(e.target.value) || 0 }))
                  }
                  placeholder="Enter number of lessons"
                />
              </div>

              <div className="space-y-2">
                <Label>Course Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Media & Publishing */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Media & Publishing</h3>

              <div className="space-y-2">
                <Label>Course Thumbnail</Label>
                <Card className="border-dashed border-2 border-muted-foreground/25">
                  <CardContent className="p-6">
                    {formData.thumbnail ? (
                      <div className="relative">
                        <img
                          src={formData.thumbnail || "/placeholder.svg"}
                          alt="Course thumbnail"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setFormData((prev) => ({ ...prev, thumbnail: "" }))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload a course thumbnail (recommended: 1280x720px)
                        </p>
                        <label className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm">
                            Choose File
                          </Button>
                          <input type="file" accept="image/*" onChange={handleThumbnailUpload} className="hidden" />
                        </label>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <Label>Publishing Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "draft" | "published") => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Save as Draft</SelectItem>
                    <SelectItem value="published">Publish Immediately</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {formData.status === "draft"
                    ? "Course will be saved as draft and can be published later"
                    : "Course will be immediately available to students"}
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <div>
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
            </div>
            <div className="space-x-2">
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={(currentStep === 1 && !canProceedToStep2) || (currentStep === 2 && !canProceedToStep3)}
                >
                  Next
                </Button>
              ) : (
                <>
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Course</Button>
                </>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
