import React, { useState } from "react";
import CustomInput from "../CustomInput";
import CircularLoader from "../CircularLoader";
import OtpInput from "../OtpInput";
import { CgClose } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { HiChevronLeft } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../redux/AppSlice";

const ChangeEmail = ({ setChangeEmailPopup, userDetails }) => {
  const [otpPage, setOtpPage] = useState(false);
  const [email, setEmail] = useState("");
  const [otpVerification, setOtpVerification] = useState("");
  const [sameEmailError, setSameEmailError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [verificationLoader, setVerificationLoader] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const EmailOtp = async () => {
    if (userDetails?.email === email) {
      setSameEmailError(true);
      return;
    }
    setLoader(true);
    const OTP = Math.floor(Math.random() * 10000);
    const msg = "Your OTP for verification is " + OTP;
    var templateParams = {
      to_Name: `${userDetails?.fullname}`,
      name: "PakaAI",
      to_Email: email,
      message: msg,
    };
    emailjs.init("user_o1rDQKPWkdXku4D6nc3GM");
    await emailjs
      .send("service_vbqf53h", "template_hmowo9s", templateParams)
      .then((res) => {
        toast.success("Otp sent to your Email", {
          theme: "colored",
          autoClose: 1000,
          progress: false,
          hideProgressBar: true,
          style: { backgroundColor: "green" },
        });
        setOtpVerification(OTP);
        setLoader(false);
        setOtpPage(true);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
        toast.error("Something went wrong!!", {
          theme: "colored",
          autoClose: 1000,
          progress: false,
          hideProgressBar: true,
          style: { backgroundColor: "red" },
        });
      });
    //console.log(templateParams, "send email");
  };
  const verifyOtp = async () => {
    setVerificationLoader(true);
    let otp = `${pin1}${pin2}${pin3}${pin4}`;
    if (otpVerification === Number(otp)) {
      await axios
        .post(`${process.env.REACT_APP_AUTH_URL}/change-email`, {
          email: userDetails.email,
          newEmail: email,
        })
        .then(async (result) => {
          console.log(result.data, "this is sucess");
          await axios
            .post(`${process.env.REACT_APP_AUTH_URL}/get-user-data`, {
              email: email,
            })
            .then(async (res) => {
              dispatch(setUserData(res.data.user));
              setVerificationLoader(false);
              toast.success("SuccessFully Email Changed ", {
                theme: "colored",
                autoClose: 1000,
                progress: false,
                hideProgressBar: true,
                style: { backgroundColor: "green" },
              });
              setTimeout(() => {
                setChangeEmailPopup(false);
                navigator("/settings");
              }, 2000);
            });
        })
        .catch((error) => {
          console.log(error, "this is error");
          setVerificationLoader(false);
          toast.error(error.response.data.message, {
            theme: "colored",
            autoClose: 1000,
            progress: false,
            hideProgressBar: true,
            style: { backgroundColor: "red" },
          });
        });
    } else {
      setVerificationLoader(true);
      setOtpError(true);
    }
  };

  return (
    <div className=" relative bg-primary py-16   w-full h-full lg:h-fit mt-12 md:w-3/5 lg:ml-24 rounded-md lg:py-10 shadow-tableShadow text-white  ">
      <ToastContainer />
      {!otpPage && (
        <p className="flex justify-center  text-xl font-bold">Change Email</p>
      )}
      <div className=" flex justify-center">
        {otpPage ? (
          <div className=" lg:w-11/12 ">
            <div className=" flex flex-col items-center ">
              <h2 className=" text-2xl text-white font-bold">
                Verify your email
              </h2>
              <div className=" flex flex-col items-center py-4 ">
                <span className=" text-white">
                  We’ve sent a code to{" "}
                  <span className=" text-secoundry">{email}</span>
                </span>
                <p className=" text-white"> Please Enter the Code Below</p>
              </div>
              <div className=" px-4 w-1/2  mt-5">
                <OtpInput
                  setPin1={setPin1}
                  setPin2={setPin2}
                  setPin3={setPin3}
                  setPin4={setPin4}
                  SetStatus={setOtpError}
                />
              </div>
              {otpError && (
                <p className=" text-sm text-red-500 mt-7">Wrong OTP </p>
              )}
              <span className=" text-white mt-8 ">
                Haven’t received a code?{" "}
                <span className=" text-secoundry">Send again</span>
              </span>
              <div className="flex justify-center  w-full ">
                <button
                  onClick={() => {
                    verifyOtp();
                  }}
                  className={`${
                    verificationLoader
                      ? " w-16 h-16 rounded-full "
                      : " w-1/2 xl:w-1/4 rounded-md"
                  } bg-secoundry transition-all flex justify-center items-center ease-in-out duration-500 hover:bg-pink-600 font-semibold    py-3 mt-5 text-white `}
                >
                  {verificationLoader ? <CircularLoader /> : "Next"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className=" lg:w-9/12 flex flex-col items-center pt-3 ">
            <p className=" text-[13px] text-appgray w-9/12 text-center">
              You will receive mail at the specified address. Check your inbox
              and verify the new email address.
            </p>
            <div className=" w-9/12 mt-6">
              <CustomInput
                title="Enter a new email address"
                placeholder="lukewram@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setSameEmailError(false)}
              />
            </div>
            {sameEmailError && (
              <p className=" text-red-600 text-[11px]">
                Please try diffrent email
              </p>
            )}
            <button
              onClick={() => {
                EmailOtp();
              }}
              className=" bg-secoundry py-2 px-5 rounded-md text-white mt-8"
            >
              {loader ? "Sending...." : "Send Verification Code"}
            </button>
          </div>
        )}
      </div>
      <CgClose
        onClick={() => setChangeEmailPopup(false)}
        className=" hidden md:block cursor-pointer absolute top-5 right-5 text-white text-2xl"
      />
      <HiChevronLeft
        onClick={() => setChangeEmailPopup(false)}
        className=" md:hidden  cursor-pointer absolute top-10 left-3  text-white text-4xl"
      />
    </div>
  );
};

export default ChangeEmail;
