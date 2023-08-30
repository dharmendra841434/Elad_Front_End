import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const ShowDropDown = ({ title, data, height, className }) => {
  return (
    <div className={` relative w-full  select-none ${className}`}>
      <div className=" relative  border-2 font-thin border-border rounded-md  w-full px-5 caret-slate-600 transition-all duration-500 ease-in-out focus:border-secoundry">
        <div
          className={`flex flex-row justify-between ${height} h-[36px] items-center `}
        >
          <h2 className={`text-sm font-normal text-primary  `}>{data}</h2>
          <MdOutlineKeyboardArrowDown
            className={` text-appgray text-xl transition-all duration-300 ease-in-out `}
          />
        </div>
      </div>
      <h4 className=" bg-white absolute -top-2 left-3 text-sm px-1 text-primary ">
        {title}
      </h4>
    </div>
  );
};

export default ShowDropDown;
