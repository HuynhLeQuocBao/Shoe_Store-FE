import Image from "next/image";
import React from "react";
import { HiOutlineX } from "react-icons/hi";

const OrderDetailItem = ({ data, stateOrder }) => {
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
            blurDataURL={`${baseURL + data.image}`}
            placeholder="blur"
            alt="orderitem"
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
      </div>
      <div className="flex md:hidden flex-col  mb-5 shadow-lg rounded-lg py-2">
        <div className=" w-full grid grid-cols-12">
          <div className="w-full flex items-center col-span-4">
            <Image
              src={`${baseURL + data.image}`}
              className="w- h-30 object-cover p-2 "
              width={112}
              height={112}
              blurDataURL={`${baseURL + data.image}`}
              placeholder="blur"
              alt="orderitem"
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
              <span>Quantity: {data.quantity}</span>
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
      </div>
    </>
  );
};

export default OrderDetailItem;
