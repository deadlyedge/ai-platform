import * as z from "zod"

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "Image prompt is required" }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
  model: z.string().min(1),
})

export const amountOptions = [
  {
    value: "1",
    label: "1 Photo",
  },
  {
    value: "2",
    label: "2 Photos",
  },
  {
    value: "3",
    label: "3 Photos",
  },
  {
    value: "4",
    label: "4 Photos",
  },
]

export const resolutionOptions = [
  {
    value: "512x512",
    label: "512x512",
  },
  {
    value: "1024x1024",
    label: "1024x1024",
  },
]

export const modelOptions = [
  {
    value: "dall-e-2",
    label: "Dall-E 2",
  },
  {
    value: "dall-e-3",
    label: "Dall-E 3",
  },
]
