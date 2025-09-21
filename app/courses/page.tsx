"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Star, Clock, BookOpen, Play, Compass } from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")

  // Mock data - in real app, fetch from Supabase
  const courses = [
    {
      id: 1,
      title: "Introduction to AI Basics for Africa",
      description: "Learn fundamental AI concepts with real-world African applications and case studies.",
      instructor: "Dr. Amara Okafor",
      category: "Artificial Intelligence",
      level: "Beginner",
      duration: "6 weeks",
      price: 0,
      originalPrice: 0,
      rating: 4.9,
      studentsCount: 2340,
      lessonsCount: 24,
      thumbnail: "/ai-course-thumbnail.png",
      tags: ["AI", "Machine Learning", "Africa", "Beginner"],
      featured: true,
    },
    {
      id: 2,
      title: "Web Development Fundamentals",
      description: "Master HTML, CSS, and JavaScript to build modern, responsive websites.",
      instructor: "Prof. Kwame Asante",
      category: "Web Development",
      level: "Beginner",
      duration: "8 weeks",
      price: 49,
      originalPrice: 79,
      rating: 4.8,
      studentsCount: 1890,
      lessonsCount: 32,
      thumbnail: "/web-development-course.png",
      tags: ["HTML", "CSS", "JavaScript", "Responsive"],
      featured: false,
    },
    {
      id: 3,
      title: "Data Science with Python",
      description: "Analyze data and build predictive models using Python and popular libraries.",
      instructor: "Dr. Fatima Al-Rashid",
      category: "Data Science",
      level: "Intermediate",
      duration: "12 weeks",
      price: 99,
      originalPrice: 149,
      rating: 4.9,
      studentsCount: 1560,
      lessonsCount: 40,
      thumbnail: "/python-data-science-course.png",
      tags: ["Python", "Data Analysis", "Machine Learning", "Pandas"],
      featured: true,
    },
    {
      id: 4,
      title: "Digital Marketing for African Businesses",
      description: "Learn digital marketing strategies tailored for African markets and businesses.",
      instructor: "Mary Okonkwo",
      category: "Business",
      level: "Beginner",
      duration: "6 weeks",
      price: 39,
      originalPrice: 59,
      rating: 4.7,
      studentsCount: 987,
      lessonsCount: 20,
      thumbnail: "/digital-marketing-course.png",
      tags: ["Marketing", "Business", "Africa", "Social Media"],
      featured: false,
    },
    {
      id: 5,
      title: "Cybersecurity Fundamentals",
      description: "Protect systems and data with essential cybersecurity knowledge and practices.",
      instructor: "Dr. Ahmed Hassan",
      category: "Cybersecurity",
      level: "Intermediate",
      duration: "10 weeks",
      price: 79,
      originalPrice: 119,
      rating: 4.8,
      studentsCount: 1234,
      lessonsCount: 28,
      thumbnail: "/cybersecurity-course.png",
      tags: ["Security", "Network", "Ethical Hacking", "Privacy"],
      featured: false,
    },
    {
      id: 6,
      title: "Mobile App Development with React Native",
      description: "Build cross-platform mobile applications using React Native framework.",
      instructor: "Prof. Sarah Mwangi",
      category: "Mobile Development",
      level: "Advanced",
      duration: "14 weeks",
      price: 129,
      originalPrice: 199,
      rating: 4.9,
      studentsCount: 756,
      lessonsCount: 45,
      thumbnail: "/react-native-course.png",
      tags: ["React Native", "Mobile", "iOS", "Android"],
      featured: true,
    },
  ]

  const categories = [
    "Artificial Intelligence",
    "Web Development",
    "Data Science",
    "Business",
    "Cybersecurity",
    "Mobile Development",
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel
    const matchesPrice =
      selectedPrice === "all" ||
      (selectedPrice === "free" && course.price === 0) ||
      (selectedPrice === "paid" && course.price > 0)

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice
  })

  const featuredCourses = courses.filter((course) => course.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
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
              <Link href="/courses" className="text-sm font-medium text-primary">
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
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold mb-4">Explore Our Courses</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover world-class ICT and AI courses designed for African learners and global students
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="all">All Courses ({filteredCourses.length})</TabsTrigger>
            <TabsTrigger value="featured">Featured ({featuredCourses.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {course.price === 0 && (
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">Free</Badge>
                    )}
                    {course.originalPrice > course.price && course.price > 0 && (
                      <Badge className="absolute top-3 left-3 bg-green-500 text-white">
                        {Math.round((1 - course.price / course.originalPrice) * 100)}% Off
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                      <Button size="sm" className="bg-white text-black hover:bg-white/90">
                        <Play className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{course.level}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-sm font-medium">{course.rating}</span>
                        <span className="text-sm text-muted-foreground">({course.studentsCount})</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                    <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {course.lessonsCount} lessons
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {course.price === 0 ? (
                          <span className="text-lg font-bold text-accent">Free</span>
                        ) : (
                          <>
                            <span className="text-lg font-bold text-primary">${course.price}</span>
                            {course.originalPrice > course.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${course.originalPrice}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                      <Button size="sm" asChild>
                        <Link href={`/courses/${course.id}`}>{course.price === 0 ? "Enroll Free" : "Enroll Now"}</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow group border-accent/20">
                  <div className="relative">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">Featured</Badge>
                    {course.price === 0 && (
                      <Badge className="absolute top-3 right-3 bg-green-500 text-white">Free</Badge>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                      <Button size="sm" className="bg-white text-black hover:bg-white/90">
                        <Play className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{course.level}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-sm font-medium">{course.rating}</span>
                        <span className="text-sm text-muted-foreground">({course.studentsCount})</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                    <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {course.lessonsCount} lessons
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {course.price === 0 ? (
                          <span className="text-lg font-bold text-accent">Free</span>
                        ) : (
                          <>
                            <span className="text-lg font-bold text-primary">${course.price}</span>
                            {course.originalPrice > course.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${course.originalPrice}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                      <Button size="sm" asChild>
                        <Link href={`/courses/${course.id}`}>{course.price === 0 ? "Enroll Free" : "Enroll Now"}</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats Section */}
        <div className="mt-16 py-12 bg-muted/30 rounded-lg">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold mb-2">Join Our Learning Community</h2>
            <p className="text-muted-foreground">Thousands of learners are already advancing their careers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground">Active Learners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Expert Instructors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1,200+</div>
              <div className="text-sm text-muted-foreground">Courses Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
