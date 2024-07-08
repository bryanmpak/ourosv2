"use client"

import { useEffect } from "react"
import { useUserStore } from "../hooks/useUserStore"
import Countdown from "./Countdown"
import ImageGallery from "./ImageGallery"

type HomeClientProps = {
  initialUser: string
  photoUrls: string[]
}

const HomeClient = ({ initialUser, photoUrls }: HomeClientProps) => {
  const userStore = useUserStore()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      userStore.setUser(initialUser)
      localStorage.setItem("user", initialUser)
    } else {
      userStore.setUser(storedUser)
    }
  }, [userStore, initialUser])

  return (
    <>
      <Countdown />
      {/* <DailyQuote /> */}
      <ImageGallery photoUrls={photoUrls} />
    </>
  )
}

export default HomeClient
