import { SignIn, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import Countdown from "../components/Countdown"
import ImageGallery from "../components/ImageGallery"
import SignInPage from "./(clerk)/sign-in/[[...sign-in]]/page"

export default async function Home() {
  return (
    <>
      <SignedOut>
        <SignInPage />
      </SignedOut>
      <SignedIn>
        <Countdown />
        {/* <DailyQuote /> */}
        <ImageGallery />
        <SignOutButton />
      </SignedIn>
    </>
  )
}
