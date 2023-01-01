import Countdown from "../components/Countdown"
import { ref, getDownloadURL, listAll } from "firebase/storage"
import { storage } from "../firebaseConfig"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function Home() {
  const photosRef = ref(storage, "photos/")
  const [photoUrl, setPhotoUrl] = useState<any>([])

  useEffect(() => {
    listAll(photosRef)
      .then((res) => {
        const promises = res.items.map((itemRef) => getDownloadURL(itemRef))
        return Promise.all(promises)
      })
      .then((urlsArray) => {
        const shuffledArr = urlsArray.sort((a, b) => 0.5 - Math.random())
        const slicedArr = shuffledArr.slice(0, 6)
        setPhotoUrl(slicedArr)
      })
  }, [])

  // create a 4x4 grid
  // in map, index=1 & 8 = grid_column = 2, grid_row = 2

  const imgEl = photoUrl.map((photo, i) => (
    <div
      key={i}
      className="flex items-center bg-nav_bg border-2 border-neutral shadow-glassmorphism backdrop-blur-sm rounded-lg p-1"
    >
      <img className="object-cover" src={photo} alt={i} />
    </div>
  ))

  return (
    <>
      <Countdown />
      <div className="mt-6 grid grid-cols-3 grid-rows-2 gap-1 h-[80%]">
        {imgEl}
      </div>
    </>
  )
}
