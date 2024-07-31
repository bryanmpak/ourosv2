import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import s3 from "../../utils/awsConfig"
import { getRandomSubset } from "../../utils/getRandomSubset"

const bucketName = "ouros"

export async function getPhotos() {
  const params = {
    Bucket: bucketName,
  }

  try {
    const command = new ListObjectsV2Command(params)
    const data = await s3.send(command)

    if (!data.Contents) {
      console.log("No contents in bucket")
      return []
    }

    const urlsArray = await Promise.all(
      data.Contents.map(async (item) => {
        if (!item.Key) return "" // If there is no key, return an empty string
        const url = await getSignedUrl(
          s3,
          new GetObjectCommand({
            Bucket: bucketName,
            Key: item.Key,
          }),
          { expiresIn: 3600 } // URL expires in 1 hour
        )
        return url
      })
    )
    const randomFive = getRandomSubset(
      urlsArray.filter((url) => url !== ""),
      5
    ) // Filter out empty strings
    return randomFive
  } catch (err) {
    console.error("Error listing bucket contents:", err)
    return []
  }
}
