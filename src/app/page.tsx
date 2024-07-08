import { getPhotos } from "./actions/photos"
import { getInitialUser } from "./actions/getInitialUser"
import HomeClient from "../components/HomeClient"

export default async function Home() {
  const userName = await getInitialUser()

  // FIREBASE: add a prisma call server action to pass down image gallery
  // let photoUrls = await getPhotosFirebase()

  // AWS S3:
  let photoUrls =
    userName === "Guest"
      ? ["Photo", "Gallery", "For", "Logged-In", "Users :)"]
      : await getPhotos()

  return (
    <>
      <HomeClient initialUser={userName} photoUrls={photoUrls} />
      
    </>
  )
}
