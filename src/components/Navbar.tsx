"use client"

import Link from "next/link"
import { Icons } from "./Icons"
import React from "react"
import { usePathname } from "next/navigation"
import { User } from "@prisma/client"

type NavbarProps = { user: User | null }

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  let navLinks = ["home", "pomodoro", "mail", "write", "habits", "momentos"]

  if (!user || !user.isAccountLinked) {
    navLinks.push("link")
  }

  const navEl = navLinks.map((link, i) => {
    const linkName = link === "home" ? "/" : `/${link}`
    return (
      <React.Fragment key={i}>
        {link === "link" && (
          <div className='w-[1px] h-10 bg-neutral mx-2'></div>
        )}
        <Link
          href={linkName}
          className='flex flex-col justify-center w-10 h-10 bg-dark border-2 border-neutral rounded-2xl items-center md:hover:-translate-y-2 active:-translate-y-4 md:active:translate-y-0 duration-300 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text focus-visible:ring-offset-1'
        >
          {React.createElement(Icons[link])}
          {pathname === linkName && (
            <div className='w-[3px] h-[3px] rounded-full bg-title mt-[1px]'></div>
          )}
        </Link>
      </React.Fragment>
    )
  })

  return (
    <nav className='flex h-[60px] justify-evenly items-center m-auto rounded-2xl bg-nav_bg border-2 border-neutral'>
      {navEl}
    </nav>
  )
}
