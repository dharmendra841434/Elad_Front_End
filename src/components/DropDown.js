import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const DropDown = ({
  title,
  placeholder,
  selectedText,
  options,
  setSelectedText,
  height,
  dropDownClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" relative w-full  select-none">
      <div className=" relative  border-2 font-thin border-border rounded-md  w-full px-5 caret-slate-600 transition-all duration-500 ease-in-out focus:border-secoundry">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`flex flex-row justify-between ${height} h-[56px] items-center cursor-pointer`}
        >
          <h2
            className={`text-sm font-normal  ${
              selectedText === "" ? "text-appgray" : " text-primary"
            }`}
          >
            {selectedText === "" ? placeholder : selectedText}
          </h2>
          <MdOutlineKeyboardArrowDown
            className={` text-appgray text-xl transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        {isOpen && (
          <div
            className={`z-30 bg-white shadow-dropDownBox rounded-md absolute ${dropDownClassName} top-[4rem] left-0 right-0`}
          >
            {options?.map((item, index) => (
              <div
                className={`${
                  item === selectedText
                    ? " bg-blue-100 text-primary"
                    : "bg-white"
                } hover:bg-blue-100 hover:text-primary  px-2 py-2 transition-all duration-200 ease-in-out`}
                key={index}
                onClick={() => {
                  setSelectedText(item);
                  setIsOpen(false);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      <h4 className=" bg-white absolute -top-2 left-3 text-sm px-1 font-thin text-primary ">
        {title}
      </h4>
    </div>
  );
};

export default DropDown;
