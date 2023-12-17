"use client"

import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import TypewriterComponent from "typewriter-effect"
import { Button } from "./ui/button"

export function LandingHero() {
  const { isSignedIn } = useAuth()
  return (
    <div className='text-white font-bold py-36 text-center space-y-5'>
      <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold'>
        <h1>A good AI Tool</h1>
        <p>for</p>
        <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
          <TypewriterComponent
            options={{
              strings: ["聊天", "图片生成", "音乐生成", "代码助手", "视频生成"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className='text-sm md:text-xl font-light text-zinc-400'>
        Create content using AI.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant='premium'
            className='md:text-lg p-4 md:p-6 rounded-full font-semibold w-fit'>
            现在就开始
          </Button>
        </Link>
      </div>
      <div className='text-zinc-400 text-xs md:text-sm font-normal'>
        试用不需要信用卡
      </div>
    </div>
  )
}
