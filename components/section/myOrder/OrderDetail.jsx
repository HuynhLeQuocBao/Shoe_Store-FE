/* This example requires Tailwind CSS v2.0+ */
import { Container } from "@/components/common";
import { orderApi } from "@/apiClient/order";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProcessOrder } from "./ProcessOrder";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "../loading/LoadingPage";
import Modal from "../modal/Modal";
import Confirm from "./Confirm";
import OrderDetailItem from "./OrderDetailItem";

export function OrderDetail() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [stateOrder, setStateOrder] = useState();

  useEffect(() => {
    if (dataOrder.length > 0) {
      setIsLoading(false);
    }
    try {
      const fetchCart = async () => {
        const data = await orderApi.getOrderDetail(router.query.slug[0]);
        setDataOrder(data?.results);
        setSubTotal(data?.total);
        setIsLoading(false);
      };
      const fetchOrder = async () => {
        const getOrder = await orderApi.getAllOrder();
        getOrder.map((item) => {
          if (item._id === parseInt(router.query.slug)) {
            setStateOrder(item.status);
          }
        });
      };
      fetchOrder();
      fetchCart();
    } catch (error) {
      return toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [stateOrder]);
  const fetchConfirmOrder = async () => {
    try {
      await orderApi.confirmOrder(router.query.slug);
      setStateOrder(3);
      return toast.success("Confirm successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <Container>
      <div className="flex-center">
        <ProcessOrder status={stateOrder} />
      </div>
      <div className="hidden md:block w-full mb-10">
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
        </div>
        {dataOrder.length > 0 ? (
          dataOrder.map((item, index) => (
            <OrderDetailItem stateOrder={stateOrder} data={item} key={index} />
          ))
        ) : isLoading ? (
          <div className="flex-center h-24">
            <LoadingPage />
          </div>
        ) : (
          <div className="w-full text-sm border border-b-2 shadow-lg rounded-lg text-center duration-500 py-10 mb-2">
            No data
          </div>
        )}
      </div>
      <div className="w-full px-4 my-4 md:hidden">
        {dataOrder.length > 0 ? (
          dataOrder.map((item, index) => (
            <OrderDetailItem stateOrder={stateOrder} data={item} key={index} />
          ))
        ) : (
          <div className="md:hidden w-full text-center shadow-lg rounded-lg py-10">
            No data
          </div>
        )}
      </div>
      <div className="w-full grid grid-cols-12 ">
        <div className="md:col-span-8"></div>
        <div className="col-span-12 md:col-span-4 w-full shadow-lg">
          <div className="w-full bg-slate-200 p-4 rounded-lg">
            <div className="w-full mb-2 flex">
              <span className="w-[30%] flex justify-end">Subtotal: </span>
              <p className="w-[60%] pl-10">$ {subTotal}</p>
            </div>
            <div className="w-full mb-2 flex">
              <span className="w-[30%] flex justify-end">Shipping: </span>
              <p className="w-[60%] pl-10">$ 0</p>
            </div>
            <div className="border border-[0.5px] border-[#898787] w-full"></div>
            <div className="w-full mb-2 flex">
              <span className="w-[30%] flex justify-end">Total: </span>
              <p className="w-[60%] pl-10">$ {subTotal}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full my-10 flex justify-center md:justify-center items-center">
        {stateOrder === 0 ? (
          <button
            className="w-1/2 md:w-1/6 py-2 rounded-2xl bg-red-500 shadow-icon-product cursor-pointer hover:bg-red-700 font-bold duration-500 hover:text-white"
            onClick={() => setIsOpenModal(true)}
          >
            Cancel
          </button>
        ) : stateOrder === 2 ? (
          <button
            className="w-1/2 md:w-1/6 py-2 rounded-2xl bg-green-400 shadow-icon-product cursor-pointer hover:bg-green-600 font-bold duration-500 hover:text-white"
            onClick={fetchConfirmOrder}
          >
            Confirm
          </button>
        ) : null}
      </div>
      <Modal
        onClose={() => setIsOpenModal(false)}
        isVisible={isOpenModal}
        className="!max-h-[250px]"
      >
        <Confirm id={router.query.slug} onClose={() => setIsOpenModal(false)} />
      </Modal>
    </Container>
  );
}
