import Image from "next/image";
import React from "react";
import Stars from "./Stars";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Modal from "../modal/Modal";
import FormEditReviews from "./FormEditReviews";
const Comments = ({ listUserComment, shoeId }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [indexReviews, setIndexReviews] = useState();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/uploadWithRefactorDB/";
  const { data: session } = useSession();
  return (
    <div>
      {listUserComment?.length > 0 ? (
        <div className=" flex-center flex-col gap-10 border border-[#dee2e6] p-3 my-2 ">
          {listUserComment?.map((item, index) => (
            <>
              {index !== 0 && <hr className="w-full " />}
              <div
                className="relative w-full grid grid-cols-12 gap-3"
                key={index}
              >
                <div className="col-span-2 flex-center items-start">
                  <Image
                    src={
                      item?.picture !== ""
                        ? item?.picture
                        : "/images/logo/admin.png"
                    }
                    className="rounded-full"
                    width={100}
                    height={100}
                    alt="avatar"
                  />
                </div>
                <div className="col-span-6 flex flex-col gap-1">
                  <span className="text-base font-bold break-words overflow-hidden ">
                    {item?.name}
                  </span>
                  <p className="text-xs text-gray-400">{item?.date}</p>
                  <Stars
                    stars={
                      dataUpdate && dataUpdate?.index === index
                        ? dataUpdate.rating
                        : item.score
                    }
                    className="w-4 h-4"
                    disabled={true}
                  />
                  <p className="pt-5">
                    {dataUpdate && dataUpdate?.index === index
                      ? dataUpdate?.comment
                      : item.comment}
                  </p>
                </div>
                {listUserComment[index]?.userId == session?.user?._id && (
                  <button
                    className="absolute right-0 top-2 blue-button"
                    onClick={() => {
                      console.log(index);
                      setIsOpenModal(true);
                      setIndexReviews(index);
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            </>
          ))}
        </div>
      ) : (
        <div>No reviews</div>
      )}
      <Modal isVisible={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <FormEditReviews
          onBack={() => setIsOpenModal(false)}
          shoeId={shoeId}
          dataUpdate={(data) => setDataUpdate(data)}
          indexReview={indexReviews}
        />
      </Modal>
    </div>
  );
};

export default Comments;
