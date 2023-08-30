import React from "react";
import CustomCheckBox from "./CustomCheckBox";

const Recaptcha = ({ setChecked, checked }) => {
  return (
    <div className=" bg-white flex items-center justify-between px-5 py-3 rounded-md mt-4">
      <div className=" flex">
        <CustomCheckBox
          setChecked={setChecked}
          checked={checked}
          className={`${
            checked ? "border border-secoundry" : "border border-appgray"
          } h-7 w-7`}
          checkClassName=" text-2xl"
        />
        <p className=" mx-2">I’m not a robot</p>
      </div>
      <img alt="captcha" src={require("../assets/images/captch.png")} />
    </div>
  );
};

export default Recaptcha;
