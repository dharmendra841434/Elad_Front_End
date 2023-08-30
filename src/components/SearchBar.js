import React from "react";
import { BiSearch, BiCommand } from "react-icons/bi";

const SearchBar = () => {
  return (
    <div className=" relative bg-[#D4D4D4]/20 p-1 rounded-md w-full flex flex-row items-center border border-[#D4D4D4]">
      <BiSearch className=" ml-3 text-appgray" />
      <input
        className=" outline-none bg-transparent w-full pl-2 py-1.5 placeholder:text-[13px] caret-appgray "
        placeholder="Search"
      />
      <div className=" flex items-center absolute right-0">
        <div className=" bg-white p-2 m-1 shadow-xl rounded-md">
          <BiCommand className=" text-appgray" />
        </div>
        <div className=" bg-white py-1 px-3 m-1 rounded-md shadow-xl text-appgray">
          K
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
