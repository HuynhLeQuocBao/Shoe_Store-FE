/* This example requires Tailwind CSS v2.0+ */
import { Container } from "@/components/common";
import { useForm, Controller } from "react-hook-form";
import { cartApi } from "@/apiClient/cartAPI";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProgressCart } from ".";
import { useSession } from "next-auth/react";

export function Checkout() {
	const router = useRouter();
	const { data: session } = useSession();
	console.log("session", session?.user?.fullname);
	const [data, setData] = useState([]);
	const [subTotal, setSubTotal] = useState(0);
	const [fullname, setFullname] = useState(session?.user?.fullname);
	const [address, setAddress] = useState(session?.user?.address);
	const [numberphone, setNumberPhone] = useState(session?.user?.numberPhone);
	const [email, setEmail] = useState(session?.user?.email);
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
			const fetchCart = async () => {
				const dataCart = await cartApi.getAllCart();
				setData(dataCart?.results);
				setSubTotal(dataCart?.totalCart);
				if (dataCart?.totalCart === 0) {
					router.push("/shopping-cart");
				}
				console.log(dataCart);
			};
			fetchCart();
		} catch (error) {
			console.log("Error");
		}
	}, []);
	const onSubmit = (data) => {
		try {
			const fetchCheckoutCart = async () => {
				const result = await cartApi.checkoutCart({
					fullname: data.fullname,
					address: data.address,
					numberPhone: data.numberPhone,
					email: data.email,
				});
				console.log(result);
				if (result) {
					router.push("/order-complete");
					setTimeout(() => {
						router.reload(window.location.pathname);
					}, 500);
				}
			};
			fetchCheckoutCart();
		} catch (error) {
			console.log("Error", error);
		}
	};
	return (
		<Container>
			<ProgressCart />
			<div className=" w-full mt-32 mb-10">
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
								{data?.map((item) => {
									return (
										<div key={item._id} className="border-b-2 my-2 w-full flex">
											<span className="w-[60%]">
												{item?.quantity}*{item?.productName}{" "}
											</span>
											<p className="w-[40%] text-sm">$ {item?.total}</p>
										</div>
									);
								})}
								<div className="border-b-2 my-2 w-full flex">
									<span className="w-[60%]">Shipping </span>
									<p className="w-[40%] text-sm">$ 0</p>
								</div>
								<div className="border-b-2 my-2 w-full flex">
									<span className="w-[60%]">Order Total: </span>
									<p className="w-[40%] text-sm">{subTotal}</p>
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
}
