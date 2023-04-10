import { Title } from "@/components/section/title/index";
import { Gender } from "@/components/section/type/index";
import { BestSeller } from "@/components/section/product/index";
// import { getServerSideProps } from "next";

import React from "react";
import { Banner } from "@/components/section/banner";
import { productApi } from "@/apiClient/product";
import { useState } from "react";
import LoadingPage from "@/components/section/loading/LoadingPage";

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
