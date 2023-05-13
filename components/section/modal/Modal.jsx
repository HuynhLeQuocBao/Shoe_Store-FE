import React from "react";
import { BestSeller } from "../product";

const Modal = ({ isVisible, onClose, children, className }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-[98]"
      id="wrapper"
      onClick={handleClose}
    >
      <div className={`w-3/4 h-3/4  flex flex-col ${className}`}>
        <button
          className="text-white font-bold place-self-end text-2xl hover:text-red-500  "
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="bg-white  rounded-lg h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
