import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import Layouts from "./layouts/Layouts";

const App = () => {
  const location = useLocation();
  const paths = ["/", "/reset-password", "/register/otp", "/register"];

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className=" font-Poppins ">
      {paths.includes(location.pathname) ? <AuthRoutes /> : <Layouts />}
    </div>
  );
};

export default App;
