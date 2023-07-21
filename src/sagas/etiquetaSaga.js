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
  console.log("nroExpediente ", numeroDeExpediente);
  console.log("cantidad ", cantidad);
  try {
    console.log("a");
    const body = {
      code: numeroDeExpediente,
      number: cantidad,
      bar_code_image: "string", // esto va aca? a que imagen corresponderia
      area: 0, // Traer de usuario, corregir para que al usuario lo levante del storage
      user: 0, // idem
    };

    // Mock any GET request to /users
    // arguments for reply are (status, data, headers)
    mock
      .onPost(process.env.REACT_APP_BASE_URL + "/api/label/create-bulk/", body)
      .reply(200, {...mockLabelData});
    mock
      .onGet("BASEURL?etiquetas_id=1,2,3,4,5")
      .reply(200, {...mockImagesLabelData});

    const newLabels = yield call(
      axios
        .post(process.env.REACT_APP_BASE_URL + "/api/label/create-bulk/", body)
        .then(async (res) => {
          console.log("Generando la informacion del lote exitosamente");
          try {
            const res_1 = await axios
              .get(res.data.imagen_etiquetas_url);
            console.log("Obteniendo informacion de las etiquetas");
            console.log(res_1.data);
            const imagenes = res_1.data;
            console.log("imagenes ",imagenes )
            return imagenes;
          } catch (e) {
            console.log(e);
          }
          ///que pasa que no retorna
          console.log(res);
          return res
        })
        .catch((primerError) => {
          console.log(primerError);
        })
        );
        // que pasa que no imprime ????
        console.log("newLabels ", newLabels);
        yield put(postCrearLoteSuccess({newLabels}));
  } catch (error) {
    return put(postCrearLoteFail(error));
  }
}

function* etiquetaSaga() {
  // cats es el nombre del createSlice.name
  // getCatsFetch es el nombre del reducer
  yield takeEvery("etiquetas/postCrearLote", workPostLabelsFetch);
}

export default etiquetaSaga;
