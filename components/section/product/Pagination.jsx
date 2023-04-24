import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Product } from "./Product";
import { useSession } from "next-auth/react";
import { FaShoppingCart } from "react-icons/fa";
import { DiGitCompare } from "react-icons/di";

export function Pagination({ ...props }) {
  const { data, itemsPerPage } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();

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
        top: 600,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-8 pb-14">
        {currentItems.map((item) => (
          <div key={item._id} className="cursor-pointer hover-parent relative">
            <Link href={`/product-detail/${item._id}`}>
              <div className="hover-child-1">
                <Product
                  image={item.avatar}
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
      {data.length >= itemsPerPage && (
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
      )}
    </>
  );
}
