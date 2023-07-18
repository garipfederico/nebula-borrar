import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isLoggedIn: null,
    isError: null,
    response: null,
  },
  reducers: {
    loggingIn: (state, action) => {
      state.isLoading = true;
    },
    loggingInFail: (state, action) => {
      const {error} = action.payload;
      state.isLoading = false;
      state.isLoggedIn = false;
      state.isError = true;
      state.response = error;
    },
    loggingInSuccess: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.isError = false;
      state.response = action.payload.response;
    },
    loggingOut: (state) => {
      state.isLoading = true;
    },
    loggingOutSuccess: (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
    },

    incrementBy: (state, action) => {
      state.counter += action.payload;
    },
  },
});

export const {
  loggingIn,
  loggingInFail,
  loggingInSuccess,
  loggingOut,
  loggingOutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
