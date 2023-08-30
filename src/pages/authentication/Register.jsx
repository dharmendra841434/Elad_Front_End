import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import PasswordInput from "../../components/PasswordInput";
import { useFormik } from "formik";
import { registerSchema } from "../../utils/schemas";
import BlurAnimation from "../../components/BlurAnimation";
import CustomCheckBox from "../../components/CustomCheckBox";
import emailjs from "@emailjs/browser";
import CircularLoader from "../../components/CircularLoader";
import axios from "axios";
import { API_URL } from "../../utils/helper/API_URL";
import { ToastContainer, toast } from "react-toastify";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/AppSlice";
import CustomModal from "../../components/CustomModal";
import { Puff } from "react-loader-spinner";

const Register = () => {
  const navigate = useNavigate();
  const [checkbox, setCheckbox] = useState(false);
  const [passwordmatchError, setPasswordmatchError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [googleLoader, setGoogleLoader] = useState(false);
  const [checkEmail, setCheckEmail] = useState("");
  const {
    handleChange,
    handleReset,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormik({
    validationSchema: registerSchema,
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      rePassword: "",
    },
    onSubmit: () => {
      register();
    },
  });

  const dispatch = useDispatch();

  const signIn = useGoogleLogin({
    onSuccess: async (user) => {
      //console.log("Google login successful!", user.access_token);
      setGoogleLoader(true);
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}//google-auth`, {
          token: user.access_token,
        })
        .then(async (googleResp) => {
          // console.log(result);
          if (googleResp.data?.message === "Email Not Exist") {
            let userinfo = jwt_decode(googleResp.data.token);
            // console.log(userinfo, "signup now");
            const payload = {
              firstname: userinfo.given_name,
              lastname: "null",
              email: userinfo.email,
              password: "",
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
            };

            console.log(payload, "pay");
            await axios
              .post(`${process.env.REACT_APP_AUTH_URL}/register`, payload)
              .then(async (res) => {
                console.log(res, "signup");
                localStorage.clear();
                localStorage.setItem("token", res.data.accessToken);
                await axios
                  .post(`${process.env.REACT_APP_AUTH_URL}/get-user-data`, {
                    email: userinfo.email,
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
                    }, 1000);
                    setGoogleLoader(false);
                  });
              })
              .catch((e) => {
                console.log(e);
                setGoogleLoader(false);
              });
          } else {
            toast.warn("Already Register with this Email", {
              theme: "colored",
              position: "top-center",
              autoClose: 3000,
              progress: false,
              hideProgressBar: true,
            });
            setGoogleLoader(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setGoogleLoader(false);
        });
    },
    onFailure: (error) => {
      console.error("Google login failed!", error);
    },
    scope: "profile email",
    ux_mode: "redirect",
  });

  const EmailOtp = async () => {
    const OTP = Math.floor(Math.random() * 10000);
    const msg = "Your OTP for verification is " + OTP;
    var templateParams = {
      to_Name: `${values.firstname}   ${values.lastname}`,
      name: "PakaAI",
      to_Email: values.email,
      message: msg,
    };
    const userData = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      otp: OTP,
    };
    emailjs.init("user_o1rDQKPWkdXku4D6nc3GM");
    await emailjs
      .send("service_vbqf53h", "template_hmowo9s", templateParams)
      .then((res) => {
        // console.log(res);
        const myObjectString = JSON.stringify(userData);
        localStorage.setItem("regData", myObjectString);
        handleReset();
        setLoader(false);
        navigate("/register/otp");
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
        alert("invalid email");
      });
    //console.log(templateParams, "send email");
  };

  const register = async () => {
    if (values.password !== values.rePassword) {
      setPasswordmatchError(true);
      return;
    }
    if (!checkbox) {
      toast.warn("Please Accept Term and Privacy Policy", {
        theme: "colored",
        position: "top-center",
        autoClose: 1000,
        progress: false,
        hideProgressBar: true,
      });
      return;
    }
    setLoader(true);
    await axios
      .post(`${API_URL.AUTH_URL}/check-email`, { email: values.email })
      .then((res) => {
        //console.log(res.data);
        // setCheckEmail(res.data.message);
        if (res.data.message === "email already exist") {
          toast.warn(res.data.message, {
            theme: "colored",
            position: "top-center",
            autoClose: 3000,
            progress: false,
            hideProgressBar: true,
            style: { backgroundColor: "red" },
          });
        }
        if (res.data.message !== "email already exist") {
          EmailOtp();
          return;
        }
        setLoader(false);
      });
    // console.log(
    //   values.firstname,
    //   values.lastname,
    //   values.email,
    //   values.password,
    //   values.rePassword
    // );
  };

  // console.log(touched.password, errors.password);
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LeegnUlAAAAAGQjFJ-x6o2WYcqNwS_SSG9vBapd">
      <div className=" relative bg-primary min-h-screen">
        <BlurAnimation />
        <ToastContainer />
        <CustomModal isOpen={googleLoader}>
          <div className=" flex items-center justify-center">
            <div className=" bg-white p-8 h-fit w-fit rounded-md">
              <Puff
                height="100"
                width="100"
                radius={1}
                color="#FF0066"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          </div>
        </CustomModal>
        <div className="">
          <div className=" sticky top-0 flex items-center justify-between px-8 xl:px-12 py-3">
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
                  onClick={() => navigate("/")}
                  className=" text-secoundry  px-2 py-1  rounded-md cursor-pointer"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className=" flex flex-col px-6 md:px-20 items-center pt-3">
            <div className="lg:w-2/5  ">
              <h1 className=" font-bold text-white text-2xl mb-3">
                Get started absolutely free.
              </h1>
              <span className=" text-appgray text-center text-sm ">
                Create your own voice bot!
              </span>
            </div>
            <button
              onClick={signIn}
              className=" border-2  border-appgray rounded-md  items-center w-full lg:w-2/5  flex justify-center py-2 mt-7"
            >
              <FcGoogle className=" text-2xl" />
              <p className=" mx-8 text-white">Continue with Google</p>
            </button>
            <div className="  w-full lg:w-2/5  mt-10 relative ">
              <div className=" h-[0.15rem] w-full bg-inputBg" />
              <p className=" text-appgray bg-primary px-2 py-1 absolute -top-4 left-1/2">
                OR
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className=" w-full lg:w-2/5  py-5 select-none"
            >
              <div className=" grid grid-cols-2 gap-x-3">
                <div>
                  <CustomInput
                    placeholder="First Name"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange("firstname")}
                    onBlur={handleBlur("firstname")}
                  />
                  {touched.firstname && errors.firstname ? (
                    <p className=" text-[11px] text-red-500 ml-2 my-1.5">
                      {errors.firstname}
                    </p>
                  ) : (
                    <p className=" my-6"></p>
                  )}
                </div>
                <div>
                  <CustomInput
                    placeholder="Last Name"
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange("lastname")}
                    onBlur={handleBlur("lastname")}
                  />
                  {touched.lastname && errors.lastname ? (
                    <p className=" text-[11px] text-red-500 ml-2 my-1.5">
                      {errors.lastname}
                    </p>
                  ) : (
                    <p className=" my-6"></p>
                  )}
                </div>
              </div>
              <CustomInput
                placeholder="Email address"
                name="email"
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                onFocus={() => setCheckEmail("")}
              />
              <div className=" h-4">
                {touched.email && errors.email ? (
                  <p className=" text-[11px] text-red-500 ml-2 my-1.5">
                    {errors.email}
                  </p>
                ) : (
                  <p className=" text-[11px] text-red-500 ml-2 my-1.5">
                    {checkEmail !== "" && checkEmail}
                  </p>
                )}
              </div>
              <PasswordInput
                placeholder="Enter your password"
                name="password"
                value={values.password}
                onChange={handleChange("password")}
                inputBlur={handleBlur("password")}
              />
              {touched.password && errors.password ? (
                <p className=" text-[11px] text-red-500 ml-2 my-1.5">
                  {errors.password}
                </p>
              ) : (
                <p className=" my-6"></p>
              )}
              <PasswordInput
                placeholder="Re-enter your password"
                name="rePassword"
                value={values.rePassword}
                onChange={handleChange("rePassword")}
                inputBlur={handleBlur("rePassword")}
                inputFocus={() => setPasswordmatchError(false)}
              />
              {touched.rePassword && errors.rePassword ? (
                <p className=" text-[11px] text-red-500 ml-2 my-1.5">
                  {errors.rePassword}
                </p>
              ) : (
                <p className=" text-[11px] text-red-500 ml-2 my-1.5">
                  {passwordmatchError && "Password not matched"}
                </p>
              )}
              <div className=" flex pt-4">
                {/* <input
                type="checkbox"
                className=" h-6 w-6 md:h-4 md:w-4   checked:bg-secoundry mx-2"
              /> */}
                <CustomCheckBox
                  setChecked={setCheckbox}
                  checked={checkbox}
                  className=" mr-2 w-7 md:w-5 lg:w-8 xl:w-5"
                />
                <span className=" text-sm text-border">
                  By signing up, I agree to PAKA AI{" "}
                  <span className=" text-appgray text-sm">
                    Terms of Service and Privacy Policy.
                  </span>
                </span>
              </div>
              <div className={`${loader && "flex justify-center"}`}>
                <button
                  type="submit"
                  className={`bg-secoundry transition-all ease-in-out duration-500 ${
                    loader ? " w-16 h-16 rounded-full " : "w-full rounded-md"
                  } hover:bg-pink-600 font-semibold flex justify-center items-center  py-3 mt-5 text-white `}
                >
                  {loader ? (
                    <div>
                      <CircularLoader />
                    </div>
                  ) : (
                    <p>Register</p>
                  )}
                </button>
              </div>
              <div className=" lg:hidden flex justify-center mt-4">
                <div className=" flex items-center">
                  <h3 className=" text-white">Don’t have an account yet? </h3>
                  <button
                    onClick={() => navigate("/")}
                    className=" text-secoundry  px-2 py-1  rounded-md cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default Register;
