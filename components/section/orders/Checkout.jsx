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
import { voucherApi } from "@/apiClient/voucher";
import Modal from "../modal/Modal";

export const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const total = useSelector((state) => state.cart.total);
  const products = useSelector((state) => state.cart.products);
  const { data: session } = useSession();
  const [fullname, setFullname] = useState(session?.user?.fullname);
  const [address, setAddress] = useState(session?.user?.address);
  const [numberphone, setNumberPhone] = useState(session?.user?.numberPhone);
  const [email, setEmail] = useState(session?.user?.email);
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
      setVoucher(parseInt(applyVoucher.discount) + voucher);
      setVoucherList([...voucherList, dataVoucherInput]);
      setVoucherListSubmit([...voucherListSubmit, dataVoucherInput]);
    }
  };

  return (
    <Container>
      <ProgressCart />
      <div className="w-full mt-32 mb-10 relative">
        {loading && (
          <div className="w-full h-full flex justify-center items-center absolute bg-opacity-20 bg-slate-400 top-0 left-0">
            <LoadingPage />
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4 w-full">
            <div className="col-span-12 lg:col-span-7 w-full bg-[#f5f5f5] p-4 shadow-lg rounded-lg">
              <div className="font-bold text-2xl py-4">
                <h1>Billing Details</h1>
              </div>
              <div className="w-full my-4 grid grid-cols-12 gap-3 ">
                <div className="col-span-12">
                  <Controller
                    control={control}
                    name="fullname"
                    render={({ field }) => (
                      <div className="col-span-6">
                        <label htmlFor="fullname">FULL NAME</label>
                        <input
                          id="fullname"
                          placeholder="Full Name"
                          defaultValue={fullname}
                          className="w-full p-4 rounded-xl my-2"
                          {...register("fullname")}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="w-full my-4">
                <Controller
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <div>
                      <label htmlFor="address">ADDRESS</label>
                      <input
                        id="address"
                        placeholder="Address"
                        defaultValue={address}
                        className="w-full p-4 rounded-xl my-2"
                        {...register("address")}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="w-full my-4">
                <Controller
                  control={control}
                  name="numberPhone"
                  render={({ field, value }) => (
                    <div>
                      <label htmlFor="phone">PHONE</label>
                      <input
                        id="phone"
                        placeholder="Number Phone"
                        defaultValue={numberphone}
                        className="w-full p-4 rounded-xl my-2"
                        {...register("numberPhone")}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="w-full my-4">
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <div>
                      <label htmlFor="address">EMAIL</label>
                      <input
                        id="email"
                        name="email"
                        defaultValue={email}
                        placeholder="Email"
                        className="w-full p-4 rounded-xl my-2"
                        {...register("email")}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-col items-center justify-between">
              <div className="w-full mb-5 p-4 bg-[#f5f5f5] font-medium shadow-lg rounded-lg">
                <div className="font-bold text-2xl py-4 flex justify-between items-center">
                  <h1>Cart Total</h1>
                  <a
                    className="cursor-pointer hover:text-white p-4 bg-primary hover:bg-secondary"
                    type="button"
                    onClick={() => setOpenModal(true)}
                  >
                    Watch item
                  </a>
                </div>
                <div className="border-b-2 my-2 w-full flex">
                  <span className="w-[60%]">Discount </span>
                  <p className="w-[40%] text-sm">{discount} %</p>
                </div>
                <div className="border-b-2 my-2 w-full flex">
                  <span className="w-[60%]">Shipping </span>
                  <p className="w-[40%] text-sm">$ 0</p>
                </div>
                <div className="border-b-2 my-2 w-full flex">
                  <span className="w-[60%]">Order Total: </span>
                  <p className="w-[40%] text-sm">$ {total}</p>
                </div>
              </div>
              <div className="w-full p-4 bg-[#f5f5f5] font-medium shadow-lg rounded-lg">
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
            </div>
            <div className="col-span-12 w-full my-10 flex justify-center items-center">
              <button
                type="submit"
                className="w-1/2 md:w-1/6 py-2 rounded-2xl bg-green-400 cursor-pointer hover:bg-green-600 font-bold duration-500 hover:text-white"
              >
                Complete
              </button>
            </div>
          </div>
        </form>
      </div>
      <Modal isVisible={openModal} onClose={() => setOpenModal(false)}>
        {products?.map((item) => {
          return (
            <div key={item.cartId} className="border-b-2 my-2 w-full flex">
              <span className="w-[60%]">
                {item?.quantityProduct} x {item?.name}
              </span>
            </div>
          );
        })}
      </Modal>
    </Container>
  );
};
