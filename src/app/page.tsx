import { getPhotos } from "./actions/photos"
import HomeClient from "../components/HomeClient"
import { getUserFirstName } from "./actions/user"

export default async function Home() {
  const userFirstName = await getUserFirstName()

  // FIREBASE: add a prisma call server action to pass down image gallery
  // let photoUrls = await getPhotosFirebase()

  // AWS S3:
  let photoUrls =
  userFirstName === "Guest"
    // "Photo", "Gallery", "For", "Logged-In", "Users :)"
      ? []
      : await getPhotos()

  return (
    <>
      <HomeClient userFirstName={userFirstName} photoUrls={photoUrls} />
    </>
  )
}
