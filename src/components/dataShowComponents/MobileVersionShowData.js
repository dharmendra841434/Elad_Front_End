import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const MobileVersionShowData = ({ title, data, children }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className=" flex items-center justify-between my-2">
        <p className=" ">
          {title} : {data}
        </p>
        <MdOutlineKeyboardArrowDown
          onClick={() => setShow(!show)}
          className={` transition-all duration-300 ease-in-out  text-xl ${
            show ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      {show && <div>{children}</div>}
    </div>
  );
};

export default MobileVersionShowData;
