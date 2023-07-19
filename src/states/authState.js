import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isLoggedIn: null,
  isError: null,
  response: null,
  activeUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loggingIn: (state, action) => {
      state.isLoading = true;
    },
    loggingInFail: (state, action) => {
      const {error} = action.payload;
      state.isLoading = false;
      state.isLoggedIn = false;
      state.isError = true;
      state.response = error.response;
    },
    loggingInSuccess: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.isError = false;
      state.response = action.payload.response;
      state.activeUser = action.payload.user;
    },
    loggingOut: (state) => {
      state.isLoading = true;
    },
    loggingOutSuccess: (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
    },
    loggingReset: (state) => {
      state.isLoading = initialState.isLoading;
      state.isLoggedIn = initialState.isLoggedIn;
      state.isError = initialState.isError;
      state.response = initialState.response;
    },
    getUser: (state) => {},
    getUserFail: (state) => {
      state.isLoggedIn = false;
    },
    getUserSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.activeUser = action.payload.user;
    },
  },
});

export const {
  loggingIn,
  loggingInFail,
  loggingInSuccess,
  loggingOut,
  loggingOutSuccess,
  loggingReset,
  getUser,
  getUserFail,
  getUserSuccess,
} = authSlice.actions;

export default authSlice.reducer;
