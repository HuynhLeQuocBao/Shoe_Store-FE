import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import LoadingPage from "../loading/LoadingPage";
import FsLightbox from "fslightbox-react";
import { useState } from "react";

const CompareProduct = ({ product, onDelete, isDelete }) => {
  const [toggler, setToggler] = useState(false);
  return (
    <div className="col-span-5 md:col-span-4 border-[1px] border-solid">
      <div className="flex flex-col text-xs md:text-base">
        <div className="h-10 flex justify-end items-center pr-4 ">
          {isDelete && (
            <div
              className="w-7 h-7 hover:scale-125 duration-200 flex-center rounded-full font-bold hover:bg-red-500 hover:cursor-pointer text-red-500 hover:text-white border-2 border-red-500 border-solid"
              onClick={() => onDelete()}
            >
              <AiOutlineDelete />
            </div>
          )}
        </div>
        <div className="flex-col flex-center gap-5 max-h-[288px] border-[1px] border-solid border-r-0">
          <div className="w-40 h-40 md:w-72 md:h-72 p-4 hover:cursor-zoom-in  ">
            <Image
              src={`https://shoe-store-be.onrender.com/upload/${product?.shoeDetail?.arrayImage[0]?.filename}`}
              alt="image product"
              className="hover:opacity-70"
              objectFit="cover"
              layout="responsive"
              width={200}
              height={200}
              priority={true}
              onClick={() => setToggler(!toggler)}
            />
            <FsLightbox
              toggler={toggler}
              sources={[
                `https://shoe-store-be.onrender.com/upload/${product?.shoeDetail?.arrayImage[0]?.filename}`,
              ]}
            />
          </div>
        </div>
        <div className="h-20 border-[1px] border-solid flex-center border-r-0 ">
          {product?.shoeDetail?.name}
        </div>
        <div className="h-20 border-[1px] border-solid flex-center border-r-0">
          {product?.shoeDetail?.price}
        </div>
        <div className="h-20 border-[1px] border-solid flex-center border-r-0">
          {product?.totalAmount}
        </div>
        <div className="h-28 border-[1px] border-solid flex-center border-r-0 flex-wrap gap-1">
          {product?.listCateSize?.map((size, index) => (
            <div key={index} className="h-8 w-8 flex-center bg-primary ">
              {size}
            </div>
          ))}
        </div>
        <div className="h-20 border-[1px] border-solid flex-center border-r-0">
          {product?.shoeDetail?.description}
        </div>
        <div className="h-20 border-[1px] border-solid flex-center border-r-0 flex-wrap gap-1">
          {product?.listAnotherCate?.map((brand, index) => (
            <div
              key={index}
              className="h-8 flex-center bg-green-500 w-fit text-white px-2 py-1 md:px-4 md:py-2 rounded-2xl font-bold"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompareProduct;
