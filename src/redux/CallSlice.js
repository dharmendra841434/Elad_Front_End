import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedNumber: 0,
  viewCallHistory: false,
  callFilteredBot: { _id: 0, botName: "All" },
  deleteCall: false,
  deleteLoader: false,
};
export const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    setSelectedNumber: (state, actions) => {
      state.selectedNumber = actions.payload;
    },
    setViewCallHistory: (state, actions) => {
      state.viewCallHistory = actions.payload;
    },
    setCallFilteredBot: (state, actions) => {
      state.callFilteredBot = actions.payload;
    },
    setDeleteCall: (state, actions) => {
      state.deleteCall = actions.payload;
    },
    setDeleteLoader: (state, actions) => {
      state.deleteLoader = actions.payload;
    },
  },
});
export const {
  setSelectedNumber,
  setViewCallHistory,
  setCallFilteredBot,
  setDeleteCall,
  setDeleteLoader,
} = callSlice.actions;

export default callSlice.reducer;
