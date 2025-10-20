"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  Clock,
  Users,
  BookOpen,
  Star,
  Award,
  ChevronRight,
  Lock,
  CheckCircle,
  Globe,
  Calendar,
  Target,
  Compass,
} from "lucide-react"
import Link from "next/link"

interface CourseDetailPageProps {
  params: {
    id: string
  }
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data - in real app, fetch from Supabase based on params.id
  const course = {
    id: Number.parseInt(params.id),
    title: "Introduction to AI Basics for Africa",
    description:
      "Learn fundamental AI concepts with real-world African applications and case studies. This comprehensive course covers machine learning, neural networks, and practical AI implementations relevant to African contexts.",
    instructor: {
      name: "Dr. Amara Okafor",
      title: "AI Research Professor",
      bio: "Dr. Okafor is a leading AI researcher with 15+ years of experience in machine learning and African technology applications.",
      avatar: "/instructor-avatar.png",
      rating: 4.9,
      studentsCount: 15420,
      coursesCount: 8,
    },
    category: "Artificial Intelligence",
    level: "Beginner",
    duration: "6 weeks",
    price: 0,
    originalPrice: 0,
    rating: 4.9,
    reviewsCount: 1247,
    studentsCount: 2340,
    lessonsCount: 24,
    thumbnail: "/ai-course-thumbnail.png",
    tags: ["AI", "Machine Learning", "Africa", "Beginner"],
    featured: true,
    lastUpdated: "2024-03-15",
    language: "English",
    certificate: true,
    requirements: [
      "Basic computer literacy",
      "High school mathematics",
      "Curiosity about artificial intelligence",
      "No prior programming experience required",
    ],
    whatYouWillLearn: [
      "Understand fundamental AI and machine learning concepts",
      "Explore real-world AI applications in African contexts",
      "Learn about neural networks and deep learning basics",
      "Discover AI ethics and responsible development practices",
      "Build simple AI models using user-friendly tools",
      "Identify AI opportunities in various African industries",
    ],
    curriculum: [
      {
        module: 1,
        title: "Introduction to Artificial Intelligence",
        lessons: [
          { id: 1, title: "What is Artificial Intelligence?", duration: "15 min", type: "video", free: true },
          { id: 2, title: "History of AI Development", duration: "20 min", type: "video", free: true },
          { id: 3, title: "AI vs Machine Learning vs Deep Learning", duration: "18 min", type: "video", free: false },
          { id: 4, title: "Quiz: AI Fundamentals", duration: "10 min", type: "quiz", free: false },
        ],
      },
      {
        module: 2,
        title: "AI Applications in Africa",
        lessons: [
          { id: 5, title: "AI in African Agriculture", duration: "25 min", type: "video", free: false },
          { id: 6, title: "Healthcare AI Solutions", duration: "22 min", type: "video", free: false },
          { id: 7, title: "Financial Technology and AI", duration: "20 min", type: "video", free: false },
          { id: 8, title: "Case Study: Mobile Money and AI", duration: "15 min", type: "reading", free: false },
        ],
      },
      {
        module: 3,
        title: "Machine Learning Fundamentals",
        lessons: [
          { id: 9, title: "Types of Machine Learning", duration: "30 min", type: "video", free: false },
          { id: 10, title: "Supervised Learning Explained", duration: "25 min", type: "video", free: false },
          { id: 11, title: "Unsupervised Learning Basics", duration: "20 min", type: "video", free: false },
          { id: 12, title: "Hands-on: Your First ML Model", duration: "45 min", type: "practical", free: false },
        ],
      },
      {
        module: 4,
        title: "Neural Networks and Deep Learning",
        lessons: [
          { id: 13, title: "Introduction to Neural Networks", duration: "28 min", type: "video", free: false },
          { id: 14, title: "Deep Learning Concepts", duration: "32 min", type: "video", free: false },
          { id: 15, title: "Convolutional Neural Networks", duration: "35 min", type: "video", free: false },
          { id: 16, title: "Project: Image Recognition", duration: "60 min", type: "project", free: false },
        ],
      },
      {
        module: 5,
        title: "AI Ethics and Responsible Development",
        lessons: [
          { id: 17, title: "AI Ethics Principles", duration: "20 min", type: "video", free: false },
          { id: 18, title: "Bias in AI Systems", duration: "25 min", type: "video", free: false },
          { id: 19, title: "Privacy and Data Protection", duration: "18 min", type: "video", free: false },
          { id: 20, title: "Discussion: AI in African Context", duration: "30 min", type: "discussion", free: false },
        ],
      },
      {
        module: 6,
        title: "Final Project and Certification",
        lessons: [
          { id: 21, title: "Final Project Guidelines", duration: "15 min", type: "reading", free: false },
          { id: 22, title: "Project Submission", duration: "120 min", type: "project", free: false },
          { id: 23, title: "Peer Review Process", duration: "30 min", type: "peer_review", free: false },
          { id: 24, title: "Course Completion Certificate", duration: "5 min", type: "certificate", free: false },
        ],
      },
    ],
  }

  const reviews = [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      comment: "Excellent course! The African context examples made AI concepts very relatable and practical.",
      date: "2024-03-10",
      avatar: "/review-avatar-1.png",
    },
    {
      id: 2,
      user: "John K.",
      rating: 5,
      comment: "Dr. Okafor explains complex concepts in a very understandable way. Highly recommended!",
      date: "2024-03-08",
      avatar: "/review-avatar-2.png",
    },
    {
      id: 3,
      user: "Fatima A.",
      rating: 4,
      comment: "Great introduction to AI. The practical examples were very helpful for understanding the concepts.",
      date: "2024-03-05",
      avatar: "/review-avatar-3.png",
    },
  ]

  const totalDuration = course.curriculum.reduce((total, module) => {
    return (
      total +
      module.lessons.reduce((moduleTotal, lesson) => {
        const duration = Number.parseInt(lesson.duration.split(" ")[0])
        return moduleTotal + duration
      }, 0)
    )
  }, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Compass className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-serif text-xl font-bold text-primary">Loyola Academy</h1>
                <p className="text-xs text-muted-foreground">Knowledge for Greater Impact</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/courses" className="text-sm font-medium hover:text-primary transition-colors">
                Courses
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header> */}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/courses" className="hover:text-primary">
            Courses
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/courses?category=${course.category}`} className="hover:text-primary">
            {course.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{course.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
                {course.featured && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}
              </div>

              <h1 className="font-serif text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{course.description}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">({course.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span>{course.studentsCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span>
                    {Math.floor(totalDuration / 60)}h {totalDuration % 60}m total
                  </span>
                </div>
              </div>

              {/* Course Video/Image */}
              <div className="relative mb-8">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                  <Button size="lg" className="bg-white text-black hover:bg-white/90">
                    <Play className="w-6 h-6 mr-2" />
                    Preview Course
                  </Button>
                </div>
              </div>
            </div>

            {/* Course Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What you'll learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Duration: {course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{course.lessonsCount} lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Language: {course.language}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Certificate included</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          Last updated: {new Date(course.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Level: {course.level}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                {course.curriculum.map((module, moduleIndex) => (
                  <Card key={moduleIndex}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>
                          Module {module.module}: {module.title}
                        </span>
                        <span className="text-sm font-normal text-muted-foreground">
                          {module.lessons.length} lessons
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                                {lesson.type === "video" && <Play className="w-4 h-4" />}
                                {lesson.type === "quiz" && <Target className="w-4 h-4" />}
                                {lesson.type === "reading" && <BookOpen className="w-4 h-4" />}
                                {lesson.type === "practical" && <CheckCircle className="w-4 h-4" />}
                                {lesson.type === "project" && <Award className="w-4 h-4" />}
                                {lesson.type === "discussion" && <Users className="w-4 h-4" />}
                                {lesson.type === "certificate" && <Award className="w-4 h-4" />}
                                {lesson.type === "peer_review" && <Users className="w-4 h-4" />}
                              </div>
                              <div>
                                <h4 className="font-medium">{lesson.title}</h4>
                                <p className="text-sm text-muted-foreground capitalize">
                                  {lesson.type.replace("_", " ")}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                              {lesson.free ? (
                                <Button size="sm" variant="outline">
                                  <Play className="w-4 h-4 mr-1" />
                                  Preview
                                </Button>
                              ) : (
                                <Lock className="w-4 h-4 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="instructor" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {course.instructor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-bold mb-1">{course.instructor.name}</h3>
                        <p className="text-muted-foreground mb-3">{course.instructor.title}</p>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-bold">{course.instructor.rating}</div>
                            <div className="text-xs text-muted-foreground">Instructor Rating</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold">{course.instructor.studentsCount.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Students</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold">{course.instructor.coursesCount}</div>
                            <div className="text-xs text-muted-foreground">Courses</div>
                          </div>
                        </div>

                        <p className="text-sm leading-relaxed">{course.instructor.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">Student Reviews</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-accent text-accent" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      <span className="text-muted-foreground">({course.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={review.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{review.user[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{review.user}</h4>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Enrollment Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    {course.price === 0 ? (
                      <div className="text-3xl font-bold text-accent mb-2">Free</div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-primary">${course.price}</div>
                        {course.originalPrice > course.price && (
                          <div className="text-lg text-muted-foreground line-through">${course.originalPrice}</div>
                        )}
                      </div>
                    )}
                  </div>

                  <Button className="w-full mb-4" size="lg">
                    {course.price === 0 ? "Enroll for Free" : "Enroll Now"}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground mb-4">30-day money-back guarantee</div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Duration</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Lessons</span>
                      <span className="font-medium">{course.lessonsCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Level</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Language</span>
                      <span className="font-medium">{course.language}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Certificate</span>
                      <span className="font-medium">Yes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Features */}
              <Card>
                <CardHeader>
                  <CardTitle>This course includes:</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{Math.floor(totalDuration / 60)}+ hours of video content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Downloadable resources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Access to course community</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Lifetime access</span>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
