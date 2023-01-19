import React, { useEffect, useState } from "react"
import { useTypewriter, Cursor } from "react-simple-typewriter"

interface QuoteState {
  text: string
  author?: string
}

export default function DailyQuote() {
  const [dailyQuote, setDailyQuote] = useState<QuoteState>({
    text: "",
    author: "",
  })

  const [text] = useTypewriter({
    words: ["dailyQuote.text"],
    delaySpeed: 2000,
  })

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        const quoteArr = data
        const randomQuote =
          quoteArr[Math.floor(Math.random() * quoteArr.length)]
        setDailyQuote(randomQuote)
      })
  }, [])

  return (
    <div className="mt-6 font-sans text-text text-sm w-4/5 flex-row m-auto h-[60px]">
      <span>
        <em>{text}</em>
      </span>
      <Cursor cursorColor="red" />
    </div>
  )
}
