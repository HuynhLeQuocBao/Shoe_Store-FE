import { convertCurrency } from "@/utils/currency";

export function Product({ image, name, price }) {
  return (
    <div className="mb-7 flex flex-col items-center justify-center border md:mb-0 border-[#dee2e6]">
      <div>
        <img src={`http://localhost:3010/upload/${image}`} alt="" className="w-full h-full md:w-64 md:h-64 pb-4" />
      </div>
      <div className="text-center font-Rokkitt text-lg">
        <p className="pb-4">{name}</p>
        <p className="pb-4">{convertCurrency(price)}</p>
      </div>
    </div>
  );
}