import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateBot from "../pages/CreateBot";
import Dashboard from "../pages/Dashboard";
import Bots from "../pages/Bots";
import CallHistory from "../pages/CallHistory";
import MessageCenter from "../pages/MessageCenter";
import Settings from "../pages/Settings";
import NewBot from "../pages/NewBot";
import EditBot from "../pages/editBot/EditBot";
import DuplicateBot from "../pages/duplicateBot/DuplicateBot";

const HomeRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/create-bot" element={<CreateBot />} />
        <Route path="/bots/create-bot" element={<NewBot />} />
        <Route path="/bots/edit-bot" element={<EditBot />} />
        <Route path="/bots/duplicate-bot" element={<DuplicateBot />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bots" element={<Bots />} />
        <Route path="/call-history" element={<CallHistory />} />
        <Route path="/message-center" element={<MessageCenter />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
};

export default HomeRoutes;
