import { productApi } from "@/apiClient/product";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdSearch } from "react-icons/md";
import LoadingPage from "../section/loading/LoadingPage";

const SearchBar = () => {
  const [query, setQuery] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const HOST =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const baseURL = process.env.NEXT_PUBLIC_API_URL + "/uploadWithRefactorDB/";
  const { register, control, handleSubmit } = useForm({
    mode: "onChange",
  });
  useEffect(() => {
    if (!query) {
      setSearchResults([]);
    }
    return () => {
      clearTimeout(typingTimeout);
    };
  }, [typingTimeout, query]);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery) return;
    setLoading(true);
    // Gọi API tìm kiếm dựa trên searchQuery
    try {
      const results = await productApi.searchProducts(searchQuery);
      setSearchResults(results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    // Xóa bỏ các setTimeout trước đó
    clearTimeout(typingTimeout);

    // Tạo mới setTimeout
    const newTypingTimeout = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    setTypingTimeout(newTypingTimeout);
  };

  const handleSearchSubmit = () => {
    router.push(`/search-product/${query}`);
  };
  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit(handleSearchSubmit)}>
        <Controller
          control={control}
          name="search"
          render={({ field }) => (
            <div className="flex relative">
              <input
                type="text"
                placeholder="Search"
                className="h-[40px] w-full rounded-[30px] pl-4 pr-[4.5rem] focus:outline-none overflow-hidden border"
                {...register("search")}
                onChange={handleInputChange}
                value={query}
              />
              <button
                aria-label="search"
                type="submit"
                disabled={!query || query.length === 0}
                className="w-[40px] h-[40px] rounded-full bg-primary text-black focus:outline-none absolute right-0 hover:bg-teal-600 hover:text-white"
              >
                <div className="text-2xl flex items-center justify-center font-bold">
                  <MdSearch />
                </div>
              </button>
            </div>
          )}
        />
        {loading && (
          <div className="absolute bg-white min-h-[100px] w-full md:w-[375px] max-h-80 top-12 left-0 flex flex-col gap-4 p-4 shadow-lg z-20">
            <LoadingPage />
          </div>
        )}
        {searchResults.length > 0 && query && !loading ? (
          <div className="absolute bg-white min-h-[100px] w-full md:w-[375px] max-h-80 overflow-y-scroll top-12 left-0 flex flex-col gap-4 p-4 shadow-lg z-20">
            {searchResults.map((product) => (
              <Link
                key={product._id}
                href={`${HOST}/product-detail/${product._id}`}
                prefetch={false}
              >
                <div className="w-full flex gap-2 hover:cursor-pointer hover:bg-slate-200 text-xl border-b-2 border-solid p-1 duration-300">
                  <Image
                    src={`${baseURL + product?.avatar}`}
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col">
                    <p className="font-bold text-lg">{product.name}</p>
                    <p className="text-sm text-slate-500">{product.price}$</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : searchResults.length === 0 && query && !loading ? (
          <div className="absolute bg-white min-h-[60px] w-full md:w-[375px] top-12 left-0 shadow-lg z-20">
            <div className="flex-center py-5">No product found</div>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default SearchBar;
