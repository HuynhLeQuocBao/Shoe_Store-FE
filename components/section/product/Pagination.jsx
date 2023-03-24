import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useRouter } from "next/router";
import Link from "next/link";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Product } from './Product';
import { convertCurrency } from "@/utils/currency";

export function Pagination({ ...props }) {
    const { data, itemsPerPage } = props;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
        if(router.pathname !== "/") {
            window.scroll({
                top: 920,
                behavior: 'smooth'
            });
        }
        else {
            window.scroll({
                top: 1400,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <div className={`grid grid-cols-1 ${router.pathname !== "/" ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-3 xl:grid-cols-4"} md:gap-8 pb-14`}>
                {currentItems.map((item) => (
                    <Link key={item._id} href={`/product-detail/${item._id}`}>
                        <div className="cursor-pointer">
                            <Product
                                image={item.arrayImage[0].filename}
                                name={item.name}
                                price={item.price}
                            />
                        </div>
                    </Link>
                ))}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel= {<MdNavigateNext/>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel={<MdNavigateBefore/>}
                renderOnZeroPageCount={null}
                containerClassName="w-full flex justify-center items-center mb-8 gap-4 py-2"
                pageLinkClassName="px-4 py-2 cursor-pointer rounded font-normal hover:bg-primary hover:text-white"
                previousLinkClassName="px-4 py-2 cursor-pointer rounded font-normal hover:text-primary text-xl"
                nextLinkClassName="px-4 py-2 cursor-pointer rounded font-normal hover:text-primary text-xl"
                activeLinkClassName="bg-primary text-white"
            />
        </>
    );
}