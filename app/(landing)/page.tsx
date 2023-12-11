import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div>
      LandingPage (Unprotected)
      <div>
        <Link href='/sign-in'>
          <Button>登录</Button>
        </Link>
        <Link href='/sign-up'>
          <Button>注册</Button>
        </Link>
      </div>
    </div>
  )
}
