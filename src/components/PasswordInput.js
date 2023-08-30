import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({
  title,
  placeholder,
  className,
  name,
  onChange,
  inputFocus,
  inputBlur,
  value,
}) => {
  const [visible, setVisible] = useState(false);
  const [focus, setFocus] = useState(false);
  return (
    <div className={className}>
      <h2 className=" text-white my-2">{title}</h2>
      <div
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setFocus(false);
        }}
        className={` relative overflow-hidden flex rounded-md transition-all  ease-in-out duration-500 bg-inputBg border-2 ${
          focus ? " border-border" : "border-[#919EAB52]/10"
        }`}
      >
        <input
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onFocus={inputFocus}
          onBlur={inputBlur}
          value={value}
          type={visible ? "text" : "password"}
          className={` w-full py-2 bg-inputBg outline-none  text-white pl-3 placeholder:text-sm`}
        />
        <div className=" bg-inputBg absolute right-4 top-2">
          {visible ? (
            <AiOutlineEye
              onClick={() => setVisible(false)}
              className=" text-appgray text-xl cursor-pointer bg-inputBg flex self-center justify-center "
            />
          ) : (
            <AiOutlineEyeInvisible
              onClick={() => setVisible(true)}
              className=" text-appgray text-xl cursor-pointer bg-inputBg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
