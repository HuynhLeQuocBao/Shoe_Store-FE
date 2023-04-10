import { Breadcum } from "@/components/section/title";
import { Women } from "@/components/section/type";
import { GenderProduct } from "@/components/section/product";
import React from "react";
import { BannerChild } from "@/components/section/banner";
import { productApi } from "@/apiClient/product";

export default function About({ data }) {
  return (
    <div>
      <Breadcum />
      <BannerChild text="WOMEN'S" />
      <Women />
      <GenderProduct data={data} />
    </div>
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
    return {
      props: {
        data: [],
      },
    };
  }
};
