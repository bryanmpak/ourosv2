import Countdown from "../components/Countdown"
import ImageGallery from "../components/ImageGallery"
import SignInPage from "./(clerk)/sign-in/[[...sign-in]]/page"
import { currentUser } from "@clerk/nextjs/server"
import { getPhotos } from "./actions/photos"

export default async function Home() {
  // create a separate login page (or use clerk's "elements" beta)
  // have a localStorage item getter, if no item, call db + push to localStorage, if no entry, "Guest"
  const user = await currentUser()
  if (!user) {
    return <SignInPage />
  }

  // FIREBASE: add a prisma call server action to pass down image gallery
  // let photoUrls = await getPhotosFirebase()

  // AWS S3:
  let photoUrls = await getPhotos()
  // console.log("photoUrls", photoUrls)
  if (photoUrls.length === 0) {
    photoUrls = ["Photo", "Gallery", "For", "Logged-In", "Users :)"]
  }

  return (
    <>
      <Countdown />
      {/* <DailyQuote /> */}
      <ImageGallery photoUrls={photoUrls} />
    </>
  )
}
