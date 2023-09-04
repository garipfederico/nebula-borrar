import {call, put, takeEvery} from "redux-saga/effects";
import {
  getDocumentsSuccess,
  getDocumentsFail,
  getOneDocumentSuccess,
  getOneDocumentFail,
  searchDocumentsSuccess,
  searchDocumentsEmpty,
  searchDocumentsFail,
  putOneDocumentSuccess,
  putOneDocumentFail,
  resetState,
} from "../states/documentsState";
import axiosBase from "../utils/axiosBase";
import MockAdapter from "axios-mock-adapter";

import {OptionsState, documents} from "./mockData";

//URLs
const URL_BASE = process.env.REACT_APP_BASE_URL;
const URL_documents = URL_BASE + "/api/document/";

// REACT_APP_ENVIRONMENT_TYPE = dev | mocked | test
function* requestManager(apiCallFunction, anUrl, anObject = null) {
  let request = {};
  if (process.env.REACT_APP_ENVIRONMENT_TYPE === "mocked") {
    console.log("Executing in mocked mode");
    var mock = new MockAdapter(axiosBase);
    mock
      // .onGet(URL_documents).reply(200, {...documents})
      .onGet(anUrl)
      .reply(200, {...documents})
      // .reply(401, {message: "Unauthorized"})
      .onPut(anUrl)
      .reply(200);
    request = yield call(apiCallFunction, anUrl, anObject);
    mock.restore();
  } else {
    console.log("Executing in dev mode");
    request = yield call(apiCallFunction, anUrl, anObject);
    console.log("request ", request);
  }
  return request;
}

function* workGetDocuments(action) {
  // Call to get the documents for the table
  const {page, rowsPerPage} = action.payload;
  const offset = page * rowsPerPage;
  let URL = URL_documents;
  URL += "?limit=" + rowsPerPage + "&offset=" + offset;
  console.log(URL_documents);
  try {
    const documentsResponse = yield requestManager(axiosBase.get, URL);
    const {results, count} = documentsResponse.data;
    yield put(getDocumentsSuccess({documents: results, count}));
  } catch (e) {
    console.log("Error trying to get from API the documents");
    console.log(e);
    yield put(getDocumentsFail({e}));
  }
  return;
}

function* workGetOneDocument(action) {
  const {id} = action.payload;
  const URL = URL_documents + id + "/get-document/";
  try {
    const mock = MockAdapter;
    // mock.get(URL).reply(401, {response:'Unautrizado'})
    const documentsResponse = yield requestManager(axiosBase.get, URL);
    // const documentsResponse = yield call(axiosBase.get, URL);
    // mock.restore()
    yield put(getOneDocumentSuccess({document: documentsResponse}));
  } catch (e) {
    yield put(getOneDocumentFail({e}));
  }
}

function* workPutOneDocument(action) {
  const {id, editedDocument} = action.payload;
  const URL = URL_documents + id + "/edit-document/";
  try {
    const documentsResponse = yield requestManager(
      axiosBase.patch,
      URL,
      editedDocument
    );
    yield put(putOneDocumentSuccess())
  } catch (e) {
    yield put(putOneDocumentFail({e}));
  }
}

function* workSearchDocuments(action) {
  const {textToSearch} = action.payload;
  try {
    const URL = URL_documents + "get-document-by-number/" + textToSearch + "/";
    const documentsResponse = yield requestManager(axiosBase.get, URL);
    yield put(searchDocumentsSuccess({documentsResponse}));
  } catch (e) {
    console.log("e ", e.response);
    if (e.response.status === 404) {
      console.log("e.response.status ", e.response.status);
      yield put(searchDocumentsEmpty());
      // yield put(resetState())
    } else {
      yield put(searchDocumentsFail({e}));
    }
  }
}

function* documentsSaga() {
  yield takeEvery("documents/getDocuments", workGetDocuments);
  yield takeEvery("documents/getOneDocument", workGetOneDocument);
  // yield takeEvery("documents/putOneDocument", workPutOneDocument);
  yield takeEvery("documents/searchDocuments", workSearchDocuments);
}

export default documentsSaga;
