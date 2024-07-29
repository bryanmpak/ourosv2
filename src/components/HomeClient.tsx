"use client";

import Countdown from "./Countdown";
import ImageGallery from "./ImageGallery";

type HomeClientProps = {
  userFirstName: string;
  photoUrls: string[];
};

const HomeClient = ({ userFirstName, photoUrls }: HomeClientProps) => {
  

  return (
    <>
      <Countdown />
      <ImageGallery userFirstName={userFirstName} photoUrls={photoUrls} />
    </>
  );
};

export default HomeClient;
