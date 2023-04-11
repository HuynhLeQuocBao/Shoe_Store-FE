import { productApi } from "@/apiClient/product";
import { ProductDetail } from "@/components/section/product";
import { Breadcum } from "@/components/section/title";
import React from "react";

export default function productDetails({ data }) {
  return (
    <div>
      <Breadcum />
      <ProductDetail data={data} />
    </div>
  );
}
export const getServerSideProps = async (context) => {
  const { params } = context;
  const productId = params.slug;
  try {
    const productDetails = await productApi.getProductById(productId);
    return {
      props: {
        data: productDetails,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: [],
      },
    };
  }
};
