"use client"

import Link from "next/link"
import { Icons } from "./Icons"
import React from "react"
import { usePathname } from "next/navigation"
import { User } from "@prisma/client"
import { useSignInStore } from "../hooks/useSignInStore"
import { useAccountLinkStore } from "../hooks/useAccountLinkStore"

type NavbarProps = { user: User | null }

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  const navLinks = ["home", "pomodoro", "mail", "write", "habits", "momentos"]
  const signIn = useSignInStore()
  const accountLink = useAccountLinkStore()

  const navEl = navLinks.map((link, i) => {
    const linkName = link === "home" ? "/" : `/${link}`
    return (
      <Link
        key={i}
        href={linkName}
        className='flex flex-col justify-center w-10 h-10 bg-dark border-2 border-neutral rounded-2xl items-center md:hover:-translate-y-2 active:-translate-y-4 md:active:translate-y-0 duration-300 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text focus-visible:ring-offset-1'
      >
        {React.createElement(Icons[link])}
        {pathname === linkName && (
          <div className='w-[3px] h-[3px] rounded-full bg-title mt-[1px]'></div>
        )}
      </Link>
    )
  })

  const authModalButtons = (
    <>
      {!user && (
        // sign-in modal button
        <button
          onClick={signIn.onOpen}
          className='flex flex-col justify-center w-10 h-10 bg-dark border-2 border-neutral rounded-2xl items-center md:hover:-translate-y-2 active:-translate-y-4 md:active:translate-y-0 duration-300 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text focus-visible:ring-offset-1'
        >
          {React.createElement(Icons["signIn"])}
        </button>
      )}
      {user && !user.isAccountLinked && (
        <button
          onClick={accountLink.onOpen}
          className='flex flex-col justify-center w-10 h-10 bg-dark border-2 border-neutral rounded-2xl items-center md:hover:-translate-y-2 active:-translate-y-4 md:active:translate-y-0 duration-300 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text focus-visible:ring-offset-1'
        >
          {React.createElement(Icons["link"])}
        </button>
      )}
    </>
  )

  return (
    <nav className='flex h-[60px] justify-evenly items-center m-auto rounded-2xl bg-nav_bg border-2 border-neutral'>
      {navEl}
      <div className='w-[1px] h-10 bg-neutral mx-2'></div>
      {authModalButtons}
    </nav>
  )
}
