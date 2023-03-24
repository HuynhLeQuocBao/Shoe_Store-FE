import Complete from "pages/order-complete";
import { useEffect } from "react";
import { useState } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { HiOutlineCheckCircle, HiTruck, HiClock } from "react-icons/hi";

export function ProcessOrder({ status }) {
  const [pending, setPending] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [inTransit, setInTransit] = useState("");
  const [complete, setComplete] = useState("");
  useEffect(() => {
    if (status === 0) {
      setPending("complete");
      setConfirmed("upcoming");
      setInTransit("upcoming");
      setComplete("upcoming");
    } else if (status === 1) {
      setPending("complete");
      setConfirmed("complete");
      setInTransit("upcoming");
      setComplete("upcoming");
    } else if (status === 2) {
      setPending("complete");
      setConfirmed("complete");
      setInTransit("complete");
      setComplete("upcoming");
    } else {
      setPending("complete");
      setConfirmed("complete");
      setInTransit("complete");
      setComplete("complete");
    }
  }, [status]);
  const steps = [
    { name: "Pending", icon: <HiClock />, status: pending },
    { name: "Confirmed", icon: <HiShoppingCart />, status: confirmed },
    { name: "In Transit", icon: <HiTruck />, status: inTransit },
    { name: "Complete", icon: <HiOutlineCheckCircle />, status: complete },
  ];
  return (
    <div className="w-full flex justify-center items-center px-20">
      <div className="flex justify-center items-center w-full pl-14">
        {steps.map((step, index) =>
          step.status === "complete" ? (
            <div class="w-full  mb-8 relative " key={index}>
              <div
                class={`relative h-20  
                                    ${
                                      index === steps.length - 1
                                        ? ""
                                        : "before:absolute before:content-[''] before:w-full before:top-1/2 before:h-1  before:left-0 before:z-[1] before:bg-green-400"
                                    } 
                    `}
              >
                <div
                  class={`relative  w-20 h-20 border-[1px] rounded-[50%] text-[38px] z-10 flex justify-center items-center
                                       bg-green-400 text-white
                                `}
                >
                  {step.icon}
                </div>
              </div>
              <h4 class="mt-4 mb-0 -ml-4 font-semibold text-sm w-28 text-center">
                {step.name}
              </h4>
            </div>
          ) : (
            <div class="w-full  mb-8 relative " key={index}>
              <div
                class={`relative h-20  
                                    ${
                                      index === steps.length - 1
                                        ? ""
                                        : "before:absolute before:content-[''] before:w-full before:top-1/2 before:h-1  before:left-0 before:z-[1] before:bg-slate-100"
                                    } 
                    `}
              >
                <div
                  class={`relative  w-20 h-20 border-[1px] rounded-[50%] text-[38px] z-10 flex justify-center items-center
                                       bg-slate-100 text-black
                                `}
                >
                  {step.icon}
                </div>
              </div>
              <h4 class="mt-4 mb-0 -ml-4 font-semibold text-sm w-28 text-center">
                {step.name}
              </h4>
            </div>
          )
        )}
      </div>
    </div>
  );
}
