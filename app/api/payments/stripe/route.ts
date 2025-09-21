import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { courseId, amount, currency = "USD" } = await request.json()

    console.log("[v0] Creating Stripe payment intent:", { courseId, amount, currency })

    // TODO: Initialize Stripe with secret key
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

    // Mock Stripe payment intent creation
    const paymentIntent = {
      id: "pi_mock_" + Math.random().toString(36).substr(2, 9),
      client_secret: "pi_mock_secret_" + Math.random().toString(36).substr(2, 9),
      amount: amount * 100, // Stripe uses cents
      currency: currency.toLowerCase(),
      status: "requires_payment_method",
    }

    // TODO: Create actual payment intent
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount * 100,
    //   currency: currency.toLowerCase(),
    //   metadata: {
    //     courseId: courseId.toString(),
    //   },
    // })

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error("[v0] Stripe payment intent creation failed:", error)
    return NextResponse.json({ success: false, error: "Failed to create payment intent" }, { status: 500 })
  }
}
