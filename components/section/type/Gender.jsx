/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
export function Gender() {
  const content = [
    {
      image: "men.jpg",
      title: "Shop Men's Collection",
      href: "/shoes-for-men",
    },
    {
      image: "women.jpg",
      title: "Shop Women's Collection",
      href: "/shoes-for-women",
    },
  ];
  return (
    <div className="mx-4 md:mx-0">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-around">
        {content.map((item, index) => (
          <Link key={index} href={item.href}>
            <div className="w-full px-[14px] py-[28px] cursor-pointer flex flex-col items-center">
              <Image
                src={`/images/type/${item.image}`}
                alt=""
                className="w-full md:w-[600px] md:h-96 xl:w-full xl:h-full mb-5 object-cover"
                layout="intrinsic"
                width={600}
                height={400}
              />
              <p className="xl:text-center text-xl xl:text-4xl font-normal">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
