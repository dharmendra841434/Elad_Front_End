import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "../../components/OtpInput";
import BlurAnimation from "../../components/BlurAnimation";
import axios from "axios";
import CircularLoader from "../../components/CircularLoader";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/AppSlice";

const Otp = () => {
  const navigate = useNavigate();
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");
  const [otpStatus, setOtpStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const userData = JSON.parse(localStorage.getItem("regData"));
  const dispatch = useDispatch();

  const verifyOtp = async () => {
    setLoading(true);
    let otp = `${pin1}${pin2}${pin3}${pin4}`;
    if (userData.otp === Number(otp)) {
      await axios
        .post(`${process.env.REACT_APP_AUTH_URL}/register`, {
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          password: userData.password,
          phone: 0,
          country: "",
          address: {
            city: "",
            street: "",
            zipcode: 0,
          },
          timeZone: {
            value: "Etc/GMT",
            label: "(GMT+0:00) UTC",
            offset: 0,
            abbrev: "GMT",
            altName: "British Standard Time",
          },
          businessInfo: {
            businessName: "",
            businessEmail: "",
            vatID: "",
            fullAdress: "",
          },
        })
        .then(async (res) => {
          setOtpStatus(false);
          localStorage.clear();
          setLoading(false);
          localStorage.setItem("token", res.data.accessToken);
          await axios
            .post(`${process.env.REACT_APP_AUTH_URL}/get-user-data`, {
              email: userData.email,
            })
            .then((result) => {
              dispatch(setUserData(result.data.user));
              localStorage.setItem("userEmail", result.data.user.email);
              toast.success("Signup Successfully", {
                theme: "colored",
                position: "top-center",
                autoClose: 3000,
                progress: false,
                hideProgressBar: true,
                style: { backgroundColor: "green" },
              });
              setTimeout(() => {
                navigate("/create-bot");
              }, 2000);
            });
        });
    } else {
      setOtpStatus(true);
      setLoading(false);
    }
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
              className=" bg-secoundry text-white   ml-2 rounded-md cursor-pointer"
            >
              <p className=" py-1 px-2"> Signup</p>
            </button>
          </div>
        </div>
      </div>
      <div className=" flex flex-col items-center pt-20">
        <h2 className=" text-2xl text-white font-bold">Verify your email</h2>
        <div className=" flex flex-col items-center py-4 lg:w-1/2 xl:w-1/3">
          <span className=" text-white">
            We’ve sent a code to{" "}
            <span className=" text-secoundry">{userData?.email}</span>
          </span>
          <p className=" text-white"> Please Enter the Code Below</p>
        </div>
        <div className=" px-4 md:w-1/2 lg:w-1/4 mt-5">
          <OtpInput
            setPin1={setPin1}
            setPin2={setPin2}
            setPin3={setPin3}
            setPin4={setPin4}
            SetStatus={setOtpStatus}
          />
        </div>
        {otpStatus && <p className=" text-sm text-red-500 mt-7">Wrong OTP </p>}
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
              loading ? " w-16 h-16 rounded-full " : " w-1/4 rounded-md"
            } bg-secoundry transition-all flex justify-center items-center ease-in-out duration-500 hover:bg-pink-600 font-semibold    py-3 mt-5 text-white `}
          >
            {loading ? <CircularLoader /> : "Next"}
          </button>
        </div>
        <button
          onClick={() => {
            navigate("/register");
          }}
          className=" text-appgray my-4"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Otp;
