"use client"

import axios from "axios"
import * as z from "zod"
import { MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Heading } from "@/components/heading"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Empty } from "@/components/empty"
import { Loader } from "@/components/loader"
import { cn } from "@/lib/utils"
import { UserAvatar } from "@/components/user-avatar"
import { BotAvatar } from "@/components/bot-avatar"
import { useProModal } from "@/hooks/use-pro-modal"

import { formSchema } from "./constants"

type MessageProps = {
  role: string
  parts: string
}[]

export default function GeminiPage() {
  const proModal = useProModal()
  const router = useRouter()
  const [messages, setMessages] = useState<MessageProps>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage = {
        role: "user",
        parts: values.prompt,
      }

      const newMessages = [...messages, userMessage]

      const response = await axios.post("/api/gemini", {
        messages: newMessages,
      })

      setMessages((current) => [...current, userMessage, response.data])

      form.reset()
    } catch (error: any) {
      if (error?.response?.status === 416) {
        proModal.onOpen()
      } else if (error?.response?.status === 417) {
        toast.error("不恰当的对话")
        form.reset()
      } else {
        toast.error("未知错误")
      }
    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading
        title='Gemini'
        description='对话模块'
        icon={MessageSquare}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'
      />
      <div className='px-4 lg:px-8'>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10'>
                    <FormControl className='m-0 p-0'>
                      <Input
                        className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder='如何计算圆的面积？'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className='col-span-12 lg:col-span-2 w-full'
                disabled={isLoading}
                type='submit'
                size='icon'>
                生成
              </Button>
            </form>
          </Form>
        </div>
        <div className='mt-4 space-y-4'>
          {isLoading && (
            <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label='还没开始对话' />
          )}
          <div className='flex flex-col-reverse gap-y-4'>
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}>
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <Markdown remarkPlugins={[remarkGfm]} className='text-sm'>
                  {String(message.parts)}
                </Markdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}