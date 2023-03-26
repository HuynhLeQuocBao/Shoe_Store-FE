import { convertCurrency } from "@/utils/currency";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { DiGitCompare } from "react-icons/di";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function ProductOverlay() {
  <div className="h-96"></div>;
}

export function Product({ image, name, price }) {
  const src = `https://shoestore-backend-0uam.onrender.com/upload/${image}`;
  const { data: session } = useSession();

  return (
    <div className="mb-7 flex flex-col items-center justify-center md:mb-0 shadow-product-line hover-parent relative">
      <div className="hover-child-1">
        <Image
          loader={() => src}
          src={src}
          width={500}
          height={500}
          objectFit="cover"
          priority={true}
        />
      </div>
      <div className="hover-child-2 absolute top-1/3 left-0 right-0 flex items-center justify-evenly">
        <div className="text-black w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-icon-product hover:bg-primary relative icon-cart">
          <Link href={session ? "/shopping-cart" : "/login"}>
            <FaShoppingCart />
          </Link>
          <span className="icon-cart-details">Add to cart</span>
        </div>
        <div className="text-black w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-icon-product hover:bg-primary relative icon-compare">
          <Link href="/compare">
            <DiGitCompare />
          </Link>
          <span className="icon-compare-details">Compare</span>
        </div>
      </div>
      <div className="text-center font-Rokkitt text-lg">
        <p className="pb-4">{name}</p>
        <p className="pb-4">{convertCurrency(price)}</p>
      </div>
    </div>
  );
}
