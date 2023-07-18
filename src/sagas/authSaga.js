import {call, put, takeEvery} from "redux-saga/effects";
import {loggingInSuccess, loggingInFail, loggingOutSuccess} from "../states/authState";
import axios from "axios";

function* workPostAuthFetch(action) {
  const {username, password, navigate} = action.payload;
  console.log("hola saga");
  console.info("username saga ", username);
  const url = `${process.env.REACT_APP_BASE_URL}/api/log-in/`;
  try {
    console.info("url ", url);
    const response = yield call(axios.post, url, {
      email: username,
      password: password,
    });
    window.localStorage.setItem("docu.auth", JSON.stringify(response.data));
    yield put(loggingInSuccess({response}));
    yield call(navigate, "./home");
  } catch (error) {
    console.error(error);
    yield put(loggingInFail({error}));
  }
}

function* workDeleteAuthFetch() {
  window.localStorage.removeItem("docu.auth");
  yield put(loggingOutSuccess());
}

function* etiquetaSaga() {
  yield takeEvery("auth/loggingIn", workPostAuthFetch);
  yield takeEvery("auth/loggingOut", workDeleteAuthFetch);
}

export default etiquetaSaga;
