import {call, put, takeEvery} from "redux-saga/effects";
import {
  postCrearLoteSuccess,
  postCrearLoteFail,
} from "../states/etiquetasState";
import axios from "axios";
import axiosBase from "../utils/axiosBase";
import MockAdapter from "axios-mock-adapter";

import {mockLabelData} from "./mockLabelData";
import {mockImagesLabelData} from "./mockLabelData";

function* workPostLabelsFetch(action) {
  var mock = new MockAdapter(axios);
  const {numeroDeExpediente, cantidad} = action.payload;
  try {
    console.log("a");
    const body = {
      code: numeroDeExpediente,
      number: cantidad,
      bar_code_image: "string", // esto va aca? a que imagen corresponderia
      area: 0, // Traer de usuario, corregir para que al usuario lo levante del storage
      user: 0, // idem
    };
    const firstUrl = process.env.REACT_APP_BASE_URL + "/api/label/create-bulk/";
    mock.onPost(firstUrl, body).reply(200, {...mockLabelData});
    mock
      .onGet("BASEURL?etiquetas_id=1,2,3,4,5")
      .reply(200, {...mockImagesLabelData});

    //First call
    const firstResponse = yield call(
      axios.post,
      process.env.REACT_APP_BASE_URL + "/api/label/create-bulk/",
      body
    );
    const newLabels = firstResponse.data;
    console.log("Bulk information successfully generated");
    console.log("newLabels ", newLabels);
    const labelsURL = newLabels.imagen_etiquetas_url;

    // Second call
    const secondResponse = yield call(axios.get, labelsURL);
    const imagenes = secondResponse.data;
    console.log("Labels Images successfully downloaded");
    // console.log("imagenes ", imagenes);
    yield put(postCrearLoteSuccess({imagenes}));
  } catch (error) {
    return put(postCrearLoteFail(error));
  }
}

function* etiquetaSaga() {
  yield takeEvery("etiquetas/postCrearLote", workPostLabelsFetch);
}

export default etiquetaSaga;
