import { convertCurrency } from "@/utils/currency";
import Image from "next/image";

const ProductTwo = ({ image, name, price }) => {
  const src = `http://localhost:3010/upload/${image}`;

  return (
    <div className="mb-7 flex flex-col items-center justify-center md:mb-0 shadow-product-line ">
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
      <div className="text-center font-Rokkitt text-lg">
        <p className="pb-4">{name}</p>
        {/* <p className="pb-4">{convertCurrency(price)}</p> */}
      </div>
    </div>
  );
};

export default ProductTwo;
