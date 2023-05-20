import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ItemReviews from "./ItemReviews";
import { orderApi } from "@/apiClient/order";
import LoadingPage from "../loading/LoadingPage";
import FormEditReviews from "./FormEditReviews";
import { HiPencilAlt } from "react-icons/hi";

const ReviewList = ({ id, onClose }) => {
  const [orderDetail, setOrderDetail] = useState([]);
  const [edit, setEdit] = useState(false);
  const [productId, setProductId] = useState(false);
  useEffect(() => {
    let data;
    const fetchOrderDetail = async () => {
      try {
        data = await orderApi.getOrderDetail(id);
        setOrderDetail(data.results);
      } catch (error) {
        onClose();
        console.log("getRate error: " + error);
      }
    };
    fetchOrderDetail();
  }, [id]);
  return (
    <div className="h-full relative">
      {orderDetail.length === 0 ? (
        <div className="flex-center h-full">
          <LoadingPage />
        </div>
      ) : (
        <div className=" h-full">
          <div className="sticky h-[10%] w-full bg-white  top-0 shadow-md z-10">
            <h1 className="flex items-center justify-center font-bold font-bold text-[22px] mb-4">
              {edit ? "Edit Reviews" : "Reviews"}
            </h1>
          </div>
          <div className={`${edit ? "h-[80%]" : "h-[80%] overflow-y-scroll"} `}>
            {!edit ? (
              orderDetail.map((item, index) => (
                <>
                  <div className="flex-center items-center p-2">
                    <ItemReviews data={item} isEdit={true} key={index} />
                    <div
                      className="hidden md:flex justify-end items-start hover:cursor-pointer"
                      onClick={() => {
                        setEdit(true);
                        setProductId(item.shoeId);
                      }}
                    >
                      <HiPencilAlt className="w-6 h-6" />
                    </div>
                    <div
                      className="md:hidden flex justify-end items-start hover:cursor-pointer"
                      onClick={() => {
                        setEdit(true);
                        setProductId(item.shoeId);
                      }}
                    >
                      <HiPencilAlt />
                    </div>
                  </div>
                  <hr />
                </>
              ))
            ) : (
              <FormEditReviews
                shoeId={productId}
                onBack={() => setEdit(false)}
                dataUpdate={() => null}
              />
            )}
          </div>
          {!edit && (
            <div className="sticky bg-white bottom-0 justify-end shadow-top px-4 py-4 gap-6">
              <div className="flex justify-end md:px-4 gap-6">
                <button
                  className="bg-cyan-600 text-white font-bold w-32 py-[5px] px-4 shadow-icon-product rounded-lg hover:bg-cyan-800 duration-200 hover:cursor-pointer"
                  onClick={() => onClose()}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
