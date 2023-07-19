import {call, put, takeEvery} from "redux-saga/effects";
import {
  loggingInSuccess,
  loggingInFail,
  loggingOutSuccess,
  getUserFail,
  getUserSuccess,
} from "../states/authState";
import axios from "axios";

const getUser = () => {
  const getAccessToken = () => {
    const auth = JSON.parse(window.localStorage.getItem("docu.auth"));
    if (auth) {
      return auth.access;
    }
    return undefined;
  };
  const access_token = getAccessToken();
  if (access_token) {
    const [, payload] = access_token.split(".");
    const decoded = window.atob(payload);
    return JSON.parse(decoded);
  }
  return undefined;
};

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

    

    // const getUser = () => {
    //   const access_token = getAccessToken();
    //   if (access_token) {
    //     const [, payload] = access_token.split(".");
    //     const decoded = window.atob(payload);
    //     return JSON.parse(decoded);
    //   }
    //   return undefined;
    // };

    const user = getUser();

    yield put(loggingInSuccess({response, user}));
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

function* workGetUserFetch(action) {
  try {
    const user = getUser();
    yield put(getUserSuccess(user));
  } catch (error) {
    yield put(getUserFail());
  }
}

function* authSaga() {
  yield takeEvery("auth/loggingIn", workPostAuthFetch);
  yield takeEvery("auth/loggingOut", workDeleteAuthFetch);
  yield takeEvery("auth/getUser", workGetUserFetch);
}

export default authSaga;
