import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiArrowUpSLine } from "react-icons/ri";
import { useSelector } from "react-redux";

function DayFilter({
  className,
  itemClassName,
  selectedOption,
  setSelectedOption,
  data,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  // console.log(listOfBots, "sdjkj");
  return (
    <div ref={ref}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className=" flex items-center justify-start  text-sm font-medium text-primary w-32 py-0.5 rounded-md"
      >
        <p>{selectedOption == "" ? data[0] : selectedOption}</p>
        <RiArrowUpSLine
          className={`ml-2 ${isOpen ? "rotate-0" : "rotate-180"}`}
        />
      </button>
      <div
        className={`absolute bg-white shadow-dropDownBox  rounded-lg overflow-hidden ${className}`}
      >
        {isOpen && (
          <ul>
            <>
              {data?.map((option, index) => (
                <li
                  onClick={() => {
                    setSelectedOption(option);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer py-1 px-2 transition-all rounded-lg duration-300 ease-in-out hover:bg-primary hover:text-white ${itemClassName}`}
                  key={index}
                >
                  {option}
                </li>
              ))}
            </>
          </ul>
        )}
      </div>
    </div>
  );
}

export default DayFilter;
