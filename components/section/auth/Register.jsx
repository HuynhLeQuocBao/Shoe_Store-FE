import { Container } from "@/components/common/index";
import { authApi } from "@/apiClient/auth";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

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
		.min(4, 'Username is too short - should be 5 chars minimum.'),

	password: yup
		.string()
		.required("This field is required")
		.min(8, 'Password is too short - should be 8 chars minimum.'),


	address: yup.string().required("This field is required"),

	numberPhone: yup
		.string()
		.required("This field is required")
		.matches(isVNMobilePhone, "Phone number is not valid"),
});

export function Register() {

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
		const ok = await authApi.registerUser(data);
		if (ok) {
			toast.success('Register Successfully !', {
				position: toast.POSITION.TOP_RIGHT
			});
			setTimeout(() => {
				router.push("/login");
			}, 2000);
		}
	};

	return (
		<Container>
			<ToastContainer />
			<div className="mx-4 md:mx-0 font-Rokkitt flex flex-col items-center">
				<div className="text-4xl font-bold text-center w-1/2">
					<h2>Register</h2>
				</div>
				<form onSubmit={handleSubmit((values) => onSubmitRegister(values))} className="w-1/2">
					<div className="flex flex-col text-base text-secondary">
						<div className="flex flex-col mb-4">
							<label className="cursor-pointer" htmlFor="fullname">
								Fullname
							</label>
							<Controller
								control={control}
								name="fullname"
								render={({ field }) => (
									<input
										className={`inputForm ${errors.fullname?.message.length > 0
											? "border-red-500 focus:outline focus:outline-1 focus:outline-red-500  "
											: ""
											}`}
										type="text"
										{...register("fullname", { required: true })}
										placeholder="Enter your fullname"
									/>
								)}
							/>
							{errors.fullname ? (
								<p className="text-red-500 p-1 ">{errors.fullname?.message}</p>
							) : null}
						</div>
						<div className="flex flex-col mb-4">
							<label className="cursor-pointer" htmlFor="email">
								Email
							</label>
							<Controller
								control={control}
								name="email"
								render={({ field }) => (
									<input
										className={`inputForm ${errors.email?.message.length > 0
											? "border-red-500 focus:outline focus:outline-1 focus:outline-red-500  "
											: ""
											}`}
										type="text"
										{...register("email", { required: true })}
										placeholder="Enter your email"
									/>
								)}
							/>
							{errors.email ? (
								<p className="text-red-500 p-1 ">{errors.email?.message}</p>
							) : null}
						</div>
						<div className="flex flex-col mb-4">
							<label className="cursor-pointer" htmlFor="email">
								Account Name
							</label>
							<Controller
								control={control}
								name="accountName"
								render={({ field }) => (
									<input
										className={`inputForm ${errors.accountName?.message.length > 0
											? "border-red-500 focus:outline focus:outline-1 focus:outline-red-500  "
											: ""
											}`}
										type="text"
										{...register("accountName", { required: true })}
										placeholder="Enter your account name"
									/>
								)}
							/>
							{errors.accountName ? (
								<p className="text-red-500 p-1 ">{errors.accountName?.message}</p>
							) : null}
						</div>
						<div className="flex flex-col mb-4">
							<label className="cursor-pointer" htmlFor="password">
								Password
							</label>
							<Controller
								control={control}
								id="password"
								name="password"
								render={({ field }) => (
									<input
										className={`inputForm 
																				${errors.password?.message.length > 0
												? "border-red-500 focus:outline focus:outline-1 focus:outline-red-500  "
												: ""
											}`}
										type="password"
										{...register("password", { required: true })}
										placeholder="Enter your password"
									/>
								)}
							/>
							{errors.password ? (
								<p className="text-red-500 p-1 ">{errors.password?.message}</p>
							) : null}
						</div>
						<div className="flex flex-col mb-4">
							<label className="cursor-pointer" htmlFor="address">
								Address
							</label>
							<Controller
								control={control}
								id="address"
								name="address"
								render={({ field }) => (
									<input
										className={`inputForm 
																				${errors.address?.message.length > 0
												? "border-red-500 focus:outline focus:outline-1 focus:outline-red-500  "
												: ""
											}`}
										type="text"
										{...register("address", { required: true })}
										placeholder="Enter your address"
									/>
								)}
							/>
							{errors.address ? (
								<p className="text-red-500 p-1 ">{errors.address?.message}</p>
							) : null}
						</div>
						<div className="flex flex-col mb-4">
							<label className="cursor-pointer" htmlFor="phone">
								Phone Number
							</label>
							<Controller
								control={control}
								name="numberPhone"
								render={({ field }) => (
									<input
										className={`inputForm 
																				${errors.numberPhone?.message.length > 0
												? "border-red-500 focus:outline focus:outline-1 focus:outline-red-500  "
												: ""
											}`}
										type="text"
										{...register("numberPhone", { required: true })}
										placeholder="Enter your phone number"
									/>
								)}
							/>
							{errors.numberPhone ? (
								<p className="text-red-500 p-1 ">{errors.numberPhone?.message}</p>
							) : null}
						</div>
						<div className="my-4 text-center md:text-left">
							<button
								className="text-white bg-[#616161] rounded-[30px] hover:bg-primary px-3 py-2 w-1/3 block mx-auto"
								type="submit"
							>
								Register
							</button>
						</div>
					</div>
				</form>
			</div>
		</Container>
	);
}
