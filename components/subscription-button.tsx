"use client"

import axios from "axios"
import { Zap } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

type SubscriptionButtonProps = { isPro: boolean }

export function SubscriptionButton({ isPro = false }: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get("/api/stripe")

      window.location.href = response.data.url
    } catch (error) {
      console.log("BILLING_ERROR", error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Button
      disabled={isLoading}
      variant={isPro ? "default" : "premium"}
      onClick={onClick}>
      {isPro ? "管理订阅" : "升级会员"}
      {!isPro && <Zap className='w-4 h-4 ml-2 fill-white' />}
    </Button>
  )
}
