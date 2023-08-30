import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import BlurAnimation from "../../components/BlurAnimation";
import axios from "axios";
import { API_URL } from "../../utils/helper/API_URL";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import CircularLoader from "../../components/CircularLoader";
import PasswordInput from "../../components/PasswordInput";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [emailValidation, setEmailValidation] = useState(true);
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const EmailOtp = async () => {
    const OTP = Math.floor(Math.random() * 10000);
    const msg = "Your OTP for verification is " + OTP;
    var templateParams = {
      to_Name: ``,
      name: "PakaAI",
      to_Email: email,
      message: msg,
    };
    emailjs.init("user_o1rDQKPWkdXku4D6nc3GM");
    await emailjs
      .send("service_vbqf53h", "template_hmowo9s", templateParams)
      .then((res) => {
        setLoader(false);
        setEmailValidation(false);
        localStorage.setItem("otp", OTP);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
        alert("invalid email");
      });
    //console.log(templateParams, "send email");
  };

  const checkEmail = async () => {
    setLoader(true);
    await axios
      .post(`${API_URL.AUTH_URL}/check-email`, { email: email })
      .then((res) => {
        //console.log(res.data);
        // setCheckEmail(res.data.message);
        if (res.data.message === "email already exist") {
          EmailOtp();
        }
        if (res.data.message !== "email already exist") {
          toast.warn("Email does not exist", {
            theme: "colored",
            position: "top-center",
            autoClose: 3000,
            progress: false,
            hideProgressBar: true,
          });
          setLoader(false);
        }
      });
  };

  const resetPassword = async () => {
    let otp = localStorage.getItem("otp");

    console.log(otp, "otp");

    if (otpCode !== otp) {
      toast.error("Wrong Otp!!", {
        theme: "colored",
        position: "top-center",
        autoClose: 3000,
        progress: false,
        hideProgressBar: true,
      });
      return;
    }

    if (pass1 === "" || pass2 === "" || pass1 !== pass2) {
      toast.warn("Password not Matched!!", {
        theme: "colored",
        position: "top-center",
        autoClose: 3000,
        progress: false,
        hideProgressBar: true,
      });
      return;
    }
    setLoader(true);
    await axios
      .post(`${API_URL.AUTH_URL}/resetPassword`, {
        email: email,
        password: pass1,
      })
      .then((res) => {
        console.log(res.data);
        setLoader(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };
  return (
    <div className=" relative bg-primary min-h-screen">
      <BlurAnimation />
      <ToastContainer />
      <div className=" flex items-center justify-between px-8 xl:px-12 py-3">
        <div className=" flex items-center">
          <img
            className=" h-8 w-28"
            alt="logo"
            src={require("../../assets/images/Logo1.png")}
          />
        </div>
        <div className=" hidden lg:block">
          <div className=" flex items-center">
            <h3 className=" text-white">Don’t have an account yet? </h3>
            <button
              onClick={() => navigate("/register")}
              className=" bg-secoundry text-white px-2 py-1 ml-2 rounded-md cursor-pointer"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
      {emailValidation ? (
        <div className=" px-7 md:px-36 flex flex-col items-center pt-10">
          <h1 className=" font-bold text-white text-2xl mb-3">
            Reset Password
          </h1>
          <CustomInput
            title="Email Address"
            className="  lg:w-1/2 xl:w-1/3 mt-8"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span className=" text-sm text-white  lg:w-1/2 xl:w-1/3 text-center mt-8">
            You’ll receive a mail on the indicated address. Please check your
            email inbox and reset your password there.
          </span>
          <button
            onClick={() => checkEmail()}
            className={`${
              loader
                ? "w-16 h-16 rounded-full"
                : "w-full  lg:w-1/2 xl:w-1/3 rounded-md"
            } bg-secoundry transition-all flex items-center justify-center ease-in-out duration-500 hover:bg-pink-600 font-semibold py-3 mt-5 text-white `}
          >
            {loader ? <CircularLoader /> : " Send"}
          </button>
          <span className=" text-sm text-white  lg:w-1/2 xl:w-1/3 text-center mt-4">
            Don’t have an Account?
          </span>
          <span
            onClick={() => navigate("/register")}
            className=" text-sm text-secoundry cursor-pointer w-full  lg:w-1/2 xl:w-1/3 text-center mt-4"
          >
            Register Now!
          </span>
        </div>
      ) : (
        <div className=" px-7 md:px-36 flex flex-col items-center pt-10">
          <h1 className=" font-bold text-white text-2xl mb-3">
            Set new Password
          </h1>
          <CustomInput
            title="Confirmation code"
            className="  lg:w-1/2 xl:w-1/3 mt-8"
            placeholder="Enter your confirmation code"
            onChange={(e) => setOtpCode(e.target.value)}
            value={otpCode}
          />
          <PasswordInput
            title="New Password"
            className="  lg:w-1/2 xl:w-1/3 mt-4"
            placeholder="Enter your new password"
            onChange={(e) => setPass1(e.target.value)}
            value={pass1}
          />
          <PasswordInput
            title="Confirm New Password"
            className="  lg:w-1/2 xl:w-1/3 mt-4"
            placeholder="Re-Enter your new password"
            onChange={(e) => setPass2(e.target.value)}
            value={pass2}
          />
          <button
            onClick={() => resetPassword()}
            className={`${
              loader
                ? "w-16 h-16 rounded-full"
                : "w-full  lg:w-1/2 xl:w-1/3 rounded-md"
            } bg-secoundry transition-all flex items-center justify-center ease-in-out duration-500 hover:bg-pink-600 font-semibold py-3 mt-5 text-white `}
          >
            {loader ? <CircularLoader /> : " Done"}
          </button>
          <span className=" text-sm text-white  lg:w-1/2 xl:w-1/3 text-center mt-4">
            Don’t have an Account?
          </span>
          <span
            onClick={() => navigate("/register")}
            className=" text-sm text-secoundry cursor-pointer w-full  lg:w-1/2 xl:w-1/3 text-center mt-4"
          >
            Register Now!
          </span>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
