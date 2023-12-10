import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated:false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated=true;
    },
    desetUser: (state) => {
      state.user = null;
      state.isAuthenticated=false;
    },
  },
});

export const { setUser,desetUser } = userSlice.actions;
