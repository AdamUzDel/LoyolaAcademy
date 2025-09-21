"use client"

import { useEffect, useState } from "react"

interface CurrencyDisplayProps {
  amount: number
  userCountry?: string
}

export function CurrencyDisplay({ amount, userCountry = "US" }: CurrencyDisplayProps) {
  const [localAmount, setLocalAmount] = useState(amount)
  const [currency, setCurrency] = useState("USD")

  useEffect(() => {
    const convertCurrency = async () => {
      // Mock currency conversion - in real app, use exchange rate API
      const currencyMap: { [key: string]: { currency: string; rate: number; symbol: string } } = {
        NG: { currency: "NGN", rate: 750, symbol: "₦" },
        KE: { currency: "KES", rate: 150, symbol: "KSh" },
        GH: { currency: "GHS", rate: 12, symbol: "₵" },
        UG: { currency: "UGX", rate: 3700, symbol: "USh" },
        TZ: { currency: "TZS", rate: 2500, symbol: "TSh" },
        ZA: { currency: "ZAR", rate: 18, symbol: "R" },
        US: { currency: "USD", rate: 1, symbol: "$" },
      }

      const countryData = currencyMap[userCountry] || currencyMap.US
      setLocalAmount(Math.round(amount * countryData.rate))
      setCurrency(countryData.currency)
    }

    convertCurrency()
  }, [amount, userCountry])

  return (
    <span className="font-semibold">
      {currency} {localAmount.toLocaleString()}
    </span>
  )
}
