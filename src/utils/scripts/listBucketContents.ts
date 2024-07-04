import { ListObjectsV2Command } from "@aws-sdk/client-s3"
import s3 from "../awsConfig"

const bucketName = "ouros"

async function listBucketContents() {
  const params = {
    Bucket: bucketName,
  }

  try {
    const command = new ListObjectsV2Command(params)
    const data = await s3.send(command)
    console.log("Bucket Contents:", data.Contents)
  } catch (err) {
    console.error("Error listing bucket contents:", err)
  }
}

listBucketContents()
