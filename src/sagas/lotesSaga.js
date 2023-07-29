import {call, put, takeEvery} from "redux-saga/effects";
import {
  getOptionsStateSuccess,
  getOptionsStateFail,
  getDocumentsSuccess,
  getDocumentsFail,
  patchStateSuccess,
  patchStateFail,
} from "../states/lotesState";
import axios from "axios";
import axiosBase from "../utils/axiosBase";
import MockAdapter from "axios-mock-adapter";

import {OptionsState, documents} from "./mockData";
const URL_optionsState = "api/utilities/dropdowns/states";
const URL_document = "http://localhost:8003/api/batch/";

// REACT_APP_ENVIRONMENT_TYPE = dev | mocked | test
if (process.env.REACT_APP_ENVIRONMENT_TYPE === "mocked") {
  console.log("Executing in mocked mode");
  var mock = new MockAdapter(axios);
  mock.onGet(URL_optionsState).reply(200, {...OptionsState});
  mock.onGet(URL_document).reply(200, {...documents});
  mock.onPatch(URL_document).reply(400);
}

function* workGetOptionsStates() {
  //Call to get the options state for the combobox
  try {
    const stateOptionsRequest = yield call(axios.get, URL_optionsState);
    console.log("stateOptionsRequest ", stateOptionsRequest.data);
    yield put(
      getOptionsStateSuccess({stateOptions: {...stateOptionsRequest.data}})
    );
  } catch (e) {
    console.log("Error trying to get from API the options state");
    console.log(e);
    yield put(getOptionsStateFail({}));
  }
}

function* workGetDocuments() {
  // Call to get the documents for the table

  try {
    const documentsRequest = yield call(axios.get, URL_document);
    console.log("documentsRequest ", documentsRequest.data);
    yield put(getDocumentsSuccess({documents: {...documentsRequest.data}}));
  } catch (e) {
    console.log("Error trying to get from API the documents");
    console.log(e);
    yield put(getOptionsStateFail({}));
  }
  return;
}

function* workPatchDocuments(action) {
  console.log(action);
  try {
    const documentsResponse = yield call(axios.patch, URL_document, {
      estado: action.payload,
    });
    console.log("documentsResponse ", documentsResponse);
    yield put(patchStateSuccess());
  } catch (e) {
    console.log("Error trying to get from API the documents");
    console.log(e);
    yield put(getOptionsStateFail(e.response));
  }
  return;
}

function* lotesSaga() {
  yield takeEvery("lotes/getOptionsState", workGetOptionsStates);
  yield takeEvery("lotes/getDocuments", workGetDocuments);
  yield takeEvery("lotes/patchState", workPatchDocuments);
}

export default lotesSaga;
