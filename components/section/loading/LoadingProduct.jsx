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
        <span key={item} className={`${className} loader`}></span>
      ))}
    </>
  );
};
export default LoadingProduct;
