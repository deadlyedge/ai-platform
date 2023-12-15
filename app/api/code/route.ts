import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import OpenAI from "openai"

import { increaseApiLimits, checkApiLimits } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
})

const instructionMessage: OpenAI.Chat.ChatCompletionSystemMessageParam = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explainations.",
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { messages } = body

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!openai.apiKey) {
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

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    })

    if (!isPro) await increaseApiLimits()   // maybe i want to check usage?

    return NextResponse.json(chatCompletion.choices[0].message)
  } catch (error) {
    console.log("[CODE_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
