import React, { useState } from "react";

import { MdSearch } from "react-icons/md";
import { countryCode } from "../assets/dummyData/countryCode";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const ContactInput = ({
  title,
  placeholder,
  onChange,
  onFocus,
  selectedCountryCode,
  setSelectedCountryCode,
  value,
  country,
}) => {
  const [isopen, setIsopen] = useState(false);

  const [filteredList, setFilteredList] = useState([]);

  //console.log(filteredList, "filtered");

  return (
    <div className=" relative w-full ">
      <div className=" flex items-center border-2 border-border pl-2 rounded-md">
        <div
          onClick={() => {
            setIsopen(!isopen);
          }}
          className=" bg-primary px-3 py-1 cursor-pointer text-white rounded-md "
        >
          <p className=" text-sm">+{selectedCountryCode}</p>
        </div>
        <input
          placeholder={placeholder}
          type="text"
          onChange={onChange}
          aria-multiline={true}
          onFocus={onFocus}
          value={value}
          className=" outline-none text-sm  font-thin   h-[56px] w-full  pl-3 caret-slate-600 "
        />
      </div>
      <h1 className=" bg-white absolute -top-2 left-3 font-thin text-primary text-sm px-1 ">
        {title}
      </h1>
      {isopen && (
        <div className=" z-40   overflow-y-scroll h-56 bg-white shadow-dropDownBox rounded-md absolute top-[4rem] left-0 right-24 lg:right-1/2">
          <div className=" sticky top-0 z-10  p-2 bg-white ">
            <div className=" bg-white   flex items-center border border-border rounded-md">
              <MdSearch className=" text-2xl text-appgray m-2" />
              <input
                onChange={(e) => {
                  let t = countryCode.filter((r) =>
                    r.Country.toLocaleLowerCase().includes(
                      e.target.value.toLocaleLowerCase()
                    )
                  );

                  setFilteredList(t);
                }}
                className=" outline-none caret-slate-500 text-primary"
                placeholder="Search"
              />
            </div>
          </div>
          <div className=" bg-red-500 ">
            {filteredList.length === 0 ? (
              <>
                {countryCode.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedCountryCode(item);
                      setIsopen(false);
                    }}
                    className={`flex items-center  cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-100 ${
                      country.Country === item?.Country
                        ? "bg-blue-100"
                        : "bg-white"
                    } py-2 pl-3`}
                  >
                    <span className={`fi fi-${item.ISO.toLowerCase()}`}></span>
                    <p className=" ml-2 text-appgray">+{item.Country_Code}</p>
                    <p className=" mx-2 text-appgray">{item.Country}</p>
                  </div>
                ))}
              </>
            ) : (
              <>
                {filteredList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedCountryCode(item.Country_Code);
                      setIsopen(false);
                    }}
                    className={`flex items-center  cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-100 ${
                      selectedCountryCode === item?.Country_Code
                        ? "bg-blue-100"
                        : "bg-white"
                    } py-2 pl-3`}
                  >
                    <span className={`fi fi-${item.ISO.toLowerCase()}`}></span>
                    <p className=" ml-2 text-appgray">+{item?.Country_Code}</p>
                    <p className=" mx-2 text-appgray">{item?.Country}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInput;
