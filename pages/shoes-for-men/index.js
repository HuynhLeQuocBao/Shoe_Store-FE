import { Breadcum } from "@/components/section/title";
import { Men } from "@/components/section/type";
import { GenderProduct } from "@/components/section/product";
import React from "react";
import { BannerChild } from "@/components/section/banner";
import { productApi } from "@/apiClient/product";

export default function ShoesForMen({ data }) {
  return (
    <div>
      <Breadcum />
      <BannerChild text="MEN'S" />
      <Men />
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
