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
import { VoucherList } from "./VoucherList";
import { PaymentList } from "./Payment";
import { voucherApi } from "@/apiClient/voucher";
import Modal from "../modal/Modal";
import LoadingPageComponent from "../loading/LoadingPageComponent";
import ViewItemCheckout from "./ViewItemCheckout";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const isVNMobilePhone =
  /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;

const schema = yup.object().shape({
  fullname: yup.string().required("This field is required"),

  email: yup
    .string()
    .email("Email is not valid")
    .required("This field is required"),

  address: yup.string().required("This field is required"),

  numberPhone: yup
    .string()
    .required("This field is required")
    .matches(isVNMobilePhone, "Phone number is not valid"),
  paymentMethod: yup
    .string()
    .nullable("This field is required")
    .required("This field is required"),
});

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
  const [discount, setDiscount] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    try {
      const fetchCheckoutCart = async () => {
        const dataCheckout = {
          fullname: data.fullname,
          address: data.address,
          numberPhone: data.numberPhone,
          email: data.email,
          listPromoCode: voucherListSubmit,
        };
        let result;
        if (data.paymentMethod === "Ship COD") {
          result = await cartApi.checkoutCart(dataCheckout);
        } else {
          result = await cartApi.checkoutPaypal(dataCheckout);
        }
        if (result?.url) {
          window.location.href = result.url;
        } else if (result?.message !== "Checkout success") {
          toast.warning(result.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoading(false);
        } else if (result) {
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
                          className={`w-full p-2 outline-none rounded-xl my-2 ${
                            errors && errors.fullname && "border-red-500 border"
                          }`}
                          {...register("fullname")}
                        />
                        {errors && errors.fullname && (
                          <span className="text-red-500">
                            {errors.fullname.message}
                          </span>
                        )}
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
                        className={`w-full p-2 outline-none rounded-xl my-2 ${
                          errors && errors.address && "border-red-500 border"
                        }`}
                        {...register("address")}
                      />
                      {errors && errors.address && (
                        <span className="text-red-500">
                          {errors.address.message}
                        </span>
                      )}
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
                        className={`w-full p-2 outline-none rounded-xl my-2 ${
                          errors &&
                          errors.numberPhone &&
                          "border-red-500 border"
                        }`}
                        {...register("numberPhone")}
                      />
                      {errors && errors.numberPhone && (
                        <span className="text-red-500">
                          {errors.numberPhone.message}
                        </span>
                      )}
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
                        className={`w-full p-2 outline-none rounded-xl my-2 ${
                          errors && errors.email && "border-red-500 border"
                        }`}
                        {...register("email")}
                      />
                      {errors && errors.email && (
                        <span className="text-red-500">
                          {errors.email.message}
                        </span>
                      )}
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
                <PaymentList
                  paymentMethod={(method) => setValue("paymentMethod", method)}
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="w-full p-4 bg-[#f5f5f5] font-medium mb-5">
                <div className="w-full mb-2">
                  <h2 className="text-center font-bold text-2xl py-4">
                    Voucher Available
                  </h2>
                  <VoucherList
                    isCode={(discountVoucher, voucherCode) => {
                      setDiscount(parseInt(discountVoucher) + discount);
                      if (discountVoucher < 0) {
                        setVoucherListSubmit((prev) =>
                          prev.filter((voucher) => voucher !== voucherCode)
                        );
                      } else {
                        setVoucherListSubmit([
                          ...voucherListSubmit,
                          voucherCode,
                        ]);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="w-full p-4 bg-[#f5f5f5] font-medium">
                <div className="font-bold text-2xl py-4 flex justify-between items-center">
                  <h1>Cart Total</h1>
                  <span
                    className="p-2 cursor-pointer hover:text-white bg-primary hover:bg-teal-600 text-base rounded-3xl"
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
        <ViewItemCheckout data={products} />
      </Modal>
    </Container>
  );
};
