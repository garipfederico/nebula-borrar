import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: null,
  response: null,
};
export const labelsSlice = createSlice({
  name: "labels",
  initialState: initialState,
  imagenes: {},
  reducers: {
    postCrearLote: (state) => {
      state.isLoading = true;
    },
    postCrearLoteFail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.response = action.payload.error.response;
    },
    postCrearLoteSuccess: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.response = action.payload;
    },
    resetState: () => initialState,
  },
});

export const {
  postCrearLote,
  postCrearLoteFail,
  postCrearLoteSuccess,
  resetState,
} = labelsSlice.actions;

export default labelsSlice.reducer;
