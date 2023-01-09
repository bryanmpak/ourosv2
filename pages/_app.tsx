import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { UserContext } from "../components/UserContext"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext>
  )
}
