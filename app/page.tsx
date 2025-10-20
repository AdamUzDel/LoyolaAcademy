"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Compass, Globe, GraduationCap, Users, BookOpen, Award, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { useStats } from "@/hooks/use-stats"
import { useFeaturedCourses } from "@/hooks/use-featured-courses"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  const { stats, loading: statsLoading } = useStats()
  const { courses, loading: coursesLoading } = useFeaturedCourses()

  return (
    <div className="min-h-screen bg-background">
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
              {statsLoading ? (
                <Skeleton className="h-8 w-20 mx-auto mb-2" />
              ) : (
                <div className="text-3xl font-bold text-primary mb-2">{stats.totalLearners.toLocaleString()}+</div>
              )}
              <div className="text-sm text-muted-foreground">Active Learners</div>
            </div>
            <div>
              {statsLoading ? (
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
              ) : (
                <div className="text-3xl font-bold text-primary mb-2">{stats.totalInstructors.toLocaleString()}+</div>
              )}
              <div className="text-sm text-muted-foreground">Expert Instructors</div>
            </div>
            <div>
              {statsLoading ? (
                <Skeleton className="h-8 w-20 mx-auto mb-2" />
              ) : (
                <div className="text-3xl font-bold text-primary mb-2">{stats.totalCourses.toLocaleString()}+</div>
              )}
              <div className="text-sm text-muted-foreground">Courses Available</div>
            </div>
            <div>
              {statsLoading ? (
                <Skeleton className="h-8 w-12 mx-auto mb-2" />
              ) : (
                <div className="text-3xl font-bold text-primary mb-2">{stats.completionRate}%</div>
              )}
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
            {coursesLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <Skeleton className="aspect-video rounded-t-lg" />
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm mb-4">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-12" />
                        <Skeleton className="h-8 w-20" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              : courses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow pt-0">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-lg flex items-center justify-center overflow-hidden">
                      {course.thumbnail_url ? (
                        <img
                          src={course.thumbnail_url || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <GraduationCap className="w-12 h-12 text-primary" />
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="capitalize">
                          {course.level}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm font-medium">{course.avg_rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>{course.short_description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span>{Math.ceil(course.duration_hours / 7)} weeks</span>
                        <span>{course._count.enrollments.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          {course.price === 0 ? "Free" : `$${course.price}`}
                        </span>
                        <Button size="sm" asChild>
                          <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                        </Button>
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
    </div>
  )
}
