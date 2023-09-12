import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  requestType: null,
  isLoading: false,
  isError: false,
  messageType: "",
  response: {},
  documents: [],
  showForm: false,
  document: {
    isLoading: false,
    isError: false,
    response: {},
    data: {
      batch: null,
      confidentiality: "",
      created_at: "",
      document_description: "",
      document_type: "",
      id: null,
      internal_id: "",
      is_active: null,
      label: "",
      location: null,
      locationDescription:"",
      status: "",
      all_confidentialities: [{}],
      all_document_types: [{}],
      all_document_locations: [""],
    },
    requestType: null,
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
      state.messageType = "";
    },
    getDocumentsFail: (state, action) => {
      console.log("action.payload", action.payload);
      state.isLoading = false;
      state.isError = true;
      state.response = action.payload.e.response;
    },
    getOneDocument: (state) => {
      state.document.isLoading = true;
      state.showForm = true;
    },
    getOneDocumentSuccess: (state, action) => {
      state.document.isLoading = false;
      state.document = action.payload.document;
      state.document.requestType = "GET";
    },
    getOneDocumentFail: (state, action) => {
      console.log("action.payload", action.payload);
      console.log("action.payload.e.response ", action.payload.e);
      state.document.isLoading = false;
      state.document.isError = true;
      state.document.response = action.payload.e.response;
      // state.documents = [];
    },
    editOneDocument: (state) => {
      state.document.editing = true;
      state.document.requestType = "PUT";
    },
    putOneDocument: (state, action) => {
      state.document.isLoading = true;
    },
    putOneDocumentSuccess: (state, action) => {
      state.document.isLoading = false;
      state.showForm = false
    },
    putOneDocumentFail: (state, action) => {
      state.document.isLoading = false;
      state.document.isError = true;
      state.document.response = action.payload.e.response;
    },
    oneDocumentCancel: (state) => {
      state.showForm = false;
      state.document.editing = false;
      state.document.requestType = "";
    },
    searchDocuments: (state, action) => {
      state.isLoading = true;
    },
    searchDocumentsSuccess: (state, action) => {
      state.isLoading = false;
      state.documents = [action.payload.documentsResponse.data];
      state.count = 1;
      state.messageType = "";
    },
    searchDocumentsEmpty: (state, action) => {
      state.isLoading = false;
      state.documents = [];
      state.messageType = "noResults";
      state.count = 1;
    },
    searchDocumentsFail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.response = action.payload.e.response;
    },
    resetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.response = {};
      state.messageType = "";
      state.document = initialState.document;
      state.showForm = false
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
  putOneDocumentSuccess,
  putOneDocumentFail,
  oneDocumentCancel,
  searchDocuments,
  searchDocumentsFail,
  searchDocumentsSuccess,
  searchDocumentsEmpty,
  resetState,
} = documentsSlice.actions;

export default documentsSlice.reducer;
