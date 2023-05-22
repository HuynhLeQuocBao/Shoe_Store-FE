import Image from "next/image";
import React from "react";

const ViewItemCheckout = ({ data }) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL + "/uploadWithRefactorDB/";
  return (
    <>
      <div className="hidden sm:block w-full p-5">
        <div className="grid w-full bg-[#f0f0f0] py-3 font-semibold text-base rounded-3xl uppercase grid-cols-12 mb-6">
          <div className="text-center col-span-4">
            <span>PRODUCT DETAILS</span>
          </div>
          <div className="text-center col-span-3">
            <span>PRICE</span>
          </div>
          <div className="text-center col-span-3">
            <span>SIZE</span>
          </div>
          <div className="text-center col-span-2">
            <span>QUANTITY</span>
          </div>
        </div>
        {data?.map((item) => {
          return (
            <div
              key={item.productId}
              className="w-full text-sm grid grid-cols-12  border border-b-2 duration-500 py-1 mb-2"
            >
              <div className="text-center col-span-4 flex items-center justify-start">
                <div className="flex justify-center items-center">
                  <Image
                    src={`${baseURL + item.image}`}
                    className="w-20 h-20 object-cover col-span-2"
                    layout="intrinsic"
                    width={80}
                    height={80}
                    blurDataURL={`${baseURL + item.image}`}
                    placeholder="blur"
                    alt="checkout"
                  />
                </div>
                <div className="flex justify-center items-center col-span-2 ml-2">
                  <span>{item.name}</span>
                </div>
              </div>
              <div className="text-center col-span-3 flex justify-center items-center">
                <span>$ {item.price}</span>
              </div>
              <div className="text-center col-span-3 flex justify-center items-center">
                <span>{item.size}</span>
              </div>
              <div className="col-span-2 text-center flex justify-center items-center">
                <span>{item.quantityProduct}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" sm:hidden w-full p-5">
        {data.map((item, index) => (
          <div
            key={item.productId}
            className="w-full grid grid-cols-12 mb-5 shadow-lg rounded-lg py-2"
          >
            <div className=" relative w-[90%] h-full col-span-4">
              <Image
                src={`${baseURL + item.image}`}
                layout="fill"
                blurDataURL={`${baseURL + item.image}`}
                placeholder="blur"
                alt="checkout"
              />
            </div>

            <div className="col-span-8 px-2">
              <div className="w-full font-bold text-red-500">
                <span>Name: {item.name}</span>
              </div>
              <div className="w-full font-bold text-red-500">
                <span>Price: ${item.price}</span>
              </div>
              <div className="w-full font-bold ">
                <span>Size: {item.size}</span>
              </div>
              <div className="w-full font-bold ">
                <span>Quantity: {item.quantityProduct}</span>
              </div>
              <div className="w-full font-bold text-red-500">
                <span>Total: ${item.totalProduct}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewItemCheckout;
