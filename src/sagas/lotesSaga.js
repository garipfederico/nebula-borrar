import {call, put, takeEvery} from "redux-saga/effects";
import {
  getOptionsStateSuccess,
  getOptionsStateFail,
  getDocuments,
  getDocumentsSuccess,
  getDocumentsFail,
  putStateSuccess,
  putStateFail,
} from "../states/lotesState";
import axios from "axios";
import axiosBase from "../utils/axiosBase";
import MockAdapter from "axios-mock-adapter";

import {OptionsState, documents} from "./mockData";
const URL_BASE = process.env.REACT_APP_BASE_URL;
const URL_optionsState = URL_BASE + "/api/document-status";
const parcialURLdocument = "/api/document/"
const URL_document = URL_BASE + parcialURLdocument;

// REACT_APP_ENVIRONMENT_TYPE = dev | mocked | test
// console.log(process.env.REACT_APP_ENVIRONMENT_TYPE === "mocked")
var mock = new MockAdapter(axiosBase);
if (process.env.REACT_APP_ENVIRONMENT_TYPE === "mocked") {
  console.log("Executing in mocked mode");
  
  mock.onGet(URL_optionsState).reply(200, {...OptionsState})
  .onGet(URL_document).reply(200, {...documents})
  .onPut(URL_document).reply(400);
}

function* workGetOptionsStates() {
  //Call to get the options state for the combobox
  try {
    // const stateOptionsRequest = yield call(axios.get, URL_optionsState);
    const stateOptionsRequest = yield call( 
      axiosBase.get,
      // "http://localhost:8003/api/document-status"
      URL_optionsState
    );
   
    console.log("stateOptionsRequest ", stateOptionsRequest.data);
    yield put(
      getOptionsStateSuccess({
        stateOptions: {...stateOptionsRequest.data.results},
      })
    );
    yield put(getDocuments())
  } catch (e) {
    console.log("Error trying to get from API the options state");
    console.log(e);
    yield put(getOptionsStateFail({e}));
  }
}

function* workGetDocuments() {
  // Call to get the documents for the table

  try {
    // const documentsRequest = yield call(axios.get, URL_document);
    const documentsRequest = yield call(
      axiosBase.get,
      "http://localhost:8003/api/document/"
    );
    console.log("documentsRequest ", documentsRequest.data);
    yield put(getDocumentsSuccess({documents: {...documentsRequest.data}}));
  } catch (e) {
    console.log("Error trying to get from API the documents");
    console.log(e);
    yield put(getOptionsStateFail({e}));
  }
  return;
}

function* workPutDocuments(action) {
  console.log(action.payload);
  const {status_name, nroLote }= action.payload
  const URLRequest =  URL_BASE + parcialURLdocument + nroLote + '/manage-status'
  console.log(URLRequest)
  try {
    const documentsResponse = yield call(axiosBase.put,URLRequest, {
      status: status_name,
    });
    // mock.restore()
    console.log("documentsResponse ", documentsResponse);
    yield put(putStateSuccess());
    yield put(getDocuments())
  } catch (e) {
    console.log("Error trying to get from API the documents");
    console.log(e);
    yield put(putStateFail(e.response));
  }
  return;
}

function* lotesSaga() {
  try{
    yield takeEvery("lotes/getOptionsState", workGetOptionsStates);
    yield takeEvery("lotes/getDocuments", workGetDocuments);
    yield takeEvery("lotes/putState", workPutDocuments);
  }   finally {
    // mock.restore();
  }
 
}

export default lotesSaga;
