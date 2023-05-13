import Image from "next/image";
import React from "react";
import Stars from "./Stars";
const Comments = ({ listUserComment, isEditComment }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/uploadWithRefactorDB/";
  return (
    <div>
      {listUserComment?.length > 0 ? (
        <div className="flex-center flex-col gap-10">
          {listUserComment?.map((item, index) => (
            <>
              {index !== 0 && <hr className="w-full " />}

              <div className="w-full grid grid-cols-12 gap-3" key={index}>
                <div className="col-span-2 md:col-span-1 flex-center items-start">
                  <Image
                    src={
                      baseUrl + item?.picture === ""
                        ? item?.picture
                        : "/images/logo/admin.png"
                    }
                    className="rounded-full"
                    width={45}
                    height={45}
                  />
                </div>
                <div className="col-span-10 md:col-span-11 flex flex-col gap-1">
                  <span className="text-base font-bold ">{item?.name}</span>
                  <p className="text-xs text-gray-400">{item?.date}</p>
                  <Stars
                    stars={item.score}
                    className="w-4 h-4"
                    disabled={true}
                  />
                  <p className="pt-5">{item.comment}</p>
                </div>
              </div>
            </>
          ))}
        </div>
      ) : (
        <div>No reviews</div>
      )}
    </div>
  );
};

export default Comments;
