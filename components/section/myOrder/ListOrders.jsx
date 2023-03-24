import Link from "next/link";
import { useEffect } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { orderApi } from "@/apiClient/order";
import { useState } from "react";
import Moment from "moment";

export function ListOrders() {
	const [orderList, setOrderList] = useState([]);
	useEffect(() => {
		try {
			const fetchGetOrder = async () => {
				const data = await orderApi.getAllOrder();
				setOrderList(data);
			};
			fetchGetOrder();
		} catch (error) {
			console.log(error);
		}
	}, []);
	const changeState = (state) => {
		if (state === 0) {
			return "pending";
		} else if (state === 1) {
			return "confirmed";
		} else if (state === 2) {
			return "In transit";
		} else if (state === 3) {
			return "complete";
		}
	};
	return (
		<div className="w-full mb-16">
			<div className="hidden md:block w-full mt-10 mb-10">
				<div className="w-full bg-[#f0f0f0] py-3 font-semibold text-base rounded-md items-center justify-center uppercase grid grid-cols-12 mb-6 shadow-lg">
					<div className="text-center col-span-1">
						<span>STT</span>
					</div>
					<div className="text-center col-span-4">
						<span>STATE</span>
					</div>
					<div className="text-center col-span-2">
						<span>TOTAL</span>
					</div>
					<div className="col-span-2  text-center">
						<span>DATE</span>
					</div>
					<div className="text-end col-span-2">
						<span>VIEW DETAILS</span>
					</div>
				</div>
				{orderList.length > 0 ? (
					orderList.map((item, index) => (
						<Link href={`/order-detail/${item._id}`} key={index}>
							<div className="w-full text-sm grid grid-cols-12  border border-b-2 shadow-lg rounded-3xl hover:bg-zinc-100 duration-500 py-3 mb-2 cursor-pointer">
								<div className="text-center col-span-1 flex justify-center items-center">
									<span>{index + 1}</span>
								</div>
								<div className="text-center col-span-4 flex justify-center items-center">
									<div
										className={`
                                            
                                                ${
																									item.status === 0
																										? "bg-orange-400"
																										: item.status === 1
																										? "bg-green-400"
																										: item.status === 2
																										? "bg-slate-400"
																										: "bg-blue-400"
																								}
                                                w-fit py-1 px-4 rounded-2xl uppercase text-white font-bold
                                            `}
									>
										{changeState(item.status)}
									</div>
								</div>
								<div className="text-center col-span-2 flex justify-center items-center">
									<span>$ {item.total}</span>
								</div>
								<div className="col-span-2  text-center flex justify-center items-center">
									<span>{item.createdAt}</span>
								</div>
								<div className="flex justify-end items-center col-span-2 pr-14">
									<HiOutlineChevronRight />
								</div>
							</div>
						</Link>
					))
				) : (
					<div className="w-full text-sm border border-b-2 shadow-lg rounded-lg text-center duration-500 py-10 mb-2">
						No data
					</div>
				)}
			</div>
		</div>
	);
}
