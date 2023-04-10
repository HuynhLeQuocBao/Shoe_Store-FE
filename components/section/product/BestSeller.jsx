/* eslint-disable @next/next/no-img-element */
import { productApi } from "@/apiClient/product";
import { Container } from "@/components/common/index";
import { useEffect, useState } from "react";
import { Product } from "./Product";
import Link from "next/link";
import { Pagination } from ".";
import LoadingProduct from "../loading/LoadingProduct";
import LoadingPage from "../loading/LoadingPage";
import { useSession } from "next-auth/react";
import { FaShoppingCart } from "react-icons/fa";
import { DiGitCompare } from "react-icons/di";
import { Category } from "./Category";

export function BestSeller() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(true);
  const [dataFilter, setDataFilter] = useState([]);
  const { data: session } = useSession();

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

  const showAll = () => {
    setFlag(!flag);
    window.scroll({
      top: 1380,
      behavior: "smooth",
    });
  };
  if (data.length == 0) {
    return (
      <Container>
        {
          <div className="mx-6 md:mx-0">
            <div className="font-Rokkitt text-4xl font-bold text-center py-14">
              <h2>Best Sellers</h2>
            </div>
            <div className=" grid-cols-1 md:grid-cols-3 xl:grid-cols-4 md:gap-8 pb-14 hidden md:grid">
              <LoadingProduct numberOfCards={8} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 md:gap-8 pb-14  md:hidden">
              <LoadingPage />
            </div>
          </div>
        }
      </Container>
    );
  }
  return (
    <Container>
      {flag ? (
        <div className="mx-6 md:mx-0">
          <div className="font-Rokkitt text-4xl font-bold text-center py-10">
            <h2>Best Sellers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 md:gap-8 pb-14">
            {data.slice(0, 8).map((item) => (
              <div
                key={item._id}
                className="cursor-pointer hover-parent relative"
              >
                <Link href={`/product-detail/${item._id}`}>
                  <div className="hover-child-1">
                    <Product
                      image={item.arrayImage[0].filename}
                      name={item.name}
                      price={item.price}
                    />
                  </div>
                </Link>
                <div className="hover-child-2 absolute top-1/3 left-0 right-0 flex items-center justify-evenly">
                  <div className="text-black w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-icon-product hover:bg-primary relative icon-cart">
                    <Link href={session ? "/shopping-cart" : "/login"}>
                      <FaShoppingCart className="z-20" />
                    </Link>
                    <span className="icon-cart-details">Add to cart</span>
                  </div>
                  <div className="text-black w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-icon-product hover:bg-primary relative icon-compare">
                    <Link href={`/compare/${item._id}`}>
                      <DiGitCompare className="z-20" />
                    </Link>
                    <span className="icon-compare-details">Compare</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-5 flex items-center justify-center">
            <button
              className="text-sm py-[18px] px-9 bg-primary text-white md:text-base rounded-[30px] hover:bg-secondary hover:text-white"
              onClick={showAll}
            >
              Show All Products
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-6 md:mx-0">
          <div className="font-Rokkitt text-xl text-[#0000004D] font-semibold text-center py-10">
            <h2>VIEW ALL PRODUCTS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-8 mx-6 md:mx-0">
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
        </div>
      )}
    </Container>
  );
}
