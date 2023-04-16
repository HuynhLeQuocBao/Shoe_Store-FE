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
      (image) => image?.filename !== arrayImage[index]?.filename
    );
    setSource([
      BASE_URL + arrayImage[index]?.filename,
      ...filterImage.map((img) => BASE_URL + img?.filename),
    ]);
  }, [arrayImage]);

  return (
    <>
      <Image
        className="w-full h-full object-cover cursor-zoom-in hover:opacity-70"
        src={BASE_URL + arrayImage[index]?.filename}
        alt="product details"
        width={350}
        height={350}
        onClick={() => setIsOpen(!isOpen)}
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
