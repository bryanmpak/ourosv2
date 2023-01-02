import Countdown from "../components/Countdown"
import { ref, getDownloadURL, listAll } from "firebase/storage"
import { storage } from "../firebaseConfig"
import { useEffect, useState } from "react"

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

  // ttd:
  // in map, index=1 & 8 = grid_column = 2, grid_row = 2

  const imgEl = photoUrl.map((photo, i) => (
    <div
      key={i}
      className=" bg-gradient-to-l from-[#f7ba2b] to-[#ea5358] shadow-glassmorphism shadow-[#f7ba2b]/[.7] backdrop-blur-l rounded-lg p-[2px] md:p-1"
    >
      <div className="flex items-center bg-black h-full w-full rounded-md p-1">
        <img
          className="h-full w-full object-contain rounded-md"
          src={photo}
          alt={i}
        />
      </div>
    </div>
  ))

  return (
    <>
      <Countdown />
      <div className="mt-6 grid grid-cols-3 grid-rows-2 gap-1">{imgEl}</div>
    </>
  )
}
