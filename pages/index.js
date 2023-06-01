import { BestSeller } from "@/components/section/product/index";

import React from "react";
import { Banner } from "@/components/section/banner";
import { productApi } from "@/apiClient/product";

export default function Index({ products }) {
  return (
    <>
      <Banner />
      <BestSeller data={products} />
    </>
  );
}
export async function getStaticProps() {
  try {
    const products = await productApi.getAllProducts();
    return {
      props: {
        products,
      },
    };
  } catch (error) {
    return {
      props: {
        products: [],
      },
    };
  }
}
