import React from "react";

const InpuField = ({
  title,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  value,
  className,
  titleClassName,
}) => {
  return (
    <div className=" relative w-full">
      <input
        placeholder={placeholder}
        type="text"
        onChange={onChange}
        aria-multiline={true}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        className={` outline-none text-sm border-2 font-thin border-border rounded-md   h-[56px] w-full  pl-3 caret-slate-600 transition-all duration-500 ease-in-out focus:border-pink-300 ${className}`}
      />
      <h1
        className={`${titleClassName} bg-white absolute -top-2 left-3 text-primary font-thin text-sm px-1 `}
      >
        {title}
      </h1>
    </div>
  );
};

export default InpuField;
