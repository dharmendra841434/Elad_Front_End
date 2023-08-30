import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

function MoreOptions({
  options,
  className,
  setSelectedOption,
  itemClassName,
  dotClassName,
  status,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const [allOptions, setAllOptions] = useState(options);
  const archive = ["Re-Activate"];

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

  // useEffect(() => {
  //   if (status === "archive") {
  //     setAllOptions(allOptions.filter((r) => r !== "archive"));
  //     console.log("archive");
  //   }
  // }, []);

  return (
    <div ref={ref}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <BsThreeDotsVertical className={`${dotClassName}`} />
      </button>
      <div
        className={`absolute bg-white shadow-dropDownBox  rounded-lg overflow-hidden ${className}`}
      >
        {isOpen && (
          <ul>
            {status === "archive" ? (
              <>
                {archive?.map((option, index) => (
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
            ) : (
              <>
                {allOptions?.map((option, index) => (
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
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MoreOptions;
