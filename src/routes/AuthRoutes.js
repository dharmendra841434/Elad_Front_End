import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Otp from "../pages/authentication/Otp";
import ResetPassword from "../pages/authentication/ResetPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";

const AuthRoutes = () => {
  return (
    <GoogleOAuthProvider clientId="878129512651-2fbkuvh3p7ccp8ph8ilqo2kcfkodh1vn.apps.googleusercontent.com">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/otp" element={<Otp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default AuthRoutes;
