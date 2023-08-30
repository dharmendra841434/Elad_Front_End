import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BotsIcon from "../assets/images/Icons/BotsIcon";
import axios from "axios";
import CustomModal from "../components/CustomModal";
import { ThreeCircles } from "react-loader-spinner";
import BotTable from "../components/BotTable";
import Toggle from "../components/Toggle";
import { useDispatch, useSelector } from "react-redux";
import { storeBotsList } from "../redux/AppSlice";
import EmailInput from "../components/EmailInput";
import { ToastContainer, toast } from "react-toastify";

const Bots = () => {
  const listOfBots = useSelector((state) => state.app.botsList);
  const userData = useSelector((state) => state.app.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModel, setShowModel] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Delete");
  const [selectedBotID, setSelectedBotID] = useState("");
  const [selectedPhoneNumberSID, setSelectedPhoneNumberSID] = useState("");
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [getMessage, setGetMessage] = useState(true);
  const [transferCall, setTransferCall] = useState(false);
  const [botSettingsLoader, setBotSettingsLoader] = useState(false);
  const [emails, setEmails] = useState([]);

  // console.log(listOfBots, "list");

  const deleteBot = async () => {
    setDeleteLoader(true);
    await axios
      .post("https://dev.paka-ai.com/release-phone-number", {
        phoneSid: selectedPhoneNumberSID,
      })
      .then(async ({ data }) => {
        await axios
          .post("https://dev.paka-ai.com/update-bot-details", {
            id: selectedBotID,
            status: "archive",
          })
          .then(async ({ data }) => {
            // console.log(data);
            setDeleteLoader(false);
            setShowModel(false);
          })
          .catch((err) => {
            setDeleteLoader(false);
            setShowModel(false);
            toast.error("Something went wrong!!", {
              theme: "colored",
              position: "top-center",
              autoClose: 3000,
              progress: false,
              hideProgressBar: true,
            });
            console.log(err, "update error");
          });
      })
      .catch((e) => {
        setDeleteLoader(false);
        setShowModel(false);
        toast.error("Something went wrong!!", {
          theme: "colored",
          position: "top-center",
          autoClose: 3000,
          progress: false,
          hideProgressBar: true,
        });
        console.log(e, "phone number  release error");
      });
  };

  const botsType = ["All", "Active", "Archived"];
  const [selectedBotType, setSelectedBotType] = useState("All");

  const saveBotSettings = async () => {
    console.log(emails, "emails");
    setBotSettingsLoader(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/update-bot-details`, {
        id: selectedBotID,
        bot_settings: {
          getMessage: getMessage,
          transferCall: transferCall,
          emailsForSendingMessages: emails,
        },
      })
      .then(async (result) => {
        getBotsList();
        setBotSettingsLoader(false);
        setShowModel(false);
        console.log(result.data, "skjdjd");
        toast.success("Setting Saved", {
          theme: "colored",
          position: "top-center",
          autoClose: 3000,
          progress: false,
          hideProgressBar: true,
          style: { backgroundColor: "green" },
        });
      })
      .catch((err) => {
        console.log(err, "settings error");
      });
  };

  const getBotsList = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/bot-data/${userData.id}`)
      .then(({ data }) => {
        console.log(data, "list of bots");
        dispatch(storeBotsList(data));
      });
  };

  useEffect(() => {
    getBotsList();
  }, [deleteLoader]);

  return (
    <div className=" px-3 relative">
      <ToastContainer />
      <CustomModal isOpen={showModel}>
        {selectedOption === "Delete" && (
          <div className=" flex flex-col rounded-md items-center bg-white w-full  mx-3 lg:mx-0 md:w-1/2 h-fit mt-32 lg:mt-12 py-6">
            <img
              className=" w-12 h-12"
              alt="del"
              src={require("../assets/images/trash.png")}
            />
            {deleteLoader ? (
              <div className="  my-5  w-full flex flex-col items-center">
                <ThreeCircles
                  height="60"
                  width="60"
                  color="#000032"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="three-circles-rotating"
                />
                <p className=" mt-5 text-primary">Moving to Archive.....</p>
              </div>
            ) : (
              <div className=" w-full flex flex-col items-center">
                <p className=" text-appgray text-[18px] mx-3 lg:mx-0 lg:w-1/2 flex text-center">
                  Deleting a bot will move it to archive, are you sure?
                </p>
                <button
                  onClick={() => deleteBot()}
                  className={` flex justify-center w-1/2 lg:w-1/3 mt-4 transition-all duration-300 ease-in-out hover:bg-secoundry hover:border-secoundry bg-primary py-2 px-8 rounded-md mx-3 text-white`}
                >
                  Yes, Delete
                </button>
                <button onClick={() => setShowModel(false)} className=" mt-3">
                  No, Keep it
                </button>
              </div>
            )}
          </div>
        )}
        {selectedOption === "Message Settings" && (
          <div className=" flex flex-col rounded-md items-center bg-white w-full  mx-3 lg:mx-0 md:w-1/2 h-fit mt-32 lg:mt-12 py-6">
            <p className=" font-semibold text-primary ">{selectedOption}</p>
            {botSettingsLoader ? (
              <div className="  my-5  w-full flex flex-col items-center">
                <ThreeCircles
                  height="60"
                  width="60"
                  color="#000032"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="three-circles-rotating"
                />
                <p className=" mt-5 text-primary">Saving....</p>
              </div>
            ) : (
              <>
                <div className=" flex items-center justify-between w-10/12 my-3">
                  <p className=" text-primary">Taking messages by the bot</p>
                  <Toggle
                    onChange={() => setGetMessage(!getMessage)}
                    active={getMessage}
                  />
                </div>
                <div className=" flex items-center justify-between w-10/12 my-3">
                  <p className=" text-primary">
                    Do not transfer calls to the branch after business hours
                  </p>
                  <Toggle
                    onChange={() => {
                      setTransferCall(!transferCall);
                    }}
                    active={transferCall}
                  />
                </div>
                <div className=" w-10/12 ">
                  <p className=" text-primary my-4">
                    Emails for sending the messages from the bot
                  </p>
                  <EmailInput
                    boxClassName=" h-28"
                    emails={emails}
                    setEmails={setEmails}
                  />
                </div>
                <div className=" w-full flex flex-col items-center">
                  <button
                    onClick={() => {
                      saveBotSettings();
                    }}
                    className={` flex justify-center w-1/2 lg:w-1/3 mt-4 transition-all duration-300 ease-in-out hover:bg-secoundry hover:border-secoundry bg-primary py-2 px-8 rounded-md mx-3 text-white`}
                  >
                    Save
                  </button>
                  <button onClick={() => setShowModel(false)} className=" mt-3">
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        )}
        {selectedOption === "Create New" && (
          <div className=" flex flex-col rounded-md items-center bg-white w-full  mx-3 lg:mx-0 md:w-8/12 h-fit mt-32 lg:mt-12 py-6">
            <img
              className=" w-12 h-12"
              alt="bot"
              src={require("../assets/images/dup.png")}
            />
            <p className=" text-primary font-semibold mt-5 mb-2">
              Create a New Bot
            </p>
            <p className=" text-appgray text-center">
              Creating a new bot causes an additional charge.
            </p>
            <div className=" w-full flex flex-col items-center">
              <button
                onClick={() => navigate("/bots/create-bot")}
                className={` flex justify-center w-8/12 lg:w-1/2 xl:w-1/3 mt-4 transition-all duration-300 ease-in-out hover:bg-secoundry hover:border-secoundry bg-primary py-2 px-8 rounded-md mx-3 text-white`}
              >
                Create a new bot
              </button>
              <button onClick={() => setShowModel(false)} className=" mt-3">
                Cancel
              </button>
            </div>
          </div>
        )}
        {selectedOption === "Duplicate and Create New" && (
          <div className=" flex flex-col rounded-md items-center bg-white w-full  mx-3 lg:mx-0 md:w-8/12 h-fit mt-32 lg:mt-12 py-6">
            <img
              className=" w-12 h-12"
              alt="bot"
              src={require("../assets/images/dup.png")}
            />
            <p className=" text-primary font-semibold mt-5 mb-2">
              Duplicate and Create New
            </p>
            <p className=" text-appgray text-center">
              Creating a new bot causes an additional charge.
            </p>
            <div className=" w-full flex flex-col items-center">
              <button
                onClick={() => navigate("/bots/duplicate-bot")}
                className={` flex justify-center w-8/12 lg:w-1/2 xl:w-1/3 mt-4 transition-all duration-300 ease-in-out hover:bg-secoundry hover:border-secoundry bg-primary py-2 px-8 rounded-md mx-3 text-white`}
              >
                Create a new bot
              </button>
              <button onClick={() => setShowModel(false)} className=" mt-3">
                Cancel
              </button>
            </div>
          </div>
        )}
      </CustomModal>
      <h1 className=" mt-6 lg:mt-0 text-2xl font-bold text-primary ">Bots</h1>
      <div className=" flex justify-between items-center">
        <p className=" text-[11px] text-appgray">
          Take a look at your bots here
        </p>
        <button
          onClick={() => {
            setShowModel(true);
            setSelectedOption("Create New");
          }}
          className=" flex items-center bg-primary cursor-pointer  px-3 py-2 rounded-md mx-3"
        >
          <BotsIcon color={"#fff"} />
          <p className=" text-white mx-2 text-[14px]">Create a new bot</p>
        </button>
      </div>
      <div className="   mt-4 rounded-2xl overflow-hidden shadow-tableShadow bg-white mb-12 lg:mb-0 ">
        <div className=" bg-primary flex items-center px-3 gap-x-4 py-2  ">
          {botsType.map((item, index) => (
            <div
              onClick={() => setSelectedBotType(item)}
              className={`text-white py-0.5 text-[16px] cursor-pointer ${
                selectedBotType === item && " border-b-2 border-b-white"
              }`}
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
        {selectedBotType === "All" && (
          <>
            <BotTable
              listOfBots={listOfBots}
              setSelectedBotID={setSelectedBotID}
              setSelectedOption={(opt) => {
                setSelectedOption(opt);
              }}
              setShowModel={setShowModel}
              setSelectedPhoneNumberSID={setSelectedPhoneNumberSID}
              setSelectedBot={(r) => {
                setGetMessage(r?.bot_settings?.getMessage);
                setTransferCall(r?.bot_settings?.transferCall);
                setEmails(r?.bot_settings?.emailsForSendingMessages);
              }}
            />
          </>
          // <>
          //   <div className=" hidden lg:block relative bg-white">
          //     <div className=" grid grid-cols-7 xl:gap-x-6  bg-secoundry py-2  pl-2 rounded-md mt-2 mx-2">
          //       <p className=" text-[14.86px] text-white ">Sr. No.</p>
          //       <p className=" text-[14.86px] text-white ">Name</p>
          //       <p className=" text-[14.86px] text-white">Business Name</p>
          //       <p className=" text-[14.86px] text-white">Branches</p>
          //       <p className=" text-[14.86px] text-white "> Bot Phone No.</p>
          //       <p className=" text-[14.86px] text-white ml-5">Status</p>
          //       <p className=" text-[14.86px] text-white"></p>
          //     </div>
          //   </div>
          //   <div className=" hidden lg:block mx-3 ">
          //     {listOfBots.length === 0 ? (
          //       <div className=" flex items-center justify-center py-5">
          //         <p className=" text-appgray">
          //           You Have No Any Bots , Please Create First
          //         </p>
          //       </div>
          //     ) : (
          //       <div>
          //         {listOfBots?.map((item, index) => (
          //           <div
          //             key={index}
          //             className="  grid grid-cols-7 xl:gap-x-6 mx-2 py-6"
          //           >
          //             <p className="  flex text-center text-[14.86px] text-ttt">
          //               {index + 1}.
          //             </p>
          //             <p className=" text-[14.86px] text-ttt">
          //               {item.details.botName}
          //             </p>
          //             <p className=" text-[14.86px] text-ttt">
          //               {item.details.businessName}
          //             </p>
          //             <p className=" text-[14.86px] text-ttt ml-2">
          //               {item.details.branches?.length}
          //             </p>
          //             <p className=" text-[14.86px] text-ttt ">
          //               {item.details.bot_phone_no}
          //             </p>
          //             <p className=" text-[14.86px] text-green-700 ml-6 capitalize">
          //               {item.status}
          //             </p>
          //             <div className=" flex items-center justify-between">
          //               <img
          //                 alt="preview"
          //                 className=" h-5 w-5 filter text-primary"
          //                 src={require("../assets/images/megaphone.png")}
          //               />
          //               <MoreOptions
          //                 setSelectedOption={(option) => {
          //                   if (option === "Delete") {
          //                     setShowModel(true);
          //                     setSelectedOption(option);
          //                     setSelectedBotID(item._id);
          //                     return;
          //                   }
          //                   if (option === "Edit") {
          //                     console.log("Edit");
          //                     return;
          //                   }
          //                   if (option === "Message Settings") {
          //                     console.log("Message Settings");
          //                     return;
          //                   }
          //                   if (option === "Duplicate and Create New") {
          //                     console.log("Duplicate and Create New");
          //                     return;
          //                   }
          //                 }}
          //                 options={allOptions}
          //                 className=" right-10 "
          //               />
          //             </div>
          //           </div>
          //         ))}
          //       </div>
          //     )}
          //   </div>
          //   <div className="  lg:hidden mx-3 ">
          //     {listOfBots.length === 0 ? (
          //       <div className=" flex items-center justify-center py-5">
          //         <p className=" text-appgray">
          //           You Have No Any Bots , Please Create First
          //         </p>
          //       </div>
          //     ) : (
          //       <div>
          //         {listOfBots?.map((item, index) => (
          //           <div key={index}>
          //             <BotListCard
          //               item={item.details}
          //               index={index}
          //               onDelete={(r) => {
          //                 setShowModel(true);
          //                 setSelectedOption("Delete");
          //                 setSelectedBotID(item._id);
          //               }}
          //             />
          //           </div>
          //         ))}
          //       </div>
          //     )}
          //   </div>
          // </>
        )}
      </div>
      {selectedBotType === "Active" && (
        <div>
          <BotTable
            listOfBots={listOfBots.filter((r) => r.status === "active" && r)}
            setSelectedBotID={setSelectedBotID}
            setSelectedOption={setSelectedOption}
            setShowModel={setShowModel}
            setSelectedPhoneNumberSID={setSelectedPhoneNumberSID}
            setSelectedBot={(r) => {
              setGetMessage(r?.bot_settings?.getMessage);
              setTransferCall(r?.bot_settings?.transferCall);
              setEmails(r?.bot_settings?.emailsForSendingMessages);
            }}
          />
        </div>
      )}
      {selectedBotType === "Archived" && (
        <div>
          <BotTable
            listOfBots={listOfBots.filter((r) => r.status === "archive" && r)}
            setSelectedBotID={setSelectedBotID}
            setSelectedOption={setSelectedOption}
            setShowModel={setShowModel}
            setSelectedPhoneNumberSID={setSelectedPhoneNumberSID}
          />
        </div>
      )}
    </div>
  );
};

export default Bots;
