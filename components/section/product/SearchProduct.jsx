/* eslint-disable @next/next/no-img-element */
import { productApi } from "@/apiClient/product";
import { Container } from "@/components/common/index";
import { useEffect, useState } from "react";
import { Category } from "./Category";
import { Pagination } from ".";
import { useRouter } from "next/router";
import LoadingPage from "../loading/LoadingPage";

export function SearchProduct() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  useEffect(() => {
    try {
      const fetchPublic = async () => {
        const dataProduct = await productApi.searchProducts(router.query.slug);
        setIsLoading(false);
        setData(dataProduct);
        setDataFilter(dataProduct);
      };
      fetchPublic();
    } catch (error) {
      console.log("Error");
    }
  }, [router.query.slug]);

  return (
    <Container>
      <h1 className="text-center font-bold text-4xl mt-4">
        search for: {router.query.slug}{" "}
      </h1>
      <div className="h-[1px] bg-slate-400 "></div>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-8 mx-6 md:mx-0 pt-24">
        {/* <div className="col-span-1">
          <Category
            dataSort={data}
            onDataFilter={(value) => setDataFilter(value)}
          />
        </div> */}
        <div className="col-span-4">
          {data?.length > 0 ? (
            <Pagination data={dataFilter} itemsPerPage={9} />
          ) : isLoading ? (
            <div className="flex-center h-24">
              <LoadingPage />
            </div>
          ) : (
            <div className="w-full text-center">Not found</div>
          )}
        </div>
      </div>
    </Container>
  );
}
