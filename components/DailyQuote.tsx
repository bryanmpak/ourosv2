import React from "react"
import useSWR from "swr"
import { Typewriter } from "react-simple-typewriter"

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function DailyQuote() {
  const { data, error } = useSWR("https://api.quotable.io/random", fetcher)

  if (error)
    return (
      <div className="mt-4 font-sans text-text text-xs md:text-sm w-4/5 flex-row m-auto h-[60px]">
        Failed to load quotes.
      </div>
    )
  if (!data)
    return (
      <div className="mt-4 font-sans text-text text-xs md:text-sm w-4/5 flex-row m-auto h-[60px]">
        Loading...
      </div>
    )

  const quote = data.content

  return (
    <div className="my-4 font-sans text-text text-xs md:text-sm w-4/5 flex-row m-auto h-[60px]">
      <em>
        <Typewriter words={[quote]} cursor cursorColor="red" />
      </em>
    </div>
  )
}
