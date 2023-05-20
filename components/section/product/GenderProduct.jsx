import { Container } from "@/components/common/index";
import { Product } from "./Product";
import { Category } from "./Category";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { DiGitCompare } from "react-icons/di";
import { Configure, Pagination, connectHits } from "react-instantsearch-dom";
import AddToCart from "../orders/AddToCart";
import Modal from "../modal/Modal";
import { useState } from "react";
import LoadingProduct from "../loading/LoadingProduct";

export function GenderProduct({ gender }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [productId, setProductId] = useState();

  const handleAddToCart = (id) => {
    setProductId(id);
    setIsOpenModal(true);
  };
  const Hits = ({ hits }) => {
    if (hits?.length === 0)
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <LoadingProduct numberOfCards={6} />
        </div>
      );
    return (
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
                <div className="hover-child-2 absolute lg:top-1/3 lg:left-0 flex items-end justify-evenly flex-col lg:flex-row gap-2 w-fit lg:w-full top-2 right-2">
                  <div
                    className=" text-white xl:text-black w-[120px]  px-2 py-1 lg:p-0 hover:bg-teal-600 hover:text-white  duration-200 gap-2 lg:w-10 lg:h-10 bg-teal-500 lg:bg-white rounded-lg lg:rounded-full flex items-center lg:justify-center  shadow-icon-product  relative icon-cart"
                    onClick={() => handleAddToCart(hit?._id)}
                  >
                    <FaShoppingCart className=" z-20" />
                    <p className="lg:hidden">Add to cart</p>
                    <span className="hidden lg:block icon-cart-details">
                      Add to cart
                    </span>
                  </div>
                  <Link href={`/compare/${hit?._id}`}>
                    <div className="z-20 text-white xl:text-black w-[120px] px-2 py-1 lg:p-0 hover:bg-teal-600 hover:text-white   duration-200  gap-2 lg:w-10 lg:h-10 bg-teal-500 lg:bg-white rounded-lg lg:rounded-full flex items-center  lg:justify-center shadow-icon-product  relative icon-compare">
                      <DiGitCompare className="" />
                      <p className="lg:hidden">Compare</p>
                      <span className="hidden lg:block icon-compare-details">
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
  };

  const CustomHits = connectHits(Hits);

  return (
    <Container>
      <div
        className="grid grid-cols-1 md:grid-cols-4 md:gap-8 mx-6 md:mx-0"
        id="gender-product"
      >
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
