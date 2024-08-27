"use client";

import Image from "next/image";
import { useState } from "react";

type ImageGalleryProps = {
  photoUrls: string[];
  userFirstName: string;
};

export default function ImageGallery({
  userFirstName,
  photoUrls,
}: ImageGalleryProps) {
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
    new Array(photoUrls.length).fill(false)
  );

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const imgEl = photoUrls.map((photo, i) => (
    <div
      key={i}
      className={`${i === 0 || i === 4 ? "col-span-2" : "col-span-1"} ${
        i === 0
          ? "row-span-2 h-[calc(250px - 1rem)] md:h-[calc(300px - 1rem)] lg:h-[calc(400px - 1rem)]"
          : "row-span-1 h-[125px] md:h-[150px] lg:h-[200px]"
      } rounded-md border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden`}
    >
      {userFirstName === "Guest" ? (
        // TODO: add placeholder imgs
        <div></div>
      ) : (
        <>
          <div
            className={`absolute inset-0 bg-light animate-pulse ${
              imagesLoaded[i] ? "opacity-0" : "opacity-100"
            } transition-opacity duration-300`}
          />
          <Image
            className={`rounded-md transition-opacity duration-300 ${
              imagesLoaded[i] ? "opacity-100" : "opacity-0"
            }`}
            style={{ objectFit: "cover" }}
            src={photo}
            alt={`Image ${i + 1}`}
            fill
            priority={true}
            sizes={
              i === 0 || i === 4
                ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                : "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            }
            onLoad={() => handleImageLoad(i)}
          />
        </>
      )}
    </div>
  ));

  return (
    <div className="grid grid-cols-[2fr_1fr_2fr] grid-rows-2 gap-1 mt-12">
      {imgEl}
    </div>
  );
}
