import { BestSeller } from "@/components/section/product/index";

import React from "react";
import { Banner } from "@/components/section/banner";
import { productApi } from "@/apiClient/product";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";

export default function Index({ data }) {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  );
  return (
    <InstantSearch searchClient={searchClient} indexName="product">
      <Banner />
      <BestSeller data={data} />
    </InstantSearch>
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
