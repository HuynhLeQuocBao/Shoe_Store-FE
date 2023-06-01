/* eslint-disable @next/next/no-img-element */
import { Container } from "@/components/common/index";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSession, signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import logo from "../../../public/images/logo/logo.png";
import LoadingPageComponent from "../loading/LoadingPageComponent";
import { useState } from "react";

const schema = yup.object().shape({
  accountName: yup.string().required("This field is required"),
  password: yup.string().required("This field is required"),
});

export function Login() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  if (session) {
    if (router.query.id) {
      router.push("/product-detail/" + router.query.id);
    } else {
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const ok = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (ok.status == 401) {
      toast.error("Login Fail. Try again!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    } else {
      toast.success("Login Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <LoadingPageComponent loading={loading} />
      <Container className="gradient-form h-full shadow-login rounded-2xl sm:w-3/4">
        <div className="container h-full">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 ">
            <div className="w-full">
              <div className="block rounded-2xl bg-white">
                <div className="g-0 lg:flex lg:flex-wrap">
                  <div className="hidden lg:flex items-center rounded-2xl lg:w-6/12 bg-login bg-cover bg-center overflow-hidden"></div>
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      <div className="flex-center py-4">
                        <Image
                          src={logo}
                          alt="logo footwear"
                          width={200}
                          height={80}
                          className=""
                          blurDataURL={logo}
                          placeholder="blur"
                        />
                      </div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <p className="mb-4 text-center font-bold text-2xl ">
                          Log in
                        </p>
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
                            Log in
                          </button>
                          {/* <Link href="#">
                            <span className="cursor-pointer ml-1 underline hover:text-primary">
                              Forgot password?
                            </span>
                          </Link> */}
                        </div>
                        <div className="text-xl text-center">
                          <p>Log in with</p>
                        </div>
                        <div className="flex justify-center gap-4 items-center">
                          <div className="my-4 text-center md:text-left">
                            <button
                              className="text-white w-10 h-10 rounded-full cursor-pointer hover:opacity-70"
                              type="submit"
                              onClick={(e) => {
                                e.preventDefault();
                                signIn("facebook");
                              }}
                            >
                              <Image
                                src="/images/logo/facebook.png"
                                alt="logo facebook"
                                layout="responsive"
                                width={40}
                                height={40}
                              />
                            </button>
                          </div>
                          <div className="my-4 text-center md:text-left">
                            <button
                              className="text-white w-10 h-10 rounded-full cursor-pointer hover:opacity-70"
                              type="submit"
                              onClick={(e) => {
                                e.preventDefault();
                                signIn("google");
                              }}
                            >
                              <Image
                                src="/images/logo/google.png"
                                alt="logo goole"
                                layout="responsive"
                                width={40}
                                height={40}
                              />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-center flex-col mb-4">
                          <p>
                            Do not have an account?
                            <Link href="/register">
                              <span className="cursor-pointer ml-1 underline hover:text-primary">
                                <b>Register</b>
                              </span>
                            </Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
