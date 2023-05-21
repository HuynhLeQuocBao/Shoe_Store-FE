/* eslint-disable @next/next/no-img-element */
import { Container } from "@/components/common/index";
import Image from "next/image";
import Link from "next/link";
export function Women() {
  const content = [
    {
      image: "women.jpg",
      title: "CASUALS",
      href: "/shoes-for-men",
    },
    {
      image: "sneaker.jpg",
      title: "SNEAKER",
      href: "/shoes-for-men",
    },
    {
      image: "sandals.jpg",
      title: "SANDALS",
      href: "/shoes-for-men",
    },
  ];
  return (
    <Container>
      <div className="mx-4 md:mx-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.map((item, index) => (
            <div
              key={index}
              className="relative w-full flex flex-col items-center banner h-auto md:my-[28px]"
            >
              <Image
                src={`/images/type/${item.image}`}
                alt=""
                className="w-64 h-64 xl:w-96 xl:h-96 object-cover"
                layout="intrinsic"
                width={380}
                height={380}
              />
              <div className="absolute top-[50%] -translate-y-[50%] flex flex-col items-center justify-between z-10">
                <p className="xl:text-center text-xl xl:text-4xl font-normal text-white font-Rokkitt h-[70px]">
                  {item.title}
                </p>
                <a href="#gender-product">
                  <button className="font-bold text-sm py-[18px] px-9 hover:bg-teal-600 hover:text-white md:text-base rounded-[30px] bg-primary text-black cursor-pointer">
                    Shop now
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
