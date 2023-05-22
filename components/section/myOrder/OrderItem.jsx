import React from "react";
import { useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import Modal from "../modal/Modal";
import FormRatingAndComment from "../reviews/FormAddReviews";
import { useEffect } from "react";
import Link from "next/link";
import ReviewList from "../reviews/ReviewList";
import moment from "moment/moment";

const OrderItem = ({ data, stateOrder, index }) => {
  const [isRated, setIsRated] = useState();
  const [isOpenModalReviews, setIsOpenModalReviews] = useState(false);
  const [orderId, setOrderId] = useState();
  const [checkAddReview, setCheckAddReviews] = useState();
  const changeState = (state) => {
    if (state === 0) {
      return "pending";
    } else if (state === 1) {
      return "confirmed";
    } else if (state === 2) {
      return "In transit";
    } else if (state === 3) {
      return "complete";
    }
  };
  useEffect(() => {
    if (checkAddReview) setIsRated(true);
  }, [checkAddReview]);
  return (
    <div className="px-4 md:px-0">
      <div className="w-full text-sm hidden md:grid grid-cols-12  border border-b-2 shadow-lg rounded-3xl duration-500 py-3 mb-2">
        <div className="text-center col-span-1 flex justify-center items-center">
          <span>{index + 1}</span>
        </div>
        <div className="text-center text-sm col-span-3 flex justify-center items-center">
          <div
            className={`            
                ${
                  data.status === 0
                    ? "bg-orange-400"
                    : data.status === 1
                    ? "bg-green-400"
                    : data.status === 2
                    ? "bg-slate-400"
                    : "bg-blue-400"
                }
                w-fit py-1 px-2 md:px-4 rounded-2xl uppercase text-white font-bold
            `}
          >
            {changeState(data.status)}
          </div>
        </div>
        <div className="text-center col-span-2 flex justify-center items-center">
          <span>$ {data.total}</span>
        </div>
        <div className="col-span-3 md:col-span-2 text-center flex justify-center items-center">
          <span>
            {moment(data?.updatedAt).format("dddd, MMMM Do YYYY, h:mm:ss")}
          </span>
        </div>
        <div className="col-span-2  flex justify-center items-center">
          <button
            className="blue-button"
            onClick={() => {
              setIsOpenModalReviews(true);
              if (!isRated && !checkAddReview) {
                setIsRated(data?.isRated);
              }

              setOrderId(data._id);
            }}
            disabled={data.status !== 3}
          >
            {isRated ? "Edit" : data.isRated ? "Edit" : "Reviews"}
          </button>
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center md:justify-end items-center  md:pr-14">
          <Link href={`/order-detail/${data._id}`}>
            <div>
              <HiOutlineChevronRight className=" w-11 h-11 p-2 text-gray-700 rounded-full  hover:bg-slate-300 hover:cursor-pointer duration-200" />
            </div>
          </Link>
        </div>
      </div>
      <div className="bg-slate-100 w-full h-full flex md:hidden flex-col shadow-lg py-2 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div className="pl-2 h-full">
            <div
              className={`    
                ${
                  data.status === 0
                    ? "bg-orange-400"
                    : data.status === 1
                    ? "bg-green-400"
                    : data.status === 2
                    ? "bg-slate-400"
                    : "bg-blue-400"
                }
                uppercase text-white font-bold flex items-center justify-center py-2 px-3 rounded-lg items-start
            `}
            >
              {changeState(data.status)}
            </div>
          </div>
          <div className="flex flex-col gap-2 px-5">
            <div className="">
              <b>Total: </b>
              {data.total}
            </div>
            <span className="">
              <b>Date: </b>
              {moment(data?.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
            </span>
            <button
              className="blue-button px-5"
              onClick={() => {
                setIsOpenModalReviews(true);
                if (!isRated && !checkAddReview) {
                  setIsRated(data?.isRated);
                }

                setOrderId(data._id);
              }}
              disabled={data.status !== 3}
            >
              {isRated
                ? "Edit Reviews"
                : data.isRated
                ? "Edit Reviews"
                : "Reviews"}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <Link href={`/order-detail/${data._id}`}>
              <div>
                <HiOutlineChevronRight className=" w-11 h-11 p-2 text-gray-700 rounded-full  hover:bg-slate-300 hover:cursor-pointer duration-200" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Modal
        onClose={() => setIsOpenModalReviews(false)}
        isVisible={isOpenModalReviews}
      >
        {isRated ? (
          <ReviewList
            id={orderId}
            onClose={() => setIsOpenModalReviews(false)}
          />
        ) : (
          <FormRatingAndComment
            id={orderId}
            onClose={() => setIsOpenModalReviews(false)}
            isEdit={isRated}
            setEdit={() => setCheckAddReviews(true)}
          />
        )}
      </Modal>
    </div>
  );
};

export default OrderItem;
