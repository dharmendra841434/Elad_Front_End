import React, { useState } from "react";
import BotListCard from "./BotListCard";
import MoreOptions from "./MoreOptions";
import { Howl } from "howler";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { randomNumber } from "../utils/helper/helperFunctions";

const BotTable = ({
  listOfBots,
  setShowModel,
  setSelectedBotID,
  setSelectedOption,
  setSelectedPhoneNumberSID,
  setSelectedBot,
}) => {
  const [allOptions, setAllOptions] = useState([
    "Message Settings",
    "Duplicate and Create New",
    "Edit",
    "Delete",
  ]);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (item.status === "archive") {
  //       setAllOptions(allOptions.filter((i) => i !== "Delete"));
  //     }
  //   }, []);

  const preViewBot = async (botDetails) => {
    let payload = {
      language: botDetails.language,
      voice_name: botDetails.voiceType,
      pitch: botDetails.pitch.toString(),
      speed: botDetails.speed.toString(),
      text: botDetails.greetings[randomNumber(botDetails.greetings.length) - 1]
        .greetText,
    };

    console.log(payload, "payload");

    await axios
      .post(`https://dev.paka-ai.com/bot_preview`, payload)
      .then((res) => {
        console.log(res.data, "preview");

        let aduio = new Howl({
          src: [`https://dev.paka-ai.com/${res.data.audio_response}`], ///'http://soundbible.com/mp3/45min_april_rainstorm-mike-koenig.mp3',
          html5: true,
          onend: async () => {
            // console.log("audio completed");
          },
        });
        aduio.play();
      })
      .catch((error) => {
        console.log(error, "error");
        toast.error(error.response.data.message, {
          theme: "colored",
          autoClose: 1000,
          progress: false,
          hideProgressBar: true,
          style: { backgroundColor: "red" },
        });
      });
  };

  const retriveAllormsData = (botData) => {
    console.log(botData, "id");
    const botIdentitydata = {
      botName: botData?.details.botName,
      botLanguage: botData?.details.language,
      botVoice: botData?.details.voiceType,
      voiceSpeed: botData?.details.speed,
      voicePitch: botData?.details.pitch,
    };
    const botgreetingData = {
      botGreetings: botData?.details.greetings,
    };

    const yourBusinessdata = {
      businessName: botData?.details.businessName,
      businessDesc: botData?.details.businessDescription,
      totalBranches: botData?.details.branches,
      countryISO: botData?.countryISO,
    };

    const businessFaqdata = {
      toggle: false,
      totalworkingHours: botData?.details.workingDetails,
      businessFAQ: botData?.details.faq,
      timeZone: botData?.details.timeZone,
    };

    console.log(botIdentitydata, "identity");
    console.log(botgreetingData, "greetibgs");
    console.log(yourBusinessdata, "yourbusiness");
    console.log(businessFaqdata, "faqs");

    localStorage.setItem("editfaqs", JSON.stringify(businessFaqdata));
    localStorage.setItem("edityourBusiness", JSON.stringify(yourBusinessdata));
    localStorage.setItem("editbotgreeting", JSON.stringify(botgreetingData));
    localStorage.setItem("editBotIdentity", JSON.stringify(botIdentitydata));
    localStorage.setItem("botData", JSON.stringify(botData));
  };

  const getBotDataForDuplication = (botDetails) => {
    const botIdentitydata = {
      botName: botDetails?.details.botName,
      botLanguage: botDetails?.details.language,
      botVoice: botDetails?.details.voiceType,
      voiceSpeed: botDetails?.details.speed,
      voicePitch: botDetails?.details.pitch,
    };
    const botgreetingData = {
      botGreetings: botDetails?.details.greetings,
    };

    const yourBusinessdata = {
      businessName: botDetails?.details.businessName,
      businessDesc: botDetails?.details.businessDescription,
      totalBranches: botDetails?.details.branches,
      countryISO: "US",
    };

    const businessFaqdata = {
      toggle: false,
      totalworkingHours: botDetails?.details.workingDetails,
      businessFAQ: botDetails?.details.faq,
      timeZone: botDetails?.details.timeZone,
    };

    // console.log(botIdentitydata, "identity");
    // console.log(botgreetingData, "greetibgs");
    // console.log(yourBusinessdata, "yourbusiness");
    // console.log(businessFaqdata, "faqs");

    localStorage.setItem("dupfaqs", JSON.stringify(businessFaqdata));
    localStorage.setItem("dupyourBusiness", JSON.stringify(yourBusinessdata));
    localStorage.setItem("dupbotgreeting", JSON.stringify(botgreetingData));
    localStorage.setItem("dupBotIdentity", JSON.stringify(botIdentitydata));
  };

  console.log(listOfBots, "list");

  return (
    <>
      <ToastContainer />
      <div className=" hidden lg:block relative bg-white">
        <div className=" grid grid-cols-7 xl:gap-x-6  bg-secoundry py-2  pl-2 rounded-md mt-2 mx-2">
          <p className=" text-[14.86px] text-white ">Sr. No.</p>
          <p className=" text-[14.86px] text-white ">Name</p>
          <p className=" text-[14.86px] text-white">Business Name</p>
          <p className=" text-[14.86px] text-white">Branches</p>
          <p className=" text-[14.86px] text-white "> Bot Phone No.</p>
          <p className=" text-[14.86px] text-white ml-5">Status</p>
          <p className=" text-[14.86px] text-white"></p>
        </div>
      </div>
      <div className=" hidden lg:block mx-3 ">
        {listOfBots?.length === 0 ? (
          <div className=" flex items-center justify-center py-5">
            <p className=" text-appgray">You Have No Any Bots</p>
          </div>
        ) : (
          <div className=" my-3">
            {listOfBots?.map((item, index) => (
              <div
                key={index}
                className="  grid grid-cols-7 xl:gap-x-6 mx-2 py-3"
              >
                <p className="  flex text-center text-[14.86px] text-ttt">
                  {index + 1}.
                </p>
                <p className=" text-[14.86px] text-ttt">
                  {item?.details?.botName}
                </p>
                <p className=" text-[14.86px] text-ttt">
                  {item?.details?.businessName}
                </p>
                <p className=" text-[14.86px] text-ttt ml-2">
                  {item?.details?.branches?.length}
                </p>
                <p className=" text-[14.86px] text-ttt ">
                  {item?.details?.bot_phone_no_Data?.phoneNumber}
                </p>
                <p
                  className={`text-[14.86px] ${
                    item?.status === "active"
                      ? "text-green-700"
                      : "text-red-600"
                  } ml-6 capitalize`}
                >
                  {item?.status}
                </p>
                <div className=" flex items-center justify-between">
                  <button
                    onClick={() => {
                      preViewBot(item?.details);
                    }}
                  >
                    <img
                      alt="preview"
                      className=" h-5 w-5 filter text-primary cursor-pointer transition-all duration-300 ease-in-out hover:h-6 hover:w-6"
                      src={require("../assets/images/megaphone.png")}
                    />
                  </button>
                  <MoreOptions
                    setSelectedOption={(option) => {
                      if (option === "Edit") {
                        //console.log("editnsdmsd");
                        navigate("/bots/edit-bot");
                        retriveAllormsData(item);
                        return;
                      }
                      if (option === "Duplicate and Create New") {
                        getBotDataForDuplication(item);
                        setShowModel(true);
                        setSelectedOption(option);
                        return;
                      }
                      setShowModel(true);
                      setSelectedOption(option);
                      setSelectedBotID(item._id);
                      setSelectedPhoneNumberSID(
                        item?.details?.bot_phone_no_Data?.sid
                      );
                      setSelectedBot(item);
                    }}
                    status={item.status}
                    options={allOptions}
                    className=" right-10 "
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="  lg:hidden mx-3  ">
        {listOfBots?.length === 0 ? (
          <div className=" flex items-center justify-center py-5">
            <p className=" text-appgray">You Have No Any Bots</p>
          </div>
        ) : (
          <div>
            {listOfBots?.map((item, index) => (
              <div key={index}>
                <BotListCard
                  item={item}
                  index={index}
                  onDelete={(r) => {
                    setShowModel(true);
                    setSelectedOption("Delete");
                    setSelectedBotID(item._id);
                  }}
                  onEdit={() => {
                    navigate("/bots/edit-bot");
                    retriveAllormsData(item);
                  }}
                  onSettings={() => {
                    setShowModel(true);
                    setSelectedOption("Message Settings");
                    setSelectedBotID(item._id);
                    setSelectedBot(item);
                  }}
                  onPreview={() => preViewBot(item?.details)}
                  onDuplicate={() => {
                    getBotDataForDuplication(item);
                    setShowModel(true);
                    setSelectedOption("Duplicate and Create New");
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BotTable;
