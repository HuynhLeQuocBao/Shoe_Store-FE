import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Collapse = ({ title, children, className, openDefault }) => {
  const [open, setOpen] = useState(openDefault ? openDefault : false);
  return (
    <div className="">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h4 className={` ${className}`}>{title}</h4>
        {open ? <FaAngleUp /> : <FaAngleDown />}
      </div>
      {open && <div>{children}</div>}
    </div>
  );
};

export default Collapse;
