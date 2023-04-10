/* eslint-disable @next/next/no-img-element */
import { Container } from "@/components/common/index";
import Image from "next/image";
export function Men() {
  const content = [
    {
      image: "men.jpg",
      title: "CASUALS",
      href: "/shoes-for-men",
    },
    {
      image: "men.jpg",
      title: "DRESS",
      href: "/shoes-for-men",
    },
    {
      image: "men.jpg",
      title: "SPORTS",
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
              className="relative w-full md:py-[28px] flex flex-col items-center"
            >
              <Image
                src={`/images/type/${item.image}`}
                alt=""
                className="w-64 h-64 xl:w-96 xl:h-96 object-cover"
                layout="intrinsic"
                width={380}
                height={380}
              />
              <div className="absolute top-16 flex flex-col items-center">
                <p className="xl:text-center text-xl xl:text-4xl font-normal text-white font-Rokkitt h-[70px]">
                  {item.title}
                </p>
                <button className="text-sm py-[18px] px-9 hover:bg-primary text-white md:text-base rounded-[30px] bg-secondary cursor-pointer ">
                  <a href="#">Shop now</a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
