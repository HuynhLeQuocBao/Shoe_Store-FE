import { voucherApi } from "@/apiClient/voucher";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTotalCart } from "store/features/cartSlice";
import { toast } from "react-toastify";
import LoadingPageComponent from "../loading/LoadingPageComponent";

export function VoucherItem({ data, isCode }) {
  const total = useSelector((state) => state.cart.total);
  const [use, setUse] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const totalCartStorage = localStorage.getItem("totalCart");
    if (!totalCartStorage) {
      return;
    }
    dispatch(updateTotalCart({ total: parseFloat(totalCartStorage) }));
    localStorage.removeItem("totalCart");
  }, []);

  const handleVoucher = async (e, voucherCode, discount) => {
    const totalCartStorage = localStorage.getItem("totalCart");
    if (!totalCartStorage) {
      localStorage.setItem("totalCart", total);
    }
    e.preventDefault();
    setLoading(true);
    if (!use) {
      const applyVoucher = await voucherApi.applyVoucher({
        cartTotal: total,
        listPromoCode: [voucherCode],
      });
      if (applyVoucher?.discount) {
        dispatch(updateTotalCart({ total: applyVoucher.totalCart }));
        isCode(discount, voucherCode);
        setUse(!use);
      } else {
        toast.error(applyVoucher.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setLoading(false);
    } else {
      dispatch(updateTotalCart({ total: total + discount }));
      isCode(-discount, voucherCode);
      setUse(!use);
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-between bg-white py-2 px-3 rounded">
      <LoadingPageComponent loading={loading} />
      <div className="flex flex-col">
        <p className="font-bold text-lg">Discount: $ {data.discount}</p>
        <p className="text-base">{data.description}</p>
        <p className="text-red-500 text-sm font-bold">
          <i>End date: {data.endDate.slice(0, 10)}</i>
        </p>
      </div>
      <div>
        <button
          onClick={(e) => handleVoucher(e, data.code, data.discount)}
          className={` disabled:opacity-60 disabled:cursor-default disabled:hover:bg-primary disabled:hover:text-black hover duration-200 rounded-sm p-2 ${
            !use
              ? "bg-primary hover:bg-teal-600 hover:text-white"
              : "bg-red-600 hover:bg-red-400 text-white"
          }`}
          disabled={total === 0 && !use}
        >
          {!use ? "Apply" : "Cancel"}
        </button>
      </div>
    </div>
  );
}

export function VoucherList({ isCode }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const fechPublic = async () => {
        const dataVoucher = await voucherApi.getAllVouchers();
        setData(dataVoucher);
      };
      fechPublic();
    } catch (error) {
      console.log("Error");
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 max-h-52 overflow-y-auto">
      {data?.listPromotion?.map((item) => (
        <VoucherItem
          key={item.code}
          data={item}
          isCode={(discount, voucherCode) => {
            isCode(discount, voucherCode);
          }}
        />
      ))}
    </div>
  );
}
