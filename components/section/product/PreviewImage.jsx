import FsLightbox from "fslightbox-react";
import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const PreviewImage = ({ arrayImage, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sources, setSource] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/uploadWithRefactorDB/";

  useEffect(() => {
    const filterImage = arrayImage.filter(
      (image) => image !== arrayImage[index]
    );
    setSource([
      BASE_URL + arrayImage[index],
      ...filterImage.map((img) => BASE_URL + img),
    ]);
  }, [arrayImage]);

  return (
    <>
      <Image
        className="w-full h-full object-cover cursor-zoom-in hover:opacity-70"
        src={BASE_URL + arrayImage[index]}
        alt={arrayImage[index]}
        width={350}
        height={350}
        onClick={() => setIsOpen(!isOpen)}
        priority={true}
        blurDataURL={BASE_URL + arrayImage[index]}
        placeholder="blur"
      />
      <FsLightbox
        toggler={isOpen}
        sources={sources}
        openOnSlide={currentSlide}
        // onClose={() => console.log(sources)}
      />
    </>
  );
};

export default PreviewImage;
