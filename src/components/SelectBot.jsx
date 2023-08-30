import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { bot } from "../utils/DummyData";
import { useSelector } from "react-redux";

const SelectBot = (props) => {
  const { classname } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBot, setSelectedBot] = useState("");

  const allOptions = useSelector((state) => state.app.botsList);

  // const clickHandler = (value) => {
  //  setBotName(allOptions[index])
  // console.log(allOptions, "mnnn");

  return (
    <div className=" relative">
      <div className="hidden md:block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 px-6 gap-1 cursor-pointer bg-primary text-white flex rounded-[8px] min-w-[7rem] justify-center"
        >
          <p> {selectedBot === "" ? "Select Bot" : selectedBot}</p>
          <RiArrowDropDownLine className="scale-150 mt-1" />
        </button>
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className=" left-0 top-0  bottom-0 z-10 absolute"
          >
            <div className={`${classname} flex justify-end`}>
              <div className=" bg-white p-[5px] shadow-tableShadow rounded-md">
                {allOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedBot(item.details.botName);
                    }}
                    className="py-[4px] mt-[5px] text-sm font-normal w-[215px] pr-[28px] pl-[5px] rounded-md cursor-pointer transition-all duration-800 ease-in-out text-primary hover:bg-primary hover:text-white"
                  >
                    {item.details.botName}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[0.8rem] p-2 cursor-pointer bg-primary text-white flex rounded-xl min-w-[6rem] justify-center"
        >
          <span> {selectedBot === "" ? "Select Bot" : selectedBot}</span>{" "}
          <span>
            <RiArrowDropDownLine />
          </span>
        </button>
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className=" left-0 top-0 right-0 bottom-0 z-10 absolute "
          >
            <div className={`${classname} flex justify-end`}>
              <div className=" bg-white  shadow-tableShadow rounded-md">
                {allOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedBot(item.details.botName);
                    }}
                    className="py-1 text-sm pl-[10px] pr-[8rem] rounded-md cursor-pointer transition-all duration-600 ease-in-out text-primary hover:bg-primary hover:text-white"
                  >
                    {item.details.botName}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectBot;
