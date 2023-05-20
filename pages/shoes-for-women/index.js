import { Breadcrumbs } from "@/components/section/title";
import { Women } from "@/components/section/type";
import { GenderProduct } from "@/components/section/product";
import React from "react";
import { BannerChild } from "@/components/section/banner";

export default function ShoesForWoMenPage() {
  return (
    <>
      <Breadcrumbs />
      <BannerChild text="WOMEN'S" />
      <Women />
      <GenderProduct gender="female" />
    </>
  );
}
