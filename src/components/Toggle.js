import React from "react";

const Toggle = ({ onChange, active }) => {
  return (
    <div
      className={`h-2.5 ${
        active ? "bg-pink-500" : "bg-appgray/40"
      } w-8 rounded-lg relative`}
    >
      <div
        onClick={onChange}
        className={`h-4 w-4 rounded-full   absolute ${
          active ? "right-0 bg-secoundry " : "left-0 bg-gray-400"
        } -top-[3px] cursor-pointer`}
      />
    </div>
  );
};

export default Toggle;
