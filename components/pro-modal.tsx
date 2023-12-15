"use client"

import axios from "axios"
import {
  Check,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  Zap,
} from "lucide-react"
import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useProModal } from "@/hooks/use-pro-modal"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
]

export const ProModal = () => {
  const proModal = useProModal()
  const [isLoading, setIsLoading] = useState(false)

  const onSubscribe = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get("/api/stripe")

      window.location.href = response.data.url
    } catch (error) {
      console.log(error, "STRIPE_CLIENT_ERROR")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
            <div className='flex items-center gap-x-2 font-bold py-1'>
              升级成为会员
              <Badge variant='premium' className='uppercase text-sm py-1'>
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>
            {tools.map((tool) => (
              <span
                key={tool.label}
                className='p-2 border-black/5 flex items-center justify-between border-dashed border rounded-lg'>
                <span className='flex items-center gap-x-4'>
                  <span className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-8 h-8", tool.color)} />
                  </span>
                  <span className='font-semibold'>{tool.label}</span>
                </span>
                <Check className='text-primary w-5 h-5' />
              </span>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onSubscribe} variant='premium' size='lg'>
            确认升级
            <Zap />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
