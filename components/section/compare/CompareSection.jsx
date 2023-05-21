import { Container } from "@/components/common/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { productApi } from "@/apiClient/product";
import { HiPlus } from "react-icons/hi2";
import Image from "next/image";
import Modal from "../modal/Modal";
import LoadingProduct from "../loading/LoadingProduct";
import ChooseProductTwo from "./ChooseProductTwo";
import { toast } from "react-toastify";
import LoadingPage from "../loading/LoadingPage";
import CompareProduct from "./CompareProduct";

export function CompareSection({ productList, productOne }) {
  const [productTwo, setProductTwo] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handelGetProductDetailsTwo = async (id) => {
    setIsLoading(true);
    setOpenModal(false);
    try {
      const result = await productApi.getProductById(id);
      setProductTwo(result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleDelete = () => {
    setProductTwo();
    setIsLoading(false);
    setOpenModal(false);
  };
  return (
    <Container>
      <div className="mx-4 md:mx-0">
        <h1 className="text-center text-3xl pb-5 font-bold">Compare</h1>
        <div className="grid grid-cols-12 md:grid-cols-9 shadow-product-line">
          <div className="col-span-2 md:col-span-1 font-bold border-[1px] border-solid text-[11px] md:text-sm">
            <div className="h-10 "></div>
            <div className="h-40 md:h-72 flex-center border-[1px] border-solid border-r-0  ">
              Image
            </div>
            <div className="h-20 border-[1px] border-solid flex-center border-r-0 ">
              Name
            </div>
            <div className="h-28 border-[1px] border-solid flex-center border-r-0">
              Colors
            </div>
            <div className="h-20 border-[1px] border-solid flex-center border-r-0">
              Price
            </div>
            <div className="h-48 border-[1px] border-solid flex-center border-r-0 p-2">
              Introduce
            </div>
            <div className="h-20 border-[1px] border-solid flex-center border-r-0">
              Collection
            </div>
            <div className="h-20 border-[1px] border-solid flex-center border-r-0">
              Availability
            </div>
            <div className="h-28 border-[1px] border-solid flex-center border-r-0">
              Sizes
            </div>
          </div>
          {productOne?.length == 0 ? (
            <div className="col-span-4 flex-center z-30 h-full bg-white">
              <LoadingPage />
            </div>
          ) : (
            <>
              <CompareProduct product={productOne} />
            </>
          )}
          {!openModal && !isLoading && !productTwo ? (
            <div className="col-span-5 md:col-span-4 content-center grid">
              <div className="flex-center flex-col gap-2">
                <div
                  className="bg-primary rounded-full cursor-pointer hover:bg-teal-600 hover:scale-125  duration-300"
                  onClick={() => {
                    setOpenModal(true);
                    setIsLoading(true);
                  }}
                >
                  <HiPlus className="w-14 h-14 text-black hover:text-white font-bold" />
                </div>
                <div className="text-[10px] md:text-base text-slate-500">
                  Choose products to compare
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="col-span-5 md:col-span-4 flex-center">
              <LoadingPage />
            </div>
          ) : (
            <CompareProduct
              product={productTwo}
              onDelete={() => handleDelete()}
              isDelete={true}
            />
          )}
        </div>
      </div>
      <Modal
        isVisible={openModal}
        onClose={() => {
          setOpenModal(false);
          setIsLoading(false);
        }}
      >
        {productList.length === 0 ? (
          <div className="w-full flex gap-10 pb-10 flex-wrap">
            <LoadingProduct numberOfCards={8} />
          </div>
        ) : (
          <ChooseProductTwo
            data={productList}
            itemsPerPage={9}
            getIdProduct={(id) => handelGetProductDetailsTwo(id)}
          />
        )}
      </Modal>
    </Container>
  );
}
