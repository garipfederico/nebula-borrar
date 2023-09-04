import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  searchText: '',
  requestType: null,
  isLoading: false,
  isError: false,
  messageType: '',
  response: {},
  documents: [],
  document: {
    isLoading:false,
    isError:false,
    response: {},
    data:{
      all_confidentialities:[{}],
      all_document_types:[{}]
    },
    requestType: null
  },
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
      state.document.isLoading = true;
    },
    getOneDocumentSuccess: (state, action) => {
      state.document.isLoading = false;
      state.document = action.payload.document;
      state.document.requestType = 'GET';
    },
    getOneDocumentFail: (state, action) => {
      console.log("action.payload", action.payload);
      console.log("action.payload.e.response ",action.payload.e )
      state.document.isLoading = false;
      state.document.isError = true;
      state.document.response = action.payload.e.response;
      // state.documents = [];
    },
    editOneDocument: (state) => {
      state.document.editing = true
      state.document.requestType = "PUT"
    },
    putOneDocument: (state, action) => {
      state.document.isLoading = true;

    },
    searchDocuments: (state, action) => {
      state.isLoading = true;
    },
    searchDocumentsSuccess : (state, action) => {
      state.isLoading = false;
      state.documents = [action.payload.documentsResponse.data]
      state.count = 1;
    },
    searchDocumentsEmpty : (state, action) => {
      state.isLoading = false;
      state.documents = [];
      state.messageType = 'noResults'
      state.count = 1;
    },
    searchDocumentsFail : (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.response = action.payload.e.response
    },
    resetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.response = {};
      state.messageType = ''
      state.document = initialState.document
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
  editOneDocument,
  putOneDocument,
  searchDocuments,
  searchDocumentsSuccess,
  searchDocumentsEmpty,
  searchDocumentsFail,
  resetState,
} = documentsSlice.actions;

export default documentsSlice.reducer;
