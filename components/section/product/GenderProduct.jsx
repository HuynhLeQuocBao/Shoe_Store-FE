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
              <div className="hover-child-2 absolute md:top-1/3 md:left-0 flex items-end justify-evenly flex-col md:flex-row gap-2 w-fit md:w-full top-2 right-2">
                <div
                  className=" text-black w-fit px-2 py-1 md:p-0 hover:bg-teal-600 hover:text-white  duration-200 gap-2 md:w-10 md:h-10 bg-teal-500 md:bg-white rounded-lg md:rounded-full flex items-center justify-center shadow-icon-product  relative icon-cart"
                  onClick={() => handleAddToCart(hit?._id)}
                >
                  <FaShoppingCart className=" z-20" />
                  <p className="md:hidden">Add to cart</p>
                  <span className="hidden md:block icon-cart-details">
                    Add to cart
                  </span>
                </div>
                <Link href={`/compare/${hit?._id}`}>
                  <div className="z-20 text-black w-fit px-2 py-1 md:p-0 hover:bg-teal-600 hover:text-white   duration-200  gap-2 md:w-10 md:h-10 bg-teal-500 md:bg-white rounded-lg md:rounded-full flex items-center justify-center shadow-icon-product  relative icon-compare">
                    <DiGitCompare className="" />
                    <p className="md:hidden">Compare</p>
                    <span className="hidden md:block icon-compare-details">
                      Compare
                    </span>
                  </div>
                </Link>
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
