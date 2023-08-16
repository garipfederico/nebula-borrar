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
import lotesReducer from "./states/lotesState";
import alertDialogSlice from "./states/reusable/AlertDialogSlice";
import snackbarSlice from "./states/reusable/SnackbarSlice";
import documentsSlice from "./states/documentsState";

//Sagas
import lotesSaga from "./sagas/lotesSaga";
import etiquetaSaga from "./sagas/etiquetaSaga";
import authSaga from "./sagas/authSaga";
import documentsSaga from "./sagas/documentsSaga"
import axiosBase from "./utils/axiosBase";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    auth: authState,
    etiquetas: etiquetasReducer,
    lotes: lotesReducer,
    alertDialog: alertDialogSlice,
    snackbar: snackbarSlice, 
    documents: documentsSlice
  },
  middleware: [saga],
});

saga.run(authSaga);
saga.run(etiquetaSaga);
saga.run(lotesSaga);
saga.run(documentsSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// if (window.Cypress) {
//   window.store = store
// }