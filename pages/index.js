import { BestSeller } from "@/components/section/product/index";

import React from "react";
import { Banner } from "@/components/section/banner";
import { productApi } from "@/apiClient/product";
import { Hits } from "react-instantsearch-dom";

export default function Index({ data }) {
  return (
    <>
      <Banner />
      <BestSeller data={data} />
    </>
  );
}
export const getServerSideProps = async () => {
  try {
    const dataProduct = await productApi.getAllProducts();
    return {
      props: {
        data: dataProduct,
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
