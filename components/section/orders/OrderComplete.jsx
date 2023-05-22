import { Container } from "@/components/common";
import Link from "next/link";
import { ProgressCart } from "./";
import { HiCheck, HiShoppingCart } from "react-icons/hi";
import { Title } from "../title";

export function OrderComplete() {
  return (
    <Container>
      <ProgressCart />
      <div className=" w-full my-5 flex flex-col justify-center items-center">
        <div className="flex justify-center items-center md:w-[350px] md:h-[350px] bg-gradient-to-r from-slate-500 via-purple-400 to-primary rounded-complete">
          <HiCheck color="#2ceb32" className="w-[250px] h-[250px]" />
        </div>
        <div className="mx-4 md:mx-0 font-Rokkitt text-4xl font-bold text-center py-8">
          <h2>
            Thank you for purchasing, Your order is complete. Please wait
            confirm from admin
          </h2>
        </div>

        <div className="w-full flex justify-center items-center">
          <Link href="/">
            <button className=" p-4 bg-transparent border border-black cursor-pointer hover:bg-teal-600 hover:text-white transition-all duration-300 ease-linear rounded-3xl font-bold mr-3">
              Home
            </button>
          </Link>
          <Link href="/">
            <button className=" p-4 bg-transparent border border-black cursor-pointer hover:bg-teal-600 hover:text-white transition-all duration-300 ease-linear rounded-3xl font-bold mr-3">
              <div className="flex justify-center items-center ">
                <HiShoppingCart className="w-6 h-6" />
                Continue Shopping
              </div>
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
