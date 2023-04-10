/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";

export function MenuProfile() {
  const { data: session } = useSession();

  return (
    <Menu as="div" className="relative">
      <div className="flex items-center space-x-2 justify-center lg:justify-start cursor-pointer">
        <Menu.Button as={session ? "button" : "div"}>
          {!session ? (
            <Link href="/login">
              <button className="bg-teal-600 px-3 py-2 md:px-4 lg:px-6 flex-center hover:bg-primary duration-300 hover:scale-110 text-white font-bold rounded-lg">
                Sign in
              </button>
            </Link>
          ) : (
            <div className="flex items-center text-base">
              <div className="w-10 h-10">
                <Image
                  src={`${session?.user?.picture || "/images/logo/admin.png"}`}
                  alt="avatar"
                  layout="intrinsic"
                  width={40}
                  height={40}
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
            <Menu.Item>
              <button className="w-full p-2 hover:bg-primary hover:text-white">
                <Link href="/my-orders">My information</Link>
              </button>
            </Menu.Item>
            <Menu.Item>
              <button className="w-full p-2 hover:bg-primary hover:text-white">
                <Link href="/my-orders">My order</Link>
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                className="w-full p-2 hover:bg-primary hover:text-white"
                onClick={() => signOut()}
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
