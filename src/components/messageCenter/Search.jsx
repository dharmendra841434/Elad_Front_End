import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <>
    <div className="hidden relative p-2 rounded-md w-full md:flex flex-row items-center border border-[#D4D4D4]">
      <BiSearch className=" ml-3 text-appgray" />
      <input
        className=" outline-none bg-transparent w-full pl-2 py-0.8 placeholder:text-[13px] caret-appgray "
        placeholder="Search"
      />
    </div>

    <div className="md:hidden relative p-1 rounded-md w-full flex flex-row items-center border border-[#D4D4D4]">
      <BiSearch className=" ml-3 text-appgray" />
      <input
        className=" outline-none bg-transparent w-full pl-2 py-0.8 placeholder:text-[13px] caret-appgray "
        placeholder="Search"
      />
    </div>
    </>
  );
};

export default Search;
