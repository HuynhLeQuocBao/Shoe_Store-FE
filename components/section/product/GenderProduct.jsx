/* eslint-disable @next/next/no-img-element */
import { productApi } from "@/apiClient/product";
import { Container } from "@/components/common/index";
import { useEffect, useState } from "react";
import { Category } from "./Category";
import { Pagination } from ".";

export function GenderProduct({ ...props }) {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    try {
      const fechPublic = async () => {
        const dataProduct = await productApi.getAllProducts();
        setData(dataProduct);
      };
      fechPublic();
    } catch (error) {
      console.log("Error");
    }
  }, []);
  console.log('dataFilter', dataFilter)
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-8 mx-6 md:mx-0 pt-24">
        <div className="col-span-1">
          <Category onDataFilter={value => setDataFilter(value)} />
        </div>
        <div className="col-span-3">
          <Pagination data={dataFilter.length > 0 ? dataFilter : data} itemsPerPage={9} />
        </div>
      </div>
    </Container>
  );
}
