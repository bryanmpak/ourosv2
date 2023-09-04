import { ref, getDownloadURL, listAll } from "firebase/storage"
import { storage } from "../utils/firebaseConfig"
import { useContext, useEffect, useState } from "react"
import Image from "next/image"
import { Context } from "./UserContext"

export default function ImageGallery() {
  const { user } = useContext(Context)
  const [photoUrl, setPhotoUrl] = useState([])

  const guestArr = ["Photo", "Gallery", "For", "Logged-In", "Users :)"]

  useEffect(() => {
    if (user === "pak" || user === "mar") {
      const photosRef = ref(storage, "photos/")
      listAll(photosRef)
        .then((res) => {
          const promises = res.items.map((itemRef) => getDownloadURL(itemRef))
          return Promise.all(promises)
        })
        .then((urlsArray) => {
          const shuffledArr = urlsArray.sort((a, b) => 0.5 - Math.random())
          const slicedArr = shuffledArr.slice(0, 5)
          setPhotoUrl(slicedArr)
        })
    } else {
    }
  }, [])

  const imgEl = photoUrl.map((photo, i) => (
    <div
      key={i}
      className={`${i === 0 || i === 4 ? "col-span-2" : "col-span-1"} ${
        i === 0 ? "row-span-2 h-[calc(250px - 1rem)]" : "row-span-1 h-[125px]"
      } rounded-md border border-white/10 bg-white/5 backdrop-blur-xl relative`}
    >
      <Image
        className="rounded-md"
        style={{ objectFit: "cover" }}
        src={photo}
        alt={`${i}`}
        fill
        priority
        sizes="50vw"
      />
    </div>
  ))

  const guestEl = guestArr.map((el, i) => (
    <div
      key={i}
      className={`${i === 0 || i === 4 ? "col-span-2" : "col-span-1"} ${
        i === 0
          ? "row-span-2 h-[calc(250px - 1rem)]"
          : "row-span-1 h-[100px] xs:h-[125px]"
      } rounded-md border border-white/10 bg-white/5 backdrop-blur-xl flex justify-center items-center`}
    >
      <p className="text-text font-sans text-xl">{el}</p>
    </div>
  ))

  const displayEl = user === "pak" || user === "mar" ? imgEl : guestEl

  return (
    <div className="grid grid-cols-[2fr_1fr_2fr] grid-rows-2 gap-1">
      {displayEl}
    </div>
  )
}
