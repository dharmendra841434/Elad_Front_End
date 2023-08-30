import React from "react";

const DescriptionInput = ({
  title,
  placeholder,
  onChange,
  onBlur,
  value,
  className,
  readOnly,
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <textarea
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className=" outline-none border-2  text-sm placeholder:text-appgray border-border rounded-md py-3 w-full  pl-3 caret-slate-600 transition-all duration-500 ease-in-out focus:border-pink-300"
      />
      <h1 className=" bg-white absolute -top-2 text-sm px-1 left-3 font-thin text-primary ">
        {title}
      </h1>
    </div>
  );
};

export default DescriptionInput;
