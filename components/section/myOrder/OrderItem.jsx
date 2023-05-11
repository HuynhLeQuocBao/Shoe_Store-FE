import React from "react";
import { useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import Modal from "../modal/Modal";
import FormRatingAndComment from "../reviews/FormRatingAndComment";
import Image from "next/image";

const OrderItem = ({ data, stateOrder }) => {
  const [isRated, setIsRated] = useState();
  const [isOpenModalReviews, setIsOpenModalReviews] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_API_URL + "/uploadWithRefactorDB/";
  return (
    <>
      <div className="hidden w-full text-sm md:grid grid-cols-12  border border-b-2 shadow-lg rounded-lg hover:bg-zinc-100 duration-500 py-1 mb-2">
        <div className=" font-medium col-span-5 flex justify-start items-center py-2 pl-2">
          <Image
            src={`${baseURL + data.image}`}
            className="w-20 h-20 object-cover"
            width={80}
            height={80}
          />
          <div className="ml-2">
            <span>{data.productName}</span>
          </div>
        </div>
        <div className="text-center col-span-1 flex justify-center items-center">
          <span>${data.price}</span>
        </div>
        <div className="text-center col-span-1 flex justify-center items-center">
          <span>{data.sizeName}</span>
        </div>
        <div className="text-center col-span-2 flex justify-center items-center">
          <span> {data.quantity}</span>
        </div>
        <div className="col-span-1  text-center flex justify-center items-center">
          <span>${data.quantity * data.price}</span>
        </div>
        {stateOrder === 3 && (
          <div className="col-span-2  text-center flex justify-center items-center">
            <button
              className={` md:w-[90px] py-2 rounded-2xl  shadow-icon-product cursor-pointer  font-bold duration-500 hover:text-white 
              ${
                isRated
                  ? "bg-amber-400 hover:bg-amber-600"
                  : data.rated
                  ? "bg-amber-400 hover:bg-amber-600"
                  : "bg-blue-400 hover:bg-blue-600"
              }`}
              onClick={() => {
                setIsOpenModalReviews(true);
                if (!isRated) {
                  setIsRated(data.rated);
                }
              }}
            >
              {isRated ? "Edit" : data.rated ? "Edit" : "Reviews"}
            </button>
          </div>
        )}
      </div>
      <div className="flex md:hidden flex-col  mb-5 shadow-lg rounded-lg py-2">
        <div className=" w-full grid grid-cols-12">
          <div className="w-full flex items-center col-span-4">
            <Image
              src={`${baseURL + data.image}`}
              className="w- h-30 object-cover p-2 "
              width={112}
              height={112}
            />
          </div>

          <div className="col-span-6 px-2">
            <div className="w-full font-bold ">
              <span>Name: {data.productName}</span>
            </div>
            <div className="w-full font-bold text-red-500">
              <span>Price: ${data.price}</span>
            </div>
            <div className="w-full font-bold ">
              <span>Size: {data.sizeName}</span>
            </div>
            <div className="w-full">
              {/* <FormQuantity quantity={data.quantity} cartId={data._id} productId={data.productId} size={data.size} /> */}
              <span> {data.quantity}</span>
            </div>
            <div className="w-full font-bold">
              <span>Total: ${data.quantity * data.price}</span>
            </div>
          </div>
          <div className="col-span-2 flex justify-center items-start">
            <button
              className="w-10 h-10 cursor-pointer"
              onClick={() => handleDeleteItemCart(data._id)}
            >
              <div className="w-8 h-8 border border-2 border-[#c5c3c3] shadow-lg font-bold hover:bg-red-500 hover:text-white flex justify-center items-center duration-500 rounded-full">
                <HiOutlineX />
              </div>
            </button>
          </div>
        </div>
        {stateOrder === 3 && (
          <div className="text-center flex justify-end items-center">
            <button
              className="px-2 sm:px-5 py-2 sm:py-1 mr-2 -mt-10 rounded-2xl bg-blue-500 shadow-icon-product cursor-pointer hover:bg-blue-700 font-bold duration-500 hover:text-white"
              onClick={() => {
                setIsOpenModalReviews(true);
                if (!isRated) {
                  setIsRated(data.rated);
                }
              }}
            >
              {isRated ? "Edit" : data.rated ? "Edit" : "Reviews"}
            </button>
          </div>
        )}
      </div>
      <Modal
        onClose={() => setIsOpenModalReviews(false)}
        isVisible={isOpenModalReviews}
        className="w-[90%] h-[70%] md:w-[500px] md:h-[67%] "
      >
        <FormRatingAndComment
          id={data?.shoeId}
          onClose={() => setIsOpenModalReviews(false)}
          setEdit={() => setIsRated(true)}
          isEdit={isRated ? true : data.rated}
        />
      </Modal>
    </>
  );
};

export default OrderItem;
