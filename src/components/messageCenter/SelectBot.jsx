import React, { useState, useRef, useEffect } from "react";
import { RiArrowUpSLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setMessageFilteredBot } from "../../redux/AppSlice";

function SelectBot({ className, itemClassName }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const [selectedBot, setSelectedBot] = useState("");

  const allOptions = useSelector((state) => state.app.botsList);

  const [listOfBots, setListOfBots] = useState([]);
  const dispatch = useDispatch();

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

  const showBots = () => {
    setListOfBots(allOptions?.map((r) => ({_id:r._id, botName:r.details.botName})));
    if (listOfBots?.length > 0) {
      let t = [...listOfBots];
      // if (!t.includes("All")) {
      //   t.unshift("All");
      // }
      if (t[0].botName !== "All") {
        t.unshift({_id:0, botName:"All"});
      }
      setListOfBots(t);
    }
  };
  useEffect(() => {
    showBots();
  }, [isOpen]);

  // console.log(listOfBots, "sdjkj");
  return (
    <div ref={ref}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className=" flex items-center justify-center bg-primary text-white w-28 lg:w-32 py-0.5 rounded-md"
      >
        <p className=" text-sm  py-1">
          {selectedBot === "" ? "Select Bot" : selectedBot}
        </p>
        <RiArrowUpSLine
          className={`ml-2 ${isOpen ? "rotate-0" : "rotate-180"}`}
        />
      </button>
      <div
        className={` z-30 absolute bg-white shadow-dropDownBox  rounded-lg overflow-hidden ${className}`}
      >
        {isOpen && (
          <ul>
            <>
              {listOfBots?.map((option, index) => (
                <li
                  onClick={() => {
                    setSelectedBot(option.botName);
                    console.log(option);
                    dispatch(setMessageFilteredBot(option));
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer py-1 px-2 transition-all rounded-lg duration-300 ease-in-out hover:bg-primary hover:text-white ${itemClassName}`}
                  key={index}
                >
                  {option.botName}
                </li>
              ))}
            </>
          </ul>
        )}
      </div>
    </div>
  );
}

export default SelectBot;
