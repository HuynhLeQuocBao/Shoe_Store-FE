/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { FaUserAlt } from "react-icons/fa";

export function MenuProfile() {
	const { data: session } = useSession();

	return (
		<Menu as="div" className="relative">
			<div className="flex items-center space-x-2 justify-center lg:justify-start cursor-pointer">
				<Menu.Button as={session ? "button" : "div"}>
					{
						!session
							? (
								<Link href="/login">
									<div className="flex items-center hover:text-primary focus:text-primary text-base">
										<div className="m-auto text-2xl">
											<FaUserAlt />
										</div>
										<span className="mx-2">LOG IN</span>
									</div>
								</Link>
							)
							: (
								<div className="flex items-center hover:text-primary focus:text-primary text-base">
									<span className="mx-2 uppercase">{session?.user?.fullname}</span>
									<div className="w-10 h-10">
										<img src={`${session?.user?.picture || "/images/logo/admin.png"}`} alt="" className="w-full rounded-full" />
									</div>
								</div>
							)
					}
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
					<Menu.Items className="origin-top-right absolute right-0 mt-2 w-full overflow-hidden rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
						<Menu.Item>
							<button
								className="w-full p-2 hover:bg-gray-100"
							>
								<Link href='/my-orders'>
									My orders
								</Link>

							</button>
						</Menu.Item>
						<Menu.Item>
							<button
								className="w-full p-2 hover:bg-gray-100"
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
