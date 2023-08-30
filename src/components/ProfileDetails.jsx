import { googleLogout } from "@react-oauth/google";
import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { setSettingTab } from "../redux/AppSlice";
import { useDispatch } from "react-redux";

function ProfileDetails({ className, setIsOpen, isOpen, userDetails }) {
  const listOfBots = useSelector((state) => state.app.botsList);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    googleLogout();
    navigate("/");
  };

  return (
    <div ref={ref}>
      <ToastContainer />
      <div
        className={`absolute bg-white shadow-dropDownBox rounded-md  overflow-hidden ${className}`}
      >
        {isOpen && (
          <div className=" flex flex-col items-center py-5">
            <div className=" mx-2 capitalize flex items-center justify-center bg-[#C2185B] text-white font-semibold text-2xl h-10 w-10 rounded-full">
              {userDetails?.firstname !== undefined &&
                userDetails?.firstname[0]}
            </div>
            <div className=" my-2 flex flex-col items-center ">
              <h2 className=" font-semibold text-primary text=[16px] capitalize">
                {`${userDetails?.firstname} ${userDetails?.lastname}`}
              </h2>
              <h4 className=" text-[11px] text-appgray">
                {userDetails?.email}
              </h4>
              <p className=" text-[11px] text-appgray">Free Plan</p>
            </div>
            <div
              onClick={() => {
                // if (listOfBots.length !== 0) {
                  setIsOpen(false);
                  navigate("/settings");
                  dispatch(setSettingTab(0));
                // } else {
                //   setIsOpen(false);
                //   toast.warning("First create a Bot", {
                //     theme: "colored",
                //     position: "top-center",
                //     autoClose: 3000,
                //     progress: false,
                //     hideProgressBar: true,
                //   });
                // }
              }}
              className=" flex items-center w-11/12 py-5  border-b border-border cursor-pointer"
            >
              <img
                alt="ico"
                className=" h-7 w-7"
                src={require("../assets/images/personalIcon.png")}
              />
              <div className=" ml-3">
                <p className=" text-primary font-semibold ">Personal Details</p>
                <p className=" text-[11px] text-appgray">manage your details</p>
              </div>
            </div>
            <div className=" flex items-center w-11/12 pt-5   ">
              <img
                alt="ico"
                className=" h-7 w-7"
                src={require("../assets/images/settings.png")}
              />
              <div className=" ml-3">
                <p className=" text-primary font-semibold ">Plan and Billing</p>
                <p className=" text-[11px] text-appgray">upgrade your plan</p>
              </div>
            </div>
            <button
              onClick={() => {
              //  if (listOfBots.length !== 0) {
                  setIsOpen(false);
                 
                  navigate("/settings");
                  dispatch(setSettingTab(1));
                 
                //  localStorage.setItem("payment", "payment");
                // } else {
                //   setIsOpen(false);
                //   toast.warning("First create a Bot", {
                //     theme: "colored",
                //     position: "top-center",
                //     autoClose: 3000,
                //     progress: false,
                //     hideProgressBar: true,
                //   });
                // }
              }}
              className=" transition-all duration-300 ease-in-out hover:bg-secoundry bg-primary py-1.5 px-20 rounded-md text-white mt-3"
            >
              Upgrade plan
            </button>
            <div className=" flex items-center w-11/12 py-3  border-b border-border" />
            <button
              onClick={() => logout()}
              className=" group flex items-center w-11/12 pt-5 cursor-pointer"
            >
              <img
                alt="ico"
                className=" transition-all duration-300 ease-in-out h-7 w-7 group-hover:-translate-x-3"
                src={require("../assets/images/logout.png")}
              />
              <p className=" font-semibold text-primary">Log-out</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDetails;
