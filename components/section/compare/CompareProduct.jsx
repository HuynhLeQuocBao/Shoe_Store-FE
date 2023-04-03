import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";

const CompareProduct = ({ product, onDelete, isDelete }) => {
  return (
    <div className="col-span-4 border-[1px] border-solid">
      <div className="flex flex-col">
        <div className="h-10 flex justify-end items-center pr-4 ">
          {isDelete && (
            <div
              className="w-7 h-7 flex-center rounded-full font-bold hover:bg-red-500 hover:cursor-pointer text-red-500 hover:text-white border-2 border-red-500 border-solid"
              onClick={() => onDelete()}
            >
              <AiOutlineDelete />
            </div>
          )}
        </div>
        <div className="flex-col flex-center gap-5 max-h-[288px] border-[1px] border-solid border-r-0">
          <div className="w-72 h-72 p-4">
            <Image
              src={`http://localhost:3010/upload/${product?.shoeDetail?.arrayImage[0]?.filename}`}
              alt="image product"
              objectFit="cover"
              layout="responsive"
              width={200}
              height={200}
              priority={true}
            />
          </div>
        </div>
        <div className="h-20 border-[1px] border-solid flex-center border-r-0 ">
          name
        </div>
        <div className="h-20 border-[1px] border-solid flex-center border-r-0">
          price
        </div>
        <div className="h-20 border-[1px] border-solid flex-center border-r-0">
          amount
        </div>
        <div className="h-20 border-[1px] border-solid flex-center border-r-0">
          color
        </div>
        <div className="h-20 border-[1px] border-solid flex-center border-r-0">
          size
        </div>
        <div className="h-20 border-[1px] border-solid flex-center border-r-0">
          description
        </div>
        <div className="h-20 border-[1px] border-solid flex-center border-r-0">
          brand
        </div>
      </div>
    </div>
  );
};

export default CompareProduct;
