"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CreditCard,
  Smartphone,
  Globe,
  Shield,
  CheckCircle,
  ArrowLeft,
  Lock,
  Star,
  Clock,
  BookOpen,
  Compass,
} from "lucide-react"
import Link from "next/link"

interface CheckoutPageProps {
  params: {
    courseId: string
  }
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState("stripe")
  const [mobileProvider, setMobileProvider] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [userCountry, setUserCountry] = useState("US")
  const [currency, setCurrency] = useState("USD")
  const [exchangeRate, setExchangeRate] = useState(1)

  // Mock course data - in real app, fetch from Supabase
  const course = {
    id: Number.parseInt(params.courseId),
    title: "Introduction to AI Basics for Africa",
    instructor: "Dr. Amara Okafor",
    thumbnail: "/ai-course-thumbnail.png",
    price: 49,
    originalPrice: 79,
    rating: 4.9,
    studentsCount: 2340,
    lessonsCount: 24,
    duration: "6 weeks",
    level: "Beginner",
  }

  // Mock location detection and currency conversion
  useEffect(() => {
    const detectLocation = async () => {
      try {
        // In real app, use geolocation API or IP-based detection
        console.log("[v0] Detecting user location...")

        // Mock African country detection
        const mockCountries = ["NG", "KE", "GH", "UG", "TZ", "ZA"]
        const mockCountry = mockCountries[Math.floor(Math.random() * mockCountries.length)]

        setUserCountry(mockCountry)

        // Set currency and exchange rate based on country
        const currencyMap: { [key: string]: { currency: string; rate: number } } = {
          NG: { currency: "NGN", rate: 750 }, // Nigerian Naira
          KE: { currency: "KES", rate: 150 }, // Kenyan Shilling
          GH: { currency: "GHS", rate: 12 }, // Ghanaian Cedi
          UG: { currency: "UGX", rate: 3700 }, // Ugandan Shilling
          TZ: { currency: "TZS", rate: 2500 }, // Tanzanian Shilling
          ZA: { currency: "ZAR", rate: 18 }, // South African Rand
          US: { currency: "USD", rate: 1 },
        }

        const countryData = currencyMap[mockCountry] || currencyMap.US
        setCurrency(countryData.currency)
        setExchangeRate(countryData.rate)

        console.log("[v0] Location detected:", mockCountry, countryData)
      } catch (error) {
        console.error("[v0] Location detection failed:", error)
      }
    }

    detectLocation()
  }, [])

  const localPrice = Math.round(course.price * exchangeRate)
  const localOriginalPrice = Math.round(course.originalPrice * exchangeRate)

  const paymentMethods = [
    {
      id: "stripe",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      icon: CreditCard,
      available: true,
    },
    {
      id: "mobile_money",
      name: "Mobile Money",
      description: "MTN Mobile Money, Airtel Money",
      icon: Smartphone,
      available: ["NG", "KE", "GH", "UG", "TZ"].includes(userCountry),
    },
  ]

  const mobileProviders = [
    { id: "mtn", name: "MTN Mobile Money", countries: ["NG", "GH", "UG", "ZA"] },
    { id: "airtel", name: "Airtel Money", countries: ["KE", "TZ", "UG", "NG"] },
    { id: "mpesa", name: "M-Pesa", countries: ["KE", "TZ"] },
  ]

  const availableProviders = mobileProviders.filter((provider) => provider.countries.includes(userCountry))

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      if (paymentMethod === "stripe") {
        console.log("[v0] Processing Stripe payment...")
        // TODO: Integrate with Stripe
        await processStripePayment()
      } else if (paymentMethod === "mobile_money") {
        console.log("[v0] Processing mobile money payment...")
        // TODO: Integrate with Flutterwave/Paystack
        await processMobileMoneyPayment()
      }
    } catch (error) {
      console.error("[v0] Payment failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const processStripePayment = async () => {
    // Mock Stripe integration
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("[v0] Stripe payment successful")
    // TODO: Redirect to success page
  }

  const processMobileMoneyPayment = async () => {
    // Mock mobile money integration
    await new Promise((resolve) => setTimeout(resolve, 3000))
    console.log("[v0] Mobile money payment successful")
    // TODO: Redirect to success page
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Compass className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-serif text-xl font-bold text-primary">Loyola Academy</h1>
                <p className="text-xs text-muted-foreground">Secure Checkout</p>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href={`/courses/${course.id}`} className="hover:text-primary flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back to Course
            </Link>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="font-serif text-3xl font-bold mb-2">Complete Your Purchase</h1>
                <p className="text-muted-foreground">Choose your preferred payment method</p>
              </div>

              {/* Location Notice */}
              {userCountry !== "US" && (
                <Alert>
                  <Globe className="h-4 w-4" />
                  <AlertDescription>
                    We've detected you're in {userCountry}. Prices are shown in {currency} and mobile money options are
                    available.
                  </AlertDescription>
                </Alert>
              )}

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Select how you'd like to pay for this course</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`flex items-center space-x-3 p-4 border rounded-lg ${
                          !method.available ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-muted/50"
                        }`}
                      >
                        <RadioGroupItem value={method.id} disabled={!method.available} />
                        <method.icon className="w-5 h-5 text-muted-foreground" />
                        <div className="flex-1">
                          <Label className="font-medium cursor-pointer">{method.name}</Label>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                        {!method.available && <Badge variant="secondary">Not available in your region</Badge>}
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Stripe Payment Form */}
              {paymentMethod === "stripe" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Card Information</CardTitle>
                    <CardDescription>Enter your payment details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" className="font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardholder">Cardholder Name</Label>
                      <Input id="cardholder" placeholder="John Doe" />
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <Lock className="w-4 h-4 text-accent" />
                      <span className="text-sm">Your payment information is encrypted and secure</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Mobile Money Payment Form */}
              {paymentMethod === "mobile_money" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Mobile Money Payment</CardTitle>
                    <CardDescription>Pay using your mobile money account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="provider">Mobile Money Provider</Label>
                      <Select value={mobileProvider} onValueChange={setMobileProvider}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableProviders.map((provider) => (
                            <SelectItem key={provider.id} value={provider.id}>
                              {provider.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+234 801 234 5678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Enter the phone number linked to your mobile money account
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
                      <ol className="text-sm text-blue-800 space-y-1">
                        <li>1. Click "Complete Payment" below</li>
                        <li>2. You'll receive a payment prompt on your phone</li>
                        <li>3. Enter your mobile money PIN to confirm</li>
                        <li>4. You'll get instant access to the course</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Complete Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing || (paymentMethod === "mobile_money" && (!mobileProvider || !phoneNumber))}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Complete Payment - {currency} {localPrice.toLocaleString()}
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>By completing your purchase, you agree to our Terms of Service and Privacy Policy</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm line-clamp-2">{course.title}</h3>
                        <p className="text-xs text-muted-foreground">by {course.instructor}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {course.level}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-accent text-accent" />
                            <span className="text-xs">{course.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Course Price</span>
                        <span className="line-through text-muted-foreground">
                          {currency} {localOriginalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Discount</span>
                        <span className="text-green-600">
                          -{currency} {(localOriginalPrice - localPrice).toLocaleString()}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-lg">
                          {currency} {localPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <p>30-day money-back guarantee</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">What's Included</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{course.duration} of content</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span>{course.lessonsCount} lessons</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-muted-foreground" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-muted-foreground" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-muted-foreground" />
                      <span>Mobile and desktop access</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-accent" />
                    <span className="font-medium text-accent text-sm">Secure Payment</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your payment is protected by industry-standard encryption and our secure payment partners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
