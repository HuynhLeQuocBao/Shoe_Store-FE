import FsLightbox from "fslightbox-react";
import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const PreviewImage = ({ data, arrayImage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sources, setSource] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/upload/";

  useEffect(() => {
    setSource([
      BASE_URL + data?.filename,
      ...arrayImage.map((img) => BASE_URL + img?.filename),
    ]);
  }, []);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Image
        className="w-full h-full object-cover cursor-zoom-in hover:opacity-70"
        src={BASE_URL + data?.filename}
        alt="product details"
        width={350}
        height={350}
        onClick={() => setIsOpen(!isOpen)}
      />
      <FsLightbox
        toggler={isOpen}
        sources={sources}
        openOnSlide={currentSlide}
        // onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default PreviewImage;
