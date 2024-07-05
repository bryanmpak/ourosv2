"use client"

import * as Clerk from "@clerk/elements/common"
import * as SignIn from "@clerk/elements/sign-in"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useRouter } from "next/navigation"

// TODO: need to check all colors
export default function SignInPage() {
  const router = useRouter()
  const { resolvedTheme } = useTheme()

  return (
    <div className='w-full flex flex-grow items-center sm:px-2 px-0 justify-center mt-12'>
      <div className='w-96 flex flex-col space-y-4 justify-center rounded-2xl bg-nav_bg border-2 border-neutral bg-[radial-gradient(circle_at_50%_0%,var(--color-nav_bg),var(--color-nav_bg))] py-10 px-8'>
        <SignIn.Root>
          <SignIn.Step name='start' className='w-full flex-grow space-y-4'>
            <header className='flex flex-col items-center'>
              {resolvedTheme === "dark" ? (
                <Image
                  src={"/logo_dark.svg"}
                  alt='favicon'
                  width={40}
                  height={40}
                />
              ) : (
                <Image
                  src={"/favicon.ico"}
                  alt='favicon'
                  width={40}
                  height={40}
                />
              )}
              <h1 className='mt-4 text-xl font-bold tracking-tight text-text'>
                Sign in to ourOS
              </h1>
            </header>
            <Clerk.GlobalError className='block text-sm text-red-400' />
            <div className='space-y-2'>
              <Clerk.Connection
                name='google'
                className='flex w-full items-center justify-center gap-x-3 rounded-md px-3.5 py-1.5 font-medium text-text bg-dark border border-title ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text focus-visible:ring-offset-1 hover:bg-neutral'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 17 16'
                  className='w-4'
                  aria-hidden
                >
                  <path
                    fill='currentColor'
                    d='M8.82 7.28v2.187h5.227c-.16 1.226-.57 2.124-1.192 2.755-.764.765-1.955 1.6-4.035 1.6-3.218 0-5.733-2.595-5.733-5.813 0-3.218 2.515-5.814 5.733-5.814 1.733 0 3.005.685 3.938 1.565l1.538-1.538C12.998.96 11.256 0 8.82 0 4.41 0 .705 3.591.705 8s3.706 8 8.115 8c2.382 0 4.178-.782 5.582-2.24 1.44-1.44 1.893-3.475 1.893-5.111 0-.507-.035-.978-.115-1.369H8.82Z'
                  />
                </svg>
                Login with Google
              </Clerk.Connection>
            </div>
          </SignIn.Step>
        </SignIn.Root>
        {/* TODO: change so mounting occurs at the same time */}
        <button
          // TODO: add something where its clear that "user" = "Guest"
          onClick={() => router.push("/")}
          className='text-text text-sm decoration-title/20 underline-offset-4 outline-none hover:underline focus-visible:underline'
        >
          Continue as Guest
        </button>
      </div>
    </div>
  )
}
