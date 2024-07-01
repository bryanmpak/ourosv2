import { ClerkProvider } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { Metadata } from "next"
import { Kumbh_Sans } from "next/font/google"
import "./globals.css"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import { ThemeProvider } from "next-themes"

export const metadata: Metadata = {
  title: "ourOS ❤️",
  description: "a digital collection specially for us.",
}

const kumbhsans = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={kumbhsans.className}>
          <ThemeProvider
            // attribute='data-theme'
            defaultTheme='dark'
            enableSystem
            enableColorScheme
            storageKey='ouros-theme'
            themes={["light", "dark", "mar"]}
          >
            <div className='min-h-full'>
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
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
