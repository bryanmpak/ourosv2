import Countdown from "../components/Countdown"
import DailyQuote from "../components/DailyQuote"
import ImageGallery from "../components/ImageGallery"
import SignIn from "../components/SignIn"
import { currentUser, useUser } from "@clerk/nextjs"

export default async function Home() {
  const user = await currentUser()

  if (!user) {
    return <SignIn />
  }

  return (
    <>
      <Countdown />
      {/* <DailyQuote /> */}
      <ImageGallery />
    </>
  )
}
