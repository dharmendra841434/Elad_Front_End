import React from "react";
import { Route, Routes } from "react-router-dom";
import BotIdentity from "../pages/createBotSteps/BotIdentity";
import BotGreetings from "../pages/createBotSteps/BotGreetings";

const CreateBotRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="create-bot/identity" element={<BotIdentity />} />
        <Route path="/create-bot/greeting" element={<BotGreetings />} />
      </Routes>
    </div>
  );
};

export default CreateBotRoutes;
