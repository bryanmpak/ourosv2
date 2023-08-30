import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { UserContext } from "../components/UserContext"
import { Toaster } from "../components/Toast/Toaster"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </UserContext>
  )
}
