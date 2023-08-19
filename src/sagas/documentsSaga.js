import {call, put, takeEvery} from "redux-saga/effects";
import {
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
    mock
    // .onGet(URL_documents).reply(200, {...documents})
    .onGet(anUrl).reply(401, {message: 'Unauthorized'})
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

function* workGetDocuments(action) {
  // Call to get the documents for the table
  const {page, rowsPerPage} = action.payload
  const offset = (page) * rowsPerPage
  console.log("page ",page )
  console.log("rowsPerPage ",rowsPerPage )
  let URL = URL_documents
  // if(page && rowsPerPage){
    URL += '?limit=' + rowsPerPage + '&offset=' + (offset)
  // }
  console.log(URL_documents)
  try {
    const documentsRequest = yield requestManager(axiosBase.get, URL)
    const {results, count, next, previous} = documentsRequest.data
    yield put(getDocumentsSuccess({documents: results, count, next, previous  }));
  } catch (e) {
    console.log("Error trying to get from API the documents");
    console.log(e);
    yield put(getDocumentsFail({e}));
  }
  return;
}
// "http://localhost:8003/api/document/?limit=10&offset=10"
// http://localhost:8003/api/document/?limit=10&offset=10
// 
function* documentsSaga() {
    yield takeEvery("documents/getDocuments", workGetDocuments);
}

export default documentsSaga;
