import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {configureStore} from "@reduxjs/toolkit";

//States
import authState from "./states/authState";
import labelsReducer from "./states/labelsState";
import batchesReducer from "./states/batchesState";
import alertDialogSlice from "./states/reusable/AlertDialogSlice";
import snackbarSlice from "./states/reusable/SnackbarSlice";
import documentsSlice from "./states/documentsState";

//Sagas
import batchesSaga from "./sagas/batchesSaga";
import labelsSaga from "./sagas/labelsSaga";
import authSaga from "./sagas/authSaga";
import documentsSaga from "./sagas/documentsSaga"

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    auth: authState,
    labels: labelsReducer,
    batches: batchesReducer,
    alertDialog: alertDialogSlice,
    snackbar: snackbarSlice, 
    documents: documentsSlice
  },
  middleware: [saga],
});

saga.run(authSaga);
saga.run(labelsSaga);
saga.run(batchesSaga);
saga.run(documentsSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
