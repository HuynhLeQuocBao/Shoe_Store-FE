/* eslint-disable @next/next/no-img-element */
import { Fragment, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { MenuItem, MenuProfile } from "@/components/menu/index";
import { MdSearch } from "react-icons/md";
import { cartApi } from "@/apiClient/cartAPI";
import { productApi } from "@/apiClient/product";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import logo from "../../public/images/logo/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromCartApi, resetCart } from "store/features/cartSlice";
import { BsBagCheck } from "react-icons/bs";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";

const navigation = [
  {
    name: "HOME",
    href: "/",
  },
  {
    name: "MEN",
    href: "/shoes-for-men",
  },
  {
    name: "WOMEN",
    href: "/shoes-for-women",
  },
  {
    name: "ABOUT",
    href: "/about",
  },
  {
    name: "CONTACT",
    href: "/contact",
  },
];

function TabletNavigation() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Popover className="lg:hidden z-[9998] flex items-center justify-center">
      {({ open, close }) => (
        <>
          <Popover.Button className="relative z-[9999] flex h-10 w-10 items-center justify-center [&:not(:focus-visible)]:focus:outline-none bg-primary outline-none rounded-2xl text-white text-2xl">
            <span className="sr-only">Toggle Navigation</span>
            {open ? <AiOutlineClose /> : <AiOutlineMenuUnfold />}
          </Popover.Button>
          <Transition.Root>
            <Transition.Child
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="duration-150 ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Overlay className="fixed inset-0 bg-slate-300/50 z-20" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                as="ul"
                className="absolute inset-x-3 top-40 space-y-4 rounded-2xl bg-primary p-6 shadow-xl flex flex-col items-center justify-around z-30"
              >
                {navigation.map((item) => (
                  <li key={item.name} onClick={close}>
                    <MenuItem
                      href={item.href}
                      name={item.name}
                      isActive={router.pathname === item.href}
                    />
                  </li>
                ))}
              </Popover.Panel>
            </Transition.Child>
          </Transition.Root>
        </>
      )}
    </Popover>
  );
}

export function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [productList, setProductList] = useState([]);
  const [productSearchList, setProductSearchList] = useState([]);
  const [open, setOpen] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  const baseURL = process.env.NEXT_PUBLIC_API_URL + "/uploadWithRefactorDB/";
  const HOST =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
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
    if (quantity > 0 && !session) {
      dispatch(resetCart());
    }
    const fetchGetCart = async () => {
      try {
        const result = await cartApi.getAllCart();
        const productsData = await productApi.getAllProducts();
        setProductList(productsData);
        if (result?.message === "Cart empty") {
          dispatch(resetCart());
          dispatch(
            getDataFromCartApi({
              cartItem: null,
              total: 0,
            })
          );
        } else if (quantity === 0 && session?.user) {
          dispatch(resetCart());
          result.results.map((cartItem) => {
            dispatch(
              getDataFromCartApi({
                cartItem,
                total: result.totalCart,
              })
            );
          });
        }
      } catch (error) {}
    };
    fetchGetCart();
  }, [session]);

  const ShowModal = () => setOpen(true);
  const onSubmit = async (value) => {
    if (keyword.length > 0) {
      router.push(`/search-product/${keyword}`);
    } else {
      router.push("/");
    }
  };

  const handleSearch = (event) => {
    setKeyword(event.target.value);
    const results = productList.filter((product) =>
      product.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setProductSearchList(results);
  };

  return (
    <header
      className={clsx(
        "md:sticky z-50 top-0 bg-white shadow-header-line px-5 py-5 md:py-0 md:px-8",
        {
          "md:shadow-lg": isScrolled,
        }
      )}
    >
      <div className="flex flex-col justify-evenly md:h-[80px]">
        <div className="flex mx-0 flex-row justify-between">
          <div className="flex flex-row items-center justify-between md:mb-0">
            <a
              href="/"
              className="text-secondary text-4xl font-bold h-full w-[130px]"
            >
              <Image src={logo} width={130} height={70} />
            </a>
          </div>

          <div className="hidden font-Rokkitt lg:flex md:flex-row md:justify-between">
            <ul className="flex flex-row items-center">
              {navigation.map((item) => (
                <li key={item.name} className="mx-3 text-base">
                  <MenuItem
                    href={item.href}
                    name={item.name}
                    isActive={router.pathname === item.href}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <div className="hidden mr-10 md:mb-0 md:flex items-center">
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <Controller
                  control={control}
                  name="search"
                  render={({ field }) => (
                    <div className="flex relative">
                      <input
                        type="text"
                        placeholder="Search"
                        className="h-[40px] w-full rounded-[30px] pl-4 pr-[4.5rem] focus:outline-none overflow-hidden border"
                        {...register("search")}
                        onChange={handleSearch}
                        value={keyword}
                      />
                      <button
                        type="submit"
                        className="w-[40px] h-[40px] rounded-full bg-primary text-white focus:outline-none absolute right-0 hover:bg-secondary"
                      >
                        <div className="text-2xl flex items-center justify-center">
                          <MdSearch />
                        </div>
                      </button>
                      {productSearchList.length > 0 && keyword !== "" ? (
                        <div className="absolute bg-white min-h-[100px] w-[375px] max-h-80 overflow-y-scroll top-12 left-0 flex flex-col gap-4 p-4 shadow-lg z-20">
                          {productSearchList.map((product, index) => (
                            <Link
                              key={index}
                              href={`${HOST}/product-detail/${product._id}`}
                            >
                              <div className="w-full flex gap-2 hover:cursor-pointer hover:bg-slate-200 text-xl  border-b-2 border-solid p-1 duration-300">
                                <Image
                                  src={`${baseURL + product?.avatar}`}
                                  width={50}
                                  height={50}
                                />
                                <div className="flex flex-col">
                                  <p className="font-bold text-lg">
                                    {product.name}
                                  </p>
                                  <p className="text-sm text-slate-500">
                                    {product.price}$
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : productSearchList.length === 0 &&
                        keyword.length > 0 ? (
                        <div className="absolute bg-white min-h-[60px] w-[375px] overflow-y-scroll top-12 left-0 shadow-lg z-20">
                          <div className="flex-center py-5">
                            No product found
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
                />
              </form>
            </div>
            <div className="mr-5 md:mr-10">
              <Link href={session ? "/shopping-cart" : "/login"}>
                <div className="flex cursor-pointer relative items-center justify-center">
                  <BsBagCheck className="w-10 h-10" />
                  <p className="absolute bottom-1 text-white bg-red-500 w-7 h-7 rounded-full text-center top-[-5px] right-[-15px]">
                    {quantity > 0 && session?.user ? quantity : 0}
                  </p>
                </div>
              </Link>
            </div>
            <div className="mr-5 md:mr-10 xl:mr-0">
              <MenuProfile ShowModal={ShowModal} />
            </div>
            <div className="items-center justify-between flex">
              <TabletNavigation ShowModal={ShowModal} />
            </div>
          </div>
        </div>
        <div className="flex items-center md:mb-0 md:hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Controller
              control={control}
              name="search"
              render={({ field }) => (
                <div className="flex relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="h-[40px] w-full rounded-[30px] pl-4 pr-[4.5rem] focus:outline-none overflow-hidden border"
                    {...register("search")}
                    onChange={handleSearch}
                    value={keyword}
                  />
                  {productSearchList.length > 0 && keyword !== "" ? (
                    <div className="absolute bg-white min-h-[100px] w-full max-h-80 overflow-y-scroll top-12 left-0 flex flex-col gap-4 p-4 shadow-lg z-20">
                      {productSearchList.map((product, index) => (
                        <Link
                          key={index}
                          href={`${HOST}/product-detail/${product._id}`}
                        >
                          <div className="w-full flex gap-2 hover:cursor-pointer hover:bg-slate-200 text-xl  border-b-2 border-solid p-1 duration-300 ">
                            <Image
                              src={`${baseURL + product?.avatar}`}
                              alt={product.description}
                              width={50}
                              height={50}
                            />
                            <div className="flex flex-col">
                              <p className="font-bold text-lg">
                                {product.name}
                              </p>
                              <p className="text-sm text-slate-500">
                                {product.price}$
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : productSearchList.length === 0 && keyword.length > 0 ? (
                    <div className="absolute bg-white min-h-[60px] w-full overflow-y-scroll top-12 left-0 shadow-lg z-20">
                      <div className="flex-center py-5">No product found</div>
                    </div>
                  ) : null}
                  <button
                    type="submit"
                    className="w-[40px] h-[40px] rounded-full bg-primary text-white focus:outline-none absolute right-0 hover:bg-secondary"
                  >
                    <div className="text-2xl flex items-center justify-center">
                      <MdSearch />
                    </div>
                  </button>
                </div>
              )}
            />
          </form>
        </div>
      </div>
    </header>
  );
}
