import ThemeToggle from "./ThemeToggle"

export default function Header() {
  const DATE = new Date()

  return (
    <div className='flex gap-6 md:gap-12 px-2 xs:py-2'>
      <div className='text-5xl tracking-tighter text-title font-bold'>
        <p>our</p>
        <p className='leading-10'>OS</p>
      </div>
      <div className='w-full h-4 border-t mt-7'></div>
      <div className='mt-3'>
        <ThemeToggle />
        <div className='mt-1 ml-1 text-xl leading-5 tracking-tighter text-title'>
          {DATE && (
            <>
              <p>{DATE.getFullYear()}</p>
              <p>{DATE.getMonth()}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
