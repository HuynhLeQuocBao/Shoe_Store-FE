import Image from "next/image";

export function PaymentItem({ name, image }) {
  return (
    <div className="w-full flex items-center justify-between bg-white py-2 px-3 rounded cursor-pointer">
      <Image
        src={`/images/logo/${image}`}
        className="w-10 h-10 object-cover"
        layout="intrinsic"
        width={40}
        height={40}
        alt="payment"
      />
      <p>Using {name}</p>
    </div>
  );
}

export function PaymentList({ paymentMethod, register, errors }) {
  const methods = [
    { name: "Ship COD", image: "cod.png" },
    { name: "Paypal", image: "paypal.png" },
  ];

  return (
    <>
      <ul className="grid w-full gap-1 grid-cols-1">
        {methods.map((item) => (
          <li
            key={item.name}
            onChange={() => paymentMethod(item.name)}
            className={
              errors &&
              errors.paymentMethod &&
              "border rounded-lg border-red-500"
            }
          >
            <input
              type="radio"
              id={item.name}
              name="hosting"
              value={item.name}
              className="hidden peer"
              {...register("paymentMethod", {
                required: true,
              })}
            />
            <label
              for={item.name}
              className="inline-flex items-center justify-between w-full p-2 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-teal-600 peer-checked:text-teal-600 duration-150"
            >
              <PaymentItem name={item.name} image={item.image} />
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-3 font-normal">
        {errors && errors.paymentMethod && (
          <span className="text-red-500 ">{errors.paymentMethod.message}</span>
        )}
      </div>
    </>
  );
}
