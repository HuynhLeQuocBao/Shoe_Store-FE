/* eslint-disable @next/next/no-img-element */
import { Container } from "@/components/common/index";

export function PartnerImage({ images = [] }) {
  return (
    <div className="items-center text-center inline-flex flex-col">
      <div className="flex flex-row flex-wrap items-center justify-center xl:flex-nowrap space-8">
        {images.map((image) => (
          <div
            key={image}
            className="w-[204px] h-[130px] relative flex items-center justify-center"
          >
            <img src={`/images/brand/${image}`} alt="" className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Partner() {
  const images = [
    {
      images: [
        "brand-1.jpg",
        "brand-4.jpg",
        "brand-3.jpg",
        "brand-5.jpg",
        "brand-2.jpg",
      ],
    },
  ];

  return (
    <Container>
      <div className="py-10">
        <div className="text-xl pb-20 text-center text-[#0000004D] font-Rokkitt font-semibold">
          <p>TRUSTED PARTNERS</p>
        </div>
        <div className="flex items-center justify-center md:flex-col">
          {images.map((image, index) => (
            <PartnerImage key={index} images={image.images} />
          ))}
        </div>
      </div>
    </Container>
  );
}
