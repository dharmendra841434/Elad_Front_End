import React, { useEffect, useState } from "react";
import Search from "../components/callHistory/Search";
import { useDispatch, useSelector } from "react-redux";
import { MdCallMade } from "react-icons/md";
import Chat from "../components/callHistory/Chat";
import { MdFilterAlt } from "react-icons/md";
import SelectBot from "../components/callHistory/SelectBot";
import { setSelectedNumber, setViewCallHistory } from "../redux/CallSlice";
import { dateFormat } from "../utils/helper/dateFormat";
import CustomModal from "../components/CustomModal";
import { Puff } from "react-loader-spinner";
// import BlurAnimation from "../components/BlurAnimation";

const CallHistory = () => {
  const callHistory = useSelector((state) => state.app.callHistory);
  const selectedNumber = useSelector((state) => state.call.selectedNumber);
  const viewCallHistory = useSelector((state) => state.call.viewCallHistory);
  const callFilteredBot = useSelector((state) => state.call.callFilteredBot);
  const deleteCall = useSelector((state) => state.call.deleteCall);
  const deleteLoader = useSelector((state) => state.call.deleteLoader);
  const [isShown, setIsShown] = useState(true);

  let callsdata = [];
  if (callHistory.length === 0) {
    callsdata = [];
  } else {
    callsdata = callHistory
      .flat()
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log(callsdata, "date testing of sorting");
  }

  // for call filter
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCallType, setSelectedCallType] = useState("All Calls");
  const dispatch = useDispatch();

  // Don't remove the spaces form allOptions
  const allOptions = [
    "All Calls",
    "Done Calls",
    "Missed Calls     ",
    "Bot Abandoned Calls     ",
    "Transferred to Human Calls",
  ];
  // this condition for call type filter
  let callsData = [];
  if (selectedCallType === "All Calls") {
    callsData = callsdata;
  } else {
    let callStatus = selectedCallType.substring(0, selectedCallType.length - 6);
    const filteredData = callsdata.filter((call) => call.status === callStatus);
    callsData = filteredData;
  }
  // this condition for bot filter
  if (callFilteredBot._id !== 0) {
    const filteredData = callsData.filter(
      (call) => call.bot_id === callFilteredBot._id
    );
    callsData = filteredData;
  }

  const clickHandler = (value) => {
    dispatch(setSelectedNumber(value));
    setIsShown((current) => !current);
  };

  const callTypeHandler = (value) => {
    setSelectedCallType(value);
    dispatch(setSelectedNumber(callsData[0]?._id));
    console.log(viewCallHistory, "last testing");
  };

  useEffect(() => {
    if (viewCallHistory === true) {
      setIsShown(false);
      dispatch(setViewCallHistory(false));
    } else {
      dispatch(setSelectedNumber(callsData[0]?._id));
    }
  }, [selectedCallType, callFilteredBot, deleteCall]);

  console.log(callHistory, "clsk");

  return (
    <div className="relative overflow-hidden md:h-[88vh] ">
      {/* top of the page need same on mobile and Laptop*/}
      <div
        onClick={() => setIsOpen(false)}
        className={
          isShown
            ? `flex items-center justify-between px-4 lg:px-11`
            : `flex items-center justify-between px-4 lg:px-11 max-md:hidden`
        }
      >
        <div>
          <h1 className="text-[24px] font-bold text-primary">Call History</h1>
          <p className="text-[11px] mb-[14px]">
            Take a look at your call history here
          </p>
        </div>
        <SelectBot itemClassName=" w-32" />
      </div>
      <CustomModal isOpen={deleteLoader}>
        <div className=" flex items-center justify-center">
          <div className=" bg-white p-8 h-fit w-fit rounded-md">
            <Puff
              height="100"
              width="100"
              radius={1}
              color="#FF0066"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </div>
      </CustomModal>
      {/* <BlurAnimation /> */}

      {/* call History for laptop */}
      <div className="hidden md:flex h-[86%] mb-[104px] w-[92.5%] mx-[43px] border-y border-l">
        <div className="mx-[16px] min-w-[351px] max-xl:min-w-[250px] overflow-hidden">
          <div className="flex mt-[24px] mb-[24px] gap-2">
            <Search />
            {/* call filter start */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="hidden md:block cursor-pointer p-3 bg-primary text-white rounded-xl"
            >
              <MdFilterAlt className="scale-150" />
              {isOpen && (
                <div onClick={() => setIsOpen(false)} className="absolute">
                  <div className=" flex justify-end mt-[-1.8rem] ml-[-12.6rem] ">
                    <div className=" bg-white shadow-tableShadow rounded-md py-2">
                      {allOptions?.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            callTypeHandler(allOptions[index]);
                          }}
                          className="py-1 text-sm px-5 rounded-md cursor-pointer transition-all duration-800 ease-in-out text-primary hover:bg-primary hover:text-white"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* call filter end */}
          </div>
          <div
            onClick={() => setIsOpen(false)}
            className="h-[85%] overflow-y-auto scrollbar-hide scroll-smooth"
          >
            {callsData.length === 0 ? (
              <div className=" w-full h-full flex items-center justify-center">
                <p className=" text-sm font-light text-gray-400 ">
                  You have No Any Call History Data
                </p>
              </div>
            ) : (
              callsData?.map((call) => (
                <div
                  key={call?._id}
                  onClick={() => {
                    clickHandler(call._id);
                  }}
                  className={
                    selectedNumber === call._id
                      ? "border rounded-md mb-[5px] shadow-card h-[71px] cursor-pointer bg-primary text-white"
                      : "border rounded-md mb-[5px] shadow-card h-[71px] cursor-pointer"
                  }
                >
                  <div className="flex justify-between ml-[6.26%]">
                    <h6 className="text-base mt-[3.3%] font-medium">
                      {call?.callerPhoneNumber}
                    </h6>
                    <p className="mr-[6.26%] mt-[3%] text-[11px]">
                      {call?.botName}
                    </p>
                  </div>
                  <p className="text-[11px] ml-[6.26%] mt-[1%] font-normal">
                    <span
                      className={`${
                        call?.status === "Bot Abandoned Call"
                          ? " text-[#C6C613]"
                          : call?.status === "Missed Call"
                          ? "text-[#FF0000]"
                          : " text-[#10C300]"
                      }`}
                    >
                      <MdCallMade className="inline" />{" "}
                      <span>{call?.status} </span>
                    </span>
                    ({call?.frequency}) {dateFormat(call?.date)}
                  </p>
                </div>
              ))
            )}
            {/* {callHistory.length === 0 && (
              <p className="flex justify-center">No Data to show</p>
            )} */}
          </div>
        </div>
        <div
          onClick={() => setIsOpen(false)}
          className="border-x w-[73%] h-full overflow-hidden"
        >
          {callsData.length === 0 ? (
            <div className=" h-full w-full flex items-center justify-center">
              <p className=" text-sm font-light text-gray-400 ">
                You have No Any Call History Chat
              </p>
            </div>
          ) : (
            <>
              <Chat phoneNoId={selectedNumber} callsData={callsData} />
            </>
          )}
        </div>
      </div>

      {/* Call history for mobile */}
      <div className={isShown ? "md:hidden" : "md:hidden max-md:hidden"}>
        <div className="flex mx-5 border rounded-2xl max-h-[80%]">
          <div className=" w-[100%] h-[78vh]">
            <div className="flex gap-2 mx-[4.55%] mt-5 mb-5 justify-between">
              <Search />
              <div className="bg-primary text-white p-3 rounded-lg">
                {/* <CallFilter /> */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden cursor-pointer"
                >
                  <MdFilterAlt className="scale-150" />
                  {isOpen && (
                    <div
                      onClick={() => setIsOpen(false)}
                      className="top-0 right-0 absolute "
                    >
                      <div className="flex justify-end mt-[5.3rem] mr-[1.25rem]">
                        <div className=" bg-white shadow-tableShadow rounded-md">
                          {allOptions?.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                callTypeHandler(allOptions[index]);
                              }}
                              className="py-1 text-sm px-5 rounded-md cursor-pointer transition-all duration-600 ease-in-out text-primary hover:bg-primary hover:text-white"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* call filter ended  */}
              </div>
            </div>
            <div
              onClick={() => setIsOpen(false)}
              className="h-[85%] overflow-y-auto scrollbar-hide scroll-smooth"
            >
              {callHistory.length !== 0 &&
                callsData?.map((call) => (
                  <div
                    key={call?._id}
                    onClick={() => {
                      clickHandler(call._id);
                    }}
                    className={
                      selectedNumber === call._id
                        ? "border rounded-md mx-[4.55%] my-[1%] shadow-card h-[80px] bg-primary text-white cursor-pointer"
                        : "border rounded-md mx-[4.55%] my-[1%] shadow-card h-[80px] cursor-pointer"
                    }
                  >
                    <div className="flex justify-between ml-[6.26%]">
                      <h6 className="text-base mt-[3.3%] font-medium">
                        {call?.callerPhoneNumber}
                      </h6>
                      <p className="mr-[6.26%] mt-[3%] text-[11px] ">
                        {call?.botName}
                      </p>
                    </div>
                    <p className="text-[11px] ml-[6.26%] mt-[1%] font-normal">
                      <span
                        className={`${
                          call?.status === "Bot Abandoned Call"
                            ? " text-[#C6C613]"
                            : call?.status === "Missed Call"
                            ? "text-[#FF0000]"
                            : " text-[#10C300]"
                        }`}
                      >
                        <MdCallMade className="inline" />{" "}
                        <span>{call?.status} </span>
                      </span>
                      ({call?.frequency}) {dateFormat(call?.date)}
                    </p>
                  </div>
                ))}
              {callsData.length === 0 && (
                <p className=" text-sm font-light text-gray-400 mt-44 ml-16">
                  You have No Any Call History Data
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={isShown ? "md:hidden hidden" : "md:hidden"}>
        <Chat
          phoneNoId={selectedNumber}
          callsData={callsData}
          setShow={setIsShown}
        />
      </div>
    </div>
  );
};

export default CallHistory;
