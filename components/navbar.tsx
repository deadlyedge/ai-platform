import { UserButton } from "@clerk/nextjs"

import MobileSidebar from "@/components/mobile-sidebar"

type NavbarProps = {}

export default function Navbar({}: NavbarProps) {
  return (
    <div className='flex items-center p-4'>
      <MobileSidebar />
      <div className='flex w-full justify-end'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  )
}
