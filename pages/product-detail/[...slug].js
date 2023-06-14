import { productApi } from "@/apiClient/product";
import { ProductDetail } from "@/components/section/product";
import { Breadcrumbs } from "@/components/section/title";
import React from "react";

export default function productDetailPage({ data }) {
  return (
    <div>
      <Breadcrumbs />
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
