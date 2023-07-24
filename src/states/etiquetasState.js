import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: null,
  response: null,
};
export const etiquetasSlice = createSlice({
  name: "etiquetas",
  initialState: initialState,
  imagenes: {},
  reducers: {
    postCrearLote: (state) => {
      state.isLoading = true;
    },
    postCrearLoteFail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.response = action.payload.error;
    },
    postCrearLoteSuccess: (state, action) => {
      state.isLoading = false;
      state.response = action.payload;
    },
    incrementBy: (state, action) => {
      state.counter += action.payload;
    },
  },
});

export const {
  postCrearLote,
  postCrearLoteFail,
  postCrearLoteSuccess,
  decrement,
  incrementBy,
} = etiquetasSlice.actions;

export default etiquetasSlice.reducer;
