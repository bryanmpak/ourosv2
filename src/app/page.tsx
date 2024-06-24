import { SignIn, SignOutButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import Countdown from "../components/Countdown"
import ImageGallery from "../components/ImageGallery"

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
