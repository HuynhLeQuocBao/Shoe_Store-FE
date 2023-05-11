import { isBuffer } from "lodash";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export function ProgressCart() {
  const [statusCart, setSatusCart] = useState();
  const [statusCheckout, setSatusCheckout] = useState();
  const [statusCompelete, setSatusCompelete] = useState();
  const router = useRouter();
  const pathName = router.pathname;
  useEffect(() => {
    if (pathName === "/shopping-cart") {
      setSatusCart("current");
      setSatusCheckout("upcoming");
      setSatusCompelete("upcoming");
    } else if (pathName === "/checkout") {
      setSatusCart("complete");
      setSatusCheckout("current");
      setSatusCompelete("upcoming");
    } else {
      setSatusCart("complete");
      setSatusCheckout("complete");
      setSatusCompelete("current");
    }
  }, [pathName]);

  const steps = [
    { name: "SHOPPING CART", href: "#", step: "01", status: statusCart },
    { name: "CHECKOUT", href: "#", step: "02", status: statusCheckout },
    { name: "COMPLETE", href: "#", step: "03", status: statusCompelete },
  ];
  return (
    <nav aria-label="Progress" className="w-[88%] md:w-full">
      <ol
        role="list"
        className="flex justify-center text-[12px] md:text-sm items-center w-full my-20 h-auto"
      >
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== steps.length - 1 ? "w-full pl-10" : "pl-10 md:px-10 ",
              " relative"
            )}
          >
            {step.status === "complete" ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="-ml-px absolute mt-0.5 top-4 left-16 w-full h-0.5 bg-green-500"
                    aria-hidden="true"
                  />
                ) : null}
                <a href={step.href} className="relative flex items-start group">
                  <span className="h-9 flex items-center font-bold text-lg">
                    <span className="text-white z-10 w-20 h-20 flex items-center justify-center bg-green-500 rounded-full ">
                      {step.step}
                    </span>
                  </span>
                  <span className="absolute left-2 sm:-left-2 top-16">
                    {step.name}
                  </span>
                </a>
              </>
            ) : step.status === "current" ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="-ml-px absolute mt-0.5 top-4 left-16 w-full h-0.5 bg-gray-300"
                    aria-hidden="true"
                  />
                ) : null}
                <a
                  href={step.href}
                  className="relative flex items-start group"
                  aria-current="step"
                >
                  <span
                    className="h-9 flex items-center font-bold text-lg"
                    aria-hidden="true"
                  >
                    <span className="z-10 w-20 text-green-500 h-20 flex items-center justify-center bg-green-50 border-[4px] border-green-500 rounded-full ">
                      {step.step}
                    </span>
                  </span>
                  <span className="absolute left-2 top-16">{step.name}</span>
                </a>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="-ml-px absolute mt-0.5 top-4 left-16 w-full h-0.5 bg-gray-300"
                    aria-hidden="true"
                  />
                ) : null}
                <a href={step.href} className="relative flex items-start group">
                  <span
                    className="h-9 flex items-center font-bold text-lg"
                    aria-hidden="true"
                  >
                    <span className=" z-10 w-20 h-20 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full ">
                      {step.step}
                    </span>
                  </span>
                  <span className="absolute left-2  top-16">{step.name}</span>
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
