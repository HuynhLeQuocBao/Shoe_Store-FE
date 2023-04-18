import { Container } from "@/components/common/index";
import { Product } from "./Product";
import { Category } from "./Category";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaShoppingCart } from "react-icons/fa";
import { DiGitCompare } from "react-icons/di";
import { Configure, Hits, Pagination } from "react-instantsearch-dom";

export function GenderProduct() {
  const { data: session } = useSession();
  const Hit = ({ hit }) => (
    <div key={hit?._id?.$oid} className="cursor-pointer hover-parent relative">
      <div className="hover-child-1">
        <Product
          id={hit?._id?.$oid}
          image={hit?.image}
          name={hit?.name}
          price={hit?.price}
        />
      </div>
      <div className="hover-child-2 absolute top-1/3 left-0 right-0 flex items-center justify-evenly">
        <div className="text-black w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-icon-product hover:bg-primary relative icon-cart">
          <Link href={session ? "/shopping-cart" : "/login"}>
            <FaShoppingCart className="z-20" />
          </Link>
          <span className="icon-cart-details">Add to cart</span>
        </div>
        <div className="text-black w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-icon-product hover:bg-primary relative icon-compare">
          <Link href={`/compare/${hit?._id?.$oid}`}>
            <DiGitCompare className="z-20" />
          </Link>
          <span className="icon-compare-details">Compare</span>
        </div>
      </div>
    </div>
  );
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-8 mx-6 md:mx-0">
        <div className="col-span-1">
          <Category />
        </div>
        <div className="col-span-3 relative">
          <Configure hitsPerPage={6} />
          <Hits hitComponent={Hit} />
          <div className="absolute bottom-0 right-0 left-0">
            <Pagination showFirst={false} />
          </div>
        </div>
      </div>
    </Container>
  );
}
