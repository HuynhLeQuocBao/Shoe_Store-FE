import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import LoadingPage from "../loading/LoadingPage";
import FsLightbox from "fslightbox-react";
import { useState, useEffect } from "react";
import PreviewImage from "../product/PreviewImage";

const CompareProduct = ({ product, onDelete, isDelete }) => {
  const [toggler, setToggler] = useState(false);
  const [productInfo, setProductInfo] = useState({
    colorCurrent: {},
    sizes: [],
    sizeCurrent: "",
    images: [],
    price: 0,
    amount: 0,
  });
  const baseURL = process.env.NEXT_PUBLIC_API_URL + "/uploadWithRefactorDB/";

  useEffect(() => {
    setProductInfo({
      colorCurrent: product?.color[0],
      sizes: product?.color[0]?.sizes,
      sizeCurrent: product?.color[0]?.sizes[0].sizeName,
      images: product?.color[0]?.images,
      price: product?.color[0]?.sizes[0].price,
      amount: product?.color[0]?.sizes[0].amount,
    });
  }, []);

  const handleCurrentProductInfo = ({ size, colorId }) => {
    if (colorId) {
      const index = product?.color.findIndex((e) => e.id === colorId);
      setProductInfo({
        colorCurrent: product?.color[index],
        sizes: product?.color[index]?.sizes,
        sizeCurrent: product?.color[index]?.sizes[0].sizeName,
        images: product?.color[index]?.images,
        price: product?.color[index]?.sizes[0].price,
        amount: product?.color[index]?.sizes[0].amount,
      });
    }
    if (size) {
      const index = productInfo.sizes.findIndex((e) => e.sizeName === size);
      setProductInfo({
        ...productInfo,
        sizeCurrent: size,
        price: productInfo.sizes[index].price,
        amount: productInfo.sizes[index].amount,
      });
    }
  };
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
        <div className="flex-col flex-center max-h-[288px] border-[1px] border-solid border-r-0">
          <div className="w-40 h-40 md:w-72 md:h-72 p-4 hover:cursor-zoom-in  ">
            <PreviewImage arrayImage={productInfo.images} index={0} />
          </div>
        </div>
        <div className="h-20 border-[1px] border-solid flex-center border-r-0 ">
          {product?.name}
        </div>
        <div className="h-28 border-[1px] border-solid flex-center border-r-0 flex-wrap gap-3">
          {product?.color?.map((color) => (
            <div key={color.id} className="w-10 h-10 md:w-20 md:h-20 relative">
              <Image
                className="flex-center hover:cursor-pointer w-10 h-10"
                onClick={() => handleCurrentProductInfo({ colorId: color.id })}
                src={baseURL + color?.avatar}
                layout="fill"
                alt="color"
              />
            </div>
          ))}
        </div>
        <div className="h-20 border-[1px] border-solid flex-center border-r-0">
          $ {productInfo?.price}
        </div>
        <div className="h-48 border-[1px] border-solid flex justify-center items-start xl:items-center border-r-0 p-2 overflow-y-auto">
          {product?.introduce}
        </div>
        <div className="h-20 border-[1px] border-solid flex-center border-r-0 flex-wrap gap-1">
          {product?.listAnotherCate?.map((brand, index) => (
            <div
              key={brand + index}
              className="h-8 flex-center bg-green-500 w-fit text-white px-2 py-1 md:px-4 md:py-2 rounded-2xl font-bold"
            >
              {brand}
            </div>
          ))}
        </div>
        <div className="h-20 border-[1px] border-solid flex-center border-r-0">
          {productInfo?.amount > 0 ? "In stock" : "Not available"}
        </div>
        <div className="h-28 border-[1px] border-solid flex-center border-r-0 flex-wrap gap-1">
          {productInfo.sizes.map((size, index) => (
            <div
              key={size.sizeName + index}
              className="h-8 w-8 flex-center bg-primary text-black font-bold cursor-pointer hover:text-white active:text-white hover:bg-teal-500 active:bg-teal-500"
              onClick={() => handleCurrentProductInfo({ size: size.sizeName })}
            >
              {size.sizeName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompareProduct;
