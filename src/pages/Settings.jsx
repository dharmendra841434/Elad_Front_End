import React, { useEffect, useState } from "react";
import PersonalDetails from "../components/settings/PersonalDetails";
import PlanAndBilling from "../components/settings/PlanAndBilling";
import Invoices from "../components/settings/Invoices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Settings = () => {
  const info = [
    {
      title: "Personal Details",
      heading: "Settings",
      para: "Personal Details",
    },
    {
      title: "Plan and Billing",
      heading: "Plan and Billing",
      para: "Take a look at your plan status",
    },
    {
      title: "Invoices",
      heading: "Invoices",
      para: "View and download your invoices",
    },
  ];
  const navigate = useNavigate();

  const settingTab = useSelector((state) => state.app.settingTab);
  const [selectedTab, setSelectedTab] = useState(info[settingTab]);
  
  useEffect(() => {
    let p = localStorage.getItem("payment");
    if (p !== null) {
      setSelectedTab(info[1]);
    }
  }, [navigate]);

  return (
    <div className="px-5 md:px-5 lg:px-8 xl:px-11">
      <div>
        <div className="pt-5 h-[7.73%]">
          <h1 className=" text-2xl font-bold text-primary">
            {selectedTab.heading}
          </h1>
          <p className="text-[11px] text-[#7F7F7F] mb-[20px]">
            {selectedTab.para}
          </p>
        </div>
        <div className="flex gap-3 max-sm:gap-1 max-sm:justify-between justify-start text-[13px] max-sm:text-[16px] font-medium text-[#7F7F7F]">
          {info?.map((tab, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedTab(tab);
              //  dispatch(setSelectedTab(index));
              //  setSelectedTab(info[settingTab]);
              }}
              className={`pb-2 cursor-pointer ${
                selectedTab.title === tab.title &&
                "border-b-2 border-secoundry text-secoundry"
              }`}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <hr className="mb-2" />
        <div>
          {selectedTab.title === "Personal Details" && <PersonalDetails />}
          {selectedTab.title === "Plan and Billing" && <PlanAndBilling />}
          {selectedTab.title === "Invoices" && <Invoices />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
