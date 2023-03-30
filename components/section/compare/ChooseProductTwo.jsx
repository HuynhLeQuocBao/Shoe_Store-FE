import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useSession } from "next-auth/react";
import { FaShoppingCart } from "react-icons/fa";
import { DiGitCompare } from "react-icons/di";
import ProductTwo from "./ProductTwo";
import { useForm } from "react-hook-form";

const ChooseProductTwo = ({ data, itemsPerPage, getIdProduct }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [searchList, setSearchList] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setSearchList(data);
  }, []);
  //paginate
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
    if (router.pathname !== "/") {
      window.scroll({
        top: 920,
        behavior: "smooth",
      });
    } else {
      window.scroll({
        top: 1400,
        behavior: "smooth",
      });
    }
  };
  const onSubmit = ({ keyword }) => {
    if (keyword.length === 0) {
      setCurrentItems(data);
    }
    const results = data.filter((product) =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setCurrentItems(results);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full pb-10 flex gap-4 justify-end items-center">
          <input
            {...register("keyword")}
            className="w-1/3 px-2 py-1 rounded-lg text-lg border-2 border-solid border-black"
            placeholder="Enter the name of the product"
          />
          <button
            type="submit"
            className=" bg-primary rounded-lg hover:bg-teal-700 duration-500 hover:cursor-pointer hover:scale-105 hover:rounded-lg hover:font-semibold px-2 py-[6px] text-white text-xl"
          >
            Search
          </button>
        </div>
      </form>
      {currentItems.length === 0 && (
        <div className="flex justify-center items-center w-full h-28">
          No products found
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 md:gap-8 pb-14 ">
        {currentItems.length > 0 &&
          currentItems.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer hover-parent relative hover:shadow-primary hover:shadow-lg"
            >
              <div>
                <ProductTwo
                  image={item.arrayImage[0].filename}
                  name={item.name}
                  price={item.price}
                />
              </div>
              <button
                className="w-full bg-green-500 hover:bg-green-700 duration-500 hover:cursor-pointer hover:scale-105 hover:rounded-lg hover:font-semibold px-4 py-2 text-white text-xl"
                onClick={() => getIdProduct(item._id)}
              >
                Choose
              </button>
            </div>
          ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<MdNavigateNext />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={<MdNavigateBefore />}
        renderOnZeroPageCount={null}
        containerClassName="w-full flex justify-center items-center mb-8 gap-4 py-2"
        pageLinkClassName="px-4 py-2 cursor-pointer rounded font-normal hover:bg-primary hover:text-white"
        previousLinkClassName="px-4 py-2 cursor-pointer rounded font-normal hover:text-primary text-xl"
        nextLinkClassName="px-4 py-2 cursor-pointer rounded font-normal hover:text-primary text-xl"
        activeLinkClassName="bg-primary text-white"
      />
    </>
  );
};

export default ChooseProductTwo;
