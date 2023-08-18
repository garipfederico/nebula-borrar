import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  typeRequest: null,
  isLoading: false,
  isError: false,
  response: {},
  documents: [],
  count: null,
  next: null,
  previous: null
};

export const documentsSlice = createSlice({
  name: "documents",
  initialState: initialState,
  reducers: {
    getDocuments: (state) => {

      state.isLoading = true;
      state.documents = [{},{},{},{},{},{},{},{},{},{}];
    },
    getDocumentsSuccess: (state, action) => {
      state.isLoading = false;
      state.documents = action.payload.documents;
      state.count = action.payload.count;
      state.next = action.payload.next;
      state.previous = action.payload.previous;

    },
    getDocumentsFail: (state, action) => {
      console.log('action.payload', action.payload)
      state.isLoading = false;
      state.isError = true;
      state.response = action.payload.e.response
      state.documents = [];
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
getDocumentsFail,
resetState,
} = documentsSlice.actions;

export default documentsSlice.reducer;
