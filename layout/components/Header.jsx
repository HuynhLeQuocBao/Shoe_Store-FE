/* eslint-disable @next/next/no-img-element */
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Popover, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { Container } from "@/components/common/index";
import { MenuItem, MenuProfile } from "@/components/menu/index";
import { FaShoppingCart } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { cartApi } from "@/apiClient/cartAPI";
import { productApi } from "@/apiClient/product";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import logo from "../../public/images/logo/logo.png";
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

function MenuIconSVG() {
  return <img src="images/svg/menu-unfold-one.svg" alt="button mobile" />;
}

function MenuIconCloseSVG() {
  return <img src="images/svg/close.svg" />;
}

function MobileNavigation({ cartLength, ShowModal }) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Popover className="lg:hidden z-[9998] flex items-center justify-center">
      {({ open, close }) => (
        <>
          <Popover.Button className="relative z-[9999] flex h-10 w-10 items-center justify-center [&:not(:focus-visible)]:focus:outline-none bg-primary outline-none rounded-2xl">
            <span className="sr-only">Toggle Navigation</span>
            {open ? <MenuIconCloseSVG /> : <MenuIconSVG />}
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
                className="absolute inset-x-3 top-40 space-y-4 rounded-2xl bg-primary p-6 shadow-xl flex flex-col items-center justify-around z-30 font-Rokkitt"
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
                <li onClick={close}>
                  <Link
                    href={session ? "/shopping-cart" : "/login"}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-row  text-white md:text-black font-Rokkitt font-normal hover:text-primary focus:text-primary">
                      <div className="text-2xl">
                        <FaShoppingCart />
                      </div>
                      <p className="mx-2">CART</p>
                      <p>[{cartLength || 0}]</p>
                    </div>
                  </Link>
                </li>
                <li onClick={close} className="md:hidden">
                  <MenuProfile ShowModal={ShowModal} />
                </li>
              </Popover.Panel>
            </Transition.Child>
          </Transition.Root>
        </>
      )}
    </Popover>
  );
}
``;

export function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
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
    try {
      const fechPublic = async () => {
        const dataCart = await cartApi.getAllCart();
        setData(dataCart);
      };
      fechPublic();
    } catch (error) {
      console.log("Error");
    }
  }, [true]);

  console.log(data?.results?.length);

  const ShowModal = () => setOpen(true);
  const onSubmit = async (value) => {
    try {
      const fechPublic = async () => {
        const dataProduct = await productApi.searchProducts(value.search);
      };
      fechPublic();
    } catch (error) {
      console.log("Error");
    }
    if (value.search) {
      router.push(`/search-product/${value.search}`);
    } else {
      router.push("/");
    }
  };
  return (
    <header
      className={`
        md:sticky z-50 top-0 bg-white shadow-header-line px-5 py-5 md:py-0 md:px-8 ${
          isScrolled && "md:shadow-lg"
        }`}
    >
      <div className="flex flex-col md:justify-evenly md:h-[80px]">
        <div className="flex flex-col mx-4 md:mx-0 md:flex-row md:justify-between">
          <div className="mb-5 flex flex-row items-center justify-between md:mb-0 xl:ml-28">
            <a
              href="/"
              className="text-secondary text-4xl font-bold h-full w-[130px]"
            >
              <Image src={logo} width={130} height={70} />
            </a>
            <div className="flex items-center justify-between md:hidden">
              <MobileNavigation
                cartLength={data?.results?.length}
                ShowModal={ShowModal}
              />
            </div>
          </div>
          <div className="mb-5 md:mb-0 flex items-center md:w-[308px] xl:w-[450px]">
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
                    />
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

          <div className="hidden font-Rokkitt lg:flex md:flex-row md:justify-between">
            <ul className="flex flex-row items-center">
              {navigation.map((item) => (
                <li key={item.name} className="mx-2 text-base">
                  <MenuItem
                    href={item.href}
                    name={item.name}
                    isActive={router.pathname === item.href}
                  />
                </li>
              ))}
              <li className="my-2 mr-8">
                <Link href={session ? "/shopping-cart" : "/login"}>
                  <div className="flex flex-row cursor-pointer text-black hover:text-primary focus:text-primary">
                    <p className="mx-2">CART</p>
                    <p>[{data?.results?.length || 0}]</p>
                  </div>
                </Link>
              </li>
              <li className="flex mr-3 xl:mr-8 md:hidden lg:flex">
                <MenuProfile ShowModal={ShowModal} />
              </li>
            </ul>
          </div>

          <div className="hidden mr-3 md:flex md:items-center md:justify-between lg:hidden">
            <MenuProfile ShowModal={ShowModal} />
            <div className="mx-3"></div>
            <MobileNavigation
              cartLength={data?.results?.length}
              ShowModal={ShowModal}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
