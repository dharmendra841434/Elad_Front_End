import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

function OutsideCloseDropDown({
  options,
  className,
  setSelectedOption,
  setIsOpen,
  isOpen,
}) {
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

  return (
    <div ref={ref}>
      <div
        className={`absolute bg-white shadow-dropDownBox  rounded-lg overflow-hidden ${className}`}
      >
        {isOpen && (
          <ul>
            {options.map((option, index) => (
              <li
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                }}
                className=" cursor-pointer py-1 px-2 transition-all rounded-lg duration-300 ease-in-out hover:bg-primary hover:text-white"
                key={index}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default OutsideCloseDropDown;
