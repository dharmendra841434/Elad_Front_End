import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const SumaryHeading = ({ title, onClick }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="  select-none">
      <div className=" flex items-center justify-between">
        <p className="  text-primary font-semibold">{title}</p>
        <div
          onClick={() => {
            setShow(!show);
            onClick();
          }}
          className={`flex items-center border border-primary ${
            show ? "bg-primary text-white" : "bg-white text-primary"
          } rounded-md cursor-pointer px-3 py-1`}
        >
          <p className=" text-[13px]">{show ? "Hide" : "Show"}</p>
          <MdKeyboardArrowDown
            className={` transition-all duration-300 ease-in-out  ${
              show ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default SumaryHeading;
