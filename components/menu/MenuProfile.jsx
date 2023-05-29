/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { resetCart } from "store/features/cartSlice";
import Image from "next/image";

export function MenuProfile() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
    setTimeout(() => {
      dispatch(resetCart());
    });
  };

  return (
    <Menu as="div" className="relative">
      <div className="flex items-center space-x-2 justify-center cursor-pointer">
        <Menu.Button as="button">
          {!session ? (
            <Link href="/login">
              <div className="flex-center">
                <div className="text-sm md:text-base w-full bg-primary text-black px-3 py-2 md:px-4 lg:px-6 flex-center  duration-300 hover:bg-teal-600 hover:text-white font-semibold rounded-lg">
                  Sign in
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex items-center text-base">
              <div className="w-10 h-10 relative">
                <Image
                  src={`${session?.user?.picture || "/images/logo/admin.png"}`}
                  alt="avatar"
                  layout="fill"
                  className="w-full rounded-full"
                />
              </div>
            </div>
          )}
        </Menu.Button>
      </div>
      {session && (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-64 overflow-hidden rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none p-5 z-50">
            <div className="text-center uppercase">
              <h1 className="pb-3 border-b-2 font-bold">
                {session?.user?.fullname}
              </h1>
            </div>
            {/* <Menu.Item>
              <button className="w-full p-2 hover:bg-primary hover:text-white">
                <Link href="/my-orders">My information</Link>
              </button>
            </Menu.Item> */}
            <Menu.Item>
              <Link href="/my-orders">
                <button className="w-full p-2 hover:bg-teal-600 hover:text-white">
                  My order{" "}
                </button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button
                className="w-full p-2 hover:bg-teal-600 hover:text-white"
                onClick={handleLogout}
              >
                Log out
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
}
