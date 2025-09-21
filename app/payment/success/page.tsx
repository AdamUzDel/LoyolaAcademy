"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Play, Share2, Star, Compass } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const [orderDetails, setOrderDetails] = useState({
    orderId: "LA-2024-001234",
    courseTitle: "Introduction to AI Basics for Africa",
    instructor: "Dr. Amara Okafor",
    amount: "NGN 36,750",
    paymentMethod: "MTN Mobile Money",
    purchaseDate: new Date().toLocaleDateString(),
    thumbnail: "/ai-course-thumbnail.png",
  })

  useEffect(() => {
    // In real app, fetch order details from URL params or API
    console.log("[v0] Payment successful, loading order details...")
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Compass className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-primary">Loyola Academy</h1>
              <p className="text-xs text-muted-foreground">Payment Successful</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="font-serif text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Congratulations! You now have lifetime access to your course.
          </p>

          {/* Order Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={orderDetails.thumbnail || "/placeholder.svg"}
                  alt={orderDetails.courseTitle}
                  className="w-20 h-14 object-cover rounded"
                />
                <div className="flex-1 text-left">
                  <h3 className="font-semibold">{orderDetails.courseTitle}</h3>
                  <p className="text-sm text-muted-foreground">by {orderDetails.instructor}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">Beginner</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm">4.9</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-medium">{orderDetails.orderId}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Amount Paid</p>
                  <p className="font-medium">{orderDetails.amount}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium">{orderDetails.paymentMethod}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Purchase Date</p>
                  <p className="font-medium">{orderDetails.purchaseDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <Link href="/dashboard/learner">
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard/learner">Go to Dashboard</Link>
              </Button>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Achievement
              </Button>
            </div>
          </div>

          {/* Next Steps */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Start Your First Lesson</h4>
                  <p className="text-sm text-muted-foreground">
                    Begin with "What is Artificial Intelligence?" and build your foundation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Join the Course Community</h4>
                  <p className="text-sm text-muted-foreground">
                    Connect with fellow students and ask questions in the discussion forum.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Track Your Progress</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete lessons and quizzes to earn your certificate of completion.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Need Help?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              If you have any questions about your purchase or need technical support, we're here to help.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/support">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
