import React from "react";
//import { BsPlayCircleFill } from "react-icons/bs";
import User from '../../assets/images/user.png';
import Bot from '../../assets/images/bot.png';
import dayjs from 'dayjs';

const Msg = (props) => {
  const { messages, isShow } = props;
  console.log("The value of is Shown");
  let messageDate = null;
  if(messages === undefined){
    messageDate = "Today";
  }else{
   messageDate = dayjs(messages[0]?.timestamp).format('DD MMMM YYYY');
  }
  console.log(isShow);
  const marginL = isShow ? "ml-[33%]" : "xl:ml-[55%] lg:ml-[50%] md:ml-[40%] sm:ml-[33%]";
  const marginR = isShow ? "mr-[33%]" : "xl:mr-[55%] lg:mr-[50%] md:mr-[40%] sm:mr-[33%]";
  return (
    <>
      <div className="hidden md:block mr-5 ml-10">
        <p className="text-[16px] font-medium text-center mt-[23px] mb-[18px]">
        {messageDate}
        </p>
        {messages?.map((message) => (
          <div
            key={message?._id}
            className={
              message?.sender === 0
                ? `${marginL} rounded-lg m-1`
                : `${marginR} rounded-lg m-1`
            }
          >
            <div className={message?.sender === 0 ? "ml-[90%]" : ""}>
              {message?.sender === 0 ? (
                <div className="gap-[11px] -ml-14 flex mb-1">
                  <p className="text-[#637381] text-[11px] mt-2 font-normal">
                    {dayjs(message?.timestamp).format('hh:mm A')}
                  </p>
                  {/* <BotSvg className="m-1" /> */}
                  <img src={Bot}  alt="bot logo"/>
                </div>
              ) : (
                <div className="ml-[-30px] gap-[11px] flex">
                  {/* <MsgUser className="m-1" /> */}
                  <img src={User}  alt="user logo"/>
                  <p className="text-[#637381] text-[11px] font-normal">
                  {dayjs(message?.timestamp).format('hh:mm A')}
                  </p>
                </div>
              )}
            </div>
            <div
              className={
                message?.sender === 0
                  ? "bg-red-100 font-normal rounded-lg"
                  : "bg-blue-100 font-normal rounded-lg"
              }
            >
              <div className="p-[12px] text-[13px] text-[#212B36]">
                {message?.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="md:hidden">
      <p className="text-[13px] font-medium text-center mt-[10px] mb-[8px]">
      {messageDate}
        </p>
        {messages?.map((message) => (
          <div
            key={message?._id}
            className={
              message?.sender === 0
                ? "ml-[1%] rounded-lg m-1"
                : "mr-[1%] rounded-lg m-1"
            }
          >
            <div className={message?.sender === 0 ? "ml-[90%]" : ""}>
              {message?.sender === 0 ? (
                 <div className="gap-[11px] -ml-14 flex mb-1">
                  <p className="text-[#637381] text-[11px] mt-2 font-normal">
                  {dayjs(message?.timestamp).format('hh:mm A')}
                  </p>
                  {/* <BotSvg className="m-1" /> */}
                  <img src={Bot}  alt="bot logo"/>
                </div>
              ) : (
                <div className="ml-[10px] gap-[11px] flex">
                  {/* <MsgUser className="m-1" /> */}
                  <img src={User}  alt="user logo"/>
                  <p className="text-[#637381] text-[11px] font-normal">
                  {dayjs(message?.timestamp).format('hh:mm A')}
                  </p>
                </div>
              )}
            </div>

            <div
              className={
                message?.sender === 0
                  ? "bg-red-100 text-[13px] rounded-lg p-2 ml-3 mr-4 my-3"
                  : "bg-blue-100 text-[13px] rounded-lg p-2 ml-4 mr-3 my-3"
              }
            >
              {message?.text}
            </div>
          </div>
        ))}
        {/* <div className="bg-primary p-2 mt-3 flex justify-between text-white">
          <div>
            <BsPlayCircleFill className="text-xl" />
          </div>
          <br />
          <div>
            <p>12:27:54</p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Msg;
