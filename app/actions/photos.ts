import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../../utils/awsConfig";
import { getRandomSubset } from "../../utils/getRandomSubset";

const bucketName = "ouros";

export async function getPhotos() {
  console.log("Starting getPhotos function");
  const params = {
    Bucket: bucketName,
  };

  try {
    console.log("Sending ListObjectsV2Command");
    const command = new ListObjectsV2Command(params);
    const data = await s3.send(command);

    if (!data.Contents) {
      console.log("No contents in bucket");
      return [];
    }

    console.log(`Found ${data.Contents.length} objects in bucket`);

    const urlsArray = await Promise.all(
      data.Contents.map(async (item) => {
        if (!item.Key) return "";
        console.log(`Generating signed URL for ${item.Key}`);
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: item.Key,
        });
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        return url;
      })
    );

    const randomFive = getRandomSubset(
      urlsArray.filter((url) => url !== ""),
      5
    );
    console.log(`Returning ${randomFive.length} random URLs`);
    return randomFive;
  } catch (err) {
    console.error("Error in getPhotos:", err);
    if (err instanceof Error) {
      console.error("Error name:", err.name);
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);
    }
    return [];
  }
}
