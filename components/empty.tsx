import Image from "next/image"

type EmptyProps = { label: string }

export function Empty({ label }: EmptyProps) {
  return (
    <div className='h-full p-20 flex flex-col items-center justify-center'>
      <div className='relative h-72 w-72'>
        <Image
          alt='Empty'
          fill
          src='/empty.png'
          sizes='(max-width: 512px) 50vw, (max-width: 256px) 33vw, 33vw'
        />
      </div>
      <p className='text-sm text-muted-foreground text-center'>{label}</p>
    </div>
  )
}
