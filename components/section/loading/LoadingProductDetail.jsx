import React from "react";

const LoadingProductDetail = () => {
  const array = [];
  for (const i = 0; i < 6; i++) {
    array.push(i);
  }
  const arraySize = [];
  for (const i = 0; i < 8; i++) {
    arraySize.push(i);
  }
  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 mx-6 md:mx-0 py-10">
    //   <div className="mb-8 col-span-1 bg-loading-gradient h-80"></div>
    //   <div className="col-span-1 flex flex-col gap-2">
    //     <div className="mb-4 text-xl font-semibold bg-loading-gradient h-10 min-w-full"></div>
    //     <div className="mb-2 text-lg bg-loading-gradient h-10 min-w-full"></div>
    //     <div className="mb-4 text-xs bg-loading-gradient h-10 min-w-full"></div>
    //     <div className=" bg-loading-gradient h-10 min-w-full"></div>
    //     <div className="w-full mt-4 mb-8 ">
    //       <h3 className="pb-2 flex gap-4">
    //         {array.map((i) => (
    //           <div
    //             key={i}
    //             className="bg-loading-gradient h-10 min-w-[40px]"
    //           ></div>
    //         ))}
    //       </h3>
    //     </div>
    //     <div className="grid grid-cols-2 gap-5 text-xl mb-8">
    //       <div className="bg-loading-gradient h-10 min-w-[40%]"></div>
    //       <div className="bg-loading-gradient h-10 min-w-[40%]"></div>
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:gap-2 mx-6 lg:mx-0 py-10">
      <div className="flex flex-col justify-between lg:hidden ">
        <h2 className="mb-2 text-3xl font-semibold bg-loading-gradient h-10 max-w-[50%]"></h2>
        <h3 className="mb-2 text-lg bg-loading-gradient h-10 max-w-[120px]"></h3>
        <h3 className="mb-4 text-xs bg-loading-gradient h-10 max-w-[50%]"></h3>
        <p className=" text-secondary font-light text-justify bg-loading-gradient h-12 max-w-full "></p>
      </div>
      <div className="mb-4 col-span-2 ">
        <div className="block lg:hidden bg-loading-gradient h-80 max-w-full"></div>
        <div className="hidden lg:flex flex-wrap gap-2">
          {array?.map((item) => (
            <div
              key={item}
              className="bg-loading-gradient h-80 min-w-[350px]"
            ></div>
          ))}
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col justify-between">
          <h2 className="mb-2 text-3xl font-semibold bg-loading-gradient h-10 max-w-[50%]"></h2>
          <h3 className="mb-2 text-lg bg-loading-gradient h-10 max-w-[120px]"></h3>
          <h3 className="mb-2 text-xs bg-loading-gradient h-10 max-w-[50%]"></h3>
          <p className="mb-2 bg-loading-gradient h-10 max-w-full "></p>
          <div className="mb-2 flex items-center bg-loading-gradient h-10 max-w-[60%]"></div>
          <div className="w-full mt-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="mb-2 bg-loading-gradient h-10 min-w-[80px]"></div>
              <div className="mb-2 bg-loading-gradient h-10 min-w-[80px]"></div>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-2">
              {arraySize?.map((item) => (
                <div key={item} className="w-40 h-10 bg-loading-gradient"></div>
              ))}
            </div>
          </div>
          <div className=" bg-loading-gradient h-10 max-w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingProductDetail;
