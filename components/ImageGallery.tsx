"use client";

import Image from "next/image";

type ImageGalleryProps = {
  photoUrls: string[];
  userFirstName: string;
};

export default function ImageGallery({
  userFirstName,
  photoUrls,
}: ImageGalleryProps) {
  /*
  TODO: 
    image gallery:
    - cache images to rotate every refresh or set time

    add subdomain for momentos
  */

  console.log("Attempting to render image gallery", photoUrls);

  const imgEl = photoUrls.map((photo, i) => (
    <div
      key={i}
      className={`${i === 0 || i === 4 ? "col-span-2" : "col-span-1"} ${
        i === 0
          ? "row-span-2 h-[calc(250px - 1rem)] md:h-[calc(300px - 1rem)] lg:h-[calc(400px - 1rem)]"
          : "row-span-1 h-[125px] md:h-[150px] lg:h-[200px]"
      } rounded-md border border-white/10 bg-white/5 backdrop-blur-xl relative`}
    >
      {userFirstName === "Guest" ? (
        // TODO: add placeholder imgs
        <div></div>
      ) : (
        <Image
          className="rounded-md"
          style={{ objectFit: "cover" }}
          src={photo}
          alt={`${i}`}
          fill
          priority
          sizes="50vw"
        />
      )}
    </div>
  ));

  return (
    <div className="grid grid-cols-[2fr_1fr_2fr] grid-rows-2 gap-1 mt-12">
      {imgEl}
    </div>
  );
}
