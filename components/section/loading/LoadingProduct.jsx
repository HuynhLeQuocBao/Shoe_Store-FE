import { Container } from "@/components/common";
import React from "react";

const LoadingProduct = ({ numberOfCards, className }) => {
  const data = [];
  for (let index = 0; index < numberOfCards; index++) {
    data.push(index);
  }
  return (
    <>
      {data.map((item) => (
        <div className="w-full" key={item}>
          <div className="mb-7 flex flex-col items-center justify-center md:mb-0 shadow-product-line p-4">
            <div className="mb-2 bg-loading-gradient h-52 min-w-full"></div>
            <div className="text-center flex-col font-Rokkitt text-lg w-full h-[90px] flex-center">
              <p className="mb-2 text-ellipsis bg-loading-gradient h-14 min-w-full"></p>
              <p className=" bg-loading-gradient h-10 min-w-full"></p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default LoadingProduct;
