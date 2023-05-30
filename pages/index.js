import { Title } from "@/components/section/title/index";
import { Gender } from "@/components/section/type/index";
import { BestSeller } from "@/components/section/product/index";

import React from "react";
import { Banner } from "@/components/section/banner";
import { productApi } from "@/apiClient/product";
import dynamic from "next/dynamic";

export default function Index() {
  return (
    <>
      <Banner />
      {/* {products && <BestSellerModal />} */}
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
