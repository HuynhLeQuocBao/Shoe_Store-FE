import React from "react";
import { BestSeller } from "../product";

const Modal = ({ isVisible, onClose, children }) => {
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
      <div className="w-3/4 h-3/4 md:h-[90%] flex flex-col">
        <button
          className="text-white font-bold place-self-end text-2xl hover:text-red-500  "
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="bg-white p-8 rounded-lg h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
