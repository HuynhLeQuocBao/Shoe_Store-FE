/* This example requires Tailwind CSS v2.0+ */
import { Container } from "@/components/common";
import { useForm, Controller } from "react-hook-form";
import { cartApi } from "@/apiClient/cartAPI";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProgressCart } from ".";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "store/features/cartSlice";
import { toast } from "react-toastify";
import LoadingPage from "../loading/LoadingPage";

export const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const total = useSelector((state) => state.cart.total);
  const products = useSelector((state) => state.cart.products);
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [fullname, setFullname] = useState(session?.user?.fullname);
  const [address, setAddress] = useState(session?.user?.address);
  const [numberphone, setNumberPhone] = useState(session?.user?.numberPhone);
  const [email, setEmail] = useState(session?.user?.email);
  const [loading, setLoading] = useState(false);
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
  return (
    <Container>
      <ProgressCart />
      <div className=" w-full mt-32 mb-10 relative">
        {loading && (
          <div className="w-full h-full flex justify-center items-center absolute bg-opacity-20 bg-slate-400 top-0 left-0">
            <LoadingPage />
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4 w-full">
            <div className="col-span-7 w-full bg-[#f5f5f5] p-4 shadow-lg rounded-lg">
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
                          // onChange={e => setFullname(e.target.value)}
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
                        // onChange={e => setAddress(e.target.value)}
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
                        // onChange={e => setNumberPhone(e.target.value)}
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
                        // onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-4 rounded-xl my-2"
                        {...register("email")}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="col-span-5 ">
              <div className="w-full mb-8 p-4 bg-[#f5f5f5] font-medium shadow-lg rounded-lg">
                <div className="font-bold text-2xl py-4">
                  <h1>Cart Total</h1>
                </div>
                <div className="border-b-2 my-2  w-full flex">
                  <span className="w-[60%]">Subtotal </span>
                  <p className="w-[40%] text-sm">$ {subTotal}</p>
                </div>
                {products?.map((item) => {
                  return (
                    <div
                      key={item.cartId}
                      className="border-b-2 my-2 w-full flex"
                    >
                      <span className="w-[60%]">
                        {item?.quantityProduct}*{item?.name}{" "}
                      </span>
                      <p className="w-[40%] text-sm">$ {item?.totalProduct}</p>
                    </div>
                  );
                })}
                <div className="border-b-2 my-2 w-full flex">
                  <span className="w-[60%]">Shipping </span>
                  <p className="w-[40%] text-sm">$ 0</p>
                </div>
                <div className="border-b-2 my-2 w-full flex">
                  <span className="w-[60%]">Order Total: </span>
                  <p className="w-[40%] text-sm">{total}</p>
                </div>
              </div>
              <div className="w-full my-1 flex justify-center items-center">
                <button className="w-full md:w-full py-2 rounded-2xl bg-green-400 cursor-pointer hover:bg-green-600 font-bold duration-500 hover:text-white">
                  Complete
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};
