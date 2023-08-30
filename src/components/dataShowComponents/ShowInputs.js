import React from "react";

const ShowInputs = ({ title, placeholder, data, onFocus, className }) => {
  return (
    <div className={`relative w-full z-10 ${className}`}>
      <div
        onFocus={onFocus}
        className=" flex  items-center  text-primary text-sm border-2  border-border rounded-md   h-[56px] w-full  pl-3 caret-slate-600 transition-all duration-500 ease-in-out focus:border-pink-300"
      >
        <p className=" text-primary "> {data}</p>
      </div>
      <h1 className=" bg-white absolute -top-2 left-3 text-primary text-sm px-1 ">
        {title}
      </h1>
    </div>
  );
};

export default ShowInputs;
