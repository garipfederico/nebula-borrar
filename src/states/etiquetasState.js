import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};
export const etiquetasSlice = createSlice({
  name: "etiquetas",
  initialState: initialState,
  reducers: {
    postCrearLote: (state) => {
      state.isLoading = true;
    },
    postCrearLoteFail: (state) => {
      state.isLoading = false;
    },
    postCrearLoteSuccess: (state) => {
      state.isLoading = false;
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
