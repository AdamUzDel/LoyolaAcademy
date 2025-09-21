import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Compass, Globe, GraduationCap, Users, BookOpen, Award, ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Compass className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-serif text-xl font-bold text-primary">Loyola Academy</h1>
                <p className="text-xs text-muted-foreground">Knowledge for Greater Impact</p>
              </div>
            </div>
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
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            <Globe className="w-4 h-4 mr-2" />
            Empowering African Youth & Global Learners
          </Badge>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-balance mb-6">
            Master <span className="text-accent">ICT & AI Skills</span> for Tomorrow's World
          </h1>
          <p className="text-lg text-muted-foreground text-balance mb-8 leading-relaxed">
            Join thousands of learners advancing their careers through our comprehensive online courses. From
            foundational ICT skills to cutting-edge AI technologies, we prepare you for the digital future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/courses">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/signup">
                <Users className="w-5 h-5 mr-2" />
                Join as Teacher
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
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
      </section>

      {/* Featured Courses */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">Featured Courses</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start your learning journey with our most popular courses designed for African and global learners
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Introduction to AI Basics for Africa",
                description: "Learn fundamental AI concepts with real-world African applications and case studies.",
                level: "Beginner",
                duration: "6 weeks",
                price: "Free",
                rating: 4.9,
                students: 2340,
              },
              {
                title: "Web Development Fundamentals",
                description: "Master HTML, CSS, and JavaScript to build modern, responsive websites.",
                level: "Beginner",
                duration: "8 weeks",
                price: "$49",
                rating: 4.8,
                students: 1890,
              },
              {
                title: "Data Science with Python",
                description: "Analyze data and build predictive models using Python and popular libraries.",
                level: "Intermediate",
                duration: "12 weeks",
                price: "$99",
                rating: 4.9,
                students: 1560,
              },
            ].map((course, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-lg flex items-center justify-center">
                  <GraduationCap className="w-12 h-12 text-primary" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{course.level}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{course.duration}</span>
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{course.price}</span>
                    <Button size="sm">Enroll Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="font-serif text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg leading-relaxed mb-8 opacity-90">
            Inspired by Jesuit values of excellence, service, and global perspective, we democratize access to quality
            ICT and AI education. Our platform bridges the digital divide, empowering learners across Africa and beyond
            to build meaningful careers in technology.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Guided Learning</h3>
              <p className="text-sm opacity-80">Structured pathways that guide you from beginner to expert</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Global Impact</h3>
              <p className="text-sm opacity-80">Skills that create opportunities in the global digital economy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Excellence</h3>
              <p className="text-sm opacity-80">Industry-recognized certificates and career advancement</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Ready to Transform Your Future?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners who have already started their journey to digital excellence. Your future in
            technology starts today.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <Link href="/auth/signup">
              Start Learning Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Compass className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-primary">Loyola Academy</h3>
                  <p className="text-xs text-muted-foreground">Knowledge for Greater Impact</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering learners worldwide with quality ICT and AI education.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/courses" className="hover:text-primary">
                    All Courses
                  </Link>
                </li>
                <li>
                  <Link href="/free-courses" className="hover:text-primary">
                    Free Courses
                  </Link>
                </li>
                <li>
                  <Link href="/certificates" className="hover:text-primary">
                    Certificates
                  </Link>
                </li>
                <li>
                  <Link href="/career-paths" className="hover:text-primary">
                    Career Paths
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Teach</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/teach" className="hover:text-primary">
                    Become Instructor
                  </Link>
                </li>
                <li>
                  <Link href="/instructor-guide" className="hover:text-primary">
                    Teaching Guide
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-primary">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Loyola Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
