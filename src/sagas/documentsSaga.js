import {call, put, takeEvery} from "redux-saga/effects";
import {
  getDocuments,
  getDocumentsSuccess,
  getDocumentsFail,
} from "../states/documentsState";
import axiosBase from "../utils/axiosBase";
import MockAdapter from "axios-mock-adapter";

import {OptionsState, documents} from "./mockData";

//URLs
const URL_BASE = process.env.REACT_APP_BASE_URL;
const URL_documents = URL_BASE + "/api/document/";

// REACT_APP_ENVIRONMENT_TYPE = dev | mocked | test
function* requestManager(apiCallFunction, anUrl, anObject = null) {
  let request = {}
  if (process.env.REACT_APP_ENVIRONMENT_TYPE === "mocked") {
    console.log("Executing in mocked mode");
    var mock = new MockAdapter(axiosBase);
    mock.onGet(URL_documents).reply(200, {...OptionsState})
    .onGet(URL_documents).reply(200, {...documents})
    .onPut(anUrl).reply(200)
    request = yield call(apiCallFunction, anUrl, anObject)
    mock.restore()
  } else {
    console.log("Executing in dev mode");
    request = yield call(apiCallFunction, anUrl, anObject);
    console.log("request ",request );

  }
  return request
}

function* workGetDocuments() {
  // Call to get the documents for the table
  try {
    const documentsRequest = yield requestManager(axiosBase.get, URL_documents)
    yield put(getDocumentsSuccess({documents: documentsRequest.data.results}));
  } catch (e) {
    console.log("Error trying to get from API the documents");
    console.log(e);
    yield put(getDocumentsFail({e}));
  }
  return;
}

function* documentsSaga() {
    yield takeEvery("documents/getDocuments", workGetDocuments);
}

export default documentsSaga;
