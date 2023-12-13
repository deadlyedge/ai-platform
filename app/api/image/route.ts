import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
})

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prompt, amount = 1, resolution = "512x512" } = body

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 })
    }
    if (!prompt) {
      return new NextResponse("Prompts are required", { status: 400 })
    }
    if (!amount) {
      return new NextResponse("Amounts are required", { status: 400 })
    }
    if (!resolution) {
      return new NextResponse("Resolutions are required", { status: 400 })
    }

    const imageGen = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    })

    return NextResponse.json(imageGen.data)
  } catch (error) {
    console.log("[IMAGE_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}