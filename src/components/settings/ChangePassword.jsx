import React, { useState } from "react";
import PasswordInput from "../PasswordInput";
import { CgClose } from "react-icons/cg";
import { HiChevronLeft } from "react-icons/hi";
import { useFormik } from "formik";
import { changePasswordSchema } from "../../utils/schemas";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CircularLoader from "../CircularLoader";

const ChangePassword = ({ setChangePassPopup, userDetails }) => {
  const [matchedError, setMatchedError] = useState(false);
  const [loader, setLoader] = useState(false);

  const {
    handleChange,
    handleReset,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormik({
    validationSchema: changePasswordSchema,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confermPassword: "",
    },
    onSubmit: () => {
      changePassword();
    },
  });

  const changePassword = async () => {
    console.log(values.newPassword === values.confermPassword, "saved");
    if (values.newPassword !== values.confermPassword) {
      setMatchedError(true);
      return;
    }
    setLoader(true);
    await axios
      .post(`${process.env.REACT_APP_AUTH_URL}/change-password`, {
        email: userDetails.email,
        newPassword: values.newPassword,
        oldpassword: values.oldPassword,
      })
      .then((result) => {
        setLoader(false);
        console.log(result.data);
        toast.success(result.data.message, {
          theme: "colored",
          autoClose: 1000,
          progress: false,
          hideProgressBar: true,
          style: {
            backgroundColor: "green",
          },
        });
        setTimeout(() => {
          setChangePassPopup(false);
        }, 2000);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error.response.data.message, "error");
        toast.error(error.response.data.message, {
          theme: "colored",
          autoClose: 1000,
          progress: false,
          hideProgressBar: true,
          style: { backgroundColor: "red" },
        });
      });
  };
  return (
    <div className=" relative bg-primary lg:h-fit mt-12 w-full h-full lg:w-3/5 lg:ml-24 rounded-md py-10 shadow-tableShadow text-white  ">
      <ToastContainer />
      <p className="flex justify-center  text-xl font-bold">Change Password</p>
      <form onSubmit={handleSubmit}>
        <div className=" hidden md:block">
          <div className=" flex items-center justify-center mt-6">
            <p className=" mx-10">Old Password</p>
            <div className=" w-2/5">
              <PasswordInput
                onChange={handleChange("oldPassword")}
                inputBlur={handleBlur("oldPassword")}
                value={values.oldPassword}
                placeholder="Enter Old Password"
              />
              <div className=" h-2">
                {touched.oldPassword && errors.oldPassword && (
                  <p className=" text-red-600 text-[11px]">
                    {errors.oldPassword}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className=" flex items-center justify-center mt-6">
            <p className=" mx-9">New Password</p>
            <div className=" w-2/5">
              <PasswordInput
                onChange={handleChange("newPassword")}
                inputBlur={handleBlur("newPassword")}
                inputFocus={() => setMatchedError(false)}
                value={values.newPassword}
                placeholder="Enter New Password"
              />
              <div className=" h-2">
                {touched.newPassword && errors.newPassword && (
                  <p className=" text-red-600 text-[11px]">
                    {errors.newPassword}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className=" flex items-center justify-center mt-6">
            <div>
              <p className=" mx-10 ">Confirm New </p>
              <p className=" text-center">Password</p>
            </div>
            <div className=" w-2/5">
              <PasswordInput
                onChange={handleChange("confermPassword")}
                inputBlur={handleBlur("confermPassword")}
                value={values.confermPassword}
                inputFocus={() => setMatchedError(false)}
                placeholder="Conferm Password"
              />
              <div className=" h-2">
                {touched.confermPassword && errors.confermPassword && (
                  <p className=" text-red-600 text-[11px]">
                    {errors.confermPassword}
                  </p>
                )}
              </div>
              <div className=" h-2">
                {matchedError && (
                  <p className=" text-red-600 text-[11px]">Password Matched</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className=" md:hidden">
          <div className=" mx-6 mt-12">
            <p>Old Password</p>
            <PasswordInput
              onChange={handleChange("oldPassword")}
              inputBlur={handleBlur("oldPassword")}
              value={values.oldPassword}
              placeholder="Enter Old Password"
            />
            <div className=" h-2">
              {touched.oldPassword && errors.oldPassword && (
                <p className=" text-red-600 text-[11px]">
                  {errors.oldPassword}
                </p>
              )}
            </div>
          </div>
          <div className=" mx-6 mt-6">
            <p>New Password</p>
            <PasswordInput
              onChange={handleChange("newPassword")}
              inputBlur={handleBlur("newPassword")}
              value={values.newPassword}
              inputFocus={() => setMatchedError(false)}
              placeholder="Enter New Password"
            />
            <div className=" h-2">
              {touched.newPassword && errors.newPassword && (
                <p className=" text-red-600 text-[11px]">
                  {errors.newPassword}
                </p>
              )}
            </div>
          </div>
          <div className=" mx-6 mt-6">
            <p>Confirm New Password</p>
            <PasswordInput
              onChange={handleChange("confermPassword")}
              inputBlur={handleBlur("confermPassword")}
              value={values.confermPassword}
              inputFocus={() => setMatchedError(false)}
              placeholder="Conferm Password"
            />
            <div className=" h-2">
              {touched.confermPassword && errors.confermPassword && (
                <p className=" text-red-600 text-[11px]">
                  {errors.confermPassword}
                </p>
              )}
            </div>
            <div className=" h-2">
              {matchedError && (
                <p className=" text-red-600 text-[11px]">Password Matched</p>
              )}
            </div>
          </div>
        </div>
        <CgClose
          onClick={() => setChangePassPopup(false)}
          className=" hidden md:block cursor-pointer absolute top-5 right-5 text-white text-2xl"
        />
        <HiChevronLeft
          onClick={() => setChangePassPopup(false)}
          className=" md:hidden  cursor-pointer absolute top-10 left-3  text-white text-4xl"
        />
        <div className=" flex justify-center">
          <button
            type="submit"
            className={`${
              loader ? " w-16 h-16 rounded-full " : " w-1/2 md:w-1/4 rounded-md"
            } bg-secoundry transition-all flex justify-center items-center ease-in-out duration-500 hover:bg-pink-600 font-semibold    py-3 mt-5 text-white `}
          >
            {loader ? <CircularLoader /> : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
