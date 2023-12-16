import { Settings } from "lucide-react"

import { Heading } from "@/components/heading"
import { SubscriptionButton } from "@/components/subscription-button"
import { checkSubscription } from "@/lib/subscription"

export default async function SettingsPage() {
  const isPro = await checkSubscription()

  return (
    <div>
      <Heading
        title='账户设置'
        description='管理您的AI-platform账户'
        icon={Settings}
        iconColor='text-gray-700'
        bgColor='bg-gray-700/10'
      />
      <div className='px-4 lg:px-8 space-y-4'>
        <div className='text-sm text-muted-foreground'>
          {isPro ? "您是高级会员" : "您现在处于免费试用中"}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  )
}
