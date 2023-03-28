import { useForm, Controller } from "react-hook-form";
import { cartApi } from "@/apiClient/cartAPI";
import { useState, useEffect } from "react";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  decreaseCartQuantity,
  increaseCartQuantity,
} from "store/features/cartSlice";

export function FormQuantity({ ...props }) {
  // const [quantity, setQuantity] = useState(props.quantity);
  const { cartId, productId, size, price, quantity } = props;
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
  });
  const handleSub = () => {
    dispatch(decreaseCartQuantity({ productId, size }));
  };
  const handleAdd = () => {
    dispatch(increaseCartQuantity({ productId, size }));
  };
  // const onSubmit = () => {
  //   const fetchUpdateCart = async () => {
  //     try {
  //       const result = await cartApi.updateCart(cartId, {
  //         productId: productId,
  //         quantity: quantity,
  //         size: size,
  //       });
  //       props.onTotal(true);
  //     } catch (error) {}
  //   };
  //   fetchUpdateCart();
  // };
  return (
    <>
      <form>
        <Controller
          control={control}
          name="quantity"
          render={({ field }) => (
            <div>
              <button
                className="border border-2 border-[#c5c3c3] shadow-lg w-8 h-8 hover:bg-primary hover:text-white cursor-pointer rounded-full duration-500 font-bold"
                onClick={handleSub}
              >
                <div className="flex justify-center items-center">
                  <HiMinusSm />
                </div>
              </button>
              <input
                className="w-10 h-10 text-center item-center bg-transparent"
                type="text"
                value={quantity}
                disabled={true}
              />
              <button
                className="border border-2 border-[#c5c3c3] shadow-lg w-8 h-8 hover:bg-primary hover:text-white cursor-pointer rounded-full duration-500 font-bold"
                onClick={handleAdd}
              >
                <div className="flex justify-center items-center">
                  <HiPlusSm />
                </div>
              </button>
            </div>
          )}
        />
      </form>
    </>
  );
}
