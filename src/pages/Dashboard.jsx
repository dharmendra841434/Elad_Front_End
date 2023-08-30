import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllBotsActivityData } from "../utils/DummyData";
import { convertSecondsToHMS } from "../utils/helper/helperFunctions";
import SelectBot from "../components/callHistory/SelectBot";
import DayFilter from "../components/DayFilter";
import CustomAreaChart from "../components/dashboard/CustomAreaChart";
import DatePicker from "../components/DatePicker";
import axios from "axios";
import { setCallHistoryData, setMessageCenterData } from "../redux/AppSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const listOfBots = useSelector((state) => state.app.botsList);
  const messageCenter = useSelector((state) => state.app.messageCenter);
  const userData = useSelector((state) => state.app.userData);
  const callHistory = useSelector((state) => state.app.callHistory);
  const [dayfilter, setDayfilter] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [choosedDate, setChoosedDate] = useState("2011-01-01 01:48");
  const [branches, setBranches] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const callData = [
    {
      branchName: "The Tech Team",
      totalCalls: 139,
    },
    {
      branchName: "Visualization",
      totalCalls: 119,
    },
    {
      branchName: "Store Traffic",
      totalCalls: 122,
    },
    {
      branchName: "In-House Support",
      totalCalls: 89,
    },
  ];
  const country = [
    {
      countryName: "Israel",
      number: 34,
    },
    {
      countryName: "India",
      number: 29,
    },
    {
      countryName: "USA",
      number: 27,
    },
    {
      countryName: "Canada",
      number: 18,
    },
    {
      countryName: "UAE",
      number: 14,
    },
    {
      countryName: "Saudi Arabia",
      number: 28,
    },
  ];

  const topFAQs = [
    {
      question:
        "What is the return policy for your online organic grocery store?",
      frequency: 37,
    },
    {
      question: "What kind of products do you sell?",
      frequency: 29,
    },
    {
      question:
        "What kinds of products are available in your online organic grocery store?",
      frequency: 8,
    },
    {
      question: "Why should I shop at your online organic grocery store?",
      frequency: 18,
    },
    {
      question:
        "How do I place an order with your online organic grocery store?",
      frequency: 22,
    },
  ];

  const testData = [
    {
      phone: "+16502755608",
    },
    {
      phone: "+17978957159",
    },
  ];

  //console.log(callHistory, "history");

  useEffect(() => {
    let t = listOfBots.map((item) => item.details.branches);
    setBranches(t.flat(1));
  }, []);

  return (
    <div className=" px-4 py-4">
      <span className=" text-primary font-bold text-2xl">
        Welcome Back,<span className=" capitalize"> {userData?.firstname}</span>
      </span>
      <div className=" flex justify-between items-center my-4">
        {showDatePicker && (
          <DatePicker
            setShowDatePickerC={setShowDatePicker}
            setChoosedDateC={setChoosedDate}
          />
        )}
        <DayFilter
          data={["7 Days", "1 month", "6 months", "Customized "]}
          setSelectedOption={(r) => {
            setDayfilter(r);
            if (r === "Customized ") {
              setShowDatePicker(true);
            }
          }}
          selectedOption={dayfilter}
        />
        <SelectBot itemClassName=" w-32" />
      </div>
      <div className=" border-2 border-gray-200  py-5 px-2 my-4 rounded-md ">
        <div className=" grid grid-cols-1  md:grid-cols-3 gap-4 lg:gap-0   lg:grid-cols-5 ">
          {AllBotsActivityData?.map((item, index) => (
            <div
              key={index}
              className={` px-5 py-3 rounded-md shadow-dropDownBox md:shadow-none ${
                index !== AllBotsActivityData.length - 1 &&
                "border-r-2 border-gray-200"
              }`}
            >
              <h2 className=" font-medium text-primary">{item.title}</h2>
              <h1 className=" font-bold text-xl text-secoundry ">
                {item.title === "Total Calls Received"
                  ? `${callHistory?.flat(1)?.length}`
                  : item.title === "Avg. Call Duration"
                  ? `${convertSecondsToHMS(item.number)}`
                  : item.title === "Number of Message"
                  ? `${`${messageCenter?.flat(1)?.length}`}`
                  : `${item.number}`}
              </h1>
              <span
                className={`text-[13px] invisible ${
                  item.progress < 0 ? "text-red-600" : "text-green-500"
                }`}
              >
                {item.progress > 0 ? `+${item.progress}` : item.progress}
                <span className=" text-gray-800 mx-1">From last month</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className=" pt-3">
        <h3 className=" text-primary font-medium mb-6 ">
          Total Calls Received
        </h3>
        <CustomAreaChart />
      </div>
      <div className=" my-6 lg:flex  ">
        <div className=" lg:w-[40%]   p-2">
          <div className=" border border-gray-300 rounded-md py-8">
            <p className=" font-semibold text-primary text-lg  ml-5">
              Top Branch
            </p>
            <div className=" mx-3 px-5 mt-2 font-normal text-sm py-2 rounded-md bg-primary text-white flex items-center justify-between">
              <p>Branch Name</p>
              <p>Calls Received</p>
            </div>
            <div className=" flex items-center justify-between px-8">
              <div>
                {branches?.map((item, index) => (
                  <div className=" my-3" key={index}>
                    {item.branchName}
                  </div>
                ))}
              </div>
              <div>
                {[12, 63, 83].map((item, index) => (
                  <div key={index} className=" my-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            {/* {callData?.map((item, index) => (
              <div
                key={index}
                className=" mx-3 px-5 my-3 font-normal text-sm py-2 rounded-md text-primary flex items-center justify-between"
              >
                <p>{item.branchName}</p>
                <p className=" mr-9">{item.totalCalls}</p>
              </div>
            ))} */}
          </div>
        </div>
        <div className=" lg:w-[60%]  p-2">
          <div className=" border border-gray-300 rounded-md px-3 py-8">
            <p className=" font-semibold text-primary text-lg  ml-2">
              Geographic Data
            </p>
            <div className=" lg:flex mt-2">
              <div className=" lg:w-1/2">
                <img src={require("../assets/images/map.png")} />
                <div className=" flex items-center my-4 lg:my-0 lg:mt-1">
                  <p className=" text-sm mx-1 text-primary">1</p>
                  <div className=" bg-gradient-to-r from-blue-300 to-blue-600 w-36 h-5" />
                  <p className=" text-sm mx-1 text-primary">30</p>
                </div>
              </div>
              <div className=" lg:w-1/2">
                <p className=" font-medium text-primary text-[16px]">
                  Countries
                </p>
                <div className="   lg:mr-12">
                  {country?.map((item, index) => (
                    <div
                      key={index}
                      className=" flex items-center justify-between my-2"
                    >
                      <p className=" text-[15px] text-primary font-normal">
                        {item.countryName}
                      </p>
                      <p className=" text-[15px] text-primary font-normal">
                        {item.number}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" p-3">
        <div className=" border border-gray-300 rounded-md px-5 py-8">
          <p className="  font-medium text-primary ">Top FAQs</p>
          <div className=" bg-primary text-white flex items-center justify-between px-5 py-2 mt-4 rounded-md">
            <p>Question</p>
            <p>Frequency</p>
          </div>
          <div className=" mt-2">
            {topFAQs?.map((item, index) => (
              <div
                key={index}
                className="  text-primary flex items-center justify-between px-5 py-2"
              >
                <p>{item.question}</p>
                <p>{item.frequency}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
