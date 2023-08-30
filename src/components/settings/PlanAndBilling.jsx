import React, { useEffect, useState } from "react";
import card from "../../assets/images/Icons/card.svg";
import visa from "../../assets/images/Icons/visa.svg";
import mastercard from "../../assets/images/Icons/mastercard.svg";
import mastercard1 from "../../assets/images/Icons/mastercard1.svg";
import { AiOutlineUp } from "react-icons/ai";
import { AiOutlineDown } from "react-icons/ai";
import { useSelector } from "react-redux";

const Plan = (props) => {
  const {
    planType,
    planInfo,
    planPrice,
    planMin,
    planMonth,
    planRate,
    planButton,
    btnStyle,
    boxStyle,
    recStyle,
  } = props;
  return (
    <>
      <div className={`${boxStyle} rounded-xl relative`}>
        <div
          className={`${recStyle} bg-[#FFECEB]/[0.2] rounded-md items-end absolute top-2 right-2`}
        >
          <p className={`text-[10px] text-[#FF0000] font-medium px-2 py-1`}>
            Recommended
          </p>
        </div>
        <h5 className="mt-[30px] mb-[11px]">{planType}</h5>
        <p className="text-[13px] text-[#7F7F7F] font-normal mb-[20px]">
          {planInfo}
        </p>
        <h3 className="text-[56px] font-semibold text-[#FF0066] mb-[20px]">
          {planPrice}
        </h3>
        <div className="">
          <div className="flex gap-2 mb-3">
            <p className="rounded-[100%] bg-[#E2ECFF]">
              <span className="px-1 text-primary">✓</span>
            </p>
            <p className="text-[16px] md:text-[14px] lg:text-[14px] xl:text-[16px]">
              {planMin}
            </p>
          </div>
          <div className="flex gap-2 mb-3">
            <p className="rounded-[100%] bg-[#E2ECFF]">
              <span className="px-1 text-primary">✓</span>
            </p>
            <p className="text-[16px] md:text-[14px] lg:text-[14px] xl:text-[16px]">
              {planMonth}
            </p>
          </div>
          <div className="flex gap-2 mb-3">
            <p className="rounded-[100%] bg-[#E2ECFF]">
              <span className="px-1 text-primary">✓</span>
            </p>
            <p className="text-[16px] md:text-[14px] lg:text-[14px] xl:text-[16px]">
              {planRate}
            </p>
          </div>
        </div>
        <button
          className={`${btnStyle}  border text-[16px] px-6 my-1 rounded-lg w-full h-11 font-semibold mb-[59px]`}
        >
          {planButton}
        </button>
      </div>
    </>
  );
};

const Basic = () => {
  return (
    <>
      <Plan
        planType={"Basic"}
        planInfo={
          "Ideal for individuals who need quick access to basic features."
        }
        planPrice={"$8"}
        planMin={"20 min"}
        planMonth={"1 month"}
        planRate={"$0.6 per additional min"}
        planButton={"Your Plan"}
        btnStyle={`bg-[#E7E7E7] text-[#7F7F7F]`}
        recStyle={`invisible`}
        boxStyle={`px-4`}
      />
    </>
  );
};

const Advanced = () => {
  return (
    <>
      <Plan
        planType={"Advanced"}
        planInfo={
          "Ideal for individuals who need quick access to basic features."
        }
        planPrice={"$15"}
        planMin={"60 min"}
        planMonth={"1 month"}
        planRate={"$0.2 per additional min"}
        planButton={"Upgrade Plan"}
        btnStyle={`bg-primary text-white`}
        recStyle={`invisible`}
        boxStyle={`px-4`}
      />
    </>
  );
};

const Expert = () => {
  return (
    <>
      <Plan
        planType={"Expert"}
        planInfo={
          "Ideal for businesses who need personalized services and security for large teams. "
        }
        planPrice={"$50"}
        planMin={"200 min"}
        planMonth={"1 month"}
        planRate={"$0.2 per additional min"}
        planButton={"Upgrade Plan"}
        recStyle={`invisible`}
        btnStyle={`bg-primary text-white`}
        boxStyle={`px-4`}
      />
    </>
  );
};

const PlanAndBilling = () => {
  const tabInfo = [
    { title: "Basic" },
    { title: "Advanced" },
    { title: "Expert" },
  ];
  const [selectedTab, setSelectedTab] = useState(tabInfo[0]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenOne, setIsPopupOpenOne] = useState(false);
  const listOfBots = useSelector((state) => state.app.botsList);
  const callHistory = useSelector((state) => state.app.callHistory);
  const [totalDuration, setTotalDuration] = useState(0);
  const newCallHistory = callHistory.flat();
  console.log(newCallHistory);

  const handleClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const handleClickOne = () => {
    setIsPopupOpenOne(!isPopupOpenOne);
  };

  return (
    <>
      {/* for laptop or large screen */}
      <div className="hidden md:block">
        <div className="mt-5 flex justify-between">
          <div className="w-[65%] border-r pr-[32px]">
            <div className="flex">
              <h5 className="text-primary text-[18px] font-medium">
                Basic Plan
              </h5>
              <p className="text-[#10C300] text-[11px] font-normal">monthly</p>
            </div>
            <div className="flex justify-between my-3">
              <h4 className="text-2xl font-bold text-[#FF0066]">$8</h4>
              <h4 className="text-2xl font-bold">{listOfBots.length} Bot</h4>
            </div>
            <div className="flex justify-between">
              <div className="w-3/4">
                <p className="text-[15px] text-[#212B36]">
                  10 of 20 minutes exhausted
                </p>
                <div className="border bg-[#D9D9D9] h-[14px] w-[96%] mt-1 rounded-lg flex">
                  <div className="bg-primary w-1/2 rounded-l-lg"></div>
                  <div></div>
                </div>
              </div>

              <button className="bg-primary text-white px-5 py-1 w-[141px] rounded-lg hover:bg-[#FF0066]">
                Upgrade
              </button>
            </div>
          </div>
          <div className="w-[45%] pl-[32px]">
            <div className="">
              <h5 className="text-primary text-[18px] font-medium">
                Payment Method
              </h5>
            </div>
            <div className="flex justify-between my-3">
              <h4 className="text-2xl font-bold text-[#FF0066]">$8</h4>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="mt-1 scale-125">
                  <div className="relative w-[40px]">
                    <img
                      src={card}
                      alt="card"
                      className="absolute top-0 left-0"
                    />
                    <img
                      src={visa}
                      alt="visa"
                      className="absolute top-1 left-1"
                    />
                    <img
                      src={mastercard}
                      alt=""
                      className="absolute top-3 right-2"
                    />
                    <img
                      src={mastercard1}
                      alt=""
                      className="absolute top-3 right-0"
                    />
                  </div>
                </div>



                <div>
                  <p className="text-[15px] text-[#212B36]">
                    Visa ending with 3456
                  </p>
                  <p className="text-[9px] text-[#FF0000]">Expiry 09/2028</p>
                </div>
              </div>

              <button className="bg-primary text-white px-3 py-1 w-[87px] rounded-lg hover:bg-[#FF0066]">
                Edit
              </button>
            </div>
          </div>
        </div>
        <hr className="my-8" />
        <h5 className="text-lg font-medium mb-5">All Plans</h5>
        <div className="flex gap-1 lg:gap-2 xl:gap-8 my-4">
          <Plan
            planType={"Basic"}
            planInfo={
              "Ideal for individuals who need quick access to basic features."
            }
            planPrice={"$8"}
            planMin={"20 min"}
            planMonth={"1 month"}
            planRate={"$0.6 per additional min"}
            planButton={"Your Plan"}
            btnStyle={`bg-[#E7E7E7] text-[#7F7F7F]`}
            recStyle={`invisible`}
            boxStyle={`border md:px-2 lg:px-5 xl:px-7 w-1/3`}
          />
          <Plan
            planType={"Advanced"}
            planInfo={
              "Ideal for individuals who need quick access to basic features."
            }
            planPrice={"$15"}
            planMin={"60 min"}
            planMonth={"1 month"}
            planRate={"$0.2 per additional min"}
            planButton={"Upgrade Plan"}
            boxStyle={`bg-primary text-white border md:px-2 lg:px-5 xl:px-7 w-1/3`}
            btnStyle={`bg-white text-primary transition-all duration-300 ease-in-out hover:bg-secoundry hover:text-white hover:border-secoundry`}
          />
          <Plan
            planType={"Expert"}
            planInfo={
              "Ideal for businesses who need personalized services and security for large teams. "
            }
            planPrice={"$50"}
            planMin={"200 min"}
            planMonth={"1 month"}
            planRate={"$0.2 per additional min"}
            planButton={"Upgrade Plan"}
            recStyle={`invisible`}
            btnStyle={`bg-primary text-white transition-all duration-300 ease-in-out hover:bg-secoundry hover:text-white hover:border-secoundry`}
            boxStyle={`border md:px-2 lg:px-5 xl:px-7 w-1/3 `}
          />
        </div>
      </div>

      {/* for mobile and tabs */}

      <div className="md:hidden">
        <div className="mb-10 mt-5">
          <div onClick={handleClick} className="flex justify-between">
            <div className="flex">
              <h5 className="text-primary text-[18px] font-medium">
                Basic Plan
              </h5>
              <p className="text-[#10C300] text-[11px] font-normal">monthly</p>
            </div>
            <div>
              {!isPopupOpen && <AiOutlineDown />}
              {isPopupOpen && <AiOutlineUp />}
            </div>
          </div>
          {isPopupOpen && (
            <div>
              <div className="flex justify-between my-3">
                <h4 className="text-2xl font-bold text-[#FF0066]">$8</h4>
                <h4 className="text-2xl font-bold">1 Bot</h4>
              </div>
              <p className="text-[15px] text-[#212B36]">
                10 of 20 minutes exhausted
              </p>
              <div className="border bg-[#D9D9D9] h-[14px] w-[96%] mt-1 rounded-lg flex">
                <div className="bg-primary w-1/2 rounded-l-lg"></div>
              </div>
              <div className="flex justify-center">
                <button className="bg-primary text-white py-1 w-[70%] rounded-lg hover:bg-[#FF0066] mt-4 flex justify-center">
                  Upgrade
                </button>
              </div>
            </div>
          )}
        </div>
        <div onClick={handleClickOne} className="flex justify-between">
          <h5 className="text-primary text-[18px] font-medium">
            Payment Method
          </h5>
          {!isPopupOpenOne && <AiOutlineDown />}
          {isPopupOpenOne && <AiOutlineUp />}
        </div>
        {isPopupOpenOne && (
          <div className="my-3">
            <h4 className="text-2xl font-bold text-[#FF0066] mb-3">$8</h4>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="relative">
                  <img src={card} alt="" />
                  <img src={visa} alt="" className="absolute top-1 left-1" />
                  <img
                      src={mastercard}
                      alt=""
                      className="absolute top-4 right-2"
                    />
                    <img
                      src={mastercard1}
                      alt=""
                      className="absolute top-4 right-0"
                    />
                </div>
                <div>
                  <p className="text-[15px] text-[#212B36]">
                    Visa ending with 3456
                  </p>
                  <p className="text-[9px] text-[#FF0000]">Expiry 09/2028</p>
                </div>
              </div>

              <button className="bg-primary text-white px-3 py-1 w-[87px] rounded-lg hover:bg-[#FF0066]">
                Edit
              </button>
            </div>
          </div>
        )}
        <hr className="my-8" />
        <h5 className="text-lg font-medium mb-5">All Plans</h5>
        <div className="shadow-card p-2 rounded-xl mb-10">
          <div className="flex justify-between pt-2">
            {tabInfo?.map((tab, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedTab(tab);
                }}
                className={`px-4 py-2 ${
                  selectedTab.title === tab.title &&
                  " text-white bg-secoundry px-2 rounded-lg"
                }`}
              >
                {tab.title}
              </div>
            ))}
          </div>
          {selectedTab.title === "Basic" && <Basic />}
          {selectedTab.title === "Advanced" && <Advanced />}
          {selectedTab.title === "Expert" && <Expert />}
        </div>
      </div>
    </>
  );
};

export default PlanAndBilling;
