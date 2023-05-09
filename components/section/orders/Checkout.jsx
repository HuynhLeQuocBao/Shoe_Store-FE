/* This example requires Tailwind CSS v2.0+ */
import { Container } from "@/components/common";
import { useForm, Controller } from "react-hook-form";
import { cartApi } from "@/apiClient/cartAPI";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProgressCart } from ".";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { resetCart, updateTotalCart } from "store/features/cartSlice";
import { toast } from "react-toastify";
import LoadingPage from "../loading/LoadingPage";
import { VoucherList } from "./VoucherList";
import { PaymentList } from "./Payment";
import { voucherApi } from "@/apiClient/voucher";
import Modal from "../modal/Modal";
import Image from "next/image";
import LoadingPageComponent from "../loading/LoadingPageComponent";

export const Checkout = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const total = useSelector((state) => state.cart.total);
  const products = useSelector((state) => state.cart.products);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataVoucherInput, setDataVoucherInput] = useState("");
  const [voucherList, setVoucherList] = useState([]);
  const [voucherListSubmit, setVoucherListSubmit] = useState([]);
  const baseURL = process.env.NEXT_PUBLIC_API_URL + "/uploadWithRefactorDB/";
  const [discount, setDiscount] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
  });
  useEffect(() => {
    if (products.length === 0) {
      router.push("/shopping-cart");
    }
  }, []);

  const onSubmit = (data) => {
    setLoading(true);
    try {
      const fetchCheckoutCart = async () => {
        const result = await cartApi.checkoutCart({
          fullname: data.fullname,
          address: data.address,
          numberPhone: data.numberPhone,
          email: data.email,
          listPromoCode: voucherListSubmit,
        });

        if (result) {
          dispatch(resetCart());
          router.push("/order-complete");
        }
      };
      fetchCheckoutCart();
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleVoucher = async () => {
    if (dataVoucherInput.length === 0) {
      toast.warning("Please input your voucher!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (voucherList.includes(dataVoucherInput)) {
      toast.warning("Voucher already used!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const applyVoucher = await voucherApi.applyVoucher({
      cartTotal: total,
      listPromoCode: [dataVoucherInput.toUpperCase()],
    });

    if (applyVoucher && applyVoucher.message) {
      toast.warning(applyVoucher.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (applyVoucher) {
      toast.success("Use voucher successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(updateTotalCart({ total: applyVoucher.totalCart }));
      setDiscount(parseInt(applyVoucher.discount) + discount);
      setVoucherList([...voucherList, dataVoucherInput]);
      setVoucherListSubmit([...voucherListSubmit, dataVoucherInput]);
    }
  };

  return (
    <Container>
      <ProgressCart />
      <div className="w-full mt-10 mb-10">
        <LoadingPageComponent loading={loading} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4 w-full">
            <div className="h-fit col-span-12 lg:col-span-7 w-full bg-[#f5f5f5] p-4">
              <div className="font-bold text-2xl py-4 text-center">
                <h1>Billing Details</h1>
              </div>
              <div className="w-full my-2 grid grid-cols-12">
                <div className="col-span-12">
                  <Controller
                    control={control}
                    name="fullname"
                    render={({ field }) => (
                      <div className="col-span-6">
                        <label className="font-bold" htmlFor="fullname">
                          FULL NAME
                        </label>
                        <input
                          id="fullname"
                          placeholder="Full Name"
                          defaultValue={session?.user?.fullname}
                          className="w-full p-2 rounded-xl my-2"
                          {...register("fullname")}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="w-full my-2">
                <Controller
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <div>
                      <label className="font-bold" htmlFor="address">
                        ADDRESS
                      </label>
                      <input
                        id="address"
                        placeholder="Address"
                        defaultValue={session?.user?.address}
                        className="w-full p-2 rounded-xl my-2"
                        {...register("address")}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="w-full my-2">
                <Controller
                  control={control}
                  name="numberPhone"
                  render={({ field, value }) => (
                    <div>
                      <label className="font-bold" htmlFor="phone">
                        PHONE
                      </label>
                      <input
                        id="phone"
                        placeholder="Number Phone"
                        defaultValue={session?.user?.numberPhone}
                        className="w-full p-2 rounded-xl my-2"
                        {...register("numberPhone")}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="w-full my-2">
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <div>
                      <label className="font-bold" htmlFor="address">
                        EMAIL
                      </label>
                      <input
                        id="email"
                        name="email"
                        defaultValue={session?.user?.email}
                        placeholder="Email"
                        className="w-full p-2 rounded-xl my-2"
                        {...register("email")}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-col items-center justify-between">
              <div className="w-full p-4 bg-[#f5f5f5] font-medium mb-5">
                <div className="font-bold text-2xl py-4 text-center">
                  <h1>Payment Methods</h1>
                </div>
                <PaymentList />
              </div>
              <div className="w-full p-4 bg-[#f5f5f5] font-medium mb-5">
                <div className="w-full flex items-center justify-around pb-6">
                  <input
                    className="py-2 px-3 w-4/5"
                    type="text"
                    placeholder="Input your voucher..."
                    onChange={(e) => setDataVoucherInput(e.target.value)}
                    value={dataVoucherInput}
                  />
                  <a
                    type="button"
                    onClick={handleVoucher}
                    className="bg-primary hover:bg-secondary hover:text-white py-2 px-3 cursor-pointer"
                  >
                    Apply
                  </a>
                </div>
                <div className="border border-[0.5px] border-[#898787] w-full"></div>
                <div className="w-full mb-2">
                  <h2 className="text-center font-bold text-xl py-4">
                    Voucher Available
                  </h2>
                  <VoucherList
                    isCode={(discountVoucher, voucherCode) => {
                      setDiscount(parseInt(discountVoucher) + discount);
                      setVoucherListSubmit([...voucherListSubmit, voucherCode]);
                    }}
                  />
                </div>
              </div>
              <div className="w-full p-4 bg-[#f5f5f5] font-medium">
                <div className="font-bold text-2xl py-4 flex justify-between items-center">
                  <h1>Cart Total</h1>
                  <span
                    className="p-2 cursor-pointer hover:text-white bg-primary hover:bg-secondary text-base rounded-3xl"
                    type="button"
                    onClick={() => setOpenModal(true)}
                  >
                    View items
                  </span>
                </div>
                <div className="border-b-2 my-2 w-full flex">
                  <span className="w-[60%]">Discount </span>
                  <p className="w-[40%] text-sm">$ {discount}</p>
                </div>
                <div className="border-b-2 my-2 w-full flex">
                  <span className="w-[60%]">Shipping </span>
                  <p className="w-[40%] text-sm">$ 0</p>
                </div>
                <div className="border-b-2 my-2 w-full flex">
                  <span className="w-[60%]">Order Total: </span>
                  <p className="w-[40%] text-sm">$ {total}</p>
                </div>
                <button
                  type="submit"
                  className="py-2 my-2 rounded-2xl bg-green-400 cursor-pointer hover:bg-green-600 font-bold duration-500 hover:text-white w-full"
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Modal isVisible={openModal} onClose={() => setOpenModal(false)}>
        <div className="w-full">
          <div className="w-full bg-[#f0f0f0] py-3 font-semibold text-base rounded-3xl items-center justify-center uppercase grid grid-cols-12 mb-6">
            <div className="text-center col-span-4">
              <span>PRODUCT DETAILS</span>
            </div>
            <div className="text-center col-span-3">
              <span>PRICE</span>
            </div>
            <div className="text-center col-span-3">
              <span>SIZE</span>
            </div>
            <div className="text-center col-span-2">
              <span>QUANTITY</span>
            </div>
          </div>
          {products?.map((item) => {
            return (
              <div
                key={item}
                className="w-full text-sm grid grid-cols-12  border border-b-2 duration-500 py-1 mb-2"
              >
                <div className="text-center col-span-4 flex items-center justify-start">
                  <div className="flex justify-center items-center">
                    <Image
                      src={`${baseURL + item.image}`}
                      className="w-20 h-20 object-cover col-span-2"
                      layout="intrinsic"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="flex justify-center items-center col-span-2 ml-2">
                    <span>{item.name}</span>
                  </div>
                </div>
                <div className="text-center col-span-3 flex justify-center items-center">
                  <span>$ {item.price}</span>
                </div>
                <div className="text-center col-span-3 flex justify-center items-center">
                  <span>{item.size}</span>
                </div>
                <div className="col-span-2 text-center flex justify-center items-center">
                  <span>{item.quantityProduct}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </Container>
  );
};
