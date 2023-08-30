import React from "react";
import { useSelector } from "react-redux";

const CustomTable = () => {
  const listOfBots = useSelector((state) => state.app.botsList);
  const data = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
    { id: 3, name: "Bob", age: 35 },
    { id: 4, name: "Alice", age: 28 },
  ];

  return (
    <table className=" w-full">
      <thead>
        <tr className=" w-full bg-secoundry   ">
          <th className="  text-start text-sm font-normal py-3 rounded-l-lg  pl-2 text-white ">
            Sr. No.
          </th>
          <th className=" w-[15%]   text-start text-sm font-normal py-3  pl-2 text-white ">
            Name
          </th>
          <th className="  w-[20%] text-start text-sm font-normal py-3  pl-2 text-white ">
            Business Name
          </th>
          <th className="  text-start text-sm font-normal py-3  pl-2 text-white ">
            Branches
          </th>
          <th className="  text-start text-sm font-normal py-3  pl-2 text-white ">
            Bot Phone No.
          </th>
          <th className="  text-start text-sm font-normal py-3  pl-2 text-white ">
            Status
          </th>
          <th className="  w-[18%]  text-start rounded-r-lg"></th>
        </tr>
      </thead>
      <tbody className=" w-full">
        {listOfBots?.map((item, index) => (
          <tr className=" w-full bg-green-400" key={item.id}>
            <td className="  bg-pink-500 ">{index + 1}</td>
            <td className=" "> {item?.details?.botName}</td>
            <td className=" ">{item?.details?.businessName}</td>
            <td className=" "> {item?.details?.branches?.length}</td>
            <td className=" ">
              {item?.details?.bot_phone_no_Data?.phoneNumber}
            </td>
            <td
              className={`text-[14.86px] ${
                item?.status === "active" ? "text-green-700" : "text-red-600"
              } ml-6 capitalize`}
            >
              {" "}
              {item?.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
