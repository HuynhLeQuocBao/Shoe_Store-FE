import { productApi } from "@/apiClient/product";
import { CompareSection } from "@/components/section/compare";
import { Breadcrumbs } from "@/components/section/title";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function ComparePage({ productOne, products }) {
  const [productArray, setProductArray] = useState(products);
  useEffect(() => {
    setProductArray(products.filter((e) => e._id !== productOne?._id));
  }, [products]);
  return (
    <div>
      <Breadcrumbs />
      <CompareSection productList={productArray} productOne={productOne} />
    </div>
  );
}

export async function getStaticPaths() {
  const products = await productApi.getAllProducts();

  // Tạo paths cho mỗi ID sản phẩm
  const paths = products.map((product) => ({
    params: { slug: [product._id] },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const productId = params.slug;
  try {
    const productOne = await productApi.getProductById(productId);
    const products = await productApi.getAllProducts();
    return {
      props: {
        productOne,
        products,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        productOne: [],
      },
    };
  }
}
