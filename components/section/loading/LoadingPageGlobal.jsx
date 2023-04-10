import React from "react";
import LoadingPage from "./LoadingPage";
import Image from "next/image";
import logo from "../../../public/images/logo/logo.png";
const LoadingPageGlobal = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="w-screen h-screen flex-center flex-col gap-2 ">
      <Image
        src={logo}
        alt="logo footwear"
        width={200}
        height={80}
        // className="animate-logo"
      />
      <div className="h-24 flex-center">
        <LoadingPage />
      </div>
    </div>
  );
};

export default LoadingPageGlobal;
