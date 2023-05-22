import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdNavigateBefore, MdNavigateNext, MdSearch } from "react-icons/md";
import { useSession } from "next-auth/react";
import { FaShoppingCart } from "react-icons/fa";
import { DiGitCompare } from "react-icons/di";
import ProductTwo from "./ProductTwo";
import { Controller, useForm } from "react-hook-form";

const ChooseProductTwo = ({
  data,
  itemsPerPage,
  getIdProduct,
  handleSearch,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
  });
  const [saveData, setSaveData] = useState(data);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  //paginate
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(saveData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(saveData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, saveData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % saveData.length;
    setItemOffset(newOffset);
  };
  const onSearch = (e) => {
    // e.preventDefault();
    const keyword = e.target.value;
    if (itemOffset !== 0) {
      setItemOffset(0);
    }
    if (keyword.length === 0) {
      setSaveData(data);
    } else {
      const results = data.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setSaveData(results);
    }
  };

  return (
    <div className="p-5">
      <form>
        <div className="w-full pb-10 flex flex-shrink gap-4 justify-end items-center">
          <Controller
            control={control}
            name="search"
            render={({ field, onChange }) => (
              <div className="flex relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="h-[40px] w-full rounded-[30px] pl-4 pr-[4.5rem] focus:outline-none overflow-hidden border"
                  {...register("search")}
                  onChange={(e) => onSearch(e)}
                />
                <button
                  type="submit"
                  className="w-[40px] h-[40px] rounded-full bg-primary text-black hover:text-white focus:outline-none absolute right-0 hover:bg-teal-600"
                >
                  <div className="text-2xl flex items-center justify-center">
                    <MdSearch />
                  </div>
                </button>
              </div>
            )}
          />
        </div>
      </form>
      {saveData.length === 0 && (
        <div className="flex justify-center items-center w-full h-28">
          No products found
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-4 md:gap-8">
        {currentItems.map((item) => (
          <div
            key={item._id}
            className="cursor-pointer hover-parent relative hover:shadow-primary hover:shadow-lg mb-8"
          >
            <div>
              <ProductTwo
                image={item.avatar}
                name={item.name}
                price={item.price}
              />
              <button
                className="w-full bg-primary hover:bg-teal-600 duration-200 hover:cursor-pointer hover:rounded-lg hover:font-semibold px-4 py-2 text-black hover:text-white text-xl"
                onClick={() => getIdProduct(item._id)}
              >
                Choose
              </button>
            </div>
          </div>
        ))}
      </div>
      {saveData.length >= itemsPerPage && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={<MdNavigateNext />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel={<MdNavigateBefore />}
          renderOnZeroPageCount={null}
          containerClassName="w-full flex justify-center items-center gap-4 py-2"
          pageLinkClassName="px-4 py-2 cursor-pointer rounded font-normal hover:bg-primary hover:text-white"
          previousLinkClassName="px-4 py-2 cursor-pointer rounded font-normal hover:text-primary text-xl"
          nextLinkClassName="px-4 py-2 cursor-pointer rounded font-normal hover:text-primary text-xl"
          activeLinkClassName="bg-primary text-white"
        />
      )}
    </div>
  );
};

export default ChooseProductTwo;
