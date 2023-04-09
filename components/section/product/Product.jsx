import { convertCurrency } from "@/utils/currency";
import Image from "next/image";

export function Product({ image, name, price }) {
  const src = process.env.NEXT_PUBLIC_API_URL + "/upload/" + image;

  return (
    <div className="mb-7 flex flex-col items-center justify-center md:mb-0 shadow-product-line">
      <div>
        <Image
          loader={() => src}
          src={src}
          width={500}
          height={500}
          objectFit="cover"
          priority={true}
        />
      </div>
      <div className="text-center flex-col font-Rokkitt text-lg w-full h-[90px] flex-center">
        <p className="h-[60px] text-ellipsis">{name}</p>
        <p className="pb-4">{convertCurrency(price)}</p>
      </div>
    </div>
  );
}
