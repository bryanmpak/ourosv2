import { getRandomSignedUrls } from "./actions/photos";
import HomeClient from "../components/HomeClient";
import { getUserFirstName } from "./actions/user";

export const dynamic = "force-dynamic";

export default async function Home() {
  const userFirstName = await getUserFirstName();

  // AWS S3:
  let photoUrls =
    userFirstName === "Bryan" || userFirstName === "Mari"
      ? await getRandomSignedUrls(5)
      : [];

  return (
    <>
      <HomeClient userFirstName={userFirstName} photoUrls={photoUrls} />
    </>
  );
}
