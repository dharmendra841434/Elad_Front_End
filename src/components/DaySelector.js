import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Toggle from "./Toggle";
import DropDown from "./DropDown";
import { FaTrashAlt } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { timeData } from "../assets/dummyData/timeData";

const DaySelector = ({
  title,
  options,
  toggleStatus,
  onToggleChange,
  setfromTime,
  settoTime,
  fromTime,
  toTime,
  handleAdd,
  handleRemove,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="  w-full  select-none my-5">
      <div className=" relative border-[1.5px] font-thin border-gray-500 rounded-md py-3 w-full px-5 caret-slate-600 transition-all duration-500 ease-in-out focus:border-secoundry">
        <div className=" flex flex-row justify-between items-center ">
          {/* <h2 className={`text-sm ${selectedText === "" && "text-appgray"}`}>
            {selectedText === "" ? placeholder : selectedText}
          </h2> */}
          <div className=" flex items-center">
            <Toggle onChange={onToggleChange} active={toggleStatus} />
            <h2 className=" text-[#000000] font-normal mx-5">{title}</h2>
          </div>
          <MdOutlineKeyboardArrowDown
            onClick={() => setIsOpen(!isOpen)}
            className={` text-appgray text-xl cursor-pointer transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        {isOpen && (
          <div className="  z-30 bg-white  rounded-md  ">
            {options?.map((item, index) => (
              <div key={index} className=" relative px-5 pr-14  ">
                <div className="   flex my-3 items-center ">
                  <div className=" w-full">
                    <DropDown
                      setSelectedText={(r) => setfromTime(r, index)}
                      selectedText={item.from}
                      height="h-[40px]"
                      dropDownClassName=" top-[3rem] h-48 overflow-y-scroll"
                      placeholder="9:30"
                      options={timeData}
                    />
                  </div>
                  <div className=" flex justify-center w-10">
                    <p className=" mx-4">to</p>
                  </div>
                  <div className=" w-full">
                    <DropDown
                      height="h-[40px]"
                      setSelectedText={(r) => settoTime(r, index)}
                      selectedText={item.to}
                      dropDownClassName=" top-[3rem] h-48 overflow-y-scroll"
                      placeholder="5:30"
                      options={timeData}
                    />
                  </div>
                  <div className=" absolute right-3 top-5=4 ">
                    {index > 0 ? (
                      <div className="flex  items-center">
                        <MdAddCircle
                          onClick={handleAdd}
                          className="  text-[17px]  text-primary mx-2 cursor-pointer hover:text-green-400"
                        />
                        <FaTrashAlt
                          onClick={() => {
                            handleRemove(index);
                          }}
                          className="  text-[14px] text-primary cursor-pointer hover:text-red-500 "
                        />
                      </div>
                    ) : (
                      <MdAddCircle
                        onClick={handleAdd}
                        className="  text-[17px]  text-primary mx-2 cursor-pointer hover:text-green-400"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DaySelector;
