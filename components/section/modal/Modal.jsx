import React from "react";
import { BestSeller } from "../product";
import { AiOutlineCloseCircle } from "react-icons/ai";

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
      <div
        className={`bg-white w-full h-full md:w-3/4 md:h-3/4 md:rounded-lg ${className}`}
      >
        <div className="pt-10 h-full overflow-y-auto relative">
          <button
            className="text-black font-bold text-3xl hover:text-red-500 absolute top-3 right-3"
            onClick={() => onClose()}
          >
            <AiOutlineCloseCircle />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
