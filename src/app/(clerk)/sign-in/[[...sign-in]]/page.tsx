"use client"

import * as Clerk from "@clerk/elements/common"
import * as SignIn from "@clerk/elements/sign-in"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useRouter } from "next/navigation"
import SignInModal from "../../../../components/modals/SignInModal"

export default function SignInPage() {
  const router = useRouter()
  const { resolvedTheme } = useTheme()

  return <SignInModal />
}
