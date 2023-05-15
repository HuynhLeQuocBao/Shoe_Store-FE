import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export function PaymentItem({ name, image }) {
  return (
    <div className="w-full flex items-center justify-between bg-white py-2 px-3 rounded cursor-pointer">
      <Image
        src={`/images/logo/${image}`}
        classNameName="w-10 h-10 object-cover"
        layout="intrinsic"
        width={40}
        height={40}
      />
      <p>Using {name}</p>
    </div>
  );
}

export function PaymentList({ paymentMethod }) {
  const methods = [
    { name: "Ship COD", image: "cod.png" },
    { name: "Paypal", image: "paypal.png" },
  ];

  return (
    <ul className="grid w-full gap-1 grid-cols-1">
      {methods.map((item) => (
        <li
          key={item.name}
          onClick={() =>
            item.name === "Paypal" ? paymentMethod("paypal") : null
          }
        >
          <input
            type="radio"
            id={item.name}
            name="hosting"
            value={item.name}
            className="hidden peer"
            required
          />
          <label
            for={item.name}
            className="inline-flex items-center justify-between w-full p-2 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:text-primary duration-150"
          >
            <PaymentItem name={item.name} image={item.image} />
          </label>
        </li>
      ))}
    </ul>
  );
}
