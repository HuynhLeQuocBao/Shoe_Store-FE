import Slider from "react-slick";
import { Container } from "@/components/common/index";
import Image from "next/image";

export function Partner() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const images = [
    "brand-1.jpg",
    "brand-2.jpg",
    "brand-3.jpg",
    "brand-4.jpg",
    "brand-5.jpg",
    "brand-6.png",
    "brand-7.png",
  ];

  return (
    <Container>
      <div className="py-14 overflow-x-hidden ">
        <div className="text-xl pb-10 text-center text-[#0000004D] font-Rokkitt font-semibold">
          <p>TRUSTED PARTNERS</p>
        </div>
        {/* <div className="flex flex-col items-center justify-center md:flex-row"> */}
        <Slider {...settings}>
          {images.map((image, index) => (
            <div
              key={index}
              className="w-[204px] h-[130px] relative flex items-center justify-center"
            >
              <Image
                src={`/images/brand/${image}`}
                alt={image}
                className="w-full"
                layout="intrinsic"
                width={200}
                height={120}
              />
            </div>
          ))}
        </Slider>
        {/* </div> */}
      </div>
    </Container>
  );
}
