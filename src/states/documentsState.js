import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  typeRequest: null,
  isLoading: false,
  isError: false,
  response: {},
  documents: [],
  document: {},
  count: null,
};

export const documentsSlice = createSlice({
  name: "documents",
  initialState: initialState,
  reducers: {
    getDocuments: (state) => {
      state.isLoading = true;
      state.documents = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    },
    getDocumentsSuccess: (state, action) => {
      state.isLoading = false;
      state.documents = action.payload.documents;
      state.count = action.payload.count;
    },
    getDocumentsFail: (state, action) => {
      console.log("action.payload", action.payload);
      state.isLoading = false;
      state.isError = true;
      state.response = action.payload.e.response;
    },
    getOneDocument: (state) => {
      state.isLoading = true;
    },
    getOneDocumentSuccess: (state, action) => {
      state.isLoading = false;
      state.document = action.payload.document;
    },
    getOneDocumentFail: (state, action) => {
      console.log("action.payload", action.payload);
      state.isLoading = false;
      state.isError = true;
      state.response = action.payload.e.response;
      state.documents = [];
    },
    resetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.response = {};
    },
  },
});

export const {
  getDocuments,
  getDocumentsSuccess,
  getDocumentsFail,
  getOneDocument,
  getOneDocumentSuccess,
  getOneDocumentFail,
  resetState,
} = documentsSlice.actions;

export default documentsSlice.reducer;
