import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { GoCheck } from "react-icons/go";
import BotIdentity from "./createBotSteps/BotIdentity";
import BotGreetings from "./createBotSteps/BotGreetings";
import YourBusiness from "./createBotSteps/YourBusiness";
import BusinessFAQs from "./createBotSteps/BusinessFAQs";
import BotSummary from "./createBotSteps/BotSummary";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateBot = () => {
  const botsList = useSelector((state) => state.app.botsList);
  const process = [
    "Bot Identity",
    "Bot Greetings",
    "Your Business",
    "Business FAQs",
    "Bot Summary",
  ];
  const navigate = useNavigate();

  const [activeProcess, setActiveProcess] = useState(["Bot Identity"]);
  const [selectedSteps, setSelectedSteps] = useState("Bot Identity");
  const [completedSteps, setCompletedSteps] = useState([]);
  const goPrevious = (stepName, comleteSteps) => {
    let r = activeProcess.filter((t) => t !== stepName);
    setActiveProcess(r);
    let g = completedSteps.filter((t) => t !== comleteSteps);
    setCompletedSteps(g);
  };

  const jumpOnMenu = (index) => {
    completedSteps.splice(index);
    activeProcess.splice(index + 1);
    setSelectedSteps(process[index]);
  };

  //console.log(selectedSteps, "activeProcess");
  return (
    <div className=" px-4 pt-5">
      <h1 className=" text-2xl font-bold text-primary">Bot Creation</h1>
      <div className="hidden lg:block">
        <div className="  grid grid-cols-5 gap-x-3 my-4">
          {process.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (completedSteps.includes(item)) {
                  setSelectedSteps(item);
                  jumpOnMenu(index);
                }
              }}
              className={`flex items-center ${
                completedSteps.includes(item) && "cursor-pointer"
              }`}
            >
              {completedSteps.includes(item) ? (
                <div className=" bg-secoundry w-fit h-fit p-1 rounded-md">
                  <GoCheck className=" text-white" />
                </div>
              ) : (
                <h2
                  className={` px-3 py-1 transition-all duration-500 ease-in-out ${
                    activeProcess.includes(item)
                      ? "text-secoundry bg-pink-300/20"
                      : " bg-appgray/20 text-appgray"
                  }  rounded-md text-sm`}
                >
                  {index + 1}
                </h2>
              )}
              <h3
                className={` lg:text-[13px] transition-all duration-500 ease-in-out mx-2 lg:text-sm xl:text-base ${
                  activeProcess.includes(item)
                    ? " text-secoundry"
                    : "text-appgray"
                }`}
              >
                {item}
              </h3>
              {index !== 4 && (
                <div
                  className={` transition-all duration-500 ease-in-out w-10 h-0.5 ${
                    activeProcess.includes(item)
                      ? " bg-secoundry/60"
                      : "bg-appgray"
                  } xl:ml-6`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className=" md:hidden mt-4">
        <Swiper
          spaceBetween={10}
          slidesPerView={2}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {process.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => {
                  if (completedSteps.includes(item)) {
                    setSelectedSteps(item);
                    jumpOnMenu(index);
                  }
                }}
                className=" flex items-center"
              >
                {completedSteps.includes(item) ? (
                  <div className=" bg-secoundry w-fit h-fit p-1 rounded-md">
                    <GoCheck className=" text-white" />
                  </div>
                ) : (
                  <h2
                    className={` px-3 py-1 transition-all duration-500 ease-in-out ${
                      activeProcess.includes(item)
                        ? "text-secoundry bg-pink-300/20"
                        : " bg-appgray/20 text-appgray"
                    }  rounded-md text-sm`}
                  >
                    {index + 1}
                  </h2>
                )}
                <h3
                  className={` text-[13px]  transition-all duration-500 ease-in-out mx-2 lg:text-sm xl:text-base ${
                    activeProcess.includes(item)
                      ? " text-secoundry"
                      : "text-appgray"
                  }`}
                >
                  {item}
                </h3>
                {index !== 4 && (
                  <div
                    className={` transition-all duration-500 ease-in-out w-10 h-0.5 ${
                      activeProcess.includes(item)
                        ? " bg-secoundry/60"
                        : "bg-appgray"
                    } `}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className=" hidden md:block lg:hidden mt-8">
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {process.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => {
                  if (completedSteps.includes(item)) {
                    setSelectedSteps(item);
                    jumpOnMenu(index);
                  }
                }}
                className=" flex items-center"
              >
                {completedSteps.includes(item) ? (
                  <div className=" bg-secoundry w-fit h-fit p-1 rounded-md">
                    <GoCheck className=" text-white" />
                  </div>
                ) : (
                  <h2
                    className={` px-3 py-1 transition-all duration-500 ease-in-out ${
                      activeProcess.includes(item)
                        ? "text-secoundry bg-pink-300/20"
                        : " bg-appgray/20 text-appgray"
                    }  rounded-md text-sm`}
                  >
                    {index + 1}
                  </h2>
                )}
                <h3
                  className={` text-[13px]  transition-all duration-500 ease-in-out mx-2 lg:text-sm xl:text-base ${
                    activeProcess.includes(item)
                      ? " text-secoundry"
                      : "text-appgray"
                  }`}
                >
                  {item}
                </h3>
                {index !== 4 && (
                  <div
                    className={` transition-all duration-500 ease-in-out w-10 h-0.5 ${
                      activeProcess.includes(item)
                        ? " bg-secoundry/60"
                        : "bg-appgray"
                    } `}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="    z-10">
        {selectedSteps === "Bot Identity" && (
          <BotIdentity
            onNext={() => {
              setActiveProcess((searches) => searches?.concat("Bot Greetings"));
              setCompletedSteps((searches) => searches?.concat("Bot Identity"));
              setSelectedSteps("Bot Greetings");
            }}
          />
        )}
        {selectedSteps === "Bot Greetings" && (
          <BotGreetings
            onNext={() => {
              setActiveProcess((searches) => searches?.concat("Your Business"));
              setCompletedSteps((searches) =>
                searches?.concat("Bot Greetings")
              );
              setSelectedSteps("Your Business");
            }}
            goPrevious={() => {
              goPrevious("Bot Greetings", "Bot Identity");
              setSelectedSteps("Bot Identity");
            }}
          />
        )}
        {selectedSteps === "Your Business" && (
          <YourBusiness
            onNext={() => {
              setActiveProcess((searches) => searches?.concat("Business FAQs"));
              setCompletedSteps((searches) =>
                searches?.concat("Your Business")
              );
              setSelectedSteps("Business FAQs");
            }}
            goPrevious={() => {
              goPrevious("Your Business", "Bot Greetings");
              setSelectedSteps("Bot Greetings");
            }}
          />
        )}
        {selectedSteps === "Business FAQs" && (
          <BusinessFAQs
            onNext={() => {
              setActiveProcess((searches) => searches?.concat("Bot Summary"));
              setCompletedSteps((searches) =>
                searches?.concat("Business FAQs")
              );
              setSelectedSteps("Bot Summary");
            }}
            goPrevious={() => {
              goPrevious("Business FAQs", "Your Business");
              setSelectedSteps("Your Business");
            }}
          />
        )}
        {selectedSteps === "Bot Summary" && (
          <BotSummary
            goPrevious={() => {
              setActiveProcess(["Bot Identity"]);
              setSelectedSteps("Bot Identity");
              setCompletedSteps([]);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CreateBot;
