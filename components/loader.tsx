import Image from "next/image"

export function Loader() {
  return (
    <div className='h-full flex flex-col gap-y-4 items-center justify-center'>
      <div className='w-10 h-10 relative animate-spin'>
        <Image
          alt='Logo'
          fill
          src='/logo.png'
          sizes='(max-width: 256px) 10vw, (max-width: 256px) 10vw, 10vw'
        />
      </div>
      <p className='text-sm text-muted-foreground'>让我好好想想...</p>
    </div>
  )
}
