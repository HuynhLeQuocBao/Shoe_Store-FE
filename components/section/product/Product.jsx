import { convertCurrency } from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";

export function Product({ image, name, price, id }) {
  const src =
    process.env.NEXT_PUBLIC_API_URL + "/uploadWithRefactorDB/" + image;

  return (
    <Link href={`/product-detail/${id}`} prefetch={false}>
      <div className="mb-7 flex flex-col items-center justify-center md:mb-0 shadow-product-line cursor-pointer">
        <div>
          <Image
            src={src}
            width={500}
            height={500}
            objectFit="cover"
            priority={true}
            alt={name}
            blurDataURL={src}
            placeholder="blur"
          />
        </div>
        <div className="text-center flex-col font-Rokkitt text-lg w-full h-[90px] flex-center">
          <p className="h-[60px] text-ellipsis">{name}</p>
          <p className="pb-4">{convertCurrency(price)}</p>
        </div>
      </div>
    </Link>
  );
}
