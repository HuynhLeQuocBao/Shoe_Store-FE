import { Container } from "@/components/common/index";
import { authApi } from "@/apiClient/auth";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import logo from "../../../public/images/logo/logo.png";
import Link from "next/link";
import Image from "next/image";
import LoadingPageComponent from "../loading/LoadingPageComponent";
import { useState } from "react";

const isVNMobilePhone =
  /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;

const schema = yup.object().shape({
  fullname: yup.string().required("This field is required"),

  email: yup
    .string()
    .email("Email is not valid")
    .required("This field is required"),

  accountName: yup
    .string()
    .required("This field is required")
    .min(4, "Username is too short - should be 5 chars minimum."),

  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password is too short - should be 8 chars minimum."),

  address: yup.string().required("This field is required"),

  numberPhone: yup
    .string()
    .required("This field is required")
    .matches(isVNMobilePhone, "Phone number is not valid"),
});

export function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmitRegister = async (data) => {
    setLoading(true);
    try {
      const ok = await authApi.registerUser(data);
      if (ok) {
        toast.success("Register Successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full relative">
      <LoadingPageComponent loading={loading} />
      <Container className="gradient-form h-full shadow-login rounded-2xl sm:w-3/4">
        <div className="container h-full">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 ">
            <div className="w-full">
              <div className="block rounded-2xl bg-white">
                <div className="g-0 lg:flex lg:flex-wrap">
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      <div className="flex-center py-4">
                        <Image
                          src={logo}
                          alt="logo footwear"
                          width={200}
                          height={80}
                          className=""
                        />
                      </div>
                      <form onSubmit={handleSubmit(onSubmitRegister)}>
                        <p className="mb-4 text-center font-bold text-2xl ">
                          Register
                        </p>
                        <div className="relative mb-6">
                          <Controller
                            control={control}
                            name="fullname"
                            render={({ field }) => (
                              <>
                                <input
                                  {...register("fullname", { required: true })}
                                  id="fullname"
                                  className={`input-floating peer ${
                                    errors.fullname?.message.length > 0
                                      ? "border-red-500 focus:border-red-500 "
                                      : ""
                                  }`}
                                  placeholder=" "
                                />
                                <label
                                  htmlFor="fullname"
                                  className={`label-floating ${
                                    errors.fullname?.message.length > 0
                                      ? "text-red-500 peer-placeholder-shown:-translate-y-[85%]"
                                      : ""
                                  }`}
                                >
                                  Full name
                                </label>
                              </>
                            )}
                          />

                          {errors.fullname ? (
                            <p className="text-red-500 text-xs h-4 p-1">
                              {errors.fullname?.message}
                            </p>
                          ) : (
                            <p className="h-4"></p>
                          )}
                        </div>
                        <div className="relative mb-6">
                          <Controller
                            control={control}
                            name="accountName"
                            render={({ field }) => (
                              <>
                                <input
                                  {...register("accountName", {
                                    required: true,
                                  })}
                                  id="accountName"
                                  className={`input-floating peer ${
                                    errors.accountName?.message.length > 0
                                      ? "border-red-500 focus:border-red-500 "
                                      : ""
                                  }`}
                                  placeholder=" "
                                />
                                <label
                                  htmlFor="accountName"
                                  className={`label-floating ${
                                    errors.accountName?.message.length > 0
                                      ? "text-red-500 peer-placeholder-shown:-translate-y-[85%]"
                                      : ""
                                  }`}
                                >
                                  Account Name
                                </label>
                              </>
                            )}
                          />
                          {errors.accountName ? (
                            <p className="text-red-500 text-xs h-4 p-1">
                              {errors.accountName?.message}
                            </p>
                          ) : (
                            <p className="h-4"></p>
                          )}
                        </div>
                        <div className="relative mb-6">
                          <Controller
                            control={control}
                            name="email"
                            render={({ field }) => (
                              <>
                                <input
                                  {...register("email", { required: true })}
                                  id="email"
                                  className={`input-floating peer ${
                                    errors.email?.message.length > 0
                                      ? "border-red-500 focus:border-red-500 "
                                      : ""
                                  }`}
                                  placeholder=" "
                                />
                                <label
                                  htmlFor="email"
                                  className={`label-floating ${
                                    errors.email?.message.length > 0
                                      ? "text-red-500 peer-placeholder-shown:-translate-y-[85%]"
                                      : ""
                                  }`}
                                >
                                  Email
                                </label>
                              </>
                            )}
                          />
                          {errors.email ? (
                            <p className="text-red-500 text-xs h-4 p-1">
                              {errors.email?.message}
                            </p>
                          ) : (
                            <p className="h-4"></p>
                          )}
                        </div>
                        <div className="relative mb-6">
                          <Controller
                            control={control}
                            name="address"
                            render={({ field }) => (
                              <>
                                <input
                                  {...register("address", { required: true })}
                                  id="address"
                                  className={`input-floating peer ${
                                    errors.address?.message.length > 0
                                      ? "border-red-500 focus:border-red-500 "
                                      : ""
                                  }`}
                                  placeholder=" "
                                />
                                <label
                                  htmlFor="address"
                                  className={`label-floating ${
                                    errors.address?.message.length > 0
                                      ? "text-red-500 peer-placeholder-shown:-translate-y-[85%]"
                                      : ""
                                  }`}
                                >
                                  Address
                                </label>
                              </>
                            )}
                          />
                          {errors.address ? (
                            <p className="text-red-500 text-xs h-4 p-1">
                              {errors.address?.message}
                            </p>
                          ) : (
                            <p className="h-4"></p>
                          )}
                        </div>
                        <div className="relative mb-6">
                          <Controller
                            control={control}
                            name="numberPhone"
                            render={({ field }) => (
                              <>
                                <input
                                  {...register("numberPhone", {
                                    required: true,
                                  })}
                                  id="numberPhone"
                                  className={`input-floating peer ${
                                    errors.numberPhone?.message.length > 0
                                      ? "border-red-500 focus:border-red-500 "
                                      : ""
                                  }`}
                                  placeholder=" "
                                />
                                <label
                                  htmlFor="numberPhone"
                                  className={`label-floating ${
                                    errors.numberPhone?.message.length > 0
                                      ? "text-red-500 peer-placeholder-shown:-translate-y-[85%]"
                                      : ""
                                  }`}
                                >
                                  Phone
                                </label>
                              </>
                            )}
                          />
                          {errors.numberPhone ? (
                            <p className="text-red-500 text-xs h-4 p-1">
                              {errors.numberPhone?.message}
                            </p>
                          ) : (
                            <p className="h-4"></p>
                          )}
                        </div>
                        <div className="relative mb-6">
                          <Controller
                            control={control}
                            name="password"
                            render={({ field }) => (
                              <>
                                <input
                                  {...register("password", { required: true })}
                                  id="password"
                                  type="password"
                                  className={`input-floating peer ${
                                    errors.password?.message.length > 0
                                      ? "border-red-500 focus:border-red-500 "
                                      : ""
                                  }`}
                                  placeholder=" "
                                />
                                <label
                                  htmlFor="password"
                                  className={`label-floating ${
                                    errors.password?.message.length > 0
                                      ? "text-red-500 peer-placeholder-shown:-translate-y-[85%]"
                                      : ""
                                  }`}
                                >
                                  Password
                                </label>
                              </>
                            )}
                          />
                          {errors.password ? (
                            <p className="text-red-500 text-xs h-4 p-1">
                              {errors.password?.message}
                            </p>
                          ) : (
                            <p className="h-4"></p>
                          )}
                        </div>
                        <div className="mb-4 pt-1 pb-1 text-center">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            Register
                          </button>
                        </div>
                        <div className="flex items-center justify-center flex-col mb-4">
                          <p>
                            Already have a account?
                            <Link href="/login">
                              <span className="cursor-pointer ml-1 underline hover:text-primary">
                                <b>Log in</b>
                              </span>
                            </Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="hidden lg:flex items-center rounded-2xl lg:w-6/12 bg-login bg-cover bg-center overflow-hidden"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
