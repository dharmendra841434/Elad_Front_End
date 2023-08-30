import React from "react";
import { GoCheck } from "react-icons/go";

const CustomCheckBox = ({ className, checked, setChecked, checkClassName }) => {
  return (
    <div
      onClick={() => setChecked(!checked)}
      className={`${className} ${
        checked ? "bg-secoundry" : "bg-white"
      } h-5 w-5 flex justify-center items-center cursor-pointer transition-all ease-in-out duration-500    rounded`}
    >
      <GoCheck
        className={`${
          checked ? "block" : "hidden"
        } transition-all duration-500 ease-in-out text-white ${checkClassName}`}
      />
    </div>
  );
};

export default CustomCheckBox;
