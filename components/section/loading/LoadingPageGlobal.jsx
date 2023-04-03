import React from "react";
import LoadingPage from "./LoadingPage";

const LoadingPageGlobal = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="w-full h-full flex-center absolute bg-opacity-40 bg-black top-0 left-0 z-30">
      <LoadingPage />
    </div>
  );
};

export default LoadingPageGlobal;
