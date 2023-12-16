"use client"

import Image from "next/image"
import Link from "next/link"
import { Montserrat } from "next/font/google"
import { usePathname } from "next/navigation"
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { TrailCounter } from "@/components/trail-counter"

type SidebarProps = {
  apiLimitCount: number
  isPro: boolean
}

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] })

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function Sidebar({ apiLimitCount = 0, isPro = false }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className='flex space-y-4 py-4 flex-col h-full bg-[#111827] text-white'>
      <div className='px-3 py-2 flex-1'>
        <Link href='/dashboard' className='flex items-center pl-3 mb-14'>
          <div className='relative w-8 h-8 mr-4'>
            <Image
              fill
              alt='Logo'
              src='/logo.png'
              sizes='(max-width: 256px) 10vw, (max-width: 256px) 10vw, 10vw'
            />
          </div>
          <h1 className={cn("text-xl font-bold", montserrat.className)}>
            AI platform
          </h1>
        </Link>
        <div className='space-y-1'>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}>
              <div className='flex items-center flex-1'>
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <TrailCounter isPro={isPro} apiLimitCount={apiLimitCount} />
    </div>
  )
}
