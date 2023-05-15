import { convertCurrency } from "@/utils/currency";
import Image from "next/image";

const ProductTwo = ({ image, name, price }) => {
  const src =
    process.env.NEXT_PUBLIC_API_URL + "/uploadWithRefactorDB/" + image;
  return (
    <div className=" flex flex-col items-center justify-center shadow-product-line ">
      <div>
        <Image
          src={src}
          alt="footwear image"
          width={500}
          height={500}
          objectFit="cover"
          priority={true}
          blurDataURL={src}
          placeholder="blur"
        />
      </div>
      <div className="text-center font-Rokkitt text-lg w-full h-[70px] text-ellipsis flex items-center justify-center">
        <p className="pb-4">{name}</p>
        {/* <p className="pb-4">{convertCurrency(price)}</p> */}
      </div>
    </div>
  );
};

export default ProductTwo;
