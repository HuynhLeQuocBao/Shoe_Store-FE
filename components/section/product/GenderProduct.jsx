import { Container } from "@/components/common/index";
import { Product } from "./Product";
import { Category } from "./Category";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaShoppingCart } from "react-icons/fa";
import { DiGitCompare } from "react-icons/di";
import { Configure, Pagination, connectHits } from "react-instantsearch-dom";
import { useRouter } from "next/router";
import AddToCart from "../orders/AddToCart";
import Modal from "../modal/Modal";
import { useState } from "react";

export function GenderProduct({ gender }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [productId, setProductId] = useState();
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddToCart = (id) => {
    setProductId(id);
    setIsOpenModal(true);
  };
  const Hits = ({ hits }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {hits.map((hit) => {
        if (hit.gender === gender)
          return (
            <div
              key={hit?._id}
              className="cursor-pointer hover-parent relative"
            >
              <div className="hover-child-1">
                <Product
                  id={hit?._id}
                  image={hit?.avatar}
                  name={hit?.name}
                  price={hit?.price}
                />
              </div>
              <div className="hover-child-2 absolute top-1/3 left-0 right-0 flex items-center justify-evenly">
                <div
                  className="text-black w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-icon-product hover:bg-primary relative icon-cart"
                  onClick={() => handleAddToCart(hit?._id)}
                >
                  {/* <Link href={session ? `/prodcut-detail/${hit?._id?.$oid}` : "/login"}> */}
                  <FaShoppingCart className="z-20" />
                  {/* </Link> */}
                  <span className="icon-cart-details">Add to cart</span>
                </div>
                <div className="text-black w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-icon-product hover:bg-primary relative icon-compare">
                  <Link href={`/compare/${hit?._id}`}>
                    <DiGitCompare className="z-20" />
                  </Link>
                  <span className="icon-compare-details">Compare</span>
                </div>
              </div>
            </div>
          );
      })}
    </div>
  );

  const CustomHits = connectHits(Hits);

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-8 mx-6 md:mx-0">
        <div className="col-span-1">
          <Category />
        </div>
        <div className="col-span-3 relative">
          <Configure hitsPerPage={9} />
          <CustomHits />
          <div className="hidden">
            <Pagination />
          </div>
          <div className="w-full overflow-hidden">
            <Pagination showFirst={false} />
          </div>
        </div>
      </div>
      <Modal onClose={() => setIsOpenModal(false)} isVisible={isOpenModal}>
        <AddToCart id={productId} onClose={() => setIsOpenModal(false)} />
      </Modal>
    </Container>
  );
}
