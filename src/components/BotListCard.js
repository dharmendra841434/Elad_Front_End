import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import MoreOptions from "./MoreOptions";

const BotListCard = ({
  item,
  index,
  onDelete,
  onEdit,
  onPreview,
  onDuplicate,
  onSettings,
}) => {
  const [show, setShow] = useState(false);
  console.log(item, "itemdata");
  return (
    <div key={index} className=" ">
      <div className=" bg-secoundry flex items-center rounded-lg pl-4 py-1.5 mt-2">
        <p className="  text-white">{index + 1}.</p>
        <div className="  text-white w-full flex justify-center">
          {item?.details?.botName}
        </div>
      </div>
      <div className=" flex items-center mx-2 ">
        <div className=" w-11/12">
          <div className=" flex items-center  my-4">
            <p className=" text-primary w-1/2">Status</p>
            <p
              className={`${
                item?.status === "active" ? "text-green-600" : "text-red-600"
              }  w-1/2`}
            >
              {item?.status}
            </p>
          </div>
          <div className=" flex items-center  my-4">
            <p className=" text-primary w-1/2">Bot Phone No.</p>
            <p className=" text-primary w-1/2">
              {item?.details?.bot_phone_no_Data?.phoneNumber}
            </p>
          </div>
        </div>
        <MdOutlineKeyboardArrowDown
          onClick={() => setShow(!show)}
          className={` text-2xl ml-4 transition-all duration-300 ease-in-out ${
            show ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      {show && (
        <div className=" w-11/12">
          <div className=" flex items-center  my-4">
            <p className=" text-primary w-1/2 ">Business Name</p>
            <p className=" text-primary w-1/2  ">
              {item?.details?.businessName}
            </p>
          </div>
          <div className=" flex items-center  my-4">
            <p className=" text-primary w-1/2">Braches</p>
            <p className=" text-primary w-1/2">
              {item?.details?.branches?.length}
            </p>
          </div>
          <div className=" flex items-center  my-4">
            <p className=" text-primary w-1/2">Actions</p>
            <div className=" flex items-center gap-x-1 w-1/2">
              <div
                onClick={onPreview}
                className=" bg-gray-200 h-fit w-fit p-3 rounded-full"
              >
                <img
                  alt="preview"
                  className=" h-4 w-4 filter text-primary"
                  src={require("../assets/images/megaphone.png")}
                />
              </div>
              {item?.status === "active" && (
                <div className=" flex items-center">
                  <div
                    onClick={onDelete}
                    className=" bg-gray-200 h-fit w-fit p-3 rounded-full mr-1"
                  >
                    <MdDelete className=" " />
                  </div>
                  <div
                    onClick={onEdit}
                    className=" bg-gray-200 h-fit w-fit p-3 rounded-full"
                  >
                    <FaEdit className=" " />
                  </div>
                </div>
              )}
              <div className=" bg-gray-200 h-fit w-fit p-2 px-3 rounded-full">
                {/* <BsThreeDotsVertical /> */}
                <MoreOptions
                  setSelectedOption={(option) => {
                    if (option === "Message Settings") {
                      onSettings();
                      return;
                    }
                    if (option === "Duplicate and Create New") {
                      onDuplicate();
                      return;
                    }
                  }}
                  options={["Message Settings", "Duplicate and Create New"]}
                  className=" left-28 md:left-1/3 right-16 "
                  status={item?.status}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotListCard;
