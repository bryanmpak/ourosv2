"use client"

import { useState } from "react"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  const [date, setDate] = useState(new Date())

  return (
    <div className='flex gap-6 md:gap-12 px-2 xs:py-2'>
      <div className='text-5xl tracking-tighter text-title font-bold'>
        <p>our</p>
        <p className='leading-10'>OS</p>
      </div>
      <div className='w-full h-4 border-t mt-7'></div>
      <div className='mt-3'>
        <ThemeToggle />
        {/* <button
          disabled={!user}
          style={{ cursor: !user ? "not-allowed" : "pointer" }}
          className={
            "flex rounded-full p-[2px] bg-dark border-neutral border-2 w-[60px] h-[30px] items-center " +
            toggleCSS
          }
          onClick={() => toggleUser()}
        >
          <motion.div
            className='bg-neutral border-light border-2 w-[24px] h-[24px] rounded-full'
            layout
            transition={spring}
          />
        </button> */}
        <div className='mt-1 ml-1 text-xl leading-5 tracking-tighter text-title'>
          {date && (
            <>
              <p>{date.getFullYear()}</p>
              <p>{date.getMonth()}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const spring: {} = {
  type: "spring",
  stiffness: 700,
  damping: 30,
}
