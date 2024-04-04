import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { UserContext } from "../components/UserContext"
import Head from "next/head"
import { Toaster } from "sonner"
import { ClerkProvider } from "@clerk/nextjs"

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
        <ClerkProvider>
          <Component {...pageProps} />
        </ClerkProvider>
        <Toaster
          toastOptions={{
            unstyled: true,
            // TODO: change this to look good
            classNames: {
              error: "bg-red-400",
              success: "text-green-400",
              warning: "text-yellow-400",
              info: "bg-blue-400",
            },
          }}
        />
      </Layout>
    </UserContext>
  )
}
