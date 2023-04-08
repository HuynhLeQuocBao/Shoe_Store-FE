import { voucherApi } from "@/apiClient/voucher";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCheck } from "react-icons/ai";
import { updateTotalCart } from "store/features/cartSlice";
import { toast } from "react-toastify";

export function VoucherItem({ data, isCode }) {
  const total = useSelector((state) => state.cart.total);
  const [use, setUse] = useState(false);
  const dispatch = useDispatch();
  const handleVoucher = async (voucherCode, discount) => {
    toast.success("Use voucher successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setUse(true);
    isCode(discount, voucherCode);

    const applyVoucher = await voucherApi.applyVoucher({
      cartTotal: total,
      listPromoCode: [code],
    });
    dispatch(updateTotalCart({ total: applyVoucher.totalCart }));
  };

  return (
    <div className="w-3/4 flex items-center justify-between bg-white py-2 px-5 rounded">
      <div className="flex flex-col">
        <p className="font-bold text-xl">Discount: {data.discount}%</p>
        <p className="text-lg">{data.description}</p>
        <p className="text-red-500 text-sm font-bold">
          <i>End date: {data.endDate.slice(0, 10)}</i>
        </p>
      </div>
      <div>
        <button
          onClick={() => handleVoucher(data.code, data.discount)}
          className="bg-primary disabled:bg-green-500 hover:bg-secondary hover:text-white disabled:text-white p-2"
          disabled={use}
        >
          {!use ? "Apply" : <AiOutlineCheck />}
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
