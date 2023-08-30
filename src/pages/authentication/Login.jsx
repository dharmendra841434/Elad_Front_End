import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import BlurAnimation from "../../components/BlurAnimation";
import axios from "axios";
import CircularLoader from "../../components/CircularLoader";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomCheckBox from "../../components/CustomCheckBox";
import { useDispatch } from "react-redux";
import { setUserData, storeBotsList } from "../../redux/AppSlice";
import { useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import CustomModal from "../../components/CustomModal";
import { Puff } from "react-loader-spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [authStatus, setAuthStatus] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // console.log(`${process.env.REACT_APP_AUTH_URL}/login`, "ahdj");

  const login = async () => {
    setLoader(true);
    await axios
      .post(`${process.env.REACT_APP_AUTH_URL}/login`, {
        email: email,
        password: password,
      })
      .then(async (res) => {
        console.log(res.data.accessToken, "result");
        localStorage.setItem("token", res.data.accessToken);
        await axios
          .post(`${process.env.REACT_APP_AUTH_URL}/get-user-data`, {
            email: email,
          })
          .then(async (result) => {
            console.log(result.data.user, "jdksjidj");
            dispatch(setUserData(result.data.user));
            localStorage.setItem("userEmail", result.data.user.email);
            await axios
              .get(
                `${process.env.REACT_APP_BASE_URL}/bot-data/${result.data.user.id}`
              )
              .then(({ data }) => {
                console.log(data, "list of bots");
                dispatch(storeBotsList(data));
                if (data.length === 0) {
                  navigate("/create-bot");
                  return;
                }
                if (data.length > 0) {
                  navigate("/dashboard");
                  return;
                }
              })
              .catch((error) => {
                //console.error(error.response.data)
              });
          })
          .catch((error) => {
            //console.error(error.response.data)
          });
      })
      .catch((error) => {
        setLoader(false);
        // setAuthStatus(error.response.status);
        //toast("Wrong Email or Password");
        if (error.response) {
          toast.error(error.response.data.message, {
            theme: "colored",
            autoClose: 1000,
            progress: false,
            hideProgressBar: true,
            style: { backgroundColor: "red" },
          });
        }
      });
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    //console.log(token, "token");
    if (token) {
      navigate("/create-bot");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const signIn = useGoogleLogin({
    onSuccess: async (user) => {
      //console.log("Google login successful!", user.access_token);
      setLoader(true);
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}//google-auth`, {
          token: user.access_token,
        })
        .then(async (googleResp) => {
          // console.log(result);
          localStorage.setItem("token", googleResp.data.token);
          if (googleResp.data?.message === "Email Not Exist") {
            let userinfo = jwt_decode(googleResp.data.token);
            // console.log(userinfo, "signup now");
            const payload = {
              firstname: userinfo.given_name,
              lastname: "",
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
                    toast.success("Login Successfully", {
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
                    setLoader(false);
                  });
              })
              .catch((e) => {
                console.log(e);
                setLoader(false);
              });
          } else {
            let info = jwt_decode(googleResp.data.token);
            console.log(info, "login now");
            setLoader(true);
            await axios
              .post(`${process.env.REACT_APP_AUTH_URL}/get-user-data`, {
                email: info.email,
              })
              .then(async (result) => {
                console.log(result.data.user, "jdksjidj");
                dispatch(setUserData(result.data.user));
                localStorage.setItem("userEmail", result.data.user.email);
                await axios
                  .get(
                    `${process.env.REACT_APP_BASE_URL}/bot-data/${result.data.user.id}`
                  )
                  .then(({ data }) => {
                    console.log(data, "list of bots");
                    dispatch(storeBotsList(data));
                    setLoader(false);
                    if (data.length === 0) {
                      navigate("/create-bot");
                      return;
                    }
                    if (data.length > 0) {
                      navigate("/dashboard");
                      return;
                    }
                  })
                  .catch((error) => {
                    //console.error(error.response.data)
                  });
              })
              .catch((error) => {
                setLoader(false);
                //console.error(error.response.data)
              });
          }
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    },
    onFailure: (error) => {
      console.error("Google login failed!", error);
    },
    scope: "profile email",
    ux_mode: "redirect",
  });

  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LeegnUlAAAAAGQjFJ-x6o2WYcqNwS_SSG9vBapd">
      <div className=" bg-primary  relative min-h-screen ">
        <CustomModal isOpen={loader}>
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
        <BlurAnimation />
        <ToastContainer />
        <div className=" hidden lg:block">
          <div className=" flex items-center justify-between px-8 xl:px-12 py-3">
            <div className=" flex items-center">
              <img
                className=" h-8 w-28"
                alt="logo"
                src={require("../../assets/images/Logo1.png")}
              />
            </div>
            <div>
              <div className=" flex items-center">
                <h3 className=" text-white">Don’t have an account yet?</h3>
                <button
                  onClick={() => navigate("/register")}
                  className=" bg-secoundry text-white  px-2 z-30  ml-2 py-0.5  rounded-md cursor-pointer"
                >
                  Signup
                </button>
              </div>
            </div>
          </div>
          <div className=" flex flex-col items-center pt-6">
            <div className=" flex flex-col items-center">
              <h1 className=" font-bold text-white text-2xl">
                Welcome to Paka AI{" "}
              </h1>
              <span className=" text-appgray text-center text-sm my-4">
                Your personal AI bot
              </span>
            </div>

            <button
              onClick={signIn}
              className=" border-2 border-appgray rounded-md  items-center w-2/5 xl:w-1/4 flex justify-center py-2 mt-5"
            >
              <FcGoogle className=" text-2xl" />
              <p className=" mx-8 text-white">Continue with Google</p>
            </button>
            {/* <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                const decode = jwt_decode(credentialResponse.credential);
                console.log(decode);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            /> */}

            <div className="w-2/5 xl:w-1/4 mt-10 relative ">
              <div className=" h-[0.18rem] w-full bg-inputBg" />
              <p className=" text-appgray bg-primary px-2 py-1 absolute -top-4 left-1/2">
                OR
              </p>
            </div>
            <div className=" w-2/5 xl:w-1/4 py-5 select-none">
              <CustomInput
                title="Email Address"
                className=""
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setAuthStatus("");
                }}
              />
              <div className="mt-6 relative ">
                <PasswordInput
                  title="Password"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setAuthStatus("");
                    setPassword(e.target.value);
                  }}
                />
                <button
                  onClick={() => navigate("/reset-password")}
                  className=" text-secoundry absolute right-0 top-0 text-sm"
                >
                  Forgot password?
                </button>
              </div>
              {/* <Recaptcha
          checked={checkedCaptcha}
          setChecked={setCheckedCaptcha}
        /> */}
              {/* <ReCAPTCHA
          sitekey="6LeegnUlAAAAAGQjFJ-x6o2WYcqNwS_SSG9vBapd"
          onChange={onChange}
        /> */}
              <div className=" bg-red-700">
                <GoogleReCaptcha onVerify={(token) => {}} />
              </div>
              <div className={` flex justify-center`}>
                <button
                  onClick={() => login()}
                  className={`bg-secoundry 
                     w-full rounded-md transition-all ease-in-out flex justify-center items-center duration-500 hover:bg-pink-600 font-semibold  py-3 mt-5 text-white `}
                >
                  Login
                </button>
              </div>
              <div className=" flex justify-center my-3 ">
                {authStatus !== "" && (
                  <span className=" text-red-500 text-sm">
                    Bad Authantication???
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className=" lg:hidden ">
          <div className=" flex items-center justify-between px-4 py-3 sticky top-0">
            <div className=" flex items-center">
              <img
                className=" h-8 w-28"
                alt="logo"
                src={require("../../assets/images/Logo1.png")}
              />
            </div>
          </div>
          <div className=" w-full  pt-6 px-8 md:px-32">
            <div className=" flex flex-col items-center">
              <h1 className=" font-bold text-white text-xl">
                Welcome to Paka AI{" "}
              </h1>
              <span className=" text-appgray text-center text-[0.80rem] my-4">
                Your personal AI bot
              </span>
            </div>

            <button
              onClick={signIn}
              className=" border-2 w-full border-appgray rounded-md   items-center flex justify-center px-10 self-center py-2 mt-5 "
            >
              <FcGoogle className=" text-2xl" />
              <p className=" mx-8 text-white">Continue with Google</p>
            </button>
            <div className=" flex justify-center mt-10 relative ">
              <div className=" h-[0.10rem] w-2/3 bg-inputBg" />
              <p className=" text-appgray bg-primary px-2 py-1 absolute -top-4 left-1/2">
                OR
              </p>
            </div>
            <div className="  py-5 select-none">
              <CustomInput
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="mt-6 relative ">
                <PasswordInput
                  placeholder="Enter your password"
                  className="mt-12"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={() => navigate("/reset-password")}
                  className=" text-secoundry absolute right-0 -top-6 text-sm"
                >
                  Forgot password?
                </button>
              </div>
              {/* <div className=" flex md:items-center pt-4">
                <CustomCheckBox
                  checked={checkbox}
                  setChecked={setCheckbox}
                  className=" h-4 w-7"
                />
                <span className=" text-sm text-border">
                  By signing up, I agree to PAKA AI{" "}
                  <span className=" text-appgray text-sm">
                    Terms of Service and Privacy Policy.
                  </span>
                </span>
              </div> */}
              <div className=" flex justify-center mt-6">
                <button
                  onClick={() => login()}
                  className={`w-full rounded-md bg-secoundry flex justify-center items-center transition-all ease-in-out duration-500 hover:bg-pink-600 font-semibold  py-3 mt-5 text-white `}
                >
                  Login
                </button>
              </div>
              {/* <Recaptcha
          checked={checkedCaptcha}
          setChecked={setCheckedCaptcha}
        /> */}
              <div className=" flex items-center justify-center mt-3">
                <h3 className=" text-white">Don’t have an account yet? </h3>
                <button
                  onClick={() => navigate("/register")}
                  className="  px-2 py-1  text-secoundry cursor-pointer"
                >
                  Signup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default Login;
