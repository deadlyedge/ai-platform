import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { getApiLimitCount } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"

type DashboardLayoutProps = { children: React.ReactNode }

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscription()

  return (
    <div className='h-full relative'>
      <div className='hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gray-900'>
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      <main className='md:pl-64'>
        <Navbar />
        {children}
      </main>
    </div>
  )
}
