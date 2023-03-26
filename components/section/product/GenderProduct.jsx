/* eslint-disable @next/next/no-img-element */
import { productApi } from "@/apiClient/product";
import { Container } from "@/components/common/index";
import { useEffect, useState } from "react";
import { Category } from "./Category";
import { Pagination } from ".";
import LoadingProduct from "../loading/LoadingProduct";
import LoadingPage from "../loading/LoadingPage";

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
  if (data.length == 0) {
    return (
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-8 mx-6 md:mx-0 pt-24">
          <div className="col-span-1">
            <Category onDataFilter={(value) => setDataFilter(value)} />
          </div>
          <div className="hidden col-span-3 md:grid  grid-cols-1 md:grid-cols-2  xl:grid-cols-3 md:gap-8 pb-14 ">
            <LoadingProduct numberOfCards={6} />
          </div>
          <div className="flex my-2 col-span-3 md:hidden  ">
            <LoadingPage />
          </div>
        </div>
      </Container>
    );
  }
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-8 mx-6 md:mx-0 pt-24">
        <div className="col-span-1">
          <Category onDataFilter={(value) => setDataFilter(value)} />
        </div>
        <div className="col-span-3">
          <Pagination
            data={dataFilter.length > 0 ? dataFilter : data}
            itemsPerPage={9}
          />
        </div>
      </div>
    </Container>
  );
}
