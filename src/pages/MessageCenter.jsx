import React, { useEffect, useState } from "react";
//import { messagesData as newMessagesData } from "../utils/DummyData";
import Chat from "../components/messageCenter/Chat";
import Search from "../components/messageCenter/Search";
import { RiArrowDropDownLine } from "react-icons/ri";
import SelectBot from "../components/messageCenter/SelectBot";
import DatePicker from "../components/DatePicker";
import dayjs from "dayjs";
import { filterData } from "../utils/helper/filterData";
import { useSelector } from "react-redux";

const MessageCenter = () => {
  const messageCenter = useSelector((state) => state.app.messageCenter);
  const messageFilteredBot = useSelector(
    (state) => state.app.messageFilteredBot
  );
  console.log(messageCenter, "message Center");
  let messagesData = [];
  if (messageCenter.length === 0) {
    //messagesData = newMessagesData;
    messagesData = [];
  } else {
    messagesData = messageCenter
      .flat()
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  // this condition for bot filter
  if (messageFilteredBot._id !== 0) {
    const filteredData = messagesData.filter(
      (message) => message.bot_id === messageFilteredBot._id
    );
    messagesData = filteredData;
  }

  const [selectedNumber, setSelectedNumber] = useState(messagesData[0]?._id);
  const [isShown, setIsShown] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [choosedDate, setChoosedDate] = useState("2011-01-01 01:48");

  const clickHandler = (value) => {
    setSelectedNumber(value);
    setIsShown((current) => !current);
  };
  // message filter
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [filteredMessagesData, setFilteredMessagesData] =
    useState(messagesData);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const allOptions = ["7 Days", "1 month", "6 months", "Customized"];

  const dayHandler = (value) => {
    setSelectedDay(value);
    if (value === 3) {
      setShowDatePicker(true);
      setIsOpen(false);
    }
    setFilteredMessagesData(filterData(messagesData, value, choosedDate));
    setSelectedFilter(value);
  };

  useEffect(() => {
    setFilteredMessagesData(
      filterData(messagesData, selectedFilter, choosedDate)
    );
  }, [choosedDate]);
  useEffect(() => {
    setFilteredMessagesData(messagesData);
  }, [messageFilteredBot]);

  return (
    <div className="relative overflow-hidden">
      <div
        onClick={() => setIsOpen(false)}
        className={
          isShown
            ? `flex items-center justify-between px-4 lg:px-11`
            : `flex items-center justify-between px-4 lg:px-11 max-md:hidden`
        }
      >
        <div>
          <h1 className=" text-[24px] font-bold text-primary">
            Message Center
          </h1>
          <p className="text-[11px] mb-[14px]">
            Take a look at your Message center here
          </p>
        </div>
        <SelectBot itemClassName="w-28 lg:w-32" />
      </div>

      {/* for laptop or large screens */}
      <div className="hidden md:block">
        <div className=" flex mx-[43px] border max-h-[75%]">
          <div className="border-r w-[43%] h-[75vh]">
            <div className="flex gap-3 mx-[4.55%] mt-5 mb-5 justify-between">
              <Search />
              {/* <MessageFilter className="text-white"/> */}
              {/* message filter started */}
              {showDatePicker && (
                <DatePicker
                  setShowDatePickerC={setShowDatePicker}
                  setChoosedDateC={setChoosedDate}
                />
              )}
              <div className="hidden md:block">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="cursor-pointer flex justify-center gap-2 mt-1 bg-primary h-[32px] text-white rounded-md w-[130px]"
                >
                  <p className="mt-1">{allOptions[selectedDay]}</p>
                  <RiArrowDropDownLine className="scale-150 mt-2" />
                </button>

                {isOpen && (
                  <div onClick={() => setIsOpen(false)} className="absolute">
                    <div className=" flex justify-end mt-[-2.2rem] ml-[rem]">
                      <div className=" bg-white p-1 mr-10 pr-3 shadow-tableShadow rounded-md">
                        {allOptions.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              dayHandler(index);
                              //filterHandler();
                            }}
                            className={`py-1 text-sm px-5 pr-16 rounded-md cursor-pointer transition-all duration-800 ease-in-out
                             text-primary hover:bg-primary hover:text-white`}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Message filter ended */}
            </div>
            <div
              onClick={() => setIsOpen(false)}
              className="h-[63.3vh] overflow-y-auto"
            >
              {messageCenter.length !== 0 &&
                filteredMessagesData?.map((call) => (
                  <div
                    key={call?._id}
                    onClick={() => {
                      clickHandler(call?._id);
                    }}
                    className={
                      selectedNumber === call?._id
                        ? "border rounded-md mx-[4.55%] my-[11px] shadow-card h-[88px] bg-primary text-white cursor-pointer"
                        : "border rounded-md mx-[4.55%] my-[11px] shadow-card h-[88px] cursor-pointer"
                    }
                  >
                    <div className="flex gap-2 ml-[4.26%]">
                      <h6 className="text-base mt-[3.3%] font-medium">
                        {call?.callerName}{" "}
                        <span
                          className={
                            selectedNumber === call?._id
                              ? `mt-[3.3%] text-[9px] pl-3 text-white`
                              : `mt-[3.3%] text-[9px] pl-3 text-[#637381]`
                          }
                        >
                          {" "}
                          {/* {call.msgTime} */}
                          {dayjs(call?.date)?.format("D-MM-YYYY h:mm A")}
                        </span>
                      </h6>
                    </div>
                    <p className="text-[9px] ml-[5.26%] mt-[1%] font-normal mr-[10%] text-left">
                      {/* {call.priview} */}
                      {/* {call?.voicemail?.substring(0, 160)}
                    {" . . ."} */}
                      {call?.voicemail?.length > 150
                        ? call?.voicemail?.substring(0, 100) + "..."
                        : call?.voicemail}
                    </p>
                  </div>
                ))}
              {filteredMessagesData.length === 0 && (
                <p className="flex justify-center text-center text-gray-400 items-center mt-20">
                  No data found
                </p>
              )}
            </div>
          </div>
          {filteredMessagesData.length === 0 ? (
            <div className=" flex items-center justify-center w-full">
              <p className=" text-gray-400">No data found</p>
            </div>
          ) : (
            <Chat
              messageId={filteredMessagesData?.filter(
                (oneMessagesDate) => oneMessagesDate?._id === selectedNumber
              )}
            />
          )}
        </div>
      </div>

      {/* for mobile or small screens */}
      <div className={isShown ? "md:hidden" : "md:hidden max-md:hidden"}>
        <div className="flex mx-5 border rounded-xl h-[78vh]">
          <div className="w-[100%]">
            <div className="flex gap-2 mx-[4.55%] mt-5 mb-5 justify-between">
              <Search />
              <div className="bg-primary text-white items-center p-2 px-3 my-1 rounded-lg">
                {/* <MessageFilter /> */}
                {/* Message filter started */}
                {showDatePicker && (
                  <DatePicker
                    setShowDatePickerC={setShowDatePicker}
                    setChoosedDateC={setChoosedDate}
                  />
                )}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden cursor-pointer bg-primary text-white w-[88px] rounded-xl select-none"
                >
                  <p>{allOptions[selectedDay]}</p>

                  {isOpen && (
                    <div
                      onClick={() => setIsOpen(false)}
                      className="top-0 right-0 absolute "
                    >
                      <div className="flex justify-end mt-[5.4rem] mr-[1.25rem]">
                        <div className=" bg-white  shadow-tableShadow rounded-md">
                          {allOptions.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                dayHandler(index);
                              }}
                              className="py-1 text-sm px-5 pr-16 rounded-md cursor-pointer transition-all duration-600 ease-in-out text-primary hover:bg-primary hover:text-white"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </button>
                {/* Message filter ended */}
              </div>
            </div>
            <div
              onClick={() => setIsOpen(false)}
              className="h-[64vh] overflow-y-scroll"
            >
              {messageCenter.length !== 0 &&
                filteredMessagesData?.map((call) => (
                  <div
                    key={call?._id}
                    onClick={() => {
                      clickHandler(call?._id);
                    }}
                    className={
                      selectedNumber === call?._id
                        ? "border rounded-md mx-[2.55%] my-[3%] shadow-card h-[80px] bg-primary text-white cursor-pointer"
                        : "border rounded-md mx-[2.55%] my-[3%] shadow-card h-[80px] cursor-pointer"
                    }
                  >
                    <h6 className="text-base ml-[4%] mt-[3.3%] font-medium">
                      {call?.callerName}
                      <span
                        className={
                          selectedNumber === call?._id
                            ? `mt-[3.3%] text-[9px] pl-3 text-white`
                            : `mt-[3.3%] text-[9px] pl-3 text-[#637381]`
                        }
                      >
                        {" "}
                        {dayjs(call?.date).format("D-MM-YYYY h:mm A")}
                      </span>
                    </h6>

                    <p className="text-[9px] ml-[5.26%] mt-[0.5%] font-normal">
                      {call?.voicemail?.length > 100
                        ? call?.voicemail?.substring(0, 100) + "..."
                        : call?.voicemail}
                    </p>
                  </div>
                ))}
              {messageCenter.length === 0 && (
                <p className="flex justify-center">No data found</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={isShown ? "md:hidden hidden" : "md:hidden"}>
        {/* <Chat messageId={filteredMessagesData[selectedNumber]} setShow={setIsShown} /> */}
        <Chat
          messageId={filteredMessagesData?.filter(
            (oneMessagesDate) => oneMessagesDate?._id === selectedNumber
          )}
          setShow={setIsShown}
        />
      </div>
    </div>
  );
};

export default MessageCenter;
