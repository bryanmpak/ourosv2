import Link from "next/link"
import { useRouter } from "next/router"
import { Icons } from "./Icons"
import React from "react"

export default function Navbar() {
  const router = useRouter()
  const navLinks = ["home", "timer", "mail", "write"]
  const navEl = navLinks.map((link, i) => {
    const linkName = link === "home" ? "/" : `/${link}`

    return (
      // <button key={i}>
      <Link
        key={i}
        href={linkName}
        className='flex flex-col justify-center w-10 h-10 bg-dark border-2 border-neutral rounded-2xl items-center md:hover:-translate-y-2 active:-translate-y-4 md:active:translate-y-0 duration-300 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text focus-visible:ring-offset-1'
      >
        {React.createElement(Icons[link])}
        {router.pathname === linkName && (
          <div className='w-[3px] h-[3px] rounded-full bg-light mt-[1px]'></div>
        )}
      </Link>
      // </button>
    )
  })

  return (
    <nav className='flex h-[60px] justify-evenly items-center m-auto rounded-2xl bg-nav_bg border-2 border-neutral'>
      {navEl}
    </nav>
  )
}
