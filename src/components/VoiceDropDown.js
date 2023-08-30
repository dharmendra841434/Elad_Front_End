import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const VoiceDropDown = ({
  title,
  placeholder,
  onChange,
  selectedText,
  options,
  setSelectedText,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" relative w-full  select-none">
      <div className=" relative  border-2 font-thin border-border rounded-md  w-full px-5 caret-slate-600 transition-all duration-500 ease-in-out focus:border-secoundry">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className=" flex flex-row justify-between h-[56px] items-center cursor-pointer"
        >
          <h2 className={`text-sm ${selectedText === "" && "text-appgray"}`}>
            {selectedText === "" ? placeholder : selectedText}
          </h2>
          <MdOutlineKeyboardArrowDown
            className={` text-appgray text-xl transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        {isOpen && (
          <div className=" z-30 overflow-y-scroll h-40 bg-white shadow-dropDownBox rounded-md absolute top-[4rem] left-0 right-0">
            {options.length == 0 ? (
              <div className=" h-full w-full flex items-center justify-center">
                <p className=" text-sm text-gray-300">
                  Please select language first
                </p>
              </div>
            ) : (
              <>
                {options?.map((item, index) => (
                  <div
                    className={`${
                      item.name === selectedText
                        ? " bg-blue-100 text-primary"
                        : "bg-white"
                    } hover:bg-blue-100 hover:text-primary  px-2 py-2 transition-all duration-200 ease-in-out`}
                    key={index}
                    onClick={() => {
                      setSelectedText(item.name);
                      setIsOpen(false);
                    }}
                  >
                    {`${item.name} (${item.gender})`}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      <h4 className=" bg-white absolute text-sm px-1 -top-2 left-3 font-thin text-primary ">
        {title}
      </h4>
    </div>
  );
};

export default VoiceDropDown;
