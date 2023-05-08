import { BestSeller } from "@/components/section/product/index";

import React from "react";
import { Banner } from "@/components/section/banner";

export default function Index({ products }) {
  return (
    <>
      <Banner />
      <BestSeller data={products} />
    </>
  );
}
