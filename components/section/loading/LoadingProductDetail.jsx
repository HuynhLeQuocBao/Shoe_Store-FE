import React from "react";

const LoadingProductDetail = () => {
  const array = [];
  for (const i = 0; i < 6; i++) {
    array.push(i);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 mx-6 md:mx-0 py-10">
      <div className="mb-8 col-span-1 bg-loading-gradient h-80"></div>
      <div className="col-span-1 flex flex-col gap-2">
        <div className="mb-4 text-xl font-semibold bg-loading-gradient h-6 min-w-full"></div>
        <div className="mb-2 text-lg bg-loading-gradient h-6 min-w-full"></div>
        <div className="mb-4 text-xs bg-loading-gradient h-6 min-w-full"></div>
        <div className=" bg-loading-gradient h-6 min-w-full"></div>
        <div className="w-full mt-4 mb-8 ">
          <h3 className="pb-2 flex gap-4">
            {array.map((i) => (
              <div
                key={i}
                className="bg-loading-gradient h-10 min-w-[40px]"
              ></div>
            ))}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-5 text-xl mb-8">
          <div className="bg-loading-gradient h-10 min-w-[40%]"></div>
          <div className="bg-loading-gradient h-10 min-w-[40%]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingProductDetail;
