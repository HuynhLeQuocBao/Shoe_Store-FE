/* eslint-disable @next/next/no-img-element */
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Popover, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { MenuItem, MenuProfile } from "@/components/menu/index";
import Image from "next/image";
import logo from "../../public/images/logo/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, resetCart } from "store/features/cartSlice";
import { BsBagCheck } from "react-icons/bs";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import SearchBar from "@/components/common/SearchBar";

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

export function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isScrolled] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      dispatch(getCartItems());
    } else {
      dispatch(resetCart());
    }
  }, [session]);

  return (
    <header
      className={`md:sticky z-50 top-0 bg-white shadow-header-line px-5 py-5 md:py-0 md:px-8 ${
        isScrolled && "md:shadow-lg"
      }`}
    >
      <div className="flex flex-col justify-evenly md:h-[80px]">
        <div className="flex mx-0 flex-row justify-between">
          <div className="flex flex-row items-center justify-between md:mb-0 hover:cursor-pointer">
            <Link
              href="/"
              className="text-secondary text-4xl font-bold h-full w-[130px] "
              prefetch={false}
            >
              <div>
                <Image alt="Footwear" src={logo} width={130} height={70} />
              </div>
            </Link>
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
              <SearchBar />
            </div>
            <div className="mr-5 md:mr-10">
              <Link
                href={session ? "/shopping-cart" : "/login"}
                prefetch={false}
              >
                <div className="flex cursor-pointer relative items-center justify-center">
                  <BsBagCheck className="w-10 h-10" />
                  {quantity > 0 && session?.user && (
                    <p className="absolute bottom-1 text-white bg-red-500 w-7 h-7 rounded-full text-center top-[-5px] right-[-15px]">
                      {quantity > 0 && session?.user ? quantity : 0}
                    </p>
                  )}
                </div>
              </Link>
            </div>
            <div className="mr-5 md:mr-10 xl:mr-0">
              <MenuProfile />
            </div>
            <div className="items-center justify-between flex">
              <TabletNavigation />
            </div>
          </div>
        </div>
        <div className="flex items-center md:mb-0 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
function TabletNavigation() {
  const router = useRouter();

  return (
    <Popover className="lg:hidden z-[50] flex items-center justify-center">
      {({ open, close }) => (
        <>
          <Popover.Button className="relative z-[51] flex h-10 w-10 items-center justify-center [&:not(:focus-visible)]:focus:outline-none bg-primary outline-none rounded-2xl text-black text-2xl">
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
