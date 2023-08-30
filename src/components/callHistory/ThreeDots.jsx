import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const ThreeDots = ({ onDownloadMp3, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  //const ref = useRef(null);
  const visibleRef = useRef(null);
  const hiddenRef = useRef(null);

  // useEffect(() => {
  //     const handleClickOutside = (event) => {
  //       if (ref.current && !ref.current.contains(event.target)) {
  //         setIsOpen(false);
  //       }
  //     };

  //     document.addEventListener("mousedown", handleClickOutside);

  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, [ref]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        visibleRef.current &&
        !visibleRef.current.contains(event.target) &&
        hiddenRef.current &&
        !hiddenRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visibleRef, hiddenRef]);

  const allOptions = ["Delete", "Download mp3"];
  return (
    <>
      <div className="hidden md:block">
        <BsThreeDotsVertical
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl cursor-pointer"
        />
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="top-0 right-0  absolute"
          >
            <div className=" flex justify-end lg:mt-[1rem] xl:mr-[4.3%] lg:mr-[4.5%] md:mr-[4%] md:mt-[1rem]">
              <div
                ref={visibleRef}
                className=" bg-white  shadow-tableShadow rounded-md w-[215px] p-1"
              >
                {allOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      if (item === "Download mp3") {
                        onDownloadMp3(item);
                        return;
                      }

                      if (item === "Delete") {
                        onDelete(item);
                        return;
                      }
                    }}
                    className="py-1 text-sm px-5 rounded-md cursor-pointer transition-all duration-300 ease-in-out text-primary hover:bg-primary hover:text-white"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="md:hidden">
        <BsThreeDotsVertical
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl cursor-pointer"
        />
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="top-0 right-0 absolute"
          >
            <div className=" flex justify-end mt-3 mr-9 ">
              <div
                ref={hiddenRef}
                className=" bg-white  shadow-tableShadow rounded-md"
              >
                {allOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      if (item === "Download mp3") {
                        onDownloadMp3(item);
                        return;
                      }

                      if (item === "Delete") {
                        onDelete(item);
                        return;
                      }
                    }}
                    className="py-1 text-sm px-5 rounded-md cursor-pointer transition-all duration-300 ease-in-out text-primary hover:bg-primary hover:text-white"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ThreeDots;
