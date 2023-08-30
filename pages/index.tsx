import Countdown from "../components/Countdown"
import DailyQuote from "../components/DailyQuote"
import ImageGallery from "../components/ImageGallery"
import SignIn from "../components/SignIn"
import { auth } from "../utils/firebaseConfig"

export default function Home() {
  console.log("Home Component Rendered")
  return (
    <>
      {/* later: refactor the whole thing to be a bit more productive */}
      <Countdown />
      <DailyQuote />
      <ImageGallery />
      <SignIn />
    </>
  )
}
