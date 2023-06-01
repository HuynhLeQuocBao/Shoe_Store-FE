import { Container } from "@/components/common/index";
import { useEffect, useState } from "react";
import { Product } from "./Product";
import Link from "next/link";
import LoadingProduct from "../loading/LoadingProduct";
import LoadingPage from "../loading/LoadingPage";
import { FaShoppingCart } from "react-icons/fa";
import { DiGitCompare } from "react-icons/di";
import { Pagination, Configure, connectHits } from "react-instantsearch-dom";
import { Category } from ".";
import Modal from "../modal/Modal";
import AddToCart from "../orders/AddToCart";

export function BestSeller({ data }) {
  const [flag, setFlag] = useState(true);
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
        {hits.map((hit) => (
          <div key={hit?._id} className="cursor-pointer hover-parent relative">
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
                className="text-white lg:text-black w-[120px]  px-2 py-1 lg:p-0 hover:bg-teal-600 hover:text-white  duration-200 gap-2 lg:w-10 lg:h-10 bg-teal-500 lg:bg-white rounded-lg lg:rounded-full flex items-center lg:justify-center  shadow-icon-product  relative icon-cart"
                onClick={() => handleAddToCart(hit?._id)}
              >
                <FaShoppingCart className=" z-20" />
                <p className="lg:hidden">Add to cart</p>
                <span className="hidden lg:block icon-cart-details">
                  Add to cart
                </span>
              </div>
              <Link href={`/compare/${hit?._id}`} prefetch={false}>
                <div className="z-20 text-white lg:text-black w-[120px] px-2 py-1 lg:p-0 hover:bg-teal-600 hover:text-white   duration-200  gap-2 lg:w-10 lg:h-10 bg-teal-500 lg:bg-white rounded-lg lg:rounded-full flex items-center  lg:justify-center shadow-icon-product  relative icon-compare">
                  <DiGitCompare className="" />
                  <p className="lg:hidden">Compare</p>
                  <span className="hidden lg:block icon-compare-details">
                    Compare
                  </span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const CustomHits = connectHits(Hits);

  const showAll = () => {
    setFlag(!flag);
    window.scroll({
      top: 600,
      behavior: "smooth",
    });
  };

  if (data?.length == 0) {
    return (
      <Container>
        {
          <div className="mx-6 md:mx-0">
            <div className="font-Rokkitt text-4xl font-bold text-center py-14">
              <h2>Best Sellers</h2>
            </div>
            <div className=" grid-cols-1 md:grid-cols-3 xl:grid-cols-4 md:gap-8 pb-14 hidden md:grid">
              <LoadingProduct numberOfCards={8} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 md:gap-8 pb-14  md:hidden">
              <LoadingPage />
            </div>
          </div>
        }
      </Container>
    );
  }
  return (
    <Container id="best-seller">
      {flag ? (
        <div className="mx-6 md:mx-0">
          <div className="font-Rokkitt text-4xl font-bold text-center py-10">
            <h2>Best Sellers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 md:gap-8 pb-14">
            {data?.slice(0, 8)?.map((item) => (
              <div
                key={item._id}
                className="cursor-pointer hover-parent relative "
              >
                <div className="hover-child-1 ">
                  <Product
                    id={item?._id}
                    image={item?.avatar}
                    name={item?.name}
                    price={item?.price}
                  />
                </div>
                <div className="hover-child-2 absolute lg:top-1/3 lg:left-0 flex items-end justify-evenly flex-col lg:flex-row gap-2 w-fit lg:w-full top-2 right-2">
                  <div
                    className="text-white lg:text-black w-[120px]  px-2 py-1 lg:p-0 hover:bg-teal-600 hover:text-white  duration-200 gap-2 lg:w-10 lg:h-10 bg-teal-500 lg:bg-white rounded-lg lg:rounded-full flex items-center lg:justify-center  shadow-icon-product  relative icon-cart"
                    onClick={() => handleAddToCart(item?._id)}
                  >
                    <FaShoppingCart className=" z-20" />
                    <p className="lg:hidden">Add to cart</p>
                    <span className="hidden lg:block icon-cart-details">
                      Add to cart
                    </span>
                  </div>
                  <Link href={`/compare/${item._id}`} prefetch={false}>
                    <div className="z-20 text-white lg:text-black w-[120px] px-2 py-1 lg:p-0 hover:bg-teal-600 hover:text-white   duration-200  gap-2 lg:w-10 lg:h-10 bg-teal-500 lg:bg-white rounded-lg lg:rounded-full flex items-center  lg:justify-center shadow-icon-product  relative icon-compare">
                      <DiGitCompare className="" />
                      <p className="lg:hidden">Compare</p>
                      <span className="hidden lg:block icon-compare-details">
                        Compare
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-5 flex items-center justify-center">
            <button
              className="font-semibold text-sm py-[18px] px-9 bg-primary text-black md:text-xl rounded-[30px] hover:bg-teal-600 hover:text-white"
              onClick={showAll}
            >
              Show All Products
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-6 md:mx-0">
          <div className="text-2xl py-10 text-center text-[#0000004D] font-Rokkitt font-bold">
            <p>VIEW ALL PRODUCTS</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-8 mx-6 md:mx-0">
            <div className="col-span-1">
              <Category />
            </div>
            <div className="col-span-3 relative">
              <Configure hitsPerPage={9} />
              <CustomHits />
              <div className="w-full overflow-hidden">
                <Pagination showFirst={false} />
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        onClose={() => setIsOpenModal(false)}
        isVisible={isOpenModal}
        className=""
      >
        <AddToCart id={productId} onClose={() => setIsOpenModal(false)} />
      </Modal>
    </Container>
  );
}
