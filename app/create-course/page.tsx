"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, Upload, Save, Eye, BookOpen, Video, FileText, Target, Award, Compass } from "lucide-react"
import { AuthGuard } from "@/components/auth/auth-guard"
import Link from "next/link"

export default function CreateCoursePage() {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: 0,
    duration: "",
    language: "English",
    tags: [] as string[],
    requirements: [""],
    learningOutcomes: [""],
    thumbnail: null as File | null,
  })

  const [modules, setModules] = useState([
    {
      id: 1,
      title: "",
      description: "",
      lessons: [
        {
          id: 1,
          title: "",
          type: "video",
          duration: "",
          content: "",
          free: false,
        },
      ],
    },
  ])

  const [currentTag, setCurrentTag] = useState("")
  const [activeTab, setActiveTab] = useState("basic")

  const categories = [
    "Artificial Intelligence",
    "Web Development",
    "Data Science",
    "Business",
    "Cybersecurity",
    "Mobile Development",
    "Digital Marketing",
    "Blockchain",
    "Cloud Computing",
    "UI/UX Design",
  ]

  const levels = ["Beginner", "Intermediate", "Advanced"]
  const lessonTypes = [
    { value: "video", label: "Video", icon: Video },
    { value: "reading", label: "Reading", icon: FileText },
    { value: "quiz", label: "Quiz", icon: Target },
    { value: "practical", label: "Practical", icon: BookOpen },
    { value: "project", label: "Project", icon: Award },
  ]

  const handleInputChange = (field: string, value: any) => {
    setCourseData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayInputChange = (field: string, index: number, value: string) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: string, i: number) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: string) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], ""],
    }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_: any, i: number) => i !== index),
    }))
  }

  const addTag = () => {
    if (currentTag.trim() && !courseData.tags.includes(currentTag.trim())) {
      setCourseData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setCourseData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const addModule = () => {
    const newModule = {
      id: modules.length + 1,
      title: "",
      description: "",
      lessons: [
        {
          id: 1,
          title: "",
          type: "video",
          duration: "",
          content: "",
          free: false,
        },
      ],
    }
    setModules([...modules, newModule])
  }

  const updateModule = (moduleIndex: number, field: string, value: any) => {
    setModules((prev) => prev.map((module, index) => (index === moduleIndex ? { ...module, [field]: value } : module)))
  }

  const addLesson = (moduleIndex: number) => {
    setModules((prev) =>
      prev.map((module, index) =>
        index === moduleIndex
          ? {
              ...module,
              lessons: [
                ...module.lessons,
                {
                  id: module.lessons.length + 1,
                  title: "",
                  type: "video",
                  duration: "",
                  content: "",
                  free: false,
                },
              ],
            }
          : module,
      ),
    )
  }

  const updateLesson = (moduleIndex: number, lessonIndex: number, field: string, value: any) => {
    setModules((prev) =>
      prev.map((module, mIndex) =>
        mIndex === moduleIndex
          ? {
              ...module,
              lessons: module.lessons.map((lesson, lIndex) =>
                lIndex === lessonIndex ? { ...lesson, [field]: value } : lesson,
              ),
            }
          : module,
      ),
    )
  }

  const removeLesson = (moduleIndex: number, lessonIndex: number) => {
    setModules((prev) =>
      prev.map((module, mIndex) =>
        mIndex === moduleIndex
          ? {
              ...module,
              lessons: module.lessons.filter((_, lIndex) => lIndex !== lessonIndex),
            }
          : module,
      ),
    )
  }

  const handleSaveDraft = () => {
    console.log("[v0] Saving course draft:", { courseData, modules })
    // TODO: Save to Supabase as draft
  }

  const handlePublish = () => {
    console.log("[v0] Publishing course:", { courseData, modules })
    // TODO: Validate and publish to Supabase
  }

  return (
    <AuthGuard requiredRole="teacher">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/dashboard/teacher" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Compass className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-serif text-xl font-bold text-primary">Loyola Academy</h1>
                  <p className="text-xs text-muted-foreground">Create Course</p>
                </div>
              </Link>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={handleSaveDraft}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button onClick={handlePublish}>Publish Course</Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-bold mb-2">Create New Course</h1>
              <p className="text-muted-foreground">Share your knowledge and help students learn new skills</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="publish">Publish</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Information</CardTitle>
                    <CardDescription>Provide basic information about your course</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Course Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Introduction to Machine Learning"
                        value={courseData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Course Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what students will learn in this course..."
                        rows={4}
                        value={courseData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={courseData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
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

                      <div className="space-y-2">
                        <Label htmlFor="level">Level *</Label>
                        <Select value={courseData.level} onValueChange={(value) => handleInputChange("level", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            {levels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          placeholder="e.g., 6 weeks"
                          value={courseData.duration}
                          onChange={(e) => handleInputChange("duration", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select
                          value={courseData.language}
                          onValueChange={(value) => handleInputChange("language", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="French">French</SelectItem>
                            <SelectItem value="Arabic">Arabic</SelectItem>
                            <SelectItem value="Swahili">Swahili</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Course Tags</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add a tag..."
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && addTag()}
                        />
                        <Button type="button" onClick={addTag}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {courseData.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => removeTag(tag)}
                          >
                            {tag} ×
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Course Thumbnail</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload course thumbnail (recommended: 1280x720px)
                        </p>
                        <Button variant="outline" size="sm">
                          Choose File
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Requirements</CardTitle>
                    <CardDescription>What should students know before taking this course?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {courseData.requirements.map((requirement, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="e.g., Basic computer skills"
                          value={requirement}
                          onChange={(e) => handleArrayInputChange("requirements", index, e.target.value)}
                        />
                        {courseData.requirements.length > 1 && (
                          <Button variant="outline" size="sm" onClick={() => removeArrayItem("requirements", index)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => addArrayItem("requirements")} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Requirement
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Learning Outcomes</CardTitle>
                    <CardDescription>What will students be able to do after completing this course?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {courseData.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="e.g., Build a machine learning model"
                          value={outcome}
                          onChange={(e) => handleArrayInputChange("learningOutcomes", index, e.target.value)}
                        />
                        {courseData.learningOutcomes.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem("learningOutcomes", index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => addArrayItem("learningOutcomes")} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Learning Outcome
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-6">
                {modules.map((module, moduleIndex) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Module {moduleIndex + 1}</span>
                        {modules.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setModules(modules.filter((_, i) => i !== moduleIndex))}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Module Title</Label>
                          <Input
                            placeholder="e.g., Introduction to Machine Learning"
                            value={module.title}
                            onChange={(e) => updateModule(moduleIndex, "title", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Module Description</Label>
                          <Textarea
                            placeholder="Brief description of this module..."
                            value={module.description}
                            onChange={(e) => updateModule(moduleIndex, "description", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Lessons</h4>
                        {module.lessons.map((lesson, lessonIndex) => (
                          <Card key={lesson.id} className="border-muted">
                            <CardContent className="p-4">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-medium">Lesson {lessonIndex + 1}</h5>
                                  {module.lessons.length > 1 && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => removeLesson(moduleIndex, lessonIndex)}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Lesson Title</Label>
                                    <Input
                                      placeholder="e.g., What is Machine Learning?"
                                      value={lesson.title}
                                      onChange={(e) => updateLesson(moduleIndex, lessonIndex, "title", e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Lesson Type</Label>
                                    <Select
                                      value={lesson.type}
                                      onValueChange={(value) => updateLesson(moduleIndex, lessonIndex, "type", value)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {lessonTypes.map((type) => (
                                          <SelectItem key={type.value} value={type.value}>
                                            <div className="flex items-center gap-2">
                                              <type.icon className="w-4 h-4" />
                                              {type.label}
                                            </div>
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Duration</Label>
                                    <Input
                                      placeholder="e.g., 15 min"
                                      value={lesson.duration}
                                      onChange={(e) =>
                                        updateLesson(moduleIndex, lessonIndex, "duration", e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="flex items-center space-x-2 pt-6">
                                    <Switch
                                      id={`free-${moduleIndex}-${lessonIndex}`}
                                      checked={lesson.free}
                                      onCheckedChange={(checked) =>
                                        updateLesson(moduleIndex, lessonIndex, "free", checked)
                                      }
                                    />
                                    <Label htmlFor={`free-${moduleIndex}-${lessonIndex}`}>Free preview</Label>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label>Content/Description</Label>
                                  <Textarea
                                    placeholder="Lesson content or description..."
                                    value={lesson.content}
                                    onChange={(e) => updateLesson(moduleIndex, lessonIndex, "content", e.target.value)}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        <Button variant="outline" onClick={() => addLesson(moduleIndex)} className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Lesson
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button variant="outline" onClick={addModule} className="w-full bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Module
                </Button>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Pricing</CardTitle>
                    <CardDescription>Set the price for your course or make it free</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="free-course"
                          checked={courseData.price === 0}
                          onCheckedChange={(checked) => handleInputChange("price", checked ? 0 : 49)}
                        />
                        <Label htmlFor="free-course">Make this course free</Label>
                      </div>

                      {courseData.price > 0 && (
                        <div className="space-y-2">
                          <Label htmlFor="price">Course Price (USD)</Label>
                          <Input
                            id="price"
                            type="number"
                            min="1"
                            placeholder="49"
                            value={courseData.price}
                            onChange={(e) => handleInputChange("price", Number.parseInt(e.target.value) || 0)}
                          />
                          <p className="text-sm text-muted-foreground">
                            Students in Africa will see local currency equivalents
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Pricing Guidelines</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Free courses help build your reputation and attract students</li>
                        <li>• Beginner courses typically range from $29-$79</li>
                        <li>• Advanced courses can be priced $99-$199+</li>
                        <li>• Consider your target audience's purchasing power</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="publish" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Publish Your Course</CardTitle>
                    <CardDescription>Review your course details before publishing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Course Information</h4>
                          <p className="text-sm text-muted-foreground">Title, description, category, etc.</p>
                        </div>
                        <Badge variant={courseData.title && courseData.description ? "default" : "secondary"}>
                          {courseData.title && courseData.description ? "Complete" : "Incomplete"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Curriculum</h4>
                          <p className="text-sm text-muted-foreground">
                            {modules.length} modules,{" "}
                            {modules.reduce((total, module) => total + module.lessons.length, 0)} lessons
                          </p>
                        </div>
                        <Badge
                          variant={
                            modules.some((m) => m.title && m.lessons.some((l) => l.title)) ? "default" : "secondary"
                          }
                        >
                          {modules.some((m) => m.title && m.lessons.some((l) => l.title)) ? "Complete" : "Incomplete"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Pricing</h4>
                          <p className="text-sm text-muted-foreground">
                            {courseData.price === 0 ? "Free course" : `$${courseData.price}`}
                          </p>
                        </div>
                        <Badge variant="default">Complete</Badge>
                      </div>
                    </div>

                    <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                      <h4 className="font-semibold text-accent mb-2">Before Publishing</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Your course will be reviewed by our team (usually within 2 business days)</li>
                        <li>• Make sure all lessons have proper titles and content</li>
                        <li>• Upload a high-quality course thumbnail</li>
                        <li>• Test your course content for quality</li>
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handleSaveDraft} className="flex-1 bg-transparent">
                        <Save className="w-4 h-4 mr-2" />
                        Save as Draft
                      </Button>
                      <Button onClick={handlePublish} className="flex-1">
                        Submit for Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
