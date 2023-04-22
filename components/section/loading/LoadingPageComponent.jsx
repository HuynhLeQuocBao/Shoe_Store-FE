import React from "react";
import LoadingPage from "./LoadingPage";

const LoadingPageComponent = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="fixed top-0 left-0 h-full w-full z-[99]">
      <div className="w-full h-full flex-center absolute bg-opacity-40 bg-black  ">
        <LoadingPage />
      </div>
    </div>
  );
};

export default LoadingPageComponent;
