import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { GoogleGenerativeAI, InputContent } from "@google/generative-ai"

import { increaseApiLimits, checkApiLimits } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"

type MessageProps = {
  role: string
  content: string
}[]

const genai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export async function POST(req: Request) {
  const model = genai.getGenerativeModel({ model: "gemini-pro" })
  try {
    const { userId } = auth()
    const body = await req.json()
    const { messages } = body

    const history: InputContent[] = messages
      .slice(0, -1)
      .map((message: { role: string; content?: string; parts?: string }) => {
        message.parts = message.content
        delete message.content
        return message
      })
    console.log("history:", history)

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!genai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 })
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

    if (messages.length < 2) {
      const chat = model.startChat({
        history: [
          { role: "user", parts: "请用尽量简短的语言回答" },
          {
            role: "model",
            parts: "ok",
          },
        ],
        generationConfig: {
          maxOutputTokens: 100,
        },
      })

      const result = await chat.sendMessage(messages[0]["content"])
      const response = await result.response

      return NextResponse.json({
        role: "model",
        content: response.text(),
      })
    } else {
      const chat = model.startChat({
        history: history,
        generationConfig: {
          maxOutputTokens: 200,
        },
      })

      const result = await chat.sendMessage(messages.pop()["content"])
      const response = await result.response

      return NextResponse.json({
        role: "model",
        content: response.text(),
      })
    }
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
