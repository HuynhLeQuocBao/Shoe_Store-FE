import { productApi } from "@/apiClient/product";
import { CompareSection } from "@/components/section/compare";
import { Breadcrumbs } from "@/components/section/title";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function ComparePage({ productOne, products }) {
  const [productArray, setProductArray] = useState(products);
  useEffect(() => {
    setProductArray(products.filter((e) => e._id !== productOne?._id));
  }, [products]);
  return (
    <div>
      <Breadcrumbs />
      <CompareSection productList={productArray} productOne={productOne} />
    </div>
  );
}
export const getServerSideProps = async (context) => {
  const { params } = context;
  const productId = params.slug;
  try {
    const productOne = await productApi.getProductById(productId);
    return {
      props: {
        productOne,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        productOne: [],
      },
    };
  }
};
