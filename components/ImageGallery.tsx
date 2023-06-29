import { ref, getDownloadURL, listAll } from "firebase/storage"
import { storage } from "../firebaseConfig"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function ImageGallery() {
  const photosRef = ref(storage, "photos/")
  const [photoUrl, setPhotoUrl] = useState([])

  useEffect(() => {
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
  }, [])

  const imgEl = photoUrl.map((photo, i) => (
    <div
      key={i}
      className={`${i === 0 || i === 4 ? "col-span-2" : "col-span-1"} ${
        i === 0 ? "row-span-2 h-[250px]" : "row-span-1 h-[125px]"
      } rounded-md border border-white/10 bg-white/5 backdrop-blur-xl`}
    >
      <div className="flex items-center bg-black">
        <Image
          className="rounded-md"
          style={{ objectFit: "cover" }}
          src={photo}
          alt={`${i}`}
          fill
          priority
          sizes="(min-width: 300px) 50vw, 33vw"
        />
      </div>
    </div>
  ))
  console.log(imgEl)

  return (
    <div className="grid grid-cols-[2fr_1fr_2fr] grid-rows-2 gap-1">
      {imgEl}
    </div>
  )
}
