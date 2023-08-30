import React from "react";

const CustomInput = ({
  title,
  className,
  name,
  onChange,
  onBlur,
  value,
  placeholder,
  onFocus,
}) => {
  return (
    <div className={`${className} w-full relative`}>
      <h2 className=" text-white my-2">{title}</h2>
      <input
        name={name}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
        onFocus={onFocus}
        className={`bg-inputBg outline-none
       border-inputBg  transition-all ease-in-out duration-500
        focus:border-border border-2 w-full py-2 rounded-md text-white pl-3 placeholder:text-sm`}
      />
    </div>
  );
};

export default CustomInput;
