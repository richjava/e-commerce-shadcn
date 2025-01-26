"use client";

import Image from "next/image";
import { urlForImage } from "@/lib/builtjs-utils";
import { useState } from "react";
import { widthForImage, heightForImage } from "@/lib/builtjs-utils";

interface iAppProps {
  images: any;
}

export default function ImageGallery({ images }: iAppProps) {
  const [bigImage, setBigImage] = useState(images[0]);

  const handleSmallImageClick = (image: any) => {
    setBigImage(image);
  };
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="flex order-last gap-4 lg:order-none lg:flex-col">
        {images.map((image: any, idx: any) => (
          <div key={idx} className="overflow-hidden bg-gray-100 rounded-lg">
            <Image
              src={image.url}
              width={widthForImage(image)}
              height={heightForImage(image)}
              alt="Photo"
              className="object-cover object-center w-full h-full cursor-pointer"
              onClick={() => handleSmallImageClick(image)}
              priority
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden bg-gray-100 rounded-lg lg:col-span-4">
        <Image
          src={bigImage.url}
          width={widthForImage(bigImage)}
          height={heightForImage(bigImage)}
          alt="Great Photo"
          className="object-cover object-center w-full h-full lg:h-full lg:w-full"
          priority
        />
        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
}
