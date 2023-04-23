import { Breadcum } from "@/components/section/title";
import { Men } from "@/components/section/type";
import { GenderProduct } from "@/components/section/product";
import React from "react";
import { BannerChild } from "@/components/section/banner";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";

export default function ShoesForMen() {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  );
  return (
    <InstantSearch searchClient={searchClient} indexName="product">
      <Breadcum />
      <BannerChild text="MEN'S" />
      <Men />
      <GenderProduct />
    </InstantSearch>
  );
}
