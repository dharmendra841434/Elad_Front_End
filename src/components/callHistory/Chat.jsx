import React, { useState, useEffect } from "react";
import { BsFillInfoCircleFill, BsPauseCircleFill } from "react-icons/bs";
import Msg from "./Msg";
import { MdArrowBackIosNew } from "react-icons/md";
import ThreeDots from "./ThreeDots";
import { BsPlayCircleFill } from "react-icons/bs";
import axios from "axios";
import { setDeleteCall, setDeleteLoader } from "../../redux/CallSlice";
import { useDispatch } from "react-redux";

const Chat = (props) => {
  const { phoneNoId, setShow, callsData } = props;
  const [isShown, setIsShown] = useState(false);
  const detailsHandler = (event) => {
    setIsShown((current) => !current);
  };
  const clickHandler = (event) => {
    setShow((current) => !current);
  };
  const dispatch = useDispatch();
  const selectedCallData = callsData.filter((call) => call._id === phoneNoId);

  // below thigs are for audio formet well before production
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioUrl = `https://dev.paka-ai.com/${selectedCallData[0]?.recordingURL}`;

  useEffect(() => {
    const audioElement = new Audio(audioUrl);
    audioElement.addEventListener("loadedmetadata", () => {
      const durationInSeconds = audioElement.duration;
      setTotalDuration(Math.floor(durationInSeconds));
    });

    return () => {
      audioElement.removeEventListener("loadedmetadata", () => {});
    };
  }, [phoneNoId]);

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);

    const formattedDuration = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedDuration;
  };

  const secToMinAndSec = (seconds) => {
    //let seconds = Math.floor(second);
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let formattedMinutes = ("0" + minutes).slice(-2);
    let formattedSeconds = ("0" + remainingSeconds).slice(-2);
    return formattedMinutes + " Min " + formattedSeconds + " Sec";
  };

  const handlePlayPause = () => {
    const audioElement = document.querySelector("audio");
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleProgress = () => {
    const audioElement = document.querySelector("audio");
    const duration = audioElement.duration;
    const currentTime = audioElement.currentTime;
    setCurrentDuration(currentTime);
    setProgress((currentTime / duration) * 100);
  };

  // const handleProgressBarClick = (e) => {
  //   const progressBarWidth = e.target.clientWidth;
  //   const clickPositionX = e.nativeEvent.offsetX;
  //   const clickPercentage = (clickPositionX / progressBarWidth) * 100;
  //   const newCurrentDuration = (clickPercentage / 100) * totalDuration;
  //   setCurrentDuration(newCurrentDuration);

  //   const audioElement = document.querySelector("audio");
  //   audioElement.currentTime = newCurrentDuration;
  // };

  // for download audio
  const handleDownload = () => {
    axios
      .get(audioUrl, { responseType: "blob" })
      .then((response) => {
        // Create a temporary URL object
        const url = window.URL.createObjectURL(response.data);

        // Create a temporary <a> element to initiate the download
        const link = document.createElement("a");
        link.href = url;
        link.download = "callRecording.mp3";

        // Simulate a click event on the <a> element to trigger the download
        link.click();

        // Cleanup by revoking the temporary URL object
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error occurred while downloading the audio:", error);
      });
  };

  // API calling for delete the selected call chat and linked message center data
  const deleteSelectedCallData = async (selectedNumber) => {
    dispatch(setDeleteLoader(true));
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/delete_call_history`, {
        call_history_id: selectedNumber,
      })
      .then((response) => {
        console.log(response, "delete call chat response");
        dispatch(setDeleteCall((current) => !current));
        dispatch(setDeleteLoader(false));
      })
      .catch((error) => {
        console.log(error, "Some error in deleting the call chat");
        dispatch(setDeleteLoader(false));
      });
  };

  return (
    <>
      <div className="hidden md:block relative h-full">
        <div className="bg-[#FF0066] text-white flex justify-between h-[66px] w-full">
          <div className="ml-[33px]">
            <p className="text-[16px] mt-[16px] font-medium">
              {selectedCallData[0]?.callerPhoneNumber}
            </p>
            <p className="text-[11px] mb-[10px] font-normal">
              duration {secToMinAndSec(totalDuration)}
            </p>
          </div>
          <div className="flex items-center mr-[2%] gap-2">
            <BsFillInfoCircleFill
              onClick={detailsHandler}
              className="text-2xl cursor-pointer"
            />
            <ThreeDots
              onDelete={() => {
                deleteSelectedCallData(phoneNoId);
              }}
              onDownloadMp3={() => {
                handleDownload();
              }}
            />
          </div>
        </div>
        {/* in pixcle  h-[577px]    */}
        <div className="flex h-[58.5vh] overflow-x-hidden overflow-y-auto bg-white">
          <div className="w-full">
            <Msg messages={selectedCallData[0]?.messages} setShow={isShown} />
          </div>
          <div className={isShown ? "block" : "hidden"}>
            {/* <Details detailsData={callsData} dselectedCallData[0] /> */}
            <div className="hidden md:block p-[8%] border border-t-0 rounded-b-sm text-sm">
              <div className="">
                <h4 className="text-lg font-medium mb-1">Details</h4>
                <p className="text-[#7F7F7F]">Phone Number</p>
                <p className="text-[#2E2E2E] mb-1">
                  {selectedCallData[0]?.callerPhoneNumber}
                </p>
                <label htmlFor="call" className="text-[#7F7F7F]">
                  Caller's Name
                </label>
                <input
                  className="border rounded-lg p-1 mb-2"
                  id="call"
                  name="call"
                  placeholder="eg. Jone Deo"
                />
                <br />
                <p className="text-[#7F7F7F]">Bot Name</p>
                <p className="text-[#2E2E2E] mb-2">
                  {selectedCallData[0]?.botName}
                </p>
                <p className="text-[#7F7F7F]">Bot Phone Number</p>
                <p className="text-[#2E2E2E]">
                  {selectedCallData[0]?.botPhoneNumber}
                </p>
                <br />
              </div>

              <div className="text-[11px]">
                <h4 className="text-lg font-medium mb-1">Caller Statistics</h4>
                <p className="text-[#7F7F7F] ">Call Duration</p>
                <p className="text-[#2E2E2E] mb-1">
                  {formatDuration(totalDuration)}
                </p>
                <p className="text-[#7F7F7F]">Total Calls</p>
                <p className="text-[#2E2E2E] mb-1">
                  {selectedCallData[0]?.frequency}
                </p>
                <p className="text-[#7F7F7F]">Date</p>
                <p className="text-[#2E2E2E]">{selectedCallData[0]?.date}</p>
                <br />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-1">Add Note</h4>
                <label className="text-[#7F7F7F]" htmlFor="cal">
                  Add Note
                </label>
                <br />
                <input
                  className="border rounded-lg p-1 mr-6"
                  id="cal"
                  name="cal"
                  placeholder="eg. This was amazing caller"
                />
              </div>
            </div>
          </div>
        </div>
        {/* paly audio type */}
        <div className="h-[49px] absolute bottom-0 w-full max-w-full">
          <div className="bg-primary text-white h-[49px] rounded-b-xl md:rounded-none align-middle">
            <div className="flex justify-between gap-5 px-10">
              <div className="" onClick={handlePlayPause}>
                <BsPauseCircleFill
                  className={
                    isPlaying
                      ? `text-xl inline mt-[15px] cursor-pointer `
                      : `hidden`
                  }
                />
                <BsPlayCircleFill
                  className={
                    isPlaying
                      ? `hidden`
                      : `text-xl inline mt-[15px] cursor-pointer`
                  }
                />
              </div>
              <div className="relative grow mr-3">
                <div
                  className="bg-white mx-4 mt-[1.28rem] w-full h-1"
                  //onClick={handleProgressBarClick}
                >
                  <div
                    className="h-full bg-gray-400 "
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                {/* <hr className="mx-4 mt-6" /> */}
              </div>
              <div className="inline text-[11px] mt-[15px] font-normal w-[7rem]">
                {formatDuration(currentDuration)} /{" "}
                {formatDuration(totalDuration)}
              </div>
              <audio src={audioUrl} onTimeUpdate={handleProgress} />
            </div>
          </div>
        </div>
      </div>

      {/* for mobile or small screens */}
      <div className="md:hidden">
        <div className="ml-[5%] mr-[3%] mt-[2%]">
          <div className="bg-[#FF0066] text-white flex justify-between p-2 rounded-t-xl">
            <div className="flex grow items-start gap-1">
              <div className="text-2xl">
                <MdArrowBackIosNew
                  onClick={clickHandler}
                  className="align-middle cursor-pointer"
                />
              </div>
              <div className="ml-[2%]">
                <p className="font-medium text-[13px]">
                  {selectedCallData[0]?.callerPhoneNumber}
                </p>
                <p className="text-[9px] m">
                  duration {secToMinAndSec(totalDuration)}
                </p>
              </div>
            </div>
            <div className="flex items-center mr-[2%] gap-2">
              <BsFillInfoCircleFill
                onClick={detailsHandler}
                className="text-2xl cursor-pointer"
              />
              <ThreeDots
                onDelete={() => {
                  deleteSelectedCallData(phoneNoId);
                }}
                onDownloadMp3={() => {
                  handleDownload();
                }}
              />
            </div>
          </div>

          {/* for show message or message details */}
          {isShown ? (
            <div>
              <div className="md:hidden p-[8%] border border-t-0 rounded-b-xl text-sm">
                <div className="">
                  <div className="flex gap-2 -ml-4 ">
                    <p
                      onClick={() => {
                        setIsShown(false);
                      }}
                      className="text-lg font-xl scale-125 text-primary cursor-pointer"
                    >
                      &lt;
                    </p>
                    <h4 className="text-lg font-semibold mb-1">Details</h4>
                  </div>

                  <p className="text-[#7F7F7F]">Phone Number</p>
                  <p className="text-[#2E2E2E] mb-1">
                    {selectedCallData[0]?.callerPhoneNumber}
                  </p>
                  <label htmlFor="call" className="text-[#7F7F7F]">
                    Caller's Name
                  </label>
                  <br />
                  <input
                    className="border rounded-lg p-1 mb-2"
                    id="call"
                    name="call"
                    placeholder="eg. Jone Deo"
                  />
                  <br />
                  <p className="text-[#7F7F7F]">Bot Name</p>
                  <p className="text-[#2E2E2E] mb-2">
                    {selectedCallData[0]?.botName}
                  </p>
                  <p className="text-[#7F7F7F]">Bot Phone Number</p>
                  <p className="text-[#2E2E2E]">
                    {selectedCallData[0]?.botPhoneNumber}
                  </p>
                  <br />
                </div>

                <div className="text-[11px]">
                  <h4 className="text-lg font-medium mb-1">
                    Caller Statistics
                  </h4>
                  <p className="text-[#7F7F7F] ">Call Duration</p>
                  <p className="text-[#2E2E2E] mb-1">
                    {formatDuration(totalDuration)}
                  </p>
                  <p className="text-[#7F7F7F]">Total Calls</p>
                  <p className="text-[#2E2E2E] mb-1">
                    {selectedCallData[0]?.frequency}
                  </p>
                  <p className="text-[#7F7F7F]">Date</p>
                  <p className="text-[#2E2E2E]">{selectedCallData[0]?.date}</p>
                  <br />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Add Note</h4>
                  <label className="text-[#7F7F7F]" htmlFor="cal">
                    Add Note
                  </label>
                  <br />
                  <input
                    className="border rounded-lg p-1"
                    id="cal"
                    name="cal"
                    placeholder="eg. This was amazing caller"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-hidden overflow-y-scroll h-[73vh] border">
              <Msg messages={selectedCallData[0]?.messages} />
            </div>
          )}

          {isShown ? (
            <div></div>
          ) : (
            <div className="h-[42px] rounded-b-lg">
              <div className="bg-primary text-white h-[49px] rounded-b-xl md:rounded-none align-middle">
                <div className="flex justify-between gap-5 px-10">
                  <div className="" onClick={handlePlayPause}>
                    <BsPauseCircleFill
                      className={
                        isPlaying
                          ? `text-xl inline mt-[15px] cursor-pointer`
                          : `hidden`
                      }
                    />
                    <BsPlayCircleFill
                      className={
                        isPlaying
                          ? `hidden`
                          : `text-xl inline mt-[15px] cursor-pointer`
                      }
                    />
                  </div>
                  <div className="relative grow mr-3">
                    <div
                      className="bg-white mx-4 mt-[1.27rem] w-full h-1"
                      // onClick={handleProgressBarClick}
                    >
                      <div
                        className="h-full bg-gray-400 "
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    {/* <hr className="mx-4 mt-6" /> */}
                  </div>
                  <div className="inline text-[11px] mt-[15px] font-normal w-[3.2rem]">
                    {/* {formatDuration(currentDuration)} /{" "} */}{" "}
                    {formatDuration(totalDuration)}
                  </div>
                  <audio src={audioUrl} onTimeUpdate={handleProgress} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
