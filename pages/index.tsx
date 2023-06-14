import Countdown from "../components/Countdown"
import DailyQuote from "../components/DailyQuote"
import ImageGallery from "../components/ImageGallery"

export default function Home() {
  return (
    <>
      {/* later: refactor the whole thing to be a bit more productive */}
      <Countdown />
      <DailyQuote />
      <ImageGallery />
    </>
  )
}
