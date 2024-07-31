import { getDownloadURL, listAll, ref } from "firebase/storage"
import { storage } from "../../utils/firebaseConfig"
import { getRandomSubset } from "../../utils/getRandomSubset"

export const getPhotosFirebase = async () => {
  const photosRef = ref(storage, "photos/")
  try {
    const res = await listAll(photosRef)
    const urlsArray = await Promise.all(
      res.items.map((itemRef) => getDownloadURL(itemRef))
    )
    const randomFive = getRandomSubset(urlsArray, 5)
    console.log("randomFive", randomFive)
    return randomFive
  } catch (error) {
    console.error("Error fetching photos:", error)
    return []
  }
}
