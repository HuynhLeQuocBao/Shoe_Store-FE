import React from "react";
import { Register } from "@/components/section/auth";
import { Breadcrumbs } from "@/components/section/title";

export default function RegisterPage() {
  return (
    <div>
      <Breadcrumbs />
      <Register />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      productOne: [],
    },
    revalidate: 1,
  };
}
