import Countdown from "../components/Countdown"
import DailyQuote from "../components/DailyQuote"
import ImageGallery from "../components/ImageGallery"
import { SignIn, SignOutButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"

export default async function Home() {
  const user = await currentUser()
  if (!user) {
    return <SignIn routing='hash' />
  }
  return (
    <>
      <Countdown />
      {/* <DailyQuote /> */}
      <ImageGallery />
      <SignOutButton />
    </>
  )
}
