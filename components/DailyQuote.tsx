import React, { useEffect, useState } from "react"
import { Typewriter } from "react-simple-typewriter"
import { allQuotes } from "../data/quotes"

interface QuoteState {
  text: string
  author?: string
}

export default function DailyQuote() {
  const randomQuote = Math.floor(allQuotes.length * Math.random())
  const quote = allQuotes[randomQuote].text

  return (
    <div className="mt-4 font-sans text-text text-xs md:text-sm w-4/5 flex-row m-auto h-[60px]">
      <em>
        <Typewriter words={[quote]} cursor cursorColor="red" />
      </em>
    </div>
  )
}
