"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard, Smartphone, Banknote, Globe } from "lucide-react"

interface PaymentMethodsProps {
  userCountry: string
  onMethodSelect: (method: string) => void
  selectedMethod: string
}

export function PaymentMethods({ userCountry, onMethodSelect, selectedMethod }: PaymentMethodsProps) {
  const paymentMethods = [
    {
      id: "stripe",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      icon: CreditCard,
      available: true,
      popular: userCountry === "US",
    },
    {
      id: "mobile_money",
      name: "Mobile Money",
      description: "MTN Mobile Money, Airtel Money, M-Pesa",
      icon: Smartphone,
      available: ["NG", "KE", "GH", "UG", "TZ", "ZA"].includes(userCountry),
      popular: ["NG", "KE", "GH", "UG", "TZ"].includes(userCountry),
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      description: "Direct bank transfer (local banks)",
      icon: Banknote,
      available: ["NG", "KE", "GH", "ZA"].includes(userCountry),
      popular: false,
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Pay with your PayPal account",
      icon: Globe,
      available: ["US", "GB", "CA", "AU"].includes(userCountry),
      popular: false,
    },
  ]

  const availableMethods = paymentMethods.filter((method) => method.available)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedMethod} onValueChange={onMethodSelect} className="space-y-3">
          {availableMethods.map((method) => (
            <div
              key={method.id}
              className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                selectedMethod === method.id ? "border-primary bg-primary/5" : ""
              }`}
              onClick={() => onMethodSelect(method.id)}
            >
              <RadioGroupItem value={method.id} />
              <method.icon className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label className="font-medium cursor-pointer">{method.name}</Label>
                  {method.popular && (
                    <Badge variant="secondary" className="text-xs">
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>

        {availableMethods.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No payment methods available in your region.</p>
            <Button variant="outline" className="mt-4 bg-transparent">
              Contact Support
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
