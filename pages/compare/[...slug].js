import { productApi } from "@/apiClient/product";
import { CompareSection } from "@/components/section/compare";
import { Breadcum } from "@/components/section/title";
import React from "react";

export default function Compare({ productList, productOne }) {
  return (
    <div>
      <Breadcum />
      <CompareSection productList={productList} productOne={productOne} />
    </div>
  );
}
export const getServerSideProps = async (context) => {
  const { params } = context;
  const productId = params.slug;
  try {
    const productOne = await productApi.getProductById(productId);
    let dataProduct = await productApi.getAllProducts();
    dataProduct = dataProduct.filter((product) => product._id != productId);
    return {
      props: {
        productList: dataProduct,
        productOne,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        productList: [],
        productOne: [],
      },
    };
  }
};
