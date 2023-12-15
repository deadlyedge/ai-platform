import { useEffect, useState } from "react"
import { Zap } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MAX_FREE_COUNTS } from "@/constants"
import { Button } from "@/components/ui/button"
import { useProModal } from "@/hooks/use-pro-modal"

type TrailCounterProps = {
  apiLimitCount: number
  isPro: boolean
}

export function TrailCounter({
  apiLimitCount = 0,
  isPro = false,
}: TrailCounterProps) {
  const proModal = useProModal()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  if (isPro) return null

  return (
    <div className='px-3'>
      <Card className='bg-white/10 border-0'>
        <CardContent className='py-6'>
          <div className='text-center text-sm text-white mb-4 space-y-2'>
            <p>
              使用了 {apiLimitCount} / {MAX_FREE_COUNTS} 免费生成
            </p>
            <Progress
              className='h-3'
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button onClick={proModal.onOpen} variant='premium'>
            升级
            <Zap className='w-4 h-4 ml-2 fill-white' />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
