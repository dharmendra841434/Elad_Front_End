import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./AppSlice";
import callReducer from "./CallSlice";
export const store = configureStore({
  reducer: {
    app: appReducer,
    call: callReducer,
  },
});
