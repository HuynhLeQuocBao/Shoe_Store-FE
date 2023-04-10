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
  useEffect(() => {
    try {
      const fechPublic = async () => {
        const dataProduct = await productApi.searchProducts(router.query.slug);
        setIsLoading(false);
        setData(dataProduct);
      };
      fechPublic();
    } catch (error) {
      console.log("Error");
    }
  }, [router.query.slug]);

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-8 mx-6 md:mx-0 pt-24">
        <div className="col-span-1">
          <Category />
        </div>
        <div className="col-span-3">
          {data?.length > 0 ? (
            <Pagination data={data} itemsPerPage={9} />
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
