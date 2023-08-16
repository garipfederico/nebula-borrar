import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  typeRequest: null,
  isLoading: false,
  isError: false,
  response: {},
  documents: [],
};

export const documentsSlice = createSlice({
  name: "documents",
  initialState: initialState,
  reducers: {
    getDocuments: (state) => {
      state.isLoading = true;
    },
    getDocumentsSuccess: (state, action) => {
      state.isLoading = false;
      state.optionsState = action.payload.stateOptions;
    },
    getOptionsFail: (state, action) => {
      console.log('action.payload', action.payload)
      state.isLoading = false;
      state.isError = true;
      state.response = action.payload.e.response
    },
    resetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.response = {}
    }
  },
});

export const {
getDocuments,
getDocumentsSuccess,
getOptionsFail,
resetState,
} = documentsSlice.actions;

export default documentsSlice.reducer;
