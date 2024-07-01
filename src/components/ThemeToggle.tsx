"use client"

import { KeyboardEvent, useEffect, useState } from "react"
import { Switch } from "@headlessui/react"
import { useTheme } from "next-themes"
import { cn } from "../utils/utils"
import { useUser } from "@clerk/nextjs"

const ThemeSwitchToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme, theme } = useTheme()
  const { user } = useUser()
  // const user = "Mari"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isMari = user?.firstName === "Mari"

  const getNextTheme = () => {
    if (isMari) {
      return theme === "light" ||
        (theme === "system" && resolvedTheme === "light")
        ? "mar"
        : "light"
    } else {
      return theme === "light" ||
        (theme === "system" && resolvedTheme === "light")
        ? "dark"
        : "light"
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      setTheme(getNextTheme())
    }
  }

  const handleChange = () => {
    setTheme(getNextTheme())
  }

  const isDarkMode =
    theme === "dark" || (theme === "system" && resolvedTheme === "dark")

  const isMariMode = theme === "mar"

  return (
    <Switch
      checked={isDarkMode || isMariMode}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className={cn(
        // isDarkMode || isMariMode ? "bg-indigo-600" : "bg-gray-200",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full bg-dark border-neutral border-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-neutral focus:ring-offset-2"
      )}
    >
      <span className='sr-only'>Toggle Theme</span>
      <span
        aria-hidden='true'
        className={cn(
          isDarkMode || isMariMode ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        )}
      />
    </Switch>
  )
}

export default ThemeSwitchToggle
