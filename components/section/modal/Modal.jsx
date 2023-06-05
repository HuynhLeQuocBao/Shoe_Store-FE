import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ isVisible, onClose, children, title, className, scroll }) => {
  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isVisible]);
  return (
    <>
      {isVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-[98]"
          id="wrapper"
          onClick={handleClose}
        >
          <div
            className={`bg-white mx-auto w-[400px] sm:w-[576px] md:w-[768px] rounded-md h-full md:mt-10 md:h-[95%] ${className}`}
          >
            <div className="w-full flex justify-between items-center border-b border-zinc-300 px-5 sm:px-0">
              <h1 className="text-base md:text-xl font-bold pl-2">{title}</h1>
              <div
                onClick={() => onClose()}
                className="w-10 h-10 rounded-full flex justify-center items-center text-2xl duration-200 hover:bg-slate-300 hover:cursor-pointer hover:text-red-500"
              >
                <AiOutlineClose />
              </div>
            </div>
            <div
              className={`min-h-[60px] h-full flex items-center overflow-hidden z-10 bg-white ${
                scroll ? "overflow-y-auto" : ""
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
