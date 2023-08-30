import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  registrationData: {},
  botsList: [],
  selectedBot: {},
  callHistory: [],
  messageCenter: [],
  messageFilteredBot: { _id: 0, botName: "All" },
  settingTab:0,
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRegistrationData: (state, actions) => {
      state.registrationData = actions.payload;
    },
    setUserData: (state, actions) => {
      state.userData = actions.payload;
    },
    storeBotsList: (state, actions) => {
      state.botsList = actions.payload;
    },
    setSelectBot: (state, actions) => {
      state.selectedBot = actions.payload;
    },
    setCallHistoryData: (state, actions) => {
      state.callHistory = actions.payload;
    },
    setMessageCenterData: (state, actions) => {
      state.messageCenter = actions.payload;
    },
    setMessageFilteredBot: (state, actions) => {
      state.messageFilteredBot = actions.payload;
    },
    setSettingTab: (state, actions) => {
      state.settingTab = actions.payload;
    },
  },
});
export const {
  setRegistrationData,
  setUserData,
  storeBotsList,
  setSelectBot,
  setCallHistoryData,
  setMessageCenterData,
  setMessageFilteredBot,
  setSettingTab,
} = appSlice.actions;

export default appSlice.reducer;
