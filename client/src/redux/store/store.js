import { configureStore } from "@reduxjs/toolkit";
import { loader } from "../features/loader";
import { auth } from "../features/auth";

export default configureStore({
  reducer: {
    alerts: loader.reducer,
    user: auth.reducer,
  },
});
