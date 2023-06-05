import React from "react";
import { useState } from "react";
import LoadingPageComponent from "../loading/LoadingPageComponent";
import { orderApi } from "@/apiClient/order";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Confirm = ({ onClose, id }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDeleteOrder = async () => {
    setLoading(true);
    try {
      await orderApi.deleteOrder(id);
      toast.success("Cancel successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        setLoading(false);
        onClose();
        router.push("/my-orders");
      }, 1500);
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };
  return (
    <div className="w-full">
      <LoadingPageComponent loading={loading} />
      <div className="flex flex-col ">
        <h1 className="px-2 text-lg my-5">Do you want to cancel your order?</h1>
        <div className="flex justify-end px-4 py-3 border-t border-zinc-300 gap-6">
          <button
            className="bg-white font-bold w-32 py-[5px] px-4 shadow-icon-product rounded-lg hover:bg-slate-200 duration-200 hover:cursor-pointer"
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white font-bold w-32 py-[5px] px-4 shadow-icon-product rounded-lg hover:bg-red-700 duration-200 hover:cursor-pointer"
            onClick={handleDeleteOrder}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
