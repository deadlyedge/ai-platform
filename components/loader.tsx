import Image from "next/image"

type LoaderProps = {}

export function Loader({}: LoaderProps) {
  return (
    <div className='h-full flex flex-col gap-y-4 items-center justify-center'>
      <div className='w-10 h-10 relative animate-spin'>
        <Image alt='Logo' fill src='/logo.png' />
      </div>
      <p className='text-sm text-muted-foreground'>让我好好想想...</p>
    </div>
  )
}
