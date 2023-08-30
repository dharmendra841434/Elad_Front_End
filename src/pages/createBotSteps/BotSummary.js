import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import SumaryHeading from "../../components/SumaryHeading";
import { randomNumber, smallString } from "../../utils/helper/helperFunctions";
import ShowInputs from "../../components/dataShowComponents/ShowInputs";
import ShowDropDown from "../../components/dataShowComponents/ShowDropDown";
import RangeSelector from "../../components/RangeSelector";
import ShowContact from "../../components/dataShowComponents/ShowContact";
import ShowBusinessFAQs from "../../components/dataShowComponents/ShowBusinessFAQs";
import Toggle from "../../components/Toggle";
import { FaTrashAlt } from "react-icons/fa";
import MobileVersionShowData from "../../components/dataShowComponents/MobileVersionShowData";
import CustomModal from "../../components/CustomModal";
import axios from "axios";
import { Howl } from "howler";
import { ToastContainer, toast } from "react-toastify";
import MusicPlay from "../../assets/images/Icons/MusicPlay";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { IoIosCopy } from "react-icons/io";
import CustomSlider from "../../components/CustomSlider";
import DescriptionInput from "../../components/DescriptionInput";
import { useSelector } from "react-redux";

const BotSummary = () => {
  const userDetails = useSelector((state) => state.app.userData);
  const [process, setProcess] = useState([
    {
      title: "Bot Identity",
      state: false,
    },
    {
      title: "Bot Greetings",
      state: false,
    },
    {
      title: "Your Business",

      state: false,
    },
    {
      title: "Business FAQs",

      state: false,
    },
  ]);

  const [botIdentity, setBotIdentity] = useState(
    JSON.parse(localStorage.getItem("botIdentity"))
  );
  const [botGreeting, setBotGreeting] = useState(
    JSON.parse(localStorage.getItem("greeting"))
  );
  const [yourBusinessData, setYourBusinessData] = useState(
    JSON.parse(localStorage.getItem("yourBusiness"))
  );
  const [businessFaqs, setBusinessFaqs] = useState(
    JSON.parse(localStorage.getItem("faqs"))
  );

  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [buyedPhoneNumber, setBuyedPhoneNumber] = useState("");

  const [show, setShow] = useState(false);

  const handleState = (index) => {
    const newArray = process?.map((item, i) => {
      if (i === index) {
        // console.log(day, "index");
        return {
          ...item,
          state: item.state ? false : true,
        };
      } else {
        return item;
      }
    });
    setProcess(newArray);
  };
  const [previewLoader, setPreviewLoader] = useState(false);
  const preViewBot = async () => {
    let payload = {
      language: botIdentity.botLanguage,
      voice_name: botIdentity.botVoice,
      pitch: botIdentity.voicePitch.toString(),
      speed: botIdentity.voiceSpeed.toString(),
      text: botGreeting?.botGreetings[
        randomNumber(botGreeting.botGreetings.length) - 1
      ].greetText,
    };
    // console.log(payload, "payload");
    await axios
      .post(`https://dev.paka-ai.com/bot_preview`, payload)
      .then((res) => {
        setPreviewLoader(true);
        console.log(res.data, "preview");
        let aduio = new Howl({
          src: [`https://dev.paka-ai.com/${res.data.audio_response}`], ///'http://soundbible.com/mp3/45min_april_rainstorm-mike-koenig.mp3',
          html5: true,
          onend: async () => {
            console.log("audio completed");
            setPreviewLoader(false);
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
  // console.log(yourBusinessData.countryISO, "countryISO");
  const storeBotDetails = async () => {
    setShow(true);
    setLoader(true);

    await axios
      .post("https://dev.paka-ai.com/buyNumber", {
        ISO: yourBusinessData.countryISO,
      })
      .then(async ({ data }) => {
        console.log(data, "phone Data");
        setBuyedPhoneNumber(data.SelectedNumberData.phoneNumber);
        await axios
          .post("https://dev.paka-ai.com/bot-data", {
            userId: userDetails?.id,
            details: {
              botName: botIdentity.botName,
              language: botIdentity.botLanguage,
              voiceType: botIdentity.botVoice,
              speed: Number(botIdentity.voiceSpeed),
              pitch: Number(botIdentity.voicePitch),
              bot_phone_no_Data: data.SelectedNumberData,
              greetings: botGreeting?.botGreetings,
              businessName: yourBusinessData.businessName,
              businessDescription: yourBusinessData.businessDesc,
              branches: yourBusinessData.totalBranches,
              workingDetails: businessFaqs.totalworkingHours,
              faq: businessFaqs.businessFAQ,
              timeZone: businessFaqs.timeZone,
              countryISO: yourBusinessData.countryISO,
            },
            bot_settings: {
              getMessage: true,
              transferCall: false,
              emailsForSendingMessages: [userDetails.email],
            },
            status: "active",
          })
          .then(async (result) => {
            // console.log(data, "bot details Data");
            console.log(result, "bot details");
            await axios
              .post("https://dev.paka-ai.com/update-phone-number", {
                phoneSid: data.SelectedNumberData.sid,
                webhookUrl: `https://dev.paka-ai.com/voice/${result.data.id}`,
              })
              .then(async (t) => {
                setLoader(false);
                localStorage.removeItem("botIdentity");
                localStorage.removeItem("greeting");
                localStorage.removeItem("yourBusiness");
                localStorage.removeItem("faqs");
              })
              .catch((err) => {
                setLoader(false);
                console.log(err.response, "error");
              });
          });
      });
  };

  console.log(businessFaqs.timeZone, "detail");
  return (
    <div>
      <CustomModal isOpen={show} loader={loader}>
        <div className=" bg-white h-fit mx-3 md:w1/3  lg:w-1/2 flex justify-center rounded-md mt-32 lg:mt-16 ">
          {loader ? (
            <div className=" flex flex-col items-center mx-32 py-10">
              <RotatingLines
                strokeColor="#FF0066"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
              <p className=" text-primary my-3">Wait a moment....</p>
            </div>
          ) : (
            <div className=" flex flex-col items-center px-20 py-10">
              <p className="  text-appgray text-center">
                You’ve successfully created a bot for{" "}
                <span className=" text-primary font-semibold">
                  {yourBusinessData.businessName}
                </span>
                , try it now:
              </p>
              <div className=" flex items-center">
                <p className=" text-primary font-semibold py-6">
                  {buyedPhoneNumber}
                </p>
                <IoIosCopy className=" mx-2 text-appgray" />
              </div>
              <button
                onClick={() => {
                  setShow(false);
                  navigate("/bots");
                }}
                className=" transition-all h-fit duration-300 ease-in-out hover:bg-secoundry hover:border-secoundry bg-primary py-2 px-8 rounded-md mx-3 text-white"
              >
                Done, Take me to the Bot
              </button>
            </div>
          )}
        </div>
      </CustomModal>
      <ToastContainer />
      <div className=" hidden lg:block w-11/12 xl:w-4/6  mt-12 ">
        {process.map((item, index) => (
          <div key={index} className=" my-5">
            <SumaryHeading
              title={item.title}
              onClick={(r) => {
                handleState(index);
              }}
            />

            <div>
              {item.title === "Bot Identity" && (
                <div>
                  {item.state ? (
                    <div className=" my-3 text-sm py-3 w-1/2">
                      <ShowInputs title="Bot Name" data={botIdentity.botName} />
                      <ShowDropDown
                        title="Language"
                        data={botIdentity.botLanguage}
                        className=" mt-8"
                      />

                      <ShowDropDown
                        title="Voice Type"
                        data={botIdentity.botVoice}
                        className=" mt-8"
                      />
                      <div className=" mt-8">
                        <CustomSlider
                          disabled={true}
                          range={botIdentity.voiceSpeed}
                          title="Speed"
                          min={0.25}
                          max={4.0}
                        />
                        {/* <RangeSelector
                          disabled={true}
                          range={botIdentity.voiceSpeed}
                          title="Speed"
                        /> */}
                      </div>
                      <div className=" mt-8">
                        <CustomSlider
                          disabled={true}
                          range={botIdentity.voicePitch}
                          title="Pitch"
                          min={-20}
                          max={20}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className=" flex justify-between my-3 ">
                        <p className=" text-sm text-primary">
                          Bot name : {botIdentity.botName}
                        </p>
                        <p className=" text-sm text-primary">
                          Language : {botIdentity.botLanguage}
                        </p>
                        <p className=" text-sm text-primary">
                          Voice Type : {botIdentity.botVoice}
                        </p>
                        <p className=" text-sm text-primary">
                          Speed : {botIdentity.voiceSpeed}.0
                        </p>
                        <p className=" text-sm text-primary">
                          Pitch : {botIdentity.voicePitch}.0
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {item.title === "Bot Greetings" && (
                <div>
                  {item.state ? (
                    <div className=" my-3 text-sm py-3 w-1/2">
                      {botGreeting?.botGreetings?.map((item, index) => (
                        <div key={index} className=" my-5">
                          <ShowInputs
                            title={`Greetings ${index + 1}`}
                            data={item.greetText}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className=" my-3">
                      <p className=" text-sm text-primary">
                        Number of Greetings : {botGreeting.botGreetings.length}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {item.title === "Your Business" && (
                <div>
                  {item.state ? (
                    <div className="my-3 text-sm py-3 w-9/12">
                      <ShowInputs
                        title="Business Name"
                        data={yourBusinessData.businessName}
                      />
                      <DescriptionInput
                        title="Business Description"
                        className=" mt-8"
                        value={yourBusinessData.businessDesc}
                        readOnly={true}
                      />

                      <div className=" ml-4 mt-8 ">
                        {yourBusinessData.totalBranches.map((item, index) => (
                          <div key={index}>
                            <ShowInputs
                              title="Branch Name"
                              className=" mt-8"
                              data={item.branchName}
                            />
                            <DescriptionInput
                              title="Branch Description"
                              className=" mt-8"
                              value={item.description}
                              readOnly={true}
                            />

                            <ShowContact
                              title="Contact"
                              className=" mt-8"
                              code={item.countryCode}
                              data={item.contact}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className=" flex justify-between my-3 ">
                        <p className=" text-sm text-primary">
                          Business name : {yourBusinessData.businessName}
                        </p>
                        <p className=" text-sm text-primary">
                          Business Description :{" "}
                          {smallString(yourBusinessData.businessDesc, 20)}
                        </p>
                        <p className=" text-sm text-primary">
                          Business Branches :{" "}
                          {yourBusinessData.totalBranches?.length}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {item.title === "Business FAQs" && (
                <div>
                  {item.state ? (
                    <div className=" my-3 text-sm pt-8">
                      <div className=" flex justify-between items-center">
                        <h3 className=" text-primary font-semibold">
                          Working Hours
                        </h3>
                        <div className="  lg:w-1/3">
                          <ShowDropDown data={businessFaqs.timeZone.label} />
                        </div>
                      </div>
                      <div className=" flex items-center xl:w-1/4 mt-5">
                        <Toggle onChange={() => {}} active={true} />
                        <p className=" text-sm text-primary mx-4">Open 24/7</p>
                      </div>
                      {businessFaqs.totalworkingHours.map((item, index) => (
                        <div key={index}>
                          <ShowBusinessFAQs
                            title={item.day}
                            options={item.workingTime}
                            toggleStatus={item.active}
                          />
                        </div>
                      ))}
                      <div className=" xl:w-9/12">
                        <h2 className=" text-primary text-xl ">
                          Add your Business FAQs
                        </h2>
                        {businessFaqs.businessFAQ?.map((item, index) => (
                          <div key={index} className=" relative">
                            <div className=" mt-10 ml-6">
                              <ShowInputs
                                title="Question"
                                data={item.question}
                              />
                            </div>
                            <div className=" mt-5 ml-6">
                              <ShowInputs data={item.answer} title="Answer" />
                            </div>
                            {index > 0 && (
                              <FaTrashAlt className=" absolute -right-6 cursor-pointer hover:text-red-600 top-5 text-appgray" />
                            )}
                          </div>
                        ))}
                        <div className="bg-primary ml-6 cursor-pointer h-5 w-5 flex items-center justify-center rounded-full mt-2">
                          <MdAdd className="  text-white text-xl " />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className=" w-1/2
                  "
                    >
                      <div className=" flex justify-between my-3 ">
                        <p className=" text-sm text-primary">
                          Working Hours : {businessFaqs.workingDaysData?.length}
                        </p>

                        <p className=" text-sm text-primary">
                          Total FAQs: {businessFaqs.businessFAQ?.length}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <div className=" flex my-9  mt-40">
          <span
            onClick={() => {
              preViewBot();
              // checkAUdio();
            }}
            className=" flex items-center bg-primary  px-4 rounded-md mx-3"
          >
            {previewLoader ? (
              <MusicPlay />
            ) : (
              <div className=" flex items-center h-[1rem] cursor-pointer">
                <img
                  alt="preview"
                  className=" h-5 w-5 "
                  src={require("../../assets/images/preview.png")}
                />
                <p className=" text-white mx-2">Preview</p>
              </div>
            )}
          </span>
          <button
            onClick={() => {
              storeBotDetails();
            }}
            className=" transition-all duration-300 ease-in-out hover:bg-secoundry hover:border-secoundry bg-primary py-2 px-8 rounded-md mx-3 text-white"
          >
            Done
          </button>
        </div>
      </div>
      <div className=" lg:hidden pt-6">
        <div>
          {process.map((item, index) => (
            <div key={index} className=" my-4">
              <p className=" font-semibold text-xl">{item.title}</p>
              {item.title === "Bot Identity" && (
                <div>
                  <div>
                    <MobileVersionShowData
                      title="Bot Name"
                      data={botIdentity.botName}
                    >
                      <div className=" w-11/12 md:w-9/12">
                        <ShowInputs
                          title="Bot Name"
                          data={botIdentity.botName}
                          className=" my-5"
                        />
                      </div>
                    </MobileVersionShowData>
                    <MobileVersionShowData
                      title="Language"
                      data={botIdentity.botLanguage}
                    >
                      <div className=" w-11/12 md:w-9/12">
                        <ShowDropDown
                          title="Language"
                          data={botIdentity.botLanguage}
                          className=" my-5"
                        />
                      </div>
                    </MobileVersionShowData>
                    <MobileVersionShowData
                      title="Voice Type"
                      data={botIdentity.botVoice}
                    >
                      <div className=" w-11/12 md:w-9/12">
                        <ShowDropDown
                          title="Voice Type"
                          data={botIdentity.botVoice}
                          className=" my-5"
                        />
                      </div>
                    </MobileVersionShowData>
                    <MobileVersionShowData
                      title="Speed"
                      data={botIdentity.voiceSpeed}
                    >
                      <div className=" w-11/12 md:w-9/12">
                        <RangeSelector
                          disabled={true}
                          range={botIdentity.voiceSpeed}
                          title="Speed"
                        />
                      </div>
                    </MobileVersionShowData>
                    <MobileVersionShowData
                      title="Pitch"
                      data={botIdentity.voicePitch}
                    >
                      <div className=" w-11/12 md:w-9/12">
                        <RangeSelector
                          disabled={true}
                          range={botIdentity.voicePitch}
                          title="Pitch"
                        />
                      </div>
                    </MobileVersionShowData>
                  </div>
                </div>
              )}
              {item.title === "Bot Greetings" && (
                <div>
                  <div>
                    <MobileVersionShowData
                      title="Number of Greetings"
                      data={botGreeting.botGreetings.length}
                    >
                      <div className=" w-11/12 md:w-9/12">
                        {botGreeting?.botGreetings?.map((item, index) => (
                          <div key={index} className=" mt-5">
                            <ShowInputs
                              title={`Greetings ${index + 1}`}
                              data={item.greetText}
                            />
                          </div>
                        ))}
                      </div>
                    </MobileVersionShowData>
                  </div>
                </div>
              )}
              {item.title === "Your Business" && (
                <div>
                  <div>
                    <MobileVersionShowData
                      title="Business Name"
                      data={yourBusinessData.businessName}
                    >
                      <div className=" w-11/12 md:w-9/12">
                        <ShowInputs
                          title="Business Name"
                          data={yourBusinessData.businessName}
                          className=" my-5"
                        />
                      </div>
                    </MobileVersionShowData>
                    <MobileVersionShowData
                      title="Description"
                      data={smallString(yourBusinessData.businessDesc, 20)}
                    >
                      <div className=" w-11/12 md:w-9/12">
                        <ShowInputs
                          title="Description"
                          data={smallString(yourBusinessData.businessDesc, 20)}
                          className=" my-5"
                        />
                      </div>
                    </MobileVersionShowData>
                    <MobileVersionShowData
                      title="Business Branches"
                      data={yourBusinessData.totalBranches?.length}
                    >
                      <div className=" w-11/12 md:w-9/12">
                        {yourBusinessData.totalBranches.map((item, index) => (
                          <div key={index}>
                            <ShowInputs
                              title="Branch Name"
                              className=" mt-8"
                              data={item.branchName}
                            />
                            <ShowInputs
                              title="Branch Description"
                              className=" mt-8"
                              data={item.description}
                            />
                            <ShowContact
                              title="Contact"
                              className=" mt-8"
                              code={item.countryCode}
                              data={item.contact}
                            />
                          </div>
                        ))}
                      </div>
                    </MobileVersionShowData>
                  </div>
                </div>
              )}
              {item.title === "Business FAQs" && (
                <div>
                  <div>
                    <MobileVersionShowData
                      title="Working Hours"
                      data={businessFaqs.workingDaysData?.length}
                    >
                      <div className=" w-11/12 md:w-9/12">
                        <div className=" flex justify-between items-center">
                          <h3 className=" text-primary font-semibold">
                            Working Hours
                          </h3>
                          <div className="  lg:w-1/4">
                            <ShowDropDown data={businessFaqs.timeZone.label} />
                          </div>
                        </div>
                        <div className=" flex items-center xl:w-1/4 mt-5">
                          <Toggle onChange={() => {}} active={true} />
                          <p className=" text-sm text-primary mx-4">
                            Open 24/7
                          </p>
                        </div>
                        {businessFaqs.totalworkingHours.map((item, index) => (
                          <div key={index}>
                            <ShowBusinessFAQs
                              title={item.day}
                              options={item.workingTime}
                              toggleStatus={item.active}
                            />
                          </div>
                        ))}
                      </div>
                    </MobileVersionShowData>
                    <MobileVersionShowData
                      title="Business FAQs"
                      data={businessFaqs.businessFAQ?.length}
                    >
                      <div className=" w-11/12 md:w-9/12">
                        <div className=" pt-6">
                          <h2 className=" text-primary text-xl ">
                            Add your Business FAQs
                          </h2>
                          {businessFaqs.businessFAQ?.map((item, index) => (
                            <div key={index} className=" relative">
                              <div className=" mt-5 ml-6">
                                <ShowInputs
                                  title="Question"
                                  data={item.question}
                                />
                              </div>
                              <div className=" mt-5 ml-6">
                                <ShowInputs data={item.answer} title="Answer" />
                              </div>
                              {index > 0 && (
                                <FaTrashAlt className=" absolute -right-6 cursor-pointer hover:text-red-600 top-5 text-appgray" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </MobileVersionShowData>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className=" flex my-9  mt-40">
          <span
            onClick={() => {
              preViewBot();
            }}
            className=" flex items-center bg-primary py-2 px-4 rounded-md mx-3"
          >
            {previewLoader ? (
              <MusicPlay />
            ) : (
              <>
                <img
                  alt="preview"
                  className=" h-5 w-5"
                  src={require("../../assets/images/preview.png")}
                />
                <p className=" text-white mx-2">Preview</p>
              </>
            )}
          </span>
          <button
            onClick={() => {
              storeBotDetails();
            }}
            className=" transition-all duration-300 ease-in-out hover:bg-secoundry hover:border-secoundry bg-primary py-2 px-8 rounded-md mx-3 text-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotSummary;
