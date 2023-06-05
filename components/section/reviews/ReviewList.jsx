import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ItemReviews from "./ItemReviews";
import { orderApi } from "@/apiClient/order";
import LoadingPage from "../loading/LoadingPage";
import FormEditReviews from "./FormEditReviews";
import { HiPencilAlt } from "react-icons/hi";

const ReviewList = ({ id, onClose, isEdit }) => {
  const [orderDetail, setOrderDetail] = useState([]);
  const [edit, setEdit] = useState(false);
  const [productId, setProductId] = useState(false);

  const fetchOrderDetail = async () => {
    try {
      const data = await orderApi.getOrderDetail(id);
      setOrderDetail(data.results);
    } catch (error) {
      onClose();
      console.log("getRate error: " + error);
    }
  };
  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const handleDataUpdate = (data) => {
    const dataChange = orderDetail.map((item) => {
      if (item.shoeId === data.shoeId) {
        return {
          ...item,
          rateScore: data.rating,
          comment: data.comment,
        };
      }
      return item;
    });
    setOrderDetail(dataChange);
  };
  return (
    <div className="h-full w-full ">
      {orderDetail.length === 0 ? (
        <div className="flex-center h-full">
          <LoadingPage />
        </div>
      ) : (
        <div className=" h-full w-full">
          <div className={`h-full ${!edit && "pb-20 overflow-y-auto"}`}>
            {!edit ? (
              orderDetail.map((item, index) => (
                <>
                  <div className="flex-center items-center p-2">
                    <ItemReviews data={item} isEdit={true} key={index} />
                    <div
                      className="hidden md:flex justify-end items-start hover:cursor-pointer"
                      onClick={() => {
                        setEdit(true);
                        isEdit(true);
                        setProductId(item.shoeId);
                      }}
                    >
                      <HiPencilAlt className="w-6 h-6" />
                    </div>
                    <div
                      className="md:hidden flex justify-end items-start hover:cursor-pointer"
                      onClick={() => {
                        setEdit(true);
                        isEdit(true);
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
                onBack={() => {
                  setEdit(false);
                  isEdit(false);
                }}
                dataUpdate={handleDataUpdate}
              />
            )}
          </div>
          {!edit && (
            <div className="sticky bg-white bottom-10 md:bottom-0 justify-end shadow-top px-4 py-4 gap-6">
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
