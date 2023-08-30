import React, { useEffect, useState } from "react";
import { ReactComponent as MsgUser } from "../../assets/images/Icons/msgUser.svg";
import CustomModal from "../CustomModal";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import { useDispatch, useSelector } from "react-redux";
import TimezoneSelect from "react-timezone-select";
import { useFormik } from "formik";
import { profileSchema } from "../../utils/schemas";
import { ToastContainer, toast } from "react-toastify";
import InputBox from "./InputBox";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { setUserData } from "../../redux/AppSlice";
import {
  calculateRemainingDays,
  remainingdaya,
} from "../../utils/helper/helperFunctions";

const PersonalDetails = () => {
  const userDetails = useSelector((state) => state.app.userData);
  const [isOpen, setIsOpen] = useState(false);
  const [changePassPopup, setChangePassPopup] = useState(false);
  const [changeEmailPopup, setChangeEmailPopup] = useState(false);
  const [accountDeletePopup, setAccountDeletePopup] = useState(false);
  const [loader, setLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [restoreLoader, setRestoreLoader] = useState(false);

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormik({
    validationSchema: profileSchema,
    initialValues: {
      email: userDetails?.email,
      firstName: userDetails?.firstname,
      lastName: userDetails?.lastname,
      phoneNumber: userDetails?.phone,
      country: userDetails?.country,
      city: userDetails?.address?.city,
      street: userDetails?.address?.street,
      zipcode: userDetails?.address?.zipcode,
      timeZone:
        userDetails?.timeZone === undefined
          ? {
              value: "Etc/GMT",
              label: "(GMT+0:00) UTC",
              offset: 0,
              abbrev: "GMT",
              altName: "British Standard Time",
            }
          : userDetails?.timeZone,
      businessName: userDetails?.businessInfo?.businessName,
      businessEmail: userDetails?.businessInfo?.businessEmail,
      vatID: userDetails?.businessInfo?.vatID,
      fullAddress: userDetails?.businessInfo?.fullAddress,
    },
    enableReinitialize: true,
    onSubmit: () => {
      saveData();
    },
  });

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const saveData = async () => {
    setLoader(true);
    const payload = {
      email: values.email,
      firstname: values.firstName,
      lastname: values.lastName,
      phone: Number(values.phoneNumber),
      country: values.country,
      address: {
        city: values.city,
        street: values.street,
        zipcode: Number(values.zipcode),
      },
      timeZone: values.timeZone,
      businessInfo: {
        businessName: values.businessName,
        businessEmail: values.businessEmail,
        vatID: values.vatID,
        fullAdress: values.fullAddress,
      },
    };
    await axios
      .post(`${process.env.REACT_APP_AUTH_URL}/update`, payload)
      .then(async (res) => {
        console.log(res, "result");
        await axios
          .post(`${process.env.REACT_APP_AUTH_URL}/get-user-data`, {
            email: userDetails?.email,
          })
          .then((result) => {
            console.log(result.data, "userData");
            dispatch(setUserData(result.data.user));
            // navigator("/settings");
            setLoader(false);
            toast.success(res.data.message, {
              theme: "colored",
              autoClose: 1000,
              progress: false,
              hideProgressBar: true,
              style: {
                backgroundColor: "green",
              },
            });
          });
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        toast.error(err.response.data.message, {
          theme: "colored",
          autoClose: 1000,
          progress: false,
          hideProgressBar: true,
          style: { backgroundColor: "red" },
        });
      });
  };

  const deleteAccount = async () => {
    setDeleteLoader(true);
    // var futureDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
    const date = new Date();
    const payload = {
      email: values.email,
      deletedAt: date.toISOString(),
    };
    await axios
      .post(`${process.env.REACT_APP_AUTH_URL}/update`, payload)
      .then(async (res) => {
        console.log(res, "result");
        await axios
          .post(`${process.env.REACT_APP_AUTH_URL}/get-user-data`, {
            email: userDetails?.email,
          })
          .then((result) => {
            console.log(result.data, "userData");
            dispatch(setUserData(result.data.user));
            // navigator("/settings");
            setDeleteLoader(false);
            setAccountDeletePopup(false);
            toast.success("Move to Trash", {
              theme: "colored",
              autoClose: 1000,
              progress: false,
              hideProgressBar: true,
              style: {
                backgroundColor: "green",
              },
            });
          });
      })
      .catch((err) => {
        console.log(err);
        setDeleteLoader(false);
        setAccountDeletePopup(false);
        toast.error(err.response.data.message, {
          theme: "colored",
          autoClose: 1000,
          progress: false,
          hideProgressBar: true,
          style: { backgroundColor: "red" },
        });
      });
  };

  // to restore the account
  const restoreAccount = async () => {
    setRestoreLoader(true);
    const payload = {
      email: values.email,
      deletedAt: "",
    };
    await axios
      .post(`${process.env.REACT_APP_AUTH_URL}/update`, payload)
      .then(async (res) => {
        console.log(res, "result");
        await axios
          .post(`${process.env.REACT_APP_AUTH_URL}/get-user-data`, {
            email: userDetails?.email,
          })
          .then((result) => {
            console.log(result.data, "userData");
            dispatch(setUserData(result.data.user));
            // navigator("/settings");
            setRestoreLoader(false);
            // setAccountDeletePopup(false);
            toast.success("Account restored Successfully", {
              theme: "colored",
              autoClose: 1000,
              progress: false,
              hideProgressBar: true,
              style: {
                backgroundColor: "green",
              },
            });
          });
      })
      .catch((err) => {
        console.log(err);
        setRestoreLoader(false);
        //setAccountDeletePopup(false);
        toast.error(err.response.data.message, {
          theme: "colored",
          autoClose: 1000,
          progress: false,
          hideProgressBar: true,
          style: { backgroundColor: "red" },
        });
      });
  };

  useEffect(() => {
    return () => {};
  }, [dispatch]);

  // console.log(userDetails, "details");
  ///console.log(calculateRemainingDays(userDetails?.deletedAt), "remaining");

  console.log(values.timeZone, "details");
  return (
    <div className=" select-none">
      <ToastContainer />
      <CustomModal isOpen={changePassPopup}>
        <ChangePassword
          setChangePassPopup={setChangePassPopup}
          userDetails={userDetails}
        />
      </CustomModal>
      <CustomModal isOpen={isOpen}>
        <div className=" bg-white h-fit mt-12 w-2/5 rounded-md py-5 shadow-tableShadow  ">
          <div className="  p-[5px] ">
            <p className="flex justify-center  scale-[2]">😢</p>
            <h6 className="text-primary text-[16px] font-medium mt-2 flex justify-center">
              We're sorry to see you go!
            </h6>
            <p className="text-[16px] text-[#7F7F7F] px-5 my-5 text-center">
              If you no longer wish to use PAKA you can delete your account by
              clicking on the "Delete Account" button.
            </p>
            <div className="flex flex-col justify-center items-center">
              <div className=" transition-all duration-300 ease-in-out hover:bg-secoundry bg-primary text-white w-[40%] py-1 rounded-md cursor-pointer ">
                <span className="pl-[25%]">Delete Account</span>
              </div>
              <div
                onClick={() => setIsOpen(false)}
                className="cursor-pointer mt-3"
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      </CustomModal>
      <CustomModal isOpen={changeEmailPopup}>
        <ChangeEmail
          setChangeEmailPopup={setChangeEmailPopup}
          userDetails={userDetails}
        />
      </CustomModal>
      <CustomModal isOpen={accountDeletePopup}>
        <div className="  flex flex-col items-center py-6 bg-white h-fit w-10/12 lg:w-3/5 xl:w-1/2 lg:ml-6 rounded-md shadow-dropDownBox mt-24 lg:mt-10">
          {deleteLoader ? (
            <div>
              <img src={require("../../assets/images/trashanim.gif")} />
              <p>Moving to Trash....</p>
            </div>
          ) : (
            <>
              <img
                className=" h-10 w-10"
                src={require("../../assets/images/sad.png")}
              />
              <p className=" text-primary font-medium my-2 text-xl">
                We're sorry to see you go!{" "}
              </p>
              <span className=" text-center mx-8 xl:mx-28 text-gray-400">
                If you no longer wish to use PAKA you can delete your account by
                clicking on the "Delete Account" button.
              </span>
              <button
                onClick={() => {
                  // if (userDetails?.deletedAt === false) {
                  deleteAccount();
                  // } else {
                  //   toast.error("Your Account Already Move to Trash", {
                  //     theme: "colored",
                  //     autoClose: 1000,
                  //     progress: false,
                  //     hideProgressBar: true,
                  //     style: { backgroundColor: "red" },
                  //   });
                  // }
                }}
                className="bg-primary hover:bg-secoundry text-[14px] text-white   rounded py-2 px-20 mt-6"
              >
                Delete Account
              </button>
              <p
                onClick={() => setAccountDeletePopup(false)}
                className=" mt-3 cursor-pointer"
              >
                Cancel
              </p>
            </>
          )}
        </div>
      </CustomModal>
      <div className="">
        <h5 className="text-primary text-[18px] font-medium">
          Name and photos
        </h5>
        <h6 className="text-[#7F7F7F] text-[16px] mt-[9px] mb-[23px] max-sm:text-[11px] max-sm:mt-0">
          Changing your name below will update your name on your profile.
        </h6>
      </div>
      <div className="flex my-3 gap-5">
        {/* <div className="text-[#FF0066] p-3 bg-primary rounded-full max-sm:pt-4 max-sm:scale-95 max-sm:mt-[2px]">
          <span className="text-[24px] font-bold max-sm:text-[17px]">
            {logo}
          </span>
        </div> */}
        <div className=" mx-2 capitalize flex items-center justify-center bg-[#C2185B] text-white font-semibold text-3xl max-sm:mt-1 max-sm:h-[50px] max-sm:w-[50px] h-[58px] w-[58px] rounded-full">
          {userDetails?.firstname !== undefined && userDetails?.firstname[0]}
        </div>
        <div className="rounded-full mt-1">
          <MsgUser className="scale-[120%] inline max-sm:scale-100" />
        </div>
      </div>
      <div className="flex flex-col max-sm:mb-[8rem] mb-[17.5rem] mt-[20px]">
        <form onSubmit={handleSubmit}>
          <InputBox
            required={true}
            className=" w-full  md:w-1/2"
            placeholder={values?.email}
            readOnly={true}
            onFocus={() => setChangeEmailPopup(true)}
            containerClassName=" mt-4"
            title="Email"
          />
          <InputBox
            required={true}
            className={`${
              touched.firstName && errors.firstName && "border-red-500"
            } w-full  md:w-1/2`}
            containerClassName=" mt-4"
            title="First name"
            value={values.firstName}
            onChange={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
          />
          <InputBox
            required={true}
            className={`${
              touched.lastName && errors.lastName && "border-red-500"
            } w-full  md:w-1/2`}
            containerClassName=" mt-4"
            title="Last name"
            value={values.lastName}
            onChange={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
          />
          <div className=" relative w-full md:w-1/2">
            <InputBox
              required={true}
              readOnly={true}
              className=" w-full"
              containerClassName=" mt-4"
              title="Password"
              placeholder="********"
            />
            <p
              onClick={() => setChangePassPopup(true)}
              className=" transition-all duration-300 ease-in-out cursor-pointer hover:text-secoundry absolute top-1 right-1  text-[11px]"
            >
              Change Password
            </p>
          </div>
          <InputBox
            className=" w-full  md:w-1/2"
            containerClassName=" mt-4"
            title="Phone"
            value={values.phoneNumber}
            onChange={handleChange("phoneNumber")}
            onBlur={handleBlur("phoneNumber")}
          />
          <InputBox
            className=" w-full  md:w-1/2"
            containerClassName=" mt-4"
            title="Country"
            value={values.country}
            onChange={handleChange("country")}
            onBlur={handleBlur("country")}
          />
          <InputBox
            className=" w-full  md:w-1/2"
            containerClassName=" mt-4"
            title="Address"
            placeholder="City"
            value={values.city}
            onChange={handleChange("city")}
            onBlur={handleBlur("city")}
          />
          <InputBox
            className=" w-full  md:w-1/2"
            containerClassName=" mt-4"
            placeholder="Street"
            value={values.street}
            onChange={handleChange("street")}
            onBlur={handleBlur("street")}
          />
          <InputBox
            className=" w-full  md:w-1/2"
            containerClassName=" mt-4"
            placeholder="zipcode"
            value={values.zipcode}
            onChange={handleChange("zipcode")}
            onBlur={handleBlur("zipcode")}
          />
          <div className=" mt-6">
            <div className=" flex items-center">
              <p className=" text-[13px] font-medium text-primary mb-2">
                TimeZone
              </p>
              <p className=" mx-1 text-red-500">*</p>
            </div>

            <TimezoneSelect
              placeholder="UTC + 3 ( Jerusalem )"
              value={values?.timeZone}
              onChange={(t) => {
                setFieldValue("timeZone", t);
              }}
              className={`outline-none rounded-[5px]  placeholder:text-[#7F7F7F] text-[10px]  w-full md:w-1/2
               `}
            />
          </div>
          <div className=" mt-8">
            <h2 className=" text-primary font-semibold text-xl">
              Business Info
            </h2>
            <InputBox
              className=" w-full  md:w-1/2"
              containerClassName=" mt-4"
              title="Business Name"
              value={values.businessName}
              onChange={handleChange("businessName")}
              onBlur={handleBlur("businessName")}
              placeholder="The Organic Store"
            />
            <InputBox
              className=" w-full  md:w-1/2"
              containerClassName=" mt-4"
              title="Business Email"
              value={values.businessEmail}
              onChange={handleChange("businessEmail")}
              onBlur={handleBlur("businessEmail")}
              placeholder="tostore@gmail.com"
            />
            <InputBox
              className=" w-full  md:w-1/2"
              containerClassName=" mt-4"
              title="VAT ID"
              value={values.vatID}
              onChange={handleChange("vatID")}
              onBlur={handleBlur("vatID")}
              placeholder="HU87967546"
            />
            <InputBox
              className=" w-full  md:w-1/2"
              containerClassName=" mt-4"
              title="Full Address"
              value={values.fullAddress}
              onChange={handleChange("fullAddress")}
              onBlur={handleBlur("fullAddress")}
              placeholder="#34, The Great Mall Street, 89078"
            />
          </div>
          <div className=" flex items-center mt-8">
            <button
              type="submit"
              className="bg-primary  text-[14px] text-white font-bold rounded py-2 px-10 mt-2"
            >
              {loader ? (
                <ThreeDots
                  height="20"
                  width="45"
                  radius="9"
                  color="#FF0066"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>

        <h6 className="text-primary test-[16px] font-medium mt-4 mb-1">
          Delete account
        </h6>
        <h5 className="text-[#808080] text-[18px] font-medium mb-3">
          Do you want to delete your account?
        </h5>

        {/* <button className="bg-primary text-white text-[14px] font-bold w-[14rem] rounded-md py-1 px-6 pl-8">
          Delete my account
        </button> */}
        <div></div>
        <div className=" flex items-center ">
          <button
            disabled={userDetails?.deletedAt}
            onClick={() => {
              setAccountDeletePopup(true);
            }}
            className={`transition-all ${
              userDetails?.deletedAt
                ? " text-gray-600 bg-gray-500"
                : "hover:bg-secoundry bg-primary text-white"
            } duration-300 ease-in-out  text-[14px] font-bold w-[14rem]
           rounded-md p-2 cursor-pointer  flex justify-center`}
          >
            Delete my account
          </button>
          <button
            disabled={!userDetails?.deletedAt}
            onClick={() => {
              restoreAccount();
            }}
            className={`transition-all ${
              !userDetails?.deletedAt
                ? " text-gray-600 bg-gray-500"
                : "hover:bg-secoundry bg-primary text-white"
            } duration-300 ease-in-out  text-[14px] font-bold w-[8rem]
           rounded-md p-2 cursor-pointer  flex justify-center mx-7`}
          >
            {restoreLoader ? (
              <ThreeDots
                height="20"
                width="45"
                radius="9"
                color="#FF0066"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            ) : (
              "Restore"
            )}
          </button>
        </div>
        {userDetails?.deletedAt && (
          <p className=" text-[12px] my-1 text-primary ">
            Your Account will be fully Delete after{" "}
            {calculateRemainingDays(userDetails?.deletedAt)} days
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonalDetails;
