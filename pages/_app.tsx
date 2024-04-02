import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { UserContext } from "../components/UserContext"
import { Toaster } from "../components/Toast/Toaster"
import Head from "next/head"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContext>
      <Layout>
        <Head>
          <title>ourOS ❤️</title>{" "}
          <meta
            name='description'
            content='A digital collection specially for us.'
          />
          <link rel='shortcut icon' href='/favicon.ico' />
        </Head>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </UserContext>
  )
}
