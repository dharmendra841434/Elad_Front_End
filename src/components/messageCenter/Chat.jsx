import React from "react";
import { MdArrowBackIosNew, MdPermPhoneMsg } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MsgUser } from "../../assets/images/Icons/msgUser.svg";
import { HiUserCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { setSelectedNumber, setViewCallHistory } from "../../redux/CallSlice";

const Chat = (props) => {
  const { messageId, setShow } = props;
  console.log(messageId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const [isShown, setIsShown] = useState(false);
  //   const detailsHandler = (event) => {
  //     setIsShown((current) => !current);
  //   };
  const navigateHandler = () => {
    dispatch(setViewCallHistory(true));
    navigate("/call-history");
    dispatch(setSelectedNumber(messageId[0]?.callId));
  };

  const clickHandler = (event) => {
    setShow((current) => !current);
  };

  return (
    <>
      {/* for large screen */}
      <div className="hidden md:flex flex-col justify-between w-[57%] border mt-[2%] mr-[2%] ml-[2%] mb-[3%]">
        <div className="">
          <div className="flex text-[13px] text-[#637381]">
            <div>
              <div className="hidden md:block">
                <div
                  key={messageId[0]?._id}
                  className="rounded-lg m-1 pl-6 p-4"
                >
                  <div className="flex gap-2 mb-[3%]">
                    <MsgUser />
                    {/* <HiUserCircle className="text-5xl m-1 text-red-500" /> */}

                    <h6 className="text-lg font-medium text-black mt-3">
                      {messageId[0]?.callerName}
                    </h6>
                  </div>

                  <p className="text-black">
                    Date and Time:{" "}
                    <span className="text-[#637381]">
                      {" "}
                      {messageId[0]?.date}
                    </span>
                  </p>
                  <p className="text-black">
                    Caller Name:{" "}
                    <span className="text-[#637381]">
                      {" "}
                      {messageId[0]?.callerName}
                    </span>
                  </p>
                  <p className="text-black">
                    phone Number:{" "}
                    <span className="text-[#637381]">
                      {" "}
                      {messageId[0]?.callerPhoneNumber}
                    </span>
                  </p>
                  <p className="text-black">
                    Bot:{" "}
                    <span className="text-[#637381]">
                      {" "}
                      {messageId[0]?.botName}
                    </span>
                  </p>

                  <p className="p-1 text-black">
                    Message: <br />{" "}
                    <span className="text-[#637381]">
                      {" "}
                      {messageId[0]?.voicemail}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            navigateHandler();
          }}
          className="mb-[2%] ml-[58%]"
        >
          <div className="bg-primary text-white inline p-2 rounded-lg text-sm font-bold">
            <MdPermPhoneMsg className="inline" /> View Call History
          </div>
        </button>
      </div>

      {/* for small screns */}
      <div className="md:hidden h-[88vh]">
        <div className=" flex gap-3 ml-[3%] mr-[3%] mt-[2%]">
          <MdArrowBackIosNew
            onClick={clickHandler}
            // className="align-middle inline text-2xl"
            className="scale-[2] mt-8 text-primary text-5xl w-[4%]"
          />
          <div className="flex text-[13px] text-[#637381] w-[95%]">
            <div className="md:hidden">
              <div key={messageId[0]?._id} className="rounded-lg m-1">
                <div className="flex ">
                  <HiUserCircle className="text-5xl m-1 text-red-500" />
                  <h6 className="text-lg font-medium text-black mt-[3.5%]">
                    {messageId[0]?.callerName}
                  </h6>
                </div>

                <p className="text-black">
                  Date and Time:{" "}
                  <span className="text-[#637381]"> {messageId[0]?.date} </span>
                </p>
                <p className="text-black">
                  Caller Name:{" "}
                  <span className="text-[#637381]">
                    {" "}
                    {messageId[0]?.callerName}{" "}
                  </span>
                </p>
                <p className="text-black">
                  phone Number:{" "}
                  <span className="text-[#637381]">
                    {" "}
                    {messageId[0]?.callerPhoneNumber}{" "}
                  </span>
                </p>
                <p className="text-black">
                  Bot:{" "}
                  <span className="text-[#637381]">
                    {" "}
                    {messageId[0]?.botName}
                  </span>
                </p>

                <p className="p-1 text-black">
                  Message: <br />{" "}
                  <span className="text-[#637381]">
                    {" "}
                    {messageId[0]?.voicemail}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            navigateHandler();
          }}
          className="absolute bottom-2 right-0 mr-[4%] mb-[10%] "
        >
          <div className="bg-primary hover:bg-secoundry text-white inline p-2 rounded-lg text-sm font-bold">
            <MdPermPhoneMsg className="inline" /> View Call History
          </div>
        </button>
      </div>
    </>
  );
};

export default Chat;
