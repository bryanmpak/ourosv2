import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { Metadata } from "next"
import { Kumbh_Sans } from "next/font/google"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import "../styles/globals.css"

export const metadata: Metadata = {
  title: "ourOS ❤️",
  description: "a digital collection specially for us.",
}

const kumbhsans = Kumbh_Sans({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  const toggleBg =
    (!user || user.firstName) === "Mari"
      ? "bg-gradient-to-t from-rose-200 via-rose-200 to-rose-300"
      : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-black"

  const toggleTheme =
    (!user || user.firstName) === "Mari" ? "theme-mar" : "theme-pak"

  return (
    <ClerkProvider>
      <html lang='en' className={kumbhsans.className}>
        <body>
          <div className={`${toggleBg} ${toggleTheme} min-h-full`}>
            <div
              className={`max-w-xl flex flex-col h-[90vh] xs:h-screen mx-auto`}
            >
              <Header />
              <main className='flex-grow px-6'>{children}</main>
              <div className='mt-auto px-2 py-4'>
                <Navbar />
              </div>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
