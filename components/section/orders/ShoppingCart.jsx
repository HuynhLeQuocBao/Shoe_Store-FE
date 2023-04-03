/* This example requires Tailwind CSS v2.0+ */
import { Container } from "@/components/common";
import { useForm, Controller } from "react-hook-form";
import { cartApi } from "@/apiClient/cartAPI";
import { useState, useEffect } from "react";
import { FormQuantity } from "./FormQuantity";
import Link from "next/link";
import { ProgressCart } from "./ProgressCart";
import { HiMinusSm, HiOutlineX, HiPlusSm } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  decreaseCartQuantity,
  deleteProductFormCart,
  increaseCartQuantity,
} from "store/features/cartSlice";
import LoadingPage from "../loading/LoadingPage";

export function ShoppingCart() {
  const [totalItem, setTotalItem] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const cartList = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  const handleDeleteCartItem = async (id) => {
    try {
      const result = await cartApi.deleteCart(id);
      if (result) {
        toast.success(
          "Product has been successfully removed from your shopping cart ",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        dispatch(deleteProductFormCart({ cartId: id }));
      }
    } catch (error) {}
  };

  const handleIncrease = async (cartId, productId, size, quantity) => {
    try {
      const result = await cartApi.updateCart(cartId, {
        productId: productId,
        quantity: quantity + 1,
        size,
      });
      if (result) {
        dispatch(
          increaseCartQuantity({
            productId: productId,
            size,
          })
        );
      }
      props.onTotal(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecrease = async (cartId, productId, size, quantity) => {
    if (quantity === 1) return;
    try {
      const result = await cartApi.updateCart(cartId, {
        productId: productId,
        quantity: quantity - 1,
        size,
      });
      if (result) {
        dispatch(
          decreaseCartQuantity({
            productId: productId,
            size,
          })
        );
      }
      props.onTotal(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <ProgressCart />
      <div className="hidden md:block w-full mt-32 mb-10">
        <div className="w-full bg-[#f0f0f0] py-3 font-semibold text-base rounded-3xl items-center justify-center uppercase grid grid-cols-12 mb-6 shadow-lg">
          <div className="text-center col-span-5">
            <span>PRODUCT DETAILS</span>
          </div>
          <div className="text-center col-span-1">
            <span>PRICE</span>
          </div>
          <div className="text-center col-span-1">
            <span>SIZE</span>
          </div>
          <div className="text-center col-span-2">
            <span>QUANTITY</span>
          </div>
          <div className="col-span-1  text-center">
            <span>TOTAL</span>
          </div>
          <div className="text-center col-span-2">
            <span>REMOVE</span>
          </div>
        </div>
        {!cartList && <LoadingPage />}
        {cartList?.length > 0 ? (
          cartList.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full text-sm grid grid-cols-12  border border-b-2 shadow-lg rounded-lg hover:bg-zinc-100 duration-500 py-1 mb-2"
              >
                <div className=" font-medium col-span-5 flex justify-start items-center py-2 pl-2">
                  <img
                    src={`http://localhost:3010/upload/${item.image}`}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="ml-2">
                    <span>{item.name}</span>
                  </div>
                </div>
                <div className="text-center col-span-1 flex justify-center items-center">
                  <span>${item.price}</span>
                </div>
                <div className="text-center col-span-1 flex justify-center items-center">
                  <span>{item.size}</span>
                </div>
                <div className="text-center col-span-2 flex justify-center items-center">
                  <div>
                    <button
                      className="border border-2 border-[#c5c3c3] shadow-lg w-8 h-8 hover:bg-primary hover:text-white cursor-pointer rounded-full duration-500 font-bold"
                      onClick={() =>
                        handleDecrease(
                          item.cartId,
                          item.productId,
                          item.size,
                          item.quantityProduct
                        )
                      }
                    >
                      <div className="flex justify-center items-center">
                        <HiMinusSm />
                      </div>
                    </button>
                    <input
                      className="w-10 h-10 text-center item-center bg-transparent"
                      type="text"
                      value={item.quantityProduct}
                      disabled={true}
                    />
                    <button
                      className="border border-2 border-[#c5c3c3] shadow-lg w-8 h-8 hover:bg-primary hover:text-white cursor-pointer rounded-full duration-500 font-bold"
                      onClick={() =>
                        handleIncrease(
                          item.cartId,
                          item.productId,
                          item.size,
                          item.quantityProduct
                        )
                      }
                    >
                      <div className="flex justify-center items-center">
                        <HiPlusSm />
                      </div>
                    </button>
                  </div>
                </div>
                <div className="col-span-1  text-center flex justify-center items-center">
                  <span>${item.totalProduct}</span>
                </div>
                <div className="text-center col-span-2 flex justify-center items-center pr-2">
                  <button
                    className="text-blue-500 hover:text-blue-800 cursor-pointer"
                    onClick={() => handleDeleteCartItem(item.cartId)}
                  >
                    <div className="w-8 h-8 border border-2 border-[#c5c3c3] shadow-lg font-bold hover:bg-red-500 hover:text-white flex justify-center items-center duration-500 rounded-full">
                      <HiOutlineX />
                    </div>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full text-sm border border-b-2 shadow-lg rounded-lg text-center duration-500 py-10 mb-2">
            No data
          </div>
        )}
      </div>
      <div className="w-full px-4 my-32 md:hidden">
        {cartList?.length > 0 ? (
          cartList.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full grid grid-cols-12 mb-5 shadow-lg rounded-lg py-2"
              >
                <div className="w-full flex items-center col-span-4">
                  <img
                    src={`http://localhost:3010/upload/${item.image}`}
                    className="w-30 h-30 object-cover p-2 "
                  />
                </div>

                <div className="col-span-6 px-2">
                  <div className="w-full font-bold ">
                    <span>Name: {item.name}</span>
                  </div>
                  <div className="w-full font-bold text-red-500">
                    <span>Price: ${item.price}</span>
                  </div>
                  <div className="w-full font-bold ">
                    <span>Size: {item.size}</span>
                  </div>
                  <div className="w-full">
                    <div>
                      <button
                        className="border border-2 border-[#c5c3c3] shadow-lg w-8 h-8 hover:bg-primary hover:text-white cursor-pointer rounded-full duration-500 font-bold"
                        onClick={() =>
                          handleDecrease(
                            item.cartId,
                            item.productId,
                            item.size,
                            item.quantityProduct
                          )
                        }
                      >
                        <div className="flex justify-center items-center">
                          <HiMinusSm />
                        </div>
                      </button>
                      <input
                        className="w-10 h-10 text-center item-center bg-transparent"
                        type="text"
                        value={item.quantityProduct}
                        disabled={true}
                      />
                      <button
                        className="border border-2 border-[#c5c3c3] shadow-lg w-8 h-8 hover:bg-primary hover:text-white cursor-pointer rounded-full duration-500 font-bold"
                        onClick={() =>
                          handleIncrease(
                            item.cartId,
                            item.productId,
                            item.size,
                            item.quantityProduct
                          )
                        }
                      >
                        <div className="flex justify-center items-center">
                          <HiPlusSm />
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="w-full font-bold">
                    <span>Total: ${item.totalProduct}</span>
                  </div>
                </div>
                <div className="col-span-2 flex justify-center items-center">
                  <button
                    className="w-10 h-10 cursor-pointer"
                    onClick={() => handleDeleteCartItem(item.cartId)}
                  >
                    <div className="w-8 h-8 border border-2 border-[#c5c3c3] shadow-lg font-bold hover:bg-red-500 hover:text-white flex justify-center items-center duration-500 rounded-full">
                      <HiOutlineX />
                    </div>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full text-center shadow-lg rounded-lg py-10">
            No data
          </div>
        )}
      </div>
      <div className="w-full grid grid-cols-12">
        <div className="md:col-span-8"></div>
        <div className="col-span-12 md:col-span-4 w-full shadow-lg">
          <div className="w-full bg-slate-200 p-4  rounded-lg ">
            <div className="w-full mb-2 flex">
              <span className="w-[30%] flex justify-end">Subtotal: </span>
              <p className="w-[60%] pl-10">$ {subTotal}</p>
            </div>
            <div className="w-full mb-2 flex">
              <span className="w-[30%] flex justify-end">Delivery: </span>
              <p className="w-[60%] pl-10">$ 0</p>
            </div>
            <div className="border border-[0.5px] border-[#898787] w-full"></div>
            <div className="w-full mb-2 flex">
              <span className="w-[30%] flex justify-end">Total: </span>
              <p className="w-[60%] pl-10">$ {total}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full my-10 flex justify-center items-center">
        <Link href="/checkout">
          <button className="w-1/2 md:w-1/6 py-2 rounded-2xl bg-green-400 cursor-pointer hover:bg-green-600 font-bold duration-500 hover:text-white">
            Checkout
          </button>
        </Link>
      </div>
    </Container>
  );
}
