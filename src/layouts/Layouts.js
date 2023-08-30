import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import HomeRoutes from "../routes/HomeRoutes";
import SearchBar from "../components/SearchBar";
import { HiBell } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
import CreateBotIcon from "../assets/images/Icons/CreateBotIcon";
import DashboardIcon from "../assets/images/Icons/DashboardIcon";
import BotsIcon from "../assets/images/Icons/BotsIcon";
import CallHistoryIcon from "../assets/images/Icons/CallHistoryIcon";
import MessageCenterIcon from "../assets/images/Icons/MessageCenterIcon";
import SettingsIcon from "../assets/images/Icons/SettingsIcon";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  setCallHistoryData,
  setMessageCenterData,
  setUserData,
  storeBotsList,
} from "../redux/AppSlice";
import { setCallFilteredBot } from "../redux/CallSlice";
import axios from "axios";
import ProfileDetails from "../components/ProfileDetails";

const Layouts = () => {
  const userData = useSelector((state) => state.app.userData);
  const botsList = useSelector((state) => state.app.botsList);
  const deleteCall = useSelector((state) => state.call.deleteCall);
  /// console.log(userData, "this is redux user details");
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mobileProfile, setMobileProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [MenuBar, setMenuBar] = useState([
    {
      title: "Create Bot",
      path: "create-bot",
    },
    {
      title: "Dashboard",
      path: ["dashboard"],
    },
    {
      title: "Bots",
      path: ["bots", "bots/create-bot", "bots/edit-bot", "bots/duplicate-bot"],
    },
    {
      title: "Call History",
      path: ["call-history"],
    },
    {
      title: "Message Center",
      path: ["message-center"],
    },
    {
      title: "Settings",
      path: ["settings"],
    },
  ]);
  const [botList, setBotList] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const getCallHistoryData = async (bots) => {
    let callData = [];

    for (let i = 0; i < bots.length; i++) {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/get_call_history`, {
          bot_phone_number: bots[i]?.details?.bot_phone_no_Data?.phoneNumber,
        })
        .then(({ data }) => {
          // console.log(data.call_history, "callhistoryData");
          callData.push(data.call_history);
        })
        .catch((error) => {
          console.log(error, "callHistory data Error");
        });
    }
    console.log(callData, "dhjd");
    dispatch(setCallHistoryData(callData));
  };

  const getMessageCenterData = async (bots) => {
    let messageData = [];
    for (let i = 0; i < bots.length; i++) {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/get_voicemails`, {
          bot_phone_number: bots[i]?.details?.bot_phone_no_Data?.phoneNumber,
        })
        .then(({ data }) => {
          console.log(data.voicemails, "messageCenter Data");
          messageData.push(data.voicemails);
        })
        .catch((error) => {
          console.log(error, "Error in getting Message ceter data");
        });
    }
    console.log(messageData, "Yogi");
    dispatch(setMessageCenterData(messageData));
  };

  const getBotsList = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/bot-data/${id}`)
      .then(({ data }) => {
        console.log(data, "list of bots");
        setBotList(data);
        dispatch(storeBotsList(data));
        if (data.length === 0) {
          navigate("/create-bot");
        }
        if (data.length > 0) {
          //console.log("slkdsdsoi");
          navigate("/dashboard");
          getCallHistoryData(data);
          getMessageCenterData(data);
        }
      });
  };
  const getUserDetails = async () => {
    let useremail = localStorage.getItem("userEmail");
    await axios
      .post(`${process.env.REACT_APP_AUTH_URL}/get-user-data`, {
        email: useremail,
      })
      .then((result) => {
        console.log(result.data, "userData");
        dispatch(setUserData(result.data.user));
        getBotsList(result.data.user.id);
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  useEffect(() => {
    getCallHistoryData(botsList);
  }, [deleteCall]);

  useEffect(() => {}, [botList]);

  //console.log(userData?.firstname[0]);

  return (
    <div>
      <div className=" ">
        <div className=" flex">
          <div
            className={`hidden lg:block w-1/4 bg-primary sticky top-0 transition-all duration-500 ease-in-out  h-screen`}
          >
            <div className="  relative py-4">
              <div className=" flex items-center justify-center mt-5">
                <img
                  className=" h-8 w-28"
                  alt="logo"
                  src={require("../assets/images/Logo1.png")}
                />
              </div>
              <div className=" px-3 mt-6">
                {botList.length === 0 ? (
                  <div className=" select-none">
                    {/* <div
                      className="flex items-center pl-7 rounded-md bg-secoundry my-4 py-2 cursor-pointer"
                      onClick={() => {
                        navigate("/create-bot");
                      }}
                    >
                      <CreateBotIcon color={"#ffff"} />
                      <p className=" mx-4 text-white">Create Bot</p>{" "}
                    </div> */}
                    <div>
                      {MenuBar?.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            if(item.title === "Create Bot"){
                              navigate(`/create-bot`);
                            } else if(item.title === "Settings"){
                              navigate(`/settings`);
                            }
                        }}
                        className={`flex items-center ${
                          item.path.includes(location.pathname.slice(1))
                            ? " bg-secoundry text-white"
                            : "bg-primary text-diselectTab"
                        } my-4 py-2 rounded-md cursor-pointer pl-3`}
                          // className=" my-4 py-2 rounded-md cursor-pointer pl-3 bg-primary text-[#241c51]"
                        >
                        {item.title === "Create Bot" && (
                            <div className=" flex items-center ml-4">
                            <CreateBotIcon color={
                                item.path.includes(location.pathname.slice(1))
                                  ? "#ffff"
                                  : " rgba(145, 158, 171, 1)" }/>
                              <p className="text-[#ffff] mx-4">{item.title}</p>{" "}
                            </div>
                          )}
                          {item.title === "Dashboard" && (
                            <div className=" flex items-center ml-4 text-[#241c51]">
                              <DashboardIcon color={"#241c51"} />
                              <p className=" mx-4">{item.title}</p>{" "}
                            </div>
                          )}
                          {item.title === "Bots" && (
                            <div className=" flex items-center ml-4 text-[#241c51]">
                              <BotsIcon color={"#241c51"} />
                              <p className=" mx-4">{item.title}</p>{" "}
                            </div>
                          )}
                          {item.title === "Call History" && (
                            <div className=" flex items-center ml-4 text-[#241c51]">
                              <CallHistoryIcon color={"#241c51"} />
                              <p className=" mx-4">{item.title}</p>{" "}
                            </div>
                          )}
                          {item.title === "Message Center" && (
                            <div className=" flex items-center ml-4 text-[#241c51]">
                              <MessageCenterIcon color={"#241c51"} />
                              <p className=" mx-4">{item.title}</p>{" "}
                            </div>
                          )}
                          {item.title === "Settings" && (
                            <div className=" flex items-center ml-4">
                              {/* <SettingsIcon color={"#241c51"} /> */}
                              <SettingsIcon
                              color={
                                item.path.includes(location.pathname.slice(1))
                                  ? "#ffff "
                                  : " rgba(145, 158, 171, 1) "
                              }
                            />
                              <p className="text-[#ffff] mx-4">{item.title}</p>{" "}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    {MenuBar?.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          navigate(`/${item.path[0]}`);
                          if (item.title === "Settings") {
                            localStorage.removeItem("payment");
                          }
                        }}
                        className={`flex items-center ${
                          item.path.includes(location.pathname.slice(1))
                            ? " bg-selectedTab text-white"
                            : "bg-primary text-diselectTab"
                        } my-4 py-2 rounded-md cursor-pointer pl-3`}
                      >
                        {item.title === "Dashboard" && (
                          <div className=" flex items-center ml-4">
                            <DashboardIcon
                              color={
                                item.path.includes(location.pathname.slice(1))
                                  ? "#ffff"
                                  : " rgba(145, 158, 171, 1)"
                              }
                            />
                            <p className=" mx-4">{item.title}</p>{" "}
                          </div>
                        )}
                        {item.title === "Bots" && (
                          <div className=" flex items-center ml-4">
                            <BotsIcon
                              color={
                                item.path.includes(location.pathname.slice(1))
                                  ? "#ffff"
                                  : " rgba(145, 158, 171, 1)"
                              }
                            />
                            <p className=" mx-4">{item.title}</p>{" "}
                          </div>
                        )}
                        {item.title === "Call History" && (
                          <div className=" flex items-center ml-4">
                            <CallHistoryIcon
                              color={
                                item.path.includes(location.pathname.slice(1))
                                  ? "#ffff"
                                  : " rgba(145, 158, 171, 1)"
                              }
                            />
                            <p className=" mx-4">{item.title}</p>{" "}
                          </div>
                        )}
                        {item.title === "Message Center" && (
                          <div
                            onClick={() =>
                              dispatch(
                                setCallFilteredBot({ _id: 0, botName: "All" })
                              )
                            }
                            className=" flex items-center ml-4"
                          >
                            <MessageCenterIcon
                              color={
                                item.path.includes(location.pathname.slice(1))
                                  ? "#ffff"
                                  : " rgba(145, 158, 171, 1)"
                              }
                            />
                            <p className=" mx-4">{item.title}</p>{" "}
                          </div>
                        )}
                        {item.title === "Settings" && (
                          <div className=" flex items-center ml-4">
                            <SettingsIcon
                              color={
                                item.path.includes(location.pathname.slice(1))
                                  ? "#ffff"
                                  : " rgba(145, 158, 171, 1)"
                              }
                            />
                            <p className=" mx-4">{item.title}</p>{" "}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" bg-white w-full">
            <div className=" hidden lg:block sticky top-0 z-20  px-4 bg-white">
              <div className=" flex flex-row items-center   py-4">
                <div className=" w-1/2 invisible">
                  <SearchBar />
                </div>
                <div className=" flex justify-end w-1/2 items-center">
                  <div className=" mx-4 relative invisible">
                    <HiBell className=" text-3xl text-appgray cursor-pointer" />
                    <p className=" bg-red-500   px-1.5 select-none py-0.5 rounded-full text-center text-white absolute -top-2 text-[10px] -right-2">
                      8
                    </p>
                  </div>
                  <div className=" flex  relative  ">
                    <div className=" mx-2 capitalize flex items-center justify-center bg-[#C2185B] text-white font-semibold text-2xl h-10 w-10 rounded-full">
                      {userData?.firstname !== undefined &&
                        userData?.firstname[0]}
                    </div>
                    <div
                      onClick={() => setMobileProfile(!mobileProfile)}
                      className=" mx-1 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <p className=" capitalize">
                          {`${userData?.firstname} ${userData?.lastname}`}
                        </p>
                        <MdKeyboardArrowDown className=" ml-6" />
                      </div>
                      <p className=" text-sm">Free Plan</p>
                    </div>
                    <ProfileDetails
                      isOpen={mobileProfile}
                      userDetails={userData}
                      setIsOpen={setMobileProfile}
                      className=" hidden lg:block right-0 top-0 w-72 bg-white shadow-dropDownBox"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" lg:hidden  sticky top-0 right-0 z-40">
              <div className=" relative ">
                <div className=" bg-primary grid grid-cols-3 py-3 px-3">
                  <div className=" flex items-center ">
                    <FiMenu
                      onClick={() => setMenu(true)}
                      className=" text-white text-3xl"
                    />
                    <FiSearch className=" text-white text-xl mx-2 invisible" />
                  </div>
                  <div className=" flex items-center">
                    <img
                      className=" h-8 w-28"
                      alt="logo"
                      src={require("../assets/images/Logo1.png")}
                    />
                  </div>
                  <div className="  flex items-center justify-end">
                    <div className=" mx-4 relative invisible">
                      <HiBell className=" text-3xl text-appgray" />
                      <p className=" bg-red-500   px-1.5 select-none py-0.5 rounded-full text-center text-white absolute -top-2 text-[10px] -right-2">
                        8
                      </p>
                    </div>

                    <div
                      onClick={() => setShowProfile(true)}
                      className=" mx-2 capitalize flex items-center justify-center bg-[#C2185B] text-white font-semibold text-2xl h-10 w-10 rounded-full"
                    >
                      {userData?.firstname !== undefined &&
                        userData?.firstname[0]}
                    </div>
                    <ProfileDetails
                      isOpen={showProfile}
                      userDetails={userData}
                      setIsOpen={setShowProfile}
                      className="lg:hidden right-3 top-3 w-72 bg-white shadow-dropDownBox"
                    />
                  </div>
                </div>
              </div>
              <div
                className={` transition-all  duration-300 ease-in-out absolute left-0 bg-primary top-0 min-h-screen z-50 ${
                  menu ? " w-9/12" : " w-0"
                }`}
              >
                {menu && (
                  <div>
                    <div className="flex justify-end pt-4 pr-4">
                      <CgClose
                        onClick={() => setMenu(false)}
                        className=" text-white text-2xl"
                      />
                    </div>
                    <div className="flex items-center justify-center mt-8">
                      <img
                        className="h-8 w-28"
                        alt="logo"
                        src={require("../assets/images/Logo1.png")}
                      />
                    </div>
                    <div className=" px-3 mt-6">
                      {botList.length === 0 ? (
                        <div>
                          <div className=" flex items-center  pl-7 rounded-md bg-secoundry my-4 py-2">
                            <CreateBotIcon color={"#ffff"} />
                            <p className=" mx-4 text-white">Create Bot</p>{" "}
                          </div>
                          <div>
                            {MenuBar?.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center my-4 py-2 rounded-md cursor-pointer pl-3 bg-primary text-[#241c51]"
                              >
                                {item.title === "Dashboard" && (
                                  <div className=" flex items-center ml-4">
                                    <DashboardIcon color={"#241c51"} />
                                    <p className=" mx-4">{item.title}</p>{" "}
                                  </div>
                                )}
                                {item.title === "Bots" && (
                                  <div className=" flex items-center ml-4">
                                    <BotsIcon color={"#241c51"} />
                                    <p className=" mx-4">{item.title}</p>{" "}
                                  </div>
                                )}
                                {item.title === "Call History" && (
                                  <div className=" flex items-center ml-4">
                                    <CallHistoryIcon color={"#241c51"} />
                                    <p className=" mx-4">{item.title}</p>{" "}
                                  </div>
                                )}
                                {item.title === "Message Center" && (
                                  <div className=" flex items-center ml-4">
                                    <MessageCenterIcon color={"#241c51"} />
                                    <p className=" mx-4">{item.title}</p>{" "}
                                  </div>
                                )}
                                {item.title === "Settings" && (
                                  <div className=" flex items-center ml-4">
                                    <SettingsIcon color={"#241c51"} />
                                    <p className=" mx-4">{item.title}</p>{" "}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          {MenuBar?.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                navigate(`/${item.path[0]}`);
                                setMenu(false);
                              }}
                              className={`flex items-center ${
                                item.path.includes(location.pathname.slice(1))
                                  ? " bg-selectedTab text-white"
                                  : "bg-primary text-diselectTab"
                              } my-4 py-2 rounded-md cursor-pointer pl-3`}
                            >
                              {item.title === "Dashboard" && (
                                <div className=" flex items-center ml-4">
                                  <DashboardIcon
                                    color={
                                      item.path.includes(
                                        location.pathname.slice(1)
                                      )
                                        ? "#ffff"
                                        : " rgba(145, 158, 171, 1)"
                                    }
                                  />
                                  <p className=" mx-4">{item.title}</p>{" "}
                                </div>
                              )}
                              {item.title === "Bots" && (
                                <div className=" flex items-center ml-4">
                                  <BotsIcon
                                    color={
                                      item.path.includes(
                                        location.pathname.slice(1)
                                      )
                                        ? "#ffff"
                                        : " rgba(145, 158, 171, 1)"
                                    }
                                  />
                                  <p className=" mx-4">{item.title}</p>{" "}
                                </div>
                              )}
                              {item.title === "Call History" && (
                                <div className=" flex items-center ml-4">
                                  <CallHistoryIcon
                                    color={
                                      item.path.includes(
                                        location.pathname.slice(1)
                                      )
                                        ? "#ffff"
                                        : " rgba(145, 158, 171, 1)"
                                    }
                                  />
                                  <p className=" mx-4">{item.title}</p>{" "}
                                </div>
                              )}
                              {item.title === "Message Center" && (
                                <div className=" flex items-center ml-4">
                                  <MessageCenterIcon
                                    color={
                                      item.path.includes(
                                        location.pathname.slice(1)
                                      )
                                        ? "#ffff"
                                        : " rgba(145, 158, 171, 1)"
                                    }
                                  />
                                  <p className=" mx-4">{item.title}</p>{" "}
                                </div>
                              )}
                              {item.title === "Settings" && (
                                <div className=" flex items-center ml-4">
                                  <SettingsIcon
                                    color={
                                      item.path.includes(
                                        location.pathname.slice(1)
                                      )
                                        ? "#ffff"
                                        : " rgba(145, 158, 171, 1)"
                                    }
                                  />
                                  <p className=" mx-4">{item.title}</p>{" "}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white">
              <HomeRoutes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layouts;
