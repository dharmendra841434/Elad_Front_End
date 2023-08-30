import React from "react";

const InputBox = ({
  required,
  className,
  title,
  containerClassName,
  value,
  placeholder,
  readOnly,
  onFocus,
  onBlur,
  onChange,
}) => {
  return (
    <div className={containerClassName}>
      <div className=" flex items-center">
        <p className=" text-[13px] font-medium text-primary mb-2">{title}</p>
        {required && <p className=" mx-1 text-red-500">*</p>}
      </div>
      <input
        readOnly={readOnly}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        className={`outline-none border-2 border-gray-300 rounded-[5px] text-[11px] py-2 ${className} pl-2 placeholder:text-[11px]`}
      />
    </div>
  );
};

export default InputBox;
