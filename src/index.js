import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {configureStore} from "@reduxjs/toolkit";

//States
import authState from "./states/authState";
import etiquetasReducer from "./states/etiquetasState";
//Sagas
import etiquetaSaga from "./sagas/etiquetaSaga";
import authSaga from "./sagas/authSaga"

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    auth: authState,
    etiquetas: etiquetasReducer,
  },
  middleware: [saga],
});

saga.run(authSaga, etiquetaSaga);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App className="fondo" />
  </Provider>
);
