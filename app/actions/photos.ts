import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../../utils/awsConfig";
import { unstable_cache } from "next/cache";

const bucketName = "ouros";

const getAllSignedUrls = unstable_cache(
  async () => {
    const command = new ListObjectsV2Command({ Bucket: bucketName });
    const data = await s3.send(command);

    if (!data.Contents) {
      console.log("No contents in bucket");
      return [];
    }

    const signedUrls = await Promise.all(
      data.Contents.map(async (item) => {
        if (!item.Key) return null;
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: item.Key,
        });
        return getSignedUrl(s3, command, { expiresIn: 3600 });
      })
    );

    return signedUrls.filter(Boolean) as string[];
  },
  ["s3-objects-full"],
  { revalidate: 3600, tags: ["s3-objects"] }
);

export async function getRandomSignedUrls(count: number = 5) {
  const allUrls = await getAllSignedUrls();

  // Shuffle array
  const shuffled = allUrls.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  return shuffled.slice(0, count);
}
