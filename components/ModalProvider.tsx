"use client"

import { useEffect, useState } from "react"
import SignInModal from "./modals/SignInModal"
import AccountLinkModal from "./modals/AccountLinkModal"

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <SignInModal />
      <AccountLinkModal />
    </>
  )
}

export default ModalProvider
