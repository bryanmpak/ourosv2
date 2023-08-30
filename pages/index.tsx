import { useContext } from "react"
import Countdown from "../components/Countdown"
import DailyQuote from "../components/DailyQuote"
import ImageGallery from "../components/ImageGallery"
import SignIn from "../components/SignIn"
import { auth } from "../utils/firebaseConfig"
import { Context } from "../components/UserContext"

export default function Home() {
  const { user } = useContext(Context)

  if (!user) {
    return <SignIn />
  }

  return (
    <>
      {(user === "pak" || user === "mar") && <Countdown />}
      <DailyQuote />
      <ImageGallery />
    </>
  )
}
