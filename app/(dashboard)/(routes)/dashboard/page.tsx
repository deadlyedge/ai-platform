"use client"

import { useRouter } from "next/navigation"

import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  MessageCircleWarning,
  PieChart,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const tools = [
  {
    label: "ChatGPT",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Gemini Google",
    icon: PieChart,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    href: "/gemini",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
    disabled: true,
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
    disabled: true,
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/code",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>
          Dashboard
        </h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {tools.map((tool) =>
          tool.disabled ? null : (
            <Card
              onClick={() => router.push(tool.href)}
              key={tool.label}
              className='p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer'>
              <div className='flex items-center gap-x-4'>
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <div className='font-semibold'>{tool.label}</div>
              </div>
              <ArrowRight className='w-5 h-5' />
            </Card>
          )
        )}
      </div>
      <div className='text-muted-foreground font-light italic text-sm text-center mt-5 flex justify-center items-center'>
        <MessageCircleWarning className='w-8 h-8 ' />
        鉴于目前基于AI的视频和音乐生成品质难以保证“惊艳”的质量，暂时停用此两项功能。
      </div>
    </div>
  )
}
