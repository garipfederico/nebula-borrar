import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  typeRequest: null,
  isLoading: false,
  isError: false,
  response: {},
  optionsState: [],
  documents: [],
};

export const lotesSlice = createSlice({
  name: "lotes",
  initialState: initialState,
  reducers: {
    getOptionsState: (state) => {
      state.isLoading = true;
    },
    getOptionsStateSuccess: (state, action) => {
      state.isLoading = false;
      state.optionsState = action.payload.stateOptions;
    },
    getOptionsStateFail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.response = action.payload
    },
    getDocuments: (state) => {
      state.isLoading = true;
    },
    getDocumentsSuccess: (state, action) => {
      state.isLoading = false;
      state.documents = action.payload.documents;
    },
    getDocumentsFail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.response = action.payload
    },
    patchState: (state, action) => {
      state.isLoading = true
    },
    patchStateSuccess: (state, action) => {
      state.isLoading = false
    },
    patchStateFail: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.response = action.payload.response 
    },
    resetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.response = {}
    }

  },
});

export const {
getOptionsState,
getOptionsStateSuccess,
getOptionsStateFail,
getDocuments,
getDocumentsSuccess,
getDocumentsFail,
patchState,
patchStateSuccess,
patchStateFail,
resetState,
} = lotesSlice.actions;

export default lotesSlice.reducer;
