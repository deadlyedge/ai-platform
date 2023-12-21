import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { GoogleGenerativeAI, InputContent } from "@google/generative-ai"

import { increaseApiLimits, checkApiLimits } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"
import { SafetySettings } from "@/lib/utils"

const genai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export async function POST(req: Request) {
  const model = genai.getGenerativeModel({ model: "gemini-pro" })
  try {
    const { userId } = auth()
    const body = await req.json()
    const { messages } = body

    const history: InputContent[] =
      messages.length < 2
        ? [
            { role: "user", parts: "请用尽量简短的语言回答" },
            {
              role: "model",
              parts: "ok",
            },
          ]
        : messages.slice(0, -1)
    // console.log("history:", history)

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!genai.apiKey) {
      return new NextResponse("Google API Key not configured", { status: 500 })
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 })
    }

    const freeTrial = await checkApiLimits()
    const isPro = await checkSubscription()

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired.", { status: 416 })
    }

    if (!isPro) await increaseApiLimits(0.1)

    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 250,
      },
      safetySettings: SafetySettings,
    })

    const result = await chat.sendMessage(messages.pop()["parts"])
    const response = await result.response

    try {
      return NextResponse.json({
        role: "model",
        parts: response.text(),
      })
    } catch (error) {
      return NextResponse.json(
        // {
        //   role: "model",
        //   parts: "[信息因为安全因素被屏蔽]",
        // },
        error,
        { status: 417 }
      )
    }
  } catch (error) {
    console.log("[GEMINI_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
