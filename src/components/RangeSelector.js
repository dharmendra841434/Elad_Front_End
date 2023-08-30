import React, { useState } from "react";
import Shape from "../assets/images/Shape";

const RangeSelector = ({
  title,
  range,
  disabled,
  onBlur,
  onChange,
  min,
  max,
}) => {
  return (
    <div className=" relative ">
      <h2 className="  my-2 text-sm text-primary font-normal">{title}</h2>
      <input
        onChange={onChange}
        type="range"
        disabled={disabled}
        min={min}
        max={max}
        onBlur={onBlur}
        step={0.01}
        value={range}
        className=" accent-secoundry outline-none w-full"
      />
      <div
        style={{
          left: Number(range) * 42,
        }}
        className={` h-fit w-fit  absolute p-2 text-white rounded-2xl -top-4  left-[33px]`}
      >
        <div className=" relative flex items-center justify-center">
          <Shape></Shape>
          <p className=" text-white z-10 absolute top-1.5 text-[11px] right-2 ">
            {range}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RangeSelector;
