import { convertCurrency } from "@/utils/currency";
import Image from "next/image";

export function Product({ image, name, price }) {
  const src = `https://shoestore-backend-0uam.onrender.com/upload/${image}`;
  return (
    <div className="mb-7 flex flex-col items-center justify-center border md:mb-0 border-[#dee2e6]">
      <div>
        <Image
          loader={() => src}
          src={src}
          width={500}
          height={500}
          objectFit="cover"
          // loading="eager"
          priority={true}
        />
      </div>
      <div className="text-center font-Rokkitt text-lg">
        <p className="pb-4">{name}</p>
        <p className="pb-4">{convertCurrency(price)}</p>
      </div>
    </div>
  );
}
