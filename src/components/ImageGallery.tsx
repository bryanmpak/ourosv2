"use client"

import Image from "next/image"
import { useUser } from "@clerk/nextjs"

type ImageGalleryProps = {
  photoUrls: string[]
}

export default function ImageGallery({ photoUrls }: ImageGalleryProps) {
  const imgEl = photoUrls.map((photo, i) => (
    <div
      key={i}
      className={`${i === 0 || i === 4 ? "col-span-2" : "col-span-1"} ${
        i === 0 ? "row-span-2 h-[calc(250px - 1rem)]" : "row-span-1 h-[125px]"
      } rounded-md border border-white/10 bg-white/5 backdrop-blur-xl relative`}
    >
      <Image
        className='rounded-md'
        style={{ objectFit: "cover" }}
        src={photo}
        alt={`${i}`}
        fill
        priority
        sizes='50vw'
      />
    </div>
  ))

  return (
    <div className='grid grid-cols-[2fr_1fr_2fr] grid-rows-2 gap-1'>
      {imgEl}
    </div>
  )
}
