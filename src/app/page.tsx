import Countdown from "../components/Countdown"
import ImageGallery from "../components/ImageGallery"
import SignInPage from "./(clerk)/sign-in/[[...sign-in]]/page"
import { currentUser } from "@clerk/nextjs/server"

export default async function Home() {
  const user = await currentUser()
  if (!user) {
    return <SignInPage />
  }

  return (
    <>
      <Countdown />
      {/* <DailyQuote /> */}
      <ImageGallery />
    </>
  )
}
