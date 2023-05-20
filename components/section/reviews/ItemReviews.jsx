import moment from "moment/moment";
import Image from "next/image";
import Stars from "./Stars";

const ItemReviews = ({ data, isEdit }) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL + "/uploadWithRefactorDB/";
  return (
    <div className="w-full grid grid-cols-10 gap-3">
      <div className="col-span-3 md:col-span-1 ">
        <Image
          src={baseURL + data.image}
          width={90}
          height={90}
          blurDataURL={baseURL + data.image}
          placeholder="blur"
          alt="review"
        />
      </div>
      <div className="col-span-7 md:col-span-9  flex flex-col gap-1">
        <span className="text-base font-bold ">{data?.productName}</span>
        <p className="text-xs text-gray-400">
          {moment(data?.updatedAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}
        </p>
        {isEdit && (
          <>
            <Stars stars={data?.rateScore} />
            <p className="pt-5">{data.comment}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemReviews;
